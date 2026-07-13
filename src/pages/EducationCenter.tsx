import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import GreenCardQuiz from "@/components/GreenCardQuiz";

const EducationCenter = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["rady", "otázky", "analýzy", "know-how"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <>
      <SEO
        title="Edukačné centrum | BSGA"
        description="Edukačné centrum BSGA - golfové rady, otázky, analýzy a know-how."
        path="/edukacne-centrum"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Edukačné centrum", url: "https://bsga.sk/edukacne-centrum" },
        ]}
      />

      <Navbar />

      <AuroraBackground className="min-h-[50vh] bg-primary text-primary-foreground" showRadialGradient={false}>
        <main>
          <section className="bg-transparent pb-10 pt-28 md:pt-32">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Edukačné centrum
                </h1>

                <div className="relative h-10 overflow-hidden sm:h-12 md:h-16">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={titleNumber}
                      className="block whitespace-nowrap text-2xl font-serif font-semibold text-gold sm:text-3xl md:text-4xl lg:text-5xl"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {titles[titleNumber]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-transparent py-6 md:py-8">
            <div className="container mx-auto px-4 sm:px-6">
              <GreenCardQuiz />
            </div>
          </section>
        </main>
      </AuroraBackground>

      <Footer />
    </>
  );
};

export default EducationCenter;
