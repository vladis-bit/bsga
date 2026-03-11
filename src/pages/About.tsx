import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, CheckCircle } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Tilt3DCard from "@/components/Tilt3DCard";
const founders = [{
  name: "Peter Švajlen",
  role: "Hlavný profesionál BSGA",
  phone: "+421 905 335 501",
  email: "peter@bsga.sk",
  achievements: ["6-násobný majster Slovenska", "5-násobný víťaz PGA SK Order of Merit", "Držiteľ Licencie \"A\" Five Star Golf Academy"]
}, {
  name: "Jakub Hrbáň",
  role: "Hlavný Profesionál BSGA",
  phone: "+421 911 994 888",
  email: "jakub@bsga.sk",
  achievements: ["Hlavný tréner CTM v Hrubej Borši", "Špecialista na fitting golfových palíc", "Držiteľ Licencie \"A\" Five Star Golf Academy"]
}];
const team = [{
  name: "Maroš Gajan",
  role: "Tréner BSGA · Licencia A",
  phone: "+421 903 243 999",
  email: "maros@bsga.sk"
}, {
  name: "Vanessa Fajkusová",
  role: "Tréner BSGA · Licencia D",
  phone: "+421 911 183 429",
  email: "vanessa@bsga.sk",
  image: "@/assets/team/vanessa-fajkusova.jpg"
}, {
  name: "Milan Neštický",
  role: "Tréner BSGA · Licencia D",
  phone: "+421 911 193 429",
  email: "milan@bsga.sk"
}, {
  name: "Vladimír Leško",
  role: "Tréner BSGA · Licencia D",
  phone: "+421 949 116 889",
  email: "vlado@bsga.sk"
}, {
  name: "Donka Švajlenová",
  role: "Administratíva",
  phone: "+421 917 225 276",
  email: "touroffice@bsga.sk",
  image: "@/assets/team/donka-svajlenova.jpg"
}];
type TeamMember = {
  name: string;
  role: string;
  phone: string;
  email: string;
  achievements?: string[];
  image?: string;
};
const FounderCard = ({
  member
}: {
  member: TeamMember;
}) => <Tilt3DCard className="group text-center">
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
}) => {
  const imageUrl = member.image ? new URL(member.image, import.meta.url).href : null;
  return <Tilt3DCard className="group text-center">
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 mb-4">
      {imageUrl ? (
        <img src={imageUrl} alt={member.name} className="w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-serif font-bold text-gold/60 group-hover:text-gold transition-colors duration-300">
            {member.name.charAt(0)}
          </span>
        </div>
      )}
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
};
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
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">Best Swing Golf Academy vznikla koncom roku 2016 s jasnou misiou - propagovať golf na Slovensku, vytvárať pozitívny obraz o tejto hre a sprístupniť ho všetkým vekovým kategóriám</p>
              
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
              {founders.map((member, index) => <FounderCard key={index} member={member} />)}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
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
        <section id="kariera" className="py-12 sm:py-16 md:py-24 bg-secondary">
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
      <Footer />
    </>;
};
export default About;