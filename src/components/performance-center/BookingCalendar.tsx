import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Simulator,
  PC_TIME_SLOTS,
  addDays,
  fetchSimulators,
  startOfDay,
  translateDbError,
  validateOpeningHours,
  PC_OPEN_HOUR,
  PC_CLOSE_HOUR,
} from "@/pages/admin/shared";

type Slot = { simulator_id: string; starts_at: string; ends_at: string; kind: string };
type SlotState = "free" | "booked" | "blocked" | "past";

const pad = (n: number) => String(n).padStart(2, "0");
const dateKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const fmtFullDate = (d: Date) => {
  const s = d.toLocaleDateString("sk-SK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const slotDate = (day: Date, time: string) => {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(day);
  d.setHours(h, m || 0, 0, 0);
  return d;
};

const emptyForm = { first_name: "", last_name: "", email: "", phone: "", hours: "1" };

/** Klientský rezervačný kalendár BSGA Performance Center (funguje aj bez prihlásenia). */
const BookingCalendar = () => {
  const { toast } = useToast();
  const [day, setDay] = useState(() => startOfDay(new Date()));
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState<{ sim: Simulator; time: string } | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState<null | { sim: string; time: string; hours: number; price: number }>(
    null,
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [sims, res] = await Promise.all([
        fetchSimulators(),
        supabase.rpc("get_pc_day_slots", { _day: dateKey(day) }),
      ]);
      if (res.error) throw res.error;
      setSimulators(sims.filter((s) => s.is_active));
      setSlots((res.data ?? []) as Slot[]);
    } catch (e) {
      toast({
        title: "Nepodarilo sa načítať kalendár",
        description: translateDbError((e as Error).message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [day, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const stateOf = useMemo(() => {
    return (simId: string, time: string): SlotState => {
      const start = slotDate(day, time).getTime();
      const end = start + 30 * 60 * 1000;
      if (start <= Date.now()) return "past";
      const hit = slots.find((s) => {
        if (s.simulator_id && s.simulator_id !== simId) return false;
        return new Date(s.starts_at).getTime() < end && new Date(s.ends_at).getTime() > start;
      });
      if (!hit) return "free";
      return hit.kind === "blocked" ? "blocked" : "booked";
    };
  }, [slots, day]);

  const openForm = (sim: Simulator, time: string) => {
    setForm(emptyForm);
    setPicked({ sim, time });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!picked) return;
    const hours = Number(form.hours) || 1;
    const hoursError = validateOpeningHours(picked.time, hours);
    if (hoursError) {
      toast({ title: "Mimo otváracích hodín", description: hoursError, variant: "destructive" });
      return;
    }
    const starts = slotDate(day, picked.time);
    const price = hours * Number(picked.sim.hourly_rate_eur);
    setSaving(true);
    const { data, error } = await supabase
      .from("pc_bookings")
      .insert({
        simulator_id: picked.sim.id,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        starts_at: starts.toISOString(),
        duration_hours: hours,
        price_eur: price,
        status: "confirmed",
        payment_status: "unpaid",
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
      load();
      return;
    }

    supabase.functions
      .invoke("send-booking-confirmation", { body: { bookingId: data.id } })
      .catch((err) => console.error("send-booking-confirmation failed:", err));

    setPicked(null);
    setDone({ sim: picked.sim.name, time: picked.time, hours, price });
    load();
  };

  const cellClass = (state: SlotState) =>
    ({
      free: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
      booked: "border-border bg-muted text-muted-foreground cursor-not-allowed",
      blocked: "border-border bg-foreground/5 text-muted-foreground line-through cursor-not-allowed",
      past: "border-border bg-background text-muted-foreground/50 cursor-not-allowed",
    })[state];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setDay(addDays(day, -1))}
          >
            ←
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setDay(startOfDay(new Date()))}
          >
            Dnes
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setDay(addDays(day, 1))}
          >
            →
          </Button>
        </div>
        <span className="font-serif text-lg text-foreground sm:text-xl">{fmtFullDate(day)}</span>
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-emerald-200 bg-emerald-50" /> Voľné
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-border bg-muted" /> Rezervované
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-border bg-foreground/20" /> Blokované
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Otváracie hodiny: {PC_OPEN_HOUR}:00 – {PC_CLOSE_HOUR}:00. Kliknite na voľný termín a vyplňte
        krátky formulár.
      </p>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <div className="min-w-[420px]">
            <div
              className="grid border-b border-border bg-foreground"
              style={{ gridTemplateColumns: `88px repeat(${Math.max(simulators.length, 1)}, 1fr)` }}
            >
              <div className="px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-background/70">
                Čas
              </div>
              {simulators.map((s) => (
                <div key={s.id} className="px-3 py-3 text-center">
                  <div className="font-serif text-sm text-background sm:text-base">{s.name}</div>
                  <div className="text-[11px] text-background/70">
                    {Number(s.hourly_rate_eur).toFixed(0)} € / hod
                  </div>
                </div>
              ))}
            </div>

            {loading ? (
              <div className="p-8 text-center text-sm text-muted-foreground">Načítavam…</div>
            ) : (
              PC_TIME_SLOTS.map((time) => (
                <div
                  key={time}
                  className="grid border-b border-border last:border-0"
                  style={{
                    gridTemplateColumns: `88px repeat(${Math.max(simulators.length, 1)}, 1fr)`,
                  }}
                >
                  <div className="flex items-center px-3 py-1.5 text-xs font-bold text-muted-foreground">
                    {time}
                  </div>
                  {simulators.map((s) => {
                    const state = stateOf(s.id, time);
                    return (
                      <div key={s.id} className="p-1">
                        <button
                          type="button"
                          disabled={state !== "free"}
                          onClick={() => openForm(s, time)}
                          className={`w-full rounded-lg border px-2 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${cellClass(state)}`}
                        >
                          {state === "free"
                            ? "Voľné"
                            : state === "booked"
                              ? "Rezervované"
                              : state === "blocked"
                                ? "Blokované"
                                : "—"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Dialog open={!!picked} onOpenChange={(o) => !o && setPicked(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Rezervácia termínu</DialogTitle>
            <DialogDescription>
              {picked?.sim.name} · {fmtFullDate(day)} o {picked?.time}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Meno"
                required
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              />
              <Input
                placeholder="Priezvisko"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              />
            </div>
            <Input
              type="email"
              placeholder="E-mail"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              type="tel"
              placeholder="Telefón"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Počet hodín
              </label>
              <Input
                type="number"
                min={1}
                max={8}
                step={0.5}
                required
                value={form.hours}
                onChange={(e) => setForm({ ...form, hours: e.target.value })}
              />
            </div>
            {picked && (
              <p className="text-sm text-muted-foreground">
                Cena:{" "}
                <strong className="text-foreground">
                  {((Number(form.hours) || 0) * Number(picked.sim.hourly_rate_eur)).toFixed(2)} €
                </strong>
              </p>
            )}
            <Button type="submit" className="w-full rounded-full" disabled={saving}>
              {saving ? "Odosielam…" : "Potvrdiť rezerváciu"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!done} onOpenChange={(o) => !o && setDone(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Rezervácia potvrdená</DialogTitle>
            <DialogDescription>
              Potvrdenie sme odoslali na zadaný e-mail spolu s odkazom na detail a zrušenie
              rezervácie.
            </DialogDescription>
          </DialogHeader>
          {done && (
            <div className="space-y-1 rounded-2xl border border-border bg-muted/40 p-4 text-sm">
              <p>
                <strong>{done.sim}</strong>
              </p>
              <p>
                {fmtFullDate(day)} o {done.time} · {done.hours} h
              </p>
              <p>
                Cena: <strong>{done.price.toFixed(2)} €</strong>
              </p>
            </div>
          )}
          <Button className="w-full rounded-full" onClick={() => setDone(null)}>
            Zavrieť
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingCalendar;