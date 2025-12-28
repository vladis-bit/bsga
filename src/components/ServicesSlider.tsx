import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, User, Award } from "lucide-react";
import { cn } from "@/lib/utils";

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
      "Tréning v príjemnej skupine, kde sa učíš spolu s ostatnými. Dynamika, zdravá motivácia a praktické cvičenia.",
  },
  {
    icon: Award,
    title: "Zelené karty",
    description:
      "Kompletný kurz, ktorý ťa pripraví na samostatnú hru. Technika, pravidlá, etika a záverečný test.",
  },
];

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section id="sluzby" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.2em] uppercase">
            Naše služby
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-4">
            Čo ponúkame
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
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

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
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
    <div className="group p-8 bg-card rounded-2xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-xl">
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
};

export default ServicesSlider;
