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
    <CursorGlowCard className="h-full group rounded-xl sm:rounded-2xl border-2 border-gold/50 !bg-[#0a0a0a] hover:border-gold/70 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10">
      <div className="overflow-hidden h-full flex flex-col rounded-xl sm:rounded-2xl">
        {/* Image placeholder */}
        <div className="aspect-[16/9] bg-[#0e0e0e] flex items-center justify-center relative overflow-hidden">
          {image ? (
            <img loading="lazy" decoding="async" src={image} alt={`Darčeková poukážka ${value}€`} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-white/50">
              <Gift className="w-16 h-16 text-gold/50" />
              <span className="text-sm">Obrázok poukážky</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Darčeková poukážka
          </h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">
            Darujte zážitok z golfu. Poukážka je platná 12 mesiacov od zakúpenia.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gold">{value} €</span>
            {purchaseUrl ? (
              <Button asChild className="bg-gold hover:bg-gold/90 text-foreground">
                <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">Kúpiť</a>
              </Button>
            ) : (
              <Button disabled className="bg-gold hover:bg-gold/90 text-foreground">Kúpiť</Button>
            )}
          </div>
        </div>
      </div>
    </CursorGlowCard>
  );
};

export default VoucherCard;
