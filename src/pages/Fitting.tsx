import { Helmet } from "react-helmet-async";
import { Wrench, Ruler, Target, Sparkles, Mail, Phone, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FittingContactForm from "@/components/FittingContactForm";
import CursorGlowCard from "@/components/CursorGlowCard";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import fittingImg from "@/assets/service-fitting.webp";
import fittingHeroImg from "@/assets/fitting-hero.png";
import jakubImg from "@/assets/team/jakub-hrban-fitting.jpg";

const benefits = [
  {
    icon: Ruler,
    title: "Presné meranie",
    description: (
      <>
        Detailná analýza tvojho švihu s <strong>profesionálnym Trackmanom</strong>. Získaš presné dáta o rýchlosti, uhle a trajektórii.
      </>
    ),
  },
  {
    icon: Target,
    title: "Vybavenie šité na mieru",
    description: (
      <>
        Vyberieme palice s <strong>optimálnou dĺžkou, lie uhlom, shaftom a hlavou</strong>, ktoré ti skutočne sedia a zlepšia tvoju hru.
      </>
    ),
  },
  {
    icon: Sparkles,
    title: "Citeľný rozdiel",
    description: (
      <>
        Správne nafitované palice vedia <strong>dramaticky zmeniť tvoju hru</strong> – väčšia presnosť, dlhší dolet a stabilnejší kontakt s loptičkou.
      </>
    ),
  },
  {
    icon: Wrench,
    title: "Profesionálny servis",
    description: (
      <>
        Po fittingu zabezpečíme <strong>kompletnú výrobu palíc</strong>, prípadne úpravu existujúcich – všetko pod jednou strechou.
      </>
    ),
  },
];

const process = [
  "Úvodný rozhovor – tvoj level, ciele a očakávania",
  "Analýza aktuálneho švihu s tvojimi palicami",
  "Testovanie rôznych konfigurácií (hlavy, shafty, gripy)",
  "Vyhodnotenie dát a odporúčanie ideálneho setupu",
  "Objednávka palíc na mieru alebo úprava existujúcich",
];

const faqs = [
  {
    question: "Aké značky fittujete?",
    answer:
      "Fittujeme palice popredných svetových značiek, konkrétne TaylorMade, PXG, PING, Titleist, Callaway a Srixon. Vďaka tejto širokej ponuke vieme zostaviť setup presne podľa tvojich preferencií, štýlu hry a individuálnych potrieb.",
  },
  {
    question: "Kde prebieha fitting golfového vybavenia?",
    answer:
      "Fitting prebieha v našom BSGA Performance Center a tiež v priestoroch obchodu Golf Universe. Obe lokality sú vybavené najmodernejšou technológiou, ktorá zabezpečí presnú analýzu tvojho švihu a optimálne nastavenie palíc.",
  },
  {
    question: "Ako dlho trvá a koľko stojí fitting?",
    answer:
      "Štandardný fitting trvá 120 minút a jeho cena sa pohybuje od 80 € do 150 € v závislosti od rozsahu fittingu a typu palíc, ktoré chceš testovať. V cene je zahrnutá detailná analýza švihu, testovanie rôznych konfigurácií a odborné odporúčanie ideálneho setupu.",
  },
  {
    question: "Čo si mám priniesť na fitting?",
    answer:
      "Na fitting si prines svoje vlastné golfové palice, aby sme ich mohli porovnať s testovanými konfiguráciami. Odporúčame tiež pohodlné športové oblečenie, v akom bežne trénuješ v indoor centre, aby si sa mohol prirodzene a uvoľnene švihať.",
  },
  {
    question: "Ako dlho trvá, kým mi príde nová výbava?",
    answer:
      "Dodanie nových palíc na mieru trvá zvyčajne približne 2 týždne od objednávky. Presný termín závisí od konkrétnej značky, modelu a aktuálnej dostupnosti shaftov a hláv u výrobcu.",
  },
];

const Fitting = () => {
  return (
    <>
      <Helmet>
        <title>Fitting – vybavenie na mieru | BSGA - Best Swing Golf Academy</title>
        <meta
          name="description"
          content="Profesionálny golfový fitting v BSGA. Meranie a testovanie palíc na mieru s Trackmanom. Nájdeme vybavenie, ktoré ti skutočne sedí."
        />
      </Helmet>
      <Navbar />
      <AuroraBackground className="min-h-screen bg-primary text-primary-foreground" showRadialGradient={false}>
        <main>
          {/* Hero */}
          <section className="relative w-full bg-transparent">
            <div className="relative w-full overflow-hidden min-h-[480px] sm:min-h-[580px] md:min-h-[680px]">
              <img
                src={fittingHeroImg}
                alt="BSGA Fitting – Jakub Hrbáň s Trackmanom"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
              />
              <div className="relative z-10 flex h-full min-h-[480px] items-end sm:min-h-[580px] md:min-h-[680px]">
                <div className="container mx-auto px-4 pb-10 pt-16 text-center sm:px-6 sm:pb-14 sm:pt-20 md:pb-16 md:pt-24">
                  <h1 className="text-4xl font-serif font-bold text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                    Fitting – vybavenie na mieru
                  </h1>
                  <p className="mt-4 mx-auto max-w-3xl text-base text-primary-foreground/90 sm:text-lg md:text-xl">
                    Nájdi palice, ktoré ti skutočne sedia. Profesionálne meranie a testovanie s najmodernejšou technológiou.
                  </p>
                  <a
                    href="mailto:jakub@bsga.sk?subject=Záujem o fitting"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-gold-light sm:text-base"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Prihlásiť sa</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="bg-transparent py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-14">
                <span className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase">Prečo fitting</span>
                <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-foreground">
                  Výhody profesionálneho fittingu
                </h2>
                <p className="mt-4 mx-auto max-w-2xl text-primary-foreground/70 sm:text-lg">
                  Správne vybavenie môže urobiť rozdiel medzi frustráciou a radosťou z hry
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <CursorGlowCard
                      key={i}
                      className="group rounded-xl border border-border/60 bg-background/75 p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-xl sm:rounded-2xl sm:p-8"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20 sm:mb-6 sm:h-14 sm:w-14">
                        <Icon className="text-gold" size={22} />
                      </div>
                      <h3 className="mb-2 font-serif text-lg font-bold text-foreground sm:mb-3 sm:text-xl">
                        {b.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                        {b.description}
                      </p>
                    </CursorGlowCard>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="bg-transparent py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div>
                  <span className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase">Ako to prebieha</span>
                  <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-foreground">
                    Proces fittingu krok za krokom
                  </h2>
                  <p className="mt-4 text-primary-foreground/70 sm:text-lg">
                    Celý proces trvá <strong className="text-gold">120 minút</strong> a prebieha v našom Performance Centre v Petržalke.
                  </p>
                  <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                    {process.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-primary font-bold text-sm">
                          {i + 1}
                        </div>
                        <span className="text-primary-foreground/85 text-sm sm:text-base pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="mailto:jakub@bsga.sk?subject=Rezervácia fittingu"
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-gold-light sm:text-base"
                    >
                      <Mail className="w-4 h-4" />
                      Rezervovať fitting
                    </a>
                    <a
                      href="tel:+421911994888"
                      className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-medium text-gold transition-all duration-300 hover:bg-gold/20 sm:text-base"
                    >
                      <Phone className="w-4 h-4" />
                      +421 911 994 888
                    </a>
                  </div>
                </div>
                <div className="relative group">
                  {/* Decorative gold glow */}
                  <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold/30 via-gold/10 to-transparent blur-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Decorative gold corner frames */}
                  <div className="pointer-events-none absolute -top-3 -left-3 h-16 w-16 border-t-2 border-l-2 border-gold rounded-tl-3xl" />
                  <div className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-gold rounded-br-3xl" />

                  {/* Image card */}
                  <div className="relative overflow-hidden rounded-2xl border border-gold/30 shadow-2xl sm:rounded-3xl ring-1 ring-gold/10">
                    <img
                      src={fittingImg}
                      alt="Proces golfového fittingu"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    {/* Subtle bottom gradient for badge contrast */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Trackman tag */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground border border-gold/30">
                      <Sparkles className="h-3.5 w-3.5 text-gold" />
                      Trackman technológia
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 bg-gold text-primary rounded-2xl px-5 py-3 sm:px-6 sm:py-4 shadow-2xl ring-4 ring-background/40 transition-transform duration-300 group-hover:scale-105">
                    <div className="text-2xl sm:text-3xl font-serif font-bold leading-none">120 min</div>
                    <div className="text-xs sm:text-sm font-medium mt-1">jeden fitting</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust block */}
          <section className="bg-transparent pb-16 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-white sm:rounded-3xl shadow-2xl">
                <div className="grid gap-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  {/* Foto */}
                  <div className="relative h-80 sm:h-[28rem] md:h-auto md:min-h-[460px] bg-white">
                    <img
                      src={jakubImg}
                      alt="Jakub Hrbáň – špecialista na fitting v BSGA"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 left-4 right-4 md:hidden">
                      <div className="inline-flex items-center gap-2 rounded-full bg-gold/95 px-3 py-1 text-xs font-medium text-primary">
                        <Award className="h-3.5 w-3.5" />
                        Špecialista na fitting
                      </div>
                    </div>
                  </div>

                  {/* Obsah */}
                  <div className="flex flex-col justify-center bg-white p-6 sm:p-10 md:p-12">
                    <span className="hidden md:inline-flex items-center gap-2 self-start rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
                      <Award className="h-3.5 w-3.5" />
                      Špecialista na fitting v BSGA
                    </span>
                    <h3 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">
                      Jakub Hrbáň
                    </h3>
                    <p className="mt-1 text-sm text-gold sm:text-base">
                      Hlavný tréner CTM Hrubá Borša
                    </p>
                    <p className="mt-4 text-neutral-700 sm:text-lg leading-relaxed">
                      Držiteľ licencie <strong>„B" Five Star Golf Academy</strong>, sa špecializuje na fitting golfových palíc. Pomôže ti nájsť vybavenie, ktoré perfektne sedí tvojej hre.
                    </p>

                    {/* Kontaktné buttony */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href="mailto:jakub@bsga.sk?subject=Fitting – konzultácia"
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-gold-light"
                      >
                        <Mail className="h-4 w-4" />
                        jakub@bsga.sk
                      </a>
                      <a
                        href="tel:+421911994888"
                        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition-all duration-300 hover:bg-gold/20"
                      >
                        <Phone className="h-4 w-4" />
                        +421 911 994 888
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-transparent pb-16 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-foreground">
                  Časté otázky
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`fitting-faq-${index}`}
                      className="bg-white rounded-lg sm:rounded-xl border border-border/60 px-4 sm:px-6 data-[state=open]:border-gold/40 shadow-sm"
                    >
                      <AccordionTrigger className="text-left font-medium text-neutral-900 hover:text-gold py-4 sm:py-6 hover:no-underline text-sm sm:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-700 pb-4 sm:pb-6 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          <FittingContactForm />
        </main>
      </AuroraBackground>
      <Footer />
    </>
  );
};

export default Fitting;
