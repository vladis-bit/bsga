import { Helmet } from "react-helmet-async";
import { Wrench, Ruler, Target, Sparkles, CheckCircle2, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import CursorGlowCard from "@/components/CursorGlowCard";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useTranslateLang } from "@/components/GoogleTranslate";
import fittingImg from "@/assets/service-fitting.webp";

const benefits = [
  {
    icon: Ruler,
    title: "Presné meranie",
    description: (
      <>
        Detailná analýza tvojho švihu s <strong>profesionálnymi nástrojmi</strong> ako Trackman a Flightscope. Získaš presné dáta o rýchlosti, uhle a trajektórii.
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

const Fitting = () => {
  const lang = useTranslateLang();

  return (
    <>
      <Helmet>
        <title>Fitting – vybavenie na mieru | BSGA - Best Swing Golf Academy</title>
        <meta
          name="description"
          content="Profesionálny golfový fitting v BSGA. Meranie a testovanie palíc na mieru s Trackmanom a Flightscopom. Nájdeme vybavenie, ktoré ti skutočne sedí."
        />
      </Helmet>
      <Navbar />
      <AuroraBackground className="min-h-screen bg-primary text-primary-foreground" showRadialGradient={false}>
        <main>
          {/* Hero */}
          <section className="relative w-full bg-transparent pt-20 sm:pt-24">
            <div className="relative w-full overflow-hidden min-h-[420px] sm:min-h-[520px] md:min-h-[600px]">
              <img
                src={fittingImg}
                alt="BSGA Fitting – vybavenie na mieru"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
              <div className="relative z-10 flex h-full min-h-[420px] items-end sm:min-h-[520px] md:min-h-[600px]">
                <div className="container mx-auto px-4 pb-10 pt-16 text-center sm:px-6 sm:pb-14 sm:pt-20 md:pb-16 md:pt-24">
                  <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                    Služba BSGA
                  </span>
                  <h1 className="mt-3 text-4xl font-serif font-bold text-primary-foreground sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl">
                    Fitting – vybavenie na mieru
                  </h1>
                  <p className="mt-4 mx-auto max-w-3xl text-base text-primary-foreground/90 sm:text-lg md:text-xl">
                    Nájdi palice, ktoré ti skutočne sedia. Profesionálne meranie a testovanie s najmodernejšou technológiou.
                  </p>
                  <a
                    href="mailto:info@bsga.sk?subject=Záujem o fitting"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-gold-light sm:text-base"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="notranslate">{lang === "en" ? "Sign up" : "Prihlásiť sa"}</span>
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
                    Celý proces trvá približne <strong className="text-gold">90 minút</strong> a prebieha v našom Performance Centre v Petržalke.
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
                      href="mailto:info@bsga.sk?subject=Rezervácia fittingu"
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-gold-light sm:text-base"
                    >
                      <Mail className="w-4 h-4" />
                      Rezervovať fitting
                    </a>
                    <a
                      href="tel:+421917225276"
                      className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-medium text-gold transition-all duration-300 hover:bg-gold/20 sm:text-base"
                    >
                      <Phone className="w-4 h-4" />
                      +421 917 225 276
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl border border-border/60 shadow-2xl sm:rounded-3xl">
                    <img
                      src={fittingImg}
                      alt="Proces golfového fittingu"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-gold text-primary rounded-2xl px-5 py-3 sm:px-6 sm:py-4 shadow-xl">
                    <div className="text-2xl sm:text-3xl font-serif font-bold">90 min</div>
                    <div className="text-xs sm:text-sm font-medium">jeden fitting</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust block */}
          <section className="bg-transparent pb-16 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="rounded-2xl border border-border/60 bg-background/75 p-6 sm:p-10 md:p-12 text-center sm:rounded-3xl">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 sm:mb-6 sm:h-16 sm:w-16">
                  <CheckCircle2 className="text-gold" size={28} />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Špecialista na fitting v BSGA
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-foreground/75 sm:mt-4 sm:text-lg">
                  Náš tréner <strong>Jakub Hrbáň</strong> – hlavný tréner CTM v Hrubej Borši a držiteľ licencie „B" Five Star Golf Academy – sa špecializuje na fitting golfových palíc.
                </p>
              </div>
            </div>
          </section>

          <ContactForm />
        </main>
      </AuroraBackground>
      <Footer />
    </>
  );
};

export default Fitting;
