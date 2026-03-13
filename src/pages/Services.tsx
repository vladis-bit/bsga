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
    description: (
      <>Osobný tréning, kde sa <strong>tréner venuje len tebe</strong>. Jasné vysvetlenia, <strong>presné rady</strong> a cvičenia, ktoré ťa posunú vpred už po <strong>pár lekciách</strong>.</>
    ),
  },
  {
    icon: Users,
    title: "Skupinové lekcie",
    description: (
      <>Tréning v <strong>príjemnej skupine</strong>, kde sa učíš spolu s ostatnými. Dynamika, <strong>zdravá motivácia</strong> a praktické cvičenia, ktoré robia každú lekciu <strong>zábavnou aj efektívnou</strong>.</>
    ),
  },
  {
    icon: GraduationCap,
    title: "Štart karty",
    description: (
      <>Ideálny program pre <strong>úplných začiatočníkov</strong>. Získaš <strong>pevné základy</strong>, pochopíš, ako golf funguje, a vytvoríš si istotu ešte pred <strong>vstupom na ihrisko</strong>.</>
    ),
  },
  {
    icon: Award,
    title: "Zelené karty",
    description: (
      <>Kompletný kurz, ktorý ťa pripraví na <strong>samostatnú hru</strong>. Technika, pravidlá, etika a <strong>záverečný test</strong> – po absolvovaní máš <strong>oficiálnu spôsobilosť</strong> hrať na ihriskách.</>
    ),
  },
  {
    icon: Baby,
    title: "Detská akadémia",
    description: (
      <>Tréningy pre deti, ktoré spájajú <strong>pohyb, hravosť</strong> a systematický <strong>rozvoj techniky</strong>. Super prostredie, nové kamarátstva a tréningy, na ktoré sa <strong>deti tešia</strong>.</>
    ),
  },
  {
    icon: Tent,
    title: "Detské kempy",
    description: (
      <>Týždne <strong>plné golfu a zážitkov</strong>. Každý deň prináša šport, hry a aktivity, ktoré udržia deti <strong>v pohybe</strong> a zlepšia ich <strong>golfové schopnosti</strong>.</>
    ),
  },
  {
    icon: Building2,
    title: "Firemné akcie a teambuildingy",
    description: (
      <>Príjemná kombinácia <strong>golfu, zábavy a spolupráce</strong>. Vhodné pre firmy, ktoré chcú zažiť niečo nové a podporiť <strong>tímového ducha</strong> v uvoľnenej atmosfére.</>
    ),
  },
  {
    icon: Trophy,
    title: "Turnaje – BSGA Tour",
    description: (
      <>Séria turnajov, kde môžeš <strong>otestovať svoju formu</strong>, zbierať body a súťažiť s hráčmi podobnej úrovne. Príjemná atmosféra a <strong>profesionálna organizácia</strong>.</>
    ),
  },
  {
    icon: Wrench,
    title: "Fitting – vybavenie na mieru",
    description: (
      <>Merania a <strong>testovanie palíc</strong>, aby si našiel vybavenie, ktoré ti skutočne sedí. <strong>Správny výber</strong> dokáže urobiť <strong>citeľný rozdiel</strong> v tvojej hre.</>
    ),
  },
  {
    icon: Calendar,
    title: "Eventy, teambuildingy a golfové pobyty",
    description: (
      <>Golfové akcie a <strong>eventy na mieru</strong>. Ponúkame jednodňové akcie až po kompletné <strong>sústredenia s PGA trénermi</strong>. Záruka spokojnosti. Všetko zabezpečené tak, aby ste si to <strong>naplno užili</strong>.</>
    ),
  },
  {
    icon: MapPin,
    title: "Course Management",
    description: (
      <>Tréning s <strong>PGA trénerom</strong> na ihrisku. <strong>Analýza hry</strong>, know-how a odborné poradenstvo za cieľom dosiahnutia <strong>najnižšieho skóre</strong>.</>
    ),
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

          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
};

export default Services;
