import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Mail, MapPin, Sparkles, FileText } from "lucide-react";

interface Camp {
  title: string;
  date: string;
  location?: string;
  isHighlight?: boolean;
  soldOut?: boolean;
  description?: string;
  posterUrl?: string;
}

const camps: Camp[] = [
  {
    title: "Denný tábor - Turnus 1",
    date: "6. – 10. 7. 2026",
    location: "Hrubá Borša",
    posterUrl: "/documents/kemp_6-10_jul.pdf",
    soldOut: true,
  },
  {
    title: "Denný tábor - Turnus 2",
    date: "3. – 7. 8. 2026",
    location: "Hrubá Borša",
    posterUrl: "/documents/kemp_3-7_august.pdf",
    soldOut: true,
  },
  {
    title: "Denný tábor - Turnus 3",
    date: "24. – 28. 8. 2026",
    location: "Hrubá Borša",
    posterUrl: "/documents/kemp_24-28_august.pdf",
    soldOut: true,
  },
];


const CampCard = ({ camp, index }: { camp: Camp; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
        camp.soldOut
          ? "bg-card/60 border-border"
          : camp.isHighlight
            ? "bg-gold/10 border-gold/40 hover:shadow-lg hover:shadow-gold/10"
            : "bg-card border-border hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10"
      }`}
    >
      {/* Sold-out diagonal ribbon */}
      {camp.soldOut && (
        <div className="pointer-events-none absolute -right-12 top-5 rotate-45 bg-foreground text-background text-[10px] sm:text-xs font-bold tracking-widest px-12 py-1 shadow-md">
          OBSADENÉ
        </div>
      )}

      <div className={`grid gap-4 sm:gap-5 md:grid-cols-[auto_1fr_auto] md:items-center ${camp.soldOut ? "opacity-70" : ""}`}>
        {/* Left - Number */}
        <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-serif font-bold text-lg ${
          camp.soldOut
            ? "bg-muted text-muted-foreground"
            : camp.isHighlight
              ? "bg-gold text-primary"
              : "bg-gold/10 text-gold"
        }`}>
          {camp.isHighlight ? <Sparkles className="w-5 h-5" /> : index + 1}
        </div>

        {/* Center - Content */}
        <div className="min-w-0">
          <h3 className={`text-lg sm:text-xl font-serif font-bold leading-tight ${camp.soldOut ? "text-muted-foreground line-through decoration-muted-foreground/40" : "text-foreground"}`}>
            {camp.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
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
          {camp.description && !camp.soldOut && (
            <p className="text-muted-foreground text-sm mt-2">{camp.description}</p>
          )}
        </div>

        {/* Right - Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 md:min-w-[180px]">
          {camp.posterUrl && (
            <a
              href={camp.posterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-muted border border-border text-foreground hover:bg-muted/70 hover:border-gold/40"
            >
              <FileText className="w-4 h-4" />
              Plagát
            </a>
          )}
          {camp.soldOut ? (
            <span
              aria-disabled="true"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-muted/60 text-muted-foreground cursor-not-allowed"
            >
              Vypredané
            </span>
          ) : (
            <a
              href="mailto:kids@bsga.sk?subject=Prihlásenie na detský tábor 2026 – 3. turnus"
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                camp.isHighlight
                  ? "bg-gold text-primary hover:bg-gold-light"
                  : "bg-gold/10 text-gold hover:bg-gold/20"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Prihlásiť sa</span>
            </a>
          )}
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
      
    </div>
  );
};

export default CampCards;
