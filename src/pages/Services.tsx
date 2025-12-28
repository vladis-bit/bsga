import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
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
    title: "Akcie, pobyty a eventy na mieru",
    description:
      "Golfové podujatia pripravené podľa tvojich predstáv – od menších osláv až po viacdňové pobyty. Všetko zabezpečené tak, aby si si to naplno užil.",
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
        <section className="pt-32 pb-20 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <span className="text-gold text-sm tracking-[0.2em] uppercase">
              Služby
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mt-4 mb-6">
              Čo ponúkame
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              10 profesionálnych služieb pre každého golfistu
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 bg-card rounded-2xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                      <Icon className="text-gold" size={28} />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-16">
              <Link
                to="/#kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-primary font-medium rounded-full hover:bg-gold-light transition-all duration-300"
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
