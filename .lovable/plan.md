## Cieľ
Prerobiť `MerchCard` v štýle "Sophisticated Aurora Glass" — sklenený glassmorphism card s bielym outline okolo obrázku, elegantnou typografiou a prémiovým CTA tlačidlom.

## Zmeny

### `src/components/shop/MerchCard.tsx`
- Karta: zaoblené rohy `rounded-[2rem]`, jemný biely border (`border-white/10`), glass pozadie `bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-2xl`, shadow-2xl, hover zlatý border.
- Obrázok: `aspect-square` v ráme s `border-2 border-white/60` (hover `white/90`), bielym priehľadným pozadím `bg-white/5`, padding `p-4`, jemný gradient overlay.
- Ak chýba obrázok: ponechať placeholder s rovnakým rámom, aby boli karty konzistentné.
- Titulok: serifový font (Playfair Display) — `font-serif` (už dostupný v projekte) alebo inline `Playfair Display`.
- Cena: zlatá, `text-2xl font-bold text-gold`.
- Popis: `text-white/50 text-sm`.
- CTA: `bg-gold` plné tlačidlo, uppercase tracking, jemný hover sweep efekt, gold shadow.
- Decoratívny gold glow v rohu karty.

### Bez zmien
- `Shop.tsx` — žiadne úpravy; ostáva ten istý prop kontrakt (`title`, `price`, `description`, `purchaseUrl`, `image`).

## Technické detaily
- Použiť existujúce semantic tokens `text-gold`, `bg-gold` (definované v projektovom design system) namiesto hardkódovaných hex hodnôt všade kde to ide.
- Playfair Display: pridať cez Google Fonts link v `index.html` (ak ešte nie je) a v Tailwind class použiť `font-['Playfair_Display']`.
