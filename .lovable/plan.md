

# Vylepšenie headru -- Premium navigácia

## Prehľad zmien

Navbar dostane tri vylepšenia: glassmorphism efekt, zmenšovanie pri scrolle, skrývanie pri scrolle nadol a zlatý podklad pod aktívnou stránkou.

## Čo sa zmení

### 1. Glassmorphism pozadie
- Namiesto plného `bg-background` bude header priehľadný s rozmazaním (`backdrop-blur-xl`, `bg-background/80`)
- Jemný border na spodku headru namiesto `shadow-md`

### 2. Shrink on scroll
- Pri scrolle nadol sa zmenší padding a logo (napr. logo z `h-16` na `h-10`)
- Plynulá CSS transition animácia

### 3. Skrytie pri scrolle nadol / zobrazenie pri scrolle nahor
- Header sa posunie hore (`-translate-y-full`) keď scrolluješ nadol
- Znovu sa objaví keď scrolluješ nahor
- Plynulá transition animácia

### 4. Zlatý podklad pod aktívnou stránkou
- Aktívny nav link dostane zlatý background pill (`bg-gold/20 rounded-full`) namiesto len zmeny farby textu
- Jemný hover efekt na ostatných linkoch

## Technické detaily

### Súbor: `src/components/Navbar.tsx`
- Pridanie `useEffect` hooku na sledovanie scroll pozície a smeru
- State: `isScrolled` (boolean), `isVisible` (boolean), `lastScrollY` (number)
- Dynamické triedy na `<nav>`: `backdrop-blur-xl bg-background/80` + conditioned `py` padding + `-translate-y-full` keď skrytý
- Aktívny link: `bg-gold/20 text-gold rounded-full px-4 py-1.5`
- Všetky transitions cez `transition-all duration-300`

### Žiadne nové závislosti ani súbory
