
Cieľ: upraviť hero sekciu na stránke O nás tak, aby fotka pôsobila ako plnohodnotný full-width hero, a na mobile išla na celú šírku bez „kartového“ vzhľadu a veľkých okrajov po bokoch.

Čo je teraz problém
- Hero je zabalený v `container mx-auto px-4 sm:px-6`, takže sa na mobile zmenší a nevypĺňa šírku obrazovky.
- Samotná hero fotka je v boxe s `max-w-5xl`, `rounded-[2rem]`, `border`, `shadow-lg`, čo vytvára dojem vloženej karty namiesto hlavnej sekcie stránky.
- Na mobile sa používa `object-contain`, takže obrázok zostane „vo vnútri“ a po stranách vzniká prázdny priestor, presne ako na screenshote.

Navrhované riešenie
1. Zrušiť kartový wrapper hero sekcie
- Odstrániť `container`, `max-w-5xl`, `rounded-[2rem]`, `border`, `bg-card`, `shadow-lg` v hero časti.
- Hero sekciu prerobiť na full-bleed blok cez celú šírku viewportu.

2. Upraviť správanie obrázka podľa breakpointov
- Mobil:
  - obrázok natiahnuť na `w-full`
  - použiť layout bez bočných paddingov
  - použiť `object-cover` alebo kombináciu s kontrolovanou výškou, aby sa sekcia vyplnila prirodzene po šírke
- Tablet/Desktop:
  - zachovať pekný kompozičný výsledok, pravdepodobne cez väčšiu min-height a jemne riadené `object-position`
  - podľa aktuálnej kompozície ponechať spodný blend a čitateľnosť textu

3. Zachovať a doladiť blend
- Spodný blend ponechať ako súčasť hero, ale naviazať ho na nový full-width layout.
- Pravdepodobne mierne zosilniť spodný gradient na mobile, aby biely text na fotke ostal čitateľný aj pri full-width zobrazení.

4. Doladiť text v hero pre mobil
- Nadpis je teraz iba v obrázku + `sr-only` ako SEO fallback.
- Keďže používate grafiku s vloženým textom, pri full-width mobile treba iba zabezpečiť, aby spodná časť obrázka nebola odrezaná príliš agresívne.
- Ak sa po zmene na `object-cover` ukáže, že text v obrázku je príliš pri spodku, upravím `object-position` a výšku hero tak, aby sa text vo fotke zachoval.

Technický plán
- Súbor: `src/pages/About.tsx`
- Upraviť iba hero sekciu:
  - odstrániť vnútorný container wrapper
  - zmeniť wrapper na full-width `relative overflow-hidden`
  - nastaviť hero image wrapper na `w-full`
  - pre mobil použiť full-width layout bez horizontálnych okrajov
  - pre desktop zachovať elegantnú výšku a blend
- Ostatné sekcie pod hero (`misia`, `zakladatelia`, `náš tím`, `kariéra`) ponechať bez zásahu

Očakávaný výsledok
- Fotka na O nás bude siahať na celú šírku stránky.
- V mobile nebude hero pôsobiť ako vložená karta so sivým/ bielym priestorom okolo.
- Kompozícia bude čistejšia, modernejšia a bližšia očakávanému „natiahnutému“ hero banneru.

Na čo si dám pozor pri implementácii
- aby fixný navbar neprekrýval hero nevhodným spôsobom
- aby sa nestratil spodný text vo fotke
- aby sa pri prechode medzi mobilom a desktopom nerozbila výška sekcie
- aby blend nepôsobil príliš tmavo po natiahnutí na plnú šírku

<lov-actions>
<lov-suggestion message="Test the About page end-to-end on mobile and desktop to make sure the full-width hero image and responsive crop look correct everywhere.">Verify full-width hero</lov-suggestion>
<lov-suggestion message="Implement the full-width hero section on the About page so the image stretches edge-to-edge, removes the card-style container, and fills the mobile width properly.">Make hero full width</lov-suggestion>
<lov-suggestion message="Fine-tune the About page hero crop and object-position across mobile, tablet, and desktop so the people and built-in headline stay visible at every breakpoint.">Refine hero cropping</lov-suggestion>
</lov-actions>
