import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "bsga-cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-6 sm:flex sm:items-center sm:gap-6">
        <div className="flex items-start gap-3 sm:flex-1">
          <div className="rounded-lg bg-gold/10 p-2 flex-shrink-0">
            <Cookie className="h-5 w-5 text-gold" />
          </div>
          <p className="text-sm text-muted-foreground">
            Táto stránka používa cookies na zlepšenie vášho zážitku. Viac informácií nájdete v našich{" "}
            <Link to="/gdpr" className="text-gold underline hover:text-gold-light">
              zásadách ochrany osobných údajov
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0 sm:flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="flex-1 sm:flex-none"
          >
            Odmietnuť
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1 sm:flex-none bg-gold text-primary hover:bg-gold-light"
          >
            Súhlasím
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
