import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Shield, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const COOKIE_KEY = "bsga-cookie-consent";

type Prefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (prefs: Omit<Prefs, "timestamp">) => {
    const payload: Prefs = { ...prefs, timestamp: new Date().toISOString() };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(payload));
    setVisible(false);
    setShowDetails(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const saveCustom = () => save({ necessary: true, analytics, marketing });

  if (!visible) return null;

  return (
    <>
      {showDetails && (
        <div
          className="fixed inset-0 z-[59] bg-black/50"
          onClick={() => setShowDetails(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border bg-card shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <div className="mx-auto max-w-6xl">
          {/* Compact view – classic full-width bar */}
          {!showDetails && (
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between md:gap-6">
              <p className="flex-1 text-sm text-foreground leading-relaxed">
                Táto stránka používa cookies pre základné fungovanie a analýzu návštevnosti.
                Viac informácií v{" "}
                <Link to="/gdpr" className="text-gold underline underline-offset-2 hover:text-gold-light">
                  zásadách ochrany osobných údajov
                </Link>
                .
              </p>
              <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Nastavenia
                </Button>
                <Button variant="outline" size="sm" onClick={rejectAll}>
                  Odmietnuť
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="bg-gold text-primary hover:bg-gold-light font-semibold"
                >
                  Súhlasím
                </Button>
              </div>
            </div>
          )}

          {/* Detailed preferences */}
          {showDetails && (
            <div className="relative p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    Nastavenia cookies
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Spravujte, aké kategórie cookies chcete povoliť.
                  </p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Zavrieť"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {/* Necessary */}
                <div className="flex items-start gap-4 rounded-md border border-border bg-muted/40 p-4">
                  <div className="rounded-md bg-gold/10 p-2.5 flex-shrink-0">
                    <Shield className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h4 className="font-semibold text-foreground text-sm">Nevyhnutné</h4>
                      <span className="text-xs font-medium text-muted-foreground">
                        Vždy aktívne
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Potrebné pre základné fungovanie stránky (navigácia, formuláre, bezpečnosť). Nemožno ich vypnúť.
                    </p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-4 rounded-md border border-border p-4">
                  <div className="rounded-md bg-muted p-2.5 flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h4 className="font-semibold text-foreground text-sm">Analytické</h4>
                      <Switch checked={analytics} onCheckedChange={setAnalytics} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Pomáhajú nám pochopiť, ako návštevníci používajú web, aby sme ho mohli vylepšovať.
                    </p>
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start gap-4 rounded-md border border-border p-4">
                  <div className="rounded-md bg-muted p-2.5 flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h4 className="font-semibold text-foreground text-sm">Marketingové</h4>
                      <Switch checked={marketing} onCheckedChange={setMarketing} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Používané na zobrazenie relevantných reklám a meranie efektivity kampaní.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button variant="outline" size="sm" onClick={rejectAll}>
                  Iba nevyhnutné
                </Button>
                <Button variant="outline" size="sm" onClick={saveCustom}>
                  Uložiť výber
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="bg-gold text-primary hover:bg-gold-light font-semibold"
                >
                  Súhlasím so všetkým
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-5">
                Viac informácií nájdete v{" "}
                <Link to="/gdpr" className="text-gold underline underline-offset-2 hover:text-gold-light">
                  zásadách ochrany osobných údajov
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
