import { useState } from "react";
import { ChevronLeft, ChevronRight, User, Users, GraduationCap, Award, Baby, Tent, Building2, Trophy, Wrench, Calendar, MapPin } from "lucide-react";

const services = [
  {
    icon: User,
    title: "Individuálne lekcie",
    keywords: ["Osobný tréning", "Presné rady", "Rýchly progres"],
    description:
      "Osobný tréning, kde sa tréner venuje len tebe. Jasné vysvetlenia, presné rady a cvičenia, ktoré ťa posunú vpred už po pár lekciách.",
  },
  {
    icon: Users,
    title: "Skupinové lekcie",
    keywords: ["Skupinová dynamika", "Motivácia", "Praktické cvičenia"],
    description:
      "Tréning v príjemnej skupine, kde sa učíš spolu s ostatnými. Dynamika, zdravá motivácia a praktické cvičenia.",
  },
  {
    icon: GraduationCap,
    title: "Štart karty",
    keywords: ["Pre začiatočníkov", "Pevné základy", "Vstup na ihrisko"],
    description:
      "Ideálny program pre úplných začiatočníkov. Získaš pevné základy a pochopíš, ako golf funguje.",
  },
  {
    icon: Award,
    title: "Zelené karty",
    keywords: ["Kompletný kurz", "Pravidlá a etika", "Oficiálna spôsobilosť"],
    description:
      "Kompletný kurz, ktorý ťa pripraví na samostatnú hru. Technika, pravidlá, etika a záverečný test.",
  },
  {
    icon: Baby,
    title: "Detská akadémia",
    keywords: ["Pohyb a hravosť", "Rozvoj techniky", "Nové kamarátstva"],
    description:
      "Tréningy pre deti, ktoré spájajú pohyb, hravosť a systematický rozvoj techniky.",
  },
  {
    icon: Tent,
    title: "Detské kempy",
    keywords: ["Týždeň plný golfu", "Šport a zážitky", "Aktivity každý deň"],
    description:
      "Týždne plné golfu a zážitkov. Šport, hry a aktivity, ktoré zlepšia golfové schopnosti.",
  },
  {
    icon: Building2,
    title: "Firemné akcie a teambuildingy",
    keywords: ["Golf pre firmy", "Tímový duch", "Uvoľnená atmosféra"],
    description:
      "Príjemná kombinácia golfu, zábavy a spolupráce. Vhodné pre firmy, ktoré chcú zažiť niečo nové a podporiť tímového ducha v uvoľnenej atmosfére.",
  },
  {
    icon: Trophy,
    title: "Turnaje – BSGA Tour",
    keywords: ["Séria turnajov", "Zbieranie bodov", "Profesionálna organizácia"],
    description:
      "Séria turnajov, kde môžeš otestovať svoju formu, zbierať body a súťažiť s hráčmi podobnej úrovne. Príjemná atmosféra a profesionálna organizácia.",
  },
  {
    icon: Wrench,
    title: "Fitting – vybavenie na mieru",
    keywords: ["Testovanie palíc", "Na mieru", "Citeľný rozdiel"],
    description:
      "Merania a testovanie palíc, aby si našiel vybavenie, ktoré ti skutočne sedí. Správny výber dokáže urobiť citeľný rozdiel v tvojej hre.",
  },
  {
    icon: Calendar,
    title: "Eventy, teambuildingy a golfové pobyty",
    keywords: ["Akcie na mieru", "PGA tréneri", "Kompletný servis"],
    description:
      "Golfové akcie a eventy na mieru. Ponúkame jednodňové akcie až po kompletné sústredenia s PGA trénermi. Záruka spokojnosti.",
  },
  {
    icon: MapPin,
    title: "Course Management",
    keywords: ["Tréning na ihrisku", "Analýza hry", "Najnižšie skóre"],
    description:
      "Tréning s PGA trénerom na ihrisku. Analýza hry, know-how a odborné poradenstvo za cieľom dosiahnutia najnižšieho skóre.",
  },
];

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Calculate how many items to show based on screen size
  const itemsPerView = 3; // Desktop shows 3
  const maxIndex = Math.max(0, services.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlideMobile = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlideMobile = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section id="sluzby" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase">
            Naše služby
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-3 sm:mt-4">
            Čo ponúkame
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlideMobile}
              className="p-3 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-muted-foreground text-sm">
              {currentIndex + 1} / {services.length}
            </span>
            <button
              onClick={nextSlideMobile}
              className="p-3 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Desktop Slider */}
        <div className="hidden lg:block relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-4">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? "bg-gold" : "bg-border hover:bg-gold/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-3 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/sluzby"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-medium"
          >
            Zobraziť všetky služby
            <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: {
    icon: React.ElementType;
    title: string;
    description: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <div className="group p-5 sm:p-8 bg-card rounded-xl sm:rounded-2xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-xl h-full">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gold/20 transition-colors">
        <Icon className="text-gold w-5 h-5 sm:w-7 sm:h-7" />
      </div>
      <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
        {service.description}
      </p>
    </div>
  );
};

export default ServicesSlider;
