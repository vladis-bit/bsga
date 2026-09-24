import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Ban,
  CalendarRange,
  Ticket,
  CalendarDays,
  CalendarPlus,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  ShoppingBag,
  Sparkles,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";
import bsgaLogo from "@/assets/logo2.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Session } from "@supabase/supabase-js";

const pcLinks = [
  { to: "/admin", label: "Prehľad", end: true, icon: LayoutDashboard },
  { to: "/admin/rezervacie", label: "Rezervácie", icon: CalendarDays },
  { to: "/admin/kalendar", label: "Kalendár", icon: CalendarDays },
  { to: "/admin/blokovane-terminy", label: "Blokované termíny", icon: Ban },
  { to: "/admin/vytvorit-rezervaciu", label: "Vytvoriť rezerváciu", icon: CalendarPlus },
  { to: "/admin/obsah/clenstva", label: "Členstvá", icon: Ticket },
  { to: "/admin/pouzivatelia", label: "Používatelia", icon: Users },
  { to: "/admin/nastavenia", label: "Nastavenia", icon: Settings },
];

const webLinks = [
  { to: "/admin/spravy", label: "Správy", icon: MessageSquare },
  { to: "/admin/obsah/sluzby", label: "Služby", icon: Sparkles },
  { to: "/admin/obsah/obchod", label: "Obchod", icon: ShoppingBag },
  { to: "/admin/obsah/treneri", label: "Tréneri", icon: UserRound },
  { to: "/admin/obsah/turnaje", label: "Turnaje", icon: Trophy },
  { to: "/admin/obsah/eventy", label: "Eventy", icon: CalendarRange },
];

const links = [...pcLinks, ...webLinks];

const sections = [
  { key: "pc" as const, label: "BSGA PC admin", links: pcLinks },
  { key: "web" as const, label: "Web editor", links: webLinks },
];

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

/** Najdlhšia zhoda vyhráva pri vnorených administračných cestách. */
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
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
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

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Registrácia zlyhala", description: error.message, variant: "destructive" });
      return;
    }
    if (!data.session) {
      toast({
        title: "Skontrolujte e-mail",
        description: "Poslali sme vám potvrdzovací odkaz. Po potvrdení sa prihláste.",
      });
      setMode("signin");
      return;
    }
    toast({
      title: "Účet vytvorený",
      description: "Prístup do administrácie vám musí prideliť existujúci správca.",
    });
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

    const isSignup = mode === "signup";

    return (
      <main className="theme-ivory flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <form
          onSubmit={isSignup ? signUp : signIn}
          className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <h1 className="font-serif text-2xl text-foreground">BSGA Admin</h1>
          <p className="text-sm text-muted-foreground">
            {isSignup
              ? "Vytvorte si účet. Prístup do administrácie vám potom pridelí existujúci správca."
              : "Prihláste sa do administrácie."}
          </p>
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
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={isSignup ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? isSignup
                ? "Registrujem…"
                : "Prihlasujem…"
              : isSignup
                ? "Zaregistrovať sa"
                : "Prihlásiť sa"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setMode(isSignup ? "signin" : "signup")}
          >
            {isSignup ? "Späť na prihlásenie" : "Zaregistrovať sa"}
          </Button>
          {!isSignup && (
            <button
              type="button"
              onClick={() => setMode("reset")}
              className="w-full text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Zabudnuté heslo?
            </button>
          )}
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
      <SEO
        title="BSGA Admin"
        description="Interná administrácia BSGA – správa rezervácií Performance Centra, kalendár termínov, prijaté správy z formulárov a nastavenia pre administrátorov akadémie."
        path="/admin"
        noindex
        nofollow
      />
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur lg:hidden">
        <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <Link
              to="/admin"
              aria-label="BSGA Admin — prehľad"
              className="flex shrink-0 items-center"
            >
              <img
                src={bsgaLogo}
                alt="BSGA Admin"
                className="h-8 w-auto"
                decoding="async"
              />
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={menuOpen ? "Zavrieť menu" : "Otvoriť menu"}
                    aria-expanded={menuOpen}
                    aria-haspopup="dialog"
                    aria-controls="admin-mobile-menu"
                    className="min-h-11 min-w-11 rounded-full"
                  >
                    {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  id="admin-mobile-menu"
                  aria-labelledby="admin-mobile-menu-title"
                  aria-describedby="admin-mobile-menu-desc"
                  className="theme-ivory flex w-[86vw] max-w-sm flex-col bg-background p-0 text-foreground"
                >
                  <div className="flex items-center border-b border-border px-5 py-4">
                    <img src={bsgaLogo} alt="" aria-hidden="true" className="h-8 w-auto" />
                    <SheetTitle id="admin-mobile-menu-title" className="sr-only">
                      BSGA Admin — menu
                    </SheetTitle>
                    <SheetDescription id="admin-mobile-menu-desc" className="sr-only">
                      Navigácia v administrácii. Zatvoríte klávesou Escape.
                    </SheetDescription>
                  </div>
                  <nav aria-label="Administrácia — mobilné menu" className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                      {links.map((l) => {
                        const isActive = normalize(l.to) === activePath;
                        return (
                          <li key={l.to}>
                            <Link
                              to={l.to}
                              aria-current={isActive ? "page" : undefined}
                              onClick={() => setMenuOpen(false)}
                              className={`flex min-h-[48px] items-center gap-3 rounded-xl px-4 text-sm font-bold transition-colors ${
                                isActive
                                  ? "bg-foreground text-background"
                                  : "bg-muted/60 text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <l.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                              {l.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                  <div className="space-y-3 border-t border-border p-4">
                    <p className="truncate text-xs text-muted-foreground">
                      Prihlásený admin:{" "}
                      <strong className="font-semibold text-foreground">{session.user.email}</strong>
                    </p>
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
      </header>
      <div className="mx-auto flex w-full max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
          <div className="flex h-24 items-center border-b border-border px-6">
            <Link to="/admin" aria-label="BSGA Admin — prehľad">
              <img src={bsgaLogo} alt="BSGA Admin" className="h-10 w-auto" decoding="async" />
            </Link>
          </div>
          <nav aria-label="Hlavná administrácia" className="flex-1 overflow-y-auto px-3 py-5">
            <p className="px-3 pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Administrácia</p>
            <ul className="space-y-1.5">
              {links.map((l) => {
                const isActive = normalize(l.to) === activePath;
                return (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <l.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span>{l.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-border p-4">
            <div className="mb-3 flex items-start gap-2 rounded-xl bg-muted/60 p-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Prihlásený admin</p>
                <p className="truncate text-xs font-semibold text-foreground">{session.user.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start gap-2 rounded-xl" onClick={() => supabase.auth.signOut()}>
              <LogOut className="h-4 w-4" /> Odhlásiť
            </Button>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 xl:px-10 xl:py-10">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;