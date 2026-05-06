import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AuroraBackground } from "@/components/ui/aurora-background";

type ContactMsg = {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  source: string;
  is_read: boolean;
  created_at: string;
};

type Subscriber = { id: string; email: string; created_at: string };
type Profile = { id: string; full_name: string | null; email: string | null; created_at: string };
type Reservation = {
  id: string; type: string; trainer_name: string | null; equipment: string | null;
  reservation_date: string; reservation_time: string;
  first_name: string; last_name: string; email: string; phone: string;
  notes: string | null; status: string; created_at: string;
};

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).then(({ data }) => setMessages((data as ContactMsg[]) || []));
    supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).then(({ data }) => setSubscribers((data as Subscriber[]) || []));
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).then(({ data }) => setProfiles((data as Profile[]) || []));
    supabase.from("reservations").select("*").order("reservation_date", { ascending: false }).then(({ data }) => setReservations((data as Reservation[]) || []));
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Načítavam...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/ucet" replace />;

  return (
    <div className="min-h-screen">
      <Helmet><title>Admin | BSGA</title></Helmet>
      <Navbar />
      <AuroraBackground variant="gold">
        <div className="container mx-auto px-4 pt-28 pb-16 min-h-screen">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-serif">Admin Panel</h1>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
            <Button variant="outline" onClick={signOut}>Odhlásiť</Button>
          </div>

          <Tabs defaultValue="messages">
            <TabsList className="mb-6">
              <TabsTrigger value="messages">Správy ({messages.length})</TabsTrigger>
              <TabsTrigger value="reservations">Rezervácie ({reservations.length})</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter ({subscribers.length})</TabsTrigger>
              <TabsTrigger value="users">Používatelia ({profiles.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="messages">
              <div className="space-y-3">
                {messages.length === 0 && <p className="text-muted-foreground">Žiadne správy.</p>}
                {messages.map((m) => (
                  <div key={m.id} className="bg-background/80 backdrop-blur border border-border/50 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold">{m.first_name} {m.last_name}</div>
                        <div className="text-sm text-muted-foreground">{m.email} {m.phone && `• ${m.phone}`}</div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <div>{new Date(m.created_at).toLocaleString("sk-SK")}</div>
                        <div className="mt-1 inline-block bg-gold/20 text-gold px-2 py-0.5 rounded">{m.source}</div>
                      </div>
                    </div>
                    {m.service && <div className="text-sm mb-1"><strong>Služba:</strong> {m.service}</div>}
                    <p className="text-sm whitespace-pre-wrap mt-2">{m.message}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reservations">
              <div className="space-y-3">
                {reservations.length === 0 && <p className="text-muted-foreground">Žiadne rezervácie.</p>}
                {reservations.map((r) => (
                  <div key={r.id} className="bg-background/80 backdrop-blur border border-border/50 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div>
                        <div className="font-bold">{r.first_name} {r.last_name}</div>
                        <div className="text-sm text-muted-foreground">{r.email} • {r.phone}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gold">{r.reservation_date} • {r.reservation_time?.slice(0, 5)}</div>
                        <div className="text-xs text-muted-foreground">{r.status}</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <strong>{r.type === "lesson" ? "Lekcia" : "Performance Center"}:</strong>{" "}
                      {r.type === "lesson" ? r.trainer_name : r.equipment}
                    </div>
                    {r.notes && <p className="text-sm text-muted-foreground mt-2 italic">„{r.notes}"</p>}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="newsletter">
              <div className="bg-background/80 backdrop-blur border border-border/50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50"><tr><th className="text-left p-3">Email</th><th className="text-left p-3">Dátum</th></tr></thead>
                  <tbody>
                    {subscribers.map((s) => (
                      <tr key={s.id} className="border-t border-border/50">
                        <td className="p-3">{s.email}</td>
                        <td className="p-3 text-muted-foreground">{new Date(s.created_at).toLocaleString("sk-SK")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="bg-background/80 backdrop-blur border border-border/50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50"><tr><th className="text-left p-3">Meno</th><th className="text-left p-3">Email</th><th className="text-left p-3">Registrovaný</th></tr></thead>
                  <tbody>
                    {profiles.map((p) => (
                      <tr key={p.id} className="border-t border-border/50">
                        <td className="p-3">{p.full_name || "—"}</td>
                        <td className="p-3">{p.email}</td>
                        <td className="p-3 text-muted-foreground">{new Date(p.created_at).toLocaleString("sk-SK")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AuroraBackground>
    </div>
  );
};

export default Admin;