import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  return <>
      <Helmet>
        <title>Edukačné centrum | BSGA</title>
        <meta name="description" content="Edukačné centrum BSGA - golfové rady, otázky, analýzy a know-how. Napíš text, nahraj fotku či video a uvidíš zázraky." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center pt-24 sm:pt-28 md:pt-32 gap-4 sm:gap-6">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-sans">
                Edukačné centrum
              </h1>

              <div className="relative h-10 sm:h-12 md:h-16 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={titleNumber} 
                    className="block whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground" 
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

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md sm:max-w-xl text-center leading-relaxed px-4">
              Napíš text, nahraj fotku či video a uvidíš zázraky.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>;
};
export default EducationCenter;