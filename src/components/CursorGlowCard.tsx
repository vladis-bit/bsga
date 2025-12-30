import { useRef, useState, MouseEvent, ReactNode } from "react";

interface CursorGlowCardProps {
  children: ReactNode;
  className?: string;
}

const CursorGlowCard = ({ children, className = "" }: CursorGlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "hsl(var(--card))",
      }}
    >
      {/* Cursor glow effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            hsl(45 93% 58% / 0.15), 
            hsl(0 0% 100% / 0.08) 40%, 
            hsl(0 0% 0% / 0.05) 60%,
            transparent 80%)`,
        }}
      />
      
      {/* Border glow effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl sm:rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            hsl(45 93% 58% / 0.4), 
            hsl(0 0% 100% / 0.1) 50%,
            transparent 80%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CursorGlowCard;
