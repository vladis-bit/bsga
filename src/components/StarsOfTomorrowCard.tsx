import { motion } from "framer-motion";
import { Calendar, Mail, MapPin, FileText, Star, Users, Sparkles, ArrowRight } from "lucide-react";
import poster from "@/assets/event-posters/stars-of-tomorrow.pdf.asset.json";

const StarsOfTomorrowCard = () => {
  return (
    <section className="bg-transparent pt-12 sm:pt-16 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-gold/40 via-gold-light/30 to-gold/40 opacity-60 blur-lg group-hover:opacity-90 transition-opacity duration-500" />

            <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-sm shadow-2xl shadow-gold/10">
              {/* Decorative sparkles */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gold blur-3xl" />
                <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-gold-light blur-3xl" />
              </div>

              {/* Ribbon */}
              <div className="absolute -right-14 top-6 rotate-45 bg-gradient-to-r from-gold to-gold-light text-primary text-[10px] sm:text-xs font-bold tracking-[0.2em] px-14 py-1.5 shadow-lg z-10">
                NOVINKA
              </div>

              <div className="relative p-6 sm:p-8 md:p-10">
                {/* Header */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                    className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-light text-primary flex items-center justify-center shadow-lg shadow-gold/30"
                  >
                    <Star className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                  </motion.div>

                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-gold uppercase mb-1.5">
                      <Sparkles className="w-3 h-3" />
                      Výkonnostný kemp
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold leading-tight text-foreground">
                      Stars of Tomorrow
                    </h3>
                  </div>
                </div>

                {/* Meta chips */}
                <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { icon: Calendar, label: "Termín", value: "27. – 30. 7. 2026" },
                    { icon: MapPin, label: "Miesto", value: "GKHB, Hrubá Borša" },
                    { icon: Users, label: "Vek", value: "9 – 18 rokov" },
                    { icon: Sparkles, label: "Cena", value: "250 €", highlight: true },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex flex-col gap-1 rounded-xl border p-3 sm:p-3.5 transition-colors ${
                        item.highlight
                          ? "border-gold/60 bg-gold/10"
                          : "border-foreground/10 bg-foreground/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
                        <item.icon className={`w-3.5 h-3.5 ${item.highlight ? "text-gold" : "text-gold/70"}`} />
                        {item.label}
                      </div>
                      <div className={`text-sm sm:text-base font-bold leading-tight ${item.highlight ? "text-gold" : "text-foreground"}`}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="mt-5 sm:mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  4-dňový kemp pre výkonnostných juniorov v rámci <strong className="text-foreground">CTM Hrubá Borša</strong>. Putting a chipping ability testy, course management a herné formáty priamo na ihrisku. V cene je obed a pitný režim.
                </p>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={poster.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold rounded-2xl border border-foreground/20 bg-foreground/[0.03] text-foreground hover:bg-foreground/[0.06] hover:border-foreground/40 transition-all duration-300"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    Plagát (PDF)
                  </a>
                  <a
                    href="mailto:jakub@bsga.sk?subject=Prihlásenie – Stars of Tomorrow"
                    className="group/btn flex-[1.5] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold rounded-2xl bg-gradient-to-r from-gold to-gold-light text-primary shadow-lg shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    Prihlásiť sa
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>

                {/* Contact hint */}
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Prihlášky posielajte na <span className="text-gold font-medium">jakub@bsga.sk</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StarsOfTomorrowCard;