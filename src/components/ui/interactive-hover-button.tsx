import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <>
      <style>
        {`
          .interactive-hover-button:hover .interactive-hover-button__icon-wrap {
            animation: interactive-hover-button-fly 0.6s ease-in-out infinite alternate;
          }

          @keyframes interactive-hover-button-fly {
            from {
              transform: translateY(0.1em);
            }
            to {
              transform: translateY(-0.1em);
            }
          }
        `}
      </style>
      <button
        ref={ref}
        className={cn(
          "interactive-hover-button group inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-gold bg-gold px-5 py-4 font-bold text-primary transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <span className="interactive-hover-button__icon-wrap flex shrink-0 items-center justify-center">
          <ArrowRight className="transition-transform duration-300 ease-in-out group-hover:translate-x-[1.2em] group-hover:rotate-45 group-hover:scale-110" />
        </span>
        <span className="block transition-transform duration-300 ease-in-out group-hover:translate-x-[5em]">
          {text}
        </span>
      </button>
    </>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
