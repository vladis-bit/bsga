import { Link } from "react-router-dom";
import PcContactBlock from "@/components/performance-center/PcContactBlock";

const cards = [
  {
    n: "01",
    eyebrow: "Rezervácie",
    title: "Kalendár rezervácií",
    text: "Rezervujte si Trackman 4 alebo Trackman iO v BSGA Performance Center.",
    to: "/admin/performance-center/rezervacia",
    cta: "Otvoriť kalendár",
    tinted: false,
  },
  {
    n: "02",
    eyebrow: "Liga",
    title: "BSGA Indoor League",
    text: "Zimná indoor liga BSGA. Detaily a prihlasovanie pripravujeme.",
    to: "/admin/performance-center/indoor-league",
    cta: "Zobraziť",
    tinted: true,
  },
  {
    n: "03",
    eyebrow: "Admin",
    title: "Vytvoriť rezerváciu",
    text: "Zadajte rezerváciu za klienta – telefonicky alebo osobne, bez obmedzenia 14 dní.",
    to: "/admin/performance-center/vytvorit-rezervaciu",
    cta: "Otvoriť formulár",
    tinted: false,
  },
];

const PerformanceCenterHome = () => (
  <div className="space-y-8">
    <header className="space-y-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
        Bratislava · Zuzany Chalupovej 12
      </p>
      <h1 className="font-serif text-3xl text-foreground sm:text-4xl">BSGA Performance Center</h1>
      <div className="h-px w-24 bg-primary" />
    </header>

    <div className="grid gap-5 md:grid-cols-2">
      {cards.map((c) => (
        <article
          key={c.n}
          className={`flex flex-col justify-between gap-6 rounded-3xl border border-border p-6 shadow-sm sm:p-8 ${
            c.tinted ? "bg-muted/50" : "border-l-4 border-l-primary bg-card"
          }`}
        >
          <div className="space-y-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary font-serif text-lg text-primary-foreground">
              {c.n}
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              {c.eyebrow}
            </p>
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">{c.title}</h2>
            <p className="text-sm text-muted-foreground sm:text-base">{c.text}</p>
          </div>
          <Link
            to={c.to}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            {c.cta}
          </Link>
        </article>
      ))}
    </div>

    <PcContactBlock />
  </div>
);

export default PerformanceCenterHome;