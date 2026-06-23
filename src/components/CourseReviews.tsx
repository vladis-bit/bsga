import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

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

const ReviewCard = ({ review, index }: { review: Review; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > CHAR_LIMIT;
  const displayed = expanded || !isLong ? review.text : review.text.slice(0, CHAR_LIMIT).trimEnd() + "…";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="flex flex-col rounded-xl border border-gold/25 bg-card/95 p-5 sm:p-6 shadow-sm shadow-black/20 transition-all duration-300 hover:border-gold/70 hover:shadow-gold/10 hover:shadow-lg"
    >
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

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 self-start text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold/80 transition-colors"
        >
          {expanded ? "Zobraziť menej" : "Čítať viac"}
        </button>
      )}
    </motion.article>
  );
};

const CourseReviews = () => {
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reviews.map((r, i) => (
          <ReviewCard key={r.name} review={r} index={i} />
        ))}
      </div>

      <p className="text-center text-xs text-primary-foreground/50 mt-6">
        Recenzie pochádzajú z Google profilu BSGA
      </p>
    </section>
  );
};

export default CourseReviews;