import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AkademiaNewsSlider from "@/components/AkademiaNewsSlider";
import DevelopmentTimeline from "@/components/DevelopmentTimeline";
import CampCards from "@/components/CampCards";
import { AuroraBackground } from "@/components/ui/aurora-background";

const Akademia = () => {
  return <>
      <Helmet>
        <title>Akadémia | BSGA - Best Swing Golf Academy</title>
        <meta name="description" content="BSGA Akadémia - profesionálne golfové tréningy, detské tábory 2026 a development program pre mladých golfistov. Staň sa súčasťou najväčšej golfovej akadémie na Slovensku." />
      </Helmet>
      <Navbar />
      <AuroraBackground variant="silver">
        <main className="bg-transparent">
          {/* Hero Section with News Slider */}
          <section className="relative w-full bg-transparent pt-4 sm:pt-8">
            <div className="px-2 sm:px-4 md:px-8">
              <div className="relative w-full overflow-hidden rounded-2xl border border-border/70 bg-transparent shadow-xl sm:rounded-3xl">
                <AkademiaNewsSlider />
              </div>
            </div>
          </section>

          {/* Development Timeline Section */}
          <section id="timeline" className="scroll-mt-24 bg-transparent py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <span className="text-gold text-xs sm:text-sm tracking-[0.15em] uppercase">AKADÉMIA</span>
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
                  Akadémia
                </span>
                <h2 className="mt-2 mb-4 text-2xl font-serif font-bold text-foreground sm:text-3xl md:text-4xl">
                  Detské tábory 2026
                </h2>
                <p className="mx-auto max-w-2xl text-sm text-foreground/70 sm:text-base">
                  Rezervujte miesto pre vaše dieťa na nezabudnuteľné golfové leto
                </p>
              </div>
              <CampCards />
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-transparent py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/20 to-gold/5 p-8 text-center sm:rounded-3xl sm:p-12">
                <h2 className="mb-4 text-2xl font-serif font-bold text-foreground sm:text-3xl">Máte nezodpovedané otázky?</h2>
                <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">Kontaktujte nás a dozvie sa viac o našich programoch pre mladých golfistov</p>
                <a href="mailto:kids@bsga.sk?subject=Otázka k BSGA Akadémii" className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-semibold text-primary transition-colors hover:bg-gold-light">Napíšte nám</a>
              </div>
            </div>
          </section>
        </main>
      </AuroraBackground>
      <Footer />
    </>;
};
export default Akademia;