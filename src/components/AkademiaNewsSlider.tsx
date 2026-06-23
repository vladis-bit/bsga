import { useEffect, useState } from "react";

import heroSlide1Asset from "@/assets/akademia/hero-slide-1.webp.asset.json";
const heroSlide1 = heroSlide1Asset.url;
import heroSlide2Asset from "@/assets/akademia/hero-slide-2-new.webp.asset.json";
const heroSlide2 = heroSlide2Asset.url;
import heroSlide3Asset from "@/assets/akademia/hero-slide-3-new.webp.asset.json";
const heroSlide3 = heroSlide3Asset.url;
import heroSlide1AvifAsset from "@/assets/akademia/hero-slide-1.avif.asset.json";
const heroSlide1Avif = heroSlide1AvifAsset.url;
import heroSlide2AvifAsset from "@/assets/akademia/hero-slide-2-new.avif.asset.json";
const heroSlide2Avif = heroSlide2AvifAsset.url;
import heroSlide3AvifAsset from "@/assets/akademia/hero-slide-3-new.avif.asset.json";
const heroSlide3Avif = heroSlide3AvifAsset.url;

interface NewsSlide {
  title: string;
  subtitle: string;
  cta: string;
  anchor: string;
  image: string;
  imageAvif?: string;
}

const slides: NewsSlide[] = [
  {
    title: "Spustenie prihlasovania na detské tábory 2026",
    subtitle: "Rezervujte miesto pre vaše dieťa už teraz",
    cta: "Prihlásiť sa",
    anchor: "#tabory",
    image: heroSlide1,
    imageAvif: heroSlide1Avif,
  },
  {
    title: "Pobytový tábor na Táloch",
    subtitle: "Rezervácie otvorené",
    cta: "Zistiť viac",
    anchor: "#tabory",
    image: heroSlide2,
    imageAvif: heroSlide2Avif,
  },
  {
    title: "Tour Kids",
    subtitle: "Komplexný rozvoj mladého športovca",
    cta: "Zistiť viac",
    anchor: "#timeline",
    image: heroSlide3,
    imageAvif: heroSlide3Avif,
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

  const handleAnchorClick = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeSlide = slides[currentSlide];

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-2xl sm:min-h-[520px] sm:rounded-3xl md:min-h-[620px]">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <picture>
              {slide.imageAvif && <source srcSet={slide.imageAvif} type="image/avif" />}
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </picture>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/65 to-primary/20" />

      <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-end px-6 pb-10 pt-12 text-center sm:min-h-[520px] sm:px-10 sm:pb-14 md:min-h-[620px] md:px-12 md:pb-16">
        <span className="mb-3 text-xs uppercase tracking-[0.2em] text-gold sm:text-sm">
          Akadémia BSGA
        </span>
        <h1 className="max-w-4xl text-3xl font-serif font-bold text-primary-foreground sm:text-5xl md:text-6xl">
          {activeSlide.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-primary-foreground/85 sm:text-base md:text-lg">
          {activeSlide.subtitle}
        </p>
        <button
          onClick={() => handleAnchorClick(activeSlide.anchor)}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-gold-light sm:px-7 sm:text-base"
        >
          <span>{activeSlide.cta}</span>
        </button>

        <div className="mt-8 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-gold" : "w-2 bg-primary-foreground/35 hover:bg-primary-foreground/55"}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AkademiaNewsSlider;