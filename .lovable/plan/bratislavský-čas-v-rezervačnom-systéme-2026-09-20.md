# Bratislavský čas v rezervačnom systéme

## Rozsah
- Zaviesť spoločné pomocné funkcie pre dátum a čas v zóne `Europe/Bratislava` bez novej závislosti.
- V klientskom kalendári počítať dnešný deň, navigáciu dátumov, sloty, minulé termíny a ISO hodnotu rezervácie výlučne podľa Bratislavy.
- V admin formulári previesť zadaný dátum a čas z Bratislavy na správny UTC ISO reťazec.
- Pod klientsky kalendár doplniť text: „Všetky časy sú uvedené v stredoeurópskom čase (Bratislava).“
- Overiť správanie simuláciou odlišnej časovej zóny prehliadača a skontrolovať zostavenie.

## Technické riešenie
Použijem `Intl.DateTimeFormat` na získanie bratislavských častí dátumu a výpočet offsetu vrátane letného/zimného času. Lokálne dátumové kľúče budú reprezentované stabilne bez závislosti od časovej zóny zariadenia; pred uložením sa bratislavský čas prevedie na UTC ISO.
