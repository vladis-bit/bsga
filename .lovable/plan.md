
Cieľ:
- Opraviť hlavnú hero sekciu na domovskej stránke tak, aby pôsobila čistejšie a výraznejšie.
- Pridať animácie do boxov v hero sekcii.
- Rozšíriť spodný rad štatistík o 1 extra box.
- Zachovať existujúcu animáciu čísel v sekcii `AnimatedStats`.
- Zviditeľniť CTA tlačidlá.
- Odstrániť uploadnutú vec iba z hero sekcie, ak sa tam ešte niekde reálne používa.

Čo som overil:
- Hero na homepage je v `src/components/HeroSlider.tsx` a už používa canvas wave animáciu + Framer Motion.
- Počet boxov v hero je aktuálne 3 (`heroStats`).
- Animované čísla nižšie na stránke sú v `src/components/AnimatedStats.tsx` a sú oddelené od hero; tie netreba rozbíjať.
- Nenašiel som priamy odkaz na `user-uploads` ani `lovable-uploads` v hero komponente, takže uploadnutý prvok pravdepodobne buď už nie je v kóde, alebo bol vložený inak. Pri implementácii skontrolujem a odstránim len hero-level zvyšky, ak tam ešte sú.

Navrhovaný postup:
1. Upraviť obsah hero sekcie v `HeroSlider.tsx`
   - ponechať glowy wave background ako základ,
   - zjednodušiť textovú hierarchiu, aby hero nebolo vizuálne “rozbité”,
   - doplniť 4. box do `heroStats`, aby spodný rad pôsobil plnšie a vyváženejšie.

2. Pridať animácie do hero boxov
   - každý stat box dostane silnejší entrance efekt: fade + slide-up + jemný scale,
   - hover efekt: mierny lift, gold glow, výraznejší border a blur pozadie,
   - animácie budú konzistentné s dark/gold štýlom webu a nebudú rušiť canvas v pozadí.

3. Zlepšiť viditeľnosť tlačidiel
   - primárne CTA spraviť viac “premium”: gold / high-contrast fill, silnejší shadow/glow,
   - sekundárne CTA získa výraznejší border, lepší kontrast a hover stav,
   - zachovať existujúcu navigačnú logiku (`#sluzby`, `/o-nas`).

4. Zachovať animácie čísel
   - komponent `AnimatedStats.tsx` ponechať funkčne bez zásahu do count-up logiky,
   - prípadne len jemne zjednotiť spacing/styling okolo hero tak, aby prechod do tejto sekcie pôsobil prirodzene.

5. Odstránenie uploadnutej veci z hero
   - pri implementácii skontrolovať, či v hero nezostal žiadny vložený overlay, asset alebo textový prvok z predošlého pokusu,
   - ak tam niečo také ešte je, odstrániť to len z hero, nie z celého webu.

Technické detaily:
- Súbory:
  - `src/components/HeroSlider.tsx` — hlavná úprava
  - `src/components/AnimatedStats.tsx` — bez zmeny count-up logiky, len ak by bolo treba minimálne vizuálne doladenie
- Pravdepodobné zmeny v hero:
  - rozšírenie `heroStats` z 3 na 4 položky,
  - úprava gridu na lepšie správanie:
    - mobile: 2 x 2
    - desktop: 4 stĺpce
  - silnejšie CTA triedy pre kontrast na tmavom pozadí,
  - doplnenie hover/entrance animácií na stat boxy cez Framer Motion.
- Výsledok:
  - hero bude čistejšie,
  - boxy budú živšie,
  - CTA budú okamžite viditeľné,
  - číselné animácie ostanú zachované,
  - neželaný uploadnutý prvok nebude v hero prekážať.

ASCII náčrt:
```text
[ badge ]

VEĽKÝ NADPIS
podnadpis / popis

[ Primárne CTA ]   [ Sekundárne CTA ]

[ box 1 ] [ box 2 ]
[ box 3 ] [ box 4 ]

-- následne ostáva AnimatedStats s count-up efektom --
```
