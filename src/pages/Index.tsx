import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ServicesSlider from "@/components/ServicesSlider";
import PartnersLoop from "@/components/PartnersLoop";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SimpleContactForm from "@/components/SimpleContactForm";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

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
      <AuroraBackground>
        <main className="bg-transparent">
          <HeroSlider />
          <ServicesSlider />
          <PartnersLoop />
          <Testimonials />
          <FAQ />
          <SimpleContactForm />
        </main>
      </AuroraBackground>
      <Footer />
    </>
  );
};

export default Index;
