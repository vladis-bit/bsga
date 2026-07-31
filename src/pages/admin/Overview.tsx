import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

const Panel = ({
  index,
  eyebrow,
  title,
  subtitle,
  actions,
  tinted,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  actions: { to: string; label: string }[];
  tinted?: boolean;
  children: React.ReactNode;
}) => (
  <section
    className={`overflow-hidden rounded-2xl border sm:rounded-3xl ${
      tinted ? "border-gold/40 bg-gold/10" : "border-gold/25 bg-card"
    }`}
  >
    <div className="border-l-4 border-gold px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-start gap-4 sm:gap-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold font-serif text-lg font-bold text-primary-foreground sm:h-16 sm:w-16 sm:text-2xl">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold sm:text-xs">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-balance font-serif text-xl font-bold leading-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-xs text-foreground/60 sm:text-sm">{subtitle}</p>

          <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
            {actions.map((a, i) => (
              <Link
                key={a.to + a.label}
                to={a.to}
                className={`inline-flex items-center justify-center rounded-full px-4 py-2.5 text-xs font-semibold transition-colors sm:px-6 sm:py-3 sm:text-sm ${
                  i === 0
                    ? "bg-gold text-primary-foreground hover:bg-foreground"
                    : "border border-gold/40 bg-gold/10 text-foreground hover:bg-gold/20"
                }`}
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">{children}</div>
    </div>
  </section>
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

      <Panel
        index="01"
        eyebrow="Prevádzka"
        title="BSGA Performance Center"
        subtitle={`Rezervácie a dostupnosť Trackman 4 a Trackman iO · otváracie hodiny ${PC_OPEN_HOUR}:00–${PC_CLOSE_HOUR}:00, posledný štart ${PC_LAST_START_HOUR}:00.`}
        actions={[
          { to: "/admin/kalendar", label: "Kalendár" },
          { to: "/admin/rezervacie", label: "Rezervácie" },
          { to: "/admin/blokovane-terminy", label: "Blokované termíny" },
        ]}
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Stat label="Dnes" value={String(todayCount)} hint="rezervácií" />
          <Stat label="Najbližších 7 dní" value={String(weekCount)} hint="rezervácií" />
          <Stat
            label="Tržby tento mesiac"
            value={`${monthRevenue.toFixed(0)} €`}
            hint={`${monthBookings.length} rezervácií`}
          />
          <Stat
            label="Voľné dnes"
            value={String(Math.max(0, simulators.length * (PC_LAST_START_HOUR - PC_OPEN_HOUR + 1) - todayCount))}
            hint="hodinových slotov"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="rounded-2xl border border-border p-4 sm:p-5">
            <h3 className="font-serif text-lg text-foreground">Obsadenosť (7 dní)</h3>
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

          <div className="rounded-2xl border border-border p-4 sm:p-5">
            <h3 className="font-serif text-lg text-foreground">Najbližšie rezervácie</h3>
            <ul className="mt-4 space-y-3">
              {upcoming.length === 0 && (
                <li className="text-sm text-muted-foreground">Dnes ani zajtra nič naplánované.</li>
              )}
              {upcoming.map((b) => (
                <li key={b.id} className="rounded-2xl border border-border p-3 text-sm sm:p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {b.first_name} {b.last_name ?? ""}
                    </span>
                    <Badge variant="outline" className="rounded-full text-[10px]">
                      {STATUS_LABEL[b.status] ?? b.status}
                    </Badge>
                  </div>
                  <p className="mt-1 break-words text-muted-foreground">
                    {fmtDateTime(b.starts_at)} · {simName[b.simulator_id] ?? "—"} · {b.duration_hours} h
                    {b.phone ? ` · ${b.phone}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>

      <Panel
        index="02"
        eyebrow="Komunikácia"
        title="Správy z formulárov"
        subtitle="Dopyty z kontaktných formulárov na webe vrátane stavu odoslania e-mailu."
        actions={[{ to: "/admin/spravy", label: "Všetky správy" }]}
        tinted
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Stat label="Neprečítané" value={String(unread)} hint="čakajú na spracovanie" />
          <Stat label="Posledné správy" value={String(latestMessages.length)} hint="zobrazené nižšie" />
        </div>
        <ul className="mt-6 space-y-3">
          {latestMessages.length === 0 && (
            <li className="text-sm text-muted-foreground">Zatiaľ žiadne správy.</li>
          )}
          {latestMessages.map((m) => (
            <li key={m.id} className="rounded-2xl border border-border p-3 text-sm sm:p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-foreground">
                  {m.first_name} {m.last_name ?? ""}
                </span>
                {!m.is_read && (
                  <Badge className="rounded-full text-[10px]">Nové</Badge>
                )}
                <Badge variant="outline" className="rounded-full text-[10px]">
                  {m.source}
                </Badge>
              </div>
              <p className="mt-1 break-words text-muted-foreground">
                {fmtDateTime(m.created_at)} · {m.email}
              </p>
              <p className="mt-2 line-clamp-2 text-foreground">{m.message}</p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel
        index="03"
        eyebrow="Správa systému"
        title="Nastavenia"
        subtitle="Správa admin prístupov a ďalšie nastavenia BSGA administrácie."
        actions={[{ to: "/admin/nastavenia", label: "Otvoriť nastavenia" }]}
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          <Stat
            label="Admin účty"
            value={adminCount === null ? "—" : String(adminCount)}
            hint="s prístupom do dashboardu"
          />
          <Stat label="Simulátory" value={String(simulators.length)} hint="aktívne v rezerváciách" />
          <Stat
            label="Otváracie hodiny"
            value={`${PC_OPEN_HOUR}–${PC_CLOSE_HOUR}`}
            hint={`posledný štart ${PC_LAST_START_HOUR}:00`}
          />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          V nastaveniach pridáš alebo odoberieš admina podľa e-mailu, skontroluješ cenník simulátorov
          a spravíš rýchle úkony pre svoj účet.
        </p>
      </Panel>
    </div>
  );
};

export default Overview;