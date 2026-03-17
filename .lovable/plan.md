
Cieľ

Pridať rovnaké svetlé aurora pozadie ako na stránke Akadémia aj na stránky Tour (`/tour`) a O nás (`/o-nas`), bez väčšieho redizajnu obsahu.

Čo som skontroloval

- `src/pages/Akademia.tsx` už používa `AuroraBackground variant="silver"` a sekcie sú nastavené na `bg-transparent`.
- `src/pages/Tour.tsx` aj `src/pages/About.tsx` sú ešte postavené na klasických `bg-background` / `bg-secondary` wrapperoch.
- `src/components/ui/aurora-background.tsx` už má hotový `silver` variant, takže netreba vytvárať nové pozadie.
- Route pre O nás je `/o-nas` v `src/App.tsx`.

Čo upravím

1. Tour stránka
- Importujem `AuroraBackground`.
- Obalím celý obsah stránky do `AuroraBackground variant="silver"`.
- Zmením hlavné wrappery sekcií z `bg-background`, `bg-secondary`, `bg-muted` na transparentné alebo jemne transparentné varianty, aby bolo aurora pozadie viditeľné.
- Hero blok ponechám vizuálne rovnaký ako teraz, len bude sedieť nad aurora pozadím.
- Zachovám existujúce `TournamentCard` komponenty bez zásahu, lebo už majú vlastný tmavý card štýl a budú fungovať aj nad novým pozadím.

2. O nás stránka
- Importujem `AuroraBackground`.
- Obalím stránku do `AuroraBackground variant="silver"`.
- Sekcie `Story`, `Team`, `Career CTA` prepnem z pevných backgroundov na transparentné / jemne vrstvené pozadie.
- Hero sekciu nechám obsahovo rovnakú, aby sa nemenila štruktúra stránky.
- Zachovám existujúce karty s tímom a zakladateľmi, aby sa nemenil layout ani obsah.

3. Kontrast a čitateľnosť
- Skontrolujem texty, ktoré sedia priamo na pozadí:
  - nadpisy sekcií
  - perexy
  - partner sekciu na Tour
- Ak bude treba, upravím len textové odtiene a border/overlay jemne, nie celé komponenty.

Technický prístup

```text
Tour / O nás dnes:
Navbar
main
 ├─ hero (bg-background + dark box)
 ├─ content sections (bg-background / bg-secondary / bg-muted)
 └─ Footer

Po úprave:
Navbar
AuroraBackground(variant="silver")
 └─ main(bg-transparent)
    ├─ hero (ponechaný box nad aurorou)
    ├─ content sections (transparentné, aurora viditeľná)
    └─ existujúce karty / CTA boxy zachované
Footer
```

Súbory, ktoré upravím

- `src/pages/Tour.tsx`
- `src/pages/About.tsx`

Pravdepodobne bez úprav

- `src/components/ui/aurora-background.tsx` (už je pripravené)
- `src/components/TournamentCard.tsx`
- `src/components/Tilt3DCard.tsx`

Na čo si dám pozor

- Aby Tour partner logá zostali dobre čitateľné na novom pozadí.
- Aby sekcia Kariéra na O nás stále pôsobila ako samostatný zvýraznený blok.
- Aby sa vizuál zladil s Akadémiou, ale nezmenil obsah ani rozloženie stránok.
