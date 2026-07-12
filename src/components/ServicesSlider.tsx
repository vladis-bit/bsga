import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, User, Users, GraduationCap, Award, Baby, Tent, Building2, Trophy, Wrench, Calendar, MapPin, Target } from "lucide-react";
import serviceTourImgAsset from "@/assets/service-tour.webp.asset.json";
const serviceTourImg = serviceTourImgAsset.url;
import serviceFittingImg from "@/assets/service-fitting.webp";
import serviceCourseImg from "@/assets/service-course-management.webp";
import serviceIndividualImgAsset from "@/assets/service-individual.jpg.asset.json";
const serviceIndividualImg = serviceIndividualImgAsset.url;
import serviceStartCardsImgAsset from "@/assets/service-start-cards.jpg.asset.json";
const serviceStartCardsImg = serviceStartCardsImgAsset.url;
import serviceKidsAcademyImgAsset from "@/assets/service-kids-academy.jpg.asset.json";
const serviceKidsAcademyImg = serviceKidsAcademyImgAsset.url;
import serviceKidsCampsImgAsset from "@/assets/service-kids-camps-new.jpg.asset.json";
const serviceKidsCampsImg = serviceKidsCampsImgAsset.url;
import serviceCorporateImgAsset from "@/assets/service-corporate.webp.asset.json";
const serviceCorporateImg = serviceCorporateImgAsset.url;
import servicePerformanceImg from "@/assets/service-performance.webp";
import serviceGreenCardsImgAsset from "@/assets/service-green-cards.webp.asset.json";
const serviceGreenCardsImg = serviceGreenCardsImgAsset.url;
import serviceEventsImgAsset from "@/assets/service-events.jpg.asset.json";
const serviceEventsImg = serviceEventsImgAsset.url;
import serviceGroupImgAsset from "@/assets/service-group.webp.asset.json";
const serviceGroupImg = serviceGroupImgAsset.url;

const services = [
  {
    icon: User,
    title: "Individuálne lekcie",
    image: serviceIndividualImg,
    link: "/zacni-s-golfom#zlepsuj-sa",
    description: (
      <>Osobný tréning, kde sa <strong>tréner venuje len tebe</strong>. Jasné vysvetlenia, <strong>presné rady</strong> a cvičenia, ktoré ťa posunú vpred už po <strong>pár lekciách</strong>.</>
    ),
  },
  {
    icon: Users,
    title: "Skupinové lekcie",
    image: serviceGroupImg,
    link: "/zacni-s-golfom#zlepsuj-sa",
    description: (
      <>Tréning v <strong>príjemnej skupine</strong>, kde sa učíš spolu s ostatnými. Dynamika, <strong>zdravá motivácia</strong> a praktické cvičenia.</>
    ),
  },
  {
    icon: GraduationCap,
    title: "Víkendový kurz zelenej karty",
    image: serviceStartCardsImg,
    link: "/zacni-s-golfom#vikendovy-kurz",
    description: (
      <>Ideálny program pre <strong>úplných začiatočníkov</strong>. Získaš <strong>pevné základy</strong> a pochopíš, ako golf funguje.</>
    ),
  },
  {
    icon: Award,
    title: "Zelené karty",
    image: serviceGreenCardsImg,
    link: "/zacni-s-golfom#zelena-karta",
    description: (
      <>Kompletný kurz, ktorý ťa pripraví na <strong>samostatnú hru</strong>. Technika, pravidlá, etika a <strong>záverečný test</strong>.</>
    ),
  },
  {
    icon: Baby,
    title: "Detská akadémia",
    image: serviceKidsAcademyImg,
    link: "/akademia#timeline",
    description: (
      <>Tréningy pre deti, ktoré spájajú <strong>pohyb, hravosť</strong> a systematický <strong>rozvoj techniky</strong>.</>
    ),
  },
  {
    icon: Tent,
    title: "Detské kempy",
    image: serviceKidsCampsImg,
    objectPosition: "center 60%",
    link: "/akademia#tabory",
    description: (
      <>Týždne <strong>plné golfu a zážitkov</strong>. Šport, hry a aktivity, ktoré zlepšia <strong>golfové schopnosti</strong>.</>
    ),
  },
  {
    icon: Building2,
    title: "Firemné akcie a teambuildingy",
    image: serviceCorporateImg,
    description: (
      <>Príjemná kombinácia <strong>golfu, zábavy a spolupráce</strong>. Vhodné pre firmy, ktoré chcú zažiť niečo nové a podporiť <strong>tímového ducha</strong> v uvoľnenej atmosfére.</>
    ),
  },
  {
    icon: Trophy,
    title: "Turnaje – BSGA Tour",
    image: serviceTourImg,
    link: "/tour",
    description: (
      <>Séria turnajov, kde môžeš <strong>otestovať svoju formu</strong>, zbierať body a súťažiť s hráčmi podobnej úrovne. <strong>Profesionálna organizácia</strong>.</>
    ),
  },
  {
    icon: Wrench,
    title: "Fitting – vybavenie na mieru",
    image: serviceFittingImg,
    link: "/fitting",
    description: (
      <>Merania a <strong>testovanie palíc</strong>, aby si našiel vybavenie, ktoré ti skutočne sedí. <strong>Správny výber</strong> dokáže urobiť <strong>citeľný rozdiel</strong> v tvojej hre.</>
    ),
  },
  {
    icon: Calendar,
    title: "Eventy, teambuildingy a golfové pobyty",
    image: serviceEventsImg,
    objectPosition: "center 50%",
    description: (
      <>Golfové akcie a <strong>eventy na mieru</strong>. Ponúkame jednodňové akcie až po kompletné <strong>sústredenia s PGA trénermi</strong>. Záruka spokojnosti.</>
    ),
  },
  {
    icon: MapPin,
    title: "Course Management",
    image: serviceCourseImg,
    link: "/zacni-s-golfom#dominuj",
    description: (
      <>Tréning s <strong>PGA trénerom</strong> na ihrisku. <strong>Analýza hry</strong>, know-how a odborné poradenstvo za cieľom dosiahnutia <strong>najnižšieho skóre</strong>.</>
    ),
  },
  {
    icon: Target,
    title: "Performance Center",
    image: servicePerformanceImg,
    externalLink: "https://bsga-performance-center.reenio.sk/sk/terms/",
    description: (
      <>Tréningové centrum počas <strong>zimných mesiacov</strong> s <strong>Trackmanom</strong> a <strong>Flightscopom</strong> priamo v <strong>Petržalke</strong>.</>
    ),
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
              aria-label="Predchádzajúca služba"
              className="p-3 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-muted-foreground text-sm">
              {currentIndex + 1} / {services.length}
            </span>
            <button
              onClick={nextSlideMobile}
              aria-label="Ďalšia služba"
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
              aria-label="Predchádzajúce služby"
              className="p-3 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Prejsť na stránku ${idx + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? "bg-gold" : "bg-border hover:bg-gold/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              aria-label="Ďalšie služby"
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
    description: React.ReactNode;
    image?: string;
    objectPosition?: string;
    link?: string;
    externalLink?: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = service.icon;
  const target = service.externalLink || service.link || "/sluzby";
  const isExternal = !!service.externalLink;

  const cardInner = (
    <div className="group overflow-hidden bg-card rounded-xl sm:rounded-2xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-xl h-full flex flex-col hover:-translate-y-1">
      {service.image && (
        <div className="p-3 sm:p-4 pb-0 sm:pb-0">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
            <img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: service.objectPosition || 'center 25%' }} loading="lazy" />
          </div>
        </div>
      )}
      <div className="flex h-full flex-col p-4 sm:p-5">
        <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
          <Icon className="text-gold w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <h3 className="text-center text-base sm:text-lg font-serif font-bold text-foreground mb-2">
          {service.title}
        </h3>
        <p className="text-center text-muted-foreground text-sm leading-relaxed">
          {service.description}
        </p>
        <div className="mt-4 flex flex-grow items-end justify-center pt-2">
          <span className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-foreground transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-primary">
            Zobraziť detaily služby
          </span>
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={target} target="_blank" rel="noopener noreferrer" aria-label={`Zobraziť detaily služby: ${service.title}`} className="block h-full">
        {cardInner}
      </a>
    );
  }
  return (
    <Link to={target} aria-label={`Zobraziť detaily služby: ${service.title}`} className="block h-full">
      {cardInner}
    </Link>
  );
};

export default ServicesSlider;
