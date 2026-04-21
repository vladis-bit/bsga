import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DevelopmentTimeline from "@/components/DevelopmentTimeline";
import CampCards from "@/components/CampCards";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useTranslateLang } from "@/components/GoogleTranslate";
import heroImage from "@/assets/akademia/hero-slide-1.jpg";

const Akademia = () => {
  const lang = useTranslateLang();
  const handleScrollToCamps = () => {
    const element = document.querySelector("#tabory");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return <>
      <Helmet>
        <title>Akadémia | BSGA - Best Swing Golf Academy</title>
        <meta name="description" content="BSGA Akadémia - profesionálne golfové tréningy, detské tábory 2026 a development program pre mladých golfistov. Staň sa súčasťou najväčšej golfovej akadémie na Slovensku." />
      </Helmet>
      <Navbar />
      <AuroraBackground variant="silver">
        <main className="bg-transparent">
          {/* Hero Section */}
          <section className="relative w-full bg-transparent">
            <div className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[560px] md:min-h-[680px] max-h-[calc(100vh-4rem)]">
              <img
                src={heroImage}
                alt="BSGA Akadémia - detské tábory 2026"
                className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

              <div className="relative z-10 flex h-full min-h-[460px] items-end sm:min-h-[560px] md:min-h-[680px]">
                <div className="container mx-auto px-4 pb-10 pt-16 text-center sm:px-6 sm:pb-12 sm:pt-20 md:pb-14 md:pt-24">
                  <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                    Akadémia
                  </span>
                  <h1 className="mt-3 text-3xl font-serif font-bold text-primary-foreground sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl">
                    Spustenie prihlasovania na detské tábory 2026
                  </h1>
                  <p className="mt-4 mx-auto max-w-3xl text-base text-primary-foreground/90 sm:text-lg md:text-xl">
                    Rezervujte miesto pre vaše dieťa už teraz
                  </p>
                  <button
                    onClick={handleScrollToCamps}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-gold-light sm:text-base"
                  >
                    <span className="notranslate">{lang === "en" ? "Sign up" : "Prihlásiť sa"}</span>
                  </button>
                </div>
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
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 text-center sm:rounded-3xl sm:p-12">
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