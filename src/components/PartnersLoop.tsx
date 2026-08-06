import asbisAsset from "@/assets/partner-asbis.webp.asset.json";
import checkpointAsset from "@/assets/partner-checkpoint.webp.asset.json";
import doniTravelLogo from "@/assets/partner-doni-travel.png";
import borsaAsset from "@/assets/partner-borsa.webp.asset.json";
import jucadAsset from "@/assets/partner-jucad.webp.asset.json";
import skgaAsset from "@/assets/partner-skga.svg.asset.json";
import sklgaAsset from "@/assets/partner-sklga.webp.asset.json";
interface Partner {
  name: string;
  logo: string;
  logoClass?: string;
}
const partners: Partner[] = [{
  name: "ASBIS",
  logo: asbisAsset.url
}, {
  name: "Check Point",
  logo: checkpointAsset.url,
  logoClass: "max-w-[92%] max-h-[80%]"
}, {
  name: "Doni Travel",
  logo: doniTravelLogo,
  logoClass: "max-w-[8.5rem] max-h-24 sm:max-w-[9.5rem] sm:max-h-28 md:max-w-[10.5rem] md:max-h-32"
}, {
  name: "Borša Golf Club",
  logo: borsaAsset.url
}, {
  name: "JuCad",
  logo: jucadAsset.url
}, {
  name: "SKGA",
  logo: skgaAsset.url,
  logoClass: "max-w-[8.5rem] max-h-24 sm:max-w-[9.5rem] sm:max-h-28 md:max-w-[10.5rem] md:max-h-32"
}, {
  name: "SKLGA",
  logo: sklgaAsset.url
}];
const PartnersLoop = () => {
  return <section className="py-12 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <div className="mx-auto max-w-xl border-b border-border pb-6 text-center">
          <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-foreground md:text-4xl">Hlavní partneri</h2>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
            Spolupracujeme
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted to-transparent z-10" />

        <div className="flex w-max animate-scroll motion-reduce:animate-none">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 px-6 sm:px-8 md:px-10 py-4 flex items-center justify-center"
            >
              <div className="flex w-44 h-36 items-center justify-center rounded-2xl border border-border bg-card sm:w-52 sm:h-44 md:w-60 md:h-56">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className={`${partner.logoClass ?? "max-w-[80%] max-h-[80%]"} w-auto h-auto object-contain hover:scale-105 transition-transform cursor-pointer select-none`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-scroll {
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          animation: scroll 18s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-scroll {
            animation-duration: 26s;
          }
        }
        @media (hover: hover) {
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>;
};
export default PartnersLoop;
