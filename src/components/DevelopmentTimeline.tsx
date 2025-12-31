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
    title: "BSGA Development Program",
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = stage.icon;

  return (
    <div ref={ref} className="relative flex items-start mb-8 md:mb-12">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full ml-14"
      >
        <div className="bg-card border border-border hover:border-gold/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 rounded-full flex items-center justify-center">
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
          <ul className="space-y-2">
            {stage.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

const DevelopmentTimeline = () => {
  return (
    <div className="relative">
      {/* Single continuous timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
      
      {stages.map((stage, index) => (
        <TimelineCard key={index} stage={stage} index={index} />
      ))}
    </div>
  );
};

export default DevelopmentTimeline;
