import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Trophy, Camera, ChevronDown } from "lucide-react";

interface TournamentLinks {
  locationUrl?: string;
  resultsUrl?: string;
  galleryUrl?: string;
}

interface TournamentCardProps {
  number: number;
  date: string;
  location: string;
  links?: TournamentLinks;
}

const TournamentCard = ({ number, date, location, links }: TournamentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actionButtons = [
    { icon: MapPin, label: "LOKALITA", url: links?.locationUrl },
    { icon: Trophy, label: "VÝSLEDKY", url: links?.resultsUrl },
    { icon: Camera, label: "GALÉRIA", url: links?.galleryUrl },
  ];

  return (
    <motion.div
      className="bg-primary border border-gold/30 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-gold/60 hover:shadow-lg hover:shadow-gold/10"
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Header - always visible */}
      <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6">
        {/* Tournament number */}
        <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center">
          <span className="text-gold font-serif font-bold text-lg sm:text-xl">{number}</span>
        </div>

        {/* Date and location */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
            <span className="text-gold font-serif text-base sm:text-lg">{date}</span>
            <span className="text-primary-foreground font-medium text-sm sm:text-base uppercase tracking-wide truncate">
              {location}
            </span>
          </div>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="text-gold" size={20} />
        </motion.div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-gold/20">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {actionButtons.map((button, index) => (
                  <a
                    key={index}
                    href={button.url || "#"}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!button.url || button.url === "#") {
                        e.preventDefault();
                      }
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-3 border border-gold/20 rounded-xl transition-all duration-300 ${
                      button.url && button.url !== "#"
                        ? "hover:bg-gold/10 hover:border-gold/40"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <button.icon className="text-gold" size={18} />
                    <span className="text-primary-foreground text-xs sm:text-sm font-medium uppercase tracking-wider">
                      {button.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TournamentCard;
