import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import GreenCardQuiz from "@/components/GreenCardQuiz";

const EducationTests = () => {
  return (
    <>
      <SEO
        title="Záverečný test ZK | Edukačné centrum | BSGA"
        description="Záverečné otázky na zelenú kartu - otestujte svoje znalosti golfovej etikety a pravidiel."
        path="/edukacne-centrum/testy"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Edukačné centrum", url: "https://bsga.sk/edukacne-centrum" },
          { name: "Záverečný test ZK", url: "https://bsga.sk/edukacne-centrum/testy" },
        ]}
      />

      <Navbar />

      <main className="min-h-screen bg-background">
        <section className="pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-12">
          <div className="container mx-auto px-4 sm:px-6">
            <Link to="/edukacne-centrum">
              <Button variant="ghost" className="mb-4 gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Späť na Edukačné centrum
              </Button>
            </Link>
            <GreenCardQuiz />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default EducationTests;
