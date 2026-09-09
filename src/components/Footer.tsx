import { Link } from "react-router-dom";
import { Instagram, Facebook, ExternalLink, FolderOpen, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import bsgaLogo from "@/assets/bsga-footer-logo.png";

const serviceLinks = [
  { label: "Individuálne lekcie", href: "/zacni-s-golfom#zlepsuj-sa" },
  { label: "Skupinové lekcie", href: "/zacni-s-golfom#zlepsuj-sa" },
  { label: "Víkendový kurz ZK", href: "/zacni-s-golfom#vikendovy-kurz" },
  { label: "Kurz Zelenej karty", href: "/zacni-s-golfom#zelena-karta" },
  { label: "BSGA Junior Level System", href: "/akademia#junior-level-system" },
  { label: "Detské tábory", href: "/akademia#tabory" },
  { label: "Firemné akcie a teambuildingy", href: "/firemne-akcie" },
  { label: "Turnaje – BSGA Tour", href: "/tour" },
  { label: "Fitting – vybavenie na mieru", href: "/fitting" },
  { label: "Eventy a \u00a0golfové pobyty", href: "/eventy" },
  { label: "Course Management", href: "/zacni-s-golfom#dominuj" },
  { label: "Performance Center", href: "https://bsga-performance-center.reenio.sk/sk/terms/", external: true },
];

const serviceLinksLeft = serviceLinks.slice(0, 6);
const serviceLinksRight = serviceLinks.slice(6, 12);

const Footer = () => {
  const linkClass = "group inline-flex items-center gap-1.5 text-background/60 hover:text-gold transition-colors text-sm";
  const columnHeadingClass = "mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold";

  const renderServiceLink = ({ label, href, external }: typeof serviceLinks[0]) => (
    <li key={label}>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {label}
          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      ) : (
        <Link to={href} className={linkClass}>
          {label}
        </Link>
      )}
    </li>
  );

  return (
    <footer className="theme-ivory relative overflow-hidden bg-foreground text-background">
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10">
        {/* Top — Brand block */}
        <div className="pb-10 sm:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <img loading="lazy" decoding="async" src={bsgaLogo} alt="BSGA - Best Swing Golf Academy" className="h-14 sm:h-16 w-auto mb-6" />
              <p className="mb-4 text-balance font-serif text-2xl leading-snug text-background sm:text-3xl">
                Najväčšia golfová akadémia na Slovensku.
              </p>
              <p className="text-background/60 text-sm leading-relaxed max-w-md">
                Od roku 2016 pomáhame ľuďom objavovať krásu golfu — od prvého odpalu až po profesionálnu úroveň.
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-2.5 lg:mb-1">
              {[
                { icon: Instagram, href: "https://www.instagram.com/bsga.sk/", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/p/Best-Swing-Golf-Academy-100057246887696/?locale=sk_SK", label: "Facebook" },
                { icon: ExternalLink, href: "https://linktr.ee/BSGAmedia", label: "Linktree" },
                { icon: FolderOpen, href: "https://drive.google.com/drive/folders/1XOqhY_QPTgG02WjEoDbi-Zb5JJH6R8Jd?usp=sharing", label: "Drive" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 transition-all hover:border-gold hover:bg-gold hover:text-foreground"
                >
                  <Icon className="w-[16px] h-[16px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 gap-10 pt-12 sm:pt-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Navigácia */}
          <div>
            <h4 className={columnHeadingClass}>Navigácia</h4>
            <ul className="space-y-3">
              <li><Link to="/" className={linkClass}>Domov</Link></li>
              <li><Link to="/o-nas" className={linkClass}>Tréneri</Link></li>
              <li><Link to="/sluzby" className={linkClass}>Služby</Link></li>
              <li><Link to="/zacni-s-golfom" className={linkClass}>Začni s golfom</Link></li>
              <li><Link to="/tour" className={linkClass}>BSGA Tour</Link></li>
              <li><Link to="/akademia" className={linkClass}>Juniorský golf</Link></li>
              <li><Link to="/obchod" className={linkClass}>Obchod</Link></li>
            </ul>
          </div>

          {/* Služby */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className={columnHeadingClass}>Služby</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <ul className="space-y-3">
                {serviceLinksLeft.map(renderServiceLink)}
              </ul>
              <ul className="space-y-3">
                {serviceLinksRight.map(renderServiceLink)}
              </ul>
            </div>
          </div>

          {/* Objavte */}
          <div>
            <h4 className={columnHeadingClass}>Objavte</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://bsga-performance-center.reenio.sk/sk/terms/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Performance Centre <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li><Link to="/edukacne-centrum" className={linkClass}>Edukačné centrum</Link></li>
              <li><Link to="/eventy" className={linkClass}>Eventy</Link></li>
              <li><Link to="/fitting" className={linkClass}>Fitting</Link></li>
              <li><Link to="/galeria" className={linkClass}>Galéria</Link></li>
              <li><Link to="/o-nas#kariera" className={linkClass}>Kariéra</Link></li>
              <li><Link to="/#kontakt" className={linkClass}>Kontakt</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className={columnHeadingClass}>Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+421917225276" className="group flex items-start gap-2.5 text-background/60 hover:text-gold transition-colors text-sm">
                  <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  +421 917 225 276
                </a>
              </li>
              <li>
                <a href="mailto:info@bsga.sk" className="group flex items-start gap-2.5 text-background/60 hover:text-gold transition-colors text-sm">
                  <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  info@bsga.sk
                </a>
              </li>
              <li>
                <a href="mailto:touroffice@bsga.sk" className="group flex items-start gap-2.5 text-background/60 hover:text-gold transition-colors text-sm">
                  <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  touroffice@bsga.sk
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-background/60 text-sm">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Bratislava, Slovensko
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-12 sm:pt-16 border-t border-background/10 mt-12 sm:mt-16">
          <p className="text-xs uppercase tracking-[0.14em] text-background/40">
            © {new Date().getFullYear()} Best Swing Golf Academy. Všetky práva vyhradené.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/obchodne-podmienky" className="text-xs uppercase tracking-[0.14em] text-background/40 transition-colors hover:text-gold whitespace-nowrap">
              Obchodné podmienky
            </Link>
            <Link to="/gdpr" className="text-xs uppercase tracking-[0.14em] text-background/40 transition-colors hover:text-gold whitespace-nowrap">
              Ochrana údajov
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
