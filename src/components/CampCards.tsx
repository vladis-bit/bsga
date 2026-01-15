import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Mail, MapPin, Sparkles } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/moving-border";

interface Camp {
  title: string;
  date: string;
  location?: string;
  isHighlight?: boolean;
  description?: string;
}

const camps: Camp[] = [
  {
    title: "Denný tábor - Turnus 1",
    date: "6. – 10. 7. 2026",
    location: "Hrubá Borša",
  },
  {
    title: "Denný tábor - Turnus 2",
    date: "3. – 7. 8. 2026",
    location: "Hrubá Borša",
  },
  {
    title: "Denný tábor - Turnus 3",
    date: "TBD",
    location: "Hrubá Borša",
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
      className={`relative rounded-3xl border p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 ${
        camp.isHighlight
          ? "bg-gradient-to-br from-gold/20 to-gold/5 border-gold/50"
          : "bg-card border-border hover:border-gold/30"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Left - Number/Icon */}
        <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-serif font-bold text-lg ${
          camp.isHighlight 
            ? "bg-gold text-primary" 
            : "bg-gold/10 text-gold"
        }`}>
          {camp.isHighlight ? <Sparkles className="w-5 h-5" /> : index + 1}
        </div>

        {/* Center - Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground">
              {camp.title}
            </h3>
            {camp.isHighlight && (
              <span className="bg-gold text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                Novinky
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              <span>{camp.date}</span>
            </div>
            {camp.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{camp.location}</span>
              </div>
            )}
          </div>
          
          {camp.description && (
            <p className="text-muted-foreground text-sm mt-2">{camp.description}</p>
          )}
        </div>

        {/* Right - Button */}
        <div className="w-full sm:w-auto sm:flex-shrink-0 sm:ml-4">
          <MovingBorderButton
            as="a"
            href="mailto:kids@bsga.sk?subject=Prihlásenie na detský tábor 2026"
            borderRadius="9999px"
            containerClassName="w-full sm:w-auto text-sm"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium ${
              camp.isHighlight
                ? "bg-gold text-primary"
                : "bg-primary text-gold"
            }`}
          >
            <Mail className="w-4 h-4" />
            Prihlásiť sa
          </MovingBorderButton>
        </div>
      </div>
    </motion.div>
  );
};

const CampCards = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
      {camps.map((camp, index) => (
        <CampCard key={index} camp={camp} index={index} />
      ))}
      <CampCard camp={highlightCamp} index={camps.length} />
    </div>
  );
};

export default CampCards;
