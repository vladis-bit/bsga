import asbisLogo from "@/assets/partner-asbis.png";
import checkpointLogo from "@/assets/partner-checkpoint.png";

interface Partner {
  name: string;
  logo?: string;
}

const partners: Partner[] = [
  { name: "ASBIS", logo: asbisLogo },
  { name: "Check Point", logo: checkpointLogo },
  { name: "Hrubá Borša" },
  { name: "Red Oak Golf Club" },
  { name: "Penati Golf Resort" },
  { name: "Tále" },
];

const PartnersLoop = () => {
  return (
    <section className="py-20 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          <span className="text-gold text-sm tracking-[0.2em] uppercase">
            Spolupracujeme
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-4">
            Naši partneri
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary to-transparent z-10" />

        <div className="flex animate-scroll">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-12 py-4 flex items-center"
            >
              {partner.logo ? (
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 md:h-16 w-auto object-contain hover:scale-105 transition-transform cursor-pointer"
                />
              ) : (
                <div className="text-xl md:text-2xl font-serif font-bold text-muted-foreground hover:text-gold transition-colors cursor-pointer whitespace-nowrap">
                  {partner.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersLoop;
