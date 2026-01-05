import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import bsgaLogo from "@/assets/bsga-web-logo.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
  { name: "O nás", href: "/o-nas" },
  { name: "Služby", href: "/sluzby" },
  { type: "separator" },
  { name: "Tour 2026", href: "/tour" },
  { name: "Akadémia", href: "/akademia" },
  { name: "Kontakt", href: "/#kontakt" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md py-2 sm:py-3">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src={bsgaLogo}
              alt="BSGA - Best Swing Golf Academy"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[200px] sm:max-w-[280px] md:max-w-none"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item, index) => {
              if (!isNavLink(item)) {
                return (
                  <span
                    key={`sep-${index}`}
                    className="text-border mx-3"
                  >
                    |
                  </span>
                );
              }
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavigate(item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-gold ${
                    isActive(item.href)
                      ? "text-gold"
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Mobile/Tablet Hamburger Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Otvoriť menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] pt-12">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((item, index) => {
                    if (!isNavLink(item)) {
                      return (
                        <div
                          key={`sep-${index}`}
                          className="h-px bg-border my-3"
                        />
                      );
                    }
                    return (
                      <SheetClose asChild key={item.href}>
                        <button
                          onClick={() => handleNavigate(item.href)}
                          className={`px-4 py-3 text-left text-base font-medium rounded-lg transition-colors hover:bg-gold/10 hover:text-gold ${
                            isActive(item.href)
                              ? "text-gold bg-gold/5"
                              : "text-foreground"
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
