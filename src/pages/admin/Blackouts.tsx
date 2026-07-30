import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Blackout,
  Simulator,
  fetchBlackouts,
  fetchSimulators,
  fmtDateTime,
  translateDbError,
  PC_OPEN_HOUR,
  PC_CLOSE_HOUR,
} from "./shared";

const pad = (n: number) => String(n).padStart(2, "0");
const OPEN = `${pad(PC_OPEN_HOUR)}:00`;
const CLOSE = `${pad(PC_CLOSE_HOUR)}:00`;

const Blackouts = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Blackout[]>([]);
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [saving, setSaving] = useState(false);
  const [wholeDay, setWholeDay] = useState(true);
  const [form, setForm] = useState({
    simulator_id: "all",
    date_from: "",
    date_to: "",
    time_from: OPEN,
    time_to: CLOSE,
    reason: "",
  });

  const load = async () => {
    try {
      const [b, s] = await Promise.all([fetchBlackouts(), fetchSimulators()]);
      setRows(b);
      setSimulators(s);
    } catch (e) {
      toast({
        title: "Načítanie zlyhalo",
        description: translateDbError((e as Error).message),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simName = useMemo(
    () => Object.fromEntries(simulators.map((s) => [s.id, s.name])) as Record<string, string>,
    [simulators],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date_from) return;
    const dateTo = form.date_to || form.date_from;
    const starts = new Date(`${form.date_from}T${wholeDay ? OPEN : form.time_from}`);
    const ends = new Date(`${dateTo}T${wholeDay ? CLOSE : form.time_to}`);
    if (ends <= starts) {
      toast({ title: "Neplatný rozsah", description: "Koniec musí byť po začiatku.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("pc_blackouts").insert({
      simulator_id: form.simulator_id === "all" ? null : form.simulator_id,
      starts_at: starts.toISOString(),
      ends_at: ends.toISOString(),
      reason: form.reason || null,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Chyba", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    toast({ title: "Termín zablokovaný" });
    setForm((f) => ({ ...f, reason: "" }));
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("pc_blackouts").delete().eq("id", id);
    if (error) {
      toast({ title: "Chyba", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    setRows((list) => list.filter((r) => r.id !== id));
    toast({ title: "Blokovanie zrušené" });
  };

  const selectCls = "rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground";

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Blokované termíny</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Zablokuj celý deň alebo časový úsek (odstávka, servis, súkromná akcia). Na blokovaný termín sa
          nedá vytvoriť rezervácia.
        </p>
      </header>

      <form
        onSubmit={submit}
        className="grid gap-3 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <select
          className={selectCls}
          value={form.simulator_id}
          onChange={(e) => setForm({ ...form, simulator_id: e.target.value })}
        >
          <option value="all">Oba simulátory</option>
          {simulators.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={wholeDay}
            onChange={(e) => setWholeDay(e.target.checked)}
            className="h-4 w-4"
          />
          Celý deň ({OPEN}–{CLOSE})
        </label>
        <div className="hidden lg:block" />

        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Od dátumu</span>
          <Input
            type="date"
            value={form.date_from}
            onChange={(e) => setForm({ ...form, date_from: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Do dátumu (voliteľné)
          </span>
          <Input
            type="date"
            value={form.date_to}
            onChange={(e) => setForm({ ...form, date_to: e.target.value })}
          />
        </div>
        <div className="hidden lg:block" />

        {!wholeDay && (
          <>
            <div className="space-y-1">
              <span className="block text-xs uppercase tracking-wide text-muted-foreground">Od času</span>
              <Input
                type="time"
                value={form.time_from}
                onChange={(e) => setForm({ ...form, time_from: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <span className="block text-xs uppercase tracking-wide text-muted-foreground">Do času</span>
              <Input
                type="time"
                value={form.time_to}
                onChange={(e) => setForm({ ...form, time_to: e.target.value })}
              />
            </div>
            <div className="hidden lg:block" />
          </>
        )}

        <Input
          placeholder="Dôvod (napr. odstávka, servis)"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="sm:col-span-2"
        />
        <Button type="submit" className="rounded-full" disabled={saving}>
          {saving ? "Ukladám…" : "Zablokovať termín"}
        </Button>
      </form>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Od</th>
              <th className="px-6 py-3">Do</th>
              <th className="px-6 py-3">Simulátor</th>
              <th className="px-6 py-3">Dôvod</th>
              <th className="px-6 py-3 text-right">Akcia</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-muted-foreground">
                  Žiadne blokované termíny.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="px-6 py-4 text-foreground">{fmtDateTime(r.starts_at)}</td>
                <td className="px-6 py-4 text-foreground">{fmtDateTime(r.ends_at)}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {r.simulator_id ? simName[r.simulator_id] ?? "—" : "Oba simulátory"}
                </td>
                <td className="px-6 py-4 text-muted-foreground">{r.reason ?? "—"}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="destructive" size="sm" onClick={() => remove(r.id)}>
                    Zrušiť
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blackouts;
