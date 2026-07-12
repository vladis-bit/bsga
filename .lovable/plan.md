# KROK 3 — Structured Data (Rich Results)

Cieľ: aktivovať bohaté výsledky v Google (hviezdy, dátumy, ceny, breadcrumbs) pridaním Schema.org JSON-LD značkovania na kľúčové stránky.

## Čo pridám

### 1. BreadcrumbList — na každú podstránku
Do komponentu `src/components/SEO.tsx` pridám voliteľný prop `breadcrumbs`, ktorý vygeneruje `BreadcrumbList` JSON-LD. Zapojím ho do všetkých podstránok: Služby, O nás – tréneri, Juniorský golf, Obchod, Tour, Fitting, Firemné akcie, Eventy, Galéria, Začni s golfom, Edukačné centrum.

Príklad: `Domov › Juniorský golf`.

### 2. Event schema — pre turnaje a kempy
- **Tour** (`src/pages/Tour.tsx`): 5 x `Event` (BSGA Tour 1–5) s dátumom, miestom (golf resort), organizátorom BSGA a titulárnym partnerom (NN, Soitron, ELV, ELcomp, Altron).
- **Juniorský golf** (`src/components/CampCards.tsx`): 3 x `Event` pre detské kempy (Turnus 1 – označený ako `SoldOut`, Turnus 2, Turnus 3) s cenou 340 €/310 €, dátumami a lokalitou GKHB.
- **Eventy** (`src/pages/Events.tsx`): `Event` pre Czech PGA Tour, Camiral Trip, LIV Golf Andalucia, BSGA Ryder Cup, Švajlen Invitational, Pro-Am, Florida PGA Swing, Jarný tréningový deň — každý s dátumom, lokáciou, cenou a organizátorom.

### 3. Product + Offer schema — pre shop
Do `src/pages/Shop.tsx` pridám `Product` + `Offer` JSON-LD pre všetkých 15 položiek (merch aj služby): názov, obrázok, cena v EUR, dostupnosť (`InStock`), URL Stripe Payment Linku ako `offers.url`, značka „BSGA".

### 4. LocalBusiness / SportsActivityLocation — homepage
Sitewide `SportsActivityLocation` už existuje v `index.html` (Bratislava, Zuzany Chalupovej 12). Rozšírim ho o:
- Druhá lokácia: **Nitra – Red Oak Golf Club** (samostatný `SportsActivityLocation` v `@graph`).
- `aggregateRating` (na základe Google recenzií zobrazených na webe — hviezdy vo výsledkoch vyhľadávania).
- `hasOfferCatalog` s prehľadom hlavných služieb (individuálne lekcie, zelená karta, juniorský golf, fitting, firemné akcie).

## Technická časť

**Súbory na úpravu:**
- `src/components/SEO.tsx` — pridať `breadcrumbs?: Array<{name, url}>` prop generujúci `BreadcrumbList`.
- `index.html` — rozšírený `@graph` (druhá lokácia + aggregateRating + hasOfferCatalog).
- `src/pages/Tour.tsx` — pole eventov + JSON-LD injektovaný cez `SEO` prop `jsonLd`.
- `src/pages/Events.tsx` — Event schema pre všetkých ~8 eventov.
- `src/pages/Akademia.tsx` + `src/components/CampCards.tsx` — Event schema pre 3 kempy.
- `src/pages/Shop.tsx` — Product/Offer schema pre všetky produkty.
- Všetky ostatné podstránky — pridať `breadcrumbs` prop do `<SEO>`.

**Bez vplyvu na UI** — všetko sú `<script type="application/ld+json">` tagy v `<head>` cez `react-helmet-async`.

## Overenie po nasadení
1. Cez Google Rich Results Test (`search.google.com/test/rich-results`) skontrolujem Home, Tour, Eventy, Obchod, Juniorský golf.
2. V Google Search Console → Enhancements sa do 1–2 týždňov objavia sekcie Breadcrumbs, Events, Products, Merchant listings s počtami > 0.
3. `sitemap.xml` netreba meniť — obsah je rovnaký, len obohatený o schémy.

## Očakávaný výsledok
- Vo výsledkoch vyhľadávania sa začnú zobrazovať: **breadcrumbs pod titulkom**, **event karty s dátumom a lokalitou**, **produktové ceny a dostupnosť**, **hviezdičky s hodnotením** (po zbere aggregateRating), **rozšírené info o firme** (adresa, otváracie hodiny). To výrazne zvýši CTR z organického vyhľadávania.
