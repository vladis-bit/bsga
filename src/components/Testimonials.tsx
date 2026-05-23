import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Pavel Uher",
    role: "Dlhoročný klient BSGA",
    text: "S BSGA som od samého začiatku. Za tie roky som videl, ako akadémia rástla – z dvoch trénerov na celý tím profesionálov a trénerov. Čo sa nezmenilo, je prístup: osobný, odborný a vždy s dôrazom na progres. BSGA sa o mňa komplexne stará - od tréningov pre moju rodinu a kamarátov až po golfové vybavenie."
  },
  {
    name: "Juraj Fábry",
    role: "Individuálne tréningy",
    text: "Individuálne lekcie v BSGA sú na vysokej úrovni. Tréner sa venuje len vám, analýza na TrackMane odhalí veci, ktoré by ste sami nikdy nepostrehli. Za tri mesiace pravidelných tréningov som znížil handicap."
  },
  {
    name: "Peter Bánik",
    role: "Golfové zájazdy",
    text: "Golfový zájazd cez BSGA – tá najlepšia voľba. Všetko zorganizované na kľúč, partnerstvo s Doni-Travel to posúva na skutočne profesionálnu úroveň. Ihrisko, top all-inclusive ubytovanie, tréningy s PGA profesionálmi. Určite sa vrátim."
  },
  {
    name: "Ján Mesko",
    role: "Golfová akadémia",
    text: "Môj syn začínal v BSGA na HCP 54. Tréner mal trpezlivosť, jasné vysvetlenia a správny mentoring. Teraz má HCP 4. Kto uvažuje nad golfom – BSGA je správna cesta."
  },
  {
    name: "HC Slovan Bratislava",
    role: "Firemná akcia",
    text: "Teambuilding na ihrisku v Hrubej Borši prekonal naše očakávania. Organizácia bezchybná, trénerský tím profesionálny, atmosféra uvoľnená. Odporúčame každej firme, ktorá hľadá niečo iné ako šablónový event."
  },
  {
    name: "Miroslav Blaha",
    role: "BSGA Tour a eventy",
    text: "BSGA Tour je séria, na ktorú sa teším každý rok. Päť turnajov, päť prémiových ihrísk, profesionálna organizácia. Catering, networking, vyhlasovanie výsledkov – detail, na ktorý myslí málokto."
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

            <div className="bg-card rounded-2xl p-5 sm:p-10 md:p-14 border border-border/50 shadow-xl relative overflow-hidden">
              <div className="relative min-h-[420px] sm:min-h-[280px] md:min-h-[240px]">
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
                    <p className="text-sm sm:text-lg md:text-xl text-foreground leading-relaxed mb-5 sm:mb-8 italic">
                      "{testimonial.text}"
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center border border-gold/20 flex-shrink-0">
                        <span className="text-gold font-bold text-base sm:text-xl">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-foreground text-sm sm:text-base truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-gold/80 text-xs sm:text-sm font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="flex gap-0.5 sm:gap-1 w-full sm:w-auto sm:ml-auto">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold"
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