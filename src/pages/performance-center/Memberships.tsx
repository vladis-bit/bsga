import { Link } from "react-router-dom";
import { ArrowLeft, Check, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const benefits = [
  "Zvýhodnené balíky hodín v indoor centre",
  "Tréning na profesionálnych golfových simulátoroch",
  "Flexibilné využitie počas otváracích hodín",
  "Možnosť individuálnej dohody podľa vašich tréningových cieľov",
];

const Memberships = () => (
  <>
    <SEO
      title="Permanentky a členstvá | BSGA Performance Center"
      description="Permanentky a zvýhodnené členstvá v BSGA Performance Center Bratislava pre pravidelný indoor golfový tréning."
      path="/performance-center/clenstva"
      breadcrumbs={[
        { name: "Domov", url: "https://bsga.sk/" },
        { name: "Performance Center", url: "https://bsga.sk/performance-center" },
        { name: "Permanentky a členstvá", url: "https://bsga.sk/performance-center/clenstva" },
      ]}
    />
    <Navbar />
    <div className="theme-ivory min-h-screen bg-background text-foreground">
      <main>
        <section className="bg-background pb-12 pt-24 sm:pb-16 sm:pt-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <Link to="/performance-center" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Performance Center
              </Link>
              <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl">
                Permanentky a členstvá
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-xl">
                Pravidelný indoor tréning za výhodnejších podmienok v BSGA Performance Center.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background pb-20 md:pb-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 sm:p-10 md:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Členstvo</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">Balíky pripravujeme</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">
                Aktuálne dokončujeme ponuku permanentiek a členstiev. Ozvite sa nám a odporučíme vám riešenie podľa frekvencie tréningov.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 border-t border-border pt-4 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a href="mailto:peter@bsga.sk?subject=Performance Center – členstvo" className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground sm:w-auto">
                <Mail className="h-4 w-4" /> Mám záujem o členstvo
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer />
  </>
);

export default Memberships;