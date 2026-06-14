import { Check, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CursorGlowCard from "@/components/CursorGlowCard";

interface ServiceCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  icon: LucideIcon;
  features: string[];
  popular?: boolean;
  purchaseUrl?: string;
  note?: string;
  ctaLabel?: string;
}

const ServiceCard = ({ title, price, originalPrice, discount, features, popular, purchaseUrl, note, ctaLabel = "Kúpiť" }: ServiceCardProps) => {
  return (
    <div className="relative">
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-gold text-primary font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg">
          Populárne
        </div>
      )}
      <CursorGlowCard className={`h-full group rounded-xl sm:rounded-2xl border-2 !bg-[#0a0a0a] transition-all duration-300 hover:shadow-xl hover:shadow-gold/10 ${popular ? 'border-gold/60 shadow-lg shadow-gold/10' : 'border-gold/50 hover:border-gold/70'}`}>
        <div className="p-5 sm:p-6 md:p-8 h-full flex flex-col rounded-xl sm:rounded-2xl">
        {/* Názov */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-center">
          {title}
        </h3>
        
        {/* Bullet points */}
        <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
              <span className="text-white/60 text-xs sm:text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Cena */}
        <div className="mb-3 sm:mb-4 text-center">
          {originalPrice && (
            <span className="text-white/50 line-through text-base sm:text-lg mr-2">
              {originalPrice.toLocaleString('sk-SK', { minimumFractionDigits: 2 })} €
            </span>
          )}
          <span className="text-2xl sm:text-3xl font-bold text-gold">
            {price.toLocaleString('sk-SK', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-lg sm:text-xl text-gold ml-1">€</span>
          {discount && (
            <div className="mt-2">
              <span className="bg-green-500/20 text-green-400 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 rounded-full">
                Ušetri {discount}%
              </span>
            </div>
          )}
        </div>
        
        {/* Button */}
        {purchaseUrl ? (
          <Button asChild className="w-full bg-gold hover:bg-gold/90 text-foreground font-semibold py-2.5 sm:py-3 text-sm sm:text-base">
            <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">{ctaLabel}</a>
          </Button>
        ) : (
          <Button disabled className="w-full bg-gold hover:bg-gold/90 text-foreground font-semibold py-2.5 sm:py-3 text-sm sm:text-base">
            {ctaLabel}
          </Button>
        )}
        {note && (
          <p className="mt-3 text-center text-xs text-white/50 italic">
            {note}
          </p>
        )}
      </div>
    </CursorGlowCard>
    </div>
  );
};

export default ServiceCard;
