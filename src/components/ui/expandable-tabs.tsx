"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Tab = {
  type?: "tab";
  title: string;
  icon: LucideIcon;
  href: string;
};

type Separator = {
  type: "separator";
};

type TabItem = Tab | Separator;

function isTab(item: TabItem): item is Tab {
  return item.type !== "separator";
}

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  activeIndex?: number | null;
  onChange?: (index: number | null) => void;
  onNavigate?: (href: string) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition: Transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  activeIndex,
  onChange,
  onNavigate,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(outsideClickRef as React.RefObject<HTMLElement>, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (tabIndex: number, href?: string) => {
    setSelected(tabIndex);
    onChange?.(tabIndex);
    if (href && onNavigate) {
      onNavigate(href);
    }
  };

  const SeparatorComponent = ({ separatorKey }: { separatorKey: string }) => (
    <div key={separatorKey} className="mx-0.5 sm:mx-1 h-6 sm:h-8 w-px bg-border hidden sm:block" />
  );

  // Track actual tab index (excluding separators)
  let tabIndex = -1;

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex items-center gap-0.5 sm:gap-1 rounded-full border border-border bg-background p-0.5 sm:p-1 shadow-md",
        className
      )}
    >
      {tabs.map((tab, arrayIndex) => {
        if (!isTab(tab)) {
          return <SeparatorComponent key={`separator-${arrayIndex}`} separatorKey={`separator-${arrayIndex}`} />;
        }

        tabIndex++;
        const currentTabIndex = tabIndex;
        const Icon = tab.icon;
        const isActive = activeIndex === currentTabIndex;
        const isSelected = selected === currentTabIndex || isActive;

        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            custom={isSelected}
            onClick={() => handleSelect(currentTabIndex, tab.href)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors duration-300",
              isSelected
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <AnimatePresence initial={false}>
              {isSelected && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

export type { TabItem, Tab, Separator };
