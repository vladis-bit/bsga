import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import CursorGlowCard from "@/components/CursorGlowCard";
import serviceTourImgAsset from "@/assets/service-tour.webp.asset.json";
const serviceTourImg = serviceTourImgAsset.url;
import serviceFittingImgAsset from "@/assets/service-fitting.webp.asset.json";
const serviceFittingImg = serviceFittingImgAsset.url;
import serviceCourseImgAsset from "@/assets/service-course-management.webp.asset.json";
const serviceCourseImg = serviceCourseImgAsset.url;
import serviceIndividualImgAsset from "@/assets/service-individual.jpg.asset.json";
const serviceIndividualImg = serviceIndividualImgAsset.url;
import serviceStartCardsImgAsset from "@/assets/service-start-cards.jpg.asset.json";
const serviceStartCardsImg = serviceStartCardsImgAsset.url;
import serviceKidsAcademyImgAsset from "@/assets/service-kids-academy.jpg.asset.json";
const serviceKidsAcademyImg = serviceKidsAcademyImgAsset.url;
import serviceKidsCampsImgAsset from "@/assets/service-kids-camps-new.jpg.asset.json";
const serviceKidsCampsImg = serviceKidsCampsImgAsset.url;
import serviceCorporateImgAsset from "@/assets/service-corporate.webp.asset.json";
const serviceCorporateImg = serviceCorporateImgAsset.url;
import servicePerformanceImgAsset from "@/assets/service-performance.webp.asset.json";
const servicePerformanceImg = servicePerformanceImgAsset.url;
import serviceGreenCardsImgAsset from "@/assets/service-green-cards.webp.asset.json";
const serviceGreenCardsImg = serviceGreenCardsImgAsset.url;
import serviceEventsImgAsset from "@/assets/service-events.jpg.asset.json";
const serviceEventsImg = serviceEventsImgAsset.url;
import serviceGroupImgAsset from "@/assets/service-group.webp.asset.json";
const serviceGroupImg = serviceGroupImgAsset.url;
import {
  User,
  Users,
  GraduationCap,
  Award,
  Baby,
  Tent,
  Building2,
  Trophy,
  Wrench,
  Calendar,
  MapPin,
  Target,
  Sparkles,
} from "lucide-react";

const RevealCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.1 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

const services = [
  {
    icon: User,
    title: "Individuálne lekcie",
    image: serviceIndividualImg,
    link: "/zacni-s-golfom#zlepsuj-sa",
    description: (
      <>
        Osobný tréning, kde sa <strong>tréner venuje len vám</strong>. Jasné vysvetlenia, <strong>presné rady</strong> a cvičenia, ktoré vás posunú vpred už po <strong>pár lekciách</strong>.
      </>
    ),
  },
  {
    icon: Users,
    title: "Skupinové lekcie",
    image: serviceGroupImg,
    link: "/zacni-s-golfom#zlepsuj-sa",
    description: (
      <>
        Tréning v <strong>príjemnej skupine</strong>, kde sa učíte spolu s ostatnými. Dynamika, <strong>zdravá motivácia</strong> a praktické cvičenia, ktoré robia každú lekciu <strong>zábavnou aj efektívnou</strong>.
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: "Víkendový kurz zelenej karty",
    image: serviceStartCardsImg,
    link: "/zacni-s-golfom#vikendovy-kurz",
    description: (
      <>
        Ideálny program pre <strong>úplných začiatočníkov</strong>. Získate <strong>pevné základy</strong>, pochopíte, ako golf funguje, a vytvoríte si istotu ešte pred <strong>vstupom na ihrisko</strong>.
      </>
    ),
  },
  {
    icon: Award,
    title: "Zelené karty",
    image: serviceGreenCardsImg,
    link: "/zacni-s-golfom#zelena-karta",
    description: (
      <>
        Kompletný kurz, ktorý vás pripraví na <strong>samostatnú hru</strong>. Technika, pravidlá, etika a <strong>záverečný test</strong> – po absolvovaní máte <strong>oficiálnu spôsobilosť</strong> hrať na ihriskách.
      </>
    ),
  },
  {
    icon: Baby,
    title: "BSGA Junior Level System",
    image: serviceKidsAcademyImg,
    link: "/akademia#junior-level-system",
    description: (
      <>
        Tréningy pre deti, ktoré spájajú <strong>pohyb, hravosť</strong> a systematický <strong>rozvoj techniky</strong>. Super prostredie, nové kamarátstva a tréningy, na ktoré sa <strong>deti tešia</strong>.
      </>
    ),
  },
  {
    icon: Tent,
    title: "Detské kempy",
    image: serviceKidsCampsImg,
    objectPosition: "center 60%",
    link: "/akademia#tabory",
    description: (
      <>
        Týždne <strong>plné golfu a zážitkov</strong>. Každý deň prináša šport, hry a aktivity, ktoré udržia deti <strong>v pohybe</strong> a zlepšia ich <strong>golfové schopnosti</strong>.
      </>
    ),
  },
  {
    icon: Building2,
    title: "Firemné akcie a teambuildingy",
    image: serviceCorporateImg,
    link: "/firemne-akcie",
    description: (
      <>
        Príjemná kombinácia <strong>golfu, zábavy a spolupráce</strong>. Vhodné pre firmy, ktoré chcú zažiť niečo nové a podporiť <strong>tímového ducha</strong> v uvoľnenej atmosfére.
      </>
    ),
  },
  {
    icon: Trophy,
    title: "Turnaje – BSGA Tour",
    image: serviceTourImg,
    link: "/tour",
    description: (
      <>
        Séria turnajov, kde môžete <strong>otestovať svoju formu</strong>, zbierať body a súťažiť s hráčmi podobnej úrovne. Príjemná atmosféra a <strong>profesionálna organizácia</strong>.
      </>
    ),
  },
  {
    icon: Wrench,
    title: "Fitting – vybavenie na mieru",
    image: serviceFittingImg,
    link: "/fitting",
    description: (
      <>
        Merania a <strong>testovanie palíc</strong>, aby ste našli vybavenie, ktoré vám skutočne sedí. <strong>Správny výber</strong> dokáže urobiť <strong>citeľný rozdiel</strong> vo vašej hre.
      </>
    ),
  },
  {
    icon: Calendar,
    title: "Eventy, teambuildingy a golfové pobyty",
    image: serviceEventsImg,
    objectPosition: "center 50%",
    link: "/eventy",
    description: (
      <>
        Golfové akcie a <strong>eventy na mieru</strong>. Ponúkame jednodňové akcie až po kompletné <strong>sústredenia s PGA trénermi</strong>. Záruka spokojnosti. Všetko zabezpečené tak, aby ste si to <strong>naplno užili</strong>.
      </>
    ),
  },
  {
    icon: MapPin,
    title: "Course Management",
    image: serviceCourseImg,
    link: "/zacni-s-golfom#dominuj",
    description: (
      <>
        Tréning s <strong>PGA trénerom</strong> na ihrisku. <strong>Analýza hry</strong>, know-how a odborné poradenstvo za cieľom dosiahnutia <strong>najnižšieho skóre</strong>.
      </>
    ),
  },
  {
    icon: Target,
    title: "Performance Center",
    image: servicePerformanceImg,
    externalLink: "https://bsga-performance-center.reenio.sk/sk/terms/",
    description: (
      <>
        Tréningové centrum počas <strong>zimných mesiacov</strong> s <strong>Trackmanom</strong> a <strong>Flightscopom</strong> priamo v <strong>Petržalke</strong>.
      </>
    ),
  },
];

const Services = () => {
  const serviceSchemas = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    provider: { "@id": "https://bsga.sk/#organization" },
    areaServed: "SK",
    serviceType: "Golf",
  }));
  return (
    <>
      <SEO
        title="Služby | BSGA - Best Swing Golf Academy"
        description="Kompletné golfové služby - individuálne a skupinové lekcie, zelené karty, detská akadémia, firemné akcie, turnaje BSGA Tour a fitting na mieru."
        path="/sluzby"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Služby", url: "https://bsga.sk/sluzby" },
        ]}
        jsonLd={serviceSchemas}
      />
      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main>
          <section className="relative overflow-hidden bg-background pb-12 pt-24 sm:pb-16 md:pt-32">
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
                <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                  Služby
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                </span>
                <h1 className="mt-2 text-balance font-serif text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Čo ponúkame
                </h1>
                <p className="mt-2 max-w-2xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-xl">
                  12 profesionálnych služieb pre každého golfistu
                </p>
              </div>
            </div>
          </section>

          <section className="bg-background pb-16 pt-8 md:pb-24 md:pt-10">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    Naše služby
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">
                    <Sparkles className="h-4 w-4" /> Vyberte si to pravé
                  </p>
                </div>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40 md:block">
                  12 služieb
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3">
                {services.map((service, index) => {
                  const card = (
                      <CursorGlowCard
                        className={`group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-gold/40 hover:shadow-xl ${
                          (service as any).link ? "cursor-pointer hover:-translate-y-1" : ""
                        }`}
                      >
                        {service.image && (
                          <div className="p-4 sm:p-5 pb-0 sm:pb-0">
                            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
                              <img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: service.objectPosition || 'center 25%' }} loading="lazy" />
                            </div>
                          </div>
                        )}
                        <div className="flex h-full flex-col p-5 sm:p-6 md:p-8 pt-4 sm:pt-5 md:pt-6">
                          <h2 className="mb-3 text-center font-serif text-lg font-bold text-foreground sm:mb-4 sm:text-xl">
                            {service.title}
                          </h2>
                          <p className="text-center text-sm leading-relaxed text-foreground/80 sm:text-base">
                            {service.description}
                          </p>
                          <div className="mt-6 flex flex-grow items-end justify-center pt-2">
                            <span className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-primary">
                              Zobraziť detaily služby
                            </span>
                          </div>
                        </div>
                    </CursorGlowCard>
                  );
                  const externalLink = (service as any).externalLink as string | undefined;
                  const internalLink = (service as any).link as string | undefined;
                  let inner: JSX.Element;
                  if (externalLink) {
                    inner = (
                      <a
                        href={externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Zobraziť detaily služby: ${service.title}`}
                        className="block h-full"
                      >
                        {card}
                      </a>
                    );
                  } else if (internalLink) {
                    inner = (
                      <Link to={internalLink} aria-label={`Zobraziť detaily služby: ${service.title}`} className="block h-full">
                        {card}
                      </Link>
                    );
                  } else {
                    inner = <div className="h-full">{card}</div>;
                  }
                  return (
                    <RevealCard key={index} index={index}>
                      {inner}
                    </RevealCard>
                  );
                })}
              </div>
            </div>
          </section>

          <ContactForm />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Services;
