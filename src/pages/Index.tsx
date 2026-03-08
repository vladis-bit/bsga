import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AnimatedStats from "@/components/AnimatedStats";
import ServicesSlider from "@/components/ServicesSlider";
import PartnersLoop from "@/components/PartnersLoop";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BSGA - Best Swing Golf Academy | Najväčšia golfová akadémia na Slovensku</title>
        <meta
          name="description"
          content="Best Swing Golf Academy - najväčšia golfová akadémia na Slovensku od roku 2016. Individuálne a skupinové lekcie, zelené karty, detská akadémia a firemné akcie."
        />
      </Helmet>
      <Navbar />
      <main>
        <HeroSlider />
        <AnimatedStats />
        <ServicesSlider />
        <PartnersLoop />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
};

export default Index;
