import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Mail, MapPin, FileText, Phone, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import WavesCanvas from "@/components/WavesCanvas";
import peterPhoto from "@/assets/team/peter-svajlen.webp";

interface EventItem {
  title: string;
  date: string;
  location?: string;
  posterUrl?: string;
}

const events: EventItem[] = [
  {
    title: "Camiral Trip",
    date: "1. – 6. 6. 2026",
    location: "Camiral, Španielsko",
  },
  {
    title: "Liv Golf Andalucia",
    date: "6. – 10. 7. 2026",
    location: "Andalúzia, Španielsko",
  },
  {
    title: "PGA Czechia – Po stopách Czech PGA Tour",
    date: "20. – 23. 8. 2026",
    location: "Česká republika",
  },
  {
    title: "Doni-Travel Turnaj 4 tímov",
    date: "13. – 15. 9. 2026",
  },
  {
    title: "Švajlen Invitational",
    date: "25. 9. 2026",
  },
  {
    title: "BSGA Ryder Cup – Švajlen vs Hrbáň",
    date: "10. – 17. 10. 2026",
  },
];

const EventCard = ({ event, index }: { event: EventItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const mailSubject = encodeURIComponent(`Prihlásenie – ${event.title}`);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-2xl border bg-card border-border hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10 p-5 sm:p-6 transition-all duration-300"
    >
      <div className="grid gap-4 sm:gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-serif font-bold text-lg bg-gold/10 text-gold">
          {index + 1}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-serif font-bold leading-tight text-foreground">
            {event.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              <span>{event.date}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 md:min-w-[180px]">
          {event.posterUrl ? (
            <a
              href={event.posterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-muted border border-foreground/20 text-foreground hover:bg-muted/80 hover:border-foreground/40"
            >
              <FileText className="w-4 h-4" />
              Plagát
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-muted/60 text-muted-foreground cursor-not-allowed"
            >
              <FileText className="w-4 h-4" />
              Plagát čoskoro
            </span>
          )}
          <a
            href={`mailto:peter@doni-travel.sk?subject=${mailSubject}`}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold/10 text-gold hover:bg-gold/20"
          >
            <Mail className="w-4 h-4" />
            <span>Prihlásiť sa</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: "https://bsga.sk/" },
      { "@type": "ListItem", position: 2, name: "Eventy, teambuildingy a golfové pobyty", item: "https://bsga.sk/eventy" },
    ],
  };

  return (
    <>
      <SEO
        title="Eventy, teambuildingy a golfové pobyty | BSGA"
        description="Golfové eventy, teambuildingy a pobyty s BSGA a cestovnou agentúrou Doni-Travel. Pozrite si nasledujúce akcie a prihláste sa."
        path="/eventy"
        jsonLd={breadcrumb}
      />
      <Navbar />
      <AuroraBackground className="min-h-screen bg-primary text-primary-foreground" showRadialGradient={false}>
        <main>
          <section className="relative overflow-hidden bg-transparent pb-8 pt-28 md:pt-32">
            <WavesCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-90" />
            <div className="container relative z-10 mx-auto px-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                  Doni-Travel × BSGA
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Eventy, teambuildingy a golfové pobyty
                </h1>
                <p className="max-w-2xl text-primary-foreground/80 sm:text-lg">
                  Pripravujeme golfové akcie, firemné turnaje a kompletné pobyty na mieru.
                  Pobyty organizujeme spolu s cestovnou agentúrou{" "}
                  <strong className="text-gold">Doni-Travel</strong>.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-transparent pb-16 pt-8 md:pb-24 md:pt-10">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-8 text-center">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                  <Sparkles className="w-4 h-4" /> Nasledujúce akcie
                </span>
                <h2 className="mt-2 font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
                  Pridajte sa k nám
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/75 text-sm sm:text-base leading-relaxed">
                  Pripravili sme pre vás výber tých najlepších golfových zážitkov sezóny – od medzinárodných výjazdov,
                  cez tímové turnaje, až po prestížne pozvánkové eventy. Vyberte si akciu, ktorá vás osloví,
                  a rezervujte si miesto včas – kapacita je <strong className="text-gold">limitovaná</strong>.
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
                {events.map((event, index) => (
                  <EventCard key={index} event={event} index={index} />
                ))}
              </div>

              <div className="max-w-3xl mx-auto mt-8 sm:mt-10">
                <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/20 via-gold/10 to-transparent p-5 sm:p-7 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur">
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-primary-foreground">
                      Zaujala vás niektorá z akcií?
                    </h3>
                    <p className="mt-1 text-sm text-primary-foreground/80">
                      Pošlite nám email a rezervujeme vám miesto. Odpovedáme do 24 hodín.
                    </p>
                  </div>
                  <a
                    href="mailto:peter@doni-travel.sk?subject=Prihlásenie na akciu BSGA × Doni-Travel"
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold rounded-full bg-gold text-primary hover:bg-gold-light transition-all shadow-md shadow-gold/30"
                  >
                    <Mail className="w-4 h-4" />
                    Prihlásiť sa na akciu
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-transparent pb-20 md:pb-28">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto rounded-2xl sm:rounded-3xl border border-gold/40 bg-background/95 p-5 sm:p-8 md:p-10 backdrop-blur shadow-xl shadow-gold/10">
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 md:gap-8 text-center sm:text-left">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gold/30 blur-xl" aria-hidden="true" />
                    <img
                      src={peterPhoto}
                      alt="Peter Švajlen – kontaktná osoba"
                      loading="lazy"
                      decoding="async"
                      className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-gold/60 shadow-lg"
                      style={{ objectPosition: "center 20%" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                      Máte nezodpovedané otázky?
                    </h2>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-foreground/90">
                      Kontaktná osoba: <strong className="text-gold">Peter Švajlen</strong>
                      <span className="text-foreground/70"> – napíšte nám alebo zavolajte.</span>
                    </p>
                    <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3">
                      <a
                        href="tel:+421905335501"
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold rounded-full bg-gold text-primary hover:bg-gold-light transition-all shadow-md shadow-gold/30"
                      >
                        <Phone className="w-4 h-4" />
                        +421 905 335 501
                      </a>
                      <a
                        href="mailto:peter@doni-travel.sk"
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all break-all sm:break-normal"
                      >
                        <Mail className="w-4 h-4 shrink-0" />
                        peter@doni-travel.sk
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </AuroraBackground>
      <Footer />
    </>
  );
};

export default Events;