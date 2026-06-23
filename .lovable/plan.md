
# Plán: SEO vylepšenia BSGA

Cieľ: aby Google chápal čo robíte, kde pôsobíte a aby vás Slováci hľadajúci golf našli vyššie vo výsledkoch.

## 1) Per-page meta tagy (kanonické URL + Open Graph)

Aktuálne má každá stránka len `<title>` a `<description>`. Pridať na všetky stránky cez `react-helmet-async`:
- `<link rel="canonical" href="https://bsga.sk/...">` — vlastná URL každej stránky (nie homepage)
- `<meta property="og:title">`, `og:description`, `og:url`, `og:type`
- `<meta name="twitter:title">`, `twitter:description`

Z `index.html` odstrániť `<link rel="canonical" href="https://bsga.sk/">` (nech ho riadi Helmet per route — inak všetky podstránky kanonicky ukazujú na homepage, čo je SEO chyba).

Stránky na úpravu: Index, About, Services, Tour, Akademia, Gallery, Shop, Fitting, StartGolf, EducationCenter, EducationTests, EducationCalculators, GDPR, TermsAndConditions.

## 2) Štruktúrované dáta (JSON-LD)

Pomáha Google zobrazovať rich snippets (hviezdičky, FAQ rozbalenia, mapa, kontakt):

- **Sitewide v `index.html`**: `Organization` + `LocalBusiness` (SportsActivityLocation) — názov BSGA, logo, adresa Bratislava, telefón +421 917 225 276, email info@bsga.sk, sociálne siete, otváracie hodiny, geo súradnice
- **Index**: `WebSite` so SearchAction
- **About**: rozšíriť `Organization` o `founder` (Peter Švajlen, Jakub Hrbáň) a `employee`
- **Services + StartGolf + Fitting**: `Service` resp. `Course` JSON-LD pre každú službu (názov, popis, poskytovateľ, cena ak je)
- **Shop**: `Product` JSON-LD pre poukážky a merch (cena, mena EUR, dostupnosť)
- **Tour**: `Event` JSON-LD pre každý turnaj BSGA Tour 2026 (dátum, miesto, organizátor)
- **Fitting + StartGolf**: `FAQPage` JSON-LD vygenerovaný z existujúcich FAQ accordionov
- **EducationTests**: `Quiz` alebo `LearningResource`

## 3) Sémantický obsah a interné odkazy

- Pridať popisné `alt` texty kde chýbajú (kontrola všetkých `<img>`)
- 404 (`NotFound.tsx`): pridať `<Helmet>` s `noindex, follow` a `<title>`
- EducationCalculators: stránka "Už čoskoro" — pridať `noindex` aby neoslabovala doménu prázdnym obsahom
- Footer už dobre prepája — pridať jedno-dve interné odkazy v texte sekcií (napr. v Services odkazy na `/zacni-s-golfom`, `/fitting` z popisov)

## 4) Lokálne SEO (najdôležitejšie pre Slovensko)

- **Google Business Profile**: vytvoriť/nárokovať profil "Best Swing Golf Academy" v Bratislave a v Performance Centre Petržalka — toto sa rieši mimo kódu, len vám pripravím checklist
- Adresa, telefón, otváracie hodiny konzistentne v Footer + Schema + GBP (NAP konzistencia)
- Pridať na Kontakt/About explicitnú adresu (teraz je len "Bratislava, Slovensko") — Google potrebuje presnú ulicu

## 5) Technické SEO drobnosti

- `sitemap.xml`: pridať `<lastmod>` k entries (aktuálny dátum) — pomáha Google plánovať re-crawl
- `robots.txt`: zjednodušiť (duplicitné `User-agent` bloky s rovnakým pravidlom nepomáhajú, stačí `User-agent: *` + `Allow: /` + `Sitemap:`)
- Hreflang: pridať `<link rel="alternate" hreflang="sk" href="...">` a `hreflang="x-default"` — explicitne deklarovať slovenský jazyk
- Open Graph image: aktuálny obrázok ide cez `storage.googleapis.com/gpt-engineer-file-uploads` — premigrovať do `/public` aby URL bola stabilná a brandovaná (`https://bsga.sk/og-image.jpg`)
- Preload only critical font weights, zbytočne nepreload-ovať obrázok ktorý nemusí byť LCP

## 6) Po nasadení

- Submit sitemap v Google Search Console (už máme nastavené)
- Spustiť **SEO scan** v Lovable po dokončení zmien — overí všetky položky a označí, čo ešte chýba
- Po 2-4 týždňoch skontrolovať pozície cez Semrush (`bsga.sk` v databáze `sk`) a navrhnúť cielené keyword stránky (napr. samostatná landing page "zelená karta Bratislava", "golfové lekcie pre deti")

---

## Čo navrhujem urobiť hneď (Fáza 1)

Najväčší impact za rozumný čas:
1. **Per-page meta + canonical na všetkých 14 stránkach** (#1)
2. **JSON-LD Organization + LocalBusiness + WebSite v `index.html`** (#2)
3. **FAQ schema na Fitting a StartGolf** (#2) — najľahšie rich snippety
4. **`lastmod` v sitemape + vyčistiť robots.txt** (#5)
5. **`noindex` na 404 a EducationCalculators** (#3)
6. **Hreflang sk + x-default** (#5)

Fázu 2 (Product/Event/Service schema, lokálne SEO, GBP checklist, OG image migrácia) by sme riešili v druhom kroku, keď uvidíme efekt z Fázy 1.

**Pokračujem s Fázou 1, alebo chceš inú kombináciu?**
