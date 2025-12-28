import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import bsgaLogo from "@/assets/bsga-logo.png";
const navLinks = [{
  name: "Domov",
  href: "/"
}, {
  name: "O nás",
  href: "/o-nas"
}, {
  name: "Služby",
  href: "/sluzby"
}, {
  name: "Tour 2026",
  href: "/tour"
}, {
  name: "Galéria",
  href: "/galeria"
}, {
  name: "Kontakt",
  href: "/#kontakt"
}];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
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
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md py-2 sm:py-3">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={bsgaLogo} alt="BSGA - Best Swing Golf Academy" className="h-16 sm:h-24 w-auto" />
            <span className="sm:text-2xl font-bold text-foreground tracking-wide font-mono text-2xl">BSGA</span>
          </Link>

          {/* Menu Button - Right Corner */}
          <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground transition-colors duration-300 flex items-center gap-2 hover:text-gold">
              <span className="text-sm font-medium tracking-wide hidden sm:inline">MENU</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Dropdown Menu */}
            <div className={cn("absolute right-0 top-full mt-2 w-56 bg-background rounded-lg shadow-xl border border-border overflow-hidden transition-all duration-300 origin-top-right", isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none")}>
              <div className="py-2">
                {navLinks.map(link => <Link key={link.name} to={link.href} className={cn("block px-6 py-3 text-foreground text-sm font-medium tracking-wide transition-colors hover:bg-muted hover:text-gold", location.pathname === link.href && "text-gold bg-muted")}>
                    {link.name}
                  </Link>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;