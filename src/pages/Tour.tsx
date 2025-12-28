import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Mail, FileText, Trophy } from "lucide-react";

const tournaments = [
  { date: "15.5.2026", location: "Hrubá Borša" },
  { date: "5.6.2026", location: "Tále" },
  { date: "17.7.2026", location: "Penati Legend" },
  { date: "14.8.2026", location: "Penati Heritage" },
  { date: "4.9.2026", location: "Ostravice" },
];

const Tour = () => {
  return (
    <>
      <Helmet>
        <title>BSGA Tour 2026 | Séria golfových turnajov</title>
        <meta
          name="description"
          content="BSGA Tour 2026 - séria golfových turnajov v najlepších slovenských rezortoch. Hrubá Borša, Tále, Penati Legend, Penati Heritage a Ostravice."
        />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <span className="text-gold text-sm tracking-[0.2em] uppercase">
              Turnaje
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mt-4 mb-6">
              BSGA Tour 2026
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Séria turnajov v najlepších slovenských rezortoch
            </p>
          </div>
        </section>

        {/* Partners */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <span className="text-muted-foreground text-sm uppercase tracking-wider">
                Hlavní partneri:
              </span>
              <span className="text-2xl font-serif font-bold text-foreground">
                ASBIS
              </span>
              <span className="text-2xl font-serif font-bold text-foreground">
                Check Point
              </span>
            </div>
          </div>
        </section>

        {/* Tournament Schedule */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-gold text-sm tracking-[0.2em] uppercase">
                Kalendár
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-4">
                Termíny turnajov
              </h2>
              <div className="w-24 h-1 bg-gold mx-auto mt-6" />
            </div>

            <div className="max-w-3xl mx-auto">
              {tournaments.map((tournament, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 p-6 bg-card rounded-2xl border border-border mb-4 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                    <Trophy className="text-gold" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <Calendar size={18} className="text-gold" />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin size={18} className="text-gold" />
                        <span>{tournament.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">
              Chceš sa zúčastniť?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Pre prihlásenie na turnaje alebo viac informácií nás kontaktuj na:
            </p>
            <a
              href="mailto:touroffice@bsga.sk"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-primary font-medium rounded-full hover:bg-gold-light transition-all duration-300"
            >
              <Mail size={20} />
              touroffice@bsga.sk
            </a>

            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 border border-primary-foreground/30 text-primary-foreground rounded-full hover:bg-primary-foreground/10 transition-all"
              >
                <FileText size={18} />
                Program turnaja
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 border border-primary-foreground/30 text-primary-foreground rounded-full hover:bg-primary-foreground/10 transition-all"
              >
                <Trophy size={18} />
                Priebežné hodnotenie
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 border border-primary-foreground/30 text-primary-foreground rounded-full hover:bg-primary-foreground/10 transition-all"
              >
                <FileText size={18} />
                Prezentácia BSGA Tour
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Tour;
