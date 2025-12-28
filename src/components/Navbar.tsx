import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook, ExternalLink } from "lucide-react";
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-all duration-300 hover:text-gold",
                  scrolled ? "text-foreground" : "text-primary-foreground",
                  location.pathname === link.href && "text-gold"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Icons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors duration-300 hover:text-gold",
                scrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors duration-300 hover:text-gold",
                scrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              <Facebook size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors duration-300",
              scrolled ? "text-foreground" : "text-primary-foreground"
            )}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Roll Down */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-background/98 backdrop-blur-md",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-foreground text-lg font-medium py-2 border-b border-border transition-colors hover:text-gold",
                location.pathname === link.href && "text-gold"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-6 pt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-gold transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-gold transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://linktr.ee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-gold transition-colors"
            >
              <ExternalLink size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
