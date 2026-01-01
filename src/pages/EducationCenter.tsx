import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EducationCenter = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["rady", "otázky", "analýzy", "know-how"],
    []
  );

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
      <Helmet>
        <title>Edukačné centrum | BSGA</title>
        <meta
          name="description"
          content="Edukačné centrum BSGA - golfové rady, otázky, analýzy a know-how. Napíš text, nahraj fotku či video a uvidíš zázraky."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 sm:gap-8 py-20">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground tracking-tight text-center">
                Edukačné centrum
              </h1>

              <div className="relative flex justify-center h-12 sm:h-16 md:h-20 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    className="absolute text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-gold"
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

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl text-center leading-relaxed">
              Napíš text, nahraj fotku či video a uvidíš zázraky.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default EducationCenter;
