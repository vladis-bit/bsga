import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Session } from "@supabase/supabase-js";

type Message = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  preferred_date: string | null;
  message: string;
  source: string;
  is_read: boolean;
  email_status: string | null;
  email_error: string | null;
  resend_at: string | null;
};

const Admin = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      toast({ title: "Nemáte prístup", description: error.message, variant: "destructive" });
      return;
    }
    setMessages((data ?? []) as Message[]);
  }, [toast]);

  useEffect(() => {
    if (session) load();
  }, [session, load]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast({ title: "Prihlásenie zlyhalo", description: error.message, variant: "destructive" });
  };

  const markRead = async (id: string) => {
    const { error } = await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    if (error) {
      toast({ title: "Chyba", description: error.message, variant: "destructive" });
      return;
    }
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, is_read: true } : x)));
  };

  const unread = messages.filter((m) => !m.is_read).length;

  if (!session) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <form onSubmit={signIn} className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8">
          <h1 className="font-serif text-2xl text-foreground">Admin prihlásenie</h1>
          <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Prihlasujem…" : "Prihlásiť sa"}
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-3 font-serif text-3xl text-foreground">
            Správy
            {unread > 0 && (
              <Badge className="rounded-full bg-primary text-primary-foreground">{unread} neprečítaných</Badge>
            )}
          </h1>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>Odhlásiť</Button>
        </div>

        <div className="space-y-4">
          {messages.length === 0 && <p className="text-muted-foreground">Žiadne správy.</p>}
          {messages.map((m) => (
            <article
              key={m.id}
              className={`rounded-3xl border p-6 ${m.is_read ? "border-border bg-card" : "border-primary/50 bg-card shadow-md"}`}
            >
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h2 className="font-semibold text-foreground">
                  {m.first_name} {m.last_name}
                </h2>
                {!m.is_read && <Badge className="rounded-full bg-primary text-primary-foreground">Nové</Badge>}
                {m.email_status === "sent" && (
                  <Badge variant="outline" className="rounded-full border-primary/40 text-xs">
                    E-mail odoslaný{m.resend_at ? ` · ${new Date(m.resend_at).toLocaleString("sk-SK")}` : ""}
                  </Badge>
                )}
                {m.email_status === "failed" && (
                  <Badge variant="destructive" className="rounded-full text-xs">E-mail zlyhal</Badge>
                )}
                {m.email_status === "pending" && (
                  <Badge variant="outline" className="rounded-full text-xs">E-mail čaká</Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleString("sk-SK")} · {m.source}
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
              {!m.is_read && (
                <Button variant="outline" size="sm" className="mt-4" onClick={() => markRead(m.id)}>
                  Označiť ako prečítané
                </Button>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Admin;
