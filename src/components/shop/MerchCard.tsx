import { Button } from "@/components/ui/button";
import CursorGlowCard from "@/components/CursorGlowCard";

interface MerchCardProps {
  title: string;
  price: number;
  description: string;
  purchaseUrl?: string;
  image?: string;
}

const MerchCard = ({ title, price, description, purchaseUrl, image }: MerchCardProps) => {
  return (
    <CursorGlowCard className="h-full group relative rounded-[2rem] overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-500 hover:border-gold/30">
      <div className="relative h-full flex flex-col">
        {/* Image — edge to edge, no frame padding */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#0e0e0e]">
          {image ? (
            <img
              loading="lazy"
              decoding="async"
              src={image}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30 text-xs uppercase tracking-widest">
              BSGA
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80" />
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 pb-7 sm:pb-8 pt-5 flex flex-col items-center text-center flex-grow">
          <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-white font-semibold tracking-wide mb-2">
            {title}
          </h3>

          <div className="mb-3 sm:mb-4">
            <span className="text-2xl sm:text-3xl font-bold text-gold">
              {price.toLocaleString("sk-SK", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-lg sm:text-xl text-gold ml-1">€</span>
          </div>

          <p className="text-white/55 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 flex-grow">
            {description}
          </p>

          {purchaseUrl ? (
            <Button
              asChild
              className="relative w-full overflow-hidden bg-gold hover:bg-gold/90 text-[#0a0a0a] font-bold uppercase tracking-[0.15em] text-sm sm:text-base py-5 sm:py-6 rounded-xl shadow-[0_10px_25px_-10px_rgba(197,160,89,0.6)] transition-all duration-300 active:scale-[0.97]"
            >
              <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
                <span className="relative z-10">Kúpiť</span>
              </a>
            </Button>
          ) : (
            <Button
              disabled
              className="w-full bg-gold text-[#0a0a0a] font-bold uppercase tracking-[0.15em] text-sm sm:text-base py-5 sm:py-6 rounded-xl"
            >
              Kúpiť
            </Button>
          )}
        </div>

        {/* Decorative gold glow */}
        <div className="pointer-events-none absolute -bottom-12 -right-12 w-32 h-32 bg-gold/10 rounded-full blur-[60px] transition-colors duration-700 group-hover:bg-gold/20" />
      </div>
    </CursorGlowCard>
  );
};

export default MerchCard;