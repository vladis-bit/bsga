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
  { to: "/admin/blokovane-terminy", label: "Blokované termíny" },
  { to: "/admin/spravy", label: "Správy" },
  { to: "/admin/nastavenia", label: "Nastavenia" },
];

const AdminLayout = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "reset">("signin");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    let cancelled = false;
    supabase
      .rpc("has_role", { _user_id: session.user.id, _role: "admin" })
      .then(({ data, error }) => {
        if (!cancelled) setIsAdmin(!error && data === true);
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error)
      toast({ title: "Prihlásenie zlyhalo", description: error.message, variant: "destructive" });
  };

  const sendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Odoslanie zlyhalo", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: "E-mail odoslaný",
      description: "Ak účet existuje, poslali sme naň odkaz na obnovu hesla.",
    });
    setMode("signin");
  };

  if (!ready) return <main className="min-h-screen bg-background" />;

  if (!session) {
    if (mode === "reset") {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
          <form
            onSubmit={sendReset}
            className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8"
          >
            <h1 className="font-serif text-2xl text-foreground">Zabudnuté heslo</h1>
            <p className="text-sm text-muted-foreground">
              Zadaj e-mail a pošleme ti odkaz na nastavenie nového hesla.
            </p>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Odosielam…" : "Poslať odkaz"}
            </Button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="w-full text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Späť na prihlásenie
            </button>
          </form>
        </main>
      );
    }

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
          <button
            type="button"
            onClick={() => setMode("reset")}
            className="w-full text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            Zabudnuté heslo?
          </button>
        </form>
      </main>
    );
  }

  if (isAdmin === null) return <main className="min-h-screen bg-background" />;

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8 text-center">
          <h1 className="font-serif text-2xl text-foreground">Prístup zamietnutý</h1>
          <p className="text-sm text-muted-foreground">
            Tento účet nemá oprávnenie administrátora.
          </p>
          <Button className="w-full" onClick={() => supabase.auth.signOut()}>
            Odhlásiť sa
          </Button>
        </div>
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