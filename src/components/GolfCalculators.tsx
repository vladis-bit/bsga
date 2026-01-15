import { Calculator } from "lucide-react";

const GolfCalculators = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Calculator className="h-16 w-16 text-gold mb-4" />
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Golfové kalkulačky
      </h2>
      <p className="text-muted-foreground">
        Už čoskoro...
      </p>
    </div>
  );
};

export default GolfCalculators;
