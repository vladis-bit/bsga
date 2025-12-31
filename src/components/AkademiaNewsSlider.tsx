import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsSlide {
  title: string;
  subtitle: string;
  cta: string;
  anchor: string;
}

const slides: NewsSlide[] = [
  {
    title: "Spustenie prihlasovania na detské tábory 2026",
    subtitle: "Rezervujte miesto pre vaše dieťa už teraz",
    cta: "Prihlásiť sa",
    anchor: "#tabory",
  },
  {
    title: "Pobytový tábor na Táloch",
    subtitle: "Rezervácie otvorené",
    cta: "Zistiť viac",
    anchor: "#tabory",
  },
  {
    title: "BSGA Development Program",
    subtitle: "Komplexný rozvoj mladého športovca",
    cta: "Zistiť viac",
    anchor: "#timeline",
  },
];

const AkademiaNewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const handleAnchorClick = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="relative min-h-[180px] sm:min-h-[200px] md:min-h-[220px] flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <span className="text-gold text-xs sm:text-sm tracking-[0.15em] uppercase mb-2">
              Novinky
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary-foreground mb-2 sm:mb-3">
              {slide.title}
            </h3>
            <p className="text-primary-foreground/80 text-sm sm:text-base mb-4 sm:mb-6 max-w-lg">
              {slide.subtitle}
            </p>
            <button
              onClick={() => handleAnchorClick(slide.anchor)}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gold text-primary text-sm font-medium rounded-full hover:bg-gold-light transition-all duration-300"
            >
              {slide.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
        aria-label="Predchádzajúci"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
        aria-label="Nasledujúci"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-gold w-6" : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AkademiaNewsSlider;
