# Kalendárová príloha k rezerváciám

## Cieľ
Pridať súbor `bsga-rezervacia.ics` do potvrdzovacieho e-mailu aj pripomienky rezervácie bez zmeny ich HTML obsahu alebo vzhľadu.

## Implementácia
- Vytvoriť spoločný generátor iCalendar udalosti pre rezervácie Performance Center.
- Udalosť nastaví `METHOD:REQUEST`, stabilné `UID` odvodené od ID rezervácie, názov simulátora, začiatok a koniec v zóne `Europe/Bratislava`, adresu a popis s cenou, dĺžkou a odkazom na detail.
- Korektne escapovať texty, zalamovať dlhé iCalendar riadky a pripraviť obsah v Base64 pre Resend.
- Rozšíriť existujúcu spoločnú Resend pomôcku o podporu príloh.
- Pridať rovnakú `.ics` prílohu do potvrdenia aj pripomienky, pričom HTML šablóny zostanú nedotknuté.
- Nasadiť dotknuté serverové funkcie a overiť ich zostavenie.

## Technické detaily
- Bez novej npm závislosti.
- Názov prílohy: `bsga-rezervacia.ics`.
- MIME typ: `text/calendar; charset=utf-8; method=REQUEST`.
- Stabilné UID zabezpečí, že pripomienka aktualizuje existujúcu udalosť namiesto vytvorenia duplikátu.
