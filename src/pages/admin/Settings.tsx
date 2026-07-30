import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Admins from "./Admins";
import {
  Simulator,
  fetchSimulators,
  PC_OPEN_HOUR,
  PC_CLOSE_HOUR,
  PC_LAST_START_HOUR,
} from "./shared";

const Settings = () => {
  const { toast } = useToast();
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchSimulators().then(setSimulators).catch(() => undefined);
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Heslo je krátke", description: "Použi aspoň 8 znakov.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast({ title: "Zmena zlyhala", description: error.message, variant: "destructive" });
      return;
    }
    setPassword("");
    toast({ title: "Heslo zmenené" });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          03 — Správa systému
        </p>
        <h1 className="mt-1 font-serif text-3xl text-foreground">Nastavenia</h1>
      </div>

      <section className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="bg-foreground px-6 py-5">
          <h2 className="font-serif text-2xl text-background">Admin prístupy</h2>
          <p className="mt-1 text-sm text-background/70">
            Pridaj alebo odober admin rolu podľa e-mailu. Účet musí už existovať.
          </p>
        </div>
        <div className="p-6 sm:p-8">
          <Admins />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl text-foreground">Môj účet</h2>
          <p className="mt-1 text-sm text-muted-foreground">{email || "—"}</p>
          <form onSubmit={changePassword} className="mt-4 space-y-3">
            <Input
              type="password"
              placeholder="Nové heslo (min. 8 znakov)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="rounded-full" disabled={busy}>
              {busy ? "Ukladám…" : "Zmeniť heslo"}
            </Button>
          </form>
          <Button
            variant="outline"
            className="mt-3 rounded-full"
            onClick={() => supabase.auth.signOut()}
          >
            Odhlásiť sa
          </Button>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl text-foreground">Performance Center</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Otváracie hodiny {PC_OPEN_HOUR}:00–{PC_CLOSE_HOUR}:00 · posledná rezervácia začína o{" "}
            {PC_LAST_START_HOUR}:00.
          </p>
          <ul className="mt-4 space-y-3">
            {simulators.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-2xl border border-border p-4 text-sm">
                <span className="font-semibold text-foreground">{s.name}</span>
                <span className="font-bold text-primary">{s.hourly_rate_eur} €/hod</span>
              </li>
            ))}
            {simulators.length === 0 && (
              <li className="text-sm text-muted-foreground">Žiadne simulátory.</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Settings;
