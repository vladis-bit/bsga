import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Booking,
  Simulator,
  addDays,
  fetchBookings,
  fetchSimulators,
  fmtDateTime,
  startOfDay,
  STATUS_LABEL,
} from "./shared";

const Stat = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="rounded-3xl border border-border bg-card p-6">
    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="mt-2 font-serif text-3xl text-foreground">{value}</p>
    {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const Overview = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [b, s] = await Promise.all([fetchBookings(), fetchSimulators()]);
        setBookings(b);
        setSimulators(s);
      } catch (e) {
        toast({
          title: "Nepodarilo sa načítať dáta",
          description: (e as Error).message,
          variant: "destructive",
        });
      }
      const { count } = await supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("is_read", false);
      setUnread(count ?? 0);
    })();
  }, [toast]);

  const simName = useMemo(
    () => Object.fromEntries(simulators.map((s) => [s.id, s.name])) as Record<string, string>,
    [simulators],
  );

  const today = startOfDay(new Date());
  const tomorrowEnd = addDays(today, 2);
  const weekEnd = addDays(today, 7);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const active = bookings.filter((b) => b.status !== "cancelled");
  const inRange = (b: Booking, from: Date, to: Date) => {
    const t = new Date(b.starts_at).getTime();
    return t >= from.getTime() && t < to.getTime();
  };

  const todayCount = active.filter((b) => inRange(b, today, addDays(today, 1))).length;
  const weekCount = active.filter((b) => inRange(b, today, weekEnd)).length;
  const monthBookings = active.filter((b) => inRange(b, monthStart, monthEnd));
  const monthRevenue = monthBookings.reduce((s, b) => s + Number(b.price_eur || 0), 0);
  const hoursBySim = simulators.map((s) => ({
    name: s.name,
    hours: active
      .filter((b) => b.simulator_id === s.id && inRange(b, today, weekEnd))
      .reduce((sum, b) => sum + Number(b.duration_hours || 0), 0),
  }));

  const upcoming = active
    .filter((b) => inRange(b, today, tomorrowEnd))
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl text-foreground">Prehľad</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Dnes" value={String(todayCount)} hint="rezervácií" />
        <Stat label="Najbližších 7 dní" value={String(weekCount)} hint="rezervácií" />
        <Stat
          label="Tržby tento mesiac"
          value={`${monthRevenue.toFixed(0)} €`}
          hint={`${monthBookings.length} rezervácií`}
        />
        <Stat label="Neprečítané správy" value={String(unread)} hint="kontaktné formuláre" />
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl text-foreground">Obsadenosť (7 dní)</h2>
          <ul className="mt-4 space-y-3">
            {hoursBySim.map((s) => (
              <li key={s.name} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{s.name}</span>
                <span className="font-bold text-primary">{s.hours} h</span>
              </li>
            ))}
            {hoursBySim.length === 0 && (
              <li className="text-sm text-muted-foreground">Žiadne simulátory.</li>
            )}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl text-foreground">Najbližšie rezervácie</h2>
          <ul className="mt-4 space-y-3">
            {upcoming.length === 0 && (
              <li className="text-sm text-muted-foreground">Dnes ani zajtra nič naplánované.</li>
            )}
            {upcoming.map((b) => (
              <li key={b.id} className="rounded-2xl border border-border p-4 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {b.first_name} {b.last_name ?? ""}
                  </span>
                  <Badge variant="outline" className="rounded-full text-[10px]">
                    {STATUS_LABEL[b.status] ?? b.status}
                  </Badge>
                </div>
                <p className="mt-1 text-muted-foreground">
                  {fmtDateTime(b.starts_at)} · {simName[b.simulator_id] ?? "—"} ·{" "}
                  {b.duration_hours} h{b.phone ? ` · ${b.phone}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <Link
            to="/admin/rezervacie"
            className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-primary underline-offset-4 hover:underline"
          >
            Všetky rezervácie
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Overview;