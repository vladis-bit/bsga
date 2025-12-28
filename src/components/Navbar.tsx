import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Domov", href: "/" },
  { name: "O nás", href: "/o-nas" },
  { name: "Služby", href: "/sluzby" },
  { name: "Tour 2026", href: "/tour" },
  { name: "Galéria", href: "/galeria" },
  { name: "Kontakt", href: "/#kontakt" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span
              className={cn(
                "text-2xl font-serif font-bold tracking-wider transition-colors duration-300",
                scrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              BSGA
            </span>
          </Link>

          {/* Menu Button - Right Corner */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 transition-colors duration-300 flex items-center gap-2",
                scrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              <span className="text-sm font-medium tracking-wide hidden sm:inline">MENU</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Dropdown Menu */}
            <div
              className={cn(
                "absolute right-0 top-full mt-2 w-56 bg-background/98 backdrop-blur-md rounded-lg shadow-xl border border-border overflow-hidden transition-all duration-300 origin-top-right",
                isOpen 
                  ? "opacity-100 scale-100 translate-y-0" 
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}
            >
              <div className="py-2">
                {navLinks.map((link) => (
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
