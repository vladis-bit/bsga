import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Mail, FileText, Trophy, CalendarDays, MapPin } from "lucide-react";
import asbisLogo from "@/assets/partner-asbis-tour.webp";
import tourHeroImageAsset from "@/assets/tour-hero-2026.webp.asset.json";
const tourHeroImage = tourHeroImageAsset.url;
import tourHeroImageAvifAsset from "@/assets/tour-hero-2026.avif.asset.json";
const tourHeroImageAvif = tourHeroImageAvifAsset.url;
import checkpointLogo from "@/assets/partner-checkpoint-tour.png";
import TournamentCard from "@/components/TournamentCard";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import promo1Asset from "@/assets/tour-promos/promo-tour-1.pdf.asset.json";
import promo2Asset from "@/assets/tour-promos/promo-tour-2.pdf.asset.json";
import promo3Asset from "@/assets/tour-promos/promo-tour-3.pdf.asset.json";
import promo4Asset from "@/assets/tour-promos/promo-tour-4.pdf.asset.json";
import promo5Asset from "@/assets/tour-promos/promo-tour-5.pdf.asset.json";

import hrubaBorsaImg from "@/assets/courses/hruba-borsa.webp";
import taleImg from "@/assets/courses/tale.webp";
import heritageImgAsset from "@/assets/courses/heritage.jpg.asset.json";
const heritageImg = heritageImgAsset.url;
import legendImg from "@/assets/courses/legend.webp";
import ostraviceImg from "@/assets/courses/ostravice.webp";
import sedinImg from "@/assets/courses/sedin.webp";
import kaskadaImg from "@/assets/courses/kaskada.webp";

const tournaments = [
  {
    number: 1,
    date: "15.5.2026",
    location: "Hrubá Borša",
    image: hrubaBorsaImg,
    presenter: "NN",
    promoUrl: promo1Asset.url,
    links: { locationUrl: "https://maps.app.goo.gl/4RYGX7fM6i6JNign6", resultsUrl: "https://www.skga.sk/turnaje/turnaj?id=1000028130", galleryUrl: "https://drive.google.com/drive/folders/1TLphxWdQEHPAuaNvflVUHiIw8qfApUiC?usp=sharing" }
  },
  {
    number: 2,
    date: "5.6.2026",
    location: "Tále",
    image: taleImg,
    presenter: "Soitron",
    promoUrl: promo2Asset.url,
    links: { locationUrl: "https://maps.app.goo.gl/etftEGLtnH7MNFyBA", resultsUrl: "https://www.skga.sk/turnaje/turnaj?id=1000028133", galleryUrl: "https://drive.google.com/drive/folders/1WsLb9zka0RqK7mYmQU-koTFq_0IgcpOP?usp=sharing" }
  },
  {
    number: 3,
    date: "17.7.2026",
    location: "Penati Heritage",
    image: heritageImg,
    presenter: "ELV produkt a.s.",
    promoUrl: promo3Asset.url,
    links: { locationUrl: "https://maps.app.goo.gl/BZufvXZoWCtmWYgj9", resultsUrl: "https://www.golfgenius.com/pages/12463043224119850432", galleryUrl: "https://drive.google.com/drive/folders/1D6lcI6d3Ojp6wXup8qxJmXqqY88ed_LX?usp=drive_link" }
  },
  {
    number: 4,
    date: "14.8.2026",
    location: "Penati Legend",
    image: legendImg,
    presenter: "ELcomp s.r.o.",
    promoUrl: promo4Asset.url,
    links: { locationUrl: "https://maps.app.goo.gl/BZufvXZoWCtmWYgj9", resultsUrl: "https://www.golfgenius.com/pages/12463049917557945799", galleryUrl: "https://drive.google.com/drive/folders/12TcsW8fck2_i5miq28QNIDxl_tdyDmpu?usp=drive_link" }
  },
  {
    number: 5,
    date: "4.9.2026",
    location: "Ostravice",
    image: ostraviceImg,
    presenter: "Altron",
    promoUrl: promo5Asset.url,
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
  const toIso = (d: string) => {
    const [day, month, year] = d.split(".");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  const eventSchemas = tournaments.map((t) => ({
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `BSGA Tour 2026 #${t.number} – ${t.location}`,
    startDate: toIso(t.date),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Golf",
    location: {
      "@type": "Place",
      name: t.location,
      address: { "@type": "PostalAddress", addressCountry: "SK" },
    },
    organizer: { "@id": "https://bsga.sk/#organization" },
    url: "https://bsga.sk/tour",
  }));
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: "https://bsga.sk/" },
      { "@type": "ListItem", position: 2, name: "Tour 2026", item: "https://bsga.sk/tour" },
    ],
  };
  return <>
      <SEO
        title="BSGA Tour 2026 | Séria golfových turnajov"
        description="BSGA Tour 2026 - séria golfových turnajov v najlepších slovenských rezortoch. Hrubá Borša, Tále, Penati Legend, Penati Heritage a Ostravice."
        path="/tour"
        jsonLd={[breadcrumb, ...eventSchemas]}
      />
      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main>
          {/* Hero */}
          <section className="relative w-full bg-background px-0 pt-20 sm:px-4 sm:pt-24 md:px-6">
            <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-none min-h-[460px] sm:min-h-[560px] sm:rounded-3xl md:min-h-[680px] max-h-[calc(100vh-4rem)]">
                <img
                  src={legendImg}
                  alt="Penati Legend – dejisko turnaja BSGA Tour 4"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  {...({ fetchpriority: "high" } as any)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/35" />

                <div className="relative z-10 flex h-full min-h-[460px] items-center sm:min-h-[560px] md:min-h-[680px]">
                  <div className="container mx-auto px-4 py-14 text-center sm:px-6 sm:py-16 md:py-20">
                    <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                      <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                      <Trophy size={13} /> Najbližší turnaj
                      <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                    </span>
                    <h1 className="mt-5 text-balance font-serif text-4xl font-bold leading-[1.08] text-primary-foreground sm:mt-6 sm:text-6xl md:text-7xl lg:text-8xl">
                      BSGA Tour 4
                    </h1>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm md:text-base">
                      presented by ELcomp s.r.o.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-black/40 px-4 py-2 text-xs font-medium text-primary-foreground backdrop-blur-sm sm:text-sm">
                        <CalendarDays size={15} className="text-gold" /> 14. august 2026
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-black/40 px-4 py-2 text-xs font-medium text-primary-foreground backdrop-blur-sm sm:text-sm">
                        <MapPin size={15} className="text-gold" /> Penati Golf Resort – Legend
                      </span>
                    </div>

                    <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-primary-foreground/80 sm:text-base md:text-lg">
                      Štvrtý turnaj série BSGA Tour 2026 na jednom z najprestížnejších ihrísk na Slovensku. Kapacita je obmedzená – zabezpeč si svoje miesto včas.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                      <a
                        href="mailto:touroffice@bsga.sk?subject=Prihlásenie na BSGA Tour 4 – Penati Legend"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-bold text-primary transition-colors duration-300 hover:bg-primary-foreground hover:text-primary active:scale-[0.98] sm:w-auto"
                      >
                        Prihlásiť sa
                      </a>
                      <a
                        href={promo4Asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground px-10 py-4 text-sm font-bold text-primary-foreground backdrop-blur-sm transition-colors duration-300 hover:bg-primary-foreground hover:text-primary active:scale-[0.98] sm:w-auto"
                      >
                        <FileText size={16} className="text-gold" />
                        Promo leták
                      </a>
                    </div>
                  </div>
                </div>
            </div>
          </section>

          {/* Partners */}
          <section className="bg-background py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card px-4 py-6 sm:gap-6 sm:px-6 sm:py-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                  Generální partneri
                </span>
                <div className="flex items-center justify-center gap-6 sm:gap-12 md:gap-16">
                  <img loading="lazy" decoding="async" src={asbisLogo} alt="ASBIS" className="h-28 sm:h-28 md:h-44 lg:h-[280px] w-auto object-contain" />
                  <img loading="lazy" decoding="async" src={checkpointLogo} alt="Check Point" className="h-28 sm:h-28 md:h-44 lg:h-[280px] w-auto object-contain" />
                </div>
              </div>
            </div>
          </section>

          {/* Tournament Schedule */}
          <section className="bg-background pt-6 pb-16 sm:pt-8 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-4 sm:mb-14">
                <a href="/documents/BSGA_Tour_2026_propozicie.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-gold/60 hover:bg-muted">
                  <FileText size={16} className="text-gold" />
                  Propozície
                </a>
                <a href="/documents/BSGA_Tour_2026_program.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-gold/60 hover:bg-muted">
                  <FileText size={16} className="text-gold" />
                  Program turnaja
                </a>
                <a href="/documents/BSGA_Tour_2026.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-gold/60 hover:bg-muted">
                  <FileText size={16} className="text-gold" />
                  Prezentácia BSGA Tour
                </a>
                <a href="/__l5e/assets-v1/e20c1f8b-3690-41f0-a639-96ec929acea2/BSGA_Tour_after_3rd_Round.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-primary transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground">
                  <Trophy size={16} className="text-gold" />
                  Priebežné hodnotenie
                </a>
              </div>

              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    Termíny turnajov
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">
                    <CalendarDays className="h-4 w-4" /> Kalendár
                  </p>
                </div>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40 md:block">
                  Sezóna 2026
                </span>
              </div>

              <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
                {tournaments.map((tournament) => (
                  <div key={tournament.number} className="space-y-3">
                    <TournamentCard
                      theme="ivory"
                      number={tournament.number}
                      date={tournament.date}
                      location={tournament.location}
                      image={tournament.image}
                      presenter={tournament.presenter}
                      links={tournament.links}
                    />
                    <div className="relative group">
                      <a
                        href={tournament.promoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-gold/60 bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground active:scale-[0.98]"
                      >
                        <FileText size={20} className="opacity-90 transition-transform duration-300 group-hover:scale-110" />
                        <span>Promo {tournament.number} - leták</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Registration */}
          <section className="bg-background pb-16 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-muted p-8 text-center sm:p-10 md:p-12">
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Oslovila vás BSGA Tour ?</h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">Pre prihlásenie alebo viac informácií nás kontaktujte</p>
                <a href="mailto:touroffice@bsga.sk" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-bold text-primary transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground">
                  <Mail size={18} />
                  touroffice@bsga.sk
                </a>
              </div>
            </div>
          </section>

          {/* BSGA Tour 2025 */}
          <section className="bg-background pb-16 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2025
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Archív</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2025.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
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
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>
          {/* BSGA Tour 2024 */}
          <section className="bg-background pb-16 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2024
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Archív</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2024.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
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
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>

          {/* BSGA Tour 2023 */}
          <section className="bg-background pb-16 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2023
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Archív</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2023.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
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
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>

          {/* BSGA Tour 2022 */}
          <section className="bg-background pb-16 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2022
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Archív</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2022.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
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
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>;
};

export default Tour;
