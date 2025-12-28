import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Award, Star } from "lucide-react";

const team = [
  {
    name: "Peter Švajlen",
    role: "Hlavný profesionál BSGA",
    achievements: [
      "6-násobný majster Slovenska",
      '5-násobný víťaz PGA SK Order of Merit',
      'Licencia "A" Five Star Golf Academy',
    ],
    email: "peter@bsga.sk",
  },
  {
    name: "Jakub Hrbáň",
    role: "Spoluzakladateľ a profesionál",
    achievements: [
      "Hlavný tréner CTM v Hrubej Borši",
      "Špecialista na fitting golfových palíc",
      'Licencia "B" Five Star Golf Academy',
    ],
    email: "jakub@bsga.sk",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>O nás | BSGA - Best Swing Golf Academy</title>
        <meta
          name="description"
          content="Spoznajte tím BSGA. Peter Švajlen a Jakub Hrbáň - plne kvalifikovaní PGA profesionáli s viac ako 8 rokmi skúseností."
        />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-primary">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
              O nás
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
              Náš príbeh
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto px-2">
              Od roku 2016 pomáhame ľuďom objavovať krásu golfu
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 sm:mb-8">
                Najväčšia golfová akadémia na Slovensku
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                Best Swing Golf Academy (BSGA) vznikla koncom roku 2016 s jasnou
                misiou: propagovať golf na Slovensku, vytvárať pozitívny obraz o
                tejto hre a sprístupniť ju všetkým vekovým kategóriám.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Naši zakladatelia, Peter Švajlen a Jakub Hrbáň, sú plne
                kvalifikovaní PGA profesionáli s bohatými skúsenosťami. Tréningy
                prebiehajú najmä v rezortoch Hrubá Borša a Nitra (Red Oak Golf
                Club).
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-12 sm:py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                Náš tím
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 sm:mt-4">
                Profesionálni tréneri
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                    <span className="text-gold text-2xl sm:text-3xl font-serif font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground text-center mb-1 sm:mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gold text-sm sm:text-base text-center mb-4 sm:mb-6">{member.role}</p>

                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {member.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 sm:gap-3 text-muted-foreground"
                      >
                        <Award className="text-gold flex-shrink-0 mt-0.5 sm:mt-1" size={14} />
                        <span className="text-xs sm:text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center gap-2 text-sm sm:text-base text-foreground hover:text-gold transition-colors"
                  >
                    <Mail size={16} />
                    <span>{member.email}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
