import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Booking,
  PAYMENT_LABEL,
  STATUS_LABEL,
  Simulator,
  addDays,
  fetchBookings,
  fetchSimulators,
  fmtDateTime,
  startOfDay,
  translateDbError,
} from "./shared";

type RangeKey = "today" | "week" | "month" | "all";

const Bookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [range, setRange] = useState<RangeKey>("week");
  const [sim, setSim] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    simulator_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    duration_hours: "1",
    note: "",
  });

  const load = async () => {
    try {
      const [b, s] = await Promise.all([fetchBookings(), fetchSimulators()]);
      setBookings(b);
      setSimulators(s);
      setForm((f) => ({ ...f, simulator_id: f.simulator_id || s[0]?.id || "" }));
    } catch (e) {
      toast({
        title: "Nepodarilo sa načítať rezervácie",
        description: translateDbError((e as Error).message),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simById = useMemo(
    () => Object.fromEntries(simulators.map((s) => [s.id, s])) as Record<string, Simulator>,
    [simulators],
  );

  const filtered = useMemo(() => {
    const from = startOfDay(new Date());
    const to =
      range === "today" ? addDays(from, 1) : range === "week" ? addDays(from, 7) : addDays(from, 31);
    const needle = q.trim().toLowerCase();
    return bookings
      .filter((b) => {
        if (range !== "all") {
          const t = new Date(b.starts_at).getTime();
          if (t < from.getTime() || t >= to.getTime()) return false;
        }
        if (sim !== "all" && b.simulator_id !== sim) return false;
        if (status !== "all" && b.status !== status) return false;
        if (needle) {
          const hay = `${b.first_name} ${b.last_name ?? ""} ${b.email} ${b.phone ?? ""}`.toLowerCase();
          if (!hay.includes(needle)) return false;
        }
        return true;
      })
      .sort((a, b) => b.starts_at.localeCompare(a.starts_at));
  }, [bookings, range, sim, status, q]);

  const patch = async (id: string, values: Partial<Booking>) => {
    const { error } = await supabase.from("pc_bookings").update(values).eq("id", id);
    if (error) {
      toast({ title: "Chyba", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    setBookings((list) => list.map((b) => (b.id === id ? { ...b, ...values } : b)));
  };

  const createBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const simulator = simById[form.simulator_id];
    if (!simulator || !form.date || !form.time) return;
    setSaving(true);
    const starts = new Date(`${form.date}T${form.time}`);
    const hours = Number(form.duration_hours) || 1;
    const { error } = await supabase.from("pc_bookings").insert({
      simulator_id: form.simulator_id,
      first_name: form.first_name,
      last_name: form.last_name || null,
      email: form.email,
      phone: form.phone || null,
      starts_at: starts.toISOString(),
      duration_hours: hours,
      price_eur: hours * Number(simulator.hourly_rate_eur || 0),
      status: "confirmed",
      note: form.note || null,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Chyba", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    toast({ title: "Rezervácia pridaná" });
    setShowForm(false);
    setForm((f) => ({ ...f, first_name: "", last_name: "", email: "", phone: "", note: "" }));
    load();
  };

  const exportCsv = () => {
    const rows = [
      ["Začiatok", "Simulátor", "Meno", "E-mail", "Telefón", "Hodiny", "Cena", "Stav", "Platba"],
      ...filtered.map((b) => [
        fmtDateTime(b.starts_at),
        simById[b.simulator_id]?.name ?? "",
        `${b.first_name} ${b.last_name ?? ""}`.trim(),
        b.email,
        b.phone ?? "",
        String(b.duration_hours),
        String(b.price_eur),
        STATUS_LABEL[b.status] ?? b.status,
        PAYMENT_LABEL[b.payment_status] ?? b.payment_status,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `bsga-rezervacie-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectCls =
    "rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl text-foreground">Rezervácie</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full" onClick={exportCsv}>
            Export CSV
          </Button>
          <Button className="rounded-full" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Zavrieť" : "Pridať rezerváciu"}
          </Button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={createBooking}
          className="grid gap-3 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <select
            className={selectCls}
            value={form.simulator_id}
            onChange={(e) => setForm({ ...form, simulator_id: e.target.value })}
            required
          >
            {simulators.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.hourly_rate_eur} €/hod
              </option>
            ))}
          </select>
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
          <Input
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            placeholder="Telefón"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <Input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />
          <Input
            type="number"
            min="0.5"
            step="0.5"
            placeholder="Počet hodín"
            value={form.duration_hours}
            onChange={(e) => setForm({ ...form, duration_hours: e.target.value })}
            required
          />
          <Input
            placeholder="Poznámka"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
          <Button type="submit" className="rounded-full" disabled={saving}>
            {saving ? "Ukladám…" : "Uložiť rezerváciu"}
          </Button>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        <select className={selectCls} value={range} onChange={(e) => setRange(e.target.value as RangeKey)}>
          <option value="today">Dnes</option>
          <option value="week">Najbližších 7 dní</option>
          <option value="month">Najbližších 31 dní</option>
          <option value="all">Všetko</option>
        </select>
        <select className={selectCls} value={sim} onChange={(e) => setSim(e.target.value)}>
          <option value="all">Všetky simulátory</option>
          {simulators.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <select className={selectCls} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Všetky stavy</option>
          <option value="pending">Čaká na potvrdenie</option>
          <option value="confirmed">Potvrdená</option>
          <option value="cancelled">Zrušená</option>
        </select>
        <Input
          className="max-w-xs"
          placeholder="Hľadať meno, e-mail, telefón"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">Žiadne rezervácie pre zvolený filter.</p>
        )}
        {filtered.map((b) => (
          <article key={b.id} className="rounded-3xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold text-foreground">
                {b.first_name} {b.last_name ?? ""}
              </span>
              <Badge
                className="rounded-full text-[10px]"
                variant={b.status === "cancelled" ? "destructive" : "outline"}
              >
                {STATUS_LABEL[b.status] ?? b.status}
              </Badge>
              <Badge variant="outline" className="rounded-full text-[10px]">
                {PAYMENT_LABEL[b.payment_status] ?? b.payment_status}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {fmtDateTime(b.starts_at)} · {simById[b.simulator_id]?.name ?? "—"} · {b.duration_hours} h
              · {b.price_eur} €
            </p>
            <p className="text-sm text-muted-foreground">
              {b.email}
              {b.phone ? ` · ${b.phone}` : ""}
            </p>
            {b.note && <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{b.note}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              {b.status !== "confirmed" && (
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => patch(b.id, { status: "confirmed" })}>
                  Potvrdiť
                </Button>
              )}
              {b.status !== "cancelled" && (
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => patch(b.id, { status: "cancelled" })}>
                  Zrušiť
                </Button>
              )}
              {b.payment_status !== "paid" && (
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => patch(b.id, { payment_status: "paid" })}>
                  Označiť ako zaplatené
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Bookings;