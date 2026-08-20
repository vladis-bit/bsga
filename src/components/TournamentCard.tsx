import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Trophy, Camera, FileText, ChevronDown } from "lucide-react";
import { tournamentTitle, skOrdinal } from "@/lib/ordinals";
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
  presenter?: string;
  links?: TournamentLinks;
  promoUrl?: string;
  tourLabel?: string;
  hideResults?: boolean;
  hideLocation?: boolean;
  theme?: "dark" | "ivory";
}
const TournamentCard = ({
  number,
  date,
  location,
  image,
  presenter,
  links,
  promoUrl,
  tourLabel = "BSGA Tour",
  hideResults = false,
  hideLocation = false,
  theme = "dark"
}: TournamentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ivory = theme === "ivory";
  const shellClass = ivory
    ? "bg-card border border-border rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10"
    : "bg-primary border border-gold/30 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-gold/60 hover:shadow-lg hover:shadow-gold/10";
  const titleClass = ivory ? "text-foreground" : "text-primary-foreground";
  const imageFrame = ivory ? "border-border" : "border-gold/20";
  const dividerClass = ivory ? "border-border" : "border-gold/20";
  const actionButtons = [
    ...(promoUrl ? [{ icon: FileText, label: `PROMO LETÁK – ${skOrdinal(number).toUpperCase()} TURNAJ`, url: promoUrl }] : []),
    ...(!hideLocation ? [{ icon: MapPin, label: "LOKALITA", url: links?.locationUrl }] : []),
    ...(!hideResults ? [{ icon: Trophy, label: "VÝSLEDKY", url: links?.resultsUrl }] : []),
    { icon: Camera, label: "GALÉRIA", url: links?.galleryUrl },
  ];
  return <motion.div className={shellClass} onClick={() => setIsExpanded(!isExpanded)} layout>
      {/* Course Image */}
      {image && <div className="p-3 sm:p-4 pb-0">
          <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden border ${imageFrame}`}>
            <img src={image} alt={location} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>}

      {/* Header - always visible */}
      <div className="flex items-center gap-3 sm:gap-6 p-4 sm:p-6">
        {/* Tournament number */}
        <div className={`flex-shrink-0 w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${ivory ? "bg-gold/15 border border-gold/40" : "bg-gold/10 border border-gold/30"}`}>
          <span className="text-gold font-serif font-bold text-base sm:text-xl">{number}</span>
        </div>

        {/* Date, tour label, location */}
        <div className="flex-1 min-w-0">
          {/* Mobile: stacked layout */}
          <div className="flex flex-col sm:hidden gap-1">
            <span className={`${titleClass} font-serif text-sm font-bold tracking-wide uppercase`}>
              {tournamentTitle(number, tourLabel)}
            </span>
            {presenter && (
              <span className="text-gold text-[9px] uppercase tracking-wider">
                presented by {presenter}
              </span>
            )}
            <span className="text-gold text-base font-sans font-medium leading-tight">{date}</span>
            <span className={`${titleClass} font-medium text-xs uppercase tracking-wide truncate`}>
              {location}
            </span>
          </div>
          {/* Desktop: single row */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            <span className="text-gold text-lg font-sans flex-shrink-0">{date}</span>
            <div className="flex flex-col items-center flex-1 min-w-0 gap-0.5">
              <span className={`${titleClass} font-serif font-bold text-lg tracking-wide whitespace-nowrap`}>
                {tournamentTitle(number, tourLabel)}
              </span>
              {presenter && (
                <span className="text-gold text-[10px] uppercase tracking-wider truncate max-w-full">
                  presented by {presenter}
                </span>
              )}
            </div>
            <span className={`${titleClass} font-medium text-base uppercase tracking-wide truncate text-right`}>
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
            <div className={`px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t ${dividerClass}`}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
{actionButtons.map((button, index) => <a key={index} href={button.url || "#"} target={button.url && button.url !== "#" ? "_blank" : undefined} rel={button.url && button.url !== "#" ? "noopener noreferrer" : undefined} aria-label={button.label} onClick={e => {
              e.stopPropagation();
              if (!button.url || button.url === "#") {
                e.preventDefault();
              }
            }} className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-primary transition-colors duration-300 ${button.url && button.url !== "#" ? "hover:bg-gold-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2" : "opacity-50 cursor-not-allowed hover:bg-gold"}`}>
                    <button.icon size={18} />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
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