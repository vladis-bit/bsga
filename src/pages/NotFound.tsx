import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { NotFoundHelp } from "@/components/NotFoundHelp";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="theme-ivory flex min-h-screen flex-col bg-background text-foreground">
      <SEO
        title="Stránka nenájdená (404) | BSGA"
        description="Stránka, ktorú hľadáte, neexistuje alebo bola presunutá. Vráťte sa na domovskú stránku BSGA a nájdite golfové kurzy, tréningy, turnaje aj rezervácie Performance Centra."
        path="/404"
        noindex
      />
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 pt-24 pb-16 sm:px-6 sm:pt-28 md:pt-32">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-gold mb-2">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-3">
            Stránka nenájdená
          </p>
          <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto">
            Stránka, ktorú hľadáte, neexistuje alebo bola presunutá. Skúste ju vyhľadať, alebo pokračujte jedným z odkazov nižšie.
          </p>
          <NotFoundHelp />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
