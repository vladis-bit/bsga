import { Sparkles, Mail, Phone, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FittingContactForm from "@/components/FittingContactForm";
import CursorGlowCard from "@/components/CursorGlowCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import fittingImgAsset from "@/assets/service-fitting.webp.asset.json";
const fittingImg = fittingImgAsset.url;
import fittingHeroImg from "@/assets/fitting-hero.png.asset.json";
import jakubImg from "@/assets/team/jakub-hrban-fitting.webp";

const benefits = [
  {
    title: "Presné meranie",
    description: (
      <>
        Detailná analýza vášho švihu s <strong>profesionálnym Trackmanom</strong>. Získate presné dáta o rýchlosti, uhle a trajektórii.
      </>
    ),
  },
  {
    title: "Vybavenie šité na mieru",
    description: (
      <>
        Vyberieme palice s <strong>optimálnou dĺžkou, lie uhlom, shaftom a hlavou</strong>, ktoré vám skutočne sedia a zlepšia vašu hru.
      </>
    ),
  },
  {
    title: "Citeľný rozdiel",
    description: (
      <>
        Správne nafitované palice vedia <strong>dramaticky zmeniť vašu hru</strong> – väčšia presnosť, dlhší dolet a stabilnejší kontakt s loptičkou.
      </>
    ),
  },
  {
    title: "Profesionálny servis",
    description: (
      <>
        Po fittingu zabezpečíme <strong>kompletnú výrobu palíc</strong>, prípadne úpravu existujúcich – všetko pod jednou strechou.
      </>
    ),
  },
];

const process = [
  "Úvodný rozhovor – váš level, ciele a očakávania",
  "Analýza aktuálneho švihu s vašimi palicami",
  "Testovanie rôznych konfigurácií (hlavy, shafty, gripy)",
  "Vyhodnotenie dát a odporúčanie ideálneho setupu",
  "Objednávka palíc na mieru alebo úprava existujúcich",
];

const faqs = [
  {
    question: "Aké značky fittujete?",
    answer:
      "Fittujeme palice popredných svetových značiek, konkrétne TaylorMade, PXG, PING, Titleist, Callaway a Srixon. Vďaka tejto širokej ponuke vieme zostaviť setup presne podľa vašich preferencií, štýlu hry a individuálnych potrieb.",
  },
  {
    question: "Kde prebieha fitting golfového vybavenia?",
    answer:
      "Fitting prebieha v našom BSGA Performance Center a tiež v priestoroch obchodu Golf Universe. Obe lokality sú vybavené najmodernejšou technológiou, ktorá zabezpečí presnú analýzu vášho švihu a optimálne nastavenie palíc.",
  },
  {
    question: "Ako dlho trvá a koľko stojí fitting?",
    answer:
      "Štandardný fitting trvá 120 minút a jeho cena sa pohybuje od 80 € do 150 € v závislosti od rozsahu fittingu a typu palíc, ktoré chcete testovať. V cene je zahrnutá detailná analýza švihu, testovanie rôznych konfigurácií a odborné odporúčanie ideálneho setupu.",
  },
  {
    question: "Čo si mám priniesť na fitting?",
    answer:
      "Na fitting si prineste svoje vlastné golfové palice, aby sme ich mohli porovnať s testovanými konfiguráciami. Odporúčame tiež pohodlné športové oblečenie, v akom bežne trénujete v indoor centre, aby ste sa mohli prirodzene a uvoľnene švihať.",
  },
  {
    question: "Ako dlho trvá, kým mi príde nová výbava?",
    answer:
      "Dodanie nových palíc na mieru trvá zvyčajne približne 2 týždne od objednávky. Presný termín závisí od konkrétnej značky, modelu a aktuálnej dostupnosti shaftov a hláv u výrobcu.",
  },
];

const Fitting = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Golfový fitting na mieru",
    serviceType: "Golf club fitting",
    url: "https://bsga.sk/fitting",
    description:
      "Profesionálny golfový fitting s TrackManom – meranie švihu, výber shaftu, hlavy, dĺžky a lie uhla palíc na mieru.",
    provider: { "@id": "https://bsga.sk/#organization" },
    areaServed: { "@type": "Country", name: "Slovensko" },
    audience: { "@type": "Audience", audienceType: "Golfisti všetkých úrovní" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://bsga.sk/fitting",
      servicePhone: "+421911994888",
    },
  };
  return (
    <>
      <SEO
        title="Fitting – vybavenie na mieru | BSGA - Best Swing Golf Academy"
        description="Profesionálny golfový fitting v BSGA. Meranie a testovanie palíc na mieru s Trackmanom. Nájdeme vybavenie, ktoré vám skutočne sedí."
        path="/fitting"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Fitting", url: "https://bsga.sk/fitting" },
        ]}
        jsonLd={[serviceJsonLd, faqJsonLd]}
      />
      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main>
          {/* Hero */}
          <section className="relative w-full bg-background px-0 pt-20 sm:px-4 sm:pt-24 md:px-6">
            <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-3xl min-h-[480px] sm:min-h-[580px] md:min-h-[680px]">
              <img
                src={fittingHeroImg.url}
                alt="BSGA Fitting – Jakub Hrbáň s Trackmanom"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
                {...({ fetchpriority: "high" } as any)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
              <div className="relative z-10 flex h-full min-h-[480px] items-end sm:min-h-[580px] md:min-h-[680px]">
                <div className="container mx-auto px-4 pb-10 pt-16 text-center sm:px-6 sm:pb-14 sm:pt-20 md:pb-16 md:pt-24">
                  <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                    <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                    Trackman fitting
                    <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                  </span>
                  <h1 className="mt-5 text-balance font-serif text-4xl font-bold leading-[1.08] text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                    Fitting – vybavenie na mieru
                  </h1>
                  <p className="mt-6 mx-auto max-w-3xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg md:text-xl">
                    Nájdite palice, ktoré vám skutočne sedia. Profesionálne meranie a testovanie s najmodernejšou technológiou.
                  </p>
                  <a
                    href="mailto:jakub@bsga.sk?subject=Záujem o fitting"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-bold text-primary transition-colors duration-300 hover:bg-primary-foreground hover:text-primary"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Prihlásiť sa</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="bg-background py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    Výhody profesionálneho fittingu
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Prečo fitting</p>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
                  Správne vybavenie môže urobiť rozdiel medzi frustráciou a radosťou z hry
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {benefits.map((b, i) => {
                  return (
                    <CursorGlowCard
                      key={i}
                      className="group flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-gold/50 sm:p-8"
                    >
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
          <section className="bg-background py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div>
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Ako to prebieha</span>
                  <h2 className="mt-3 font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
                    Proces fittingu krok za krokom
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
                    Celý proces trvá <strong className="text-gold">120 minút</strong> a prebieha v našom Performance Centre v Petržalke.
                  </p>
                  <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                    {process.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-primary font-bold text-sm">
                          {i + 1}
                        </div>
                        <span className="pt-0.5 text-sm text-foreground/80 sm:text-base">{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="mailto:jakub@bsga.sk?subject=Rezervácia fittingu"
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-primary transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground"
                    >
                      <Mail className="w-4 h-4" />
                      Rezervovať fitting
                    </a>
                    <a
                      href="tel:+421911994888"
                      className="inline-flex items-center gap-2 rounded-full border border-foreground px-8 py-3.5 text-sm font-bold text-foreground transition-colors duration-300 hover:bg-muted"
                    >
                      <Phone className="w-4 h-4" />
                      +421 911 994 888
                    </a>
                  </div>
                </div>
                <div className="relative group">
                  {/* Image card */}
                  <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
                    <img
                      src={fittingImg}
                      alt="Proces golfového fittingu"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    {/* Subtle bottom gradient for badge contrast */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Trackman tag */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground backdrop-blur">
                      <Sparkles className="h-3.5 w-3.5 text-gold" />
                      Trackman technológia
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-5 -right-2 sm:-bottom-6 sm:-right-4 rounded-2xl bg-gold px-5 py-3 text-primary ring-4 ring-background transition-transform duration-300 group-hover:scale-105 sm:px-6 sm:py-4">
                    <div className="text-2xl sm:text-3xl font-serif font-bold leading-none">120 min</div>
                    <div className="text-xs sm:text-sm font-medium mt-1">jeden fitting</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust block */}
          <section className="bg-background pb-16 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <div className="grid gap-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  {/* Foto */}
                  <div className="relative h-80 bg-muted sm:h-[28rem] md:h-auto md:min-h-[460px]">
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
                  <div className="flex flex-col justify-center bg-card p-6 sm:p-10 md:p-12">
                    <span className="hidden md:inline-flex items-center gap-2 self-start rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-gold">
                      <Award className="h-3.5 w-3.5" />
                      Špecialista na fitting v BSGA
                    </span>
                    <h3 className="mt-3 font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                      Jakub Hrbáň
                    </h3>
                    <p className="mt-1 text-sm text-gold sm:text-base">
                      Hlavný tréner CTM Hrubá Borša
                    </p>
                    <p className="mt-4 leading-relaxed text-foreground/70 sm:text-lg">
                      Držiteľ licencie <strong>„B" Five Star Golf Academy</strong>, sa špecializuje na fitting golfových palíc. Pomôže vám nájsť vybavenie, ktoré perfektne sedí vašej hre.
                    </p>

                    {/* Kontaktné buttony */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href="mailto:jakub@bsga.sk?subject=Fitting – konzultácia"
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-primary transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground"
                      >
                        <Mail className="h-4 w-4" />
                        jakub@bsga.sk
                      </a>
                      <a
                        href="tel:+421911994888"
                        className="inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm font-bold text-foreground transition-colors duration-300 hover:bg-muted"
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
          <section className="bg-background pb-16 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 border-b border-border pb-6">
                <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                  Časté otázky
                </h2>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`fitting-faq-${index}`}
                      className="rounded-2xl border border-border bg-card px-4 data-[state=open]:border-gold/50 sm:px-6"
                    >
                      <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:text-gold hover:no-underline sm:py-6 sm:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm leading-relaxed text-foreground/70 sm:pb-6 sm:text-base">
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
      </div>
      <Footer />
    </>
  );
};

export default Fitting;
