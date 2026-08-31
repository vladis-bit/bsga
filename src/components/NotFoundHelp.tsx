import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Home, Wrench, Flag, Trophy, Phone, ArrowRight } from "lucide-react";

const quickLinks = [
  { name: "Služby", href: "/sluzby", icon: Wrench },
  { name: "Začni s golfom", href: "/zacni-s-golfom", icon: Flag },
  { name: "BSGA Tour", href: "/tour", icon: Trophy },
  { name: "Kontakt", href: "/#kontakt", icon: Phone },
  { name: "Domov", href: "/", icon: Home },
];

const searchablePages = [
  ...quickLinks,
  { name: "O nás / Tréneri", href: "/o-nas", icon: undefined },
  { name: "Juniorský golf", href: "/akademia", icon: undefined },
  { name: "Eventy", href: "/eventy", icon: undefined },
  { name: "Fitting", href: "/fitting", icon: undefined },
  { name: "Obchod", href: "/obchod", icon: undefined },
  { name: "Edukačné centrum", href: "/edukacne-centrum", icon: undefined },
  { name: "Galéria", href: "/galeria", icon: undefined },
  { name: "Obchodné podmienky", href: "/obchodne-podmienky", icon: undefined },
  { name: "Ochrana osobných údajov", href: "/gdpr", icon: undefined },
];

export function NotFoundHelp() {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchablePages
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = activeIndex >= 0 ? filtered[activeIndex] : filtered[0];
    if (target) navigate(target.href);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              to={link.href}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-5 py-4 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-gold/50 hover:bg-muted hover:text-gold"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-gold transition-colors group-hover:bg-background group-hover:text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex-1">{link.name}</span>
              <ArrowRight className="h-4 w-4 shrink-0 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-gold" />
            </Link>
          );
        })}
      </div>

      <div role="search" className="relative">
        <label htmlFor="notfound-search" className="sr-only">
          Hľadať na webe
        </label>
        <form onSubmit={handleSubmit} className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="notfound-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Napíšte názov stránky, napr. 'Tour' alebo 'Fitting'..."
            className="w-full rounded-2xl border border-border bg-background/80 py-4 pl-12 pr-5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm backdrop-blur-sm transition-all focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls="notfound-suggestions"
            aria-activedescendant={
              activeIndex >= 0 ? `notfound-option-${activeIndex}` : undefined
            }
          />
        </form>

        {filtered.length > 0 && (
          <ul
            ref={listRef}
            id="notfound-suggestions"
            role="listbox"
            aria-label="Návrhy stránok"
            className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
          >
            {filtered.map((item, index) => (
              <li key={item.href} role="option" aria-selected={index === activeIndex}>
                <Link
                  to={item.href}
                  id={`notfound-option-${index}`}
                  className={`flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                    index === activeIndex
                      ? "bg-muted text-gold"
                      : "text-foreground hover:bg-muted hover:text-gold"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span>{item.name}</span>
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query.trim() && filtered.length === 0 && (
          <p className="mt-3 px-1 text-sm text-muted-foreground">
            Pre výraz “{query.trim()}” sme nenašli žiadnu stránku.
          </p>
        )}
      </div>
    </div>
  );
}
