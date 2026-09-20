# Admin e-maily rezervácií Performance Center

## Výsledok
- Pri zrušení rezervácie sa zobrazí potvrdenie: „Zrušiť rezerváciu a poslať klientovi informačný e-mail?“
- Admin môže zaškrtnúť „Neposielať e-mail“ a rezerváciu zrušiť bez správy klientovi.
- Pri bežnom zrušení sa po zmene stavu zavolá existujúci storno e-mail s ID rezervácie.
- Každá rezervácia vytvorená adminom dostane rovnaký potvrdzovací e-mail ako online rezervácia a označenie, že ju vytvoril admin.

## Zmeny
1. **Zoznam rezervácií**
   - Nahradiť okamžité tlačidlo „Zrušiť“ potvrdzovacím dialógom.
   - Pridať checkbox „Neposielať e-mail“.
   - Najprv uložiť stav `cancelled`, potom podľa voľby zavolať storno e-mail.
   - Zobraziť adminovi samostatnú správu o úspechu alebo zlyhaní e-mailu; zrušená rezervácia zostane zrušená aj pri chybe odoslania.

2. **Vytvorenie rezervácie adminom**
   - Upraviť vložený formulár „Pridať rezerváciu“ aj samostatnú admin stránku na vytvorenie rezervácie.
   - Pri uložení nastaviť `created_by_admin = true`, vyžiadať nové ID a čakať na výsledok `send-booking-confirmation`.
   - Potvrdenie posielať vždy; ak odoslanie zlyhá, rezervácia zostane uložená a admin dostane upozornenie. Serverový retry mechanizmus ju následne môže dobehnúť.

3. **Storno e-mailová funkcia**
   - Zachovať idempotenciu cez `cancel_email_at`.
   - Po úspechu uložiť `cancel_email_status = 'sent'`, vymazať starú chybu a uložiť čas odoslania.
   - Po chybe uložiť `cancel_email_status = 'failed'` a detail do `cancel_email_error`.
   - Obsah a vzhľad e-mailovej šablóny nemeníme.

## Technické detaily
- Použiť existujúce komponenty dialógu, checkboxu a tlačidiel z dizajnového systému.
- Nevyžaduje sa zmena databázovej schémy; potrebné stĺpce už existujú.
- Nasadiť aktualizovanú storno funkciu a overiť jej odpovede.

## Overenie
- Skontrolovať zrušenie s e-mailom aj so zaškrtnutým „Neposielať e-mail“.
- Skontrolovať vytvorenie rezervácie z oboch admin formulárov.
- Overiť responzívny dialóg, aktuálny stav zostavenia a záznamy e-mailových stavov.
