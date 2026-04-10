import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import CursorGlowCard from "@/components/CursorGlowCard";
import { AuroraBackground } from "@/components/ui/aurora-background";
import serviceTourImg from "@/assets/service-tour.jpg";
import serviceFittingImg from "@/assets/service-fitting.webp";
import serviceCourseImg from "@/assets/service-course-management.png";
import serviceIndividualImg from "@/assets/service-individual.jpg";
import serviceStartCardsImg from "@/assets/service-start-cards.jpg";
import serviceKidsAcademyImg from "@/assets/service-kids-academy.jpg";
import serviceKidsCampsImg from "@/assets/service-kids-camps.jpg";
import serviceCorporateImg from "@/assets/service-corporate.jpg";
import servicePerformanceImg from "@/assets/service-performance.webp";
import serviceGreenCardsImg from "@/assets/service-green-cards.jpg";
import serviceEventsImg from "@/assets/service-events.jpg";
import serviceGroupImg from "@/assets/service-group.jpg";
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
} from "lucide-react";

const services = [
  {
    icon: User,
    title: "Individuálne lekcie",
    image: serviceIndividualImg,
    description: (
      <>
        Osobný tréning, kde sa <strong>tréner venuje len tebe</strong>. Jasné vysvetlenia, <strong>presné rady</strong> a cvičenia, ktoré ťa posunú vpred už po <strong>pár lekciách</strong>.
      </>
    ),
  },
  {
    icon: Users,
    title: "Skupinové lekcie",
    image: serviceGroupImg,
    description: (
      <>
        Tréning v <strong>príjemnej skupine</strong>, kde sa učíš spolu s ostatnými. Dynamika, <strong>zdravá motivácia</strong> a praktické cvičenia, ktoré robia každú lekciu <strong>zábavnou aj efektívnou</strong>.
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: "Štart karty",
    image: serviceStartCardsImg,
    description: (
      <>
        Ideálny program pre <strong>úplných začiatočníkov</strong>. Získaš <strong>pevné základy</strong>, pochopíš, ako golf funguje, a vytvoríš si istotu ešte pred <strong>vstupom na ihrisko</strong>.
      </>
    ),
  },
  {
    icon: Award,
    title: "Zelené karty",
    image: serviceGreenCardsImg,
    description: (
      <>
        Kompletný kurz, ktorý ťa pripraví na <strong>samostatnú hru</strong>. Technika, pravidlá, etika a <strong>záverečný test</strong> – po absolvovaní máš <strong>oficiálnu spôsobilosť</strong> hrať na ihriskách.
      </>
    ),
  },
  {
    icon: Baby,
    title: "Detská akadémia",
    image: serviceKidsAcademyImg,
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
    description: (
      <>
        Séria turnajov, kde môžeš <strong>otestovať svoju formu</strong>, zbierať body a súťažiť s hráčmi podobnej úrovne. Príjemná atmosféra a <strong>profesionálna organizácia</strong>.
      </>
    ),
  },
  {
    icon: Wrench,
    title: "Fitting – vybavenie na mieru",
    image: serviceFittingImg,
    description: (
      <>
        Merania a <strong>testovanie palíc</strong>, aby si našiel vybavenie, ktoré ti skutočne sedí. <strong>Správny výber</strong> dokáže urobiť <strong>citeľný rozdiel</strong> v tvojej hre.
      </>
    ),
  },
  {
    icon: Calendar,
    title: "Eventy, teambuildingy a golfové pobyty",
    image: serviceEventsImg,
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
    description: (
      <>
        Tréningové centrum počas <strong>zimných mesiacov</strong> s <strong>Trackmanom</strong> a <strong>Flightscopom</strong> priamo v <strong>Petržalke</strong>.
      </>
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
      <AuroraBackground className="min-h-screen bg-primary text-primary-foreground" showRadialGradient={false}>
        <main>
          <section className="bg-transparent pb-8 pt-28 md:pt-32">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                  Služby
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Čo ponúkame
                </h1>
                <p className="max-w-2xl text-primary-foreground/70 sm:text-lg">
                  12 profesionálnych služieb pre každého golfistu
                </p>
              </div>
            </div>
          </section>

          <section className="bg-transparent pb-16 pt-8 md:pb-24 md:pt-10">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                      <CursorGlowCard
                        key={index}
                        className="group overflow-hidden rounded-xl border border-border/60 bg-background/75 transition-all duration-300 hover:border-gold/40 hover:shadow-xl sm:rounded-2xl"
                      >
                        {service.image && (
                          <div className="p-4 sm:p-5 pb-0 sm:pb-0">
                            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
                              <img src={service.image} alt={service.title} className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                            </div>
                          </div>
                        )}
                        <div className="p-5 sm:p-6 md:p-8">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20 sm:mb-6 sm:h-14 sm:w-14 md:h-16 md:w-16">
                            <Icon className="text-gold" size={22} />
                          </div>
                          <h2 className="mb-2 font-serif text-lg font-bold text-foreground sm:mb-4 sm:text-xl">
                            {service.title}
                          </h2>
                          <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
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
      </AuroraBackground>
      <Footer />
    </>
  );
};

export default Services;
