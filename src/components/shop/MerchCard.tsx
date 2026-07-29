import { Button } from "@/components/ui/button";
import CursorGlowCard from "@/components/CursorGlowCard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ColorVariant {
  name: string;
  hex: string;
  image: string;
}

interface MerchCardProps {
  title: string;
  price: number;
  description: string;
  purchaseUrl?: string;
  image?: string;
  colorVariants?: ColorVariant[];
}

const MerchCard = ({ title, price, description, purchaseUrl, image, colorVariants }: MerchCardProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasVariants = !!colorVariants && colorVariants.length > 1;
  const activeImage = hasVariants ? colorVariants![activeIndex].image : image;
  const activeKey = hasVariants ? colorVariants![activeIndex].name : "static";

  const next = () => setActiveIndex((i) => (i + 1) % colorVariants!.length);
  const prev = () => setActiveIndex((i) => (i - 1 + colorVariants!.length) % colorVariants!.length);

  return (
    <CursorGlowCard className="h-full group relative rounded-3xl overflow-hidden border border-border !bg-card transition-colors duration-300 hover:border-gold/60">
      <div className="relative h-full flex flex-col">
        {/* Image — edge to edge, no frame padding */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {activeImage ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={activeKey}
                loading="lazy"
                decoding="async"
                src={activeImage}
                alt={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-foreground/30 text-xs uppercase tracking-widest">
              BSGA
            </div>
          )}
          
          {hasVariants && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Predchádzajúca farba"
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground backdrop-blur-sm transition-all hover:bg-gold hover:text-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Nasledujúca farba"
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground backdrop-blur-sm transition-all hover:bg-gold hover:text-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 pb-7 sm:pb-8 pt-5 flex flex-col items-center text-center flex-grow">
          <h3 className="mb-2 font-serif text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h3>

          <div className="mb-3 sm:mb-4">
            <span className="text-2xl sm:text-3xl font-bold text-gold">
              {price.toLocaleString("sk-SK", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-lg sm:text-xl text-gold ml-1">€</span>
          </div>

          {hasVariants && (
            <div className="flex items-center gap-2 mb-4">
              {colorVariants!.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={v.name}
                  title={v.name}
                  className={`w-4 h-4 rounded-full border border-border transition-all ${
                    i === activeIndex ? "ring-2 ring-gold ring-offset-2 ring-offset-card scale-110" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: v.hex }}
                />
              ))}
            </div>
          )}

          <p className="mb-6 flex-grow text-xs leading-relaxed text-foreground/70 sm:mb-8 sm:text-sm">
            {description}
          </p>

          {purchaseUrl ? (
            <Button
              asChild
              className="relative w-full overflow-hidden rounded-full bg-gold py-5 text-sm font-bold uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground active:scale-[0.98] sm:py-6 sm:text-base"
            >
              <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
                <span className="relative z-10">Kúpiť</span>
              </a>
            </Button>
          ) : (
            <Button
              disabled
              className="w-full rounded-full bg-gold py-5 text-sm font-bold uppercase tracking-[0.2em] text-primary sm:py-6 sm:text-base"
            >
              Kúpiť
            </Button>
          )}
        </div>

        {/* Decorative gold glow */}
        
      </div>
    </CursorGlowCard>
  );
};

export default MerchCard;