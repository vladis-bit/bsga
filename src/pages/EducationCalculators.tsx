import { Link } from "react-router-dom";
import { ArrowLeft, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const BREADCRUMBS = [
  { name: "Domov", url: "https://bsga.sk/" },
  { name: "Edukačné centrum", url: "https://bsga.sk/edukacne-centrum" },
  { name: "Kalkulačky", url: "https://bsga.sk/edukacne-centrum/kalkulacky" },
];

const EducationCalculators = () => {
  return (
    <>
      <SEO
        title="Golfové kalkulačky | Edukačné centrum | BSGA"
        description="Golfové kalkulačky BSGA: pripravujeme nástroje na výpočet handicapu, vzdialeností úderov a skóre, ktoré vám pomôžu sledovať zlepšovanie vašej hry."
        path="/edukacne-centrum/kalkulacky"
        breadcrumbs={BREADCRUMBS}
        noindex
      />

      <Navbar />
      <Breadcrumbs items={BREADCRUMBS} />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <Link to="/edukacne-centrum">
            <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Späť na Edukačné centrum
            </Button>
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-8">
            Golfové kalkulačky
          </h1>
        </div>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="p-6 rounded-2xl bg-gold/10 mb-6">
                <Calculator className="h-16 w-16 text-gold" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Už čoskoro
              </h2>
              <p className="text-muted-foreground max-w-md">
                Pracujeme na sade golfových kalkulačiek, ktoré vám uľahčia prácu s číslami vo vašej hre. Pripravujeme kalkulačku handicapu podľa systému WHS, prepočet hracieho handicapu na konkrétne ihrisko podľa course a slope ratingu, kalkulačku vzdialeností úderov s jednotlivými palicami a nástroj na sledovanie štatistík ako fairways, greeny v regulácii či počet patov na kolo.
              </p>
              <p className="mt-4 text-muted-foreground max-w-md">
                Kým budú kalkulačky hotové, nájdete v Edukačnom centre pravidlá golfu, golfovú etiketu aj záverečný test na zelenú kartu. Ak potrebujete pomôcť s výpočtom handicapu už teraz, ozvite sa našim trénerom.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default EducationCalculators;
