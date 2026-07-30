import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Booking,
  Simulator,
  Blackout,
  addDays,
  fetchBookings,
  fetchSimulators,
  fetchBlackouts,
  fmtDate,
  fmtTime,
  startOfDay,
  startOfWeek,
  STATUS_LABEL,
  PAYMENT_LABEL,
  translateDbError,
  PC_OPEN_HOUR,
  PC_CLOSE_HOUR,
  PC_LAST_START_HOUR,
} from "./shared";

const DAY_NAMES = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

const CalendarView = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [blackouts, setBlackouts] = useState<Blackout[]>([]);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [b, s, bl] = await Promise.all([fetchBookings(), fetchSimulators(), fetchBlackouts()]);
        setBookings(b);
        setSimulators(s);
        setBlackouts(bl);
      } catch (e) {
        toast({
          title: "Nepodarilo sa načítať kalendár",
          description: translateDbError((e as Error).message),
          variant: "destructive",
        });
      }
    })();
  }, [toast]);

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const simName = useMemo(
    () => Object.fromEntries(simulators.map((s) => [s.id, s.name])) as Record<string, string>,
    [simulators],
  );

  const forCell = (simId: string, day: Date) =>
    bookings
      .filter((b) => {
        if (b.simulator_id !== simId || b.status === "cancelled") return false;
        const t = startOfDay(new Date(b.starts_at)).getTime();
        return t === startOfDay(day).getTime();
      })
      .sort((a, b) => a.starts_at.localeCompare(b.starts_at));

  const blackoutsFor = (simId: string, day: Date) => {
    const dayStart = startOfDay(day).getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    return blackouts.filter((bl) => {
      if (bl.simulator_id && bl.simulator_id !== simId) return false;
      return new Date(bl.starts_at).getTime() < dayEnd && new Date(bl.ends_at).getTime() > dayStart;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl text-foreground">Kalendár</h1>
        <p className="w-full text-xs text-muted-foreground">
          Otváracie hodiny: {PC_OPEN_HOUR}:00 – {PC_CLOSE_HOUR}:00 · posledná rezervácia začína o{" "}
          {PC_LAST_START_HOUR}:00 (Trackman 4 aj Trackman iO).
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full" onClick={() => setWeekStart(addDays(weekStart, -7))}>
            ← Predchádzajúci
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => setWeekStart(startOfWeek(new Date()))}>
            Tento týždeň
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => setWeekStart(addDays(weekStart, 7))}>
            Nasledujúci →
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-border bg-card">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-40 border-b border-border p-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Simulátor
              </th>
              {days.map((d, i) => (
                <th key={i} className="border-b border-l border-border p-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {DAY_NAMES[i]} {fmtDate(d)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {simulators.map((s) => (
              <tr key={s.id}>
                <td className="border-b border-border p-3 align-top font-semibold text-foreground">
                  {s.name}
                  <span className="block text-xs font-normal text-muted-foreground">
                    {s.hourly_rate_eur} €/hod
                  </span>
                </td>
                {days.map((d, i) => {
                  const items = forCell(s.id, d);
                  return (
                    <td key={i} className="border-b border-l border-border p-2 align-top">
                      <div className="space-y-1">
                        {items.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => setSelected(b)}
                            className="w-full rounded-xl bg-foreground px-2 py-1 text-left text-xs text-background transition-opacity hover:opacity-80"
                          >
                            {fmtTime(b.starts_at)} · {b.first_name} {b.last_name ?? ""}
                          </button>
                        ))}
                        {items.length === 0 && (
                          <span className="text-xs text-muted-foreground">voľné</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            {simulators.length === 0 && (
              <tr>
                <td className="p-6 text-muted-foreground" colSpan={8}>
                  Žiadne simulátory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl text-foreground">
                {selected.first_name} {selected.last_name ?? ""}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {fmtTime(selected.starts_at)} · {simName[selected.simulator_id] ?? "—"} ·{" "}
                {selected.duration_hours} h · {selected.price_eur} €
              </p>
              <p className="text-sm text-muted-foreground">
                {selected.email}
                {selected.phone ? ` · ${selected.phone}` : ""}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-primary">
                {STATUS_LABEL[selected.status] ?? selected.status} ·{" "}
                {PAYMENT_LABEL[selected.payment_status] ?? selected.payment_status}
              </p>
              {selected.note && (
                <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{selected.note}</p>
              )}
            </div>
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => setSelected(null)}>
              Zavrieť
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;