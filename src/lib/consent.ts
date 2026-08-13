/**
 * Consent-gated script loading.
 * Necessary cookies are always active. Analytics / marketing scripts are
 * injected only after consent and removed (with their cookies) on revocation.
 */

export const COOKIE_KEY = "bsga-cookie-consent";

export type ConsentPrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

const SCRIPT_ATTR = "data-consent-script";

// Cookie name prefixes written by each category
const ANALYTICS_COOKIES = ["_ga", "_gid", "_gat", "_gac_", "__utm"];
const MARKETING_COOKIES = ["_fbp", "_fbc", "fr", "_gcl_"];

export function readConsent(): ConsentPrefs | null {
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      timestamp: typeof parsed.timestamp === "string" ? parsed.timestamp : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveConsent(prefs: { analytics: boolean; marketing: boolean }): ConsentPrefs {
  const payload: ConsentPrefs = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_KEY, JSON.stringify(payload));
  applyConsent(payload);
  return payload;
}

function deleteCookiesByPrefix(prefixes: string[]) {
  const host = window.location.hostname;
  const domains = new Set<string>([host, `.${host}`]);
  const parts = host.split(".");
  if (parts.length > 2) {
    const root = parts.slice(-2).join(".");
    domains.add(root);
    domains.add(`.${root}`);
  }

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name) continue;
    if (!prefixes.some((p) => name === p || name.startsWith(p))) continue;
    for (const domain of [undefined, ...domains]) {
      document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` +
        (domain ? `; domain=${domain}` : "");
    }
  }
}

function removeScripts(category: "analytics" | "marketing") {
  document
    .querySelectorAll(`[${SCRIPT_ATTR}="${category}"]`)
    .forEach((el) => el.remove());
}

function injected(id: string) {
  return !!document.getElementById(id);
}

function loadAnalytics() {
  if (!GA_ID || injected("ga4-consent-script")) return;

  const loader = document.createElement("script");
  loader.id = "ga4-consent-script";
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  loader.setAttribute(SCRIPT_ATTR, "analytics");
  document.head.appendChild(loader);

  const inline = document.createElement("script");
  inline.id = "ga4-consent-init";
  inline.setAttribute(SCRIPT_ATTR, "analytics");
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'granted' });
    gtag('config', '${GA_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
}

function unloadAnalytics() {
  removeScripts("analytics");
  deleteCookiesByPrefix(ANALYTICS_COOKIES);
  if (GA_ID) {
    (window as any)[`ga-disable-${GA_ID}`] = true;
  }
  delete (window as any).gtag;
  delete (window as any).dataLayer;
}

function loadMarketing() {
  if (!META_PIXEL_ID || injected("meta-pixel-consent-script")) return;

  const inline = document.createElement("script");
  inline.id = "meta-pixel-consent-script";
  inline.setAttribute(SCRIPT_ATTR, "marketing");
  inline.text = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;t.setAttribute('${SCRIPT_ATTR}','marketing');
    s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(inline);

  if ((window as any).gtag) {
    (window as any).gtag("consent", "update", { ad_storage: "granted" });
  }
}

function unloadMarketing() {
  removeScripts("marketing");
  deleteCookiesByPrefix(MARKETING_COOKIES);
  delete (window as any).fbq;
  delete (window as any)._fbq;
  if ((window as any).gtag) {
    (window as any).gtag("consent", "update", { ad_storage: "denied" });
  }
}

/** Applies the given consent: loads granted scripts, unloads revoked ones. */
export function applyConsent(prefs: ConsentPrefs | null) {
  if (typeof window === "undefined") return;

  if (prefs?.analytics) loadAnalytics();
  else unloadAnalytics();

  if (prefs?.marketing) loadMarketing();
  else unloadMarketing();
}

/** Call once on app boot to restore previously granted consent. */
export function initConsent() {
  applyConsent(readConsent());
}
