import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-background text-foreground",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-100 [background-image:repeating-linear-gradient(100deg,hsl(var(--primary))_0%,hsl(var(--primary))_8%,transparent_12%,transparent_16%,hsl(var(--primary))_20%),repeating-linear-gradient(100deg,hsl(var(--gold)/0.32)_8%,hsl(var(--gold-light)/0.28)_14%,hsl(var(--accent)/0.22)_20%,hsl(var(--secondary)/0.18)_26%,hsl(var(--gold-dark)/0.28)_32%,hsl(var(--primary))_40%)] [background-size:300%,220%] [background-position:50%_50%,50%_50%] animate-aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--gold)/0.3),transparent_55%)]" />
        <div className="absolute inset-y-0 left-[-10%] w-[45%] bg-[radial-gradient(circle_at_center,hsl(var(--gold-light)/0.18),transparent_65%)] blur-3xl" />
        <div className="absolute inset-y-0 right-[-10%] w-[45%] bg-[radial-gradient(circle_at_center,hsl(var(--gold)/0.16),transparent_65%)] blur-3xl" />
        {showRadialGradient ? (
          <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_12%,black_68%)]" />
        ) : null}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
