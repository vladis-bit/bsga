import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Mail, MapPin, Sparkles } from "lucide-react";

interface Camp {
  title: string;
  date: string;
  location?: string;
  isHighlight?: boolean;
  description?: string;
}

const camps: Camp[] = [
  {
    title: "Turnus 1",
    date: "TBD",
    location: "Bude upresnené",
  },
  {
    title: "Turnus 2",
    date: "TBD",
    location: "Bude upresnené",
  },
  {
    title: "Turnus 3",
    date: "TBD",
    location: "Bude upresnené",
  },
];

const highlightCamp: Camp = {
  title: "Pobytový tábor na Táloch",
  date: "TBD",
  location: "Tale, Nízke Tatry",
  isHighlight: true,
  description: "Viac informácií čoskoro",
};

const CampCard = ({ camp, index }: { camp: Camp; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative rounded-2xl sm:rounded-3xl border p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg ${
        camp.isHighlight
          ? "bg-gradient-to-br from-gold/20 to-gold/5 border-gold/50"
          : "bg-card border-border hover:border-gold/30"
      }`}
    >
      {camp.isHighlight && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gold text-primary text-xs font-medium px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3" />
          Novinky
        </div>
      )}

      <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3">
        {camp.title}
      </h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-gold" />
          <span>Dátum: {camp.date}</span>
        </div>
        {camp.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-gold" />
            <span>{camp.location}</span>
          </div>
        )}
      </div>

      {camp.description && (
        <p className="text-muted-foreground text-sm mb-4">{camp.description}</p>
      )}

      <a
        href="mailto:kids@bsga.sk?subject=Prihlásenie na detský tábor 2026"
        className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
          camp.isHighlight
            ? "bg-gold text-primary hover:bg-gold-light"
            : "bg-gold/10 text-gold hover:bg-gold/20"
        }`}
      >
        <Mail className="w-4 h-4" />
        Prihlásiť sa
      </a>
    </motion.div>
  );
};

const CampCards = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {camps.map((camp, index) => (
        <CampCard key={index} camp={camp} index={index} />
      ))}
      <CampCard camp={highlightCamp} index={camps.length} />
    </div>
  );
};

export default CampCards;
