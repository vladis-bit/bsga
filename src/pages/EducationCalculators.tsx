import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EducationCalculators = () => {
  return (
    <>
      <Helmet>
        <title>Golfové kalkulačky | Edukačné centrum | BSGA</title>
        <meta name="description" content="Golfové kalkulačky - výpočty pre váš golf." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32">
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
                Pracujeme na golfových kalkulačkách, ktoré vám pomôžu s výpočtami handicapu, vzdialeností a ďalších užitočných metrík.
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
