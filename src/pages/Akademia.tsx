import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import DevelopmentTimeline from "@/components/DevelopmentTimeline";
import CampCards from "@/components/CampCards";
import JuniorLevelSystem from "@/components/JuniorLevelSystem";
import CampProgramSection from "@/components/CampProgramSection";
import IvoryContactForm from "@/components/IvoryContactForm";
import { buildFaqJsonLd } from "@/lib/buildFaqJsonLd";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone } from "lucide-react";
const BREADCRUMBS = [
  { name: "Domov", url: "https://bsga.sk/" },
  { name: "Juniorský golf", url: "https://bsga.sk/akademia" },
];

const Akademia = () => {
  const campEvents = [
    { name: "Denný golfový tábor – Turnus 1", startDate: "2026-07-06", endDate: "2026-07-10", soldOut: true },
    { name: "Denný golfový tábor – Turnus 2", startDate: "2026-08-03", endDate: "2026-08-07", soldOut: true },
    { name: "Denný golfový tábor – Turnus 3", startDate: "2026-08-24", endDate: "2026-08-28", soldOut: false },
  ].map((c) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: c.name,
    startDate: c.startDate,
    endDate: c.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Golfový klub Hrubá Borša",
      address: { "@type": "PostalAddress", addressLocality: "Hrubá Borša", addressCountry: "SK" },
    },
    organizer: { "@id": "https://bsga.sk/#organization" },
    offers: {
      "@type": "Offer",
      price: "310",
      priceCurrency: "EUR",
      availability: c.soldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: "https://bsga.sk/akademia",
    },
  }));

  const juniorCourse = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "BSGA Junior Level System™",
    description:
      "Dlhodobý rozvojový program pre deti a juniorov – od prvých krokov s golfovou palicou až po výkonnostný golf, univerzitu v USA alebo profesionálnu kariéru.",
    url: "https://bsga.sk/akademia",
    inLanguage: "sk",
    provider: { "@id": "https://bsga.sk/#organization" },
    audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "Deti a juniori od 5 rokov" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: "PT2H",
      location: {
        "@type": "Place",
        name: "Golfový klub Hrubá Borša",
        address: { "@type": "PostalAddress", addressLocality: "Hrubá Borša", addressCountry: "SK" },
      },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      category: "Paid",
      url: "https://bsga.sk/akademia",
      availability: "https://schema.org/InStock",
    },
  };

  const faqs = [
    {
      question: "Pre koho je BSGA Junior Level System™ určený?",
      answer:
        "BSGA Junior Level System™ je dlhodobý rozvojový program pre deti a juniorov od 5 rokov. Sprevádza ich od prvých krokov s golfovou palicou až po výkonnostný golf, prijatie na americkú univerzitu alebo profesionálnu kariéru.",
    },
    {
      question: "Kedy prebiehajú detské golfové tábory v roku 2026?",
      answer:
        "V roku 2026 pripravujeme tri turnusy denných golfových táborov: 6. – 10. júl, 3. – 7. august a 24. – 28. august. Tábory prebiehajú v Golfovom klube Hrubá Borša.",
    },
    {
      question: "Koľko stojí detský golfový tábor?",
      answer:
        "Cena golfového tábora je 340 € pre nečlenov GKHB a 310 € pre členov Golfového klubu Hrubá Borša. Poistenie dieťaťa je už zahrnuté v cene tábora.",
    },
    {
      question: "Čo si deti majú priniesť na tábor?",
      answer:
        "Deti si môžu priniesť ruksak so šiltovkou alebo letným klobúčikom, opaľovacím krémom, mikinou a nohavicami na horšie počasie, prípadne malou sladkosťou či džúsikom. Ak majú vlastné golfové palice, určite si ich prineste.",
    },
    {
      question: "Sú deti počas tábora poistené?",
      answer:
        "Áno, poistenie dieťaťa je už zahrnuté v cene golfového tábora. Deti sú počas celého dňa pod dohľadom skúsených trénerov.",
    },
    {
      question: "Kto vedie detské tábory a tréningy?",
      answer:
        "Detské tábory a juniorské tréningy vedú skúsení tréneri Vanessa Fajkusová, Vladimír Leško a Jakub Hrbáň. Vďaka individuálnemu prístupu sa každé dieťa rozvíja vlastným tempom.",
    },
  ];

  const faqJsonLd = buildFaqJsonLd(faqs);

  return <>
      <SEO
        title="Juniorský golf | BSGA - Best Swing Golf Academy"
        description="BSGA Juniorský golf - profesionálne golfové tréningy, detské tábory 2026 a development program pre mladých golfistov. Staň sa súčasťou najväčšej golfovej akadémie na Slovensku."
        path="/akademia"
        image="https://bsga.sk/og/akademia.jpg"
        imageAlt="Juniorský golf BSGA – detská golfová akadémia"
        geo={{ region: "SK-TA", placename: "Hrubá Borša", latitude: 48.1667, longitude: 17.4333 }}

        breadcrumbs={BREADCRUMBS}
        jsonLd={[juniorCourse, ...campEvents, faqJsonLd]}
      />
      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <Breadcrumbs items={BREADCRUMBS} />
        <main>
          {/* Hero Section */}
          <section className="relative w-full overflow-hidden bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center">
                <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                  Juniorský golf
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                </span>
                <h1 className="mt-5 text-balance font-serif text-3xl font-bold leading-[1.08] text-foreground sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
                  Spúšťame jesennú časť detských krúžkov
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/70 sm:max-w-3xl sm:text-base md:text-lg">
                  Golfové krúžky pre deti pokračujú aj na jeseň. Pod vedením skúsených trénerov sa deti naučia základy golfovej techniky, pravidlá a etiketu hry v príjemnom prostredí.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                  <a
                    href="mailto:kids@bsga.sk"
                    aria-label="Napísať na kids@bsga.sk"
                    className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-primary transition-all duration-300 hover:bg-gold-light active:scale-[0.98] sm:w-auto sm:px-7 sm:text-base"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Viac informácií</span>
                  </a>
                  <a
                    href="tel:+421911994888"
                    aria-label="Zavolať na +421 911 994 888"
                    className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-gold/60 hover:bg-muted active:scale-[0.98] sm:w-auto sm:px-7 sm:text-base"
                  >
                    <Phone className="h-4 w-4 text-gold" />
                    <span>Zavolať</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Junior Level System */}
          <JuniorLevelSystem />

          {/* Development Timeline Section */}
          <section id="timeline" className="scroll-mt-24 bg-muted/50 py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 border-b border-border pb-6 text-center sm:mb-14">
                <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">Rozvoj detí od skorého veku</h2>
                <p className="mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">Juniorský golf</p>
                <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground/70 sm:text-base">Náš program sprevádza mladých golfistov od prvých krokov až po prijatie na americkú univerzitu alebo profesionálnu kariéru</p>
              </div>
              <DevelopmentTimeline />
            </div>
          </section>

          {/* Summer Camps Section */}
          <section id="tabory" className="scroll-mt-24 bg-background py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 border-b border-border pb-6 text-center sm:mb-14">
                <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                  Detské tábory 2026
                </h2>
                <p className="mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
                  Juniorský golf
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground/70 sm:text-base">
                  Golfové leto pod vedením skúsených trénerov <strong>Vanessy Fajkusovej</strong> a <strong>Vladimíra Leška</strong>. Deti získajú základy golfovej techniky, naučia sa pravidlá a etiketu hry v príjemnom prostredí <strong>Golfového Klubu Hrubá Borša</strong>.
                </p>
              </div>
              <CampCards />
              <CampProgramSection />
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-background py-12 sm:py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-8 border-b border-border pb-6 text-center sm:mb-12">
                <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  Časté otázky
                </h2>
                <p className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
                  FAQ
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`akademia-faq-${index}`}
                      className="rounded-2xl border border-border bg-card px-4 sm:px-6 data-[state=open]:border-gold/40"
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

          {/* CTA + Contact Form */}
          <IvoryContactForm
            id="kontakt"
            goldLabel="Juniorský golf"
            title="Máte nezodpovedané otázky?"
            description="Vyplňte formulár a dozviete sa viac o našich programoch pre mladých golfistov – krúžkoch, táboroch aj rozvojových tréningoch."
            email="kids@bsga.sk"
            source="juniorsky-golf"
            idPrefix="akademia"
            services={[
              "Detská akadémia",
              "Detské tábory",
              "Juniorský golf",
              "Individuálne tréningy",
              "Iné",
            ]}
            submitText="Odoslať správu"
          />
        </main>
      </div>
      <Footer />
    </>;
};
export default Akademia;
