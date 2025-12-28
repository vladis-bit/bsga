import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="text-center px-6">
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-gold mb-4">
            404
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Stránka, ktorú hľadáte, neexistuje.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-primary font-medium rounded-full hover:bg-gold-light transition-all duration-300"
          >
            Späť na domov
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
