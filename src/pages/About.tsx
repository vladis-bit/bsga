import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Mail, Phone, CheckCircle, ChevronDown } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Tilt3DCard from "@/components/Tilt3DCard";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import peterSvajlenImg from "@/assets/team/peter-svajlen.webp";
import jakubHrbanImg from "@/assets/team/jakub-hrban.webp";
import marosGajanImg from "@/assets/team/maros-gajan.webp";
import milanNestickyImg from "@/assets/team/milan-nesticky.webp";
import vanessaFajkusovaImg from "@/assets/team/vanessa-fajkusova.webp";
import donkaSvajlenovaImg from "@/assets/team/donka-svajlenova.webp";
import vladimirLeskoImg from "@/assets/team/vladimir-lesko.webp";
import aboutHeroTeamMobileImgAsset from "@/assets/team/about-hero-team.webp.asset.json";
const aboutHeroTeamMobileImg = aboutHeroTeamMobileImgAsset.url;
import aboutHeroTeamMobileAvifAsset from "@/assets/team/about-hero-team.avif.asset.json";
const aboutHeroTeamMobileAvif = aboutHeroTeamMobileAvifAsset.url;
import aboutHeroTeamImg from "@/assets/team/about-hero-team-portrait.webp";

const founders = [{
  name: "Peter Švajlen",
  role: "Tréner BSGA · Profesionálny tréner golfu",
  phone: "+421 905 335 501",
  email: "peter@bsga.sk",
  image: peterSvajlenImg,
  achievements: ["6-násobný majster Slovenska", "5-násobný víťaz PGA SK Order of Merit", "Držiteľ licencie \"Profesionálny tréner golfu\" Five Star Golf Academy"],
  bio: [
    "Člen PGA Slovakia",
    "5-násobný víťaz PGA SK Order of Merit",
    "6-násobný majster Slovenska",
    "Člen Cameron Athletics Hall of Fame",
    "Golf Professional of the Year 2015",
    "Hráčske skúsenosti z European a Challenge Tour",
    "Cestovná agentúra Doni-Travel",
    "JuCad ambassador"
  ]
}, {
  name: "Jakub Hrbáň",
  role: "Tréner BSGA · Profesionálny tréner golfu",
  phone: "+421 911 994 888",
  email: "jakub@bsga.sk",
  image: jakubHrbanImg,
  achievements: ["Hlavný tréner CTM v Hrubej Borši", "Špecialista na fitting golfových palíc", "Držiteľ licencie \"Profesionálny tréner golfu\" Five Star Golf Academy"],
  bio: [
    "Člen PGA Slovakia",
    "Juniorský majster Slovenska",
    "Hlavný tréner CTM v Hrubej Borši",
    "Špecialista na fitting golfových palíc"
  ]
}];

const team: TeamMember[] = [{
  name: "Maroš Gajan",
  role: "Tréner BSGA · Profesionálny tréner golfu",
  phone: "+421 903 243 999",
  email: "maros@bsga.sk",
  image: marosGajanImg,
  bio: [
    "Člen PGA Slovakia",
    "Majster Slovenska U21",
    "PGA Professional od roku 2010",
    "Efektívny tréning pre lepšiu hru a zdravý pohyb (TPI Certified)"
  ]
}, {
  name: "Vanessa Fajkusová",
  role: "Tréner BSGA · Tréner golfu",
  phone: "+421 911 183 429",
  email: "vanessa@bsga.sk",
  image: vanessaFajkusovaImg,
  bio: [
    "Bývalá hráčka GKHB",
    "Práca a rozvoj detského potenciálu",
    "Štúdium psychológie (Mgr.)",
    "Skúsenosti z psychosociálneho poradenského centra",
    "Kariérne poradenstvo"
  ]
}, {
  name: "Milan Neštický",
  role: "Tréner BSGA · Tréner golfu",
  email: "milan@bsga.sk",
  phone: "+421 905 413 487",
  image: milanNestickyImg,
  bio: [
    "Hral som golf na pitch kontinentoch",
    "Pohybová terapia",
    "Fyziológia zdravého pohybu",
    "Terapeutické masáže"
  ]
}, {
  name: "Vladimír Leško",
  role: "Tréner BSGA · Tréner golfu",
  phone: "+421 949 116 889",
  email: "vlado@bsga.sk",
  image: vladimirLeskoImg,
  bio: [
    "Aktívny hráč GKHB",
    "Bývalý reprezentant SR",
    "Trackman certifikácia",
    "Advisor na tímových turnajoch",
    "Štúdium na PGA CZ"
  ]
}, {
  name: "Donka Švajlenová",
  role: "Event & Operations Manager",
  phone: "+421 917 225 276",
  email: "touroffice@bsga.sk",
  image: donkaSvajlenovaImg,
  bio: [
    "Organizácia golfových turnajov a podujatí",
    "Administratívna a projektová koordinácia",
    "Komunikácia s klientmi",
    "Cestovná agentúra Doni-Travel"
  ]
}];

type TeamMember = {
  name: string;
  role: string;
  phone: string;
  email: string;
  image?: string;
  achievements?: string[];
  bio?: string[];
};

const FounderCard = ({
  member
}: {
  member: TeamMember;
}) => <Tilt3DCard className="group text-center">
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 mb-4">
      {member.image ? <img loading="lazy" decoding="async" src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center">
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
    <div className="flex justify-center gap-3 mb-4">
      <a href={`tel:${member.phone}`} className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Telefón">
        <Phone size={20} />
      </a>
      <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Email">
        <Mail size={20} />
      </a>
    </div>

    {member.bio && member.bio.length > 0 && (
      <Collapsible className="w-full">
        <CollapsibleTrigger asChild>
          <button aria-label={`Zobraziť profesionálnu kariéru — ${member.name}`} className="group/trigger inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gradient-to-b from-gold/15 to-gold/5 px-5 py-2.5 text-sm font-bold text-gold shadow-sm transition-all hover:from-gold/25 hover:to-gold/10 hover:border-gold/70 hover:shadow-md active:scale-[0.98] data-[state=open]:from-gold/25 data-[state=open]:to-gold/10 data-[state=open]:border-gold/70">
            O trénerovi
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]/trigger:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden text-left transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="mt-4 rounded-xl border-l-4 border-l-gold border border-border/60 bg-card/95 p-5 shadow-sm">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold">Profesionálna kariéra</h4>
            <ul className="space-y-2.5 text-sm text-foreground/90">
              {member.bio.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_6px_hsl(var(--gold)/0.6)]" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )}
  </Tilt3DCard>;

const TeamCard = ({
  member
}: {
  member: TeamMember;
}) => <Tilt3DCard className="group text-center">
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 mb-4">
      {member.image ? <img loading="lazy" decoding="async" src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center">
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
    <div className="flex justify-center gap-3 mb-4">
      <a href={`tel:${member.phone}`} className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Telefón">
        <Phone size={18} />
      </a>
      <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Email">
        <Mail size={18} />
      </a>
    </div>

    {member.bio && member.bio.length > 0 && (
      <Collapsible className="w-full">
        <CollapsibleTrigger asChild>
          <button aria-label={`Zobraziť viac informácií — ${member.name}`} className="group/trigger inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gradient-to-b from-gold/15 to-gold/5 px-5 py-2.5 text-sm font-bold text-gold shadow-sm transition-all hover:from-gold/25 hover:to-gold/10 hover:border-gold/70 hover:shadow-md active:scale-[0.98] data-[state=open]:from-gold/25 data-[state=open]:to-gold/10 data-[state=open]:border-gold/70">
            {member.role.includes("Tréner") ? "O trénerovi" : "Viac informácií"}
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]/trigger:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden text-left transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="mt-4 rounded-xl border-l-4 border-l-gold border border-border/60 bg-card/95 p-5 shadow-sm">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold">{member.role.includes("Tréner") ? "O trénerovi" : "Oblasť pôsobenia"}</h4>
            <ul className="space-y-2.5 text-sm text-foreground/90">
              {member.bio.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_6px_hsl(var(--gold)/0.6)]" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )}
  </Tilt3DCard>;

const About = () => {
  return <>
      <SEO
        title="O nás - tréneri"
        description="Spoznajte tím BSGA. Peter Švajlen a Jakub Hrbáň - plne kvalifikovaní PGA profesionáli s viac ako 8 rokmi skúseností."
        path="/o-nas"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "O nás — tréneri", url: "https://bsga.sk/o-nas" },
        ]}
      />
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
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/12 via-background/14 to-background/72 sm:to-background/64" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,hsl(var(--background)/0.16),transparent)] sm:h-24 md:h-28" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(to_bottom,transparent,hsl(var(--background)/0.98))] sm:h-48 md:h-56" />
              <div className="pointer-events-none absolute inset-x-0 bottom-[-8%] h-40 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--background)/0.96),transparent_72%)] blur-3xl sm:h-52 md:h-60" />

              <div className="relative z-10 flex w-full items-start justify-center sm:min-h-[520px] sm:items-end sm:pt-6 md:min-h-[620px] lg:min-h-[720px]">
                <picture className="block w-full">
                  <source media="(min-width: 640px)" srcSet={aboutHeroTeamImg} />
                  <source type="image/avif" srcSet={aboutHeroTeamMobileAvif} />
                  <img
                    src={aboutHeroTeamMobileImg}
                    alt="Tím BSGA"
                    className="block h-auto w-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                    {...({ fetchpriority: "high" } as any)}
                  />
                </picture>
              </div>
            </div>
          </section>

          <section className="bg-transparent pb-12 pt-10 sm:pb-16 sm:pt-14 md:pb-20 md:pt-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                <span className="mb-5 font-serif text-5xl leading-none text-muted-foreground/40 sm:mb-6 sm:text-6xl">
                  “
                </span>
                <p className="max-w-4xl text-balance font-sans text-[1.4rem] font-black leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl sm:leading-[1] sm:tracking-[-0.04em] md:text-5xl md:tracking-[-0.05em] lg:text-[4rem]">
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