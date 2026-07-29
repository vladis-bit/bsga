import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage1Asset from "@/assets/hero-golf-1.webp.asset.json";
import heroImage2Asset from "@/assets/hero-golf-2.webp.asset.json";
import heroImage3Asset from "@/assets/hero-golf-3.webp.asset.json";

const heroImages = [heroImage1Asset.url, heroImage2Asset.url, heroImage3Asset.url];

type HeroStat = {
  label: string;
  value: number;
  suffix: string;
};

const heroStats: HeroStat[] = [
  { value: 10, suffix: "+", label: "Rokov skúseností" },
  { value: 2800, suffix: "+", label: "Spokojných klientov" },
  { value: 12, suffix: "", label: "Rôznych služieb" },
  { value: 6, suffix: "", label: "Trénerov" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AnimatedHeroStat = ({ stat, index }: { stat: HeroStat; index: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationId = 0;
    let startTime: number | null = null;
    const duration = 1800;

    setCount(0);

    const timeout = window.setTimeout(() => {
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * stat.value);

        setCount(currentValue);

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        } else {
          setCount(stat.value);
        }
      };

      animationId = requestAnimationFrame(animate);
    }, index * 220);

    return () => {
      window.clearTimeout(timeout);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [index, stat.value]);

  return (
    <div className="rounded-2xl border border-primary-foreground/20 bg-black/30 px-4 py-4 backdrop-blur-md sm:px-6 sm:py-5">
      <div className="text-xl font-bold text-gold sm:text-2xl lg:text-3xl">
        {count.toLocaleString("sk-SK")}
        {stat.suffix}
      </div>
      <div className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-primary-foreground/75 sm:text-xs">
        {stat.label}
      </div>
    </div>
  );
};

const HeroSlider = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, []);

  const handleButtonClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.slice(1));
      element?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(href);
  };

  return (
    <section className="relative w-full bg-background px-0 pt-20 sm:px-4 sm:pt-24 md:px-6">
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-none min-h-[560px] sm:min-h-[640px] sm:rounded-3xl md:min-h-[760px] max-h-[calc(100vh-4rem)]">
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt="Golfová akadémia BSGA"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            {...(index === 0 ? ({ fetchpriority: "high" } as any) : {})}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

        <div className="relative z-10 flex h-full min-h-[560px] items-center sm:min-h-[640px] md:min-h-[760px]">
          <div className="container mx-auto px-4 py-14 text-center sm:px-6 sm:py-16 md:py-20">
            <motion.div
              className="mx-auto flex max-w-5xl flex-col items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs"
              >
                <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                Best Swing Golf Academy
                <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="mt-5 max-w-4xl text-balance font-serif text-4xl font-bold leading-[1.05] text-primary-foreground sm:mt-6 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              >
                Golf, ktorý mení
                <span className="mt-2 block text-gold">začiatočníkov na hráčov</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-primary-foreground/80 sm:text-base md:text-lg"
              >
                Najväčšia golfová akadémia na Slovensku s profesionálnymi trénermi, kurzami zelenej karty,
                detskou akadémiou a eventmi, ktoré dostanú ľudí na ihrisko.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => handleButtonClick("#sluzby")}
                  className="h-12 w-full rounded-full bg-gold px-8 text-sm font-bold text-primary transition-colors duration-300 hover:bg-primary-foreground hover:text-primary active:scale-[0.98] sm:h-14 sm:w-auto"
                >
                  Naše služby
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleButtonClick("/o-nas")}
                  className="h-12 w-full rounded-full border border-primary-foreground bg-transparent px-8 text-sm font-bold text-primary-foreground backdrop-blur-sm transition-colors duration-300 hover:bg-primary-foreground hover:text-primary active:scale-[0.98] sm:h-14 sm:w-auto"
                >
                  O nás
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:mt-12 lg:grid-cols-4"
              >
                {heroStats.map((stat, index) => (
                  <AnimatedHeroStat key={stat.label} stat={stat} index={index} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 sm:bottom-8">
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
            aria-label="Predchádzajúci obrázok"
            className="rounded-full border border-primary-foreground/40 bg-black/30 p-2 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-black/50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Prejsť na obrázok ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === current ? "w-6 bg-gold" : "w-1.5 bg-primary-foreground/50"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % heroImages.length)}
            aria-label="Ďalší obrázok"
            className="rounded-full border border-primary-foreground/40 bg-black/30 p-2 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-black/50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
