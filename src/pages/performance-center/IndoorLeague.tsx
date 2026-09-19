import { Link } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const IndoorLeague = () => (
  <>
    <SEO
      title="BSGA Indoor League | Performance Center"
      description="Zimná indoor liga BSGA v Performance Center Bratislava. Pripravujeme termíny, formát súťaže a prihlasovanie pre hráčov všetkých výkonnostných úrovní."
      path="/performance-center/indoor-liga"
      breadcrumbs={[
        { name: "Domov", url: "https://bsga.sk/" },
        { name: "Performance Center", url: "https://bsga.sk/performance-center" },
        { name: "Indoor liga", url: "https://bsga.sk/performance-center/indoor-liga" },
      ]}
    />
    <Navbar />
    <div className="theme-ivory min-h-screen bg-background text-foreground">
      <main>
        <section className="bg-background pb-12 pt-24 sm:pb-16 sm:pt-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <Link to="/performance-center" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Performance Center</Link>
              <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl">BSGA Indoor League</h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-xl">Zimná golfová liga v BSGA Performance Center pre hráčov všetkých výkonnostných úrovní.</p>
            </div>
          </div>
        </section>
        <section className="bg-background pb-20 md:pb-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 text-center sm:p-12 md:p-16">
              <Trophy className="mx-auto h-10 w-10 text-gold" />
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-gold">Liga</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">Novú sezónu pripravujeme</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">Termíny, formát súťaže a prihlasovanie zverejníme čoskoro.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer />
  </>
);

export default IndoorLeague;