
## Cieľ
Vytvoriť novú stránku **„Začni s golfom"** (`/zacni-s-golfom`), ktorá kombinuje informačné karty (Štart karty, Zelené karty zo stránky Služby) s priamymi nákupnými kartami z Obchodu, aby si začiatočník mohol hneď zakúpiť službu. Pridať odkaz do **Navbaru** aj **Footra**.

---

## 1. Nová stránka `src/pages/StartGolf.tsx`

Vytvoríme novú stránku v rovnakom vizuálnom štýle ako ostatné stránky:
- **Tmavý variant** `AuroraBackground` (gold) — konzistentné s `Services`/`Shop`
- **Helmet** s SEO titulkom: „Začni s golfom | BSGA"
- **Navbar** + **Footer**

### Obsah stránky:

#### 1.1 Hero sekcia
- Eyebrow `Pre začiatočníkov` (gold uppercase)
- H1: **„Začni s golfom"**
- Podtitulok: krátky text typu „Tvoja cesta od prvého švihu k samostatnej hre na ihrisku"
- 2 tlačidlá pre rýchly scroll (rovnaký vzhľad ako biele buttony v Shope):
  - **Štart karty** → scroll na `#start-karty`
  - **Zelené karty** → scroll na `#zelene-karty`

#### 1.2 Sekcia „Štart karty" (`id="start-karty"`)
Dvojstĺpcový layout (`grid md:grid-cols-2`):
- **Ľavý stĺpec — Info karta** (prevzaté zo `Services.tsx`):
  - Obrázok `service-start-cards.jpg` v rounded ráme (16/10)
  - Ikona `GraduationCap` v gold kruhu
  - Nadpis „Štart karty"
  - Popis: *„Ideálny program pre **úplných začiatočníkov**. Získaš **pevné základy**, pochopíš, ako golf funguje, a vytvoríš si istotu ešte pred **vstupom na ihrisko**."*
  - Pridáme aj zoznam výhod (3–4 bullety: pevné základy, úvod do techniky, prvé údery, príprava na zelenú kartu)
- **Pravý stĺpec — Nákupná karta** (`ServiceCard` zo Shopu):
  - **Individuálna lekcia** — 59,99 € (`purchaseUrl: https://buy.stripe.com/dRm8wP5YP5SycrOdRG8so03`)
  - Toto je najvhodnejší produkt pre začiatočníka, ktorý chce začať so „štart kartou"

#### 1.3 Sekcia „Zelené karty" (`id="zelene-karty"`)
Rovnaký dvojstĺpcový vzor:
- **Ľavý stĺpec — Info karta**:
  - Obrázok `service-green-cards.jpg`
  - Ikona `Award`
  - Nadpis „Zelené karty"
  - Popis: *„Kompletný kurz, ktorý ťa pripraví na **samostatnú hru**. Technika, pravidlá, etika a **záverečný test** – po absolvovaní máš **oficiálnu spôsobilosť** hrať na ihriskách."*
  - Bullety: technika úderov, pravidlá a etika, praktický tréning, certifikát
- **Pravý stĺpec — 2 nákupné karty vedľa seba** (vnútorný `grid sm:grid-cols-2`) z dát Shopu:
  - **Víkendový kurz zelenej karty** — 139,99 € (popular, originalPrice 500, discount 72 %, note: „V cene nie je zahrnutá záverečná skúška")
  - **Kurz zelenej karty** — 549,99 €

#### 1.4 CTA sekcia na konci
Krátky banner s textom „Nevieš, čo si vybrať?" + tlačidlo „Kontaktuj nás" → scroll na `/#kontakt` alebo link na `/sluzby`.

### Implementačné detaily:
- Recyklujeme **`ServiceCard`** komponent z `src/components/shop/ServiceCard.tsx` (už existuje, podporuje `popular`, `originalPrice`, `discount`, `note`, `purchaseUrl`)
- Info karty postavíme inline v `StartGolf.tsx` v štýle podobnom karte zo `Services.tsx` (`CursorGlowCard` + obrázok + ikona + popis)
- Layout sekcií: `container mx-auto px-4`, `grid gap-8 lg:gap-12 md:grid-cols-2 items-stretch`
- Scroll-target `scroll-mt-24` na sekciách
- Použijeme rovnaké importy obrázkov: `serviceStartCardsImg`, `serviceGreenCardsImg`

---

## 2. Pridať odkaz do **Navbaru** (`src/components/Navbar.tsx`)

V poli `navLinks` doplníme novú položku **„Začni s golfom"**. Vhodné umiestnenie je **medzi „Služby" a separátor**, lebo logicky nadväzuje na služby pre začiatočníkov:

```ts
{ name: "Služby", href: "/sluzby" },
{ name: "Začni s golfom", href: "/zacni-s-golfom" },
{ type: "separator" },
{ name: "BSGA Tour", href: "/tour" },
...
```

Zmeny sa automaticky prejavia aj v mobilnom menu (Sheet), pretože používa rovnaké `navLinks`.

---

## 3. Pridať odkaz do **Footra** (`src/components/Footer.tsx`)

V stĺpci **„Menu"** pridáme nový `<li>` s `Link to="/zacni-s-golfom"` — vložíme ho medzi „Služby" a „BSGA Tour", aby sa zachovalo poradie konzistentné s Navbarom.

---

## 4. Routing (`src/App.tsx`)

Pridáme:
```tsx
import StartGolf from "./pages/StartGolf";
...
<Route path="/zacni-s-golfom" element={<StartGolf />} />
```

---

## Súhrn zmien
- **Nový súbor:** `src/pages/StartGolf.tsx`
- **Upravené:** `src/App.tsx` (route), `src/components/Navbar.tsx` (nav link), `src/components/Footer.tsx` (footer link)
- **Recyklujeme:** `ServiceCard`, `CursorGlowCard`, `AuroraBackground`, obrázky `service-start-cards.jpg` a `service-green-cards.jpg`
- **Bez backend zmien.** Nákupné tlačidlá vedú na existujúce Stripe Payment Links.

Schváľ plán a prepnem do default módu, kde rovno vytvorím stránku a doplním odkazy.
