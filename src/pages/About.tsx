import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, CheckCircle } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Tilt3DCard from "@/components/Tilt3DCard";
import { AuroraBackground } from "@/components/ui/aurora-background";
import peterSvajlenImg from "@/assets/team/peter-svajlen.jpg";
import jakubHrbanImg from "@/assets/team/jakub-hrban.jpg";
import marosGajanImg from "@/assets/team/maros-gajan.jpg";
import milanNestickyImg from "@/assets/team/milan-nesticky.jpg";
import vanessaFajkusovaImg from "@/assets/team/vanessa-fajkusova.jpg";
import donkaSvajlenovaImg from "@/assets/team/donka-svajlenova.jpg";
import vladimirLeskoImg from "@/assets/team/vladimir-lesko.jpg";
import aboutHeroTeamImg from "@/assets/team/about-hero-team.png";

const founders = [{
  name: "Peter Švajlen",
  role: "Tréner BSGA · Licencia A",
  phone: "+421 905 335 501",
  email: "peter@bsga.sk",
  image: peterSvajlenImg,
  achievements: ["6-násobný majster Slovenska", "5-násobný víťaz PGA SK Order of Merit", "Držiteľ Licencie \"A\" Five Star Golf Academy"]
}, {
  name: "Jakub Hrbáň",
  role: "Tréner BSGA · Licencia A",
  phone: "+421 911 994 888",
  email: "jakub@bsga.sk",
  image: jakubHrbanImg,
  achievements: ["Hlavný tréner CTM v Hrubej Borši", "Špecialista na fitting golfových palíc", "Držiteľ Licencie \"A\" Five Star Golf Academy"]
}];

const team = [{
  name: "Maroš Gajan",
  role: "Tréner BSGA · Licencia A",
  phone: "+421 903 243 999",
  email: "maros@bsga.sk",
  image: marosGajanImg
}, {
  name: "Vanessa Fajkusová",
  role: "Tréner BSGA · Licencia D",
  phone: "+421 911 183 429",
  email: "vanessa@bsga.sk",
  image: vanessaFajkusovaImg
}, {
  name: "Milan Neštický",
  role: "Tréner BSGA · Licencia D",
  phone: "+421 911 193 429",
  email: "milan@bsga.sk",
  image: milanNestickyImg
}, {
  name: "Vladimír Leško",
  role: "Tréner BSGA · Licencia D",
  phone: "+421 949 116 889",
  email: "vlado@bsga.sk",
  image: vladimirLeskoImg
}, {
  name: "Donka Švajlenová",
  role: "Administratíva",
  phone: "+421 917 225 276",
  email: "touroffice@bsga.sk",
  image: donkaSvajlenovaImg
}];

type TeamMember = {
  name: string;
  role: string;
  phone: string;
  email: string;
  image?: string;
  achievements?: string[];
};

const FounderCard = ({
  member
}: {
  member: TeamMember;
}) => <Tilt3DCard className="group text-center">
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 mb-4">
      {member.image ? <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-serif font-bold text-gold/60 group-hover:text-gold transition-colors duration-300">
            {member.name.charAt(0)}
          </span>
        </div>}
      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-all duration-300" />
    </div>
    <h3 className="text-xl font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
      {member.name}
    </h3>
    <p className="text-base text-muted-foreground uppercase tracking-wider mb-3">
      {member.role}
    </p>
    {member.achievements && <ul className="text-sm text-muted-foreground space-y-1.5 mb-3">
        {member.achievements.map((achievement, idx) => <li key={idx}>{achievement}</li>)}
      </ul>}
    <div className="flex justify-center gap-3">
      <a href={`tel:${member.phone}`} className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Telefón">
        <Phone size={20} />
      </a>
      <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Email">
        <Mail size={20} />
      </a>
    </div>
  </Tilt3DCard>;

const TeamCard = ({
  member
}: {
  member: typeof team[0];
}) => <Tilt3DCard className="group text-center">
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 mb-4">
      {member.image ? <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-serif font-bold text-gold/60 group-hover:text-gold transition-colors duration-300">
            {member.name.charAt(0)}
          </span>
        </div>}
      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-all duration-300" />
    </div>
    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
      {member.name}
    </h3>
    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
      {member.role}
    </p>
    <div className="flex justify-center gap-3">
      <a href={`tel:${member.phone}`} className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Telefón">
        <Phone size={18} />
      </a>
      <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Email">
        <Mail size={18} />
      </a>
    </div>
  </Tilt3DCard>;

const About = () => {
  return <>
      <Helmet>
        <title>O nás | BSGA - Best Swing Golf Academy</title>
        <meta name="description" content="Spoznajte tím BSGA. Peter Švajlen a Jakub Hrbáň - plne kvalifikovaní PGA profesionáli s viac ako 8 rokmi skúseností." />
      </Helmet>
      <Navbar />
      <AuroraBackground variant="silver">
        <main className="bg-transparent">
          {/* Hero */}
          <section className="relative overflow-hidden bg-transparent pt-4 sm:pt-6 md:pt-8">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border/40 shadow-lg">
                <img
                  src={aboutHeroTeamImg}
                  alt="Tím BSGA"
                  className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-background/22" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/78 via-background/42 to-background/5" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_34%,hsl(var(--gold-light)/0.14),transparent_32%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_bottom,transparent,hsl(var(--background)))] sm:h-32 lg:h-36" />

                <div className="relative z-10 flex min-h-[560px] items-end sm:min-h-[680px] lg:min-h-[760px]">
                  <div className="max-w-3xl px-6 pb-10 pt-24 sm:px-10 sm:pb-14 md:px-12 lg:px-14 lg:pb-16">
                    <p className="mb-4 font-sans text-2xl font-black uppercase leading-none tracking-[-0.05em] text-foreground sm:text-4xl md:text-5xl">
                      O nás
                    </p>
                    <h1 className="max-w-2xl text-balance font-sans text-3xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                      Najväčšia golfová akadémia na Slovensku
                    </h1>
                    <p className="mt-6 max-w-xl text-pretty font-sans text-base leading-relaxed text-foreground/80 sm:text-lg lg:text-xl">
                      Best Swing Golf Academy vznikla koncom roku 2016 s jasnou misiou - propagovať golf na Slovensku, vytvárať pozitívny obraz o tejto hre a sprístupniť ho všetkým vekovým kategóriám.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team - Trainers */}
          <section className="py-12 sm:py-16 md:py-24 bg-transparent">
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
                {founders.map((member, index) => <FounderCard key={index} member={member} />)}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-12 sm:py-16 md:py-24 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
              <div className="text-center mb-12 md:mb-16">
                <span className="text-gold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  O nás
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 sm:mt-4">
                  Náš tím
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {team.map((member, index) => <TeamCard key={index} member={member} />)}
              </div>
            </div>
          </section>

          {/* Career CTA */}
          <section id="kariera" className="py-12 sm:py-16 md:py-24 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto bg-background rounded-3xl p-8 sm:p-12 text-center shadow-lg">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
                  Kariéra v BSGA?
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8">
                  Pridaj sa do najväčšej golfovej akadémie na Slovensku – staň sa súčasťou niečoho väčšieho.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left max-w-lg mx-auto">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-gold h-6 w-6 flex-shrink-0" />
                    <span className="text-foreground">Rozvoj slovenského golfu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-gold h-6 w-6 flex-shrink-0" />
                    <span className="text-foreground">Flexibilný pracovný čas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-gold h-6 w-6 flex-shrink-0" />
                    <span className="text-foreground">Férové podmienky</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-gold h-6 w-6 flex-shrink-0" />
                    <span className="text-foreground">Tímová podpora</span>
                  </div>
                </div>
                
                <a href="mailto:info@bsga.sk?subject=Záujem o kariéru v BSGA" className="max-w-xs mx-auto block">
                  <InteractiveHoverButton text="Dohodnúť si stretnutie" />
                </a>
              </div>
            </div>
          </section>
        </main>
      </AuroraBackground>
      <Footer />
    </>;
};

export default About;