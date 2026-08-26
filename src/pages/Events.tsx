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
import marosPhoto from "@/assets/team/maros-gajan.webp";
import doniTravelLogo from "@/assets/partner-doni-travel.png";
import czechPgaPoster from "@/assets/event-posters/doni-travel-czech-pga-tour.pdf.asset.json";
import camiralPoster from "@/assets/event-posters/doni-travel-camiral.pdf.asset.json";
import livPoster from "@/assets/event-posters/doni-travel-liv.pdf.asset.json";
import proamPoster from "@/assets/event-posters/doni-turnaj-4teams.pdf.asset.json";
import kaskadaPoster from "@/assets/event-posters/kaskada-golfovy-vikend.pdf.asset.json";

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
    title: "DONI-TRAVEL × BSGA — Turnaj Pro-Am Tímov",
    date: "13. – 15. 9. 2026",
    location: "Golf Resort Kaskáda",
    posterUrl: proamPoster.url,
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
    title: "Golfový víkend na Kaskáde",
    date: "18. – 20. 9. 2026",
    location: "Golf Resort Kaskáda",
    posterUrl: kaskadaPoster.url,
    details: {
      subtitle: "Golfový víkend s BSGA trénermi v Golf Resort Kaskáda",
      intro: "Trojdňový zájazd do Českej republiky určený primárne pre úspešných absolventov zelenej karty. V cene sú 2 noci ubytovania v 4* hoteli s raňajkami, 6 hodín skupinových tréningov, playing lessons s BSGA trénermi, neobmedzená hra na 6-jamkovej akadémii, green fee na 9 jamiek a vstup do wellness.",
      price: "€390 / golfista",
      priceNote: "Príplatok za single room: €100.",
      schedule: [
        { day: "Piatok 18. 9.", title: "Tréningový deň", items: ["Príjazd a ubytovanie v 4* hoteli", "Skupinové tréningy s dvoma BSGA trénermi", "Vstup do wellness"] },
        { day: "Sobota 19. 9.", title: "Neobmedzená hra", items: ["Neobmedzená hra na 6-jamkovej akadémii", "Pokračovanie skupinových tréningov", "Vstup do wellness"] },
        { day: "Nedeľa 20. 9.", title: "Green fee a playing lesson", items: ["Green fee na 9 jamiek", "Playing lesson s BSGA trénermi", "Záver zájazdu"] },
      ],
      contact: {
        name: "Maroš Gajan",
        email: "maros@bsga.sk",
        phone: "+421 903 243 999",
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

const archivedEvents: EventItem[] = [
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
  },  {
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

];

const EventCard = ({
  event,
  index,
  variant = "small",
  hideSignup = false,
  soldOut = false,
}: {
  event: EventItem;
  index: number;
  variant?: "featured" | "side" | "small";
  hideSignup?: boolean;
  soldOut?: boolean;
}) => {
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
        className={
          variant === "featured"
            ? "md:col-span-8 relative overflow-hidden rounded-2xl border-l-4 border-gold bg-card p-6 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-lg"
            : variant === "side"
              ? "md:col-span-4 relative overflow-hidden rounded-2xl bg-muted p-6 sm:p-8 transition-all duration-300 hover:bg-muted/70"
              : "md:col-span-6 relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:border-gold/50"
        }
      >
        {soldOut && (
          <div className="pointer-events-none absolute -right-12 top-5 rotate-45 bg-foreground text-background text-[10px] sm:text-xs font-bold tracking-widest px-12 py-1 shadow-md">
            OBSADENÉ
          </div>
        )}

        <div className={variant === "featured" ? "grid gap-5 md:grid-cols-[auto_1fr] md:items-start" : "grid gap-4"}>
          <div
            className={
              variant === "featured"
                ? "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gold font-serif text-2xl font-bold text-primary-foreground"
                : "text-xs font-bold uppercase tracking-[0.2em] text-gold"
            }
          >
            {variant === "featured" ? String(index + 1).padStart(2, "0") : `0${index + 1} — Akcia`}
          </div>
          <div className="min-w-0">
            <h3
              className={
                variant === "featured"
                  ? "font-serif text-2xl sm:text-4xl font-bold leading-tight text-foreground"
                  : "font-serif text-xl sm:text-2xl font-bold leading-tight text-foreground"
              }
            >
              {event.title}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
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

            <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
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
              {!hideSignup && !soldOut && (
                <a
                  href={`mailto:${signupEmail}?subject=${mailSubject}`}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold text-primary hover:bg-gold-light hover:shadow-md hover:shadow-gold/30"
                >
                  <Mail className="w-4 h-4" />
                  <span>Prihlásiť sa</span>
                </a>
              )}
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

              <div className="rounded-xl bg-gold/10 border border-gold/30 p-4 sm:p-5 flex items-center justify-between gap-4 sm:gap-6">
                <div className="min-w-0">
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
                <img
                  src={event.details.contact.name.includes("Maroš") ? marosPhoto : peterPhoto}
                  alt={`Kontaktná osoba ${event.details.contact.name}`}
                  loading="lazy"
                  className="w-28 h-32 sm:w-32 sm:h-40 rounded-2xl object-cover object-[center_20%] border border-gold/40 shadow-md shadow-gold/10 flex-shrink-0 self-center"
                />
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

  const parseEventDates = (dateStr: string): { startDate?: string; endDate?: string } => {
    // Handles: "1. – 6. 5. 2026" | "20. – 23. 8. 2026" | "25. 9. 2026" | "10. – 17. 10. 2026"
    const months: Record<string, string> = {};
    const clean = dateStr.replace(/\s+/g, " ").trim();
    const rangeMatch = clean.match(/^(\d+)\.\s*(?:–|-)\s*(\d+)\.\s*(\d+)\.\s*(\d{4})$/);
    if (rangeMatch) {
      const [, d1, d2, m, y] = rangeMatch;
      return {
        startDate: `${y}-${m.padStart(2, "0")}-${d1.padStart(2, "0")}`,
        endDate: `${y}-${m.padStart(2, "0")}-${d2.padStart(2, "0")}`,
      };
    }
    const single = clean.match(/^(\d+)\.\s*(\d+)\.\s*(\d{4})$/);
    if (single) {
      const [, d, m, y] = single;
      return { startDate: `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}` };
    }
    return {};
  };

  const eventSchemas = events
    .map((e) => {
      const { startDate, endDate } = parseEventDates(e.date);
      if (!startDate) return null;
      return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: e.title,
        description: e.details?.intro,
        startDate,
        ...(endDate ? { endDate } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: e.location
          ? { "@type": "Place", name: e.location, address: { "@type": "PostalAddress", addressCountry: "SK" } }
          : undefined,
        organizer: { "@id": "https://bsga.sk/#organization" },
        url: "https://bsga.sk/eventy",
        ...(e.details?.price
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: "https://bsga.sk/eventy",
                description: e.details.price,
              },
            }
          : {}),
      };
    })
    .filter(Boolean) as Record<string, unknown>[];

  return (
    <>
      <SEO
        title="Eventy, teambuildingy a golfové pobyty | BSGA"
        description="Golfové eventy, teambuildingy a pobyty s BSGA a cestovnou agentúrou Doni-Travel. Pozrite si nasledujúce akcie a prihláste sa."
        path="/eventy"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Eventy, teambuildingy a golfové pobyty", url: "https://bsga.sk/eventy" },
        ]}
        jsonLd={eventSchemas}
      />
      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main>
          <section className="relative overflow-hidden bg-background pb-12 pt-24 sm:pb-16 md:pt-32">
            <div className="container relative z-10 mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto flex max-w-4xl flex-col items-center text-center"
              >
                <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                  Doni-Travel × BSGA
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                </span>

                <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Eventy, teambuildingy a golfové pobyty
                </h1>

                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-xl">
                  Golfové akcie, firemné turnaje a kompletné pobyty na mieru — od prvého odpalu
                  po posledný detail. Pobyty organizujeme spolu s cestovnou agentúrou{" "}
                  <strong className="font-semibold text-gold">Doni-Travel</strong>.
                </p>

                <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
                  <a
                    href="#akcie"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-bold text-primary-foreground transition-colors duration-300 hover:bg-foreground sm:w-auto"
                  >
                    <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    Pozrieť akcie 2026
                  </a>
                  <a
                    href="#kontakt-eventy"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground px-10 py-4 text-sm font-bold text-foreground transition-colors duration-300 hover:bg-muted sm:w-auto"
                  >
                    <Mail className="h-4 w-4 text-gold" />
                    Kontaktujte nás
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="akcie" className="scroll-mt-24 bg-background pb-16 pt-8 md:pb-24 md:pt-10">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    Nasledujúce akcie
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">
                    <Sparkles className="h-4 w-4" /> Pridajte sa k nám
                  </p>
                </div>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40 md:block">
                  Sezóna 2026 / 2027
                </span>
              </div>

              <div className="mb-10 max-w-3xl">
                <p className="text-sm leading-relaxed text-foreground/70 sm:text-base">
                  Pripravili sme pre vás výber tých najlepších golfových zážitkov sezóny – od medzinárodných výjazdov,
                  cez tímové turnaje, až po prestížne pozvánkové eventy. Vyberte si akciu, ktorá vás osloví,
                  a rezervujte si miesto včas – kapacita je <strong className="text-gold">limitovaná</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                {events.map((event, index) => (
                  <EventCard
                    key={index}
                    event={event}
                    index={index}
                    variant={index === 0 ? "featured" : index === 1 ? "side" : "small"}
                    soldOut={index === 0}
                  />
                ))}
              </div>

              <div className="mt-12 sm:mt-16">
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition-colors duration-300 hover:border-gold/50 sm:p-10 md:p-12">
                  {/* Logo with gold frame */}
                  <div className="relative mx-auto mb-6 sm:mb-8 inline-flex items-center justify-center">
                    <div className="relative rounded-xl border border-border p-3 sm:p-4 bg-muted">
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


          <section id="kontakt-eventy" className="scroll-mt-24 bg-background pb-20 md:pb-28">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto rounded-3xl border border-border bg-muted p-6 sm:p-10 md:p-12">
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 md:gap-8 text-center sm:text-left">
                  <div className="relative shrink-0">
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

          <section className="bg-foreground py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto text-left">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-gold">
                  <Sparkles className="w-4 h-4" /> Plánované akcie
                </span>
                <h2 className="mt-4 font-serif text-3xl font-bold text-background sm:text-4xl md:text-5xl">
                  Akcie a pobyty v roku 2027
                </h2>
                <p className="mt-4 text-lg sm:text-xl text-background/60">
                  Zverejníme už čoskoro
                </p>

                {/* Featured: Florida PGA Swing — OBSADENÉ */}
                <div className="relative mt-10 sm:mt-12 rounded-2xl border-l-4 border-gold bg-card shadow-2xl transition-all">
                  <div className="pointer-events-none absolute -right-12 top-5 z-20 rotate-45 bg-foreground text-background text-[10px] sm:text-xs font-bold tracking-widest px-12 py-1 shadow-md">
                    OBSADENÉ
                  </div>
                  <div className="absolute -top-3 left-6 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-gold text-primary-foreground text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Highlight 2027
                  </div>
                  <div className="p-6 sm:p-10 text-left opacity-80">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl font-serif font-bold text-xl sm:text-2xl bg-muted text-muted-foreground">
                        2027
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold leading-tight text-foreground">
                          Florida PGA Swing
                        </h3>
                        <p className="mt-2 text-base sm:text-lg text-muted-foreground">
                          Exkluzívny golfový zájazd s BSGA & DONI-Travel počas Veľkej noci
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:text-base text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                            <span className="font-medium">26. 3. – 2. 4. 2027</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                            <span className="font-medium">Florida, USA</span>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
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
                            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 bg-gold/15 text-gold hover:bg-gold/25 border border-gold/40"
                          >
                            <Info className="w-4 h-4" />
                            Informácie
                          </button>
                          <span
                            aria-disabled="true"
                            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 text-sm font-semibold rounded-full bg-muted/60 text-muted-foreground cursor-not-allowed"
                          >
                            Vypredané
                          </span>
                        </div>
                        <p data-testid="florida-soldout-note" className="mt-3 text-xs sm:text-sm text-muted-foreground">
                          Zájazd je momentálne <strong className="text-foreground">obsadený</strong>. O náhradných termínoch
                          alebo zápise na waitlist Vás informujeme na{" "}
                          <a href="mailto:peter@doni-travel.sk" className="text-gold hover:underline font-medium">
                            peter@doni-travel.sk
                          </a>{" "}
                          alebo na{" "}
                          <a href="tel:+421905335501" className="text-gold hover:underline font-medium">
                            +421 905 335 501
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 rounded-2xl border border-border bg-card shadow-xl p-5 sm:p-6 text-left transition-all hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-serif font-bold text-lg bg-gold/10 text-gold">
                      2027
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-serif font-bold leading-tight text-foreground">
                        Jarný tréningový kemp v Turecku
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        Rozohranie sa a príprava na novú golfovú sezónu pod vedením 4 BSGA trénerov.
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gold" />
                          <span>13. – 20. 3. 2027</span>
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
                          href={`mailto:peter@doni-travel.sk?subject=${encodeURIComponent("Informácie – Jarný tréningový kemp v Turecku")}`}
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-gold/10 text-gold hover:bg-gold/20 border border-gold/20"
                        >
                          <Info className="w-4 h-4" />
                          Informácie
                        </a>
                        <a
                          href={`mailto:peter@doni-travel.sk?subject=${encodeURIComponent("Prihlásenie – Jarný tréningový kemp v Turecku")}`}
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

          <section id="archiv-eventov" className="scroll-mt-24 bg-muted/50 py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    Archív eventov a akcií
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">
                    <Calendar className="h-4 w-4" /> Uskutočnené akcie
                  </p>
                </div>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40 md:block">
                  Archív
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                {archivedEvents.map((event, index) => (
                  <EventCard key={`archiv-${index}`} event={event} index={index} variant="small" hideSignup />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Dialog open={floridaOpen} onOpenChange={setFloridaOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Florida PGA Swing by DONI-Travel
            </DialogTitle>
            <DialogDescription className="text-gold font-medium text-base">
              26. 3. – 2. 4. 2027 · Florida, USA
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
              Exkluzívny golfový zájazd naprieč Floridou počas Veľkej noci – ihriská svetových turnajov PGA Tour,
              LPGA Tour a The Players Championship, prémiové rezorty a slovenský delegát počas celého pobytu.
            </p>

            <div className="rounded-xl bg-muted/70 p-4 sm:p-5 border border-gold/20">
              <div className="flex items-center gap-2 mb-2 text-gold">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wide">Termín a cena</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-foreground">26. 3. – 2. 4. 2027</p>
              <p className="text-lg sm:text-xl font-bold text-foreground mt-1">€4 950 / golfista (DBL room)</p>
              <p className="text-sm text-foreground/80 mt-1">Príplatok za SNG room: €1 200</p>
              <p className="text-sm text-muted-foreground mt-2">
                Letenka nie je zahrnutá: Premium Economy €2 250 / osoba (Lufthansa / Austrian Airlines,
                Viedeň – Newark – West Palm Beach / Orlando – Mníchov – Viedeň). Kalkulácia zohľadňuje aktuálny kurz EUR/USD.
              </p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wide mb-3">
                <Calendar className="w-5 h-5" /> Letenka Lufthansa / Austrian Airlines
              </h4>
              <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-2 text-sm text-foreground/85">
                <p><span className="font-semibold text-foreground">26. 3. 2027</span> · OS 037 · Viedeň – Newark · 10:30 – 14:55</p>
                <p><span className="font-semibold text-foreground">26. 3. 2027</span> · UA 2823 · Newark – West Palm Beach · 18:00 – 20:56</p>
                <p><span className="font-semibold text-foreground">1. 4. 2027</span> · LH 4389 · Orlando – Mníchov · 22:00 – 13:35 (2. 4. 2027)</p>
                <p><span className="font-semibold text-foreground">2. 4. 2027</span> · OS 186 · Mníchov – Viedeň · 15:30 – 16:35</p>
                <ul className="mt-3 space-y-1 text-foreground/80">
                  <li>• Premium Economy · booking code 9AB3VI</li>
                  <li>• 1× malá príručná batožina 40×30×15 cm</li>
                  <li>• 1× väčšia príručná batožina 55×40×23 cm</li>
                  <li>• 2× 23 kg batožina do podpalubia (môže byť aj golfový vak)</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wide mb-3">
                <MapPin className="w-5 h-5" /> Ubytovanie
              </h4>
              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h5 className="font-serif text-lg font-bold text-foreground mb-1">26. 3. – 28. 3. · West Palm Beach</h5>
                  <p className="text-sm text-foreground/80">PGA National Resort – 2 noci Resort Room, denný kredit 25 USD na raňajky.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h5 className="font-serif text-lg font-bold text-foreground mb-1">28. 3. – 30. 3. · Daytona Beach</h5>
                  <p className="text-sm text-foreground/80">Holiday Inn Hotel & Suites Daytona Beach on the Ocean by IHG – 2 noci s raňajkami.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h5 className="font-serif text-lg font-bold text-foreground mb-1">30. 3. – 31. 3. · Sawgrass</h5>
                  <p className="text-sm text-foreground/80">Marriott Golf Resort & Spa – 1 noc, raňajky v TPC Sawgrass clubhouse.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h5 className="font-serif text-lg font-bold text-foreground mb-1">31. 3. – 1. 4. · Orlando</h5>
                  <p className="text-sm text-foreground/80">Arnold Palmer’s Bay Hill Club & Lodge – 1 noc, raňajky v clubhouse.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wide mb-3">
                <MapPin className="w-5 h-5" /> Program & Golf
              </h4>
              <div className="space-y-3">
                {[
                  { day: "26. 3.", title: "Prílet do West Palm Beach", items: ["Prílet 20:56, voľný večer"] },
                  { day: "27. 3.", title: "PGA National – Palmer", items: ["18 jamiek", "PGA Tour Qualifying School", "Tee-time 11 hráčov 13:09 & 13:12 & 13:21"], tour: "PGA Tour" },
                  { day: "28. 3.", title: "PGA National – Champion", items: ["18 jamiek", "Ryder Cup, PGA Tour Cognizant Classic", "Tee-time 11 hráčov 9:33 & 9:41 & 9:50"], tour: "PGA Tour" },
                  { day: "29. 3.", title: "Voľný deň · Daytona Beach", items: ["60-minútová prehliadka Daytona Beach International Speedway", "Voľný program – pláž a iné"] },
                  { day: "30. 3.", title: "LPGA International – Rees Jones", items: ["18 jamiek", "Tee-time 12 hráčov 9:07 & 9:16 & 9:25"], tour: "LPGA Tour" },
                  { day: "31. 3.", title: "TPC Sawgrass – Stadium Course", items: ["18 jamiek", "Tee-time 11 hráčov 9:30 & 9:40 & 9:50 (3 osoby)"], tour: "The Players Championship" },
                  { day: "1. 4.", title: "Arnold Palmer’s Bay Hill Club & Lodge", items: ["18 jamiek", "Tee-time 11 hráčov 10:30 & 10:40 & 10:50", "Odlet z Orlanda 22:00"], tour: "Arnold Palmer Invitational" },
                  { day: "2. 4.", title: "Prílet do Viedne", items: ["Prílet Viedeň 16:35"] },
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
                  <li>• 5× green fee 18 jamiek podľa programu</li>
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
                  <li>• Letenku Premium Economy (aktuálna cena €2 250 / osoba)</li>
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

            <div className="rounded-xl bg-gold/10 border border-gold/30 p-4 sm:p-5 flex items-center justify-between gap-4 sm:gap-6">
              <div className="min-w-0">
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
              <img
                src={peterPhoto}
                alt="Kontaktná osoba Peter Švajlen"
                loading="lazy"
                className="w-28 h-32 sm:w-32 sm:h-40 rounded-2xl object-cover object-[center_20%] border border-gold/40 shadow-md shadow-gold/10 flex-shrink-0 self-center"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <span
                aria-disabled="true"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-muted/60 text-muted-foreground cursor-not-allowed self-start"
              >
                Vypredané
              </span>
              <p data-testid="florida-soldout-note-dialog" className="text-xs sm:text-sm text-muted-foreground">
                Podujatie je momentálne <strong className="text-foreground">obsadené</strong>. Náhradné termíny
                alebo zápis na waitlist vybavíte cez{" "}
                <a href="mailto:peter@doni-travel.sk" className="text-gold hover:underline font-medium">
                  peter@doni-travel.sk
                </a>{" "}
                alebo{" "}
                <a href="tel:+421905335501" className="text-gold hover:underline font-medium">
                  +421 905 335 501
                </a>
                .
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
};

export default Events;