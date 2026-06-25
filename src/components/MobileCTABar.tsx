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
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-gold/30 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center gap-3 p-3">
          <a
            href="tel:+421917225276"
            aria-label="Zavolať BSGA"
            className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-primary-foreground/20 to-primary-foreground/10 px-4 py-3 text-sm font-bold text-primary-foreground shadow-[0_4px_0_0_hsl(var(--primary-foreground)/0.25),0_6px_12px_rgba(0,0,0,0.25)] ring-1 ring-inset ring-primary-foreground/20 transition-all active:translate-y-[2px] active:shadow-[0_2px_0_0_hsl(var(--primary-foreground)/0.25),0_3px_6px_rgba(0,0,0,0.2)]"
          >
            <Phone className="h-4 w-4 text-gold transition-transform group-hover:scale-110" />
            Zavolať
          </a>
          <a
            href="mailto:info@bsga.sk?subject=Mám záujem o lekciu"
            aria-label="Kontaktovať BSGA emailom"
            className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-gold to-gold-dark px-4 py-3 text-sm font-bold text-primary shadow-[0_4px_0_0_hsl(var(--gold-dark)/0.8),0_6px_12px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/25 transition-all active:translate-y-[2px] active:shadow-[0_2px_0_0_hsl(var(--gold-dark)/0.8),0_3px_6px_rgba(0,0,0,0.25)]"
          >
            <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
            Kontaktuj nás
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileCTABar;
