import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Briefcase, Trophy, Star, Mail } from "lucide-react";
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
  { name: "Akadémia", href: "/akademia", icon: Star },
  { name: "Kontakt", href: "/#kontakt", icon: Mail },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get active tab index based on current route (counting only non-separator items)
  const getActiveIndex = (): number | null => {
    const currentPath = location.pathname;
    let tabIndex = 0;

    for (let i = 0; i < navLinks.length; i++) {
      const link = navLinks[i];
      if (!isNavLink(link)) continue;

      if (link.href === currentPath) {
        return tabIndex;
      }
      if (link.href === "/#kontakt" && currentPath === "/" && location.hash === "#kontakt") {
        return tabIndex;
      }
      tabIndex++;
    }
    
    // Default to home if on root
    if (currentPath === "/") return 0;
    return null;
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

  // Update active tab when route changes
  useEffect(() => {
    setActiveTab(getActiveIndex());
  }, [location.pathname, location.hash]);

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
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={bsgaLogo} alt="BSGA - Best Swing Golf Academy" className="h-12 sm:h-16 md:h-20 w-auto" />
          </Link>

          {/* ExpandableTabs for all screen sizes */}
          <div className="flex-shrink-0">
            <ExpandableTabs
              tabs={tabs}
              activeColor="text-gold"
              activeIndex={activeTab}
              onNavigate={handleNavigate}
              className="text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
