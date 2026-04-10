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
import aboutHeroTeamImg from "@/assets/team/about-hero-team-portrait.png";

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
  role: "Event & Operations Manager",
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
          <section className="relative overflow-hidden bg-transparent">
            <div className="relative isolate w-full overflow-hidden">
              <h1 className="sr-only">Najväčšia golfová akadémia na Slovensku</h1>
              <img
                src={aboutHeroTeamImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-35 blur-2xl"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/12 via-background/14 to-background/72 sm:to-background/64" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,hsl(var(--background)/0.16),transparent)] sm:h-24 md:h-28" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(to_bottom,transparent,hsl(var(--background)/0.98))] sm:h-48 md:h-56" />
              <div className="pointer-events-none absolute inset-x-0 bottom-[-8%] h-40 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--background)/0.96),transparent_72%)] blur-3xl sm:h-52 md:h-60" />

              <div className="relative z-10 flex min-h-[320px] w-full items-end justify-center pt-4 sm:min-h-[500px] sm:pt-6 md:min-h-[620px] lg:min-h-[720px]">
                <img
                  src={aboutHeroTeamImg}
                  alt="Tím BSGA"
                  className="block h-full w-full max-w-5xl object-contain object-bottom"
                  loading="eager"
                />
              </div>
            </div>
          </section>

          <section className="bg-transparent pb-12 pt-10 sm:pb-16 sm:pt-14 md:pb-20 md:pt-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                <span className="mb-5 font-serif text-5xl leading-none text-muted-foreground/40 sm:mb-6 sm:text-6xl">
                  “
                </span>
                <p className="max-w-4xl text-balance font-sans text-2xl font-black leading-[0.98] tracking-[-0.05em] text-foreground sm:text-4xl md:text-5xl lg:text-[4rem]">
                  Best Swing Golf Academy vznikla koncom roku 2016 s jasnou <span className="font-serif text-muted-foreground italic">misiou</span> – propagovať golf na Slovensku, vytvárať pozitívny obraz o tejto hre a sprístupniť ho všetkým vekovým kategóriám.
                </p>
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