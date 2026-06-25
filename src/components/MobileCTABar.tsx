import { Phone, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";

const HIDE_ON = ["/auth", "/admin"];

const MobileCTABar = () => {
  const { pathname } = useLocation();
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <>
      {/* spacer so fixed bar doesn't overlap footer content on mobile */}
      <div aria-hidden className="h-20 md:hidden" />
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden px-3 pb-[env(safe-area-inset-bottom)] pointer-events-none">
        <div className="flex items-center gap-3 p-3 pointer-events-auto">
          <a
            href="tel:+421917225276"
            aria-label="Zavolať BSGA"
            className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-primary-foreground/25 to-primary-foreground/10 px-4 py-3 text-sm font-bold text-primary-foreground shadow-[0_4px_0_0_hsl(var(--primary-foreground)/0.35),0_6px_12px_rgba(0,0,0,0.25)] ring-1 ring-inset ring-primary-foreground/25 transition-all duration-150 hover:-translate-y-1 hover:from-primary-foreground/35 hover:to-primary-foreground/15 hover:shadow-[0_6px_0_0_hsl(var(--primary-foreground)/0.35),0_10px_20px_rgba(0,0,0,0.3)] active:translate-y-[2px] active:shadow-[0_2px_0_0_hsl(var(--primary-foreground)/0.35),0_3px_6px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Phone className="h-4 w-4 text-gold transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
            Zavolať
          </a>
          <a
            href="mailto:info@bsga.sk?subject=Mám záujem o lekciu"
            aria-label="Kontaktovať BSGA emailom"
            className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-gold to-gold-dark px-4 py-3 text-sm font-bold text-primary shadow-[0_4px_0_0_hsl(var(--gold-dark)/0.8),0_6px_12px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/25 transition-all duration-150 hover:-translate-y-1 hover:from-gold-light hover:to-gold hover:shadow-[0_6px_0_0_hsl(var(--gold-dark)/0.8),0_10px_20px_rgba(0,0,0,0.35)] active:translate-y-[2px] active:shadow-[0_2px_0_0_hsl(var(--gold-dark)/0.8),0_3px_6px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
            Kontaktuj nás
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileCTABar;
