import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  RecurringBlock,
  Simulator,
  fetchRecurringBlocks,
  fetchSimulators,
  translateDbError,
  validateOpeningHours,
} from "./shared";

const selectCls = "w-full rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground";

type Slot = { simulator_id: string | null; starts_at: string; ends_at: string; kind: string };

const emptyForm = {
  simulator_id: "",
  date: "",
  time_from: "10:00",
  time_to: "11:00",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  note: "",
};

/** Admin vytvára rezerváciu za klienta (bez 14-dňového okna). */
const CreateBooking = () => {
  const { toast } = useToast();
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [recurring, setRecurring] = useState<RecurringBlock[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [sendEmail, setSendEmail] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([fetchSimulators(), fetchRecurringBlocks()])
      .then(([s, r]) => {
        setSimulators(s);
        setRecurring(r);
        setForm((f) => ({ ...f, simulator_id: f.simulator_id || s[0]?.id || "" }));
      })
      .catch((e) =>
        toast({
          title: "Načítanie zlyhalo",
          description: translateDbError((e as Error).message),
          variant: "destructive",
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simById = useMemo(
    () => Object.fromEntries(simulators.map((s) => [s.id, s])) as Record<string, Simulator>,
    [simulators],
  );

  const minutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + (m || 0);
  };

  const hours = useMemo(
    () => (minutes(form.time_to) - minutes(form.time_from)) / 60,
    [form.time_from, form.time_to],
  );

  const price = useMemo(
    () => Math.max(hours, 0) * Number(simById[form.simulator_id]?.hourly_rate_eur ?? 0),
    [hours, simById, form.simulator_id],
  );

  /** Kolízie s rezerváciami, jednorazovými blokáciami a opakovanými blokáciami. */
  const findConflict = async (): Promise<string | null> => {
    const start = new Date(`${form.date}T${form.time_from}`);
    const end = new Date(`${form.date}T${form.time_to}`);

    const day = new Date(form.date + "T00:00:00");
    const active = recurring.filter((r) => {
      if (!r.is_active) return false;
      if (r.simulator_id && r.simulator_id !== form.simulator_id) return false;
      if (r.weekday !== day.getDay()) return false;
      if (r.valid_from > form.date) return false;
      if (r.valid_until && r.valid_until < form.date) return false;
      return (
        minutes(r.start_time.slice(0, 5)) < minutes(form.time_to) &&
        minutes(r.end_time.slice(0, 5)) > minutes(form.time_from)
      );
    });
    if (active.length) {
      return `Termín koliduje s opakovanou blokáciou (${active[0].reason ?? "opakovaná blokácia"}).`;
    }

    const { data, error } = await supabase.rpc("get_pc_day_slots", { _day: form.date });
    if (error) return translateDbError(error.message);
    const hit = (data as Slot[] | null)?.find((s) => {
      if (s.simulator_id && s.simulator_id !== form.simulator_id) return false;
      return new Date(s.starts_at) < end && new Date(s.ends_at) > start;
    });
    if (hit) {
      return hit.kind === "booked"
        ? "Termín koliduje s existujúcou rezerváciou na tomto simulátore."
        : "Termín koliduje s blokovaným termínom.";
    }
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.simulator_id || !form.date) return;
    if (hours <= 0) {
      toast({
        title: "Neplatný rozsah",
        description: "Čas do musí byť neskôr ako čas od.",
        variant: "destructive",
      });
      return;
    }
    const hoursError = validateOpeningHours(form.time_from, hours);
    if (hoursError) {
      toast({ title: "Mimo otváracích hodín", description: hoursError, variant: "destructive" });
      return;
    }

    setSaving(true);
    const conflict = await findConflict();
    if (conflict) {
      setSaving(false);
      toast({ title: "Termín nie je voľný", description: conflict, variant: "destructive" });
      return;
    }

    const starts = new Date(`${form.date}T${form.time_from}`);
    const { data, error } = await supabase
      .from("pc_bookings")
      .insert({
        simulator_id: form.simulator_id,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        starts_at: starts.toISOString(),
        duration_hours: hours,
        price_eur: price,
        status: "confirmed",
        payment_status: "unpaid",
        note: form.note.trim() || null,
        created_by_admin: true,
      })
      .select("id")
      .single();
    setSaving(false);

    if (error) {
      toast({
        title: "Rezerváciu sa nepodarilo vytvoriť",
        description: translateDbError(error.message),
        variant: "destructive",
      });
      return;
    }

    if (sendEmail) {
      supabase.functions
        .invoke("send-booking-confirmation", { body: { bookingId: data.id } })
        .catch((err) => console.error("send-booking-confirmation failed:", err));
    }

    toast({
      title: "Rezervácia vytvorená",
      description: sendEmail ? "Potvrdenie sme odoslali klientovi." : "Bez potvrdzovacieho e-mailu.",
    });
    setForm((f) => ({ ...f, first_name: "", last_name: "", email: "", phone: "", note: "" }));
  };

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <Link
          to="/admin/performance-center"
          className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
        >
          ← Performance Center
        </Link>
        <h1 className="font-serif text-3xl text-foreground">Vytvoriť rezerváciu</h1>
        <p className="text-sm text-muted-foreground">
          Rezervácia za klienta (telefonicky alebo osobne). Admin nie je obmedzený rezervačným oknom
          14 dní.
        </p>
      </header>

      <form
        onSubmit={submit}
        className="grid gap-3 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Simulátor</span>
          <select
            className={selectCls}
            value={form.simulator_id}
            onChange={(e) => setForm({ ...form, simulator_id: e.target.value })}
            required
          >
            {simulators.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {Number(s.hourly_rate_eur).toFixed(0)} €/hod
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Dátum</span>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div className="hidden lg:block" />

        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Čas od</span>
          <Input
            type="time"
            value={form.time_from}
            onChange={(e) => setForm({ ...form, time_from: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Čas do</span>
          <Input
            type="time"
            value={form.time_to}
            onChange={(e) => setForm({ ...form, time_to: e.target.value })}
            required
          />
        </div>
        <div className="hidden lg:block" />

        <Input
          placeholder="Meno"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
        />
        <Input
          placeholder="Priezvisko"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        />
        <div className="hidden lg:block" />

        <Input
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          type="tel"
          placeholder="Telefón"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <div className="hidden lg:block" />

        <Input
          placeholder="Poznámka"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="sm:col-span-2"
        />
        <div className="hidden lg:block" />

        <label className="flex items-center gap-2 text-sm text-foreground sm:col-span-2">
          <input
            type="checkbox"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e.target.checked)}
            className="h-4 w-4"
          />
          Odoslať potvrdzovací e-mail klientovi
        </label>

        <p className="text-sm text-muted-foreground sm:col-span-2">
          Dĺžka: <strong className="text-foreground">{hours > 0 ? hours : 0} h</strong> · Cena:{" "}
          <strong className="text-foreground">{price.toFixed(2)} €</strong>
        </p>
        <Button type="submit" className="rounded-full" disabled={saving}>
          {saving ? "Ukladám…" : "Vytvoriť rezerváciu"}
        </Button>
      </form>
    </div>
  );
};

export default CreateBooking;