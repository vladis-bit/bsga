import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Martin Kováč",
    role: "Začiatočník",
    text: "Vďaka BSGA som sa naučil základy golfu za pár týždňov. Tréneri sú trpezliví a profesionálni. Odporúčam každému, kto chce začať s golfom."
  },
  {
    name: "Zuzana Horváthová",
    role: "Pokročilá hráčka",
    text: "Peter a Jakub sú skvelí tréneri. Po individuálnych lekciách som výrazne zlepšila svoj handicap. Akadémia má profesionálny prístup."
  },
  {
    name: "Tomáš Novák",
    role: "Firemný klient",
    text: "Organizovali sme firemný teambuilding s BSGA a bolo to fantastické. Perfektná organizácia a všetci si to užili."
  },
  {
    name: "Lucia Szabová",
    role: "Členka klubu",
    text: "Už tretí rok som členkou BSGA a som nadmieru spokojná. Komunita je priateľská a turnaje sú vždy perfektne pripravené."
  },
  {
    name: "Peter Baláž",
    role: "Golfový nadšenec",
    text: "BSGA Tour je najlepšia amatérska séria na Slovensku. Skvelé ihriská, super atmosféra a profesionálna organizácia."
  },
  {
    name: "Jana Dvořáková",
    role: "Začiatočníčka",
    text: "Nikdy som nehrala golf, no po kurze s BSGA som sa zamilovala do tohto športu. Tréneri vysvetlia všetko zrozumiteľne a s úsmevom."
  },
  {
    name: "Róbert Tóth",
    role: "Firemný manažér",
    text: "S BSGA spolupracujeme už druhý rok na firemných eventoch. Vždy profesionálny prístup, flexibilita a skvelá spätná väzba od kolegov."
  },
  {
    name: "Monika Kráľová",
    role: "Hráčka HCP 18",
    text: "Individuálne tréningy s Petrom mi pomohli zlepšiť krátku hru o úroveň vyššie. Oceňujem analytický prístup a videoanýzu švihu."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <span className="text-gold text-xs sm:text-sm tracking-[0.3em] uppercase font-medium">
            Referencie
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-4 sm:mt-5">
            Čo o nás povedali klienti
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-5 sm:mt-7" />
        </div>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            <Quote className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 text-gold/15 w-16 h-16 sm:w-24 sm:h-24 z-0" />

            <div className="bg-card rounded-2xl p-6 sm:p-10 md:p-14 border border-border/50 shadow-xl relative overflow-hidden">
              <div className="relative min-h-[220px] sm:min-h-[200px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute inset-0 transition-all duration-700 ease-out",
                      index === currentIndex
                        ? "opacity-100 translate-x-0"
                        : index < currentIndex
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    )}
                  >
                    <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed mb-6 sm:mb-8 italic">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center border border-gold/20">
                        <span className="text-gold font-bold text-lg sm:text-xl">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm sm:text-base">
                          {testimonial.name}
                        </h4>
                        <p className="text-gold/80 text-xs sm:text-sm font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="flex gap-1 ml-auto">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-gold"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/30">
                <div 
                  className={cn(
                    "h-full bg-gold transition-all",
                    isPaused ? "" : "animate-[progress_5s_linear_infinite]"
                  )}
                  style={{
                    width: isPaused ? '0%' : '100%',
                    animation: isPaused ? 'none' : 'progress 5s linear infinite'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 bg-card border border-border rounded-full hover:border-gold hover:text-gold transition-all hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-gold w-8" : "bg-border hover:bg-gold/50"
                  )}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-3 bg-card border border-border rounded-full hover:border-gold hover:text-gold transition-all hover:scale-105"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};
export default Testimonials;