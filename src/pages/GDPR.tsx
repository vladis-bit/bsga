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
                  <p className="text-sm sm:text-base leading-relaxed">
                    Občianske združenie Rozvíjajme golf o.z., prevádzkujúce golfovú akadémiu pod marketingovým názvom Best Swing Golf Academy (BSGA), si plne uvedomuje dôležitosť ochrany osobných údajov svojich klientov, záujemcov o kurzy a návštevníkov webovej stránky. Tieto Zásady upravujú spôsob, akým BSGA zhromažďuje, spracúva, uchováva a chráni osobné údaje v súlade s nariadením GDPR a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.
                  </p>
                </div>

                {/* 2 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    2. Totožnosť a kontaktné údaje prevádzkovateľa
                  </h2>
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
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">4.1 Plnenie zmluvy</h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Spracúvanie je nevyhnutné na registráciu a správu vašich golfových kurzov, lekcií a tréningov, vystavovanie faktúr a potvrdení, ako aj na komunikáciu súvisiacu s objednanými službami.
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">4.2 Oprávnený záujem</h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Na základe oprávneného záujmu spracúvame údaje na účely zlepšovania kvality služieb, analýzy využívania webu, ochrany pred podvodmi a bezpečnosti IT systémov.
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">4.3 Súhlas</h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Na základe vášho dobrovoľného súhlasu môžeme spracúvať vaše údaje na zasielanie newsletters, marketingových ponúk a informácií o novinkách. Súhlas môžete kedykoľvek odvolať.
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">4.4 Zákonná povinnosť</h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    V niektorých prípadoch sme povinní uchovávať vaše údaje na základe platných právnych predpisov (napr. daňové a účtovné povinnosti).
                  </p>
                </div>

                {/* 5 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    5. Doba uchovávania osobných údajov
                  </h2>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Zmluvné údaje: po dobu trvania zmluvy a 5 rokov po skončení</li>
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
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
                    <li>Akreditovaní tréneri a inštruktori BSGA</li>
                    <li>Poskytovatelia IT služieb a cloudového hostingu</li>
                    <li>Platobné brány a banky (pri realizácii platieb)</li>
                  </ul>
                </div>

                {/* 7 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    7. Cookies a sledovacie technológie
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Naša webová stránka využíva súbory cookies a podobné sledovacie technológie.
                  </p>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">7.1 Typy cookies</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Nevyhnutné cookies – zabezpečujú základnú funkčnosť webu (nevyžadujú súhlas)</li>
                    <li>Analytické cookies – pomáhajú pochopiť, ako návštevníci používajú web (vyžadujú súhlas)</li>
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
                  <ul className="list-disc list-inside text-sm sm:text-base space-y-1 mb-3">
                    <li>Právo na prístup – informácie o tom, aké údaje o vás spracúvame</li>
                    <li>Právo na opravu – požadovať opravu nesprávnych údajov</li>
                    <li>Právo na vymazanie („zabudnutie")</li>
                    <li>Právo na obmedzenie spracúvania</li>
                    <li>Právo na prenosnosť údajov</li>
                    <li>Právo namietať voči spracúvaniu</li>
                    <li>Právo odvolať súhlas</li>
                  </ul>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Svoju žiadosť môžete uplatniť na e-mailovej adrese: info@bsga.sk. Na vašu žiadosť odpovieme najneskôr do 30 dní.
                  </p>
                </div>

                {/* 9 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    9. Právo podať sťažnosť
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3">
                    Ak sa domnievate, že spracúvaním vašich údajov dochádza k porušeniu GDPR, máte právo podať sťažnosť dozornému orgánu:
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
                    Prijímame primerané technické a organizačné opatrenia na ochranu vašich osobných údajov:
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
                    Osobné údaje primárne spracúvame v rámci EHP. V prípade prenosu do tretích krajín zabezpečujeme ochranu prostredníctvom štandardných zmluvných doložiek schválených Európskou komisiou.
                  </p>
                </div>

                {/* 12 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    12. Zmeny Zásad ochrany osobných údajov
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Rozvíjajme golf o.z. si vyhradzuje právo tieto Zásady kedykoľvek aktualizovať. O podstatných zmenách vás budeme informovať prostredníctvom e-mailu alebo oznámením na webovej stránke.
                  </p>
                </div>

                {/* 13 */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    13. Kontakt
                  </h2>
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
