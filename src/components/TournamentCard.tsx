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
  image?: string;
  links?: TournamentLinks;
  tourLabel?: string;
  hideResults?: boolean;
  hideLocation?: boolean;
}
const TournamentCard = ({
  number,
  date,
  location,
  image,
  links,
  tourLabel = "BSGA Tour",
  hideResults = false,
  hideLocation = false
}: TournamentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const actionButtons = [
    ...(!hideLocation ? [{ icon: MapPin, label: "LOKALITA", url: links?.locationUrl }] : []),
    ...(!hideResults ? [{ icon: Trophy, label: "VÝSLEDKY", url: links?.resultsUrl }] : []),
    { icon: Camera, label: "GALÉRIA", url: links?.galleryUrl },
  ];
  return <motion.div className="bg-primary border border-gold/30 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-gold/60 hover:shadow-lg hover:shadow-gold/10" onClick={() => setIsExpanded(!isExpanded)} layout>
      {/* Course Image */}
      {image && <div className="p-3 sm:p-4 pb-0">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-gold/20">
            <img src={image} alt={location} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>}

      {/* Header - always visible */}
      <div className="flex items-center gap-3 sm:gap-6 p-3 sm:p-6">
        {/* Tournament number */}
        <div className="flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center">
          <span className="text-gold font-serif font-bold text-base sm:text-xl">{number}</span>
        </div>

        {/* Date, tour label, location */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1.5 sm:gap-4">
            <span className="text-gold text-sm sm:text-lg font-sans flex-shrink-0">{date}</span>
            <span className="text-primary-foreground font-serif font-bold text-xs sm:text-base tracking-wide flex-shrink-0 whitespace-nowrap">
              {tourLabel} {number}
            </span>
            <span className="text-primary-foreground font-medium text-xs sm:text-base uppercase tracking-wide truncate text-right">
              {location}
            </span>
          </div>
        </div>

        {/* Expand indicator */}
        <motion.div animate={{
        rotate: isExpanded ? 180 : 0
      }} transition={{
        duration: 0.3
      }} className="flex-shrink-0">
          <ChevronDown className="text-gold" size={20} />
        </motion.div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: "auto",
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.3,
        ease: "easeOut"
      }}>
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-gold/20">
              <div className={`grid ${actionButtons.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' : actionButtons.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'} gap-3 sm:gap-4`}>
{actionButtons.map((button, index) => <a key={index} href={button.url || "#"} target={button.url && button.url !== "#" ? "_blank" : undefined} rel={button.url && button.url !== "#" ? "noopener noreferrer" : undefined} onClick={e => {
              e.stopPropagation();
              if (!button.url || button.url === "#") {
                e.preventDefault();
              }
            }} className={`flex items-center justify-center gap-2 px-4 py-3 border border-gold/20 rounded-xl transition-all duration-300 ${button.url && button.url !== "#" ? "hover:bg-gold/10 hover:border-gold/40" : "opacity-50 cursor-not-allowed"}`}>
                    <button.icon className="text-gold" size={18} />
                    <span className="text-primary-foreground text-xs sm:text-sm font-medium uppercase tracking-wider">
                      {button.label}
                    </span>
                  </a>)}
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
};
export default TournamentCard;