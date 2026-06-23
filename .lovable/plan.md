Vykonám všetky tri optimalizácie pre maximálne zrýchlenie načítania webu.

## 1. Presun veľkých obrázkov na Lovable CDN
Všetky obrázky >100 KB v `src/assets/` presuniem na Lovable CDN cez `lovable-assets`. Tým sa:
- zmenší bundle aplikácie (rýchlejší prvý load JS)
- obrázky servujú z globálnej CDN s agresívnym cache
- `.asset.json` pointery zostanú v repe, originály sa vymažú

Týka sa hlavne: hero obrázky, galéria, team portréty, services, courses, merch.

## 2. AVIF varianty cez `vite-imagetools`
Pridám `vite-imagetools` plugin a pre hero/LCP obrázky vygenerujem AVIF + WebP varianty s `<picture>` tagom:
```tsx
<picture>
  <source srcSet={heroAvif} type="image/avif" />
  <source srcSet={heroWebp} type="image/webp" />
  <img src={heroWebp} alt="..." />
</picture>
```
AVIF je ~30 % menší než WebP. Aplikujem na: hero na Domov, About hero, Akadémia hero, Tour hero.

## 3. Preload LCP obrázka
Do `index.html` pridám:
```html
<link rel="preload" as="image" href="<hero-url>" fetchpriority="high" />
```
Pre hlavný hero na úvodnej stránke (najviditeľnejší obrázok pri otvorení).

## Technické detaily
- Krok 1: spustím skill `migrate-to-assets` — preflight scan, upload, prepis importov, `bun run build` na overenie.
- Krok 2: `bun add -D vite-imagetools`, úprava `vite.config.ts`, refactor hero komponentov.
- Krok 3: úprava `index.html` s preload tagom pre hero z Domov stránky.
- Po každom kroku overím buildom, že nič nepadlo.

## Očakávaný výsledok
- Bundle size: ďalšie zníženie o ~5–8 MB (presun na CDN)
- LCP: rýchlejší o 200–500 ms (preload + AVIF)
- Celkový dojem: web sa otvorí citeľne rýchlejšie, hlavne na mobile a pomalšom pripojení.
