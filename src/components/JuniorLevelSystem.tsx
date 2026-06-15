import { motion } from "framer-motion";

const levels = [
  { color: "Orange", hex: "#F97316", label: "Foundation" },
  { color: "Red", hex: "#DC2626", label: "Development" },
  { color: "Blue", hex: "#2563EB", label: "Performance" },
  { color: "Yellow", hex: "#EAB308", label: "Competitive" },
  { color: "White", hex: "#F3F4F6", label: "Excellence" },
  { color: "Black", hex: "#111827", label: "Elite" },
];

const criteria = [
  "Dlhá hra",
  "Krátka hra",
  "Putting",
  "Golfové pravidlá",
  "Etiketa a bezpečnosť",
  "Fyzická pripravenosť",
  "Mentálne návyky športovca",
];

const JuniorLevelSystem = () => {
  return (
    <section id="junior-level-system" className="scroll-mt-24 bg-transparent py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-gold text-xs sm:text-sm tracking-[0.15em] uppercase">
            BSGA Junior Level System™
          </span>
          <h2 className="mt-2 mb-4 text-2xl font-serif font-bold text-foreground sm:text-3xl md:text-4xl">
            Road to Black
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-foreground/70 sm:text-base">
            V našej akadémii deti nezbierajú len tréningové hodiny. Zbierajú skúsenosti, zručnosti a postupujú na vyššie úrovne. Každý hráč začína s <strong>oranžovým</strong> bag tagom a postupne sa môže prepracovať až na <strong>čierny</strong>, ktorý predstavuje výnimočnú úroveň golfových schopností.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-5xl">
          {/* Gradient spine */}
          <div
            className="absolute left-6 top-0 h-full w-[3px] rounded-full md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, #F97316, #DC2626, #2563EB, #EAB308, #F3F4F6, #111827)",
            }}
          />

          <div className="space-y-10 sm:space-y-12">
            {levels.map((level, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={level.color}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex items-start md:items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 -translate-x-1/2 md:left-1/2 z-10">
                    <div
                      className="h-6 w-6 rounded-full border-4 border-background shadow-lg ring-2"
                      style={{
                        backgroundColor: level.hex,
                        boxShadow: `0 0 0 4px ${level.hex}33, 0 0 20px ${level.hex}66`,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div className={`w-full pl-16 md:w-1/2 md:pl-0 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div
                      className="rounded-2xl border bg-card/60 backdrop-blur-sm p-5 shadow-md transition-all duration-300 hover:shadow-xl sm:p-6"
                      style={{ borderColor: `${level.hex}66` }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{
                            backgroundColor: level.hex,
                            color: level.color === "White" ? "#111827" : "#fff",
                          }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <div className="text-xs uppercase tracking-widest text-foreground/60">
                            {level.label}
                          </div>
                          <div className="font-serif text-lg font-bold text-foreground sm:text-xl">
                            {level.color} Bag Tag
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* How to advance */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-gold/30 bg-card/60 backdrop-blur-sm p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl mb-3">
              Ako sa postupuje na vyššiu úroveň
            </h3>
            <p className="text-sm text-foreground/75 mb-4 sm:text-base">
              Postup nie je založený na <strong>veku</strong> ani na tom, ako dlho dieťa trénuje. Každý hráč musí splniť sériu výkonnostných testov:
            </p>
            <ul className="space-y-2">
              {criteria.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-foreground/80 sm:text-base">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gold/30 bg-card/60 backdrop-blur-sm p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl mb-3">
              Jasný cieľ na každom tréningu
            </h3>
            <p className="text-sm text-foreground/75 mb-4 sm:text-base">Deti presne vedia:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-foreground/80 sm:text-base">
                <span className="text-gold">✓</span> čo už dokážu
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground/80 sm:text-base">
                <span className="text-gold">✓</span> na čom potrebujú pracovať
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground/80 sm:text-base">
                <span className="text-gold">✓</span> čo musia splniť pre ďalší level
              </li>
            </ul>
            <p className="text-sm text-foreground/70 italic sm:text-base">
              Každý hráč má svoju vlastnú cestu — niektoré deti získajú nový bag tag za niekoľko mesiacov, iné budú potrebovať viac času. Súťažia predovšetkým samy so sebou.
            </p>
          </div>
        </div>

        {/* Black tag highlight */}
        <div className="mt-10 mx-auto max-w-5xl rounded-2xl border border-gold/40 bg-gradient-to-br from-foreground/95 to-foreground/80 p-8 text-center shadow-xl sm:p-12">
          <span className="text-gold text-xs tracking-[0.2em] uppercase">Cieľ</span>
          <h3 className="mt-2 font-serif text-2xl font-bold text-background sm:text-3xl md:text-4xl">
            Čierny bag tag
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-background/80 sm:text-base">
            Čierny bag tag nie je odmena za vek. Je symbolom hráča, ktorý preukázal výnimočnú úroveň <strong className="text-gold">golfových zručností, disciplíny, charakteru a pracovných návykov</strong>. Hráči, ktorí dosiahnu Black Bag Tag, vytvárajú pevné základy pre výkonnostný golf — reprezentáciu, medzinárodné turnaje, či športové štipendium na zahraničnej univerzite.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-gold/90 font-medium sm:text-base">
            Vitajte v BSGA Junior Level System™
          </p>
        </div>
      </div>
    </section>
  );
};

export default JuniorLevelSystem;