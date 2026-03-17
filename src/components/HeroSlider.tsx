import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type WaveConfig = {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
};

const highlightPills = [
  "Darčekové poukážky",
  "Profesionálni tréneri",
  "BSGA Tour",
] as const;

const heroStats = [
  { label: "Rok založenia", value: "2016" },
  { label: "PGA tréneri", value: "100%" },
  { label: "Programy", value: "4+" },
] as const;

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
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

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center sm:min-h-[calc(100vh-5rem)]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="mx-auto flex max-w-6xl flex-col items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary-foreground/80 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              Best Swing Golf Academy
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="max-w-6xl text-balance font-sans text-5xl font-bold leading-[0.92] tracking-tight text-primary-foreground sm:text-6xl md:text-7xl lg:text-[7rem]"
            >
              Golf, ktorý mení
              <span className="block text-primary-foreground/68">začiatočníkov na hráčov</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-4xl text-balance text-lg leading-relaxed text-primary-foreground/70 sm:text-xl md:text-2xl"
            >
              Najväčšia golfová akadémia na Slovensku s profesionálnymi trénermi, kurzami zelenej karty,
              detskou akadémiou a eventmi, ktoré dostanú ľudí na ihrisko.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={() => handleButtonClick("#sluzby")}
                className="h-14 rounded-full bg-primary-foreground px-8 text-sm font-semibold uppercase tracking-[0.24em] text-primary hover:bg-primary-foreground/90"
              >
                Naše služby
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleButtonClick("/o-nas")}
                className="h-14 rounded-full border-border bg-background/5 px-8 text-sm font-semibold text-primary-foreground backdrop-blur-md hover:bg-background/10 hover:text-primary-foreground"
              >
                Spoznajte BSGA
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {highlightPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-border bg-background/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/72 backdrop-blur-sm sm:text-sm"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={statsVariants}
              className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="rounded-[2rem] border border-border bg-background/5 px-6 py-6 backdrop-blur-md"
                >
                  <div className="text-xs font-medium uppercase tracking-[0.28em] text-primary-foreground/55">
                    {stat.label}
                  </div>
                  <div className="mt-3 text-3xl font-bold text-gold sm:text-4xl">{stat.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;