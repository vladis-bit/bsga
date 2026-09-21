import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, CalendarDays, ChevronRight, Trophy, Users, MapPin, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { performanceCenterLocation } from "@/lib/schema";
import PcContactBlock from "@/components/performance-center/PcContactBlock";
import guidePdf from "@/assets/performance-center/bsga-performance-center-2027.pdf.asset.json";

const cards: {
  n: string;
  eyebrow: string;
  title: string;
  text: string;
  to: string;
  icon: typeof CalendarDays;
  variant: "featured" | "side" | "wide";
}[] = [
  {
    n: "01",
    eyebrow: "Rezervácie",
    title: "Kalendár rezervácií",
    text: "Rezervujte si Trackman 4 alebo Trackman iO v BSGA Performance Center.",
    to: "/performance-center/rezervacia",
    icon: CalendarDays,
    variant: "featured",
  },
  {
    n: "02",
    eyebrow: "Liga",
    title: "BSGA Indoor League",
    text: "Zimná indoor liga BSGA. Detaily a prihlasovanie pripravujeme.",
    to: "/performance-center/indoor-liga",
    icon: Trophy,
    variant: "side",
  },
  {
    n: "03",

    eyebrow: "Členstvo",
    title: "Permanentky a členstvá",
    text: "Zvýhodnené balíky hodín a členstvá v BSGA Performance Center. Detaily pripravujeme.",
    to: "/performance-center/clenstva",
    icon: Users,
    variant: "wide",
  },
];

const PerformanceCenterHome = () => {
  return (
    <>
      <SEO
        title="BSGA Performance Center Bratislava"
        description="BSGA Performance Center na Zuzany Chalupovej 12 v Bratislave Petržalke. Trackman simulátory, indoor tréningy s PGA trénermi a online rezervácia termínov."
        path="/performance-center"
        schema={performanceCenterLocation}
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Performance Center", url: "https://bsga.sk/performance-center" },
        ]}
      />
      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main>
          <section className="relative overflow-hidden bg-background pb-12 pt-24 sm:pb-16 sm:pt-28">
            <div className="container relative z-10 mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto flex max-w-4xl flex-col items-center text-center"
              >
                <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                  Bratislava · Petržalka
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                </span>
                <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  BSGA Performance Center
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-xl">
                  Indoor golfové centrum s profesionálnymi simulátormi pre tréning, hru aj súťaženie počas celého roka.
                </p>
                <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
                  <Link to="/performance-center/rezervacia" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground sm:w-auto">
                    <CalendarDays className="h-4 w-4" /> Rezervovať simulátor
                  </Link>
                  <a href="#kontakt-performance" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground px-10 py-4 text-sm font-bold text-foreground transition-colors hover:bg-muted sm:w-auto">
                    <Mail className="h-4 w-4 text-gold" /> Kontaktujte nás
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="bg-background pb-16 pt-8 md:pb-24 md:pt-10">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase text-foreground sm:text-4xl">Vyberte si službu</h2>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gold"><MapPin className="h-4 w-4" /> Zuzany Chalupovej 12</p>
                </div>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40 md:block">Performance Center</span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:gap-8">
                {cards.map((card, index) => {
                  const Icon = card.icon;
                  const cardClass = card.variant === "featured"
                    ? "border-l-4 border-gold bg-card shadow-sm hover:shadow-lg"
                    : card.variant === "side"
                      ? "border border-border bg-muted hover:bg-muted/70"
                      : "border border-border bg-card hover:border-gold/50";
                  return (
                    <motion.div key={card.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: index * 0.1 }} className={cardClass + " rounded-2xl transition-all duration-300"}>
                      <Link to={card.to} className="group flex h-full flex-col justify-between gap-8 p-6 sm:p-8 md:p-10" aria-label={`${card.title} – zobraziť detail`}>
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold font-serif text-xl font-bold text-primary-foreground">{card.n}</span>
                            <Icon className="h-6 w-6 text-gold" />
                          </div>
                          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-gold">{card.eyebrow}</p>
                          <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">{card.title}</h3>
                          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">{card.text}</p>
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground">Zobraziť detail <ChevronRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" /></span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="kontakt-performance" className="scroll-mt-28 bg-background pb-20 md:pb-28">
            <div className="container mx-auto px-4 sm:px-6"><PcContactBlock /></div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default PerformanceCenterHome;