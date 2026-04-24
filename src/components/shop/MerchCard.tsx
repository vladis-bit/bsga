import { Button } from "@/components/ui/button";
import CursorGlowCard from "@/components/CursorGlowCard";

interface MerchCardProps {
  title: string;
  price: number;
  description: string;
  purchaseUrl?: string;
}

const MerchCard = ({ title, price, description, purchaseUrl }: MerchCardProps) => {
  return (
    <CursorGlowCard className="h-full group rounded-xl sm:rounded-2xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10">
      <div className="p-6 sm:p-8 h-full flex flex-col rounded-xl sm:rounded-2xl">
        <h3 className="text-xl font-bold text-foreground mb-3 text-center">
          {title}
        </h3>

        <div className="mb-4 text-center">
          <span className="text-3xl font-bold text-gold">
            {price.toLocaleString("sk-SK", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xl text-gold ml-1">€</span>
        </div>

        <p className="text-muted-foreground text-sm text-center mb-8 flex-grow">
          {description}
        </p>

        {purchaseUrl ? (
          <Button asChild className="w-full bg-gold hover:bg-gold/90 text-foreground font-semibold py-3">
            <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
              Kúpiť
            </a>
          </Button>
        ) : (
          <Button className="w-full bg-gold hover:bg-gold/90 text-foreground font-semibold py-3">
            Kúpiť
          </Button>
        )}
      </div>
    </CursorGlowCard>
  );
};

export default MerchCard;