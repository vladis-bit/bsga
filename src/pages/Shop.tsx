import { Helmet } from "react-helmet-async";
import { User, Award, Flag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DottedSurface } from "@/components/DottedSurface";
import VoucherCard from "@/components/shop/VoucherCard";
import ServiceCard from "@/components/shop/ServiceCard";
import voucher50 from "@/assets/voucher-50.png";
import voucher100 from "@/assets/voucher-100.png";
import voucher200 from "@/assets/voucher-200.png";

const Shop = () => {
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
      title: "Štart karta",
      price: 139.99,
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

      {/* Hero Section */}
      <section className="relative w-full bg-background pt-4 sm:pt-8">
        <div className="px-2 sm:px-4 md:px-8">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-primary py-16 sm:py-24 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
              <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                E-shop
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
                Obchod
              </h1>
              <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto px-2">
                Darčekové poukážky a golfové služby na jednom mieste
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vouchers Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Darčekové poukážky
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Služby
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vyberte si z našej ponuky golfových kurzov a lekcií
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start pt-6">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                price={service.price}
                icon={service.icon}
                features={service.features}
                popular={service.popular}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Shop;
