import { Phone, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";

const HIDE_ON = ["/auth", "/admin"];

const MobileCTABar = () => {
  const { pathname } = useLocation();
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-gold/30 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <div className="grid grid-cols-2">
        <a
          href="tel:+421917225276"
          aria-label="Zavolať BSGA"
          className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-primary-foreground active:bg-primary-foreground/10"
        >
          <Phone className="h-4 w-4 text-gold" />
          Zavolať
        </a>
        <a
          href="mailto:info@bsga.sk?subject=Mám záujem o lekciu"
          aria-label="Napísať email BSGA"
          className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-primary bg-gold active:bg-gold-light"
        >
          <Mail className="h-4 w-4" />
          Rezervovať lekciu
        </a>
      </div>
    </div>
  );
};

export default MobileCTABar;