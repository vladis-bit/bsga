import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ClipboardCheck, Newspaper, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

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
        <meta name="description" content="Edukačné centrum BSGA - golfové rady, otázky, analýzy a know-how." />
      </Helmet>

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
              <div className="mx-auto flex max-w-2xl flex-col gap-4">
                {navigationCards.map((card, index) => (
                  <Link key={card.to} to={card.to}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-background p-6 shadow-lg transition-all hover:border-gold hover:shadow-xl sm:gap-6 md:p-8"
                    >
                      <div className="rounded-xl bg-gold/10 p-3 transition-colors group-hover:bg-gold/20 md:p-4">
                        <card.icon className="h-8 w-8 text-gold md:h-10 md:w-10" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-foreground md:text-xl">{card.title}</h2>
                        <p className="text-sm text-muted-foreground md:text-base">{card.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-gold md:h-6 md:w-6" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </AuroraBackground>

      <Footer />
    </>
  );
};

export default EducationCenter;
