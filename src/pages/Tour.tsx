import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, FileText, Trophy } from "lucide-react";
import asbisLogo from "@/assets/partner-asbis-tour.png";
import tourHeroImage from "@/assets/tour-hero-2026.jpg";
import checkpointLogo from "@/assets/partner-checkpoint-tour.png";
import TournamentCard from "@/components/TournamentCard";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import hrubaBorsaImg from "@/assets/courses/hruba-borsa.png";
import taleImg from "@/assets/courses/tale.jpg";
import heritageImg from "@/assets/courses/heritage.jpg";
import legendImg from "@/assets/courses/legend.jpg";
import ostraviceImg from "@/assets/courses/ostravice.jpg";
import sedinImg from "@/assets/courses/sedin.jpg";
import kaskadaImg from "@/assets/courses/kaskada.webp";

const tournaments = [
  {
    number: 1,
    date: "15.5.2026",
    location: "Hrubá Borša",
    image: hrubaBorsaImg,
    links: { locationUrl: "https://maps.app.goo.gl/4RYGX7fM6i6JNign6", resultsUrl: "https://www.skga.sk/turnaje/turnaj?id=1000028130", galleryUrl: "https://drive.google.com/drive/folders/1TLphxWdQEHPAuaNvflVUHiIw8qfApUiC?usp=sharing" }
  },
  {
    number: 2,
    date: "5.6.2026",
    location: "Tále",
    image: taleImg,
    links: { locationUrl: "https://maps.app.goo.gl/etftEGLtnH7MNFyBA", resultsUrl: "https://www.skga.sk/turnaje/turnaj?id=1000028133", galleryUrl: "https://drive.google.com/drive/folders/1TLphxWdQEHPAuaNvflVUHiIw8qfApUiC?usp=sharing" }
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

const tournaments2025 = [
  {
    number: 1,
    date: "15.5.2025",
    location: "Sedin Golf Resort",
    image: sedinImg,
    links: { locationUrl: "https://maps.app.goo.gl/8ozSp7g31v1baDVc8", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1KcaYOJLdWfGV59cG3FdUS9K_Ds7ppCq5?usp=sharing" }
  },
  {
    number: 2,
    date: "6.6.2025",
    location: "Grey Bear Tále",
    image: taleImg,
    links: { locationUrl: "https://maps.app.goo.gl/QR5zbcFmDYnCBygr7", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/19Ze1l42gGIKrpISB44pIfiyXa--Zs1Yq?usp=sharing" }
  },
  {
    number: 3,
    date: "11.7.2025",
    location: "Penati - Heritage",
    image: heritageImg,
    links: { locationUrl: "https://maps.app.goo.gl/StdaRFJwztpQWAuX7", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1wGALPYzW8Px-oL7JhTPL8D60ttJCSbzq?usp=sharing" }
  },
  {
    number: 4,
    date: "15.8.2025",
    location: "Penati - Legend",
    image: legendImg,
    links: { locationUrl: "https://maps.app.goo.gl/StdaRFJwztpQWAuX7", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1T5nGSa_EeLylJ-YtDAz1t7-sSlOus7WW?usp=sharing" }
  },
  {
    number: 5,
    date: "5.9.2025",
    location: "Kaskáda Golf Resort",
    image: kaskadaImg,
    links: { locationUrl: "https://maps.app.goo.gl/31e6dkciYh7kvxuE9", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1KLktpEYwdaGhSdIcHfo5rJgBFgqVL6T1?usp=sharing" }
  }
];

const tournaments2024 = [
  { number: 1, date: "2024", location: "Sedin Golf Resort", links: { galleryUrl: "https://drive.google.com/drive/folders/1F9h7_pAYavpg3URVyeIVJvQfUtTTH8kj?usp=drive_link" } },
  { number: 2, date: "2024", location: "Penati Heritage", links: { galleryUrl: "https://drive.google.com/drive/folders/18EFhgHFKbfdTqbTdDBIGHccMIi4yKyh7?usp=drive_link" } },
  { number: 3, date: "2024", location: "Apex Golf Club", links: { galleryUrl: "https://drive.google.com/drive/folders/1z8B3nC7V-pMWEg21NVxpcpzTo6-rf5Si?usp=drive_link" } },
  { number: 4, date: "2024", location: "Penati Legend", links: { galleryUrl: "https://drive.google.com/drive/folders/1hNZhuP4o2eORtY2xIqiDuqaVueGvkV7S?usp=drive_link" } },
  { number: 5, date: "2024", location: "Panoráma Kácov", links: { galleryUrl: "https://drive.google.com/drive/folders/1wkWsmRjY9u-xN7hGpYfbj5o44WMSCwHB?usp=drive_link" } },
];

const tournaments2023 = [
  { number: 1, date: "2023", location: "Red Oak Nitra", links: { galleryUrl: "https://drive.google.com/drive/folders/1UlBQtMT_06Kc9D054-rLqOrut9MtJKEG?usp=drive_link" } },
  { number: 2, date: "2023", location: "Sedin Golf Resort", links: { galleryUrl: "https://drive.google.com/drive/folders/1E5N9RDdO-pMmHxZtZ3AmPXOZ3ct9i4Hk?usp=drive_link" } },
  { number: 3, date: "2023", location: "Apex Golf Club", links: { galleryUrl: "https://drive.google.com/drive/folders/1ARvyCLjz0E0XKMQsPHOtpOCaUL7dtRL9?usp=drive_link" } },
  { number: 4, date: "2023", location: "Penati Legend", links: { galleryUrl: "https://drive.google.com/drive/folders/1XeHbJ6TIeOyMBlv8vn8CwyWNlAqSiSBZ?usp=drive_link" } },
  { number: 5, date: "2023", location: "Penati Heritage", links: { galleryUrl: "https://drive.google.com/drive/folders/1RGrsDKs-OLBJxxByT73nRcWtNjW93UhL?usp=drive_link" } },
];

const tournaments2022 = [
  { number: 1, date: "2022", location: "Red Oak Nitra", links: { galleryUrl: "https://drive.google.com/drive/folders/1LtdBgABivavBaUdljQ1rv-JNmwyo7ibj?usp=drive_link" } },
  { number: 2, date: "2022", location: "Sedin Golf Resort", links: { galleryUrl: "https://drive.google.com/drive/folders/1GOAvOjffOmL7N3x3kHnc1hQlx3pE4lmE?usp=drive_link" } },
  { number: 3, date: "2022", location: "Penati Heritage", links: { galleryUrl: "https://drive.google.com/drive/folders/1NEedCiAGgdeDCe6KpE7g-uDouCxw1oX1?usp=drive_link" } },
  { number: 4, date: "2022", location: "Penati Legend", links: { galleryUrl: "https://drive.google.com/drive/folders/1GL1QRqcc0MKndx5qN3Vux1ceix9OyGjC?usp=drive_link" } },
  { number: 5, date: "2022", location: "Hrubá Borša", links: { galleryUrl: "https://drive.google.com/drive/folders/1m2WOPzWxIUhmIzHm8XdeLT1cBHMZKUC9?usp=drive_link" } },
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
          <section className="relative w-full bg-transparent">
            <div className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[560px] md:min-h-[680px] max-h-[calc(100vh-4rem)]">
                <img
                  src={tourHeroImage}
                  alt="BSGA Tour 2026 na golfovom ihrisku"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

                <div className="relative z-10 flex h-full min-h-[460px] items-end sm:min-h-[560px] md:min-h-[680px]">
                  <div className="container mx-auto px-4 pb-10 pt-16 text-center sm:px-6 sm:pb-12 sm:pt-20 md:pb-14 md:pt-24">
                    <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                      Turnaje
                    </span>
                    <h1 className="mt-3 text-5xl font-serif font-bold text-primary-foreground sm:mt-4 sm:text-6xl md:text-7xl lg:text-8xl">
                      BSGA Tour 2026
                    </h1>
                    <p className="mt-4 mx-auto max-w-3xl text-base text-primary-foreground/95 sm:text-lg md:text-xl">
                      Exkluzívna séria turnajov na najlepších slovenských a českých ihriskách
                    </p>
                    <a
                      href="mailto:touroffice@bsga.sk?subject=Prihlásenie na BSGA Tour 2026"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-gold-light sm:text-base"
                    >
                      <span>Prihlásiť sa</span>
                    </a>
                  </div>
                </div>
            </div>
          </section>

          {/* Partners */}
          <section className="py-4 sm:py-6 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 rounded-3xl border border-border/50 bg-background/60 px-6 py-6 backdrop-blur-sm">
                <span className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider">
                  Generální partneri
                </span>
                <div className="flex items-center justify-center gap-8 sm:gap-16">
                  <img src={asbisLogo} alt="ASBIS" className="h-32 sm:h-56 md:h-[320px] w-auto object-contain" />
                  <img src={checkpointLogo} alt="Check Point" className="h-32 sm:h-56 md:h-[320px] w-auto object-contain" />
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

          {/* BSGA Tour 2025 */}
          <section className="py-12 sm:py-16 md:py-24 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  Archív
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 sm:mt-4">
                  BSGA Tour 2025
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2025.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          image={tournament.image}
                          links={tournament.links}
                          hideResults
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 bg-card border-border text-foreground hover:border-gold/30 hover:bg-gold/10" />
                    <CarouselNext className="static translate-y-0 bg-card border-border text-foreground hover:border-gold/30 hover:bg-gold/10" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>
          {/* BSGA Tour 2024 */}
          <section className="py-12 sm:py-16 md:py-24 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground">
                  BSGA Tour 2024
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2024.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          links={tournament.links}
                          hideResults
                          hideLocation
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 bg-card border-border text-foreground hover:border-gold/30 hover:bg-gold/10" />
                    <CarouselNext className="static translate-y-0 bg-card border-border text-foreground hover:border-gold/30 hover:bg-gold/10" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>

          {/* BSGA Tour 2023 */}
          <section className="py-12 sm:py-16 md:py-24 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground">
                  BSGA Tour 2023
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2023.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          links={tournament.links}
                          hideResults
                          hideLocation
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 bg-card border-border text-foreground hover:border-gold/30 hover:bg-gold/10" />
                    <CarouselNext className="static translate-y-0 bg-card border-border text-foreground hover:border-gold/30 hover:bg-gold/10" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>

          {/* BSGA Tour 2022 */}
          <section className="py-12 sm:py-16 md:py-24 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground">
                  BSGA Tour 2022
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2022.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          links={tournament.links}
                          hideResults
                          hideLocation
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 bg-card border-border text-foreground hover:border-gold/30 hover:bg-gold/10" />
                    <CarouselNext className="static translate-y-0 bg-card border-border text-foreground hover:border-gold/30 hover:bg-gold/10" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>
        </main>
      </AuroraBackground>
      <Footer />
    </>;
};

export default Tour;
