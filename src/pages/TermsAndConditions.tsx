import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const BREADCRUMBS = [
  { name: "Domov", url: "https://bsga.sk/" },
  { name: "Obchodné podmienky", url: "https://bsga.sk/obchodne-podmienky" },
];

const TermsAndConditions = () => {
  return (
    <>
      <SEO
        title="Obchodné podmienky | BSGA"
        description="Obchodné podmienky BSGA - Best Swing Golf Academy. Všeobecné obchodné podmienky poskytovania služieb platné od 9. marca 2026."
        path="/obchodne-podmienky"
        breadcrumbs={BREADCRUMBS}
      />
      <Navbar />
      <Breadcrumbs items={BREADCRUMBS} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Obchodné podmienky
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Platné od 9. marca 2026
          </p>
        </div>

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
                    <li>Obchodné meno (právna forma): Rozvíjajme golf o.z.</li>
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
                    <li>Individuálne lekcie – osobný tréning s licencovaným trénerom, zameraný na individuálne potreby klienta.</li>
                    <li>Skupinové lekcie – tréning v malých skupinách s dôrazom na techniku a tímovú dynamiku.</li>
                    <li>Course Management – tréning s PGA trénerom priamo na ihrisku s analýzou hry.</li>
                    <li>Fitting – meranie a testovanie golfového vybavenia na mieru.</li>
                  </ul>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">2.1.2 Kurzy a certifikácia</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Štart karty – program pre úplných začiatočníkov zameraný na získanie pevných základov golfu.</li>
                    <li>Zelená karta (HCP kurz) – komplexný kurz v trvaní 12 hodín s odbornou skúškou; absolvovaním získa Klient oficiálnu spôsobilosť hrať na ihrisku. Doplatok za záverečnú skúšku a vydanie zelenej karty je 80 EUR (platba na mieste).</li>
                  </ul>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">2.1.3 Juniorská akadémia</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Baby Kids (5 – 8 rokov) – hrávné aktivity, základné motorické zručnosti a koordinácia. Trénerka: Vanessa Fajkusová.</li>
                  </ul>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">2.1.4 Eventy, tábory a turnaje</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Detské kempy – letné tábory s golfovým programom. 1. turnus: 6. – 10. 7. 2026; 2. turnus: 3. – 7. 8. 2026.</li>
                    <li>Firemné akcie a teambuildingy – príjemné podujatia prispôsobené potrebám firiem a kolektívov.</li>
                    <li>BSGA Tour 2026 – exkluzívna séria 5 turnajov na prémiových ihriskách Slovenska: 15. 5. (Hrubá Borša), 5. 6. (Tále), 17. 7. (Penati – Heritage), 14. 8. (Penati – Legend), 4. 9. 2026 (Ostravice).</li>
                  </ul>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">2.1.5 BSGA Performance Centre</h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Rezervácia tréningových termínov v Performance Centre (Zuzany Chalupovej 12, Bratislava – Petržalka) prebieha výlučne online prostredníctvom rezervačného systému na adrese https://bsga-performance-center.reenio.sk/sk/terms/. Dostupné technológie: Trackman 4 a FlightScope Mevo+. Vstup do centra je bezkontaktný a flexibilný – podrobnosti obdrží Klient po rezervácii.
                  </p>
                </div>

                {/* Článok 3 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 3 – Objednávka a uzavretie zmluvy
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    3.1 Klient môže vykonať objednávku prostredníctvom:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>webovej stránky www.bsga.sk alebo príslušných podstránok,</li>
                    <li>rezervačného systému BSGA Performance Centre,</li>
                    <li>e-mailom na adresu príslušného trénera alebo na info@bsga.sk,</li>
                    <li>telefónicky na čísle +421 917 225 276.</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    3.2 Zmluva o poskytnutí služby je uzavretá okamihom potvrdenia objednávky zo strany BSGA (e-mailom alebo iným preukázateľným spôsobom). BSGA si vyhradzuje právo odmietnuť objednávku v odôvodnených prípadoch.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    3.3 Pri nákupe produktov a darčekových poukazov cez online platformy tretích strán (napr. ZlavaDna.sk) sa cena a platobné podmienky riadia podmienkami danej platformy. Tieto OP sa vzťahujú na samotné poskytnutie služby.
                  </p>
                </div>

                {/* Článok 4 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 4 – Ceny a platobné podmienky
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    4.1 Všetky ceny sú uvedené v EUR. Pokiaľ nie je výslovne uvedené inak, ceny nezahŕňajú DPH. Aktuálny cenník je zverejnený na webovej stránke www.bsga.sk.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">
                    4.2 Príklady orientačných cien (podliehajú zmenám):
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Kurz Zelenej karty (HCP): 129 EUR (zvýhodnená cena) / 500 EUR (bežná cena); doplatok za skúšku: 80 EUR (platba na mieste).</li>
                    <li>Sponzorský balík BSGA Tour (celá sezóna): 5 500 EUR bez DPH.</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">4.3 Platba je možná:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Bankovým prevodom na základe vystavenej faktúry (splatnosť 14 dní)</li>
                    <li>Online platobnou kartou alebo iným elektronickým platobným prostriedkom (podľa dostupnosti v rezervačnom systéme)</li>
                    <li>V hotovosti na mieste (len pri vybraných službách)</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed">
                    4.4 V prípade omeškania s úhradou má BSGA nárok na zákonný úrok z omeškania v súlade s platnými právnymi predpismi.
                  </p>
                </div>

                {/* Článok 5 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 5 – Storno podmienky a vrátenie platieb
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">5.1 Storno podmienky pre tréningové lekcie a kurzy:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Zrušenie viac ako 48 hodín pred termínom: plná suma bude vrátená alebo presunutá na náhradný termín.</li>
                    <li>Zrušenie 24 – 48 hodín pred termínom: 50 % storno poplatok; zostatok je možné preniesť na iný termín.</li>
                    <li>Zrušenie menej ako 24 hodín pred termínom alebo neúčasť bez ohlásenia: 100 % storno poplatok, bez nároku na náhradu.</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    5.2 V prípade zrušenia podujatia zo strany BSGA (napr. pre nepriaznivé počasie alebo nedostatočný počet prihlásených) bude Klientovi ponúknutý náhradný termín, prípadne plné vrátenie uhradenej čiastky.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    5.3 Vrátenie platieb prebieha rovnakou metódou, akou bola platba uskutočnená, a to do 14 pracovných dní od potvrdenia storna.
                  </p>
                </div>

                {/* Článok 6 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 6 – Práva a povinnosti Klienta
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">6.1 Klient je povinný:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Dostaviť sa na objednaný tréning alebo podujatie včas a v zodpovedajúcom zdravotnom stave.</li>
                    <li>Dodržiavať golfovú etiketu, pravidlá ihriska a pokyny trénerov a organizátorov.</li>
                    <li>Pri využívaní BSGA Performance Centre postupovať podľa prevádzkového poriadku (obsluha zariadení, vstup, parkovanie).</li>
                    <li>Uhradiť dohodnutú cenu za objednané služby v stanovenej lehote.</li>
                    <li>Poskytnúť pravdivé a úplné kontaktné údaje pri registrácii a objednávke.</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed">
                    6.2 Klient berie na vedomie, že golf je športová aktivita. BSGA nezodpovedá za úrazy, ku ktorým dôjde v dôsledku nerešpektovania pokynov trénerov, ihriskových pravidiel alebo v dôsledku zdravotného stavu Klienta.
                  </p>
                </div>

                {/* Článok 7 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 7 – Práva a povinnosti Poskytovateľa
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">7.1 Rozvíjajme golf o.z. (BSGA) sa zaväzuje:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Poskytovať objednané služby prostredníctvom licencovaných trénerov (Licencia A, B, D – PGA Slovakia).</li>
                    <li>Zabezpečiť kvalitné tréningové prostredie, vybavenie a pomôcky.</li>
                    <li>Informovať Klienta o prípadných zmenách termínov alebo podmienok bez zbytočného odkladu.</li>
                    <li>Spracúvať osobné údaje Klienta v súlade s platnou legislatívou (GDPR).</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed">
                    7.2 BSGA si vyhradzuje právo zmeniť obsah lekcie alebo podujatia v prípade nepriaznivých poveternostných podmienok, vyššej moci alebo iných objektívnych dôvodov. Klientovi bude v takom prípade ponúknutá adekvátna náhrada.
                  </p>
                </div>

                {/* Článok 8 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 8 – Ochrana osobných údajov (GDPR)
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    8.1 Rozvíjajme golf o.z. spracúva osobné údaje Klientov v súlade s nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">
                    8.2 Osobné údaje (meno, priezvisko, e-mail, telefón) sú zhromažďované výlučne na účely:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>plnenia zmluvy – poskytnutie objednaných služieb,</li>
                    <li>komunikácie s Klientom – potvrdenia, zmeny termínov, obchodné informácie,</li>
                    <li>plnenia zákonných povinností.</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    8.3 Klient má právo na prístup k svojim údajom, ich opravu, vymazanie, obmedzenie spracovania, prenosnosť a právo podať sťažnosť na Úrade na ochranu osobných údajov SR (www.dataprotection.gov.sk).
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    8.4 Osobné údaje nie sú poskytované tretím stranám bez súhlasu Klienta, s výnimkou prípadov vyžadovaných zákonom alebo potrebných na plnenie zmluvy (napr. partnerské ihriská v rámci BSGA Tour).
                  </p>
                </div>

                {/* Článok 9 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 9 – Reklamácie a riešenie sporov
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    9.1 Akúkoľvek reklamáciu môže Klient uplatniť písomne e-mailom na adresu info@bsga.sk alebo bsga@bsga.sk, prípadne osobne na niektorej z prevádzok BSGA.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    9.2 BSGA sa zaväzuje vyjadriť sa k reklamácii do 30 dní od jej doručenia. V prípade oprávnenej reklamácie BSGA ponúkne Klientovi primerané riešenie – náhradný termín, zľavu alebo vrátenie platby.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    9.3 V prípade spotrebiteľských sporov má Klient právo obrátiť sa na príslušný orgán alternatívneho riešenia sporov (ARS) – Slovenská obchodná inšpekcia, www.soi.sk.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    9.4 Všetky vzťahy neupravené týmito OP sa riadia príslušnými ustanoveniami slovenského práva, najmä Obchodným zákonníkom a Občianskym zákonníkom.
                  </p>
                </div>

                {/* Článok 10 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 10 – Darčekové poukazy a kupóny
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    10.1 Darčekové poukazy a kupóny sú platné po dobu uvedenú na poukaze (spravidla do 12 mesiacov od zakúpenia). Po uplynutí platnosti poukaz zaniká bez náhrady.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    10.2 Poukaz nie je prenosný na inú osobu bez súhlasu BSGA a nie je možné ho zameniť za hotovosť.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    10.3 V prípade kupónov zakúpených prostredníctvom zľavových portálov sa platnosť a podmienky riadia zároveň podmienkami daného portálu.
                  </p>
                </div>

                {/* Článok 11 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    Článok 11 – Záverečné ustanovenia
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    11.1 BSGA si vyhradzuje právo tieto OP kedykoľvek zmeniť. Aktuálna verzia je vždy zverejnená na www.bsga.sk. Zmeny nadobúdajú účinnosť dátumom ich zverejnenia.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    11.2 Tieto OP nadobúdajú platnosť a účinnosť dňa 9. marca 2026.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-2">11.3 Kontaktné osoby:</p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Všeobecné informácie a objednávky: info@bsga.sk | bsga@bsga.sk | +421 917 225 276</li>
                    <li>BSGA Tour a partnerstvá: Peter Švajlen, MBA – peter@bsga.sk | touroffice@bsga.sk | +421 905 335 501</li>
                    <li>Detské kempy: kids@bsga.sk</li>
                    <li>BSGA Performance Centre: Peter Švajlen – +421 905 335 501</li>
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
