import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const ResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        setValid(true);
        setReady(true);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setValid(true);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Heslo je krátke", description: "Použi aspoň 8 znakov.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Heslá sa nezhodujú", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Zmena zlyhala", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Heslo zmenené", description: "Môžete sa prihlásiť novým heslom." });
    navigate("/admin");
  };

  if (!ready) return <main className="min-h-screen bg-background" />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <SEO
        title="Obnova hesla | BSGA"
        description="Obnova hesla pre administrátorský účet BSGA. Zadajte nové heslo a pokračujte do administrácie rezervácií BSGA Performance Center v Bratislave Petržalke."
        path="/reset-password"
        noindex
        nofollow
      />
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8">
        <h1 className="font-serif text-2xl text-foreground">Nové heslo</h1>
        {valid ? (
          <form onSubmit={submit} className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Nastav si nové prihlasovacie heslo.</p>
            <Input
              type="password"
              placeholder="Nové heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Zopakuj heslo"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Ukladám…" : "Uložiť heslo"}
            </Button>
          </form>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Odkaz na obnovu hesla je neplatný alebo expiroval. Vyžiadaj si nový.
            </p>
            <Button className="w-full" onClick={() => navigate("/admin")}>
              Späť na prihlásenie
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;