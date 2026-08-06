import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  RecurringBlock,
  Simulator,
  WEEKDAYS_SK,
  fetchRecurringBlocks,
  translateDbError,
  weekdayLabel,
} from "./shared";

const selectCls = "rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground";
const hhmm = (t: string) => t.slice(0, 5);
const fmtDate = (d: string) => new Date(`${d}T00:00:00`).toLocaleDateString("sk-SK");

const emptyForm = {
  simulator_id: "all",
  weekday: "2",
  start_time: "10:00",
  end_time: "13:00",
  valid_from: new Date().toISOString().slice(0, 10),
  valid_until: "",
  reason: "",
};

/** Správa opakovaných (týždenných) blokácií simulátorov. */
const RecurringBlocks = ({ simulators }: { simulators: Simulator[] }) => {
  const { toast } = useToast();
  const [rows, setRows] = useState<RecurringBlock[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setRows(await fetchRecurringBlocks());
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
    if (form.end_time <= form.start_time) {
      toast({
        title: "Neplatný rozsah",
        description: "Čas do musí byť neskôr ako čas od.",
        variant: "destructive",
      });
      return;
    }
    if (form.valid_until && form.valid_until < form.valid_from) {
      toast({
        title: "Neplatná platnosť",
        description: "Platnosť do musí byť po dátume platnosť od.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("pc_recurring_blocks").insert({
      simulator_id: form.simulator_id === "all" ? null : form.simulator_id,
      weekday: Number(form.weekday),
      start_time: form.start_time,
      end_time: form.end_time,
      valid_from: form.valid_from,
      valid_until: form.valid_until || null,
      reason: form.reason || null,
      created_by: (await supabase.auth.getUser()).data.user?.id ?? null,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Chyba", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    toast({ title: "Opakovaná blokácia pridaná" });
    setForm({ ...form, reason: "" });
    load();
  };

  const toggle = async (r: RecurringBlock) => {
    const { error } = await supabase
      .from("pc_recurring_blocks")
      .update({ is_active: !r.is_active })
      .eq("id", r.id);
    if (error) {
      toast({ title: "Chyba", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    setRows((list) => list.map((x) => (x.id === r.id ? { ...x, is_active: !x.is_active } : x)));
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("pc_recurring_blocks").delete().eq("id", id);
    if (error) {
      toast({ title: "Chyba", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    setRows((list) => list.filter((r) => r.id !== id));
    toast({ title: "Opakovaná blokácia zmazaná" });
  };

  return (
    <section className="space-y-6 border-t border-border pt-8">
      <header>
        <h2 className="font-serif text-2xl text-foreground">Opakované blokácie</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pravidelný týždenný blok – napríklad každý utorok 10:00–13:00 je Trackman 4 obsadený pre
          stáleho klienta. Na takýto termín sa nedá vytvoriť rezervácia.
        </p>
      </header>

      <form
        onSubmit={submit}
        className="grid gap-3 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Simulátor</span>
          <select
            className={`${selectCls} w-full`}
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
        </div>
        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Deň v týždni
          </span>
          <select
            className={`${selectCls} w-full`}
            value={form.weekday}
            onChange={(e) => setForm({ ...form, weekday: e.target.value })}
          >
            {WEEKDAYS_SK.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden lg:block" />

        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Čas od</span>
          <Input
            type="time"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Čas do</span>
          <Input
            type="time"
            value={form.end_time}
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
            required
          />
        </div>
        <div className="hidden lg:block" />

        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Platnosť od
          </span>
          <Input
            type="date"
            value={form.valid_from}
            onChange={(e) => setForm({ ...form, valid_from: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Platnosť do (voliteľné)
          </span>
          <Input
            type="date"
            value={form.valid_until}
            onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
          />
        </div>
        <div className="hidden lg:block" />

        <Input
          placeholder="Dôvod (napr. stály klient)"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="sm:col-span-2"
        />
        <Button type="submit" className="rounded-full" disabled={saving}>
          {saving ? "Ukladám…" : "Pridať opakovanú blokáciu"}
        </Button>
      </form>

      <div className="overflow-x-auto rounded-3xl border border-border bg-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Deň</th>
              <th className="px-6 py-3">Čas</th>
              <th className="px-6 py-3">Simulátor</th>
              <th className="px-6 py-3">Platnosť</th>
              <th className="px-6 py-3">Dôvod</th>
              <th className="px-6 py-3 text-right">Akcia</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-muted-foreground">
                  Žiadne opakované blokácie.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className={`border-t border-border ${r.is_active ? "" : "opacity-60"}`}>
                <td className="px-6 py-4 text-foreground">{weekdayLabel(r.weekday)}</td>
                <td className="px-6 py-4 text-foreground">
                  {hhmm(r.start_time)}–{hhmm(r.end_time)}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {r.simulator_id ? simName[r.simulator_id] ?? "—" : "Oba simulátory"}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {fmtDate(r.valid_from)} – {r.valid_until ? fmtDate(r.valid_until) : "donekonečna"}
                </td>
                <td className="px-6 py-4 text-muted-foreground">{r.reason ?? "—"}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="rounded-full" onClick={() => toggle(r)}>
                      {r.is_active ? "Deaktivovať" : "Aktivovať"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => remove(r.id)}>
                      Zmazať
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecurringBlocks;