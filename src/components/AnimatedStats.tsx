import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { value: 8, suffix: "+", label: "Rokov skúseností" },
  { value: 2000, suffix: "+", label: "Spokojných študentov" },
  { value: 10, suffix: "", label: "Rôznych služieb" },
  { value: 2, suffix: "", label: "PGA profesionáli" },
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

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const interval = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, interval);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
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
