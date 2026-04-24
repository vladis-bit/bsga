import { Helmet } from "react-helmet-async";
import { Wrench, Ruler, Target, Sparkles, Mail, Phone, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import CursorGlowCard from "@/components/CursorGlowCard";
import { AuroraBackground } from "@/components/ui/aurora-background";
import fittingImg from "@/assets/service-fitting.webp";
import jakubImg from "@/assets/team/jakub-hrban.jpg";

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
                    Celý proces trvá približne <strong className="text-gold">120 minút</strong> a prebieha v našom Performance Centre v Petržalke.
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
                    <div className="text-2xl sm:text-3xl font-serif font-bold">120 min</div>
                    <div className="text-xs sm:text-sm font-medium">jeden fitting</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust block */}
          <section className="bg-transparent pb-16 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/80 sm:rounded-3xl shadow-2xl">
                <div className="grid gap-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  {/* Foto */}
                  <div className="relative h-72 sm:h-96 md:h-auto md:min-h-[420px]">
                    <img
                      src={jakubImg}
                      alt="Jakub Hrbáň – špecialista na fitting v BSGA"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background/40" />
                    <div className="absolute bottom-4 left-4 right-4 md:hidden">
                      <div className="inline-flex items-center gap-2 rounded-full bg-gold/95 px-3 py-1 text-xs font-medium text-primary">
                        <Award className="h-3.5 w-3.5" />
                        Špecialista na fitting
                      </div>
                    </div>
                  </div>

                  {/* Obsah */}
                  <div className="flex flex-col justify-center p-6 sm:p-10 md:p-12">
                    <span className="hidden md:inline-flex items-center gap-2 self-start rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
                      <Award className="h-3.5 w-3.5" />
                      Špecialista na fitting v BSGA
                    </span>
                    <h3 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                      Jakub Hrbáň
                    </h3>
                    <p className="mt-1 text-sm text-gold sm:text-base">
                      Hlavný tréner CTM Hrubá Borša
                    </p>
                    <p className="mt-4 text-foreground/80 sm:text-lg leading-relaxed">
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

          <ContactForm />
        </main>
      </AuroraBackground>
      <Footer />
    </>
  );
};

export default Fitting;
