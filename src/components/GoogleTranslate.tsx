import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const LANG_COOKIE = "googtrans";

const setLangCookie = (lang: "sk" | "en") => {
  const value = lang === "sk" ? "/sk/sk" : "/sk/en";
  // Set on root and host so widget picks it up
  const host = window.location.hostname;
  const rootDomain = host.split(".").slice(-2).join(".");
  document.cookie = `${LANG_COOKIE}=${value};path=/`;
  document.cookie = `${LANG_COOKIE}=${value};path=/;domain=${host}`;
  if (rootDomain && rootDomain !== host) {
    document.cookie = `${LANG_COOKIE}=${value};path=/;domain=.${rootDomain}`;
  }
};

const getCurrentLang = (): "sk" | "en" => {
  const match = document.cookie.match(/googtrans=\/[^/]+\/([a-z]{2})/);
  return match?.[1] === "en" ? "en" : "sk";
};

/**
 * Hook to read the active Google Translate language.
 * Returns "sk" or "en". Useful for conditionally rendering EN-specific labels
 * (e.g. "Sign up" instead of GT's auto-translated "Log in" for "Prihlásiť sa").
 */
export const useTranslateLang = (): "sk" | "en" => {
  const [lang, setLang] = useState<"sk" | "en">(() =>
    typeof document !== "undefined" ? getCurrentLang() : "sk"
  );
  useEffect(() => {
    const onChange = () => setLang(getCurrentLang());
    window.addEventListener("bsga-lang-change", onChange);
    return () => window.removeEventListener("bsga-lang-change", onChange);
  }, []);
  return lang;
};

const GoogleTranslate = () => {
  const [lang, setLang] = useState<"sk" | "en">("sk");

  useEffect(() => {
    setLang(getCurrentLang());

    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      // eslint-disable-next-line new-cap
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "sk",
          includedLanguages: "en,sk",
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const switchLang = (next: "sk" | "en") => {
    setLangCookie(next);
    setLang(next);
    window.dispatchEvent(new CustomEvent("bsga-lang-change"));
    // Reload to apply translation cleanly
    window.location.reload();
  };

  return (
    <>
      {/* Hidden Google widget mount point */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 gap-1.5 text-foreground hover:text-gold hover:bg-gold/10 notranslate"
            aria-label="Zmeniť jazyk / Change language"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">{lang}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[140px] notranslate">
          <DropdownMenuItem
            onClick={() => switchLang("sk")}
            className={`cursor-pointer ${lang === "sk" ? "text-gold font-semibold" : ""}`}
          >
            <span className="mr-2">🇸🇰</span> Slovensky
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => switchLang("en")}
            className={`cursor-pointer ${lang === "en" ? "text-gold font-semibold" : ""}`}
          >
            <span className="mr-2">🇬🇧</span> English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default GoogleTranslate;
