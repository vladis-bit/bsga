import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Mail, FileText, Trophy } from "lucide-react";
import asbisLogo from "@/assets/partner-asbis-tour.png";
import checkpointLogo from "@/assets/partner-checkpoint-tour.png";
const tournaments = [{
  date: "15.5.2026",
  location: "Hrubá Borša"
}, {
  date: "5.6.2026",
  location: "Tále"
}, {
  date: "17.7.2026",
  location: "Penati Legend"
}, {
  date: "14.8.2026",
  location: "Penati Heritage"
}, {
  date: "4.9.2026",
  location: "Ostravice"
}];
const Tour = () => {
  return <>
      <Helmet>
        <title>BSGA Tour 2026 | Séria golfových turnajov</title>
        <meta name="description" content="BSGA Tour 2026 - séria golfových turnajov v najlepších slovenských rezortoch. Hrubá Borša, Tále, Penati Legend, Penati Heritage a Ostravice." />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative w-full bg-background pt-4 sm:pt-8">
          <div className="px-2 sm:px-4 md:px-8">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-primary py-16 sm:py-24 md:py-32">
              <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  Turnaje
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">BSGA Tour 2026</h1>
                <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto px-2">Exkluzívna séria turnajov na najlepších slovenských ihriskách</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-4 sm:py-6 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col justify-center items-center gap-4 sm:gap-6">
              <span className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider">
                Hlavní partneri
              </span>
              <div className="flex items-center gap-12 sm:gap-16">
                <img src={asbisLogo} alt="ASBIS" className="h-40 sm:h-56 w-auto object-contain" />
                <img src={checkpointLogo} alt="Check Point" className="h-40 sm:h-56 w-auto object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Tournament Schedule */}
        <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 md:pb-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <a href="#" className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-card border border-border text-foreground text-sm sm:text-base rounded-full hover:border-gold/30 hover:shadow-md transition-all">
                <FileText size={16} className="text-gold" />
                Program turnaja
              </a>
              <a href="#" className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-card border border-border text-foreground text-sm sm:text-base rounded-full hover:border-gold/30 hover:shadow-md transition-all">
                <Trophy size={16} className="text-gold" />
                Priebežné hodnotenie
              </a>
              <a href="#" className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-card border border-border text-foreground text-sm sm:text-base rounded-full hover:border-gold/30 hover:shadow-md transition-all">
                <FileText size={16} className="text-gold" />
                Prezentácia BSGA Tour
              </a>
            </div>

            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                Kalendár
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 sm:mt-4">
                Termíny turnajov
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
            </div>

            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
              {tournaments.map((tournament, index) => <div key={index} className="flex items-center gap-3 sm:gap-6 p-4 sm:p-6 bg-card rounded-xl sm:rounded-2xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gold/10 rounded-full flex items-center justify-center">
                    <Trophy className="text-gold" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                      <div className="flex items-center gap-2 text-foreground font-medium text-sm sm:text-base">
                        <Calendar size={16} className="text-gold flex-shrink-0" />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                        <MapPin size={16} className="text-gold flex-shrink-0" />
                        <span className="truncate">{tournament.location}</span>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>

        {/* Registration */}
        <section className="py-12 sm:py-16 md:py-24 bg-muted border-secondary">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 sm:mb-6">Oslovila vás BSGA Tour ?</h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto px-2">Pre prihlásenie alebo viac informácií nás kontaktujte</p>
            <a href="mailto:touroffice@bsga.sk" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gold text-primary text-sm sm:text-base font-medium rounded-full hover:bg-gold-light transition-all duration-300">
              <Mail size={18} />
              touroffice@bsga.sk
            </a>

          </div>
        </section>
      </main>
      <Footer />
    </>;
};
export default Tour;