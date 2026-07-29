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
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Populárne
        </div>
      )}
      <CursorGlowCard className={`h-full group rounded-2xl border !bg-card transition-colors duration-300 ${popular ? 'border-gold' : 'border-border hover:border-gold/60'}`}>
        <div className="p-6 md:p-8 h-full flex flex-col rounded-2xl">
        {/* Názov */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 text-center">
          {title}
        </h3>
        
        {/* Bullet points */}
        <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm leading-relaxed text-foreground/70">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Cena */}
        <div className="mb-3 sm:mb-4 text-center">
          {originalPrice && (
            <span className="mr-2 text-base text-foreground/40 line-through sm:text-lg">
              {originalPrice.toLocaleString('sk-SK', { minimumFractionDigits: 2 })} €
            </span>
          )}
          <span className="text-2xl sm:text-3xl font-bold text-gold">
            {price.toLocaleString('sk-SK', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-lg sm:text-xl text-gold ml-1">€</span>
          {discount && (
            <div className="mt-2">
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-gold sm:text-sm">
                Ušetri {discount}%
              </span>
            </div>
          )}
        </div>
        
        {/* Button */}
        {purchaseUrl ? (
          <Button asChild className="w-full rounded-full bg-gold py-3 text-sm font-bold text-primary transition-colors hover:bg-foreground hover:text-primary-foreground sm:text-base">
            <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">{ctaLabel}</a>
          </Button>
        ) : (
          <Button disabled className="w-full rounded-full bg-gold py-3 text-sm font-bold text-primary transition-colors hover:bg-foreground hover:text-primary-foreground sm:text-base">
            {ctaLabel}
          </Button>
        )}
        {note && (
          <p className="mt-3 text-center text-xs italic text-foreground/50">
            {note}
          </p>
        )}
      </div>
    </CursorGlowCard>
    </div>
  );
};

export default ServiceCard;
