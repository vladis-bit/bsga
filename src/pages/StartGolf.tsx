import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Award, Check, ArrowRight, Flag, User, Users, TrendingUp, ChevronDown, MapPin, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import CursorGlowCard from "@/components/CursorGlowCard";
import ServiceCard from "@/components/shop/ServiceCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import serviceStartCardsImg from "@/assets/service-start-cards.jpg";
import serviceGreenCardsImg from "@/assets/service-green-cards.jpg";
import serviceIndividualImg from "@/assets/service-individual.jpg";
import serviceGroupImg from "@/assets/service-group.jpg";
import serviceCourseImg from "@/assets/service-course-management.png";

// Reveal-on-scroll wrapper (same pattern as DevelopmentTimeline)
const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Connector between milestones - vertical line with chevron
const MilestoneConnector = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="flex justify-center py-6 sm:py-10">
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-gold/60 via-gold/40 to-gold/10" />
        <ChevronDown className="w-5 h-5 text-gold animate-bounce" />
      </motion.div>
    </div>
  );
};

// Reusable FAQ block per step
const StepFAQ = ({
  faqs,
  idPrefix,
}: {
  faqs: { q: string; a: string }[];
  idPrefix: string;
}) => (
  <Reveal delay={0.3}>
    <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
          Časté otázky
        </span>
        <h3 className="mt-2 text-xl sm:text-2xl font-bold text-primary-foreground">
          Otázky k tomuto kroku
        </h3>
      </div>
      <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={`${idPrefix}-${i}`}
            value={`${idPrefix}-${i}`}
            className="bg-muted rounded-lg sm:rounded-xl border border-border px-4 sm:px-6 data-[state=open]:border-gold/40"
          >
            <AccordionTrigger className="text-left font-medium text-foreground hover:text-gold py-4 sm:py-5 hover:no-underline text-sm sm:text-base">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/75 pb-4 sm:pb-5 leading-relaxed text-sm sm:text-base">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </Reveal>
);

const StartGolf = () => {
  const milestones = [
    {
      number: "01",
      icon: Flag,
      title: "Víkendový kurz",
      subtitle: "Začni svoju cestu",
      target: "vikendovy-kurz",
    },
    {
      number: "02",
      icon: Award,
      title: "Zelená karta",
      subtitle: "Získaj spôsobilosť",
      target: "zelena-karta",
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Zlepšuj sa",
      subtitle: "Posúvaj svoju hru",
      target: "zlepsuj-sa",
    },
    {
      number: "04",
      icon: Crown,
      title: "Dominuj v hre",
      subtitle: "Hraj ako profesionál",
      target: "dominuj",
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Začni s golfom | BSGA - Best Swing Golf Academy</title>
        <meta
          name="description"
          content="Začni s golfom - Víkendový kurz zelenej karty, kurz zelenej karty a individuálne lekcie. Vyber si program a kúp si kurz online."
        />
      </Helmet>

      <Navbar />

      <AuroraBackground className="min-h-screen bg-primary text-primary-foreground" showRadialGradient={false}>
        {/* HERO */}
        <section className="bg-transparent pb-8 pt-24 sm:pt-28 md:pt-32 md:pb-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                Tvoja cesta
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Začni s golfom
              </h1>
              <p className="max-w-2xl text-sm sm:text-base md:text-lg text-primary-foreground/70 px-2">
                Tri jednoduché kroky od prvého švihu k samostatnej hre na ihrisku.
                Vyber si program a kúp si kurz online.
              </p>
            </div>
          </div>
        </section>

        {/* MILESTONES OVERVIEW (timeline) */}
        <section className="bg-transparent pb-12 sm:pb-16 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Desktop horizontal timeline */}
              <div className="hidden lg:block relative">
                {/* Connecting line */}
                <div className="absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-gold/10 via-gold/50 to-gold/10" />

                <div className="relative grid grid-cols-4 gap-4 lg:gap-6">
                  {milestones.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <Reveal key={m.number} delay={i * 0.15}>
                        <button
                          onClick={() => scrollToSection(m.target)}
                          className="group flex flex-col items-center text-center w-full"
                        >
                          <div className="w-16 h-16 rounded-full bg-primary border-2 border-gold/60 flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-gold group-hover:scale-110 group-hover:bg-gold/10 shadow-lg shadow-gold/10">
                            <Icon className="w-7 h-7 text-gold" />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80 mb-1">
                            Krok {m.number}
                          </span>
                          <h3 className="text-base lg:text-lg font-serif font-bold text-primary-foreground group-hover:text-gold transition-colors">
                            {m.title}
                          </h3>
                          <p className="text-xs lg:text-sm text-primary-foreground/60 mt-1">
                            {m.subtitle}
                          </p>
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </div>

              {/* Tablet 2x2 grid timeline */}
              <div className="hidden sm:block lg:hidden">
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  {milestones.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <Reveal key={m.number} delay={i * 0.1}>
                        <button
                          onClick={() => scrollToSection(m.target)}
                          className="group flex items-center gap-4 w-full text-left"
                        >
                          <div className="w-14 h-14 rounded-full bg-primary border-2 border-gold/60 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10 shadow-lg shadow-gold/10">
                            <Icon className="w-6 h-6 text-gold" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">
                              Krok {m.number}
                            </span>
                            <h3 className="text-base font-serif font-bold text-primary-foreground group-hover:text-gold transition-colors truncate">
                              {m.title}
                            </h3>
                            <p className="text-xs text-primary-foreground/60 truncate">{m.subtitle}</p>
                          </div>
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </div>

              {/* Mobile vertical timeline */}
              <div className="sm:hidden relative">
                <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-gold/10 via-gold/50 to-gold/10" />
                <div className="space-y-4">
                  {milestones.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <Reveal key={m.number} delay={i * 0.1}>
                        <button
                          onClick={() => scrollToSection(m.target)}
                          className="group relative flex items-center gap-4 w-full text-left"
                        >
                          <div className="w-16 h-16 rounded-full bg-primary border-2 border-gold/60 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10 shadow-lg shadow-gold/10">
                            <Icon className="w-6 h-6 text-gold" />
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">
                              Krok {m.number}
                            </span>
                            <h3 className="text-base font-serif font-bold text-primary-foreground group-hover:text-gold transition-colors">
                              {m.title}
                            </h3>
                            <p className="text-xs text-primary-foreground/60">{m.subtitle}</p>
                          </div>
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KROK 1 - VÍKENDOVÝ KURZ */}
        <section id="vikendovy-kurz" className="scroll-mt-24 bg-transparent pb-6 pt-6 sm:pb-8 sm:pt-8">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                  Krok 01
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                  Víkendový kurz zelenej karty
                </h2>
                <p className="mt-3 text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                  Tvoje prvé stretnutie s golfom v intenzívnom víkendovom formáte. Pevné základy a istota pred vstupom na ihrisko.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="max-w-5xl mx-auto">
                <CursorGlowCard className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-background/75 transition-all duration-300 hover:border-gold/40 hover:shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="aspect-[16/10] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-xl">
                        <img
                          src={serviceStartCardsImg}
                          alt="Víkendový kurz zelenej karty"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: "center 25%" }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col p-5 sm:p-6 md:p-8 lg:pl-2">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 sm:h-14 sm:w-14">
                        <Flag className="text-gold" size={22} />
                      </div>
                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground sm:text-2xl">
                        Čo je víkendový kurz?
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                        Ideálny program pre <strong>úplných začiatočníkov</strong>. Počas víkendu získaš <strong>pevné základy</strong>,
                        pochopíš, ako golf funguje, a pripravíš sa na <strong>získanie zelenej karty</strong>.
                      </p>

                      <ul className="mt-5 space-y-3">
                        {[
                          "Intenzívny víkendový formát",
                          "Úvod do techniky švihu",
                          "Pravidlá a etika golfu",
                          "Príprava na zelenú kartu",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/80 text-xs sm:text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CursorGlowCard>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 sm:mt-14">
                <div className="text-center mb-6 sm:mb-8">
                  <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                    Možnosť zakúpenia
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold text-primary-foreground">
                    Kúp si víkendový kurz
                  </h3>
                </div>

                <div className="max-w-md mx-auto pt-4">
                  <ServiceCard
                    title="Víkendový kurz zelenej karty"
                    price={139.99}
                    originalPrice={500}
                    discount={72}
                    icon={Flag}
                    popular
                    purchaseUrl="https://buy.stripe.com/28E3cvfzpep48by3d28so06"
                    features={[
                      "Úvodný kurz pre začiatočníkov",
                      "Základy golfu",
                      "Technika úderov",
                      "Príprava na zelenú kartu",
                      "Profesionálny dohľad",
                    ]}
                    note="V cene nie je zahrnutá záverečná skúška"
                  />
                </div>
              </div>
            </Reveal>

            <StepFAQ
              idPrefix="vikend"
              faqs={[
                {
                  q: "Pre koho je víkendový kurz vhodný?",
                  a: "Kurz je určený pre úplných začiatočníkov, ktorí sa chcú zoznámiť so základmi golfu v intenzívnom víkendovom formáte. Nepotrebuješ žiadne predchádzajúce skúsenosti ani vlastné vybavenie.",
                },
                {
                  q: "Čo všetko je v cene zahrnuté?",
                  a: "V cene je zahrnutý dvojdňový tréning pod vedením profesionálneho trénera, zapožičanie golfových palíc a loptičiek, teoretická príprava a praktické cvičenia. Záverečná skúška na zelenú kartu nie je súčasťou ceny.",
                },
                {
                  q: "Čo si mám priniesť na kurz?",
                  a: "Stačí ti pohodlné športové oblečenie a obuv s plochou podrážkou (ideálne tenisky alebo turfové topánky). Všetko vybavenie ti zapožičiame priamo na mieste.",
                },
              ]}
            />
          </div>
        </section>

        <MilestoneConnector />

        {/* KROK 2 - ZELENÁ KARTA */}
        <section id="zelena-karta" className="scroll-mt-24 bg-transparent py-6 sm:py-8">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                  Krok 02
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                  Zelená karta
                </h2>
                <p className="mt-3 text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                  Kompletná príprava na samostatnú hru. Po absolvovaní máš oficiálnu spôsobilosť hrať na ihriskách.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="max-w-5xl mx-auto">
                <CursorGlowCard className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-background/75 transition-all duration-300 hover:border-gold/40 hover:shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="aspect-[16/10] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-xl">
                        <img
                          src={serviceGreenCardsImg}
                          alt="Zelená karta - kurz pre samostatnú hru"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: "center 25%" }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col p-5 sm:p-6 md:p-8 lg:pl-2">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 sm:h-14 sm:w-14">
                        <Award className="text-gold" size={22} />
                      </div>
                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground sm:text-2xl">
                        Čo je zelená karta?
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                        Kompletný kurz, ktorý ťa pripraví na <strong>samostatnú hru</strong>. Technika, pravidlá, etika a
                        <strong> záverečný test</strong> – po absolvovaní máš <strong>oficiálnu spôsobilosť</strong> hrať na ihriskách.
                      </p>

                      <ul className="mt-5 space-y-3">
                        {[
                          "Technika úderov a swingu",
                          "Pravidlá a golfová etika",
                          "Praktický tréning na ihrisku",
                          "Certifikát po absolvovaní",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/80 text-xs sm:text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CursorGlowCard>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 sm:mt-14">
                <div className="text-center mb-6 sm:mb-8">
                  <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                    Možnosť zakúpenia
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold text-primary-foreground">
                    Kúp si kurz zelenej karty
                  </h3>
                </div>

                <div className="max-w-md mx-auto pt-4">
                  <ServiceCard
                    title="Kurz zelenej karty"
                    price={549.99}
                    icon={Award}
                    purchaseUrl="https://buy.stripe.com/8x25kD2MD3KqdvSbJy8so04"
                    features={[
                      "Kompletný kurz pre získanie karty",
                      "Teória a pravidlá golfu",
                      "Golfová etiketa",
                      "Praktický tréning na ihrisku",
                      "Certifikát po absolvovaní",
                    ]}
                  />
                </div>
              </div>
            </Reveal>

            <StepFAQ
              idPrefix="zk"
              faqs={[
                {
                  q: "Ako dlho trvá získanie zelenej karty?",
                  a: "Kurz zelenej karty zvyčajne trvá 1–2 týždne v závislosti od intenzity tréningov a tvojich časových možností. Obsahuje praktickú prípravu, teóriu pravidiel a záverečný test.",
                },
                {
                  q: "Čo zelená karta znamená v praxi?",
                  a: "Zelená karta je oficiálne potvrdenie tvojej spôsobilosti hrať golf samostatne. Bez nej ti väčšina ihrísk neumožní hrať bez sprievodu trénera. Je medzinárodne uznávaná.",
                },
                {
                  q: "Čo ak neprejdem záverečným testom?",
                  a: "Test môžeš opakovať. Náš tréner ťa pred ním dôkladne pripraví a poradí ti, na čo sa zamerať. Veľká väčšina účastníkov ho zvláda na prvý pokus.",
                },
              ]}
            />
          </div>
        </section>

        <MilestoneConnector />

        {/* KROK 3 - ZLEPŠUJ SA */}
        <section id="zlepsuj-sa" className="scroll-mt-24 bg-transparent py-6 sm:py-8">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                  Krok 03
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                  Zlepšuj sa v golfe
                </h2>
                <p className="mt-3 text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                  Posuň svoju hru na ďalšiu úroveň – vyber si individuálne lekcie alebo skupinové tréningy pod vedením profesionálneho trénera.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
                <CursorGlowCard className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-background/75 transition-all duration-300 hover:border-gold/40 hover:shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="aspect-[16/10] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-xl">
                        <img
                          src={serviceIndividualImg}
                          alt="Individuálne lekcie - zlepšuj sa v golfe"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: "center 25%" }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col p-5 sm:p-6 md:p-8 lg:pl-2">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 sm:h-14 sm:w-14">
                        <User className="text-gold" size={22} />
                      </div>
                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground sm:text-2xl">
                        Individuálne lekcie
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                        Osobný tréning, kde sa <strong>tréner venuje len tebe</strong>. Jasné vysvetlenia,
                        <strong> presné rady</strong> a cvičenia, ktoré ťa posunú vpred už po <strong>pár lekciách</strong>.
                      </p>

                      <ul className="mt-5 space-y-3">
                        {[
                          "60-minútová súkromná lekcia",
                          "Personalizované cvičenia",
                          "Analýza švihu a okamžitá spätná väzba",
                          "Tréning prispôsobený tvojej úrovni",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/80 text-xs sm:text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CursorGlowCard>

                <CursorGlowCard className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-background/75 transition-all duration-300 hover:border-gold/40 hover:shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-4 sm:p-5 md:p-6 lg:order-2">
                      <div className="aspect-[16/10] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-xl">
                        <img
                          src={serviceGroupImg}
                          alt="Skupinové tréningy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: "center 25%" }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col p-5 sm:p-6 md:p-8 lg:pr-2 lg:order-1">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 sm:h-14 sm:w-14">
                        <Users className="text-gold" size={22} />
                      </div>
                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground sm:text-2xl">
                        Skupinové tréningy
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                        Tréning v <strong>príjemnej skupine</strong>, kde sa učíš spolu s ostatnými. Dynamika,
                        <strong> zdravá motivácia</strong> a praktické cvičenia, ktoré robia každú lekciu
                        <strong> zábavnou aj efektívnou</strong>.
                      </p>

                      <ul className="mt-5 space-y-3">
                        {[
                          "Tréning v malej skupine",
                          "Vzájomná motivácia a dynamika",
                          "Praktické cvičenia a hry",
                          "Výhodnejšia cena za lekciu",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/80 text-xs sm:text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CursorGlowCard>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 sm:mt-14">
                <div className="text-center mb-6 sm:mb-8">
                  <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                    Možnosť zakúpenia
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold text-primary-foreground">
                    Vyber si formát tréningu
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-md sm:max-w-4xl mx-auto items-start pt-4">
                  <ServiceCard
                    title="Individuálna lekcia"
                    price={59.99}
                    icon={User}
                    purchaseUrl="https://buy.stripe.com/dRm8wP5YP5SycrOdRG8so03"
                    features={[
                      "60-minútová súkromná lekcia",
                      "Profesionálny tréner",
                      "Analýza švihu",
                      "Personalizované cvičenia",
                      "Okamžitá spätná väzba",
                    ]}
                  />
                  <ServiceCard
                    title="Skupinový tréning"
                    price={29.99}
                    icon={Users}
                    purchaseUrl="/#kontakt"
                    ctaLabel="Mám záujem"
                    features={[
                      "Tréning v malej skupine",
                      "Profesionálny tréner",
                      "Praktické cvičenia",
                      "Výhodnejšia cena za lekciu",
                      "Skvelá atmosféra",
                    ]}
                  />
                </div>
              </div>
            </Reveal>

            <StepFAQ
              idPrefix="zlepsuj"
              faqs={[
                {
                  q: "Aký je rozdiel medzi individuálnou a skupinovou lekciou?",
                  a: "Pri individuálnej lekcii sa tréner venuje výlučne tebe – tréning je plne prispôsobený tvojej úrovni a cieľom. Skupinový tréning je dynamickejší, lacnejší a ideálny ak ťa baví učiť sa v komunite.",
                },
                {
                  q: "Ako často by som mal trénovať, aby som sa zlepšoval?",
                  a: "Pre viditeľný progres odporúčame aspoň 1 lekciu týždenne v kombinácii so samostatným tréningom na drivingu. Konzistencia je dôležitejšia než dĺžka jedného tréningu.",
                },
                {
                  q: "Môžem si kúpiť balík viacerých lekcií so zľavou?",
                  a: "Áno, ponúkame zvýhodnené balíky 5 a 10 lekcií. Napíš nám na kontaktný formulár a pripravíme ti ponuku na mieru podľa tvojich potrieb.",
                },
              ]}
            />
          </div>
        </section>

        <MilestoneConnector />

        {/* KROK 4 - DOMINUJ V HRE */}
        <section id="dominuj" className="scroll-mt-24 bg-transparent py-6 sm:py-8">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                  Krok 04
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                  Dominuj v hre
                </h2>
                <p className="mt-3 text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                  Najvyšší level prípravy. Tréning priamo na ihrisku s PGA trénerom – stratégia, analýza hry a cesta k najnižšiemu skóre.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="max-w-5xl mx-auto">
                <CursorGlowCard className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-background/75 transition-all duration-300 hover:border-gold/40 hover:shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="aspect-[16/10] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-xl">
                        <img
                          src={serviceCourseImg}
                          alt="Course Management - tréning na ihrisku s PGA trénerom"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: "center 25%" }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col p-5 sm:p-6 md:p-8 lg:pl-2">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 sm:h-14 sm:w-14">
                        <MapPin className="text-gold" size={22} />
                      </div>
                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground sm:text-2xl">
                        Course Management
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                        Tréning s <strong>PGA trénerom</strong> priamo na ihrisku. <strong>Analýza hry</strong>,
                        know-how a odborné poradenstvo s cieľom dosiahnuť tvoje <strong>najnižšie skóre</strong>.
                      </p>

                      <ul className="mt-5 space-y-3">
                        {[
                          "Tréning priamo na golfovom ihrisku",
                          "Strategický výber palíc a úderov",
                          "Analýza tvojho herného štýlu",
                          "Mentálna príprava a rozhodovanie",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/80 text-xs sm:text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CursorGlowCard>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 sm:mt-14">
                <div className="text-center mb-6 sm:mb-8">
                  <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                    Možnosť zakúpenia
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold text-primary-foreground">
                    Rezervuj si Course Management
                  </h3>
                </div>

                <div className="max-w-md mx-auto pt-4">
                  <ServiceCard
                    title="Course Management"
                    price={149.99}
                    icon={MapPin}
                    purchaseUrl="/#kontakt"
                    ctaLabel="Mám záujem"
                    features={[
                      "Tréning priamo na ihrisku",
                      "PGA tréner",
                      "Strategická analýza hry",
                      "Mentálna príprava",
                      "Cesta k najnižšiemu skóre",
                    ]}
                  />
                </div>
              </div>
            </Reveal>

            <StepFAQ
              idPrefix="dominuj"
              faqs={[
                {
                  q: "Pre koho je Course Management vhodný?",
                  a: "Pre hráčov so zelenou kartou, ktorí už ovládajú základy a chcú sa posunúť ďalej – znížiť skóre, lepšie čítať ihrisko a strategicky vyberať údery v reálnych herných situáciách.",
                },
                {
                  q: "Kde tréning prebieha?",
                  a: "Tréning prebieha priamo na golfovom ihrisku (zvyčajne Hrubá Borša alebo Red Oak Nitra). Hráš so svojím PGA trénerom, ktorý ťa sprevádza a analyzuje tvoju hru v reálnom čase.",
                },
                {
                  q: "Sú v cene zahrnuté green fee a ďalšie poplatky?",
                  a: "V cene je zahrnutá lekcia s PGA trénerom. Green fee a prípadný buggy si hráč hradí samostatne – radi ti pomôžeme s rezerváciou aj výberom najvhodnejšieho ihriska.",
                },
              ]}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-transparent pt-12 pb-16 md:pt-16 md:pb-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <CursorGlowCard className="rounded-xl sm:rounded-2xl border border-gold/30 bg-background/75">
                <div className="flex flex-col items-center gap-4 p-6 sm:p-10 text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    Nevieš, čo si vybrať?
                  </h3>
                  <p className="max-w-xl text-sm sm:text-base text-foreground/70">
                    Napíš nám a my ti pomôžeme nájsť ideálny program podľa tvojich cieľov a skúseností.
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      to="/#kontakt"
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-gold/90 hover:scale-105"
                    >
                      Kontaktuj nás
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/sluzby"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-gold hover:text-gold"
                    >
                      Pozri všetky služby
                    </Link>
                  </div>
                </div>
              </CursorGlowCard>
            </Reveal>
          </div>
        </section>
      </AuroraBackground>

      <Footer />
    </>
  );
};

export default StartGolf;
