import { useRef, useState, MouseEvent, ReactNode } from "react";

interface CursorGlowCardProps {
  children: ReactNode;
  className?: string;
}

const CursorGlowCard = ({ children, className = "" }: CursorGlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const updateRect = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const rect = rectRef.current;
      if (!rect) return;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      cursorGlowRef.current?.style.setProperty("--cgx", `${x}px`);
      cursorGlowRef.current?.style.setProperty("--cgy", `${y}px`);
      borderGlowRef.current?.style.setProperty("--cgx", `${x}px`);
      borderGlowRef.current?.style.setProperty("--cgy", `${y}px`);
    });
  };

  const handleMouseEnter = () => {
    updateRect();
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsHovering(false);
  };

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
        ref={cursorGlowRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at var(--cgx, 50%) var(--cgy, 50%), 
            hsl(45 93% 58% / 0.15), 
            hsl(0 0% 100% / 0.08) 40%, 
            hsl(0 0% 0% / 0.05) 60%,
            transparent 80%)`,
        }}
      />
      
      {/* Border glow effect */}
      <div
        ref={borderGlowRef}
        className="pointer-events-none absolute -inset-px rounded-xl sm:rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(400px circle at var(--cgx, 50%) var(--cgy, 50%), 
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
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
};

export default CursorGlowCard;
