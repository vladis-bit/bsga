import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Session } from "@supabase/supabase-js";

const links = [
  { to: "/admin", label: "Prehľad", end: true },
  { to: "/admin/rezervacie", label: "Rezervácie" },
  { to: "/admin/kalendar", label: "Kalendár" },
  { to: "/admin/spravy", label: "Správy" },
];

const AdminLayout = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error)
      toast({ title: "Prihlásenie zlyhalo", description: error.message, variant: "destructive" });
  };

  if (!ready) return <main className="min-h-screen bg-background" />;

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={signIn}
          className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8"
        >
          <h1 className="font-serif text-2xl text-foreground">BSGA Admin</h1>
          <p className="text-sm text-muted-foreground">Prihlás sa do administrácie.</p>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Prihlasujem…" : "Prihlásiť sa"}
          </Button>
        </form>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4">
          <span className="font-serif text-xl tracking-tight text-foreground">
            BSGA <span className="text-primary">Admin</span>
          </span>
          <nav className="flex flex-wrap items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto rounded-full"
            onClick={() => supabase.auth.signOut()}
          >
            Odhlásiť
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;