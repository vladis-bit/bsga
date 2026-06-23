## Stav

- `bsga.sk` je živá (HTTP 200) ✅
- `public/sitemap.xml` a `public/robots.txt` existujú, ale ukazujú na `bsga.lovable.app`
- Google Search Console konektor **nie je pripojený** v workspace — bez neho neviem zavolať Google API

## Čo spravím

### 1. Prepnúť URL na bsga.sk
- `public/sitemap.xml` — všetkých 14 `<loc>` z `https://bsga.lovable.app` → `https://bsga.sk`
- `public/robots.txt` — `Sitemap:` direktívu na `https://bsga.sk/sitemap.xml`

### 2. Pripojiť Google Search Console konektor
Vyžaduje tvoj súhlas — otvorím dialóg `Connect`, prihlásiš sa Googlom účtom, ktorý chceš mať ako vlastníka property v Search Console.

### 3. Overiť doménu bsga.sk (META metóda)
- Vyžiadam verifikačný token cez Site Verification API
- Pridám `<meta name="google-site-verification" content="...">` do `index.html`
- **Publikuješ web** (klik na Publish) — bez deployu Google tag nenájde
- Zavolám verify endpoint → property je overená

### 4. Pridať property a odoslať sitemap
- `PUT /webmasters/v3/sites/https%3A%2F%2Fbsga.sk%2F` — pridá property do Search Console
- `PUT /webmasters/v3/sites/.../sitemaps/https%3A%2F%2Fbsga.sk%2Fsitemap.xml` — odošle sitemap

### 5. Sledovanie indexovania
Google Search Console API neumožňuje „nastaviť sledovanie" — indexovanie všetkých 14 URL si spustí Google sám po prečítaní sitemapy (zvyčajne hodiny až dni). Môžem ale:
- vypísať aktuálny stav sitemapy (`GET .../sitemaps/...`) — počet odoslaných/indexovaných URL
- vypísať pokrytie indexom (`POST .../urlInspection/index:inspect` pre jednotlivé URL)

Ak chceš pravidelný monitoring, najlepšie je otvoriť priamo Search Console v prehliadači — Lovable nemá cron na opakované volania.

## Čo potrebuješ spraviť ty

1. Po pripojení konektora **publikovať web** (Publish button) aby sa META tag dostal na bsga.sk
2. Skontrolovať, že bsga.sk skutočne servíruje aktuálny build (nie cached starý HTML bez tagu)

## Technické poznámky

- META verifikačný tag pridám do `index.html` v `<head>` — Lovable to tam udrží.
- Sitemap zostane statická (`public/sitemap.xml`) — žiadne dynamické routes (žiadny blog, žiadne produkty z DB).
- `robots.txt` ponechá existujúce per-bot bloky, mení sa len `Sitemap:` URL.
