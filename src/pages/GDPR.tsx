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
          content="Zásady ochrany osobných údajov BSGA - Best Swing Golf Academy. Informácie o spracovaní a ochrane vašich osobných údajov."
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
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-10 sm:py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6 sm:space-y-8 text-muted-foreground">
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    1. Prevádzkovateľ
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Prevádzkovateľom vašich osobných údajov je Best Swing Golf
                    Academy (BSGA). Kontaktovať nás môžete na emailovej adrese
                    info@bsga.sk.
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    2. Aké údaje spracúvame
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Pri vyplnení kontaktného formulára spracúvame: meno,
                    priezvisko, emailovú adresu, telefónne číslo (ak je
                    poskytnuté) a obsah správy.
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    3. Účel spracovania
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Vaše osobné údaje spracúvame za účelom vybavenia vašej
                    požiadavky, komunikácie ohľadom našich služieb a zasielania
                    informácií o novinkách a akciách (len s vaším súhlasom).
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    4. Doba uchovávania
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Vaše údaje uchovávame po dobu nevyhnutnú na splnenie účelu
                    spracovania, maximálne však 3 roky od posledného kontaktu.
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    5. Vaše práva
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Máte právo na prístup k vašim údajom, ich opravu, vymazanie,
                    obmedzenie spracovania, prenosnosť údajov a právo namietať
                    proti spracovaniu. Pre uplatnenie týchto práv nás
                    kontaktujte na info@bsga.sk.
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    6. Bezpečnosť údajov
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Prijímame primerané technické a organizačné opatrenia na
                    ochranu vašich osobných údajov pred neoprávneným prístupom,
                    zmenou, zverejnením alebo zničením.
                  </p>
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
