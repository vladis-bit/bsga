import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, GraduationCap, Target, Users } from "lucide-react";

const Akademia = () => {
  return (
    <>
      <Helmet>
        <title>Akadémia | BSGA - Best Swing Golf Academy</title>
        <meta
          name="description"
          content="BSGA Akadémia - profesionálne golfové tréningy, kurzy pre začiatočníkov aj pokročilých. Staň sa súčasťou najväčšej golfovej akadémie na Slovensku."
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 sm:pt-28 md:pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/10 mb-6">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6">
              BSGA <span className="text-gold">Akadémia</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
              Profesionálne golfové vzdelávanie pre všetky úrovne. Od začiatočníkov až po pokročilých hráčov.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 mb-4">
                <GraduationCap className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kurzy pre začiatočníkov</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Základy golfu, správna technika švihu a etiketa na ihrisku.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 mb-4">
                <Target className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pokročilé tréningy</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Zdokonaľovanie techniky, mentálna príprava a herná stratégia.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 mb-4">
                <Users className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3">Juniorská akadémia</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Špeciálne programy pre mladých golfistov a talenty.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 mb-8">
          <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
              Pripravení začať?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Kontaktujte nás a dozvie sa viac o našich tréningových programoch.
            </p>
            <a
              href="/#kontakt"
              className="inline-flex items-center justify-center px-8 py-3 bg-gold text-foreground font-semibold rounded-full hover:bg-gold/90 transition-colors"
            >
              Kontaktovať nás
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Akademia;
