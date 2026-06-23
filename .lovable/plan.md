## Cieľ
Pridať sekciu s 6 Google recenziami z víkendového kurzu zelenej karty na stránku `/zacni-s-golfom` pod Krok 1.

## Umiestnenie
V `src/pages/StartGolf.tsx` v sekcii `#vikendovy-kurz` — pod kartu "Čo je víkendový kurz?" (medzi koniec `Reveal` karty na riadku ~435 a uzatváracím `</section>` na ~438). Takto bude blok recenzií logicky pri víkendovom kurze, nad sekciou Zelená karta.

## Nový komponent
Vytvorím `src/components/CourseReviews.tsx` — samostatný komponent (znovupoužiteľný, čistý kód v StartGolf):

- Nadpis sekcie: malý gold eyebrow „Referencie" + h3 „Čo hovoria absolventi víkendového kurzu" + zlatý divider (rovnaký pattern ako `Testimonials.tsx`).
- Mriežka kariet: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`, `max-w-6xl mx-auto`.
- Karta:
  - `bg-background/75 border border-border/60 rounded-xl p-5 sm:p-6 hover:border-gold/40 transition`
  - Header: kruhový avatar s iniciálou (gold gradient — rovnako ako v `Testimonials`), meno (bold), pod ním „Google recenzia · víkendový kurz ZK".
  - 5 zlatých hviezdičiek (SVG ako v Testimonials).
  - Text recenzie (`text-sm leading-relaxed text-foreground/80 italic`), s `line-clamp-6` + tlačidlo „Čítať viac" ktoré rozbalí plný text (`useState` per karta). Dlhšie recenzie (Andrea, Matej) sa tým upracú.
- Reveal-on-scroll wrapper (rovnaký framer-motion pattern ako zvyšok stránky), stagger delay 0.05 × index.
- Pod mriežkou diskrétny riadok: „Recenzie pochádzajú z Google profilu BSGA" s ikonou/link na Google profil (zatiaľ bez URL — len text, ak používateľ neposkytne odkaz).

## Dáta recenzií (presne podľa screenshotov)
1. **Matúš Kráľovič** — „úžasní ľudia, prostredie, všetko. veľmi odporúčam a neviem čo iné by som zmenil. kurz prebiehal v peknej postupnosti zakončený hrou na ihrisku. tréner všetko vysvetlil a mal trpezlivosť aj s týmí, ktorým to možno až tak nešlo. vrelo odporúčam všetkým, ktorí si nevedia vybrať u koho urobiť zelenú kartu, určite neoľutujete:)"
2. **Peter Hrban** — „Veľmi pekne ďakujeme, že sme sa mohli zúčastniť kurzu ZK vo vašej akadémii. Všetko Tip Top na vysokej úrovni vrátane inštruktora Milana, ale celkovo Vašej BSGA 😉👍 krásny rezort a s ním vaše služby TOP 👏😉👍"
3. **Andrea Beno** — „Absolvovala som víkendový golfový kurz v Best Swing Golf Academy a nemohlo to byť lepšie! Bol to skvelý, pozitívnou energiou nabitý víkend, počas ktorého sme sa veľa naučili o etike a pravidlách hry. Na záver víkendu sme už boli schopní úspešne zahrať zopár jamiek. Stretla sa tu super partia ľudí, s ktorými sme si výborne sadli. Obrovská vďaka patrí Milanovi – viedol kurz absolútne perfektne, s obrovskou profesionalitou, no zároveň sme sa veľa nasmiali a od prvého momentu sme sa cítili nesmierne vítaní. Kurz odporúčam všetkými desiatimi!"
4. **Ivan Lomnický** — „Pán tréner Milan Neštický, ďakujem veľmi pekne za Váš perfektný profesionálny a priateľský prístup. Ísť práve k Vám na kurz zelenej karty bolo výborné rozhodnutie! Odporúčam každému, neoľutujete. 10/10 👍"
5. **Matej Babinec** — „Kurzom nás sprevádzal Milan Neštický a naozaj môžem len odporučiť. Celý kurz prebiehal vo veľmi príjemnej atmosfére, Milan všetko zrozumiteľne vysvetlil a venoval sa nám aj individuálne. Ako začiatočník som sa cítil veľmi dobre, dostal som veľa praktických rád a celý priebeh bol profesionálny, no zároveň uvoľnený. Ak niekto rozmýšľa nad zelenou kartou na golf, určite odporúčam."
6. **Štefan Baláž** — „Za dva dni sme prešli všetkým, čo sa týka golfu, a urobili sme 15 kilometrov v peknom prostredí v príjemnom kolektíve. Mali sme šťastie s erudovaným trénerom Milanom. U každého účastníka bol očividný pokrok."

## Súbory
- **Vytvoriť**: `src/components/CourseReviews.tsx`
- **Upraviť**: `src/pages/StartGolf.tsx` — import + vloženie `<CourseReviews />` v sekcii `#vikendovy-kurz` pod kartou víkendového kurzu.

## Out of scope
Existujúci karusel `Testimonials` na home page sa nemení.
