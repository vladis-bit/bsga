import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import HeroSlider from "@/components/HeroSlider";
import ServicesSlider from "@/components/ServicesSlider";
import PartnersLoop from "@/components/PartnersLoop";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SimpleContactForm from "@/components/SimpleContactForm";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "Čo potrebujem na prvú lekciu golfu?",
    a: "Na prvú lekciu nepotrebujete žiadne vlastné vybavenie. Všetky potrebné palice a loptičky vám zapožičiame. Stačí prísť v pohodlnom oblečení a športovej obuvi.",
  },
  {
    q: "Ako dlho trvá získanie zelenej karty?",
    a: "Získanie zelenej karty trvá zvyčajne 1-2 týždne, v závislosti od intenzity tréningov. Kurz zahŕňa praktický tréning, teoretickú prípravu a záverečný test z pravidiel a etikety.",
  },
  {
    q: "Organizujete tréningy pre deti?",
    a: "Áno, máme špeciálnu detskú akadémiu pre deti od 5 rokov. Tréningy sú prispôsobené veku a schopnostiam detí, kombinujú hru s učením a systematickým rozvojom techniky.",
  },
  {
    q: "Môžem si vyskúšať golf pred kúpou balíka lekcií?",
    a: "Samozrejme! Ponúkame úvodnú skúšobnú lekciu, kde si môžete vyskúšať základy golfu a zistiť, či je tento šport pre vás. Kontaktujte nás pre rezerváciu.",
  },
  {
    q: "Kde prebiehajú tréningy?",
    a: "Naše tréningy prebiehajú primárne v rezortoch Hrubá Borša (Golfový klub Hrubá Borša) a Nitra (Red Oak Golf Club). Podľa potreby organizujeme eventy v iných lokalitách.",
  },
  {
    q: "Na aké služby môžem využiť darčekovú poukážku od BSGA?",
    a: "Darčekové poukážky BSGA môžete využiť na všetky naše služby bez akéhokoľvek obmedzenia. Nie sú žiadne výnimky — poukážka platí na individuálne lekcie, kurzy zelenej karty, štart kartu, kempy aj všetky ostatné služby v našej ponuke.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const siteNavJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hlavné sekcie BSGA",
  itemListElement: [
    { name: "Služby", url: "https://bsga.sk/sluzby" },
    { name: "Začni s golfom", url: "https://bsga.sk/zacni-s-golfom" },
    { name: "Juniorský golf", url: "https://bsga.sk/akademia" },
    { name: "BSGA Tour 2026", url: "https://bsga.sk/tour" },
    { name: "Eventy a pobyty", url: "https://bsga.sk/eventy" },
    { name: "Firemné akcie", url: "https://bsga.sk/firemne-akcie" },
    { name: "Fitting", url: "https://bsga.sk/fitting" },
    { name: "Obchod", url: "https://bsga.sk/obchod" },
  ].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    url: item.url,
  })),
};

const homeWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://bsga.sk/#webpage",
  url: "https://bsga.sk/",
  name: "BSGA – Best Swing Golf Academy",
  inLanguage: "sk-SK",
  isPartOf: { "@id": "https://bsga.sk/#website" },
  about: { "@id": "https://bsga.sk/#organization" },
  primaryImageOfPage: { "@type": "ImageObject", url: "https://bsga.sk/favicon.png" },
};

const Index = () => {
  return (
    <>
      <SEO
        title="BSGA – Best Swing Golf Academy"
        description="Best Swing Golf Academy - najväčšia golfová akadémia na Slovensku od roku 2016. Individuálne a skupinové lekcie, zelené karty, detská akadémia a firemné akcie."
        path="/"
        jsonLd={[homeWebPageJsonLd, faqJsonLd, siteNavJsonLd]}
      />
      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main>
          <HeroSlider />
          <ServicesSlider />
          <PartnersLoop />
          <Testimonials />
          <FAQ />
          <SimpleContactForm />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;
