import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const EducationCenter = () => {
  const eduJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Edukačné centrum BSGA",
      url: "https://bsga.sk/edukacne-centrum",
      inLanguage: "sk-SK",
      description:
        "Golfové vzdelávacie centrum BSGA – testy pravidiel a etikety, kalkulačky handicapu a praktické know-how pre golfistov.",
      isPartOf: { "@id": "https://bsga.sk/#website" },
      publisher: { "@id": "https://bsga.sk/#organization" },
      hasPart: [
        {
          "@type": "LearningResource",
          name: "Záverečný test zelenej karty",
          url: "https://bsga.sk/edukacne-centrum/testy",
          learningResourceType: "Quiz",
          educationalLevel: "Beginner",
          inLanguage: "sk",
          teaches: "Pravidlá golfu a golfová etiketa",
        },
        {
          "@type": "LearningResource",
          name: "Golfové kalkulačky",
          url: "https://bsga.sk/edukacne-centrum/kalkulacky",
          learningResourceType: "Interactive tool",
          inLanguage: "sk",
          teaches: "Výpočet handicapu a skóre",
        },
      ],
    },
  ];
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
        jsonLd={eduJsonLd}
      />

      <Navbar />

      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main>
          <section className="bg-background pb-10 pt-28 md:pt-32">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
                <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                  Vzdelávanie BSGA
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                </span>
                <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
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

          <section className="bg-background pb-16 pt-6 md:pb-24 md:pt-8">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mx-auto max-w-2xl">
                <div className="mb-8 border-b border-border pb-6">
                  <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
                    Testy a materiály
                  </h2>
                </div>
                <div className="space-y-4">
                <a
                  href="/edukacne-centrum/testy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex cursor-pointer items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-gold hover:shadow-xl sm:gap-6 md:p-8"
                  >
                    <div className="rounded-2xl bg-gold/10 p-3 transition-colors group-hover:bg-gold/20 md:p-4">
                      <ClipboardCheck className="h-8 w-8 text-gold md:h-10 md:w-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-bold text-foreground md:text-xl">Záverečný test ZK</h3>
                      <p className="text-sm text-muted-foreground md:text-base">Otestujte svoje znalosti — otvorí sa v novej záložke</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-gold md:h-6 md:w-6" />
                  </motion.div>
                </a>

                <a
                  href="/edukacne-centrum/testy-deti"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex cursor-pointer items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-gold hover:shadow-xl sm:gap-6 md:p-8"
                  >
                    <div className="rounded-2xl bg-gold/10 p-3 transition-colors group-hover:bg-gold/20 md:p-4">
                      <ClipboardCheck className="h-8 w-8 text-gold md:h-10 md:w-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-bold text-foreground md:text-xl">Záverečný test ZK pre deti</h3>
                      <p className="text-sm text-muted-foreground md:text-base">30 otázok pre juniorov — otvorí sa v novej záložke</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-gold md:h-6 md:w-6" />
                  </motion.div>
                </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default EducationCenter;
