import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Obchodné podmienky | BSGA</title>
        <meta
          name="description"
          content="Obchodné podmienky BSGA - Best Swing Golf Academy. Všeobecné obchodné podmienky poskytovania služieb platné od 9. marca 2026."
        />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative w-full bg-background pt-4 sm:pt-8">
          <div className="px-2 sm:px-4 md:px-8">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-primary py-12 sm:py-16 md:py-20">
              <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary-foreground">
                  Obchodné podmienky
                </h1>
                <p className="text-primary-foreground/70 mt-2 text-sm sm:text-base">
                  Platné od 9. marca 2026 • Verzia 1.0
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-10 sm:py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6 sm:space-y-8 text-muted-foreground">

                {/* Článok 1 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 1 – Úvodné ustanovenia
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    1.1 Tieto obchodné podmienky (ďalej len „OP") upravujú zmluvné vzťahy medzi občianskym združením Rozvíjajme golf o.z., ktoré prevádzkuje Best Swing Golf Academy (ďalej len „BSGA" alebo „Poskytovateľ") a fyzickými alebo právnickými osobami (ďalej len „Klient"), ktoré si objednávajú alebo zakupujú služby a produkty prostredníctvom webovej stránky www.bsga.sk alebo iných online kanálov.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    1.2 Poskytovateľ – identifikačné údaje:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Obchodné meno: Rozvíjajme golf o.z.</li>
                    <li>Marketingové označenie: Best Swing Golf Academy (BSGA)</li>
                    <li>Zakladatelia: Peter Švajlen, MBA a Jakub Hrbáň</li>
                    <li>Sídlo: Župné námestie 3, 811 03 Bratislava</li>
                    <li>Adresa prevádzky: Zuzany Chalupovej 12, Bratislava – Petržalka (BSGA Performance Centre)</li>
                    <li>Pôsobíme tiež v: Golfový Klub Hrubá Borša a Red OAK Nitra</li>
                    <li>IČO: 53 482 409</li>
                    <li>DIČ: 2121724605</li>
                    <li>E-mail: info@bsga.sk</li>
                    <li>Telefón: +421 917 225 276</li>
                    <li>Webová stránka: www.bsga.sk</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed">
                    1.3 Odoslaním objednávky, registráciou na turnaj, zakúpením kupónu alebo iným potvrdením záujmu o služby Klient potvrdzuje, že sa oboznámil s týmito OP a súhlasí s nimi v plnom rozsahu.
                  </p>
                </div>

                {/* Článok 2 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 2 – Ponuka služieb a produktov
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">2.1 BSGA poskytuje nasledujúce kategórie služieb:</p>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">2.1.1 Tréningové služby</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Individuálne lekcie – osobný tréning s licencovaným trénerom</li>
                    <li>Skupinové lekcie – tréning v malých skupinách</li>
                    <li>Course Management – tréning s PGA trénerom priamo na ihrisku</li>
                    <li>Fitting – meranie a testovanie golfového vybavenia na mieru</li>
                  </ul>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">2.1.2 Kurzy a certifikácia</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Štart karty – program pre úplných začiatočníkov</li>
                    <li>Zelená karta (HCP kurz) – komplexný kurz v trvaní 12 hodín s odbornou skúškou; doplatok za skúšku a vydanie zelenej karty je 80 EUR</li>
                  </ul>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">2.1.3 Juniorská akadémia</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Baby Kids (5 – 8 rokov) – hrávné aktivity, základné motorické zručnosti a koordinácia</li>
                  </ul>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">2.1.4 Eventy, tábory a turnaje</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Detské kempy – letné tábory s golfovým programom</li>
                    <li>Firemné akcie a teambuildingy</li>
                    <li>BSGA Tour 2026 – exkluzívna séria 5 turnajov na prémiových ihriskách Slovenska</li>
                  </ul>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">2.1.5 BSGA Performance Centre</h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Rezervácia tréningových termínov v Performance Centre prebieha výlučne online. Dostupné technológie: Trackman 4 a FlightScope Mevo+.
                  </p>
                </div>

                {/* Článok 3 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 3 – Objednávka a uzavretie zmluvy
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    3.1 Klient môže vykonať objednávku prostredníctvom webovej stránky, rezervačného systému, e-mailom alebo telefónicky.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    3.2 Zmluva o poskytnutí služby je uzavretá okamihom potvrdenia objednávky zo strany BSGA. BSGA si vyhradzuje právo odmietnuť objednávku v odôvodnených prípadoch.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    3.3 Pri nákupe produktov cez online platformy tretích strán sa cena a platobné podmienky riadia podmienkami danej platformy.
                  </p>
                </div>

                {/* Článok 4 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 4 – Ceny a platobné podmienky
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    4.1 Všetky ceny sú uvedené v EUR. Pokiaľ nie je výslovne uvedené inak, ceny nezahŕňajú DPH. Aktuálny cenník je zverejnený na www.bsga.sk.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">4.3 Platba je možná:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Bankovým prevodom na základe vystavenej faktúry (splatnosť 14 dní)</li>
                    <li>Online platobnou kartou alebo iným elektronickým platobným prostriedkom</li>
                    <li>V hotovosti na mieste (len pri vybraných službách)</li>
                  </ul>
                </div>

                {/* Článok 5 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 5 – Storno podmienky a vrátenie platieb
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">5.1 Storno podmienky pre tréningové lekcie a kurzy:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Zrušenie viac ako 48 hodín pred termínom: plná suma bude vrátená alebo presunutá</li>
                    <li>Zrušenie 24 – 48 hodín pred termínom: 50 % storno poplatok</li>
                    <li>Zrušenie menej ako 24 hodín pred termínom alebo neúčasť: 100 % storno poplatok</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    5.2 V prípade zrušenia podujatia zo strany BSGA bude Klientovi ponúknutý náhradný termín, prípadne plné vrátenie uhradenej čiastky.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    5.3 Vrátenie platieb prebieha rovnakou metódou, akou bola platba uskutočnená, do 14 pracovných dní od potvrdenia storna.
                  </p>
                </div>

                {/* Článok 6 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 6 – Práva a povinnosti Klienta
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">6.1 Klient je povinný:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Dostaviť sa na objednaný tréning včas a v zodpovedajúcom zdravotnom stave</li>
                    <li>Dodržiavať golfovú etiketu, pravidlá ihriska a pokyny trénerov</li>
                    <li>Pri využívaní BSGA Performance Centre postupovať podľa prevádzkového poriadku</li>
                    <li>Uhradiť dohodnutú cenu za objednané služby v stanovenej lehote</li>
                    <li>Poskytnúť pravdivé a úplné kontaktné údaje</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed">
                    6.2 Klient berie na vedomie, že golf je športová aktivita. BSGA nezodpovedá za úrazy v dôsledku nerešpektovania pokynov trénerov alebo zdravotného stavu Klienta.
                  </p>
                </div>

                {/* Článok 7 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 7 – Práva a povinnosti Poskytovateľa
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">7.1 BSGA sa zaväzuje:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Poskytovať služby prostredníctvom licencovaných trénerov (Licencia A, B, D – PGA Slovakia)</li>
                    <li>Zabezpečiť kvalitné tréningové prostredie, vybavenie a pomôcky</li>
                    <li>Informovať Klienta o prípadných zmenách termínov bez zbytočného odkladu</li>
                    <li>Spracúvať osobné údaje v súlade s platnou legislatívou (GDPR)</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed">
                    7.2 BSGA si vyhradzuje právo zmeniť obsah lekcie v prípade nepriaznivých poveternostných podmienok alebo vyššej moci.
                  </p>
                </div>

                {/* Článok 8 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 8 – Ochrana osobných údajov (GDPR)
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    8.1 Rozvíjajme golf o.z. spracúva osobné údaje Klientov v súlade s nariadením GDPR a zákonom č. 18/2018 Z. z.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    8.2 Osobné údaje sú zhromažďované výlučne na účely plnenia zmluvy, komunikácie s Klientom a plnenia zákonných povinností.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    8.3 Klient má právo na prístup k svojim údajom, ich opravu, vymazanie, obmedzenie spracovania, prenosnosť a právo podať sťažnosť na Úrade na ochranu osobných údajov SR.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    8.4 Osobné údaje nie sú poskytované tretím stranám bez súhlasu Klienta, s výnimkou prípadov vyžadovaných zákonom.
                  </p>
                </div>

                {/* Článok 9 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 9 – Reklamácie a riešenie sporov
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    9.1 Reklamáciu môže Klient uplatniť písomne e-mailom na info@bsga.sk alebo bsga@bsga.sk, prípadne osobne na prevádzke.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    9.2 BSGA sa zaväzuje vyjadriť sa k reklamácii do 30 dní od jej doručenia.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    9.3 Klient má právo obrátiť sa na Slovenskú obchodnú inšpekciu (www.soi.sk).
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    9.4 Všetky vzťahy neupravené týmito OP sa riadia príslušnými ustanoveniami slovenského práva.
                  </p>
                </div>

                {/* Článok 10 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 10 – Darčekové poukazy a kupóny
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    10.1 Darčekové poukazy sú platné po dobu uvedenú na poukaze (spravidla 12 mesiacov). Po uplynutí platnosti poukaz zaniká bez náhrady.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    10.2 Poukaz nie je prenosný bez súhlasu BSGA a nie je možné ho zameniť za hotovosť.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    10.3 Pri kupónoch zo zľavových portálov sa podmienky riadia zároveň podmienkami daného portálu.
                  </p>
                </div>

                {/* Článok 11 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 11 – Záverečné ustanovenia
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    11.1 BSGA si vyhradzuje právo tieto OP kedykoľvek zmeniť. Aktuálna verzia je vždy zverejnená na www.bsga.sk.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    11.2 Tieto OP nadobúdajú platnosť a účinnosť dňa 9. marca 2026.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">11.3 Kontaktné osoby:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Všeobecné informácie: info@bsga.sk | +421 917 225 276</li>
                    <li>BSGA Tour a partnerstvá: touroffice@bsga.sk | +421 905 335 501</li>
                    <li>Detské kempy: kids@bsga.sk</li>
                    <li>BSGA Performance Centre: +421 905 335 501</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
