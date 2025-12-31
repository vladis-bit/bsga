import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DottedSurface from "@/components/DottedSurface";
import AkademiaNewsSlider from "@/components/AkademiaNewsSlider";
import DevelopmentTimeline from "@/components/DevelopmentTimeline";
import CampCards from "@/components/CampCards";

const Akademia = () => {
  return (
    <>
      <Helmet>
        <title>Akadémia | BSGA - Best Swing Golf Academy</title>
        <meta
          name="description"
          content="BSGA Akadémia - profesionálne golfové tréningy, detské tábory 2026 a development program pre mladých golfistov. Staň sa súčasťou najväčšej golfovej akadémie na Slovensku."
        />
      </Helmet>
      <Navbar />
      <main className="bg-background">
        {/* Hero Section with News Slider */}
        <section className="relative w-full bg-background pt-4 sm:pt-8">
          <div className="px-2 sm:px-4 md:px-8">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-primary py-12 sm:py-16 md:py-20">
              <DottedSurface />
              <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                  <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                    Akadémia
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
                    BSGA Development Program
                  </h1>
                  <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto px-2">
                    Komplexný rozvoj mladého športovca od útleho veku
                  </p>
                </div>
                <div className="max-w-4xl mx-auto">
                  <AkademiaNewsSlider />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Timeline Section */}
        <section id="timeline" className="py-12 sm:py-16 md:py-20 bg-background scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <span className="text-gold text-xs sm:text-sm tracking-[0.15em] uppercase">
                Fázy rozvoja
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-4">
                Vývoj dieťaťa od skorého veku
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                Náš program sprevádza mladých športovcov od prvých krokov až po profesionálnu kariéru
              </p>
            </div>
            <DevelopmentTimeline />
          </div>
        </section>

        {/* Summer Camps Section */}
        <section id="tabory" className="py-12 sm:py-16 md:py-20 bg-background scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <span className="text-gold text-xs sm:text-sm tracking-[0.15em] uppercase">
                Leto 2026
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-4">
                Detské tábory 2026
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                Rezervujte miesto pre vaše dieťa na nezabudnuteľné golfové leto
              </p>
            </div>
            <CampCards />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
                Máte otázky?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Kontaktujte nás a dozvie sa viac o našich programoch pre mladých golfistov.
              </p>
              <a
                href="mailto:kids@bsga.sk?subject=Otázka k BSGA Akadémii"
                className="inline-flex items-center justify-center px-8 py-3 bg-gold text-primary font-semibold rounded-full hover:bg-gold-light transition-colors"
              >
                Napísať nám
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Akademia;
