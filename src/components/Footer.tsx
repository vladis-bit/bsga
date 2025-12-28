import { Link } from "react-router-dom";
import { Instagram, Facebook, ExternalLink, FolderOpen } from "lucide-react";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">BSGA</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Best Swing Golf Academy - najväčšia golfová akadémia na
              Slovensku. Od roku 2016 pomáhame ľuďom objavovať krásu golfu.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://linktr.ee" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all">
                <ExternalLink size={18} />
              </a>
              <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all">
                <FolderOpen size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6">Navigácia</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Domov
                </Link>
              </li>
              <li>
                <Link to="/o-nas" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/sluzby" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Služby
                </Link>
              </li>
              <li>
                <Link to="/tour" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Tour 2026
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Galéria
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6">Služby</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-primary-foreground/70">
                  Individuálne lekcie
                </span>
              </li>
              <li>
                <span className="text-primary-foreground/70">
                  Skupinové lekcie
                </span>
              </li>
              <li>
                <span className="text-primary-foreground/70">Zelené karty</span>
              </li>
              <li>
                <span className="text-primary-foreground/70">
                  Detská akadémia
                </span>
              </li>
              <li>
                <span className="text-primary-foreground/70">
                  Firemné akcie
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6">Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@bsga.sk" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  info@bsga.sk
                </a>
              </li>
              <li>
                <a href="mailto:touroffice@bsga.sk" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  touroffice@bsga.sk
                </a>
              </li>
              <li>
                
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} BSGA. Všetky práva vyhradené.
            </p>
            <div className="flex gap-6">
              <Link to="/gdpr" className="text-primary-foreground/50 text-sm hover:text-gold transition-colors">
                Zásady ochrany osobných údajov
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;