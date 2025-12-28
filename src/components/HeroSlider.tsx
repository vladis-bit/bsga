import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import heroImage1 from "@/assets/hero-golf-1.jpg";
import heroImage2 from "@/assets/hero-golf-2.jpg";
import heroImage3 from "@/assets/hero-golf-3.jpg";

const slides = [
  {
    image: heroImage1,
    title: "Best Swing Golf Academy",
    subtitle: "Najväčšia golfová akadémia na Slovensku",
  },
  {
    image: heroImage2,
    title: "Profesionálni tréneri",
    subtitle: "Plne kvalifikovaní PGA profesionáli",
  },
  {
    image: heroImage3,
    title: "Začni svoju cestu",
    subtitle: "Golf pre všetky vekové kategórie",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />
        </div>
      ))}

      {/* Rounded Container */}
      <div className="absolute inset-4 md:inset-8 rounded-3xl overflow-hidden">
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 mb-6 text-gold text-sm tracking-[0.3em] uppercase border border-gold/30 rounded-full">
              Od roku 2016
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#sluzby"
                className="px-8 py-4 bg-gold text-primary font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-lg"
              >
                Naše služby
              </a>
              <a
                href="#kontakt"
                className="px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-medium rounded-full hover:bg-primary-foreground/10 transition-all duration-300"
              >
                Kontaktujte nás
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 p-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 p-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={40} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-gold w-8"
                : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
