
Cieľ

Preniesť aurora pozadie zo stránky Služby na stránku Akadémia, ale v novej svetlej palete biela / strieborná / sivá. Keďže ste zvolili „Len pozadie“, zachovám existujúcu štruktúru obsahu, kariet a sekcií bez väčšieho redizajnu.

Čo upravím

1. AuroraBackground rozšírim o svetlý variant
- Doplním možnosť použiť inú farebnú paletu než aktuálnu zlatú.
- Nový variant bude používať bielu, svetlosivú, striebornú a tmavšiu sivú namiesto gold tónov.
- Existujúce stránky Služby a Obchod ostanú vizuálne rovnaké.

2. Stránku Akadémia obalím do AuroraBackground
- Nahradím aktuálny page-level `bg-background` wrapper za `AuroraBackground`.
- Aurora efekt natiahnem cez celú stránku Akadémia, nie iba cez horný slider blok.

3. Hero sekciu Akadémie prispôsobím novému pozadiu
- Odstránim `DottedSurface` z hero bloku, aby sa nebilo s aurora efektom.
- Hero box so sliderom ponechám, ale jeho kontajner upravím tak, aby vizuálne sedel nad novým pozadím.

4. Zachovám svetlé karty a obsahové bloky
- `DevelopmentTimeline` a `CampCards` nechám fungovať v súčasnom štýle.
- Keďže majú vlastné svetlé karty (`bg-card`), budú prirodzene „plávať“ nad aurora pozadím bez potreby redizajnu.

5. Upravím iba texty, ktoré sedia priamo na pozadí
- Nadpisy a perexy sekcií, ktoré dnes sedia na bielom pozadí, pravdepodobne prepneme na svetlé odtiene pre kontrast.
- Vnútro kariet nechám bez zmeny, aby sa nemenil ich existujúci vzhľad.

Súbory, ktoré sa dotknem

- `src/components/ui/aurora-background.tsx`
  - pridanie variantu/palety pre bielo-strieborno-sivé pozadie

- `src/pages/Akademia.tsx`
  - obalenie celej stránky do `AuroraBackground`
  - odstránenie `DottedSurface`
  - zmena sekčných wrapperov z pevných bielych backgroundov na transparentné
  - prípadné doladenie farieb nadpisov a textov mimo kariet

- Pravdepodobne bez úprav:
  - `src/components/DevelopmentTimeline.tsx`
  - `src/components/CampCards.tsx`
  - `src/components/AkademiaNewsSlider.tsx`

Technický prístup

```text
Akadémia dnes:
main(bg-background)
 ├─ hero: tmavý box + DottedSurface
 ├─ timeline: bg-background
 ├─ camps: bg-background
 └─ CTA: bg-background

Po úprave:
AuroraBackground(variant="silver")
 └─ main(bg-transparent)
    ├─ hero: box nad aurorou
    ├─ timeline: transparent section + existujúce svetlé karty
    ├─ camps: transparent section + existujúce svetlé karty
    └─ CTA: zachovaný box nad aurorou
```

Farebný zámer pre nový variant
- základ: biela / veľmi svetlá sivá
- dynamické pruhy: strieborná / sivá
- glow vrstvy: jemná biela a studená sivá
- bez zlatých glow prvkov na Akadémii

Na čo si dám pozor
- Na mobile (390 px) musí zostať čitateľnosť nadpisov mimo kariet.
- Ak by niektoré texty na samotnom pozadí splývali, upravím len ich kontrast, nie dizajn kariet.
- Nezasiahnem do vzhľadu stránok Služby a Obchod; nový variant bude izolovaný iba pre Akadémiu.
