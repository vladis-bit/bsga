import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import CursorGlowCard from "@/components/CursorGlowCard";

interface VoucherCardProps {
  value: number;
  image?: string;
}

const VoucherCard = ({ value, image }: VoucherCardProps) => {
  return (
    <CursorGlowCard className="h-full">
      <div className="bg-card rounded-xl overflow-hidden h-full flex flex-col">
        {/* Image placeholder */}
        <div className="aspect-[4/3] bg-muted flex items-center justify-center relative overflow-hidden">
          {image ? (
            <img src={image} alt={`Darčeková poukážka ${value}€`} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
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
            <Button className="bg-gold hover:bg-gold/90 text-foreground">
              Kúpiť
            </Button>
          </div>
        </div>
      </div>
    </CursorGlowCard>
  );
};

export default VoucherCard;
