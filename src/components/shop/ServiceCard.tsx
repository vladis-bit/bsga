import { Check, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CursorGlowCard from "@/components/CursorGlowCard";

interface ServiceCardProps {
  title: string;
  price: number;
  icon: LucideIcon;
  features: string[];
}

const ServiceCard = ({ title, price, features }: ServiceCardProps) => {
  return (
    <CursorGlowCard className="h-full group rounded-xl sm:rounded-2xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10">
      <div className="p-6 sm:p-8 h-full flex flex-col rounded-xl sm:rounded-2xl">
        {/* Názov */}
        <h3 className="text-xl font-bold text-foreground mb-6">
          {title}
        </h3>
        
        {/* Bullet points */}
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Cena */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-gold">
            {price.toLocaleString('sk-SK', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xl text-gold ml-1">€</span>
        </div>
        
        {/* Button */}
        <Button className="w-full bg-gold hover:bg-gold/90 text-foreground font-semibold py-3">
          Kúpiť
        </Button>
      </div>
    </CursorGlowCard>
  );
};

export default ServiceCard;
