import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function SectionNav() {
  const { pathname, hash } = useLocation();
  const [items, setItems] = useState<{ id: string; label: string }[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refreshItems = () => {
      const sectionEls = Array.from(document.querySelectorAll("[data-section]"));
      const mapped = sectionEls
        .map((el) => {
          const id = el.id || el.getAttribute("data-section-id") || "";
          const label = el.getAttribute("data-section") || "";
          return { id, label };
        })
        .filter((s) => s.id && s.label);
      setItems((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(mapped)) return prev;
        return mapped;
      });
      setActiveId((prev) => {
        if (prev && mapped.some((m) => m.id === prev)) return prev;
        return mapped[0]?.id || "";
      });
    };

    refreshItems();

    const observer = new MutationObserver(refreshItems);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-section", "id"] });

    const timeoutId = setTimeout(refreshItems, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  useEffect(() => {
    if (items.length === 0) return;

    const updateActive = () => {
      const offset = 112;
      const entries = items
        .map((item) => {
          const el = document.getElementById(item.id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id: item.id, top: rect.top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      const current = entries
        .filter((e) => e.top <= offset)
        .sort((a, b) => b.top - a.top)[0];

      setActiveId(current?.id || entries[0]?.id || "");
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, [items]);

  useEffect(() => {
    if (!hash || hash === "#") return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [hash]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", id === "hero" ? window.location.pathname : `#${id}`);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="md:hidden sticky top-16 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-md shadow-sm">
      <div
        ref={trackRef}
        className="flex overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            className={cn(
              "relative flex-shrink-0 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
              activeId === item.id
                ? "text-gold"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            {item.label}
            <span
              className={cn(
                "absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-transform duration-300",
                activeId === item.id ? "bg-gold scale-x-100" : "bg-gold/0 scale-x-0"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
