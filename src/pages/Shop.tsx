import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Award, Flag, Gift, Briefcase, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import WavesCanvas from "@/components/WavesCanvas";
import VoucherCard from "@/components/shop/VoucherCard";
import ServiceCard from "@/components/shop/ServiceCard";
import MerchCard from "@/components/shop/MerchCard";
import voucher50 from "@/assets/voucher-50.png";
import voucher100 from "@/assets/voucher-100.webp";
import voucher200 from "@/assets/voucher-200.png";
import merchWineGlass from "@/assets/merch/wine-glass.webp";
import merchLuggageTag from "@/assets/merch/luggage-tag.webp";
import merchPracticeSticks from "@/assets/practice-sticks.png.asset.json";
import merchCap from "@/assets/merch/cap.webp";
import capGray from "@/assets/merch/cap-gray.png.asset.json";
import merchShoeBag from "@/assets/merch/shoe-bag.webp";
import merchTowel from "@/assets/merch/towel.png.asset.json";
import merchRznSpeed from "@/assets/merch/rzn-speed.png.asset.json";
import merchSportsBag from "@/assets/merch/sports-bag.png.asset.json";
import hoodieBlack from "@/assets/merch/hoodie-black.png.asset.json";
import hoodieYellow from "@/assets/merch/hoodie-yellow.png.asset.json";
import hoodieGreen from "@/assets/merch/hoodie-green.png.asset.json";

const Shop = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["darčekové poukážky", "služby", "merch"], []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

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

  const vouchers = [
    { value: 50, image: voucher50, purchaseUrl: "https://buy.stripe.com/test_aFa9AT51u9Li21V3vWbV601" },
    { value: 100, image: voucher100, purchaseUrl: "https://buy.stripe.com/test_00waEX2Tm6z68qjgiIbV60e" },
    { value: 200, image: voucher200, purchaseUrl: "https://buy.stripe.com/test_cNi00j0Le9Li8qj7McbV60d" },
  ];

  const services = [
    {
      title: "Individuálna lekcia",
      price: 59.99,
      icon: User,
      purchaseUrl: "https://buy.stripe.com/test_aFaeVdbpS7Da0XR0jKbV60c",
      features: [
        "55-minútová súkromná lekcia",
        "Profesionálny tréner",
        "Analýza švihu",
        "Personalizované cvičenia",
        "Okamžitá spätná väzba",
      ],
    },
    {
      title: "Víkendový kurz zelenej karty",
      price: 139.99,
      originalPrice: 500,
      discount: 72,
      icon: Flag,
      popular: true,
      purchaseUrl: "https://buy.stripe.com/test_eVq5kD65y8He6ibfeEbV60b",
      features: [
        "Úvodný kurz pre začiatočníkov",
        "Základy golfu",
        "Technika úderov",
        "Príprava na zelenú kartu",
        "Profesionálny dohľad",
      ],
      note: "V cene nie je zahrnutá záverečná skúška",
    },
    {
      title: "Kurz zelenej karty",
      price: 549.99,
      icon: Award,
      purchaseUrl: "https://buy.stripe.com/test_fZu6oHctW0aI0XR2rSbV60a",
      features: [
        "Kompletný kurz pre získanie karty",
        "Teória a pravidlá golfu",
        "Golfová etiketa",
        "Praktický tréning na ihrisku",
        "Certifikát po absolvovaní",
      ],
    },
  ];

  const merch = [
    {
      title: "Športová mikina",
      price: 59.99,
      purchaseUrl: "https://buy.stripe.com/test_aFaaEX0Le6z621VfeEbV600",
      description:
        "Mikina – 3 farby (čierna, žltá a zelená). Športová mikina s logom BSGA dostupná v 3 farebných variantách. Pohodlná, štýlová a vhodná na tréning aj šport.",
      image: hoodieBlack.url,
      colorVariants: [
        { name: "Čierna", hex: "#0a0a0a", image: hoodieBlack.url },
        { name: "Žltá", hex: "#EAB308", image: hoodieYellow.url },
        { name: "Zelená", hex: "#84CC16", image: hoodieGreen.url },
      ],
    },
    {
      title: "Športová taška",
      price: 29.99,
      purchaseUrl: "https://buy.stripe.com/test_5kQfZh0Le4qY21V3vWbV609",
      description:
        "Priestranná športová taška vhodná do posilňovne aj na golf. Dostatok miesta na oblečenie, topánky a doplnky.",
      image: merchSportsBag.url,
    },
    {
      title: "Vínový pohár",
      price: 29.99,
      purchaseUrl: "https://buy.stripe.com/test_5kQdR9fG88He9un8QgbV602",
      description:
        "Ekologický skladací pohár z nehrdzavejúcej ocele. Kompaktný, odolný a ľahko prenosný – perfektný na cesty za golfom.",
      image: merchWineGlass,
    },
    {
      title: "Šiltovka",
      price: 24.99,
      purchaseUrl: "https://buy.stripe.com/test_fZu7sLbpSe1yayr9UkbV603",
      description:
        "Štýlová šiltovka s logom BSGA dostupná v bielej a šedej farbe. Ochrana pred slnkom so štýlom.",
      image: merchCap,
      colorVariants: [
        { name: "Biela", hex: "#ffffff", image: merchCap },
        { name: "Sivá", hex: "#9CA3AF", image: capGray.url },
      ],
    },
    {
      title: "RZN Speed - 12 ks",
      price: 19.99,
      purchaseUrl: "https://buy.stripe.com/test_bJe7sL9hKaPm4a39UkbV604",
      description:
        "Balenie 12 golfových loptičiek RZN Speed. Vysoký výkon za skvelú cenu – ideálne na každodenný tréning aj hru.",
      image: merchRznSpeed.url,
    },
    {
      title: "Taška na topánky",
      price: 14.99,
      purchaseUrl: "https://buy.stripe.com/test_4gMcN52TmaPmayrd6wbV605",
      description:
        "Praktická čierna taška na golfové topánky. Chráni obuv aj ostatné veci v golfovom vaku pred znečistením.",
      image: merchShoeBag,
    },
    {
      title: "Uterák",
      price: 9.99,
      purchaseUrl: "https://buy.stripe.com/test_28E5kD79C7Da7mf3vWbV606",
      description:
        "Kvalitný golfový uterák v modrej farbe. Nepostrádateľný doplnok pri golfe – na čistenie palíc, loptičiek a rúk.",
      image: merchTowel.url,
    },
    {
      title: "Visačka s logom",
      price: 4.99,
      purchaseUrl: "https://buy.stripe.com/test_5kQ3cv9hKg9GeOHgiIbV607",
      description:
        "Štýlová identifikačná visačka na cestovnú tašku alebo golfový bag s logom BSGA. Už si budeš poznať svoj bag!",
      image: merchLuggageTag,
    },
    {
      title: "Tréningové sticks",
      price: 4.99,
      purchaseUrl: "https://buy.stripe.com/test_28E7sL2TmcXufSLfeEbV608",
      description:
        "Practice Sticks v tube na zlepšenie švihu a postoja. Praktické balenie, ideálne na tréning vonku aj na domu.",
      image: merchPracticeSticks.url,
    },
  ];

  return (
    <>
      {(() => null)()}
      <SEO
        title="Obchod | BSGA - Best Swing Golf Academy"
        description="Nakúpte darčekové poukážky a golfové služby online. Individuálne lekcie, kurzy zelenej karty a štart karty."
        path="/obchod"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Domov", item: "https://bsga.sk/" },
              { "@type": "ListItem", position: 2, name: "Obchod", item: "https://bsga.sk/obchod" },
            ],
          },
          ...vouchers.map((v) => ({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `Darčeková poukážka ${v.value} €`,
            category: "Gift Card",
            brand: { "@type": "Brand", name: "BSGA" },
            offers: {
              "@type": "Offer",
              price: v.value,
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: v.purchaseUrl,
            },
          })),
          ...services.map((s) => ({
            "@context": "https://schema.org",
            "@type": "Product",
            name: s.title,
            brand: { "@type": "Brand", name: "BSGA" },
            offers: {
              "@type": "Offer",
              price: s.price,
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: s.purchaseUrl,
            },
          })),
          ...merch.map((m) => ({
            "@context": "https://schema.org",
            "@type": "Product",
            name: m.title,
            description: m.description,
            brand: { "@type": "Brand", name: "BSGA" },
            offers: {
              "@type": "Offer",
              price: m.price,
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: m.purchaseUrl,
            },
          })),
        ]}
      />

      <Navbar />

      <AuroraBackground className="min-h-screen bg-primary text-primary-foreground" showRadialGradient={false}>
        <section className="relative overflow-hidden bg-transparent pb-8 pt-24 sm:pt-28 md:pt-32 md:pb-10">
          <WavesCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Obchod
              </h1>

              <div className="relative h-8 overflow-hidden sm:h-12 md:h-16">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    className="block whitespace-nowrap text-xl font-serif font-semibold capitalize text-gold sm:text-3xl md:text-4xl lg:text-5xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <button
                  onClick={() => scrollToSection("poukazky")}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary hover:scale-105"
                >
                  <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Poukážky
                </button>
                <button
                  onClick={() => scrollToSection("sluzby")}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary hover:scale-105"
                >
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Služby
                </button>
                <button
                  onClick={() => scrollToSection("merch")}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary hover:scale-105"
                >
                  <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Merch
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="poukazky" className="scroll-mt-24 bg-transparent pb-12 pt-6 sm:pb-16 sm:pt-8 md:pb-24 md:pt-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3 sm:mb-4">
                Darčekové poukážky
              </h2>
              <p className="text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                Darujte zážitok z golfu svojim blízkym. Poukážky sú platné 12 mesiacov od zakúpenia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {vouchers.map((voucher) => (
                <VoucherCard key={voucher.value} value={voucher.value} image={voucher.image} purchaseUrl={voucher.purchaseUrl} />
              ))}
            </div>
          </div>
        </section>

        <section id="sluzby" className="scroll-mt-24 py-12 sm:py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3 sm:mb-4">
                Služby
              </h2>
              <p className="text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                Vyberte si z našej ponuky golfových kurzov a lekcií
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start pt-4 sm:pt-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  price={service.price}
                  originalPrice={service.originalPrice}
                  discount={service.discount}
                  icon={service.icon}
                  features={service.features}
                  note={service.note}
                  popular={service.popular}
                  purchaseUrl={service.purchaseUrl}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="merch" className="scroll-mt-24 py-12 sm:py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3 sm:mb-4">
                BSGA Merch
              </h2>
              <p className="text-sm sm:text-base text-primary-foreground/70 max-w-2xl mx-auto px-2">
                Štýlové produkty s logom BSGA pre každého golfistu
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {merch.map((item) => (
                <MerchCard
                  key={item.title}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  purchaseUrl={item.purchaseUrl}
                  image={(item as any).image}
                  colorVariants={(item as any).colorVariants}
                />
              ))}
            </div>
          </div>
        </section>
      </AuroraBackground>

      <Footer />
    </>
  );
};

export default Shop;
