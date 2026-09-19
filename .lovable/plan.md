# AI vyhľadávanie vo fotogalérii

## Cieľ
Pridať nad galériu slovenské vyhľadávacie pole, do ktorého návštevník napíše opis alebo otázku, napríklad „fotky detí na greene“ alebo „kde sa odovzdávajú trofeje“. AI vráti najrelevantnejšie fotografie a krátke zhrnutie výsledku.

## Čo sa zmení
- Doplniť ku každej fotografii stabilný identifikátor a existujúci opis použiť ako vyhľadávací katalóg.
- Pridať do galérie vyhľadávací formulár, stav načítania, výsledný text, počet nájdených záberov, vyčistenie vyhľadávania a stav bez výsledkov.
- Po vyhľadaní zobraziť iba zoradené relevantné fotografie; kliknutie ich naďalej otvorí vo veľkom náhľade.
- Pridať serverovú funkciu v Lovable Cloud, ktorá odošle otázku a katalóg opisov do Lovable AI Gateway a vráti iba platné identifikátory fotografií.
- Použiť model `openai/gpt-6-astra`, streamované spracovanie na serveri a presné chybové správy z AI služby.
- Obmedziť a validovať vstup, aby sa zbytočne neposielali prázdne alebo nadmerne dlhé otázky.

## Technické detaily
- AI kľúč zostane výhradne na serveri; prehliadač bude volať iba funkciu projektu.
- Model bude vyhľadávať podľa kurátorovaných opisov fotografií, takže pri každom dopyte nebude potrebné znovu prenášať desiatky veľkých obrázkov.
- Výstup bude striktne kontrolovaný voči zoznamu existujúcich fotografií; neznáme alebo duplicitné výsledky sa zahodia.
- Zachová sa súčasný Ivory vzhľad, mriežka, modal aj SEO dáta galérie.

## Overenie
- Otestovať reálny AI dopyt cez nasadenú serverovú funkciu.
- Overiť typické slovenské otázky, prázdny výsledok, chybu služby a návrat na kompletnú galériu.
- Skontrolovať galériu na počítači aj mobile a potvrdiť čistý stav zostavenia.
