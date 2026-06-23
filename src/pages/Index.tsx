import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import HeroSlider from "@/components/HeroSlider";
import ServicesSlider from "@/components/ServicesSlider";
import PartnersLoop from "@/components/PartnersLoop";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SimpleContactForm from "@/components/SimpleContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <SEO
        title="BSGA - Best Swing Golf Academy | Najväčšia golfová akadémia na Slovensku"
        description="Best Swing Golf Academy - najväčšia golfová akadémia na Slovensku od roku 2016. Individuálne a skupinové lekcie, zelené karty, detská akadémia a firemné akcie."
        path="/"
      />
      <Navbar />
      <main>
        <HeroSlider />
        <ServicesSlider />
        <PartnersLoop />
        <Testimonials />
        <FAQ />
        <SimpleContactForm />
      </main>
      <Footer />
    </>
  );
};

export default Index;
