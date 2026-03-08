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
          content="Obchodné podmienky BSGA - Best Swing Golf Academy. Všeobecné obchodné podmienky poskytovania služieb."
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
                    1. Všeobecné ustanovenia
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Tieto všeobecné obchodné podmienky upravujú práva a povinnosti
                    medzi Best Swing Golf Academy (BSGA) a zákazníkom pri
                    poskytovaní služieb. Kontaktovať nás môžete na emailovej adrese
                    info@bsga.sk.
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    2. Objednávka služieb
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Objednávka služieb sa uskutočňuje prostredníctvom kontaktného
                    formulára na webovej stránke, emailom alebo telefonicky.
                    Objednávka je záväzná po jej potvrdení zo strany BSGA.
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    3. Platobné podmienky
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Platba za služby sa uskutočňuje prevodom na bankový účet alebo
                    v hotovosti. Ceny služieb sú uvedené vrátane DPH, ak nie je
                    uvedené inak.
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    4. Storno podmienky
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Zákazník má právo zrušiť objednávku najneskôr 48 hodín pred
                    plánovaným termínom služby bez storno poplatku. Pri neskoršom
                    zrušení si BSGA vyhradzuje právo účtovať storno poplatok vo
                    výške 50 % z ceny služby.
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    5. Reklamácie
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Reklamácie je možné podávať písomne na emailovú adresu
                    info@bsga.sk. Reklamácia bude vybavená v lehote 30 dní od jej
                    doručenia.
                  </p>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3 sm:mb-4">
                    6. Záverečné ustanovenia
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Tieto obchodné podmienky nadobúdajú platnosť dňom ich
                    zverejnenia na webovej stránke. BSGA si vyhradzuje právo na
                    ich zmenu. Aktuálne znenie je vždy dostupné na tejto stránke.
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

export default TermsAndConditions;
