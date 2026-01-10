import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Baby, Bike, Target, Trophy } from "lucide-react";

interface TimelineStage {
  icon: React.ElementType;
  title: string;
  ageRange: string;
  description: string;
  features: string[];
}

const stages: TimelineStage[] = [
  {
    icon: Baby,
    title: "BABY Kids",
    ageRange: "0–3 roky",
    description: "Prvé kroky k pohybu a koordinácii",
    features: [
      "Základné motorické zručnosti",
      "Rozvoj koordinácie ruka-oko",
      "Hravé aktivity s rodičmi",
      "Budovanie lásky k pohybu",
    ],
  },
  {
    icon: Bike,
    title: "Sport Kids",
    ageRange: "4–7 rokov",
    description: "Všeobecný pohybový rozvoj",
    features: [
      "Multišportové aktivity",
      "Základy golfovej techniky",
      "Rozvoj flexibility a sily",
      "Tímové hry a súťaže",
    ],
  },
  {
    icon: Target,
    title: "Master Kids",
    ageRange: "8–12 rokov",
    description: "Zdokonaľovanie golfových zručností",
    features: [
      "Pokročilá technika švihu",
      "Mentálna príprava",
      "Súťažná príprava",
      "Individuálny tréningový plán",
    ],
  },
  {
    icon: Trophy,
    title: "Tour kids",
    ageRange: "13+ rokov",
    description: "Profesionálna cesta mladého golfistu",
    features: [
      "Komplexný rozvoj športovca",
      "Príprava na turnaje",
      "Fyzická kondícia",
      "Kariérne poradenstvo",
    ],
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
