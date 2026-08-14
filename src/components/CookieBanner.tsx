import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Shield, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { initConsent, readConsent, saveConsent } from "@/lib/consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    // Restore previously granted consent (loads scripts) or keep everything off.
    initConsent();
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
  }, []);

  useEffect(() => {
    const open = () => {
      const consent = readConsent();
      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
      setVisible(true);
      setShowDetails(true);
    };
    window.addEventListener("bsga:open-cookie-settings", open);
    return () => window.removeEventListener("bsga:open-cookie-settings", open);
  }, []);

  const save = (prefs: { analytics: boolean; marketing: boolean }) => {
    saveConsent(prefs);
    setVisible(false);
    setShowDetails(false);
  };

  const acceptAll = () => save({ analytics: true, marketing: true });
  const rejectAll = () => save({ analytics: false, marketing: false });
  const saveCustom = () => save({ analytics, marketing });

  if (!visible) return null;

  return (
    <>
      {showDetails && (
        <div
          className="fixed inset-0 z-[59] bg-black/50"
          onClick={() => setShowDetails(false)}
        />
      )}

      <div className="theme-ivory fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-5xl px-3 sm:px-6 z-[60]">
        <div className={`relative bg-card/95 text-foreground backdrop-blur-md border border-border rounded-3xl shadow-2xl overflow-hidden ${showDetails ? "" : "p-4 sm:p-6 md:p-8"}`}>
          {/* Subtle gold decorative line at the top */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Compact view – elegant dark luxury */}
          {!showDetails && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
              <div className="flex-1 text-center md:text-left">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                  Súkromie
                </span>
                <h4 className="mt-1 font-serif text-base font-bold uppercase tracking-tight text-foreground sm:text-lg mb-1.5">
                  Súbory cookies
                </h4>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Táto stránka používa cookies pre základné fungovanie a analýzu návštevnosti. Vaše údaje sú u nás v bezpečí.{" "}
                  <Link to="/gdpr" className="font-semibold text-gold underline underline-offset-4 transition-colors hover:text-foreground">
                    Viac informácií v zásadách ochrany osobných údajov
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                >
                  Nastavenia
                </button>
                <button
                  onClick={rejectAll}
                  className="rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground transition-colors hover:border-foreground hover:bg-muted sm:text-sm"
                >
                  Odmietnuť
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-full bg-gold px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-lg transition-all hover:bg-foreground active:scale-95 sm:px-8 sm:text-sm"
                >
                  Súhlasím
                </button>
              </div>
            </div>
          )}

          {/* Detailed preferences */}
          {showDetails && (
            <div className="relative p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-serif text-lg font-bold uppercase tracking-tight text-foreground sm:text-xl">
                    Nastavenia cookies
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Spravujte, aké kategórie cookies chcete povoliť.
                  </p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Zavrieť"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {/* Necessary */}
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-muted/40 p-4">
                  <div className="rounded-full bg-gold/10 p-2.5 flex-shrink-0">
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
                <div className="flex items-start gap-4 rounded-2xl border border-border p-4">
                  <div className="rounded-full bg-muted p-2.5 flex-shrink-0">
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
                <div className="flex items-start gap-4 rounded-2xl border border-border p-4">
                  <div className="rounded-full bg-muted p-2.5 flex-shrink-0">
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
                <Button variant="outline" size="sm" onClick={rejectAll} className="rounded-full">
                  Iba nevyhnutné
                </Button>
                <Button variant="outline" size="sm" onClick={saveCustom} className="rounded-full">
                  Uložiť výber
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="rounded-full bg-gold text-primary-foreground hover:bg-foreground font-bold"
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
