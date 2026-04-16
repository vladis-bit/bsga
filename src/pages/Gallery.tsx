import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
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
import gallerySelfie from "@/assets/gallery-selfie-course.png";
import galleryStAndrews from "@/assets/gallery-st-andrews.png";
import galleryTeamGreen from "@/assets/gallery-team-green.png";
import galleryTrioGreen from "@/assets/gallery-trio-green.png";
import galleryDuoClubhouse from "@/assets/gallery-duo-clubhouse.png";
import gallerySunsetJump from "@/assets/gallery-sunset-jump.png";
import galleryNycDuo from "@/assets/gallery-nyc-duo.png";
import galleryJuniorChipping from "@/assets/gallery-junior-chipping.png";
import galleryTourCheckpoint from "@/assets/gallery-tour-checkpoint.png";
import galleryAwardCeremony from "@/assets/gallery-award-ceremony.png";
import galleryClubhouseGroup from "@/assets/gallery-clubhouse-group.png";
import galleryKidsCamp from "@/assets/gallery-kids-camp.png";
import galleryTrophies from "@/assets/gallery-trophies.png";
import galleryDuoCourse from "@/assets/gallery-duo-course.png";

const images = [
  {
    src: galleryTraining,
    alt: "Individuálny golfový tréning na ihrisku"
  },
  {
    src: galleryTeamMen,
    alt: "Trojica trénerov BSGA v klubových bundách"
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
  },
  {
    src: gallerySelfie,
    alt: "Selfie trénerov BSGA na golfovom ihrisku"
  },
  {
    src: galleryStAndrews,
    alt: "Tréner BSGA na legendárnom moste St Andrews"
  },
  {
    src: galleryTeamGreen,
    alt: "Tím BSGA v zelených dresoch"
  },
  {
    src: galleryTrioGreen,
    alt: "Trojica hráčov BSGA na ihrisku v zelenom"
  },
  {
    src: galleryDuoClubhouse,
    alt: "Dvaja tréneri BSGA pred klubovňou"
  },
  {
    src: gallerySunsetJump,
    alt: "Tím BSGA skáče pri západe slnka"
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
      <AuroraBackground variant="silver">
        <main className="bg-transparent pt-24 sm:pt-28 md:pt-32">
          <section className="bg-transparent pb-12 pt-2 sm:pb-16 sm:pt-4 md:pb-24 md:pt-6">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-8 text-center sm:mb-10 md:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground">
                  Galéria
                </h1>
                <p className="mt-3 text-base text-foreground/75 sm:text-lg max-w-2xl mx-auto px-2">
                  Zábery z tréningov, turnajov a eventov
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {images.map((image, index) => <button key={index} onClick={() => setSelectedImage(index)} className="group relative aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl shadow-black/10">
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

          {selectedImage !== null && <div className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-2 sm:p-4" onClick={() => setSelectedImage(null)}>
              <button className="absolute top-4 right-4 sm:top-6 sm:right-6 text-primary-foreground hover:text-gold transition-colors z-10" onClick={() => setSelectedImage(null)}>
                <X size={28} className="sm:w-8 sm:h-8" />
              </button>
              <img src={images[selectedImage].src} alt={images[selectedImage].alt} className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-md sm:rounded-lg" onClick={e => e.stopPropagation()} />
            </div>}
        </main>
      </AuroraBackground>
      <Footer />
    </>;
};

export default Gallery;
