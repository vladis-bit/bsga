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
        <div className="absolute inset-0 opacity-90 [background-image:repeating-linear-gradient(100deg,hsl(var(--background))_0%,hsl(var(--background))_7%,transparent_10%,transparent_12%,hsl(var(--background))_16%),repeating-linear-gradient(100deg,hsl(var(--gold-light)/0.18)_10%,hsl(var(--accent)/0.18)_15%,hsl(var(--secondary)/0.14)_20%,hsl(var(--gold)/0.2)_25%,hsl(var(--background))_30%)] [background-size:300%,200%] [background-position:50%_50%,50%_50%] animate-aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--gold)/0.18),transparent_55%)]" />
        {showRadialGradient ? (
          <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_12%,black_68%)]" />
        ) : null}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
