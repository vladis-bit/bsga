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
    { value: 50, image: voucher50, purchaseUrl: "https://buy.stripe.com/bJebJ1bj9bcSfE08xm8so00" },
    { value: 100, image: voucher100, purchaseUrl: "https://buy.stripe.com/fZu28r0Evdl01Na5la8so01" },
    { value: 200, image: voucher200, purchaseUrl: "https://buy.stripe.com/eVqeVdbj9gxc8by8xm8so02" },
  ];

  const services = [
    {
      title: "Individuálna lekcia",
      price: 59.99,
      icon: User,
      purchaseUrl: "https://buy.stripe.com/dRm8wP5YP5SycrOdRG8so03",
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
      purchaseUrl: "https://buy.stripe.com/dRm4gz9b12Gm63q5la8so05",
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
      purchaseUrl: "https://buy.stripe.com/8x25kD2MD3KqdvSbJy8so04",
      features: [
        "Kompletný kurz pre získanie karty",
        "Teória a pravidlá golfu",
        "Golfová etiketa",
        "Praktický tréning na ihrisku",
        "Certifikát po absolvovaní"
      ]
    },
  ];
...
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  price={service.price}
                  originalPrice={service.originalPrice}
                  discount={service.discount}
                  icon={service.icon}
                  features={service.features}
                  popular={service.popular}
                  purchaseUrl={service.purchaseUrl}
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
