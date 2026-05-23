import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GreenCardQuiz from "@/components/GreenCardQuiz";

const EducationTests = () => {
  return (
    <>
      <Helmet>
        <title>Testy | Edukačné centrum | BSGA</title>
        <meta name="description" content="Záverečné otázky na zelenú kartu - otestujte svoje znalosti golfovej etikety a pravidiel." />
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
            Testy
          </h1>
        </div>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="green"
                className="border-2 border-border rounded-2xl bg-card overflow-hidden data-[state=open]:border-gold/60 data-[state=open]:shadow-lg data-[state=open]:shadow-gold/10 transition-all"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gold/5 text-left">
                  <span className="font-bold text-base sm:text-lg text-foreground">
                    🏌️ Skúška ZK – teória (33 otázok)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-2 sm:px-4 pb-6 pt-2">
                  <GreenCardQuiz />
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default EducationTests;
