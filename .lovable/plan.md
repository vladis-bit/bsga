## Plán vylepšení – Phase 2

Tri paralelné okruhy: **SEO schémy**, **rýchlosť** a **konverzie**.

---

### 1) SEO – Rich snippets (JSON-LD)

Cieľ: získať bohatšie zobrazenia v Google (hviezdičky, ceny, eventy, mapa).

- **LocalBusiness / SportsActivityLocation** v `index.html` rozšíriť o:
  - `address` (ulica, mesto, PSČ, krajina)
  - `telephone`, `email`
  - `openingHoursSpecification` (po dňoch)
  - `geo` (latitude/longitude)
  - `priceRange`, `image`, `sameAs` (FB/IG)
- **Service schema** pre každú službu na `/sluzby` (Fitting, Lekcie, Start with Golf, Performance Center, …) – cez `SEO` komponent.
- **Event schema** pre každý turnaj v `/tour-2026` (názov, dátum, miesto, link na PDF).
- **Product schema** pre darčekové poukazy a kurzy na `/obchod` (cena, mena, dostupnosť).
- **BreadcrumbList** schema na všetkých podstránkach (Domov › Sekcia › Stránka).
- **Course schema** (typ Schema.org) pre akademické kurzy na `/akademia`.

### 2) Rýchlosť & Core Web Vitals

Cieľ: LCP < 2.5s, CLS < 0.1, lepší Google ranking + UX.

- **Obrázky**: pridať `vite-imagetools`, konvertovať veľké JPG/PNG do **WebP/AVIF**, pridať `width`/`height` atribúty (zabraňuje CLS).
- **LCP preload**: hero obrázok na `/` cez `<link rel="preload" as="image" fetchpriority="high">`.
- **Lazy loading**: `loading="lazy"` na všetky obrázky pod foldom (galéria, partneri, testimonials).
- **Code splitting**: `React.lazy()` pre ťažké stránky (Gallery, Tour, Education).
- **Font optimalizácia**: `font-display: swap` + preload kritických fontov.
- **Bundle audit**: odstrániť nepoužité shadcn komponenty a knižnice.
- **Cache headers** dokument (návod pre používateľa, lebo bsga.sk hostuje Lovable).

### 3) Konverzie & CTA

Cieľ: viac dopytov z existujúcej návštevnosti.

- **Sticky mobile CTA bar**: spodný bar „Rezervovať lekciu" + „Zavolať" (viditeľný iba na mobile, skryje sa pri scrolle hore).
- **Sekundárne CTA v každej service karte** na `/sluzby` – tlačidlo „Mám záujem" priamo otvorí formulár s predvyplnenou službou.
- **WhatsApp / Messenger float button** vpravo dole (rýchly kontakt).
- **Exit-intent modal** na `/sluzby` a `/obchod` – „Stiahnite si bezplatný PDF sprievodca golfom pre začiatočníkov" výmenou za email (lead magnet).
- **Trust signály** nad formulármi: počet spokojných klientov, hviezdičky z Google recenzií, logá partnerov.
- **Form improvements**:
  - Microcopy pod tlačidlom („Odpovieme do 24 h, žiadny spam")
  - Inline validácia + úspešná hláška s ďalším krokom (CTA na Instagram / Tour)
  - Auto-fokus prvého poľa

---

### Poradie realizácie

1. **SEO schémy** (najrýchlejší win, ovplyvní výsledky vyhľadávania o 2-4 týždne)
2. **Konverzné CTA** (sticky bar + WhatsApp + service CTA) – okamžitý dopad
3. **Rýchlosť** (vite-imagetools + lazy loading + preload)
4. **Exit-intent + lead magnet** – až po dohode aký PDF chcete ponúknuť

### Čo potrebujem od vás predtým, než začnem

- **Adresa / telefón / otváracie hodiny** akadémie (pre LocalBusiness schema)
- **GPS súradnice** (môžem dohľadať podľa adresy)
- **WhatsApp číslo** alebo Messenger link (ak chcete float button)
- **Lead magnet PDF** – máte alebo ho mám navrhnúť?

### Technické detaily

- Schémy pôjdu cez existujúci `SEO` komponent (`jsonLd` prop už podporuje array).
- Sticky CTA & WhatsApp = nový komponent `MobileCTABar.tsx` + `FloatingContact.tsx`.
- Exit-intent = `useExitIntent` hook + `Dialog` z shadcn.
- Image optimalizácia neovplyvní existujúce importy (vite-imagetools pridá query params).
