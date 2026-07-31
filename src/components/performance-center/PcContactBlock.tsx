/**
 * Kontaktný blok BSGA Performance Center + Google mapa.
 * Bez závislosti na admin sekcii – dá sa použiť aj na verejných stránkach.
 */
const PcContactBlock = () => (
  <section className="overflow-hidden rounded-3xl border border-border bg-card">
    <div className="grid gap-0 lg:grid-cols-2">
      <div className="space-y-4 p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">Kontakt</p>
        <h2 className="font-serif text-2xl text-foreground sm:text-3xl">BSGA Performance Center</h2>
        <div className="space-y-2 text-sm text-muted-foreground sm:text-base">
          <p>
            Zuzany Chalupovej 12
            <br />
            851 07 Bratislava
            <br />
            Slovenská republika
          </p>
          <p>
            <a className="font-bold text-foreground hover:text-primary" href="mailto:peter@bsga.sk">
              peter@bsga.sk
            </a>
            <br />
            <a className="font-bold text-foreground hover:text-primary" href="tel:+421905335501">
              +421 905 335 501
            </a>
          </p>
        </div>
      </div>
      <div className="min-h-[260px] w-full border-t border-border lg:border-l lg:border-t-0">
        <iframe
          title="Mapa – BSGA Performance Center, Zuzany Chalupovej 12, Bratislava"
          src="https://www.google.com/maps?q=Zuzany%20Chalupovej%2012%2C%20Bratislava&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full min-h-[260px] w-full"
        />
      </div>
    </div>
  </section>
);

export default PcContactBlock;