import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const IndoorLeague = () => (
  <div className="space-y-6">
    <SEO
      title="BSGA Indoor League | Performance Center"
      description="Zimná indoor liga BSGA v Performance Center Bratislava. Pripravujeme termíny, formát súťaže a prihlasovanie pre hráčov všetkých výkonnostných úrovní."
      path="/admin/performance-center/indoor-league"
      noindex
    />
    <Link
      to="/admin/performance-center"
      className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
    >
      ← Performance Center
    </Link>
    <div className="rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">Liga</p>
      <h1 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">BSGA Indoor League</h1>
      <p className="mt-4 text-sm text-muted-foreground sm:text-base">Pripravujeme.</p>
    </div>
  </div>
);

export default IndoorLeague;