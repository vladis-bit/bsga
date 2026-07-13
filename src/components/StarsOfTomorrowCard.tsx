import { motion } from "framer-motion";
import { Calendar, Mail, MapPin, FileText, Star } from "lucide-react";
import poster from "@/assets/event-posters/stars-of-tomorrow.pdf.asset.json";

const StarsOfTomorrowCard = () => {
  return (
    <section className="bg-transparent pt-12 sm:pt-16 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-gold/50 bg-gradient-to-br from-gold/20 to-gold/5 p-5 sm:p-6 shadow-lg shadow-gold/10"
          >
            <div className="absolute -right-12 top-5 rotate-45 bg-gold text-primary text-[10px] sm:text-xs font-bold tracking-widest px-12 py-1 shadow-md">
              NOVINKA
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold text-primary flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>

              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-serif font-bold leading-tight text-foreground">
                  Stars of Tomorrow
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span>27. – 30. 7. 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>GKHB, Hrubá Borša</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gold">250 €</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  4-dňový kemp pre výkonnostných juniorov (9–18 rokov) v rámci <strong>CTM Hrubá Borša</strong>. Putting a chipping ability testy, course management a herné formáty priamo na ihrisku. V cene je obed a pitný režim.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 md:min-w-[180px]">
                <a
                  href={poster.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-muted border border-foreground/20 text-foreground hover:bg-muted/80 hover:border-foreground/40"
                >
                  <FileText className="w-4 h-4" />
                  Plagát
                </a>
                <a
                  href="mailto:jakub@bsga.sk?subject=Prihlásenie – Stars of Tomorrow"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-gold text-primary hover:bg-gold-light transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span>Prihlásiť sa</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StarsOfTomorrowCard;