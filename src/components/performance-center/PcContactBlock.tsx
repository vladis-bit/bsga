import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import peterPhoto from "@/assets/team/peter-svajlen.webp";

const PcContactBlock = () => (
  <section className="space-y-8">
    <div className="overflow-hidden rounded-3xl border border-border bg-muted px-6 py-9 sm:px-10 sm:py-12 md:px-12">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_12rem] lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
        <div className="min-w-0 text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Kontakt</p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Máte nezodpovedané otázky?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
            Kontaktná osoba: <strong className="text-gold">Peter Švajlen</strong>
            <span> – napíšte nám alebo zavolajte.</span>
          </p>
          <p className="mt-3 inline-flex items-center justify-center gap-2 text-sm text-foreground/70 md:justify-start sm:text-base">
            <MapPin className="h-4 w-4 shrink-0 text-gold" />
            Zuzany Chalupovej 12, 851 07 Bratislava
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-start">
            <Button asChild className="h-auto min-h-12 rounded-full bg-gold px-6 py-3 text-sm font-bold text-primary hover:bg-gold-light sm:text-base">
              <a href="tel:+421905335501">
                <Phone className="h-5 w-5" />
                +421 905 335 501
              </a>
            </Button>
            <Button asChild className="h-auto min-h-12 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-foreground/90 sm:text-base">
              <a href="mailto:peter@bsga.sk">
                <Mail className="h-5 w-5" />
                peter@bsga.sk
              </a>
            </Button>
          </div>
        </div>

        <div className="order-first mx-auto shrink-0 md:order-last">
          <img
            src={peterPhoto}
            alt="Peter Švajlen – kontaktná osoba BSGA Performance Center"
            loading="lazy"
            decoding="async"
            className="h-36 w-36 rounded-full object-cover object-top ring-4 ring-gold/60 shadow-lg sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56"
          />
        </div>
      </div>
    </div>

    <div className="h-[340px] w-full overflow-hidden rounded-3xl border border-border bg-card sm:h-[440px] lg:h-[520px]">
      <iframe
        title="Interaktívna mapa – BSGA Performance Center, Zuzany Chalupovej 12, Bratislava"
        src="https://www.google.com/maps?q=Zuzany%20Chalupovej%2012%2C%20851%2007%20Bratislava-Petr%C5%BEalka&z=16&hl=sk&output=embed"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
      />
    </div>
  </section>
);

export default PcContactBlock;