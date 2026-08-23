import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type HeroStat = {
  label: string;
  value: number;
  suffix: string;
};

const heroStats: HeroStat[] = [
  { value: 10, suffix: "+", label: "Rokov skúseností" },
  { value: 2950, suffix: "+", label: "Spokojných klientov" },
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
    <div className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm sm:px-6 sm:py-5">
      <div className="text-xl font-bold text-gold sm:text-2xl lg:text-3xl">
        {count.toLocaleString("sk-SK")}
        {stat.suffix}
      </div>
      <div className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-foreground/60 sm:text-xs">
        {stat.label}
      </div>
    </div>
  );
};

const HeroSlider = () => {
  const navigate = useNavigate();

  const handleButtonClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.slice(1));
      element?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(href);
  };

  return (
    <section className="relative w-full overflow-hidden bg-background px-0 pt-24 sm:px-4 sm:pt-28 md:px-6 md:pt-32">
      <div className="container mx-auto px-4 pb-14 text-center sm:px-6 sm:pb-16 md:pb-20">
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
            className="mt-5 max-w-4xl text-balance font-serif text-4xl font-bold leading-[1.05] text-foreground sm:mt-6 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Golf, ktorý mení
            <span className="mt-2 block text-gold">začiatočníkov na hráčov</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/70 sm:text-base md:text-lg"
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
              className="h-12 w-full rounded-full bg-gold px-8 text-sm font-bold text-primary-foreground transition-colors duration-300 hover:bg-foreground active:scale-[0.98] sm:h-14 sm:w-auto"
            >
              Naše služby
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleButtonClick("/o-nas")}
              className="h-12 w-full rounded-full border border-foreground bg-transparent px-8 text-sm font-bold text-foreground transition-colors duration-300 hover:bg-muted active:scale-[0.98] sm:h-14 sm:w-auto"
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
    </section>
  );
};

export default HeroSlider;
