## Cieľ

Nahradiť 15 samostatných Stripe Payment Linkov jedným nákupným košíkom: zákazník si pridá mikinu + poukážku + lekciu, uvidí zhrnutie objednávky a zaplatí naraz v jednej platbe — vrátane dopravy a kontroly skladu.

## Prečo je to zmena na pozadí

Payment Link je vždy len jedna pevná položka, takže viacpoložkovú objednávku technicky neumožňuje. Potrebná je platobná session vytvorená serverom z obsahu košíka — to zabezpečí vstavaná Stripe integrácia v Lovable (netreba vlastný Stripe účet ani kľúč, test prostredie vznikne hneď). Vyžaduje Pro plán.

Dôležité: produkty sa musia vytvoriť nanovo v novej integrácii — existujúce Payment Linky sa neprenesú. Kým nebude nový tok overený, staré linky nechám funkčné.

Pri fyzickom tovare (mikiny, šiltovky, tašky, uteráky) nastavím Stripe na výpočet a výber DPH (+0,5 % za transakciu); registráciu a odvod DPH rieši BSGA. Plná compliance správa sa na fyzický tovar nevzťahuje.

## Postup

**1. Zapnutie platieb**
Zapnem vstavanú Stripe integráciu a v Lovable Cloud pripravím backend (serverová funkcia + webhook).

**2. Katalóg v databáze**
Tabuľky `products` (názov, popis, cena, typ: merch/služba/poukážka, obrázok, či sa posiela), `product_variants` (farba, veľkosť, počet kusov na sklade), `orders` a `order_items`. Verejné čítanie katalógu, zápis objednávok len cez server. Naplním ich súčasnými 15 položkami vrátane variantov (mikina čierna/zelená/žltá, šiltovka biela/sivá).

**3. Košík vo frontende**
- Stav košíka v `localStorage` (prežije obnovenie stránky)
- Tlačidlo „Pridať do košíka" na kartách namiesto priameho „Kúpiť"
- Ikona košíka s počtom položiek v navigácii
- Bočný panel: položky, varianty, množstvo, medzisúčet, doprava, celkom
- Dizajn v zlatej téme, plne optimalizovaný pre mobil a tablet

**4. Objednávka a platba**
Serverová funkcia overí ceny a dostupnosť skladu z databázy (nikdy nedôveruje cenám z prehliadača), vytvorí jednu Stripe session so všetkými položkami, vyžiada doručovaciu adresu, ponúkne dopravu (kuriér na Slovensko / osobný odber na akadémii zdarma) a zapne výpočet DPH.

**5. Po platbe**
Webhook uloží objednávku, zníži stav skladu a označí platbu. Stránka „Ďakujeme za objednávku" so zhrnutím a číslom objednávky.

**6. Kontrola skladu**
Vypredaný variant sa nedá pridať do košíka a na karte je označený ako nedostupný. Poukážky a služby sklad neriešia.

## Technické detaily

- Ceny a sklad sa validujú výhradne na serveri pri vytváraní session
- Webhook je idempotentný — dvojité doručenie neznižuje sklad dvakrát
- Sklad sa odpisuje až po potvrdenej platbe
- Product/Offer JSON-LD schéma sa prepojí na nový katalóg, aby SEO rich results zostali funkčné
- Staré Payment Linky odstránim až po overení nového toku v testovacom režime

## Čo nie je zahrnuté

Administrácia objednávok a skladu (rozhranie pre správu) — dá sa doplniť ako ďalší krok. Zatiaľ sa objednávky pozerajú v databáze a notifikáciou na e-mail.
