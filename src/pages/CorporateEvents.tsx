import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Calendar, MessageSquare, PartyPopper, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import CorporateContactForm from "@/components/CorporateContactForm";
import CursorGlowCard from "@/components/CursorGlowCard";
import { AuroraBackground } from "@/components/ui/aurora-background";

const stats = [
  { value: "10+", label: "rokov skúseností" },
  { value: "6", label: "PGA trénerov" },
  { value: "100%", label: "spokojných klientov" },
];

const steps = [
  {
    number: "1",
    icon: MessageSquare,
    title: "Konzultácia a návrh programu",
    description:
      "Ozvete sa nám emailom alebo cez formulár. Prejdeme spolu váš počet účastníkov, termín, rozpočet a predstavu o programe. Do 48 hodín dostanete konkrétny návrh.",
  },
  {
    number: "2",
    icon: Calendar,
    title: "Rezervácia ihriska a logistika",
    description:
      "Zarezervujeme ihrisko, dojednáme catering, pripravíme trénerský tím a kompletné zázemie. Golfové palice a výbavu vieme zapožičať pre tých, čo vlastné nemajú.",
  },
  {
    number: "3",
    icon: PartyPopper,
    title: "Deň akcie",
    description:
      "Privítanie účastníkov, mini kurzy pre začiatočníkov, priebeh turnaja alebo voľnej hry, sprievodný program a slávnostné vyhlásenie výsledkov s odovzdaním cien.",
  },
  {
    number: "4",
    icon: Camera,
    title: "Záverečné fotky a spomienky",
    description:
      "Postaráme sa o fotografa na mieste. Výber fotografií z akcie dostanete po podujatí.",
  },
];

const RevealCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.1 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

const CorporateEvents = () => {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Firemné akcie a teambuildingy",
    provider: { "@id": "https://bsga.sk/#organization" },
    areaServed: "SK",
    serviceType: "Golf",
    description:
      "Golfové firemné akcie a teambuildingy na kľúč – od rezervácie ihriska, cez inštruktorský tím, až po catering a ceny pre víťazov.",
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: "https://bsga.sk/" },
      { "@type": "ListItem", position: 2, name: "Služby", item: "https://bsga.sk/sluzby" },
      { "@type": "ListItem", position: 3, name: "Firemné akcie", item: "https://bsga.sk/firemne-akcie" },
    ],
  };

  return (
    <>
      <SEO
        title="Firemné akcie a teambuildingy | BSGA - Best Swing Golf Academy"
        description="Zorganizujte golfový teambuilding alebo firemnú akciu na kľúč. PGA tréneri, ihrisko, catering, vybavenie aj ceny – BSGA sa postará o všetko."
        path="/firemne-akcie"
        jsonLd={[breadcrumb, eventSchema]}
      />
      <Navbar />
      <AuroraBackground className="min-h-screen bg-primary text-primary-foreground" showRadialGradient={false}>
        <main>
          {/* Hero – no image */}
          <section className="relative w-full bg-transparent pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mx-auto max-w-5xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold text-gold backdrop-blur-sm sm:text-sm">
                  <Users className="h-4 w-4" />
                  Firemné akcie a teambuildingy
                </span>
                <h1 className="mt-5 font-serif text-3xl font-bold leading-[1.1] text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Golf, ktorý stmeľuje tímy a vytvára zážitky
                </h1>
                <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-primary-foreground/85 sm:text-lg md:text-xl">
                  Zorganizujeme pre vašu firmu nezabudnuteľný deň na ihrisku – od prvého švihu až po slávnostné vyhlásenie výsledkov. Všetko na kľúč, pre začiatočníkov aj skúsených hráčov.
                </p>

                {/* Stats */}
                <div className="mx-auto mt-8 grid max-w-4xl gap-3 grid-cols-3 sm:gap-4 md:mt-10">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-sm sm:px-6 sm:py-6"
                    >
                      <div className="font-serif text-2xl font-bold text-gold sm:text-4xl md:text-5xl">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-[11px] leading-tight text-primary-foreground/80 sm:text-base">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-transparent py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mx-auto max-w-4xl">
                <span className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase">
                  Prečo firemný golf
                </span>
                <h2 className="mt-3 font-serif text-2xl font-bold text-primary-foreground sm:text-3xl md:text-4xl">
                  Odtrhnite sa od rutiny a posilnite tím
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                  <p>
                    Firemný golf nie je len o hraní – je to príležitosť odtrhnúť sa od bežnej rutiny,{" "}
                    <strong className="text-primary-foreground">posilniť vzťahy v tíme</strong> a zažiť niečo, o čom sa bude rozprávať ešte dlho. BSGA sa o všetko postará – od rezervácie ihriska, cez inštruktorský tím, až po catering a ceny pre víťazov.
                  </p>
                  <p>
                    Naše akcie sú navrhnuté tak, aby si ich užili všetci – aj tí, čo golf nikdy neskúsili. Naši tréneri s licenciou{" "}
                    <strong className="text-primary-foreground">PGA Slovakia</strong> sa postarajú o to, aby sa každý cítil komfortne a odchádzal s úsmevom.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="bg-transparent pb-16 sm:pb-20 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-14">
                <span className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase">
                  Ako to funguje
                </span>
                <h2 className="mt-3 font-serif text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
                  Celú organizáciu preberáme na seba – vy sa len ukážete
                </h2>
                <div className="mx-auto mt-4 h-1 w-16 bg-gold sm:mt-6 sm:w-24" />
              </div>

              <div className="relative grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {/* Connecting line on desktop */}
                <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <RevealCard key={index} index={index}>
                      <CursorGlowCard className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-background/75 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/10 sm:p-7">
                        {/* Big watermark step number */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -right-2 -top-4 select-none font-serif text-7xl font-bold leading-none text-gold/10 sm:text-8xl"
                        >
                          {step.number}
                        </span>
                        <div className="relative flex items-center gap-3 mb-4 sm:mb-5">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-primary font-bold shadow-md shadow-gold/30 sm:h-12 sm:w-12">
                            {step.number}
                          </div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/20 sm:h-11 sm:w-11">
                            <Icon className="text-gold" size={20} />
                          </div>
                        </div>
                        <h3 className="relative mb-2 font-serif text-base font-bold text-foreground sm:text-lg md:text-xl">
                          {step.title}
                        </h3>
                        <p className="relative text-[13px] leading-relaxed text-foreground/75 sm:text-sm md:text-base">
                          {step.description}
                        </p>
                      </CursorGlowCard>
                    </RevealCard>
                  );
                })}
              </div>
            </div>
          </section>

          <CorporateContactForm />
        </main>
      </AuroraBackground>
      <Footer />
    </>
  );
};

export default CorporateEvents;
