import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Čo potrebujem na prvú lekciu golfu?",
    answer:
      "Na prvú lekciu nepotrebujete žiadne vlastné vybavenie. Všetky potrebné palice a loptičky vám zapožičiame. Stačí prísť v pohodlnom oblečení a športovej obuvi.",
  },
  {
    question: "Ako dlho trvá získanie zelenej karty?",
    answer:
      "Získanie zelenej karty trvá zvyčajne 4-6 týždňov, v závislosti od intenzity tréningov. Kurz zahŕňa praktický tréning, teoretickú prípravu a záverečný test z pravidiel a etikety.",
  },
  {
    question: "Organizujete tréningy pre deti?",
    answer:
      "Áno, máme špeciálnu detskú akadémiu pre deti od 6 rokov. Tréningy sú prispôsobené veku a schopnostiam detí, kombinujú hru s učením a systematickým rozvojom techniky.",
  },
  {
    question: "Môžem si vyskúšať golf pred kúpou balíka lekcií?",
    answer:
      "Samozrejme! Ponúkame úvodnú skúšobnú lekciu, kde si môžete vyskúšať základy golfu a zistiť, či je tento šport pre vás. Kontaktujte nás pre rezerváciu.",
  },
  {
    question: "Kde prebiehajú tréningy?",
    answer:
      "Naše tréningy prebiehajú primárne v rezortoch Hrubá Borša (Golfový klub Hrubá Borša) a Nitra (Red Oak Golf Club). Podľa potreby organizujeme aj tréningy v iných lokalitách.",
  },
];

const FAQ = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase">
            Časté otázky
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-3 sm:mt-4">
            Máte otázky?
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg sm:rounded-xl border border-border px-4 sm:px-6 data-[state=open]:border-gold/30"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-gold py-4 sm:py-6 hover:no-underline text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 sm:pb-6 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
