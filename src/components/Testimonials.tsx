import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Martin Kováč",
    role: "Začiatočník",
    text: "Vďaka BSGA som sa naučil základy golfu za pár týždňov. Tréneri sú trpezliví a profesionálni. Odporúčam každému, kto chce začať s golfom.",
  },
  {
    name: "Zuzana Horváthová",
    role: "Pokročilá hráčka",
    text: "Peter a Jakub sú skvelí tréneri. Po individuálnych lekciách som výrazne zlepšila svoj handicap. Akadémia má profesionálny prístup.",
  },
  {
    name: "Tomáš Novák",
    role: "Firemný klient",
    text: "Organizovali sme firemný teambuilding s BSGA a bolo to fantastické. Perfektná organizácia a všetci si to užili.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.2em] uppercase">
            Referencie
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-4">
            Čo hovoria naši klienti
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Quote className="absolute -top-4 -left-4 text-gold/20" size={80} />

            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg">
              <div className="relative min-h-[200px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute inset-0 transition-all duration-500",
                      index === currentIndex
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    )}
                  >
                    <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                        <span className="text-gold font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-gold w-6" : "bg-border"
                  )}
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
      </div>
    </section>
  );
};

export default Testimonials;
