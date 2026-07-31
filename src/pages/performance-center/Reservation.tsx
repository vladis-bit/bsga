import { Link } from "react-router-dom";
import BookingCalendar from "@/components/performance-center/BookingCalendar";

const Reservation = () => (
  <div className="space-y-6">
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