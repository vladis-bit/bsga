import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, Undo2 } from "lucide-react";
import { Message, fmtDateTime, translateDbError } from "./shared";

const Messages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      toast({
        title: "Nemáte prístup",
        description: translateDbError(error.message),
        variant: "destructive",
      });
      return;
    }
    setMessages((data ?? []) as Message[]);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const setRead = async (id: string, value: boolean) => {
    const { error } = await supabase.from("contact_messages").update({ is_read: value }).eq("id", id);
    if (error) {
      toast({ title: "Chyba", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, is_read: value } : x)));
    toast({
      title: value ? "Označené ako prečítané" : "Označené ako neprečítané",
    });
  };

  const unread = messages.filter((m) => !m.is_read).length;
  const list = useMemo(
    () =>
      messages.filter((m) =>
        filter === "all" ? true : filter === "unread" ? !m.is_read : m.is_read,
      ),
    [messages, filter],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-3 font-serif text-3xl text-foreground">
          Správy
          {unread > 0 && (
            <Badge className="rounded-full bg-primary text-primary-foreground">
              {unread} neprečítaných
            </Badge>
          )}
        </h1>
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "Všetky" : f === "unread" ? "Neprečítané" : "Prečítané"}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {list.length === 0 && <p className="text-muted-foreground">Žiadne správy.</p>}
        {list.map((m) => (
          <article
            key={m.id}
            className={`rounded-3xl border p-6 transition-colors ${
              m.is_read
                ? "border-border/60 bg-muted/40 opacity-90"
                : "border-primary/60 bg-card shadow-md ring-1 ring-primary/20"
            }`}
          >
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setRead(m.id, !m.is_read)}
                aria-pressed={m.is_read}
                aria-label={m.is_read ? "Označiť ako neprečítané" : "Označiť ako prečítané"}
                title={m.is_read ? "Označiť ako neprečítané" : "Označiť ako prečítané"}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  m.is_read
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <Check className="h-4 w-4" />
              </button>
              <h2 className="font-semibold text-foreground">
                {m.first_name} {m.last_name}
              </h2>
              {!m.is_read && (
                <Badge className="rounded-full bg-primary text-primary-foreground">Nové</Badge>
              )}
              {m.email_status === "sent" && (
                <Badge variant="outline" className="rounded-full border-primary/40 text-xs">
                  E-mail odoslaný
                  {m.resend_at ? ` · ${new Date(m.resend_at).toLocaleString("sk-SK")}` : ""}
                </Badge>
              )}
              {m.email_status === "failed" && (
                <Badge variant="destructive" className="rounded-full text-xs">
                  E-mail zlyhal
                </Badge>
              )}
              {m.email_status === "pending" && (
                <Badge variant="outline" className="rounded-full text-xs">
                  E-mail čaká
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {fmtDateTime(m.created_at)} · {m.source}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {m.email}
              {m.phone ? ` · ${m.phone}` : ""}
              {m.service ? ` · ${m.service}` : ""}
              {m.preferred_date ? ` · ${m.preferred_date}` : ""}
            </p>
            <p className="mt-3 whitespace-pre-wrap text-foreground">{m.message}</p>
            {m.email_status === "failed" && m.email_error && (
              <p className="mt-2 break-all text-xs text-destructive">{m.email_error}</p>
            )}
            <Button
              variant="outline"
              size="sm"
              className="mt-4 gap-2 rounded-full"
              onClick={() => setRead(m.id, !m.is_read)}
            >
              {m.is_read ? (
                <>
                  <Undo2 className="h-4 w-4" /> Označiť ako neprečítané
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" /> Označiť ako prečítané
                </>
              )}
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Messages;