import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import CursorGlowCard from "@/components/CursorGlowCard";
import DottedSurface from "@/components/DottedSurface";
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
} from "lucide-react";

const services = [
  {
    icon: User,
    title: "Individuálne lekcie",
    description:
      "Osobný tréning, kde sa tréner venuje len tebe. Jasné vysvetlenia, presné rady a cvičenia, ktoré ťa posunú vpred už po pár lekciách.",
  },
  {
    icon: Users,
    title: "Skupinové lekcie",
    description:
      "Tréning v príjemnej skupine, kde sa učíš spolu s ostatnými. Dynamika, zdravá motivácia a praktické cvičenia, ktoré robia každú lekciu zábavnou aj efektívnou.",
  },
  {
    icon: GraduationCap,
    title: "Štart karty",
    description:
      "Ideálny program pre úplných začiatočníkov. Získaš pevné základy, pochopíš, ako golf funguje, a vytvoríš si istotu ešte pred vstupom na ihrisko.",
  },
  {
    icon: Award,
    title: "Zelené karty",
    description:
      "Kompletný kurz, ktorý ťa pripraví na samostatnú hru. Technika, pravidlá, etika a záverečný test – po absolvovaní máš oficiálnu spôsobilosť hrať na ihriskách.",
  },
  {
    icon: Baby,
    title: "Detská akadémia",
    description:
      "Tréningy pre deti, ktoré spájajú pohyb, hravosť a systematický rozvoj techniky. Super prostredie, nové kamarátstva a tréningy, na ktoré sa deti tešia.",
  },
  {
    icon: Tent,
    title: "Detské kempy",
    description:
      "Týždne plné golfu a zážitkov. Každý deň prináša šport, hry a aktivity, ktoré udržia deti v pohybe a zlepšia ich golfové schopnosti.",
  },
  {
    icon: Building2,
    title: "Firemné akcie a teambuildingy",
    description:
      "Príjemná kombinácia golfu, zábavy a spolupráce. Vhodné pre firmy, ktoré chcú zažiť niečo nové a podporiť tímového ducha v uvoľnenej atmosfére.",
  },
  {
    icon: Trophy,
    title: "Turnaje – BSGA Tour",
    description:
      "Séria turnajov, kde môžeš otestovať svoju formu, zbierať body a súťažiť s hráčmi podobnej úrovne. Príjemná atmosféra a profesionálna organizácia.",
  },
  {
    icon: Wrench,
    title: "Fitting – vybavenie na mieru",
    description:
      "Merania a testovanie palíc, aby si našiel vybavenie, ktoré ti skutočne sedí. Správny výber dokáže urobiť citeľný rozdiel v tvojej hre.",
  },
  {
    icon: Calendar,
    title: "Eventy, teambuildingy a golfové pobyty",
    description:
      "Golfové akcie a eventy na mieru. Ponúkame jednodňové akcie až po kompletné sústredenia s PGA trénermi. Záruka spokojnosti. Všetko zabezpečené tak, aby ste si to naplno užili.",
  },
  {
    icon: MapPin,
    title: "Course Management",
    description:
      "Tréning s PGA trénerom na ihrisku. Analýza hry, know-how a odborné poradenstvo za cieľom dosiahnutia najnižšieho skóre.",
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Služby | BSGA - Best Swing Golf Academy</title>
        <meta
          name="description"
          content="Kompletné golfové služby - individuálne a skupinové lekcie, zelené karty, detská akadémia, firemné akcie, turnaje BSGA Tour a fitting na mieru."
        />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative w-full bg-background pt-4 sm:pt-8">
          <div className="px-2 sm:px-4 md:px-8">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-primary py-16 sm:py-24 md:py-32">
              {/* Dotted Surface Animation Background */}
              <DottedSurface />
              <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  Služby
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
                  Čo ponúkame
                </h1>
                <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto px-2">
                  10 profesionálnych služieb pre každého golfistu
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <CursorGlowCard
                    key={index}
                    className="group rounded-xl sm:rounded-2xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="p-5 sm:p-6 md:p-8">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gold/20 transition-colors">
                        <Icon className="text-gold" size={22} />
                      </div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2 sm:mb-4">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </CursorGlowCard>
                );
              })}
            </div>

            <div className="text-center mt-10 sm:mt-12 md:mt-16">
              <Link
                to="/#kontakt"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gold text-primary text-sm sm:text-base font-medium rounded-full hover:bg-gold-light transition-all duration-300"
              >
                Mám záujem o službu
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
