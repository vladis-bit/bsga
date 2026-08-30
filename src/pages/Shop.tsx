import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Award, Flag, Gift, Briefcase, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
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

const BREADCRUMBS = [
  { name: "Domov", url: "https://bsga.sk/" },
  { name: "Obchod", url: "https://bsga.sk/obchod" },
];

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
    { value: 50, image: voucher50, purchaseUrl: "https://buy.stripe.com/9B6bJ13QH94K1NaaFu8so0r" },
    { value: 100, image: voucher100, purchaseUrl: "https://buy.stripe.com/3cIeVd86Xft877u28Y8so0q" },
    { value: 200, image: voucher200, purchaseUrl: "https://buy.stripe.com/dRmcN53QH4Ou3Vi00Q8so08" },
  ];

  const services = [
    {
      title: "Individuálna lekcia",
      price: 59.99,
      icon: User,
      purchaseUrl: "https://buy.stripe.com/dRm00j9b194KdvS00Q8so09",
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
      purchaseUrl: "https://buy.stripe.com/4gMaEXevl1CibnKfZO8so0a",
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
      purchaseUrl: "https://buy.stripe.com/fZu5kDaf580G3Vi8xm8so0b",
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
      purchaseUrl: "https://buy.stripe.com/14AbJ1af50yeajG4h68so0i",
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
      purchaseUrl: "https://buy.stripe.com/28E00j1Izep4crOdRG8so0c",
      description:
        "Priestranná športová taška vhodná do posilňovne aj na golf. Dostatok miesta na oblečenie, topánky a doplnky.",
      image: merchSportsBag.url,
    },
    {
      title: "Vínový pohár",
      price: 29.99,
      purchaseUrl: "https://buy.stripe.com/5kQbJ1drh80G0J68xm8so0k",
      description:
        "Ekologický skladací pohár z nehrdzavejúcej ocele. Kompaktný, odolný a ľahko prenosný – perfektný na cesty za golfom.",
      image: merchWineGlass,
    },
    {
      title: "Šiltovka",
      price: 24.99,
      purchaseUrl: "https://buy.stripe.com/6oUfZhgDtdl0ajGbJy8so0m",
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
      purchaseUrl: "https://buy.stripe.com/5kQ28r72TcgW8bybJy8so0n",
      description:
        "Balenie 12 golfových loptičiek RZN Speed. Vysoký výkon za skvelú cenu – ideálne na každodenný tréning aj hru.",
      image: merchRznSpeed.url,
    },
    {
      title: "Taška na topánky",
      price: 14.99,
      purchaseUrl: "https://buy.stripe.com/bJebJ11Iz6WC63q00Q8so0o",
      description:
        "Praktická čierna taška na golfové topánky. Chráni obuv aj ostatné veci v golfovom vaku pred znečistením.",
      image: merchShoeBag,
    },
    {
      title: "Uterák",
      price: 9.99,
      purchaseUrl: "https://buy.stripe.com/dRm9AT1Iz2GmgI44h68so0p",
      description:
        "Kvalitný golfový uterák v modrej farbe. Nepostrádateľný doplnok pri golfe – na čistenie palíc, loptičiek a rúk.",
      image: merchTowel.url,
    },
    {
      title: "Visačka s logom",
      price: 4.99,
      purchaseUrl: "https://buy.stripe.com/5kQdR9evl2Gm1NadRG8so0e",
      description:
        "Štýlová identifikačná visačka na cestovnú tašku alebo golfový bag s logom BSGA. Už si budete poznať svoj bag!",
      image: merchLuggageTag,
    },
    {
      title: "Tréningové sticks",
      price: 4.99,
      purchaseUrl: "https://buy.stripe.com/dRm3cvdrh94K9fCcNC8so0d",
      description:
        "Practice Sticks v tube na zlepšenie švihu a postoja. Praktické balenie, ideálne na tréning vonku aj na domu.",
      image: merchPracticeSticks.url,
    },
  ];

  return (
    <>
      <SEO
        title="Obchod | BSGA - Best Swing Golf Academy"
        description="Nakúpte darčekové poukážky a golfové služby online. Individuálne lekcie, kurzy zelenej karty a štart karty."
        path="/obchod"
        image="https://bsga.sk/og/obchod.jpg"
        imageAlt="Darčekové poukážky a golfové služby BSGA"
        breadcrumbs={BREADCRUMBS}
        jsonLd={[
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
      <Breadcrumbs items={BREADCRUMBS} />

      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <section className="relative overflow-hidden bg-background pb-10 pt-24 md:pt-32 md:pb-14">
          <div className="container relative z-10 mx-auto px-4">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
              <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                BSGA
                <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              </span>
              <h1 className="text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Obchod
              </h1>

              <div className="relative h-8 overflow-hidden sm:h-12 md:h-16">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    className="block whitespace-nowrap font-serif text-xl font-bold capitalize text-gold sm:text-3xl md:text-4xl lg:text-5xl"
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
                  className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-xs font-bold text-foreground transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground sm:text-sm"
                >
                  <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Poukážky
                </button>
                <button
                  onClick={() => scrollToSection("sluzby")}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-xs font-bold text-foreground transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground sm:text-sm"
                >
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Služby
                </button>
                <button
                  onClick={() => scrollToSection("merch")}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-xs font-bold text-foreground transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground sm:text-sm"
                >
                  <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Merch
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="poukazky" className="scroll-mt-24 bg-background pb-16 pt-6 md:pb-24 md:pt-10">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                  Darčekové poukážky
                </h2>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Poukážky</p>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
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

        <section id="sluzby" className="scroll-mt-24 bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                  Služby
                </h2>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Kurzy a lekcie</p>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
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

        <section id="merch" className="scroll-mt-24 bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                  BSGA Merch
                </h2>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Merch</p>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
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
      </div>

      <Footer />
    </>
  );
};

export default Shop;
