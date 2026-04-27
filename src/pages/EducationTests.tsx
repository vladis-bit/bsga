import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GreenCardQuiz from "@/components/GreenCardQuiz";
import KidsGolfQuiz from "@/components/KidsGolfQuiz";

const EducationTests = () => {
  const [activeQuiz, setActiveQuiz] = useState<"green" | "kids">("green");

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

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => setActiveQuiz("green")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border-2 ${
                activeQuiz === "green"
                  ? "bg-gold text-primary-foreground border-gold shadow-lg shadow-gold/20"
                  : "bg-card text-foreground border-border hover:border-gold/50"
              }`}
            >
              🏌️ Zelená karta (33 otázok)
            </button>
            <button
              onClick={() => setActiveQuiz("kids")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border-2 ${
                activeQuiz === "kids"
                  ? "bg-gold text-primary-foreground border-gold shadow-lg shadow-gold/20"
                  : "bg-card text-foreground border-border hover:border-gold/50"
              }`}
            >
              ⛳ Kvíz pre deti 8–16 rokov (30 otázok)
            </button>
          </div>
        </div>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            {activeQuiz === "green" ? <GreenCardQuiz /> : <KidsGolfQuiz />}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default EducationTests;
