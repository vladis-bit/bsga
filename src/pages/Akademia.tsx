import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import DevelopmentTimeline from "@/components/DevelopmentTimeline";
import CampCards from "@/components/CampCards";
import JuniorLevelSystem from "@/components/JuniorLevelSystem";
import CampProgramSection from "@/components/CampProgramSection";
import StarsOfTomorrowCard from "@/components/StarsOfTomorrowCard";
import { AuroraBackground } from "@/components/ui/aurora-background";
import WavesCanvas from "@/components/WavesCanvas";
import { FileText, Mail } from "lucide-react";

const Akademia = () => {
  const handleScrollToCamps = () => {
    const element = document.querySelector("#tabory");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const campEvents = [
    { name: "Denný golfový tábor – Turnus 1", startDate: "2026-07-06", endDate: "2026-07-10", soldOut: true },
    { name: "Denný golfový tábor – Turnus 2", startDate: "2026-08-03", endDate: "2026-08-07", soldOut: true },
    { name: "Denný golfový tábor – Turnus 3", startDate: "2026-08-24", endDate: "2026-08-28", soldOut: false },
  ].map((c) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: c.name,
    startDate: c.startDate,
    endDate: c.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Golfový klub Hrubá Borša",
      address: { "@type": "PostalAddress", addressLocality: "Hrubá Borša", addressCountry: "SK" },
    },
    organizer: { "@id": "https://bsga.sk/#organization" },
    offers: {
      "@type": "Offer",
      price: "310",
      priceCurrency: "EUR",
      availability: c.soldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: "https://bsga.sk/akademia",
    },
  }));

  return <>
      <SEO
        title="Juniorský golf | BSGA - Best Swing Golf Academy"
        description="BSGA Juniorský golf - profesionálne golfové tréningy, detské tábory 2026 a development program pre mladých golfistov. Staň sa súčasťou najväčšej golfovej akadémie na Slovensku."
        path="/akademia"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Juniorský golf", url: "https://bsga.sk/akademia" },
        ]}
        jsonLd={campEvents}
      />
      <Navbar />
      <AuroraBackground variant="silver">
        <main className="bg-transparent">
          {/* Hero Section */}
          <section className="relative w-full overflow-hidden bg-transparent pt-24 sm:pt-28 md:pt-32">
            <WavesCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />
            <div className="container relative z-10 mx-auto px-4 pb-10 text-center sm:px-6 sm:pb-12 md:pb-14">
              <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                Juniorský golf
              </span>
              <h1 className="mt-3 text-3xl font-serif font-bold text-foreground sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl">
                Golfová akadémia pre deti a juniorov
              </h1>
              <p className="mt-4 mx-auto max-w-3xl text-base text-foreground/80 sm:text-lg md:text-xl">
                Turnus 1 a Turnus 2 sú už <strong>obsadené</strong>. Prihlasovanie na <strong>3. turnus detského tábora</strong> (24. – 28. 8. 2026, Hrubá Borša) je stále otvorené.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/documents/kemp_24-28_august.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Plagát detského tábora – 3. turnus"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/20 bg-background/70 px-7 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-background sm:w-auto sm:text-base"
                >
                  <FileText className="h-4 w-4" />
                  <span>Plagát</span>
                </a>
                <a
                  href="mailto:kids@bsga.sk?subject=Prihlásenie na detský tábor 2026 – 3. turnus"
                  aria-label="Prihlásiť sa na 3. turnus detského tábora BSGA 2026"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-gold-light sm:w-auto sm:text-base"
                >
                  <Mail className="h-4 w-4" />
                  <span>Prihlásiť sa</span>
                </a>
              </div>
            </div>
          </section>

          {/* Stars of Tomorrow */}
          <StarsOfTomorrowCard />

          {/* Junior Level System */}
          <JuniorLevelSystem />

          {/* Development Timeline Section */}
          <section id="timeline" className="scroll-mt-24 bg-transparent py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <span className="text-gold text-xs sm:text-sm tracking-[0.15em] uppercase">JUNIORSKÝ GOLF</span>
                <h2 className="mt-2 mb-4 text-2xl font-serif font-bold text-foreground sm:text-3xl md:text-4xl">Rozvoj detí od skorého veku</h2>
                <p className="mx-auto max-w-2xl text-sm text-foreground/70 sm:text-base">Náš program sprevádza mladých golfistov od prvých krokov až po prijatie na americkú univerzitu alebo profesionálnu kariéru</p>
              </div>
              <DevelopmentTimeline />
            </div>
          </section>

          {/* Summer Camps Section */}
          <section id="tabory" className="scroll-mt-24 bg-transparent py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <span className="text-gold text-xs sm:text-sm tracking-[0.15em] uppercase">
                  Juniorský golf
                </span>
                <h2 className="mt-2 mb-4 text-2xl font-serif font-bold text-foreground sm:text-3xl md:text-4xl">
                  Detské tábory 2026
                </h2>
                <p className="mx-auto max-w-2xl text-sm text-foreground/70 sm:text-base">
                  Golfové leto pod vedením skúsených trénerov <strong>Vanessy Fajkusovej</strong> a <strong>Vladimíra Leška</strong>. Deti získajú základy golfovej techniky, naučia sa pravidlá a etiketu hry v príjemnom prostredí <strong>Golfového Klubu Hrubá Borša</strong>.
                </p>
              </div>
              <CampCards />
              <CampProgramSection />
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-transparent py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 text-center sm:rounded-3xl sm:p-12">
                <h2 className="mb-4 text-2xl font-serif font-bold text-foreground sm:text-3xl">Máte nezodpovedané otázky?</h2>
                <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">Kontaktujte nás a dozvie sa viac o našich programoch pre mladých golfistov</p>
                <a href="mailto:kids@bsga.sk?subject=Otázka k BSGA Juniorskému golfu" className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-semibold text-primary transition-colors hover:bg-gold-light">Napíšte nám</a>
              </div>
            </div>
          </section>
        </main>
      </AuroraBackground>
      <Footer />
    </>;
};
export default Akademia;