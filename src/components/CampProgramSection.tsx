import { Clock, Backpack, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const schedule = [
  { time: "7:30", activity: "Ranný zber detí v priestoroch reštaurácie golfového klubu" },
  { time: "8:00", activity: "Raňajky" },
  { time: "8:30", activity: "Športová rozcvička" },
  { time: "9:00", activity: "Tréningová jednotka 1 (TJ1)" },
  { time: "10:15", activity: "Desiata" },
  { time: "10:45", activity: "TJ2" },
  { time: "12:00", activity: "Obed" },
  { time: "13:00", activity: "TJ3" },
  { time: "15:00", activity: "Olovrant" },
  { time: "15:30", activity: "Športové hry a animačný program" },
  { time: "16:30", activity: "Vyzdvihnutie detí" },
];

const CampProgramSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-10 sm:mt-14 md:mt-16 space-y-8 sm:space-y-10"
    >
      {/* Program schedule */}
      <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-sm p-5 sm:p-7 md:p-8">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground">
            Program golfového tábora
          </h3>
        </div>
        <div className="divide-y divide-border/60">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 py-3 sm:py-3.5 first:pt-0 last:pb-0"
            >
              <span className="flex-shrink-0 w-14 sm:w-16 text-sm sm:text-base font-semibold text-gold tabular-nums">
                {item.time}
              </span>
              <span className="text-sm sm:text-base text-foreground/80">
                {item.activity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* What to bring */}
      <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-sm p-5 sm:p-7 md:p-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
            <Backpack className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground">
            Čo si majú deti so sebou priniesť?
          </h3>
        </div>
        <div className="space-y-3 text-sm sm:text-base text-foreground/80 leading-relaxed">
          <p>
            Pre Vaše deti je zabezpečený <strong>komplet celodenný servis</strong> čo sa týka <strong>starostlivosti</strong>, <strong>stravovania</strong> / <strong>pitného režimu</strong> a <strong>golfu</strong>. Deti budú celý deň pod dohľadom <strong>našich trénerov</strong>.
          </p>
          <p>
            Deti si môžu so sebou priniesť <strong>ruksačik</strong>, kde im prosím nachystajte <strong>šiltovku</strong> alebo <strong>letný klobúčik</strong>, <strong>opaľovací krém</strong> (ak máte nejakú konkrétnu značku, ale budú ich mať aj naši tréneri) a v prípade horšieho počasia <strong>mikinu</strong> / <strong>nohavice</strong>. <strong>Malá sladkosť</strong> prípadne <strong>džúsik</strong> bude na Vašom rozhodnutí. Ak majú deti <strong>vlastné palice</strong>, nech si ich samozrejme prinesú.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CampProgramSection;
