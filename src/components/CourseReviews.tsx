import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Review = {
  name: string;
  text: string;
};

const reviews: Review[] = [
  {
    name: "Matúš Kráľovič",
    text: "Úžasní ľudia, prostredie, všetko. Veľmi odporúčam a neviem čo iné by som zmenil. Kurz prebiehal v peknej postupnosti zakončený hrou na ihrisku. Tréner všetko vysvetlil a mal trpezlivosť aj s tými, ktorým to možno až tak nešlo. Vrelo odporúčam všetkým, ktorí si nevedia vybrať u koho urobiť zelenú kartu, určite neoľutujete :)",
  },
  {
    name: "Peter Hrban",
    text: "Veľmi pekne ďakujeme, že sme sa mohli zúčastniť kurzu ZK vo vašej akadémii. Všetko Tip Top na vysokej úrovni vrátane inštruktora Milana, ale celkovo Vašej BSGA 😉👍 krásny rezort a s ním vaše služby TOP 👏😉👍",
  },
  {
    name: "Andrea Beno",
    text: "Absolvovala som víkendový golfový kurz v Best Swing Golf Academy a nemohlo to byť lepšie! Bol to skvelý, pozitívnou energiou nabitý víkend, počas ktorého sme sa veľa naučili o etike a pravidlách hry. Na záver víkendu sme už boli schopní úspešne zahrať zopár jamiek. Stretla sa tu super partia ľudí, s ktorými sme si výborne sadli. Obrovská vďaka patrí Milanovi – viedol kurz absolútne perfektne, s obrovskou profesionalitou, no zároveň sme sa veľa nasmiali a od prvého momentu sme sa cítili nesmierne vítaní. Kurz odporúčam všetkými desiatimi!",
  },
  {
    name: "Ivan Lomnický",
    text: "Pán tréner Milan Neštický, ďakujem veľmi pekne za Váš perfektný profesionálny a priateľský prístup. Ísť práve k Vám na kurz zelenej karty bolo výborné rozhodnutie! Odporúčam každému, neoľutujete. 10/10 👍",
  },
  {
    name: "Matej Babinec",
    text: "Kurzom nás sprevádzal Milan Neštický a naozaj môžem len odporučiť. Celý kurz prebiehal vo veľmi príjemnej atmosfére, Milan všetko zrozumiteľne vysvetlil a venoval sa nám aj individuálne. Ako začiatočník som sa cítil veľmi dobre, dostal som veľa praktických rád a celý priebeh bol profesionálny, no zároveň uvoľnený. Ak niekto rozmýšľa nad zelenou kartou na golf, určite odporúčam.",
  },
  {
    name: "Štefan Baláž",
    text: "Za dva dni sme prešli všetkým, čo sa týka golfu, a urobili sme 15 kilometrov v peknom prostredí v príjemnom kolektíve. Mali sme šťastie s erudovaným trénerom Milanom. U každého účastníka bol očividný pokrok.",
  },
];

const CHAR_LIMIT = 220;

const ReviewCard = ({ review }: { review: Review }) => {
  const isLong = review.text.length > CHAR_LIMIT;
  const displayed = isLong ? review.text.slice(0, CHAR_LIMIT).trimEnd() + "…" : review.text;

  return (
    <article className="flex flex-col rounded-xl border border-gold/25 bg-card/95 p-5 sm:p-6 shadow-sm shadow-black/20 w-[85vw] max-w-[20rem] sm:w-[22rem] sm:max-w-none flex-shrink-0 h-full">
      <header className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 border border-gold/40 flex items-center justify-center flex-shrink-0">
          <span className="text-gold font-bold text-base drop-shadow-sm">{review.name.charAt(0)}</span>
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-card-foreground text-sm sm:text-base truncate">{review.name}</h4>
          <p className="text-gold text-xs font-medium">Google recenzia · víkendový kurz ZK</p>
        </div>
      </header>

      <div className="flex gap-0.5 mb-3" aria-label="5 z 5 hviezdičiek">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gold fill-gold drop-shadow-sm" />
        ))}
      </div>

      <p className="text-sm leading-relaxed text-card-foreground italic">
        „{displayed}"
      </p>
    </article>
  );
};

const CourseReviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="mt-12 sm:mt-16">
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-gold text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
          Referencie
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary-foreground mt-3">
          Čo hovoria absolventi víkendového kurzu
        </h3>
        <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
      </div>

      <div className="relative max-w-6xl mx-auto px-2 sm:px-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 py-2">
            {reviews.map((r, i) => (
              <div key={`${r.name}-${i}`} className="flex-shrink-0">
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Predchádzajúca recenzia"
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-card/95 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Ďalšia recenzia"
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-card/95 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Predchádzajúca recenzia"
          className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full bg-card/95 border border-gold/40 text-gold active:scale-95 transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Prepínač recenzií">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Recenzia ${i + 1}`}
              aria-current={i === selectedIndex}
              className={`h-2 rounded-full transition-all ${
                i === selectedIndex ? "w-6 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Ďalšia recenzia"
          className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full bg-card/95 border border-gold/40 text-gold active:scale-95 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-primary-foreground/50 mt-6">
        Recenzie pochádzajú z Google profilu BSGA
      </p>
    </section>
  );
};

export default CourseReviews;