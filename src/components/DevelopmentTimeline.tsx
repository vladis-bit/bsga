import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Baby, Bike, Target, Trophy, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import vanessaImg from "@/assets/team/vanessa-fajkusova.jpg";
import vladimirImg from "@/assets/team/vladimir-lesko.jpg";
import marosImg from "@/assets/team/maros-gajan.jpg";
import jakubImg from "@/assets/team/jakub-hrban.jpg";

const coachImages: Record<string, string> = {
  "Vanessa Fajkusová": vanessaImg,
  "Vladimír Leško": vladimirImg,
  "Maroš Gajan": marosImg,
  "Jakub Hrbáň": jakubImg,
};

interface TimelineStage {
  icon: React.ElementType;
  title: string;
  ageRange: string;
  description: string;
  features: string[];
  coach: string;
  coachPhone: string;
  coachEmail: string;
}

const stages: TimelineStage[] = [
  {
    icon: Baby,
    title: "Baby Kids",
    ageRange: "5–8 rokov",
    description: "Prvé kroky k pohybu a koordinácii",
    features: [
      "Základné motorické zručnosti",
      "Rozvoj koordinácie ruka-oko",
      "Hravé aktivity s rodičmi",
      "Budovanie lásky k pohybu",
    ],
    coach: "Vanessa Fajkusová",
    coachPhone: "+421 911 183 429",
    coachEmail: "vanessa@bsga.sk",
  },
  {
    icon: Bike,
    title: "Sport Kids",
    ageRange: "9–12 rokov",
    description: "Všeobecný pohybový rozvoj",
    features: [
      "Multišportové aktivity",
      "Základy golfovej techniky",
      "Rozvoj flexibility a sily",
      "Tímové hry a súťaže",
    ],
    coach: "Vladimír Leško",
    coachPhone: "+421 949 116 889",
    coachEmail: "vlado@bsga.sk",
  },
  {
    icon: Target,
    title: "Master Kids",
    ageRange: "13–17 rokov",
    description: "Zdokonaľovanie golfových zručností",
    features: [
      "Pokročilá technika švihu",
      "Mentálna príprava",
      "Súťažná príprava",
      "Individuálny tréningový plán",
    ],
    coach: "Maroš Gajan",
    coachPhone: "+421 903 243 999",
    coachEmail: "maros@bsga.sk",
  },
  {
    icon: Trophy,
    title: "Tour Kids",
    ageRange: "10+ rokov",
    description: "Profesionálna cesta mladého golfistu",
    features: [
      "Komplexný rozvoj športovca",
      "Príprava na turnaje",
      "Fyzická kondícia",
      "Kariérne poradenstvo",
    ],
    coach: "Jakub Hrbáň",
    coachPhone: "+421 911 994 888",
    coachEmail: "jakub@bsga.sk",
  },
];

const TimelineCard = ({
  stage,
  index,
}: {
  stage: TimelineStage;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = stage.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card border border-border hover:border-gold/30 rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground">
            {stage.title}
          </h3>
          <span className="text-gold text-sm font-medium">{stage.ageRange}</span>
        </div>
      </div>
      <p className="text-muted-foreground text-sm sm:text-base mb-4">
        {stage.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {stage.features.map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
            {feature}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mb-4 pt-4 border-t border-border">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img src={coachImages[stage.coach]} alt={stage.coach} className="w-full h-full object-cover" />
        </div>
        <span className="text-foreground font-medium">{stage.coach}</span>
      </div>
      <div className="flex gap-2">
        <Button
          asChild
          className="flex-1 rounded-full bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 font-medium"
        >
          <a href={`tel:${stage.coachPhone.replace(/\s/g, '')}`}>
            <Phone className="w-4 h-4 mr-1" />
            Zavolať
          </a>
        </Button>
        <Button
          asChild
          className="flex-1 rounded-full bg-gold hover:bg-gold/90 text-primary-foreground font-medium"
        >
          <a href={`mailto:${stage.coachEmail}?subject=Prihlásenie - ${stage.title}`}>
            <Mail className="w-4 h-4 mr-1" />
            Prihlásiť sa
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

const DevelopmentTimeline = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
      {stages.map((stage, index) => (
        <TimelineCard key={index} stage={stage} index={index} />
      ))}
    </div>
  );
};

export default DevelopmentTimeline;
