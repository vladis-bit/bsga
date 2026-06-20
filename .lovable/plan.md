## Cieľ
Karta "Športová mikina" v Obchode bude zobrazovať všetky 3 farebné varianty (čierna, žltá, zelená) s prepínaním šípkami a tromi farebnými bodkami pod cenou.

## Kroky

1. **Upload 3 fotiek mikiny ako Lovable Assets**
   - `user-uploads://5-4.png` → `src/assets/merch/hoodie-black.png.asset.json`
   - `user-uploads://6-3.png` → `src/assets/merch/hoodie-yellow.png.asset.json`
   - `user-uploads://4-4.png` → `src/assets/merch/hoodie-green.png.asset.json`

2. **Rozšíriť `MerchCard.tsx`** o voliteľnú prop `colorVariants?: { name: string; hex: string; image: string }[]`:
   - Ak je prop zadaná, namiesto statického `image` zobrazí aktívny variant.
   - Šípky `‹` `›` vľavo/vpravo cez obrázok (gold/transparent, hover stav) na prepínanie.
   - Pod cenou riadok s 3 farebnými bodkami (`w-3 h-3 rounded-full`, ring-gold pri aktívnej, hex farba pozadia) — klik prepne variant.
   - Plynulý fade prechod obrázka (`AnimatePresence` alebo CSS opacity).

3. **Shop.tsx** — pre položku "Športová mikina" odovzdať `colorVariants` (čierna `#000000`, žltá `#EAB308`, zelená `#84CC16`) a ako default `image` použiť čiernu.

## Technické detaily
- Stav `activeIndex` cez `useState(0)` v `MerchCard`.
- Šípky vykreslené iba ak `colorVariants?.length > 1`.
- Existujúce karty bez `colorVariants` ostanú nezmenené (žiadne šípky, žiadne bodky).
