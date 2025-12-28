import { Link } from "react-router-dom";
import { Instagram, Facebook, ExternalLink, FolderOpen } from "lucide-react";
import bsgaLogo from "@/assets/bsga-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <img src={bsgaLogo} alt="BSGA Logo" className="h-10 sm:h-12 w-auto" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold">BSGA</h3>
            </div>
            <p className="text-background/70 text-xs sm:text-sm leading-relaxed">
              Best Swing Golf Academy - najväčšia golfová akadémia na
              Slovensku. Od roku 2016 pomáhame ľuďom objavovať krásu golfu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 sm:mb-6 text-sm sm:text-base">Navigácia</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  Domov
                </Link>
              </li>
              <li>
                <Link to="/o-nas" className="text-background/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/sluzby" className="text-background/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  Služby
                </Link>
              </li>
              <li>
                <Link to="/tour" className="text-background/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  Tour 2026
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-background/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  Galéria
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Social Icons */}
          <div>
            <h4 className="font-bold mb-4 sm:mb-6 text-sm sm:text-base">Kontakt</h4>
            <ul className="space-y-2 sm:space-y-3 mb-6">
              <li>
                <a href="mailto:info@bsga.sk" className="text-background/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  info@bsga.sk
                </a>
              </li>
              <li>
                <a href="mailto:touroffice@bsga.sk" className="text-background/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  touroffice@bsga.sk
                </a>
              </li>
            </ul>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://www.instagram.com/bsga.sk/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-foreground transition-all">
                <Instagram className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://www.facebook.com/p/Best-Swing-Golf-Academy-100057246887696/?locale=sk_SK" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-foreground transition-all">
                <Facebook className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://linktr.ee/BSGAmedia" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-foreground transition-all">
                <ExternalLink className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://drive.google.com/drive/folders/1XOqhY_QPTgG02WjEoDbi-Zb5JJH6R8Jd?usp=drive_link" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-foreground transition-all">
                <FolderOpen className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-background/50 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} BSGA. Všetky práva vyhradené.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link to="/gdpr" className="text-background/50 text-xs sm:text-sm hover:text-gold transition-colors">
                Zásady ochrany osobných údajov
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;