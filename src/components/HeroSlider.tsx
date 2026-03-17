import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type WaveConfig = {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
};

type HeroStat = {
  label: string;
  value: number;
  suffix: string;
};

const heroStats: HeroStat[] = [
  { value: 10, suffix: "+", label: "Rokov skúseností" },
  { value: 2000, suffix: "+", label: "Spokojných klientov" },
  { value: 10, suffix: "", label: "Rôznych služieb" },
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

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const statCardVariants: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const AnimatedHeroStat = ({ stat, index }: { stat: HeroStat; index: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationId = 0;
    let startTime: number | null = null;
    const duration = 1500;

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
    }, index * 200);

    return () => {
      window.clearTimeout(timeout);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [index, stat.value]);

  return (
    <motion.div
      variants={statCardVariants}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group rounded-[2rem] border border-primary-foreground/14 bg-background/8 px-5 py-6 backdrop-blur-md transition-all duration-300 hover:border-gold/35 hover:bg-background/14 hover:shadow-[0_20px_60px_hsl(var(--gold)/0.16)] sm:px-6"
    >
      <div className="text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground/68 transition-colors duration-300 group-hover:text-primary-foreground/82">
        {stat.label}
      </div>
      <div className="mt-3 text-2xl font-bold text-gold transition-transform duration-300 group-hover:translate-x-0.5 sm:text-3xl lg:text-4xl">
        {count.toLocaleString("sk-SK")}
        {stat.suffix}
      </div>
    </motion.div>
  );
};

const HeroSlider = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId = 0;
    let time = 0;

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);

      const resolveColor = (variables: string[], alpha = 1) => {
        const tempEl = document.createElement("div");
        tempEl.style.position = "absolute";
        tempEl.style.visibility = "hidden";
        tempEl.style.width = "1px";
        tempEl.style.height = "1px";
        document.body.appendChild(tempEl);

        let color = `rgba(255, 255, 255, ${alpha})`;

        for (const variable of variables) {
          const value = rootStyles.getPropertyValue(variable).trim();
          if (!value) continue;

          tempEl.style.backgroundColor = `var(${variable})`;
          const computedColor = getComputedStyle(tempEl).backgroundColor;

          if (computedColor && computedColor !== "rgba(0, 0, 0, 0)") {
            if (alpha < 1) {
              const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
              color = rgbMatch
                ? `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`
                : computedColor;
            } else {
              color = computedColor;
            }
            break;
          }
        }

        document.body.removeChild(tempEl);
        return color;
      };

      return {
        backgroundTop: resolveColor(["--primary"], 1),
        backgroundBottom: resolveColor(["--background", "--muted"], 1),
        wavePalette: [
          {
            offset: 0,
            amplitude: 60,
            frequency: 0.003,
            color: resolveColor(["--primary-foreground"], 0.52),
            opacity: 0.42,
          },
          {
            offset: Math.PI / 2,
            amplitude: 78,
            frequency: 0.0025,
            color: resolveColor(["--gold", "--primary-foreground"], 0.46),
            opacity: 0.38,
          },
          {
            offset: Math.PI,
            amplitude: 52,
            frequency: 0.0034,
            color: resolveColor(["--gold-light", "--foreground"], 0.28),
            opacity: 0.28,
          },
          {
            offset: Math.PI * 1.5,
            amplitude: 70,
            frequency: 0.0021,
            color: resolveColor(["--muted-foreground", "--primary-foreground"], 0.22),
            opacity: 0.22,
          },
        ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();

    const observer = new MutationObserver(() => {
      themeColors = computeThemeColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = prefersReducedMotion ? 10 : 52;
    const influenceRadius = prefersReducedMotion ? 140 : 280;
    const smoothing = prefersReducedMotion ? 0.04 : 0.085;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = Math.max(window.innerHeight * 0.92, 720);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const recenterMouse = () => {
      const centerPoint = { x: window.innerWidth / 2, y: Math.max(window.innerHeight * 0.55, 360) };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    resizeCanvas();
    recenterMouse();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", recenterMouse);

    const drawWave = (wave: WaveConfig) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = height * 0.68 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          height * 0.72 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.45 + time * 0.0026) * (wave.amplitude * 0.42) +
          mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 2.2;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 32;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 1;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, themeColors.backgroundTop);
      gradient.addColorStop(1, themeColors.backgroundBottom);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      themeColors.wavePalette.forEach(drawWave);
      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", recenterMouse);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
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
    <section className="relative min-h-screen overflow-hidden bg-primary pt-16 text-primary-foreground sm:pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--foreground)/0.08),transparent_32%),linear-gradient(to_bottom,transparent_55%,hsl(var(--background)/0.35)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,hsl(var(--gold)/0.24),transparent_58%)]" />

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center py-10 sm:min-h-[calc(100vh-5rem)] sm:py-14">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="mx-auto flex max-w-6xl flex-col items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-background/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary-foreground/80 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              Best Swing Golf Academy
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="max-w-5xl text-balance font-sans text-4xl font-bold leading-[0.92] tracking-tight text-primary-foreground sm:text-6xl md:text-7xl lg:text-[6.35rem]"
            >
              Golf, ktorý mení
              <span className="mt-2 block text-gold">začiatočníkov na hráčov</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-3xl text-balance text-base leading-relaxed text-primary-foreground/78 sm:text-lg md:text-xl"
            >
              Najväčšia golfová akadémia na Slovensku s profesionálnymi trénermi, kurzami zelenej karty,
              detskou akadémiou a eventmi, ktoré dostanú ľudí na ihrisko.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button
                size="lg"
                onClick={() => handleButtonClick("#sluzby")}
                className="h-14 rounded-full border border-gold/30 bg-gold px-8 text-sm font-bold uppercase tracking-[0.24em] text-primary shadow-[0_18px_48px_hsl(var(--gold)/0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_24px_60px_hsl(var(--gold)/0.42)]"
              >
                Naše služby
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleButtonClick("/o-nas")}
                className="h-14 rounded-full border border-primary-foreground/45 bg-background/15 px-8 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_10px_30px_hsl(var(--background)/0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:bg-background/22 hover:text-primary-foreground"
              >
                Spoznajte BSGA
              </Button>
            </motion.div>

            <motion.div
              variants={statsVariants}
              className="mt-14 grid w-full max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {heroStats.map((stat, index) => (
                <AnimatedHeroStat key={stat.label} stat={stat} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
