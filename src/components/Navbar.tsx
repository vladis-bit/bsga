import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import bsgaLogo from "@/assets/logo2.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

type NavLink = {
  type?: "link";
  name: string;
  href: string;
};
type NavSeparator = {
  type: "separator";
};
type NavItem = NavLink | NavSeparator;

function isNavLink(item: NavItem): item is NavLink {
  return item.type !== "separator";
}

const navLinks: NavItem[] = [
  { name: "Domov", href: "/" },
  { name: "O nás - tréneri", href: "/o-nas" },
  { name: "Služby", href: "/sluzby" },
  { type: "separator" },
  { name: "Začni s golfom", href: "/zacni-s-golfom" },
  { name: "Juniorský golf", href: "/akademia" },
  { name: "BSGA Tour", href: "/tour" },
  { name: "Eventy", href: "/eventy" },
  { name: "Fitting", href: "/fitting" },
  { name: "Obchod", href: "/obchod" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollY.current;

      setIsScrolled(currentY > 20);

      if (currentY < 50) {
        setIsVisible(true);
      } else if (goingDown && currentY - lastScrollY.current > 5) {
        setIsVisible(false);
      } else if (!goingDown && lastScrollY.current - currentY > 5) {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string): boolean => {
    if (href === "/#kontakt") {
      return location.pathname === "/" && location.hash === "#kontakt";
    }
    return location.pathname === href;
  };

  const handleNavigate = (href: string) => {
    setIsOpen(false);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-border/50 py-1 sm:py-1.5"
          : "bg-background/95 backdrop-blur-md border-transparent py-2 sm:py-3"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img loading="lazy" decoding="async"
              alt="BSGA - Best Swing Golf Academy"
              className={`w-auto transition-all duration-300 ${
                isScrolled ? "h-8 sm:h-10 md:h-11 lg:h-12" : "h-10 sm:h-12 md:h-14 lg:h-16"
              }`}
              src={bsgaLogo}
            />
          </Link>

          {/* Desktop horizontal navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.filter(isNavLink).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isActive(item.href)
                    ? "text-gold bg-gold/10"
                    : "text-foreground/80 hover:text-gold hover:bg-gold/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Hamburger Menu (mobile / tablet) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Otvoriť menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] pt-8 px-6">
                <div className="flex items-center mb-8">
                  <img loading="lazy" decoding="async"
                    alt="BSGA"
                    className="h-10 w-auto"
                    src={bsgaLogo}
                  />
                </div>
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((item, index) => {
                    if (!isNavLink(item)) {
                      return <div key={`sep-${index}`} className="h-px bg-border/50 my-2" />;
                    }
                    return (
                      <SheetClose asChild key={item.href}>
                        <button
                          onClick={() => handleNavigate(item.href)}
                          className={`px-5 py-3.5 text-left text-base font-medium rounded-xl transition-all duration-200 ${
                            isActive(item.href)
                              ? "text-gold bg-gold/15 border border-gold/30"
                              : "text-foreground border border-transparent hover:bg-gold/10 hover:text-gold hover:border-gold/20"
                          }`}
                        >
                          {item.name}
                        </button>
                  </SheetClose>
                );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
