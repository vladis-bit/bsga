import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqs = [{
  question: "Čo potrebujem na prvú lekciu golfu?",
  answer: "Na prvú lekciu nepotrebujete žiadne vlastné vybavenie. Všetky potrebné palice a loptičky vám zapožičiame. Stačí prísť v pohodlnom oblečení a športovej obuvi."
}, {
  question: "Ako dlho trvá získanie zelenej karty?",
  answer: "Získanie zelenej karty trvá zvyčajne 1-2 týždne, v závislosti od intenzity tréningov. Kurz zahŕňa praktický tréning, teoretickú prípravu a záverečný test z pravidiel a etikety."
}, {
  question: "Organizujete tréningy pre deti?",
  answer: "Áno, máme špeciálnu detskú akadémiu pre deti od 5 rokov. Tréningy sú prispôsobené veku a schopnostiam detí, kombinujú hru s učením a systematickým rozvojom techniky."
}, {
  question: "Môžem si vyskúšať golf pred kúpou balíka lekcií?",
  answer: "Samozrejme! Ponúkame úvodnú skúšobnú lekciu, kde si môžete vyskúšať základy golfu a zistiť, či je tento šport pre vás. Kontaktujte nás pre rezerváciu."
}, {
  question: "Kde prebiehajú tréningy?",
  answer: "Naše tréningy prebiehajú primárne v rezortoch Hrubá Borša (Golfový klub Hrubá Borša) a Nitra (Red Oak Golf Club). Podľa potreby organizujeme eventy v iných lokalitách."
}, {
  question: "Na aké služby môžem využiť darčekovú poukážku od BSGA?",
  answer: "Darčekové poukážky BSGA môžete využiť na všetky naše služby bez akéhokoľvek obmedzenia. Nie sú žiadne výnimky — poukážka platí na individuálne lekcie, kurzy zelenej karty, štart kartu, kempy aj všetky ostatné služby v našej ponuke."
}];
const FAQ = () => {
  return <section className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 border-b border-border pb-6 text-center sm:mb-12 md:mb-16">
          <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">Časté otázky</h2>
          <p className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">FAQ</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="rounded-2xl border border-border bg-card px-4 sm:px-6 data-[state=open]:border-gold/40">
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-gold py-4 sm:py-6 hover:no-underline text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 sm:pb-6 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </div>
    </section>;
};
export default FAQ;
