import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Users, Briefcase, Trophy, Image, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import bsgaLogo from "@/assets/bsga-logo.png";
import { ExpandableTabs, type TabItem } from "@/components/ui/expandable-tabs";

type NavLink = {
  type?: "link";
  name: string;
  href: string;
  icon: typeof Home;
};

type NavSeparator = {
  type: "separator";
};

type NavItem = NavLink | NavSeparator;

function isNavLink(item: NavItem): item is NavLink {
  return item.type !== "separator";
}

const navLinks: NavItem[] = [
  { name: "Domov", href: "/", icon: Home },
  { name: "O nás", href: "/o-nas", icon: Users },
  { name: "Služby", href: "/sluzby", icon: Briefcase },
  { type: "separator" },
  { name: "Tour 2026", href: "/tour", icon: Trophy },
  { name: "Galéria", href: "/galeria", icon: Image },
  { name: "Kontakt", href: "/#kontakt", icon: Mail },
];

const mobileNavLinks = [
  { name: "Domov", href: "/" },
  { name: "O nás", href: "/o-nas" },
  { name: "Služby", href: "/sluzby" },
  { name: "Tour 2026", href: "/tour" },
  { name: "Galéria", href: "/galeria" },
  { name: "Kontakt", href: "/#kontakt" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Get active tab index based on current route
  const getActiveIndex = (): number | null => {
    const currentPath = location.pathname;
    let tabIndex = 0;

    for (let i = 0; i < navLinks.length; i++) {
      const link = navLinks[i];
      if (!isNavLink(link)) continue;

      if (
        link.href === currentPath ||
        (link.href === "/#kontakt" && currentPath === "/" && location.hash === "#kontakt")
      ) {
        return tabIndex;
      }
      tabIndex++;
    }
    return currentPath === "/" ? 0 : null;
  };

  // Convert navLinks to tabs format
  const tabs: TabItem[] = navLinks.map((link) => {
    if (!isNavLink(link)) {
      return { type: "separator" as const };
    }
    return {
      title: link.name,
      icon: link.icon,
      href: link.href,
    };
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    if (href.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(href.slice(2));
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md py-2 sm:py-3">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={bsgaLogo} alt="BSGA - Best Swing Golf Academy" className="h-14 sm:h-20 w-auto" />
          </Link>

          {/* Desktop: ExpandableTabs */}
          <div className="hidden md:block">
            <ExpandableTabs
              tabs={tabs}
              activeColor="text-gold"
              activeIndex={getActiveIndex()}
              onNavigate={handleNavigate}
            />
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className="relative md:hidden" ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground transition-colors duration-300 flex items-center gap-2 hover:text-gold"
            >
              <span className="text-sm font-medium tracking-wide">MENU</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Dropdown Menu */}
            <div
              className={cn(
                "absolute right-0 top-full mt-2 w-56 bg-background rounded-lg shadow-xl border border-border overflow-hidden transition-all duration-300 origin-top-right",
                isOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}
            >
              <div className="py-2">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "block px-6 py-3 text-foreground text-sm font-medium tracking-wide transition-colors hover:bg-muted hover:text-gold",
                      location.pathname === link.href && "text-gold bg-muted"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
