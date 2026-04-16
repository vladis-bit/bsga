import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { Mail, Phone, Calendar, Trash2, Check, LogOut, Inbox, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AuroraBackground } from "@/components/ui/aurora-background";

type ContactMessage = {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  preferred_date: string | null;
  message: string;
  source: string;
  is_read: boolean;
  created_at: string;
};

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, loading, navigate]);

  const loadMessages = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Chyba pri načítaní", description: error.message, variant: "destructive" });
    } else {
      setMessages(data ?? []);
    }
    setFetching(false);
  };

  useEffect(() => {
    if (isAdmin) loadMessages();
  }, [isAdmin]);

  const toggleRead = async (msg: ContactMessage) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: !msg.is_read })
      .eq("id", msg.id);
    if (error) {
      toast({ title: "Chyba", description: error.message, variant: "destructive" });
    } else {
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m)));
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Naozaj zmazať túto správu?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      toast({ title: "Chyba", description: error.message, variant: "destructive" });
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Zmazané" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Načítavam...</p>
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <AuroraBackground variant="gold">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center">
            <h1 className="text-2xl font-serif font-bold text-foreground mb-3">Prístup zamietnutý</h1>
            <p className="text-muted-foreground mb-6">Tento účet nemá admin oprávnenia.</p>
            <Button onClick={signOut} variant="outline">Odhlásiť sa</Button>
          </div>
        </div>
      </AuroraBackground>
    );
  }

  const filtered = filter === "unread" ? messages.filter((m) => !m.is_read) : messages;
  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <AuroraBackground variant="gold">
      <Helmet>
        <title>Admin Dashboard | BSGA</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="min-h-screen px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                Kontaktné správy
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Prihlásený ako <span className="text-gold">{user.email}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={loadMessages} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Obnoviť
              </Button>
              <Button onClick={() => { signOut(); navigate("/auth"); }} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Odhlásiť
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-gold hover:bg-gold/90 text-background" : ""}
            >
              Všetky ({messages.length})
            </Button>
            <Button
              size="sm"
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              className={filter === "unread" ? "bg-gold hover:bg-gold/90 text-background" : ""}
            >
              Neprečítané ({unreadCount})
            </Button>
          </div>

          {/* Messages */}
          {fetching ? (
            <p className="text-muted-foreground text-center py-12">Načítavam správy...</p>
          ) : filtered.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Žiadne správy.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-card border rounded-xl p-5 transition-all ${
                    msg.is_read ? "border-border opacity-75" : "border-gold/40 shadow-md"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-foreground">
                          {msg.first_name} {msg.last_name ?? ""}
                        </h3>
                        {!msg.is_read && (
                          <Badge className="bg-gold text-background hover:bg-gold/90">Nové</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{msg.source}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(msg.created_at), "d. MMMM yyyy, HH:mm", { locale: sk })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleRead(msg)}
                        title={msg.is_read ? "Označiť ako neprečítané" : "Označiť ako prečítané"}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMessage(msg.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 text-sm mb-3">
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-gold">
                      <Mail className="w-4 h-4" /> {msg.email}
                    </a>
                    {msg.phone && (
                      <a href={`tel:${msg.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-gold">
                        <Phone className="w-4 h-4" /> {msg.phone}
                      </a>
                    )}
                    {msg.service && (
                      <p className="text-muted-foreground">
                        <span className="text-gold">Služba:</span> {msg.service}
                      </p>
                    )}
                    {msg.preferred_date && (
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(msg.preferred_date), "d. MMMM yyyy", { locale: sk })}
                      </p>
                    )}
                  </div>

                  <div className="bg-muted/40 rounded-lg p-3 text-sm text-foreground whitespace-pre-wrap">
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Admin;
