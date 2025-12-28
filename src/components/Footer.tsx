import { Link } from "react-router-dom";
import { Instagram, Facebook, ExternalLink, FolderOpen } from "lucide-react";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4">BSGA</h3>
            <p className="text-primary-foreground/70 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Best Swing Golf Academy - najväčšia golfová akadémia na
              Slovensku. Od roku 2016 pomáhame ľuďom objavovať krásu golfu.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all">
                <Instagram className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all">
                <Facebook className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://linktr.ee" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all">
                <ExternalLink className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all">
                <FolderOpen className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 sm:mb-6 text-sm sm:text-base">Navigácia</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  Domov
                </Link>
              </li>
              <li>
                <Link to="/o-nas" className="text-primary-foreground/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/sluzby" className="text-primary-foreground/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  Služby
                </Link>
              </li>
              <li>
                <Link to="/tour" className="text-primary-foreground/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  Tour 2026
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-primary-foreground/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  Galéria
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 sm:mb-6 text-sm sm:text-base">Služby</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <span className="text-primary-foreground/70 text-xs sm:text-sm">
                  Individuálne lekcie
                </span>
              </li>
              <li>
                <span className="text-primary-foreground/70 text-xs sm:text-sm">
                  Skupinové lekcie
                </span>
              </li>
              <li>
                <span className="text-primary-foreground/70 text-xs sm:text-sm">Zelené karty</span>
              </li>
              <li>
                <span className="text-primary-foreground/70 text-xs sm:text-sm">
                  Detská akadémia
                </span>
              </li>
              <li>
                <span className="text-primary-foreground/70 text-xs sm:text-sm">
                  Firemné akcie
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 sm:mb-6 text-sm sm:text-base">Kontakt</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="mailto:info@bsga.sk" className="text-primary-foreground/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  info@bsga.sk
                </a>
              </li>
              <li>
                <a href="mailto:touroffice@bsga.sk" className="text-primary-foreground/70 hover:text-gold transition-colors text-xs sm:text-sm">
                  touroffice@bsga.sk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-primary-foreground/50 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} BSGA. Všetky práva vyhradené.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link to="/gdpr" className="text-primary-foreground/50 text-xs sm:text-sm hover:text-gold transition-colors">
                Zásady ochrany osobných údajov
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;