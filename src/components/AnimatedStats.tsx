import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { value: 10, suffix: "+", label: "Rokov skúseností" },
  { value: 2000, suffix: "+", label: "Spokojných klientov" },
  { value: 10, suffix: "", label: "Rôznych služieb" },
  { value: 6, suffix: "", label: "Trénerov" },
];

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}

const StatItem = ({ value, suffix, label, isVisible, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let animationId: number;
    let startTime: number | null = null;
    const duration = 1500;

    const timeout = setTimeout(() => {
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * value);
        
        setCount(currentValue);

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      animationId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isVisible, value, delay]);

  return (
    <div className="text-center">
      <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gold mb-1 sm:mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-primary-foreground/70 text-xs sm:text-sm md:text-base">{label}</p>
    </div>
  );
};

export default AnimatedStats;
