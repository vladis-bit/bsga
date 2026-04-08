import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GDPR = () => {
  return (
    <>
      <Helmet>
        <title>Zásady ochrany osobných údajov | BSGA</title>
        <meta
          name="description"
          content="Zásady ochrany osobných údajov BSGA - Best Swing Golf Academy. Informácie o spracovaní a ochrane vašich osobných údajov platné od 8. marca 2026."
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
                  Zásady ochrany osobných údajov
                </h1>
                <p className="text-primary-foreground/70 mt-2 text-sm sm:text-base">
                  Platné od 8. marca 2026
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

                {/* 1 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    1. Úvodné ustanovenia
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Občianske združenie Rozvíjajme golf o.z., prevádzkujúce golfovú akadémiu pod marketingovým názvom Best Swing Golf Academy (BSGA) (ďalej len Prevádzkovateľ alebo BSGA) si plne uvedomuje dôležitosť ochrany osobných údajov svojich klientov, záujemcov o kurzy a návštevníkov webovej stránky.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Tieto Zásady ochrany osobných údajov (ďalej len Zásady) upravujú spôsob, akým BSGA zhromažďuje, spracúva, uchováva a chráni osobné údaje v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 o ochrane fyzických osôb pri spracúvaní osobných údajov (ďalej len GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.
                  </p>
                </div>

                {/* 2 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    2. Totožnosť a kontaktné údaje prevádzkovateľa
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Prevádzkovateľom osobných údajov je:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Obchodné meno: Rozvíjajme golf o.z.</li>
                    <li>Marketingový názov: Best Swing Golf Academy (BSGA)</li>
                    <li>Sídlo: Župné námestie 3, 811 03 Bratislava</li>
                    <li>IČO: 53 482 409</li>
                    <li>DIČ: 2121724605</li>
                    <li>Webová stránka: https://bsga.sk</li>
                    <li>E-mail pre ochranu osobných údajov: info@bsga.sk</li>
                  </ul>
                </div>

                {/* 3 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    3. Aké osobné údaje spracúvame
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    V závislosti od účelu spracúvania môžeme zhromažďovať nasledovné kategórie osobných údajov:
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">3.1 Identifikačné a kontaktné údaje</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Meno a priezvisko</li>
                    <li>E-mailová adresa</li>
                    <li>Telefónne číslo</li>
                    <li>Poštová adresa</li>
                  </ul>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">3.2 Údaje súvisiace so službami</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Informácie o absolvovaných kurzoch a tréningoch</li>
                    <li>Úroveň hráčskych schopností a golfový handicap</li>
                    <li>História rezervácií a platieb</li>
                    <li>Komunikácia s trénermi a administráciou akadémie</li>
                  </ul>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">3.3 Technické a prevádzkové údaje</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>IP adresa a typ prehliadača</li>
                    <li>Cookies a identifikátory relácie</li>
                    <li>Čas a dátum návštevy webovej stránky</li>
                    <li>Navštívené podstránky a správanie na webe</li>
                  </ul>
                </div>

                {/* 4 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    4. Právny základ a účely spracúvania
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Vaše osobné údaje spracúvame len na základe zákonného právneho základu:
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">4.1 Plnenie zmluvy (čl. 6 ods. 1 písm. b) GDPR)</h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Spracúvanie je nevyhnutné na registráciu a správu vašich golfových kurzov, lekcií a tréningov, vystavovanie faktúr a potvrdení, ako aj na komunikáciu súvisiacu s objednanými službami.
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">4.2 Oprávnený záujem (čl. 6 ods. 1 písm. f) GDPR)</h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Na základe oprávneného záujmu spracúvame údaje na účely zlepšovania kvality našich služieb, analýzy využívania webovej stránky, ochrany pred podvodmi a bezpečnosti IT systémov.
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">4.3 Súhlas (čl. 6 ods. 1 písm. a) GDPR)</h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Na základe vášho dobrovoľného súhlasu môžeme spracúvať vaše údaje na zasielanie newsletters, marketingových ponúk a informácií o novinkách a podujatiach BSGA. Súhlas môžete kedykoľvek odvolať.
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">4.4 Zákonná povinnosť (čl. 6 ods. 1 písm. c) GDPR)</h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    V niektorých prípadoch sme povinní uchovávať vaše údaje na základe platných právnych predpisov (napr. daňové a účtovné povinnosti).
                  </p>
                </div>

                {/* 5 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    5. Doba uchovávania osobných údajov
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Vaše osobné údaje uchovávame len po dobu nevyhnutnú na splnenie účelu, na ktorý boli zhromaždené:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Zmluvné údaje: po dobu trvania zmluvného vzťahu a 5 rokov po jeho skončení</li>
                    <li>Účtovné doklady: 10 rokov v súlade s účtovnými predpismi SR</li>
                    <li>Marketingové súhlasy: do odvolania súhlasu</li>
                    <li>Technické logy a cookies: 12 mesiacov</li>
                    <li>Klientske profily a tréningová história: po dobu aktívneho členstva + 3 roky</li>
                  </ul>
                </div>

                {/* 6 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    6. Príjemcovia osobných údajov
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Vaše osobné údaje môžu byť poskytnuté nasledovným kategóriám príjemcov:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Akreditovaní tréneri a inštruktori BSGA (v rozsahu potrebnom na poskytovanie tréningových služieb)</li>
                    <li>Poskytovatelia IT služieb a cloudového hostingu (spracúvajú údaje výlučne podľa našich pokynov)</li>
                    <li>Platobné brány a banky (pri realizácii platieb)</li>
                  </ul>
                </div>

                {/* 7 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    7. Cookies a sledovacie technológie
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Naša webová stránka https://bsga.sk využíva súbory cookies a podobné sledovacie technológie. Cookies sú malé textové súbory ukladané vo vašom prehliadači.
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">7.1 Typy cookies</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Nevyhnutné cookies – zabezpečujú základnú funkčnosť webu (nevyžadujú súhlas)</li>
                    <li>Analytické cookies – pomáhajú nám pochopiť, ako návštevníci používajú náš web (vyžadujú súhlas)</li>
                    <li>Marketingové cookies – umožňujú zobrazovanie personalizovanej reklamy (vyžadujú súhlas)</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Nastavenia cookies môžete kedykoľvek zmeniť v nastaveniach vášho prehliadača alebo prostredníctvom nášho cookie bannera.
                  </p>
                </div>

                {/* 8 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    8. Vaše práva ako dotknutej osoby
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Ako dotknutá osoba máte podľa GDPR nasledovné práva:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Právo na prístup – máte právo získať informácie o tom, aké osobné údaje o vás spracúvame</li>
                    <li>Právo na opravu – môžete požadovať opravu nesprávnych alebo neúplných údajov</li>
                    <li>Právo na vymazanie („zabudnutie") – za určitých podmienok môžete požadovať vymazanie vašich údajov</li>
                    <li>Právo na obmedzenie spracúvania – môžete požadovať dočasné pozastavenie spracúvania</li>
                    <li>Právo na prenosnosť údajov – môžete získať svoje údaje v štruktúrovanom, strojovo čitateľnom formáte</li>
                    <li>Právo namietať – máte právo namietať voči spracúvaniu na základe oprávneného záujmu alebo priameho marketingu</li>
                    <li>Právo odvolať súhlas – ak je spracúvanie založené na súhlase, môžete ho kedykoľvek odvolať</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Svoju žiadosť môžete uplatniť na e-mailovej adrese: info@bsga.sk. Na vašu žiadosť odpovieme bez zbytočného odkladu, najneskôr do 30 dní.
                  </p>
                </div>

                {/* 9 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    9. Právo podať sťažnosť
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Ak sa domnievate, že spracúvaním vašich osobných údajov dochádza k porušeniu GDPR alebo zákona o ochrane osobných údajov, máte právo podať sťažnosť dozornému orgánu:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Úrad na ochranu osobných údajov Slovenskej republiky</li>
                    <li>Hraničná 12, 820 07 Bratislava 27</li>
                    <li>Tel.: +421 2 3231 3214</li>
                  </ul>
                </div>

                {/* 10 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    10. Bezpečnosť osobných údajov
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Rozvíjajme golf o.z. prijíma primerané technické a organizačné opatrenia na ochranu vašich osobných údajov pred neoprávneným prístupom, stratou, zničením alebo neoprávneným zverejnením. Medzi tieto opatrenia patrí:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Šifrovanie dát pri prenose (SSL/TLS)</li>
                    <li>Kontrola prístupu a autentifikácia zamestnancov</li>
                    <li>Pravidelné bezpečnostné audity a aktualizácie systémov</li>
                    <li>Zálohovanie dát a plány obnovy po havárii</li>
                    <li>Školenie zamestnancov v oblasti ochrany osobných údajov</li>
                  </ul>
                </div>

                {/* 11 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    11. Prenos osobných údajov do tretích krajín
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Rozvíjajme golf o.z. primárne spracúva osobné údaje v rámci Európskeho hospodárskeho priestoru (EHP). V prípade, že dochádza k prenosu údajov do tretích krajín, zabezpečujeme primeranú úroveň ochrany prostredníctvom štandardných zmluvných doložiek schválených Európskou komisiou alebo iných zákonných mechanizmov.
                  </p>
                </div>

                {/* 12 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    12. Zmeny Zásad ochrany osobných údajov
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Rozvíjajme golf o.z. si vyhradzuje právo tieto Zásady kedykoľvek aktualizovať. O podstatných zmenách vás budeme informovať prostredníctvom e-mailu alebo oznámením na našej webovej stránke. Odporúčame vám pravidelne sledovať aktuálnu verziu Zásad na stránke https://bsga.sk.
                  </p>
                </div>

                {/* 13 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    13. Kontakt
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    V prípade akýchkoľvek otázok týkajúcich sa ochrany osobných údajov nás môžete kontaktovať:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>E-mail: info@bsga.sk</li>
                    <li>Webová stránka: https://bsga.sk</li>
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

export default GDPR;
