import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import CursorGlowCard from "@/components/CursorGlowCard";

interface VoucherCardProps {
  value: number;
  image?: string;
  purchaseUrl?: string;
}

const VoucherCard = ({ value, image, purchaseUrl }: VoucherCardProps) => {
  return (
    <CursorGlowCard className="h-full group rounded-2xl border border-border !bg-card transition-colors duration-300 hover:border-gold/60">
      <div className="overflow-hidden h-full flex flex-col rounded-2xl">
        {/* Image placeholder */}
        <div className="aspect-[16/9] bg-muted flex items-center justify-center relative overflow-hidden">
          {image ? (
            <img loading="lazy" decoding="async" src={image} alt={`Darčeková poukážka ${value}€`} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-foreground/50">
              <Gift className="w-16 h-16 text-gold/50" />
              <span className="text-sm">Obrázok poukážky</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-serif text-xl font-bold text-foreground mb-2">
            Darčeková poukážka
          </h3>
          <p className="text-sm text-foreground/70 mb-4 flex-grow leading-relaxed">
            Darujte zážitok z golfu. Poukážka je platná 12 mesiacov od zakúpenia.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gold">{value} €</span>
            {purchaseUrl ? (
              <Button asChild className="rounded-full bg-gold px-6 font-bold text-primary hover:bg-foreground hover:text-primary-foreground">
                <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">Kúpiť</a>
              </Button>
            ) : (
              <Button disabled className="rounded-full bg-gold px-6 font-bold text-primary hover:bg-foreground hover:text-primary-foreground">Kúpiť</Button>
            )}
          </div>
        </div>
      </div>
    </CursorGlowCard>
  );
};

export default VoucherCard;
