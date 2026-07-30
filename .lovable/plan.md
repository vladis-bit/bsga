## Kde to nájdeš dnes

Rezervácie sa ukladajú do tabuliek `pc_bookings` a `pc_simulators` v backende. Aktuálne existuje len `/admin` so zoznamom správ z formulárov — rezervácie tam nevidno. Cez More → Cloud vieš pozrieť surové riadky tabuľky, ale to nie je použiteľné na denné riadenie. Preto navrhujem vlastný dashboard.

## Čo postavím

Prerobím `/admin` na plnohodnotný dashboard s bočnou navigáciou (ivory editorial dizajn, rovnaký ako web) a štyrmi sekciami:

**1. Prehľad**
- Karty s číslami: dnešné rezervácie, tento týždeň, obsadenosť Trackman 4 vs iO, tržby za mesiac (počet hodín × cena), neprečítané správy.
- Zoznam „Najbližšie rezervácie" (dnes + zajtra) s menom, časom, simulátorom, telefónom.

**2. Rezervácie (jadro)**
- Tabuľka všetkých rezervácií: dátum a čas, simulátor, klient, kontakt, dĺžka, cena, stav rezervácie, stav platby.
- Filtre: simulátor, stav, časové obdobie (dnes / týždeň / mesiac / všetko), vyhľadávanie podľa mena, e-mailu alebo telefónu.
- Akcie na riadku: potvrdiť, zrušiť, označiť ako zaplatené, poznámka.
- Ručné pridanie rezervácie (keď klient zavolá alebo príde osobne).
- Export do CSV pre účtovníctvo.

**3. Kalendár**
- Týždenný pohľad, stĺpec pre každý simulátor, bloky s časom a menom klienta. Klik na blok otvorí detail rezervácie. Rýchly vizuál voľných okien.

**4. Správy**
- Súčasný zoznam z formulárov, len presunutý do novej navigácie a doplnený o filter prečítané/neprečítané.

## Technické detaily

- Nové súbory: `src/pages/admin/AdminLayout.tsx`, `Overview.tsx`, `Bookings.tsx`, `Calendar.tsx`, `Messages.tsx`; zdieľané hooky `useBookings`, `useAdminStats`.
- Routy: `/admin`, `/admin/rezervacie`, `/admin/kalendar`, `/admin/spravy` (chránené prihlásením, `robots.txt` už `/admin` blokuje).
- Prístup: dnešné RLS politiky dovoľujú čítať a meniť `pc_bookings` len adminom cez `has_role()` — dashboard sa na to spolieha, žiadne nové výnimky.
- Ručné vytvorenie rezervácie a zmeny stavov idú cez bežné klientské volania s admin RLS; prekrývanie termínov blokuje existujúce DB obmedzenie a chybu zobrazím zrozumiteľne po slovensky.
- Zatiaľ nezasahujem do verejného rezervačného formulára — dashboard je pripravený aj na rezervácie zadané ručne.

## Otvorená otázka na neskôr

Verejný rezervačný formulár s kalendárom voľných termínov na webe zatiaľ neexistuje. Keď povieš, dorobím ho ako ďalší krok a rezervácie budú do dashboardu padať automaticky.
