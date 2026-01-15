import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ClipboardCheck, Calculator, Newspaper } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GreenCardQuiz from "@/components/GreenCardQuiz";
import GolfCalculators from "@/components/GolfCalculators";
import BSGABlog from "@/components/BSGABlog";
import AIChatInterface from "@/components/AIChatInterface";
import { cn } from "@/lib/utils";

type ActiveSection = "testy" | "kalkulacky" | "blog";

const EducationCenter = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const [activeSection, setActiveSection] = useState<ActiveSection>("testy");
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

  const sections = [
    {
      id: "testy" as ActiveSection,
      title: "Testy",
      description: "Záverečné otázky na zelenú kartu",
      icon: ClipboardCheck,
    },
    {
      id: "kalkulacky" as ActiveSection,
      title: "Golfové kalkulačky",
      description: "Výpočty handicapu a ďalšie nástroje",
      icon: Calculator,
    },
    {
      id: "blog" as ActiveSection,
      title: "BSGA Blog",
      description: "Novinky a články zo sveta golfu",
      icon: Newspaper,
    },
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
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-4 max-w-xl mx-auto">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "cursor-pointer p-5 sm:p-6 rounded-2xl border transition-all flex items-center gap-4",
                    activeSection === section.id
                      ? "border-gold bg-gold/10"
                      : "border-border hover:border-gold/50 bg-card"
                  )}
                >
                  <section.icon className={cn(
                    "h-8 w-8 flex-shrink-0",
                    activeSection === section.id ? "text-gold" : "text-muted-foreground"
                  )} />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {section.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <AnimatePresence mode="wait">
              {activeSection === "testy" && (
                <motion.div
                  key="testy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GreenCardQuiz />
                </motion.div>
              )}
              {activeSection === "kalkulacky" && (
                <motion.div
                  key="kalkulacky"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GolfCalculators />
                </motion.div>
              )}
              {activeSection === "blog" && (
                <motion.div
                  key="blog"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BSGABlog />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default EducationCenter;
