import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X, Shield, BarChart3, Sparkles } from "lucide-react";
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
      {/* Subtle backdrop when details expanded */}
      {showDetails && (
        <div
          className="fixed inset-0 z-[59] bg-background/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowDetails(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-6 animate-in slide-in-from-bottom-8 duration-500">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl">
          {/* Top accent line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Compact view */}
          {!showDetails && (
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-start gap-4 sm:flex-1">
                  <div className="rounded-xl bg-gold/10 p-3 flex-shrink-0">
                    <Cookie className="h-6 w-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      Vážime si vaše súkromie
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Používame cookies na zlepšenie vášho zážitku, analýzu návštevnosti a personalizáciu obsahu. Kliknutím na „Súhlasím" povolíte všetky kategórie. Viac v{" "}
                      <Link to="/gdpr" className="text-gold underline-offset-4 hover:underline">
                        zásadách ochrany údajov
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Nastavenia
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={rejectAll}
                    className="border-border"
                  >
                    Odmietnuť
                  </Button>
                  <Button
                    size="sm"
                    onClick={acceptAll}
                    className="bg-gold text-background hover:bg-gold-light font-semibold shadow-md shadow-gold/20"
                  >
                    Súhlasím so všetkým
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Detailed preferences */}
          {showDetails && (
            <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground">
                    Nastavenia cookies
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Spravujte, aké kategórie cookies chcete povoliť.
                  </p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Zavrieť"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {/* Necessary */}
                <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="rounded-lg bg-gold/10 p-2 flex-shrink-0">
                    <Shield className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h4 className="font-semibold text-foreground text-sm">Nevyhnutné</h4>
                      <span className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-background border border-border">
                        Vždy aktívne
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Potrebné pre základné fungovanie stránky (navigácia, formuláre, bezpečnosť). Nemožno ich vypnúť.
                    </p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-4 rounded-xl border border-border/60 p-4">
                  <div className="rounded-lg bg-gold/10 p-2 flex-shrink-0">
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
                <div className="flex items-start gap-4 rounded-xl border border-border/60 p-4">
                  <div className="rounded-lg bg-gold/10 p-2 flex-shrink-0">
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={saveCustom}
                  className="border-gold/40 text-foreground hover:bg-gold/10"
                >
                  Uložiť výber
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="bg-gold text-background hover:bg-gold-light font-semibold"
                >
                  Súhlasím so všetkým
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-5">
                Viac informácií nájdete v{" "}
                <Link to="/gdpr" className="text-gold underline-offset-4 hover:underline">
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
