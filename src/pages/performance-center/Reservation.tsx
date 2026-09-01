import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import BookingCalendar from "@/components/performance-center/BookingCalendar";

const Reservation = () => (
  <div className="space-y-6">
    <SEO
      title="Rezervácia simulátora | BSGA Performance Center"
      description="Rezervačný kalendár golfových simulátorov Trackman 4 a Trackman iO v BSGA Performance Center Bratislava. Vyberte si termín a dĺžku tréningu online."
      path="/admin/performance-center/rezervacia"
      noindex
    />
    <header className="space-y-3">
      <Link
        to="/admin/performance-center"
        className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
      >
        ← Performance Center
      </Link>
      <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Rezervácia simulátora</h1>
      <div className="h-px w-24 bg-primary" />
    </header>
    <BookingCalendar />
  </div>
);

export default Reservation;