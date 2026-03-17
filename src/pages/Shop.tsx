import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { User, Award, Flag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import VoucherCard from "@/components/shop/VoucherCard";
import ServiceCard from "@/components/shop/ServiceCard";
import voucher50 from "@/assets/voucher-50.png";
import voucher100 from "@/assets/voucher-100.png";
import voucher200 from "@/assets/voucher-200.png";

const Shop = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["darčekové poukážky", "služby", "merch"], []);

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
    { value: 50, image: voucher50 },
    { value: 100, image: voucher100 },
    { value: 200, image: voucher200 },
  ];

  const services = [
    {
      title: "Individuálna lekcia",
      price: 59.99,
      icon: User,
      features: [
        "60-minútová súkromná lekcia",
        "Profesionálny tréner",
        "Analýza švihu",
        "Personalizované cvičenia",
        "Okamžitá spätná väzba"
      ]
    },
    {
      title: "Víkendový kurz zelenej karty",
      price: 129.99,
      originalPrice: 500,
      discount: 74,
      icon: Flag,
      popular: true,
      features: [
        "Úvodný kurz pre začiatočníkov",
        "Základy golfu",
        "Technika úderov",
        "Príprava na zelenú kartu",
        "Profesionálny dohľad"
      ]
    },
    {
      title: "Kurz zelenej karty",
      price: 549.99,
      icon: Award,
      features: [
        "Kompletný kurz pre získanie karty",
        "Teória a pravidlá golfu",
        "Golfová etiketa",
        "Praktický tréning na ihrisku",
        "Certifikát po absolvovaní"
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Obchod | BSGA - Best Swing Golf Academy</title>
        <meta
          name="description"
          content="Nakúpte darčekové poukážky a golfové služby online. Individuálne lekcie, kurzy zelenej karty a štart karty."
        />
      </Helmet>

      <Navbar />

      <AuroraBackground className="min-h-screen bg-primary text-primary-foreground" showRadialGradient={false}>
        <section className="bg-transparent pb-10 pt-28 md:pt-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Obchod
              </h1>

              <div className="relative h-10 overflow-hidden sm:h-12 md:h-16">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    className="block whitespace-nowrap text-2xl font-serif font-semibold capitalize text-gold sm:text-3xl md:text-4xl lg:text-5xl"
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

        {/* Vouchers Section */}
        <section className="bg-transparent pb-16 pt-8 md:pb-24 md:pt-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Darčekové poukážky
              </h2>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto">
                Darujte zážitok z golfu svojim blízkym. Poukážky sú platné 12 mesiacov od zakúpenia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {vouchers.map((voucher) => (
                <VoucherCard key={voucher.value} value={voucher.value} image={voucher.image} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Služby
              </h2>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto">
                Vyberte si z našej ponuky golfových kurzov a lekcií
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start pt-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  price={service.price}
                  originalPrice={service.originalPrice}
                  discount={service.discount}
                  icon={service.icon}
                  features={service.features}
                  popular={service.popular}
                />
              ))}
            </div>
          </div>
        </section>

        {/* BSGA Merch Section */}
        <section className="py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                BSGA Merch
              </h2>
              <p className="text-primary-foreground/70 text-lg">
                Viac už čoskoro
              </p>
            </div>
          </div>
        </section>
      </AuroraBackground>

      <Footer />
    </>
  );
};

export default Shop;
