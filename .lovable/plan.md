Overím funkčnosť stránky cez Playwright proti live preview.

## Čo skontrolujem

1. **Hlavné stránky sa načítajú bez chýb**
   - Domov, O nás, Služby, Akadémia, Tour, Obchod, Začni s golfom, Fitting, Galéria
   - Pre každú: status načítania, console errory, screenshot

2. **Navigačné buttony**
   - Otvorenie mobilného/desktop menu
   - Klik na každý navigačný link → overenie navigácie
   - Buttony v hero sekciách (CTA na Domov, Akadémia hero slider, Tour)

3. **Obchod (`/obchod`)**
   - Načítanie stránky a všetkých produktov (vouchery 50/100/200, merch)
   - Klik na "Kúpiť" buttony → overenie že Stripe Payment Link sa otvára správne
   - Skontrolovať že obrázky produktov sa zobrazujú (po CDN migrácii)

4. **Obrázky po CDN migrácii**
   - Skontrolovať network requesty: `/__l5e/assets-v1/...` vracajú 200
   - AVIF varianty sa servujú na Akadémia hero, About hero, Tour hero
   - Preload service-tour.webp v `<head>`

5. **Console & Network**
   - Zachytím všetky errory a 4xx/5xx requesty
   - Reportujem aké chyby sú a kde

## Výstup
Krátky report: čo funguje ✓, čo má problém ✗, screenshoty kritických miest, a navrhnem fix ak nájdem chybu.

Nevykonám žiadne zmeny v kóde — len overenie.
