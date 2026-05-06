import { Link } from "react-router-dom";
import { useState } from "react";
import { Instagram, Facebook, ExternalLink, FolderOpen, Phone, Mail, Send, MapPin, ArrowUpRight } from "lucide-react";
import bsgaLogo from "@/assets/bsga-footer-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase() });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast({ title: "Už ste prihlásení", description: "Tento email je už v našom newslettri." });
      } else {
        toast({ title: "Chyba", description: "Nepodarilo sa prihlásiť. Skúste znova.", variant: "destructive" });
      }
      return;
    }
    toast({ title: "Ďakujeme!", description: "Boli ste úspešne prihlásení na odber noviniek." });
    setEmail("");
  };

  const linkClass = "group inline-flex items-center gap-1.5 text-background/60 hover:text-gold transition-colors text-sm";

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10">
        {/* Top — Brand statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-12 sm:pb-16 border-b border-background/10">
          <div className="lg:col-span-5">
            <img src={bsgaLogo} alt="BSGA - Best Swing Golf Academy" className="h-14 sm:h-16 w-auto mb-6" />
            <p className="font-serif text-2xl sm:text-3xl leading-snug text-background mb-4">
              Najväčšia golfová akadémia na Slovensku.
            </p>
            <p className="text-background/60 text-sm leading-relaxed max-w-md">
              Od roku 2016 pomáhame ľuďom objavovať krásu golfu — od prvého odpalu až po profesionálnu úroveň.
            </p>

            {/* Socials */}
            <div className="flex gap-2.5 mt-8">
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
                  className="w-10 h-10 rounded-full border border-background/15 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-foreground transition-all"
                >
                  <Icon className="w-[16px] h-[16px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold/80 mb-5">Navigácia</h4>
              <ul className="space-y-3">
                <li><Link to="/" className={linkClass}>Domov</Link></li>
                <li><Link to="/o-nas" className={linkClass}>O nás</Link></li>
                <li><Link to="/sluzby" className={linkClass}>Služby</Link></li>
                <li><Link to="/zacni-s-golfom" className={linkClass}>Začni s golfom</Link></li>
                <li><Link to="/tour" className={linkClass}>BSGA Tour</Link></li>
                <li><Link to="/akademia" className={linkClass}>Akadémia</Link></li>
                <li><Link to="/obchod" className={linkClass}>Obchod</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold/80 mb-5">Objavte</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://bsga-performance-center.reenio.sk/sk/terms/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Performance Centre <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li><Link to="/edukacne-centrum" className={linkClass}>Edukačné centrum</Link></li>
                <li><Link to="/fitting" className={linkClass}>Fitting</Link></li>
                <li><Link to="/galeria" className={linkClass}>Galéria</Link></li>
                <li><Link to="/o-nas#kariera" className={linkClass}>Kariéra</Link></li>
                <li><Link to="/#kontakt" className={linkClass}>Kontakt</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold/80 mb-5">Kontakt</h4>
              <ul className="space-y-3 mb-6">
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

              {/* Newsletter under Kontakt */}
              <div className="border-t border-background/10 pt-5">
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase">Newsletter</span>
                <p className="text-background/50 text-xs mt-1.5 mb-3 leading-relaxed">
                  Novinky, turnaje a ponuky priamo do mailu.
                </p>
                <form onSubmit={handleSubscribe}>
                  <div className="relative flex items-center bg-background/5 border border-background/15 rounded-full p-1 focus-within:border-gold/60 transition-colors">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="flex-1 bg-transparent px-3 py-2 text-xs text-background placeholder:text-background/40 focus:outline-none min-w-0"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-8 rounded-full bg-gold text-foreground font-bold px-3 text-xs hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      {loading ? "..." : (<>Prihlásiť <Send className="w-3 h-3" /></>)}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/40 text-xs">
            © {new Date().getFullYear()} Best Swing Golf Academy. Všetky práva vyhradené.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/obchodne-podmienky" className="text-background/40 text-xs hover:text-gold transition-colors">
              Obchodné podmienky
            </Link>
            <Link to="/gdpr" className="text-background/40 text-xs hover:text-gold transition-colors">
              Ochrana údajov
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
