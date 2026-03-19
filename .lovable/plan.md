
Cieľ: na stránke Tour 2026 použiť rovnaké aurora pozadie ako na stránke Obchod.

Plán:
1. Zjednotím wrapper v `src/pages/Tour.tsx` s implementáciou zo `src/pages/Shop.tsx`.
   - zmením `AuroraBackground variant="silver"` na tmavý variant používaný v Obchode
   - použijem rovnaké nastavenie `className="min-h-screen bg-primary text-primary-foreground"` a `showRadialGradient={false}`

2. Zachovám existujúcu štruktúru Tour stránky.
   - hero obrázok, čierny gradient na fotke, partneri, PDF buttony, turnajové karty aj kontakt zostanú
   - sekcie ostanú `bg-transparent`, aby cez ne nové pozadie plynulo presvitalo

3. Doladím kontrast textov na Tour stránke po prepnutí na tmavé pozadie.
   - skontrolujem hlavne nadpisy a odseky, ktoré sú teraz nastavené na `text-foreground` a `text-muted-foreground`
   - podľa potreby ich v pláne implementácie prepneme na svetlejšie varianty, aby boli čitateľné rovnako ako v Obchode

4. Skontrolujem komponenty použité na Tour stránke proti tmavému pozadiu.
   - `TournamentCard` už používa tmavý štýl a mal by vizuálne sadnúť
   - partner sekcia a dokumentové buttony môžu potrebovať jemné doladenie border/background kontrastu, ak budú na tmavom aurora pozadí príliš splývať

Technické poznámky:
- Obchod používa implicitný `gold` variant v `AuroraBackground`, nie `silver`
- kľúčový rozdiel je:
  ```tsx
  <AuroraBackground className="min-h-screen bg-primary text-primary-foreground" showRadialGradient={false}>
  ```
- Tour momentálne používa svetlý variant:
  ```tsx
  <AuroraBackground variant="silver">
  ```
- najpravdepodobnejšia úprava bude iba v `src/pages/Tour.tsx`, bez zásahu do `aurora-background.tsx`

Očakávaný výsledok:
- stránka Tour 2026 bude mať rovnaké tmavé aurora pozadie ako Obchod
- hero sekcia s fotkou ostane zachovaná
- obsah pod hero bude vizuálne konzistentný s tmavým štýlom webu
