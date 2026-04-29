import { useEffect, useRef } from "react";

type WaveConfig = {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
};

interface WavesCanvasProps {
  className?: string;
  height?: number;
}

const WavesCanvas = ({ className = "", height: heightProp }: WavesCanvasProps) => {
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
        wavePalette: [
          { offset: 0, amplitude: 60, frequency: 0.003, color: resolveColor(["--primary-foreground"], 0.58), opacity: 0.46 },
          { offset: Math.PI / 2, amplitude: 78, frequency: 0.0025, color: resolveColor(["--gold", "--primary-foreground"], 0.5), opacity: 0.42 },
          { offset: Math.PI, amplitude: 52, frequency: 0.0034, color: resolveColor(["--gold-light", "--foreground"], 0.34), opacity: 0.3 },
          { offset: Math.PI * 1.5, amplitude: 70, frequency: 0.0021, color: resolveColor(["--muted-foreground", "--primary-foreground"], 0.26), opacity: 0.24 },
        ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();
    const observer = new MutationObserver(() => {
      themeColors = computeThemeColors();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = prefersReducedMotion ? 10 : 52;
    const influenceRadius = prefersReducedMotion ? 140 : 280;
    const smoothing = prefersReducedMotion ? 0.04 : 0.085;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      const width = parent ? parent.offsetWidth : window.innerWidth;
      const height = heightProp ?? (parent ? parent.offsetHeight : 400);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const recenterMouse = () => {
      const rect = canvas.getBoundingClientRect();
      const centerPoint = { x: rect.width / 2, y: rect.height * 0.55 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => { resizeCanvas(); recenterMouse(); };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
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
        const dy = height * 0.5 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y =
          height * 0.5 +
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
      ctx.clearRect(0, 0, width, height);
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
  }, [heightProp]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default WavesCanvas;
