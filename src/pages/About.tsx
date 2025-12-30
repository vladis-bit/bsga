import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Instagram } from "lucide-react";

const founders = [
  { 
    name: "Peter Švajlen", 
    role: "Hlavný profesionál BSGA", 
    instagram: "#", 
    email: "peter@bsga.sk",
    achievements: [
      "6-násobný majster Slovenska",
      "5-násobný víťaz PGA SK Order of Merit",
      "Držiteľ Licencie \"A\" Five Star Golf Academy"
    ]
  },
  { 
    name: "Jakub Hrbáň", 
    role: "Profesionál", 
    instagram: "#", 
    email: "jakub@bsga.sk",
    achievements: [
      "Hlavný tréner CTM v Hrubej Borši",
      "Špecialista na fitting golfových palíc",
      "Držiteľ Licencie \"B\" Five Star Golf Academy"
    ]
  },
];

const team = [
  { name: "Michał Wirdzek", role: "Tréner BSGA", instagram: "#", email: "michal@bsga.sk" },
  { name: "Maroš Gajan", role: "Tréner BSGA", instagram: "#", email: "maros@bsga.sk" },
  { name: "Vanessa Fajkusová", role: "Tréner BSGA", instagram: "#", email: "vanessa@bsga.sk" },
  { name: "Milan Neštický", role: "Tréner BSGA", instagram: "#", email: "milan@bsga.sk" },
  { name: "Vladimír Leško", role: "Tréner BSGA", instagram: "#", email: "vladimir@bsga.sk" },
  { name: "Donka Mihaleva", role: "Administratíva", instagram: "#", email: "donka@bsga.sk" },
];

type TeamMember = {
  name: string;
  role: string;
  instagram: string;
  email: string;
  achievements?: string[];
};

const FounderCard = ({ member }: { member: TeamMember }) => (
  <div className="group text-center">
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 mb-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-6xl font-serif font-bold text-gold/60 group-hover:text-gold transition-colors duration-300">
          {member.name.charAt(0)}
        </span>
      </div>
      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-all duration-300" />
    </div>
    <h3 className="text-xl font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
      {member.name}
    </h3>
    <p className="text-base text-muted-foreground uppercase tracking-wider mb-3">
      {member.role}
    </p>
    {member.achievements && (
      <ul className="text-sm text-muted-foreground space-y-1.5 mb-3">
        {member.achievements.map((achievement, idx) => (
          <li key={idx}>{achievement}</li>
        ))}
      </ul>
    )}
    <div className="flex justify-center gap-3">
      <a
        href={member.instagram}
        className="text-muted-foreground hover:text-gold transition-colors duration-300"
        aria-label="Instagram"
      >
        <Instagram size={20} />
      </a>
      <a
        href={`mailto:${member.email}`}
        className="text-muted-foreground hover:text-gold transition-colors duration-300"
        aria-label="Email"
      >
        <Mail size={20} />
      </a>
    </div>
  </div>
);

const TeamCard = ({ member }: { member: typeof team[0] }) => (
  <div className="group text-center">
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 mb-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-6xl font-serif font-bold text-gold/60 group-hover:text-gold transition-colors duration-300">
          {member.name.charAt(0)}
        </span>
      </div>
      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-all duration-300" />
    </div>
    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
      {member.name}
    </h3>
    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
      {member.role}
    </p>
    <div className="flex justify-center gap-3">
      <a
        href={member.instagram}
        className="text-muted-foreground hover:text-gold transition-colors duration-300"
        aria-label="Instagram"
      >
        <Instagram size={18} />
      </a>
      <a
        href={`mailto:${member.email}`}
        className="text-muted-foreground hover:text-gold transition-colors duration-300"
        aria-label="Email"
      >
        <Mail size={18} />
      </a>
    </div>
  </div>
);
const About = () => {
  return <>
      <Helmet>
        <title>O nás | BSGA - Best Swing Golf Academy</title>
        <meta name="description" content="Spoznajte tím BSGA. Peter Švajlen a Jakub Hrbáň - plne kvalifikovaní PGA profesionáli s viac ako 8 rokmi skúseností." />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative w-full bg-background pt-4 sm:pt-8">
          <div className="px-2 sm:px-4 md:px-8">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-primary py-16 sm:py-24 md:py-32">
              <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  O nás
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
                  O nás
                </h1>
                <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto px-2">
                  Od roku 2016 pomáhame ľuďom objavovať krásu golfu
                </p>
              </div>
            </div>
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
              
            </div>
          </div>
        </section>

        {/* Team - Trainers */}
        <section className="py-12 sm:py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            {/* Founders Section */}
            <div className="text-center mb-12 md:mb-16">
              <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                O nás
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 sm:mt-4">
                Zakladatelia
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 max-w-3xl mx-auto">
              {founders.map((member, index) => (
                <FounderCard key={index} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                Tím
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 sm:mt-4">
                Náš tím
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {team.map((member, index) => (
                <TeamCard key={index} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>;
};
export default About;