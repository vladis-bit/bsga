import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Booking,
  Message,
  Simulator,
  addDays,
  fetchBookings,
  fetchSimulators,
  fmtDateTime,
  startOfDay,
  STATUS_LABEL,
  PC_OPEN_HOUR,
  PC_CLOSE_HOUR,
  PC_LAST_START_HOUR,
} from "./shared";

const Stat = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="rounded-2xl border border-border bg-background/60 p-4 sm:p-5">
    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-xs">
      {label}
    </p>
    <p className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">{value}</p>
    {hint && <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{hint}</p>}
  </div>
);

const Overview = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [unread, setUnread] = useState(0);
  const [latestMessages, setLatestMessages] = useState<Message[]>([]);
  const [adminCount, setAdminCount] = useState<number | null>(null);

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

      const { data: msgs } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);
      setLatestMessages((msgs ?? []) as Message[]);

      const { data: adminsData } = await supabase.rpc("list_admin_users");
      setAdminCount(adminsData ? adminsData.length : null);
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
    <div className="space-y-6 sm:space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-background px-5 py-10 sm:rounded-3xl sm:px-8 sm:py-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            BSGA Administrácia
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-balance font-serif text-3xl font-bold leading-[1.08] text-foreground sm:mt-6 sm:text-5xl md:text-6xl">
            Prehľad
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/70 sm:mt-6 sm:text-lg">
            Rezervácie Performance Centra, dopyty z formulárov a nastavenia systému —
            všetko na <strong className="font-semibold text-gold">jednom mieste</strong>.
          </p>
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              to="/admin/kalendar"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-primary-foreground transition-colors duration-300 hover:bg-foreground sm:w-auto sm:px-10 sm:py-4"
            >
              Otvoriť kalendár
            </Link>
            <Link
              to="/admin/spravy"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground px-8 py-3.5 text-sm font-bold text-foreground transition-colors duration-300 hover:bg-muted sm:w-auto sm:px-10 sm:py-4"
            >
              Správy{unread > 0 ? ` (${unread})` : ""}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {[
          {
            to: "/admin/kalendar",
            eyebrow: "Prevádzka",
            title: "Performance Center",
            desc: `Rezervácie a dostupnosť Trackman 4 a Trackman iO · otváracie hodiny ${PC_OPEN_HOUR}:00–${PC_CLOSE_HOUR}:00.`,
            stats: [
              { label: "Dnes", value: String(todayCount) },
              { label: "7 dní", value: String(weekCount) },
              { label: "Tržby / mesiac", value: `${monthRevenue.toFixed(0)} €` },
            ],
          },
          {
            to: "/admin/spravy",
            eyebrow: "Komunikácia",
            title: "Správy z formulárov",
            desc: "Dopyty z kontaktných formulárov na webe vrátane stavu odoslania e-mailu.",
            stats: [
              { label: "Neprečítané", value: String(unread) },
              { label: "Posledné", value: String(latestMessages.length) },
            ],
          },
          {
            to: "/admin/nastavenia",
            eyebrow: "Systém",
            title: "Nastavenia",
            desc: "Otváracie hodiny, ceny, e-mailové šablóny a konfigurácia systému.",
            stats: [
              { label: "Admin účty", value: adminCount === null ? "—" : String(adminCount) },
              { label: "Simulátory", value: String(simulators.length) },
            ],
          },
        ].map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group flex h-full flex-col rounded-2xl border border-gold/30 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:rounded-3xl sm:p-8"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold sm:text-xs">
              {c.eyebrow}
            </p>
            <h2 className="mt-3 text-balance font-serif text-2xl font-bold leading-tight text-foreground">
              {c.title}
            </h2>
            <p className="mt-3 flex-1 text-sm text-foreground/60">{c.desc}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {c.stats.map((st) => (
                <div key={st.label}>
                  <p className="font-serif text-xl text-foreground">{st.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
              Otvoriť
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

    </div>
  );
};

export default Overview;