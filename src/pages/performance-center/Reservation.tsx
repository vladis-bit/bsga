import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BookingCalendar from "@/components/performance-center/BookingCalendar";

const Reservation = () => (
  <>
    <SEO
      title="Rezervácia simulátora | BSGA Performance Center"
      description="Rezervačný kalendár golfových simulátorov Trackman 4 a Trackman iO v BSGA Performance Center Bratislava. Vyberte si termín a dĺžku tréningu online."
      path="/performance-center/rezervacia"
      breadcrumbs={[
        { name: "Domov", url: "https://bsga.sk/" },
        { name: "Performance Center", url: "https://bsga.sk/performance-center" },
        { name: "Rezervácia", url: "https://bsga.sk/performance-center/rezervacia" },
      ]}
    />
    <Navbar />
    <div className="theme-ivory min-h-screen bg-background text-foreground">
      <main>
        <section className="bg-background pb-10 pt-24 sm:pb-12 sm:pt-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <Link to="/performance-center" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Performance Center
              </Link>
              <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl">Rezervácia simulátora</h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-xl">Vyberte si simulátor, dátum a čas vášho indoor tréningu.</p>
            </div>
          </div>
        </section>
        <section className="bg-background pb-20 md:pb-28">
          <div className="container mx-auto px-4 sm:px-6"><BookingCalendar /></div>
        </section>
      </main>
    </div>
    <Footer />
  </>
);

export default Reservation;