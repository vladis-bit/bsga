import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import bsgaLogo from "@/assets/logo2.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  { to: "/admin/performance-center/vytvorit-rezervaciu", label: "Vytvoriť rezerváciu" },
  { to: "/admin/performance-center", label: "Performance Center" },
  { to: "/admin/spravy", label: "Správy" },
  { to: "/admin/nastavenia", label: "Nastavenia" },
];

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

/** Najdlhšia zhoda vyhráva, takže napr. /admin/performance-center/vytvorit-rezervaciu
 *  nezvýrazní zároveň aj položku Performance Center. */
const useActivePath = (pathname: string) => {
  const current = normalize(pathname);
  let best = "";
  for (const l of links) {
    const to = normalize(l.to);
    const matches = l.end ? current === to : current === to || current.startsWith(`${to}/`);
    if (matches && to.length > best.length) best = to;
  }
  return best;
};


const AdminLayout = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "reset">("signin");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const activePath = useActivePath(location.pathname);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

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

  if (!ready) return <main className="theme-ivory min-h-screen bg-background" />;

  if (!session) {
    if (mode === "reset") {
      return (
        <main className="theme-ivory flex min-h-screen items-center justify-center bg-background px-4 py-10">
          <form
            onSubmit={sendReset}
            className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <h1 className="font-serif text-2xl text-foreground">Zabudnuté heslo</h1>
            <p className="text-sm text-muted-foreground">
              Zadajte e-mail a pošleme vám odkaz na nastavenie nového hesla.
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
      <main className="theme-ivory flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <form
          onSubmit={signIn}
          className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <h1 className="font-serif text-2xl text-foreground">BSGA Admin</h1>
          <p className="text-sm text-muted-foreground">Prihláste sa do administrácie.</p>
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

  if (isAdmin === null)
    return (
      <main className="theme-ivory flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-border border-t-gold" />
          <p className="text-sm text-muted-foreground">Overujem oprávnenia…</p>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground underline"
          >
            Odhlásiť sa
          </button>
        </div>
      </main>
    );

  if (!isAdmin) {
    return (
      <main className="theme-ivory flex min-h-screen items-center justify-center bg-background px-4 py-10">
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
    <div className="theme-ivory min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            <Link
              to="/admin"
              aria-label="BSGA Admin — prehľad"
              className="flex shrink-0 items-center"
            >
              <img
                src={bsgaLogo}
                alt="BSGA Admin"
                className="h-8 w-auto lg:h-10"
                decoding="async"
              />
            </Link>
            <nav className="hidden flex-1 items-center gap-1 lg:flex">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors xl:px-4 xl:text-xs ${
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
            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden rounded-full lg:inline-flex"
                onClick={() => supabase.auth.signOut()}
              >
                Odhlásiť
              </Button>
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={menuOpen ? "Zavrieť menu" : "Otvoriť menu"}
                    className="rounded-full lg:hidden"
                  >
                    {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="theme-ivory flex w-[86vw] max-w-sm flex-col bg-background p-0 text-foreground"
                >
                  <div className="flex items-center border-b border-border px-5 py-4">
                    <img src={bsgaLogo} alt="BSGA Admin" className="h-8 w-auto" />
                  </div>
                  <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                      {links.map((l) => (
                        <li key={l.to}>
                          <NavLink
                            to={l.to}
                            end={l.end}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                              `flex min-h-[48px] items-center rounded-2xl px-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                                isActive
                                  ? "bg-foreground text-background"
                                  : "bg-muted/60 text-muted-foreground hover:text-foreground"
                              }`
                            }
                          >
                            {l.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="border-t border-border p-4">
                    <Button
                      variant="outline"
                      className="min-h-[48px] w-full rounded-2xl"
                      onClick={() => {
                        setMenuOpen(false);
                        supabase.auth.signOut();
                      }}
                    >
                      Odhlásiť
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;