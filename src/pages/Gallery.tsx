import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import galleryTeamMen from "@/assets/gallery-team-men.png";
import galleryTraining from "@/assets/gallery-training.png";
import galleryTourAwards from "@/assets/gallery-tour-awards.png";
import galleryTeamTournament from "@/assets/gallery-team-tournament.png";
import galleryTeamWomen from "@/assets/gallery-team-women.png";
import galleryGroupEvent from "@/assets/gallery-group-event.png";
import galleryFlags from "@/assets/gallery-flags.png";
import galleryFullTeam from "@/assets/gallery-full-team.png";
import galleryCourseGroup from "@/assets/gallery-course-group.png";
import galleryKidsTraining from "@/assets/gallery-kids-training.png";
import galleryJuniorGroup from "@/assets/gallery-junior-group.png";
import galleryStageEvent from "@/assets/gallery-stage-event.png";

const images = [
  {
    src: galleryTeamMen,
    alt: "Trojica trénerov BSGA v klubových bundách"
  },
  {
    src: galleryTraining,
    alt: "Individuálny golfový tréning na ihrisku"
  },
  {
    src: galleryTourAwards,
    alt: "BSGA Tour trofeje a partneri turnaja"
  },
  {
    src: galleryTeamTournament,
    alt: "Hráči BSGA pred turnajom na odpalisku"
  },
  {
    src: galleryTeamWomen,
    alt: "Dve členky tímu BSGA v klubovom oblečení"
  },
  {
    src: galleryGroupEvent,
    alt: "Skupinová fotografia účastníkov golfového eventu"
  },
  {
    src: galleryFlags,
    alt: "Vlajky partnerov BSGA Tour pri ihrisku"
  },
  {
    src: galleryFullTeam,
    alt: "Kompletný tím BSGA v klubovom oblečení"
  },
  {
    src: galleryCourseGroup,
    alt: "Skupina golfistov na fairwayi počas zájazdu"
  },
  {
    src: galleryKidsTraining,
    alt: "Tréner BSGA s deťmi na putting greene"
  },
  {
    src: galleryJuniorGroup,
    alt: "Juniorská golfová skupina s trénermi BSGA"
  },
  {
    src: galleryStageEvent,
    alt: "Vyhlasovanie a moderovanie počas eventu BSGA Tour"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return <>
      <Helmet>
        <title>Galéria | BSGA - Best Swing Golf Academy</title>
        <meta name="description" content="Fotogaléria BSGA - nahliadnite do našich tréningov, turnajov a podujatí. Profesionálne golfové momenty z najkrajších slovenských ihrísk." />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative w-full bg-background pt-4 sm:pt-8">
          <div className="px-2 sm:px-4 md:px-8">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-primary py-16 sm:py-24 md:py-32">
              <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
                  Galéria
                </h1>
                <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto px-2">Zábery z tréningov, turnajov a eventov</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {images.map((image, index) => <button key={index} onClick={() => setSelectedImage(index)} className="group relative aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm sm:text-base">
                      Zobraziť
                    </span>
                  </div>
                </button>)}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage !== null && <div className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-2 sm:p-4" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-4 right-4 sm:top-6 sm:right-6 text-primary-foreground hover:text-gold transition-colors z-10" onClick={() => setSelectedImage(null)}>
              <X size={28} className="sm:w-8 sm:h-8" />
            </button>
            <img src={images[selectedImage].src} alt={images[selectedImage].alt} className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-md sm:rounded-lg" onClick={e => e.stopPropagation()} />
          </div>}
      </main>
      <Footer />
    </>;
};

export default Gallery;
