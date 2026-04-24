import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { GraduationCap, Award, Check, ArrowRight, Flag, User, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import CursorGlowCard from "@/components/CursorGlowCard";
import ServiceCard from "@/components/shop/ServiceCard";
import serviceStartCardsImg from "@/assets/service-start-cards.jpg";
import serviceGreenCardsImg from "@/assets/service-green-cards.jpg";
import serviceIndividualImg from "@/assets/service-individual.jpg";

const StartGolf = () => {
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
                Pre začiatočníkov
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Začni s golfom
              </h1>
              <p className="max-w-2xl text-sm sm:text-base md:text-lg text-primary-foreground/70 px-2">
                Tvoja cesta od prvého švihu k samostatnej hre na ihrisku.
                Vyber si program, ktorý ti sadne, a kúp si kurz online.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={() => scrollToSection("vikendovy-kurz")}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary hover:scale-105"
                >
                  <Flag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Víkendový kurz
                </button>
                <button
                  onClick={() => scrollToSection("zelena-karta")}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary hover:scale-105"
                >
                  <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Zelená karta
                </button>
                <button
                  onClick={() => scrollToSection("zlepsuj-sa")}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary hover:scale-105"
                >
                  <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Zlepšuj sa
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* KROK 1 - VÍKENDOVÝ KURZ */}
        <section id="vikendovy-kurz" className="scroll-mt-24 bg-transparent pb-12 pt-6 sm:pb-16 sm:pt-8 md:pb-20 md:pt-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                Krok 1
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                Víkendový kurz zelenej karty
              </h2>
              <p className="mt-3 text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                Tvoje prvé stretnutie s golfom v intenzívnom víkendovom formáte. Pevné základy a istota pred vstupom na ihrisko.
              </p>
            </div>

            {/* Popis služby */}
            <div className="max-w-5xl mx-auto">
              <CursorGlowCard className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-background/75 transition-all duration-300 hover:border-gold/40 hover:shadow-xl">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="aspect-[16/10] md:aspect-auto md:h-full w-full overflow-hidden rounded-xl">
                      <img
                        src={serviceStartCardsImg}
                        alt="Víkendový kurz zelenej karty"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: "center 25%" }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col p-5 sm:p-6 md:p-8 md:pl-2">
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

            {/* Možnosť zakúpenia */}
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
          </div>
        </section>

        {/* KROK 2 - ZELENÁ KARTA */}
        <section id="zelena-karta" className="scroll-mt-24 bg-transparent py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                Krok 2
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                Zelená karta
              </h2>
              <p className="mt-3 text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                Kompletná príprava na samostatnú hru. Po absolvovaní máš oficiálnu spôsobilosť hrať na ihriskách.
              </p>
            </div>

            {/* Popis služby */}
            <div className="max-w-5xl mx-auto">
              <CursorGlowCard className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-background/75 transition-all duration-300 hover:border-gold/40 hover:shadow-xl">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="aspect-[16/10] md:aspect-auto md:h-full w-full overflow-hidden rounded-xl">
                      <img
                        src={serviceGreenCardsImg}
                        alt="Zelená karta - kurz pre samostatnú hru"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: "center 25%" }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col p-5 sm:p-6 md:p-8 md:pl-2">
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

            {/* Možnosť zakúpenia */}
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
          </div>
        </section>

        {/* KROK 3 - ZLEPŠUJ SA */}
        <section id="zlepsuj-sa" className="scroll-mt-24 bg-transparent py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                Krok 3
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                Zlepšuj sa v golfe
              </h2>
              <p className="mt-3 text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                Posuň svoju hru na ďalšiu úroveň s individuálnymi lekciami pod vedením profesionálneho trénera.
              </p>
            </div>

            {/* Popis služby */}
            <div className="max-w-5xl mx-auto">
              <CursorGlowCard className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-background/75 transition-all duration-300 hover:border-gold/40 hover:shadow-xl">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="aspect-[16/10] md:aspect-auto md:h-full w-full overflow-hidden rounded-xl">
                      <img
                        src={serviceIndividualImg}
                        alt="Individuálne lekcie - zlepšuj sa v golfe"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: "center 25%" }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col p-5 sm:p-6 md:p-8 md:pl-2">
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
            </div>

            {/* Možnosť zakúpenia */}
            <div className="mt-10 sm:mt-14">
              <div className="text-center mb-6 sm:mb-8">
                <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                  Možnosť zakúpenia
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-primary-foreground">
                  Kúp si individuálnu lekciu
                </h3>
              </div>

              <div className="max-w-md mx-auto pt-4">
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
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-transparent pb-16 md:pb-24">
          <div className="container mx-auto px-4 max-w-4xl">
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
          </div>
        </section>
      </AuroraBackground>

      <Footer />
    </>
  );
};

export default StartGolf;
