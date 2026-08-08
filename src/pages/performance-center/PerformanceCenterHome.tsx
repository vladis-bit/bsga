import { Link } from "react-router-dom";
import PcContactBlock from "@/components/performance-center/PcContactBlock";
import { useToast } from "@/hooks/use-toast";

type CardAction = { label: string; to?: string };

const cards: {
  n: string;
  eyebrow: string;
  title: string;
  text: string;
  tinted: boolean;
  actions: CardAction[];
}[] = [
  {
    n: "01",
    eyebrow: "Rezervácie",
    title: "Kalendár rezervácií",
    text: "Rezervujte si Trackman 4 alebo Trackman iO v BSGA Performance Center.",
    tinted: false,
    actions: [{ label: "Otvoriť kalendár", to: "/admin/performance-center/rezervacia" }],
  },
  {
    n: "02",
    eyebrow: "Liga",
    title: "BSGA Indoor League",
    text: "Zimná indoor liga BSGA. Detaily a prihlasovanie pripravujeme.",
    tinted: true,
    actions: [{ label: "Zobraziť", to: "/admin/performance-center/indoor-league" }],
  },
  {
    n: "03",
    eyebrow: "Admin",
    title: "Vytvoriť rezerváciu",
    text: "Zadajte rezerváciu za klienta – telefonicky alebo osobne, bez obmedzenia 14 dní.",
    tinted: false,
    actions: [{ label: "Otvoriť formulár", to: "/admin/performance-center/vytvorit-rezervaciu" }],
  },
  {
    n: "04",
    eyebrow: "Členstvo",
    title: "Permanentky a členstvá",
    text: "Zvýhodnené balíky hodín a členstvá v BSGA Performance Center. Detaily pripravujeme.",
    tinted: true,
    actions: [{ label: "Kúpiť" }, { label: "Informácie" }],
  },
];

const PerformanceCenterHome = () => {
  const { toast } = useToast();
  const notReady = () =>
    toast({ title: "Pripravujeme", description: "Detaily doplníme čoskoro." });

  return (
  <div className="space-y-6 sm:space-y-8">
    <header className="space-y-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
        Bratislava · Zuzany Chalupovej 12
      </p>
      <h1 className="font-serif text-2xl text-foreground sm:text-3xl md:text-4xl">
        BSGA Performance Center
      </h1>
      <div className="h-px w-24 bg-primary" />
    </header>

    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      {cards.map((c) => (
        <article
          key={c.n}
          className={`flex flex-col justify-between gap-5 rounded-3xl border border-border p-5 shadow-sm sm:gap-6 sm:p-8 ${
            c.tinted ? "bg-muted/50" : "border-l-4 border-l-primary bg-card"
          }`}
        >
          <div className="space-y-3 sm:space-y-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary font-serif text-lg text-primary-foreground">
              {c.n}
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              {c.eyebrow}
            </p>
            <h2 className="font-serif text-xl text-foreground sm:text-2xl md:text-3xl">
              {c.title}
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">{c.text}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {c.actions.map((a, i) => {
              const cls = `inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-90 sm:w-auto ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground"
              }`;
              return a.to ? (
                <Link key={a.label} to={a.to} className={cls}>
                  {a.label}
                </Link>
              ) : (
                <button key={a.label} type="button" onClick={notReady} className={cls}>
                  {a.label}
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </div>

    <PcContactBlock />
  </div>
  );
};

export default PerformanceCenterHome;