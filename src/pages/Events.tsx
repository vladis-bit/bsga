import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Mail, MapPin, FileText, Phone, Sparkles, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import WavesCanvas from "@/components/WavesCanvas";
import peterPhoto from "@/assets/team/peter-svajlen.webp";
import doniTravelLogo from "@/assets/partner-doni-travel.png";
import czechPgaPoster from "@/assets/event-posters/doni-travel-czech-pga-tour.pdf.asset.json";
import camiralPoster from "@/assets/event-posters/doni-travel-camiral.pdf.asset.json";
import livPoster from "@/assets/event-posters/doni-travel-liv.pdf.asset.json";

interface EventItem {
  title: string;
  date: string;
  location?: string;
  posterUrl?: string;
  details?: {
    subtitle: string;
    intro: string;
    price: string;
    priceNote: string;
    schedule: { day: string; title: string; items: string[]; tour?: string }[];
    contact: { name: string; email: string | string[]; phone: string };
  };
}

const events: EventItem[] = [
  {
    title: "Camiral Trip",
    date: "1. – 6. 5. 2026",
    location: "Camiral, Španielsko",
    posterUrl: camiralPoster.url,
    details: {
      subtitle: "Hosťujúce ihrisko Ryder Cup 2031 – Camiral & Quinta do Lago Resort",
      intro: "Doni Travel pripravil exkluzívny golfový zájazd do Španielska na prestížne Camiral Resort, ktoré bude hostiť Ryder Cup 2031. Súčasťou pobytu je aj výlet do Barcelony so sprievodcom.",
      price: "€1 535 / golfista · €415 / negolfista",
      priceNote: "Priamy let z Bratislavy do Barcelony · Ubytovanie Hotel Lavida 4* na 5 nocí · Letenka nie je zahrnutá v cene",
      schedule: [
        { day: "Piatok 1. 5.", title: "Prílet & Stadium Course", items: ["Priamy let Bratislava – Barcelona", "Camiral Resort – Stadium Course (autíčko v cene)"] },
        { day: "Sobota 2. 5.", title: "Camiral Resort – Tour Course", items: ["Hra na Tour Course (autíčko v cene)"] },
        { day: "Nedeľa 3. 5.", title: "Výlet do Barcelony", items: ["Celodenný výlet so zabezpečeným sprievodcom a vstupmi"] },
        { day: "Pondelok 4. 5.", title: "Camiral Resort – Tour Course", items: ["Hra na Tour Course (autíčko v cene)"] },
        { day: "Utorok 5. 5.", title: "Camiral Resort – Stadium Course", items: ["Hra na Stadium Course (autíčko v cene)"] },
        { day: "Streda 6. 5.", title: "Odlet domov", items: ["Let Barcelona – Bratislava"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: "peter@doni-travel.sk",
        phone: "+421 905 335 501",
      },
    },
  },
  {
    title: "Liv Golf Andalucia",
    date: "6. – 10. 6. 2026",
    location: "Andalúzia, Španielsko",
    posterUrl: livPoster.url,
    details: {
      subtitle: "3x golf v Andalúzii + finálový deň LIV GOLF Spain",
      intro: "Doni Travel pripravil zájazd do slnečnej Andalúzie spojený s návštevou finálového kola LIV GOLF Spain a hrou na troch špičkových ihriskách.",
      price: "€1 290 / golfista · €750 / negolfista",
      priceNote: "Príplatok za single room: €375 · Letenka nie je zahrnutá v cene",
      schedule: [
        { day: "Piatok 6. 6.", title: "Prílet do Malagy", items: ["Let Viedeň – Malaga"] },
        { day: "Sobota 7. 6.", title: "LIV GOLF Spain", items: ["Návšteva finálového kola LIV GOLF Spain"] },
        { day: "Nedeľa 8. 6.", title: "Atalaya New Course", items: ["Hra na Atalaya New Course"] },
        { day: "Pondelok 9. 6.", title: "Estepona Course", items: ["Hra na Estepona Course"] },
        { day: "Utorok 10. 6.", title: "Los Arqueros & odlet", items: ["Hra na Los Arqueros Course", "Let Malaga – Viedeň"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: "peter@doni-travel.sk",
        phone: "+421 905 335 501",
      },
    },
  },
  {
    title: "PGA Czechia – Po stopách Czech PGA Tour",
    date: "20. – 23. 8. 2026",
    location: "Česká republika",
    posterUrl: czechPgaPoster.url,
    details: {
      subtitle: "Golfové potulky po českých ihriskách",
      intro: "Doni Travel pripravil štvorňový golfový zájazd Czech PGA Tour pod názvom „Golfové potulky po českých ihriskách\". Počas štyroch dní účastníkov čaká hra na prémiových českých ihriskách neďaleko od Prahy.",
      price: "€675 / golfista (double room)",
      priceNote: "Príplatok za single room: €160",
      schedule: [
        { day: "Piatok 20. 8.", title: "Black Bridge Golf Resort", items: ["Ubytovanie na 1 noc v Black Bridge Golf Resort s raňajkami", "1x green fee Black Bridge Golf Resort"], tour: "Czech PGA Tour" },
        { day: "Sobota 21. 8.", title: "Royal Beroun Golf Club", items: ["Ubytovanie na 1 noc v Grand Hotel Litava Beroun s raňajkami", "1x green fee Royal Beroun Golf Club"], tour: "Ladies European Tour" },
        { day: "Nedeľa 22. 8.", title: "Golf Resort Karlštejn", items: ["Ubytovanie na 1 noc v Black Bridge Golf Resort s raňajkami", "1x green fee Golf Resort Karlštejn"], tour: "European Tour" },
        { day: "Pondelok 23. 8.", title: "Prague City Golf – Zbraslav", items: ["1x green fee Prague City Golf – Zbraslav"], tour: "Challenge Tour" },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: "peter@doni-travel.sk",
        phone: "+421 905 335 501",
      },
    },
  },
  {
    title: "DONI-TRAVEL × BSGA — Turnaj Pro-Am Tímov",
    date: "13. – 15. 9. 2026",
    location: "Golf Resort Kaskáda",
    details: {
      subtitle: "Tímová súťaž 6–8 členných tímov vedených hrajúcimi profesionálmi",
      intro: "Destinácia: Golf Resort Kaskáda. Formát: Tímová súťaž 6–8 členných tímov vedených hrajúcimi profesionálmi. Tímy: Team Švajlen | Team Hrbáň | Team Fajkusová | Team Gajan.",
      price: "€650 / golfista (double room) · €350 / negolfista (double room)",
      priceNote: "Príplatok za single room: €90. Možnosť doobjednať extra noc 12. 9. – double room €65 | single room €100. Cena zahŕňa: 2 noci s raňajkami, 3x turnajové kolá, 2x obed po hre, pitný režim počas hry, 3x štartovací balíček do bagu, 1x večerný raut s ochutnávkou vína a unlimited vstup do saunového sveta.",
      schedule: [
        { day: "Nedeľa 13. 9.", title: "Príjazd a uvítací program", items: ["Príjazd a ubytovanie v Golf Resort Kaskáda", "Welcome drink a prezentácia tímov", "Voľná hra / príprava na ihrisku"] },
        { day: "Pondelok 14. 9.", title: "1. deň súťaže", items: ["Turnajové kolá pre všetky tímy", "Obed po hre", "Pitný režim počas hry", "Štartovací balíček do bagu"] },
        { day: "Utorok 15. 9.", title: "Finále a vyhlásenie", items: ["Záverečné turnajové kolá", "Obed po hre", "Večerný raut s ochutnávkou vína", "Vyhlásenie víťazov a odovzdávanie cien"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: ["peter@doni-travel.com", "doni@doni-travel.com"],
        phone: "+421 905 335 501",
      },
    },
  },

  {
    title: "Švajlen Invitational",
    date: "25. 9. 2026",
    location: "Golfový klub Hrubá Borša, Slovensko",
    details: {
      subtitle: "Jednokolový pozvánkový turnaj",
      intro: "Jednokolový pozvánkový turnaj konajúci sa na golfovom ihrisku v Hrubej Borši (GKHB). Môžete sa tešiť na welcome drink, občerstvenie, obed po hre a vyhlásenie aj s cenami.",
      price: "Cena a prihláška na vyžiadanie",
      priceNote: "Turnaj je prístupný na pozvánku – bližšie informácie o štartovnom, kapacite a registrácii získate na kontakte nižšie.",
      schedule: [
        { day: "Piatok 25. 9.", title: "Švajlen Invitational", items: ["Welcome drink a registrácia hráčov", "Občerstvenie počas hry", "Obed po hre", "Vyhlásenie výsledkov a odovzdávanie cien"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: "peter@doni-travel.sk",
        phone: "+421 905 335 501",
      },
    },
  },

  {
    title: "BSGA Ryder Cup – Švajlen vs Hrbáň",
    date: "10. – 17. 10. 2026",
    location: "Voyage Belek Golf & Spa 5★, Turecko",
    details: {
      subtitle: "DONI-TRAVEL × BSGA — Ryder Cup 2026",
      intro: "Spoločný zájazd v BSGA Ryder Cup formáte – Team Švajlen vs. Team Hrbáň. Čaká na vás týždeň plný kvalitného golfu, tímovej súťaže a oddychu v luxusnom rezorte Voyage Belek Golf & Spa 5★.",
      price: "€2 900 / golfista (double room + letenka) · €1 750 / negolfista (double room + letenka)",
      priceNote: "Príplatok za single room: €550. Cena zahŕňa: 7 nocí v dvojlôžkovej izbe, 5x green fee (2x Montgomerie, 2x Kaya, 1x Faldo), letenka a golfový vak.",
      schedule: [
        { day: "Sobota 10. 10.", title: "Prílet do Antalye", items: ["Let do Antalye", "Transfer a ubytovanie v Voyage Belek Golf & Spa 5★"] },
        { day: "Nedeľa 11. 10.", title: "The Montgomerie Maxx Royal", items: ["Hra na The Montgomerie Maxx Royal (1. deň BSGA Ryder Cup)"] },
        { day: "Pondelok 12. 10.", title: "Kaya Palazzo Golf Club", items: ["Hra na Kaya Palazzo Golf Club (2. deň BSGA Ryder Cup)"] },
        { day: "Utorok 13. 10.", title: "Faldo Course", items: ["Hra na Faldo Course (3. deň BSGA Ryder Cup)"] },
        { day: "Streda 14. 10.", title: "The Montgomerie Maxx Royal", items: ["Hra na The Montgomerie Maxx Royal (4. deň BSGA Ryder Cup)"] },
        { day: "Štvrtok 15. 10.", title: "Kaya Palazzo Golf Club", items: ["Hra na Kaya Palazzo Golf Club (5. deň BSGA Ryder Cup)"] },
        { day: "Piatok 16. 10.", title: "Voľný deň / tímové aktivity", items: ["Voľný program v rezorte", "Tímové aktivity a príprava finále"] },
        { day: "Sobota 17. 10.", title: "Odlet domov", items: ["Transfer na letisko", "Let do Bratislavy"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: ["peter@doni-travel.com", "doni@doni-travel.com"],
        phone: "+421 905 335 501",
      },
    },
  },
];

const EventCard = ({ event, index }: { event: EventItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [infoOpen, setInfoOpen] = useState(false);
  const contactEmail = event.details?.contact.email;
  const signupEmail = Array.isArray(contactEmail) ? contactEmail.join(",") : contactEmail ?? "peter@doni-travel.sk";
  const mailSubject = encodeURIComponent(`Prihlásenie – ${event.title}`);
  const infoSubject = encodeURIComponent(`Informácie – ${event.title}`);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="relative overflow-hidden rounded-2xl border bg-card border-border hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10 p-5 sm:p-6 transition-all duration-300"
      >
        <div className="grid gap-4 sm:gap-5 md:grid-cols-[auto_1fr] md:items-start">
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

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              {event.posterUrl ? (
                <a
                  href={event.posterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-muted border border-foreground/20 text-foreground hover:bg-muted/80 hover:border-foreground/40"
                >
                  <FileText className="w-4 h-4" />
                  Plagát
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full bg-muted/60 text-muted-foreground cursor-not-allowed"
                >
                  <FileText className="w-4 h-4" />
                  Plagát čoskoro
                </span>
              )}
              {event.details ? (
                <button
                  type="button"
                  onClick={() => setInfoOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold/10 text-gold hover:bg-gold/20 border border-gold/20"
                >
                  <Info className="w-4 h-4" />
                  Informácie
                </button>
              ) : (
                <a
                  href={`mailto:peter@doni-travel.sk?subject=${infoSubject}`}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold/10 text-gold hover:bg-gold/20 border border-gold/20"
                >
                  <Info className="w-4 h-4" />
                  Informácie
                </a>
              )}
              <a
                href={`mailto:${signupEmail}?subject=${mailSubject}`}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold text-primary hover:bg-gold-light hover:shadow-md hover:shadow-gold/30"
              >
                <Mail className="w-4 h-4" />
                <span>Prihlásiť sa</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {event.details && (
        <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background text-foreground">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                {event.title}
              </DialogTitle>
              <DialogDescription className="text-gold font-medium text-base">
                {event.details.subtitle}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                {event.details.intro}
              </p>

              <div className="rounded-xl bg-muted/70 p-4 sm:p-5 border border-gold/20">
                <div className="flex items-center gap-2 mb-2 text-gold">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold text-sm uppercase tracking-wide">Termín a cena</span>
                </div>
                <p className="text-base sm:text-lg font-semibold text-foreground">{event.date}</p>
                <p className="text-lg sm:text-xl font-bold text-foreground mt-1">{event.details.price}</p>
                <p className="text-sm text-muted-foreground mt-1">{event.details.priceNote}</p>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wide mb-3">
                  <MapPin className="w-5 h-5" /> Program zájazdu
                </h4>
                <div className="space-y-3">
                  {event.details.schedule.map((day, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-gold/30"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                        <span className="text-sm font-semibold text-gold">{day.day}</span>
                        {day.tour && (
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {day.tour}
                          </span>
                        )}
                      </div>
                      <h5 className="font-serif text-lg font-bold text-foreground mb-1">{day.title}</h5>
                      <ul className="space-y-1">
                        {day.items.map((item, j) => (
                          <li key={j} className="text-sm text-foreground/80 flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-gold/10 border border-gold/30 p-4 sm:p-5">
                <h4 className="font-semibold text-foreground mb-3">Kontakt</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-foreground/90">
                    <span className="font-medium">{event.details.contact.name}</span>
                  </p>
                  {Array.isArray(event.details.contact.email) ? (
                    event.details.contact.email.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="flex items-center gap-2 text-gold hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        {email}
                      </a>
                    ))
                  ) : (
                    <a
                      href={`mailto:${event.details.contact.email}`}
                      className="flex items-center gap-2 text-gold hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {event.details.contact.email}
                    </a>
                  )}
                  <a
                    href={`tel:${event.details.contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-gold hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    {event.details.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {event.posterUrl && (
                  <a
                    href={event.posterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-muted border border-foreground/20 text-foreground hover:bg-muted/80 hover:border-foreground/40"
                  >
                    <FileText className="w-4 h-4" />
                    Stiahnuť plagát
                  </a>
                )}
                <a
                  href={`mailto:${signupEmail}?subject=${mailSubject}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold text-primary hover:bg-gold-light hover:shadow-md hover:shadow-gold/30"
                >
                  <Mail className="w-4 h-4" />
                  Prihlásiť sa
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

const Events = () => {
  const [floridaOpen, setFloridaOpen] = useState(false);
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

              <div className="max-w-3xl mx-auto mt-10 sm:mt-12">
                <div className="relative group overflow-hidden rounded-[40px] border-2 border-gold/40 bg-background p-8 sm:p-10 md:p-12 shadow-2xl shadow-gold/10 text-center transition-all duration-300 hover:border-gold/60 hover:shadow-gold/20">
                  {/* Decorative corner accents */}
                  <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-gold/60 rounded-tl-lg" />
                  <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-gold/60 rounded-tr-lg" />
                  <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-gold/60 rounded-bl-lg" />
                  <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-gold/60 rounded-br-lg" />

                  {/* Centered partner logo */}

                  {/* Logo with gold frame */}
                  <div className="relative mx-auto mb-6 sm:mb-8 inline-flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl bg-gold/30 blur-xl" aria-hidden="true" />
                    <div className="relative border-2 border-gold/50 rounded-2xl p-3 sm:p-4 bg-muted">
                      <img
                        src={doniTravelLogo}
                        alt="Doni-Travel logo"
                        loading="lazy"
                        decoding="async"
                        className="mx-auto max-h-28 sm:max-h-32 md:max-h-40 w-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* Tagline with high contrast */}
                  <p className="text-base sm:text-lg md:text-xl text-foreground max-w-lg mx-auto leading-relaxed font-medium">
                    Golfové pobyty a eventy organizujeme v spolupráci s cestovnou agentúrou{" "}
                    <strong className="text-gold">Doni-Travel</strong>.
                  </p>

                  {/* Subtle bottom glow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
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

          <section className="bg-transparent pb-20 md:pb-28">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                  <Sparkles className="w-4 h-4" /> Plánované akcie
                </span>
                <h2 className="mt-3 font-serif text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
                  Akcie a pobyty v roku 2027
                </h2>
                <p className="mt-4 text-lg sm:text-xl md:text-2xl text-primary-foreground/80 font-medium">
                  Zverejníme už čoskoro
                </p>
                <div className="mt-6 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent" />

                <div className="mt-10 sm:mt-12 rounded-2xl border border-border bg-card/80 backdrop-blur p-5 sm:p-6 text-left transition-all hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-serif font-bold text-lg bg-gold/10 text-gold">
                      2027
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-serif font-bold leading-tight text-foreground">
                        Jarný tréningový deň s Peťom a Jakubom
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gold" />
                          <span>TBD</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span>Belek, Turecko</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                        <span
                          aria-disabled="true"
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full bg-muted/60 text-muted-foreground cursor-not-allowed"
                        >
                          <FileText className="w-4 h-4" />
                          Plagát čoskoro
                        </span>
                        <a
                          href={`mailto:peter@doni-travel.sk?subject=${encodeURIComponent("Informácie – Jarný tréningový deň s Peťom a Jakubom")}`}
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold/10 text-gold hover:bg-gold/20 border border-gold/20"
                        >
                          <Info className="w-4 h-4" />
                          Informácie
                        </a>
                        <a
                          href={`mailto:peter@doni-travel.sk?subject=${encodeURIComponent("Prihlásenie – Jarný tréningový deň s Peťom a Jakubom")}`}
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold text-primary hover:bg-gold-light hover:shadow-md hover:shadow-gold/30"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Prihlásiť sa</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 rounded-2xl border border-border bg-card/80 backdrop-blur p-5 sm:p-6 text-left transition-all hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-serif font-bold text-lg bg-gold/10 text-gold">
                      2027
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-serif font-bold leading-tight text-foreground">
                        Florida PGA Swing
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gold" />
                          <span>27. 3. – 7. 4. 2027</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span>Florida, USA</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                        <span
                          aria-disabled="true"
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full bg-muted/60 text-muted-foreground cursor-not-allowed"
                        >
                          <FileText className="w-4 h-4" />
                          Plagát čoskoro
                        </span>
                        <button
                          type="button"
                          onClick={() => setFloridaOpen(true)}
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold/10 text-gold hover:bg-gold/20 border border-gold/20"
                        >
                          <Info className="w-4 h-4" />
                          Informácie
                        </button>
                        <a
                          href={`mailto:peter@doni-travel.sk?subject=${encodeURIComponent("Prihlásenie – Florida PGA Swing")}`}
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold text-primary hover:bg-gold-light hover:shadow-md hover:shadow-gold/30"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Prihlásiť sa</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </AuroraBackground>
      <Dialog open={floridaOpen} onOpenChange={setFloridaOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Florida PGA Swing by DONI-Travel
            </DialogTitle>
            <DialogDescription className="text-gold font-medium text-base">
              27. 3. – 7. 4. 2027 · Florida, USA
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
              Exkluzívny 12-dňový golfový zájazd naprieč Floridou – ihriská svetových turnajov PGA Tour,
              LPGA Tour a The Players Championship, prémiové rezorty a slovenský delegát počas celého pobytu.
            </p>

            <div className="rounded-xl bg-muted/70 p-4 sm:p-5 border border-gold/20">
              <div className="flex items-center gap-2 mb-2 text-gold">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wide">Termín a cena</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-foreground">27. 3. – 7. 4. 2027</p>
              <p className="text-lg sm:text-xl font-bold text-foreground mt-1">€6 550 / golfista (double room)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Letenka nie je zahrnutá: Economy €1 875 / osoba · Economy Premium €2 100 / osoba (Lufthansa / Austrian Airlines,
                Viedeň – Newark – West Palm Beach / Orlando – Mníchov – Viedeň). Kalkulácia zohľadňuje aktuálny kurz EUR/USD.
              </p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wide mb-3">
                <Calendar className="w-5 h-5" /> Letenka Lufthansa / Austrian Airlines
              </h4>
              <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-2 text-sm text-foreground/85">
                <p><span className="font-semibold text-foreground">27. 3. 2027</span> · OS 037 · Viedeň – Newark · 10:30 – 14:55</p>
                <p><span className="font-semibold text-foreground">27. 3. 2027</span> · UA 2659 · Newark – West Palm Beach · 16:35 – 19:37</p>
                <p><span className="font-semibold text-foreground">6. 4. 2027</span> · LH 4389 · Orlando – Mníchov · 21:45 – 13:20 (7. 4. 2027)</p>
                <p><span className="font-semibold text-foreground">7. 4. 2027</span> · OS 186 · Mníchov – Viedeň · 15:30 – 16:35</p>
                <ul className="mt-3 space-y-1 text-foreground/80">
                  <li>• Economy alebo Economy Plus</li>
                  <li>• 1× malá príručná batožina 40×30×15 cm</li>
                  <li>• 1× väčšia príručná batožina 55×40×23 cm</li>
                  <li>• 1× 23 kg batožina do podpalubia (Economy)</li>
                  <li>• 2× 23 kg batožina do podpalubia, môže byť aj golfový vak (Economy Premium)</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wide mb-3">
                <MapPin className="w-5 h-5" /> Ubytovanie
              </h4>
              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h5 className="font-serif text-lg font-bold text-foreground mb-1">27. 3. – 29. 3. · West Palm Beach</h5>
                  <p className="text-sm text-foreground/80">PGA National Resort – 2 noci Resort Room, denný kredit 25 USD na raňajky.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h5 className="font-serif text-lg font-bold text-foreground mb-1">29. 3. – 31. 3. · Daytona Beach</h5>
                  <p className="text-sm text-foreground/80">Hotel (TBA) – 2 noci s raňajkami.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h5 className="font-serif text-lg font-bold text-foreground mb-1">31. 3. – 1. 4. · Sawgrass</h5>
                  <p className="text-sm text-foreground/80">Marriott Golf Resort & Spa – 1 noc, raňajky v TPC Sawgrass clubhouse.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h5 className="font-serif text-lg font-bold text-foreground mb-1">1. 4. – 2. 4. · Orlando</h5>
                  <p className="text-sm text-foreground/80">Arnold Palmer’s Bay Hill Club & Lodge – 1 noc, raňajky v clubhouse.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h5 className="font-serif text-lg font-bold text-foreground mb-1">2. 4. – 6. 4. · Orlando</h5>
                  <p className="text-sm text-foreground/80">Prémiová 4–6 spálňová vila s bazénom – 4 noci, bez stravy.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wide mb-3">
                <MapPin className="w-5 h-5" /> Program & Golf
              </h4>
              <div className="space-y-3">
                {[
                  { day: "27. 3.", title: "Prílet do West Palm Beach", items: ["Prílet 19:37, voľný večer"] },
                  { day: "28. 3.", title: "PGA National – Palmer", items: ["18 jamiek", "PGA Tour Qualifying School"], tour: "PGA Tour" },
                  { day: "29. 3.", title: "PGA National – Champion", items: ["18 jamiek", "Ryder Cup, PGA Tour Cognizant Classic"], tour: "PGA Tour" },
                  { day: "30. 3.", title: "Voľný deň · Daytona Beach", items: ["Daytona Beach International Speedway, pláž alebo iné"] },
                  { day: "31. 3.", title: "LPGA International – Rees Jones", items: ["18 jamiek"], tour: "LPGA Tour" },
                  { day: "1. 4.", title: "TPC Sawgrass – Stadium Course", items: ["18 jamiek"], tour: "The Players Championship" },
                  { day: "2. 4.", title: "Arnold Palmer’s Bay Hill Club & Lodge", items: ["18 jamiek"], tour: "Arnold Palmer Invitational" },
                  { day: "3. 4.", title: "Voľný deň · Orlando", items: ["Outlety alebo zábavné parky"] },
                  { day: "4. 4.", title: "The Ritz-Carlton Golf Club", items: ["18 jamiek"], tour: "PGA Tour PNC Championship" },
                  { day: "5. 4.", title: "Grand Cypress Golf", items: ["18 jamiek"], tour: "World Cup of Golf & LPGA Tour Championship" },
                  { day: "6. 4.", title: "Voľný deň a odlet", items: ["Voľný program a odlet z Orlanda 21:45"] },
                  { day: "7. 4.", title: "Prílet do Viedne", items: ["Prílet Viedeň 16:35"] },
                ].map((day, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-gold/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <span className="text-sm font-semibold text-gold">{day.day}</span>
                      {day.tour && (
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {day.tour}
                        </span>
                      )}
                    </div>
                    <h5 className="font-serif text-lg font-bold text-foreground mb-1">{day.title}</h5>
                    <ul className="space-y-1">
                      {day.items.map((item, j) => (
                        <li key={j} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                <h4 className="font-semibold text-foreground mb-2">Cena zahŕňa</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li>• Zapožičanie vozidiel (Chevrolet Suburban a pod.) s neobmedzenými km a plným poistením</li>
                  <li>• Ubytovanie v DBL room podľa rozpisu</li>
                  <li>• 7× green fee 18 jamiek podľa programu</li>
                  <li>• Vstupenka na 60 min. prehliadku Daytona Beach Speedway</li>
                  <li>• Služby slovenského delegáta počas celého pobytu</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                <h4 className="font-semibold text-foreground mb-2">Cena nezahŕňa</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li>• Cestovné poistenie</li>
                  <li>• Tankovanie vozidiel a parkovné</li>
                  <li>• Stravu počas pobytu</li>
                  <li>• Sprepitné pre caddies (povinné na niektorých ihriskách)</li>
                  <li>• Administračný poplatok ESTA (povolenie na vstup do USA)</li>
                  <li>• Atrakcie a vstupenky mimo programu (NBA, NHL, výlety a iné)</li>
                  <li>• Letenku (Economy €1 875 / Economy Premium €2 100)</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-muted/50 border border-border p-4 sm:p-5">
              <h4 className="font-semibold text-foreground mb-2">Voliteľný program za príplatok</h4>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• Vstupenky na zápasy NBA a NHL</li>
                <li>• Vstupy do zábavných parkov Orlando</li>
                <li>• Prenájom vznášadla / člnov</li>
                <li>• Vstup do Daytona International Speedway</li>
                <li>• Ďalšie výlety a atrakcie</li>
              </ul>
            </div>

            <div className="rounded-xl bg-gold/10 border border-gold/30 p-4 sm:p-5">
              <h4 className="font-semibold text-foreground mb-3">Kontakt</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-foreground/90">
                  <span className="font-medium">Peter Švajlen, MBA</span>
                </p>
                <a href="mailto:peter@doni-travel.sk" className="flex items-center gap-2 text-gold hover:underline">
                  <Mail className="w-4 h-4" />
                  peter@doni-travel.sk
                </a>
                <a href="tel:+421905335501" className="flex items-center gap-2 text-gold hover:underline">
                  <Phone className="w-4 h-4" />
                  +421 905 335 501
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`mailto:peter@doni-travel.sk?subject=${encodeURIComponent("Prihlásenie – Florida PGA Swing")}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold text-primary hover:bg-gold-light hover:shadow-md hover:shadow-gold/30"
              >
                <Mail className="w-4 h-4" />
                Prihlásiť sa
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
};

export default Events;