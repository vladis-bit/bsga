import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ClipboardCheck, Calculator, Newspaper, ChevronRight } from "lucide-react";
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

  const navigationCards = [
    {
      to: "/edukacne-centrum/testy",
      icon: ClipboardCheck,
      title: "Testy",
      description: "Záverečné otázky na zelenú kartu"
    },
    {
      to: "/edukacne-centrum/kalkulacky",
      icon: Calculator,
      title: "Golfové kalkulačky",
      description: "Výpočty pre váš golf"
    },
    {
      to: "/edukacne-centrum/blog",
      icon: Newspaper,
      title: "BSGA Blog",
      description: "Novinky a články zo sveta golfu"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Edukačné centrum | BSGA</title>
        <meta name="description" content="Edukačné centrum BSGA - golfové rady, otázky, analýzy a know-how. Napíš text, nahraj fotku či video a uvidíš zázraky." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center pt-24 sm:pt-28 md:pt-32 gap-4 sm:gap-6">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-sans text-4xl">
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

        {/* AI Chat Interface */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <AIChatInterface />
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
              {navigationCards.map((card, index) => (
                <Link key={card.to} to={card.to}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer p-6 md:p-8 rounded-2xl border border-border hover:border-gold bg-card transition-all flex items-center gap-4 md:gap-6 group"
                  >
                    <div className="p-3 md:p-4 rounded-xl bg-gold/10 group-hover:bg-gold/20 transition-colors">
                      <card.icon className="h-8 w-8 md:h-10 md:w-10 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg md:text-xl text-foreground">{card.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base">{card.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground group-hover:text-gold transition-colors" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default EducationCenter;
