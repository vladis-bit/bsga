import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CursorGlowCard from "@/components/CursorGlowCard";

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  icon: LucideIcon;
}

const ServiceCard = ({ title, description, price, icon: Icon }: ServiceCardProps) => {
  return (
    <CursorGlowCard className="h-full group rounded-xl sm:rounded-2xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10">
      <div className="p-6 h-full flex flex-col rounded-xl sm:rounded-2xl">
        {/* Icon */}
        <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-gold" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 flex-grow">
          {description}
        </p>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gold">
            {price.toLocaleString('sk-SK', { minimumFractionDigits: 2 })} €
          </span>
          <Button className="bg-gold hover:bg-gold/90 text-foreground">
            Kúpiť
          </Button>
        </div>
      </div>
    </CursorGlowCard>
  );
};

export default ServiceCard;
