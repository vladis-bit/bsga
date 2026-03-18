import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, FileText, Trophy } from "lucide-react";
import asbisLogo from "@/assets/partner-asbis-tour.png";
import tourHeroImage from "@/assets/tour-hero-2026.png";
import checkpointLogo from "@/assets/partner-checkpoint-tour.png";
import TournamentCard from "@/components/TournamentCard";
import { AuroraBackground } from "@/components/ui/aurora-background";

import hrubaBorsaImg from "@/assets/courses/hruba-borsa.jpeg";
import taleImg from "@/assets/courses/tale.jpg";
import heritageImg from "@/assets/courses/heritage.jpg";
import legendImg from "@/assets/courses/legend.jpg";
import ostraviceImg from "@/assets/courses/ostravice.jpg";

const tournaments = [
  {
    number: 1,
    date: "15.5.2026",
    location: "Hrubá Borša",
    image: hrubaBorsaImg,
    links: { locationUrl: "https://maps.app.goo.gl/4RYGX7fM6i6JNign6", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1TLphxWdQEHPAuaNvflVUHiIw8qfApUiC?usp=sharing" }
  },
  {
    number: 2,
    date: "5.6.2026",
    location: "Tále",
    image: taleImg,
    links: { locationUrl: "https://maps.app.goo.gl/etftEGLtnH7MNFyBA", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1TLphxWdQEHPAuaNvflVUHiIw8qfApUiC?usp=sharing" }
  },
  {
    number: 3,
    date: "17.7.2026",
    location: "Penati Heritage",
    image: heritageImg,
    links: { locationUrl: "https://maps.app.goo.gl/BZufvXZoWCtmWYgj9", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1D6lcI6d3Ojp6wXup8qxJmXqqY88ed_LX?usp=drive_link" }
  },
  {
    number: 4,
    date: "14.8.2026",
    location: "Penati Legend",
    image: legendImg,
    links: { locationUrl: "https://maps.app.goo.gl/BZufvXZoWCtmWYgj9", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/12TcsW8fck2_i5miq28QNIDxl_tdyDmpu?usp=drive_link" }
  },
  {
    number: 5,
    date: "4.9.2026",
    location: "Ostravice",
    image: ostraviceImg,
    links: { locationUrl: "https://maps.app.goo.gl/A3H9g8qwsKDs9DEx7", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/14x4ceHAhcAK09kfIsNbTOSi48UROPHzb?usp=drive_link" }
  }
];

const Tour = () => {
  return <>
      <Helmet>
        <title>BSGA Tour 2026 | Séria golfových turnajov</title>
        <meta name="description" content="BSGA Tour 2026 - séria golfových turnajov v najlepších slovenských rezortoch. Hrubá Borša, Tále, Penati Legend, Penati Heritage a Ostravice." />
      </Helmet>
      <Navbar />
      <AuroraBackground variant="silver">
        <main className="bg-transparent">
          {/* Hero */}
          <section className="relative w-full bg-transparent pt-4 sm:pt-8">
            <div className="px-2 sm:px-4 md:px-8">
              <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl min-h-[460px] sm:min-h-[560px] md:min-h-[680px] max-h-[calc(100vh-8rem)]">
                <img
                  src={tourHeroImage}
                  alt="BSGA Tour 2026 na golfovom ihrisku"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

                <div className="relative z-10 flex h-full min-h-[460px] items-center sm:min-h-[560px] md:min-h-[680px]">
                  <div className="container mx-auto px-4 py-10 text-center sm:px-6 sm:py-12 md:py-14">
                    <span className="text-primary-foreground/90 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                      Turnaje
                    </span>
                    <h1 className="mt-3 text-4xl font-serif font-bold text-primary-foreground sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl">
                      BSGA Tour 2026
                    </h1>
                    <p className="mt-4 mx-auto max-w-3xl text-base text-primary-foreground/95 sm:text-lg md:text-xl">
                      Exkluzívna séria turnajov na najlepších slovenských ihriskách
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Partners */}
          <section className="py-4 sm:py-6 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 rounded-3xl border border-border/50 bg-background/60 px-6 py-6 backdrop-blur-sm">
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
          <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 md:pb-24 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <a href="/documents/BSGA_Tour_2026_propozicie.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-card border border-border text-foreground text-sm sm:text-base rounded-full hover:border-gold/30 hover:shadow-md transition-all">
                  <FileText size={16} className="text-gold" />
                  Propozície
                </a>
                <a href="/documents/BSGA_Tour_2026_program.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-card border border-border text-foreground text-sm sm:text-base rounded-full hover:border-gold/30 hover:shadow-md transition-all">
                  <FileText size={16} className="text-gold" />
                  Program turnaja
                </a>
                <a href="/documents/BSGA_Tour_2026.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-card border border-border text-foreground text-sm sm:text-base rounded-full hover:border-gold/30 hover:shadow-md transition-all">
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
                {tournaments.map((tournament) => (
                  <TournamentCard
                    key={tournament.number}
                    number={tournament.number}
                    date={tournament.date}
                    location={tournament.location}
                    image={tournament.image}
                    links={tournament.links}
                  />
                ))}
              </div>

              <div className="flex justify-center mt-8 sm:mt-12">
                <a href="#" className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-card border border-border text-foreground text-sm sm:text-base rounded-full hover:border-gold/30 hover:shadow-md transition-all">
                  <Trophy size={16} className="text-gold" />
                  Priebežné hodnotenie
                </a>
              </div>
            </div>
          </section>

          {/* Registration */}
          <section className="py-12 sm:py-16 md:py-24 bg-transparent">
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
      </AuroraBackground>
      <Footer />
    </>;
};

export default Tour;
