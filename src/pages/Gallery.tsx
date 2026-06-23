import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import galleryTeamMen from "@/assets/gallery-team-men.webp";
import galleryTraining from "@/assets/gallery-training.webp";
import galleryTourAwards from "@/assets/gallery-tour-awards.webp";
import galleryTeamTournament from "@/assets/gallery-team-tournament.webp";
import galleryTeamWomen from "@/assets/gallery-team-women.webp";
import galleryGroupEvent from "@/assets/gallery-group-event.webp";
import galleryFlags from "@/assets/gallery-flags.webp";
import galleryFullTeam from "@/assets/gallery-full-team.webp";
import galleryCourseGroup from "@/assets/gallery-course-group.webp";
import galleryKidsTraining from "@/assets/gallery-kids-training.webp";
import galleryJuniorGroup from "@/assets/gallery-junior-group.webp";
import galleryStageEvent from "@/assets/gallery-stage-event.webp";
import gallerySelfie from "@/assets/gallery-selfie-course.webp";
import galleryStAndrews from "@/assets/gallery-st-andrews.webp";
import galleryTeamGreen from "@/assets/gallery-team-green.webp";
import galleryTrioGreen from "@/assets/gallery-trio-green.webp";
import galleryDuoClubhouse from "@/assets/gallery-duo-clubhouse.webp";
import gallerySunsetJump from "@/assets/gallery-sunset-jump.webp";
import galleryNycDuo from "@/assets/gallery-nyc-duo.webp";
import galleryJuniorChipping from "@/assets/gallery-junior-chipping.webp";
import galleryTourCheckpoint from "@/assets/gallery-tour-checkpoint.webp";
import galleryAwardCeremony from "@/assets/gallery-award-ceremony.webp";
import galleryClubhouseGroup from "@/assets/gallery-clubhouse-group.webp";
import galleryKidsCamp from "@/assets/gallery-kids-camp.webp";
import galleryTrophies from "@/assets/gallery-trophies.webp";
import galleryDuoCourse from "@/assets/gallery-duo-course.webp";
import galleryKidsCampLine from "@/assets/gallery/photo-30.webp";
import gallerySwingStatue from "@/assets/gallery/photo-31.webp";
import galleryDuoRange from "@/assets/gallery/photo-32.webp";
import galleryTeamClubhouseBig from "@/assets/gallery/photo-33.webp";
import upload8 from "@/assets/gallery/upload-8.png.asset.json";
import upload9 from "@/assets/gallery/upload-9.png.asset.json";
import upload10 from "@/assets/gallery/upload-10.png.asset.json";
import upload11 from "@/assets/gallery/upload-11.png.asset.json";
import upload12 from "@/assets/gallery/upload-12.png.asset.json";
import upload13 from "@/assets/gallery/upload-13.png.asset.json";
import upload14 from "@/assets/gallery/upload-14.png.asset.json";
import upload15 from "@/assets/gallery/upload-15.png.asset.json";
import upload16 from "@/assets/gallery/upload-16.png.asset.json";

const images = [
  {
    src: galleryTeamClubhouseBig,
    alt: "Tím BSGA s partnermi v klubovni"
  },
  {
    src: gallerySwingStatue,
    alt: "Tréneri BSGA pri soche golfistu"
  },
  {
    src: galleryDuoRange,
    alt: "Dvaja tréneri BSGA na driving range"
  },
  {
    src: galleryKidsCampLine,
    alt: "Detský golfový kemp - rozcvička na ihrisku"
  },
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
  },
  {
    src: galleryNycDuo,
    alt: "Dvaja tréneri BSGA na výlete v New Yorku"
  },
  {
    src: galleryJuniorChipping,
    alt: "Juniorský tréning čipovania na ihrisku"
  },
  {
    src: galleryTourCheckpoint,
    alt: "Check point partnera počas turnaja BSGA Tour"
  },
  {
    src: galleryAwardCeremony,
    alt: "Odovzdávanie cien víťazovi turnaja BSGA"
  },
  {
    src: galleryClubhouseGroup,
    alt: "Skupina účastníkov golfového zájazdu v klubovni"
  },
  {
    src: galleryKidsCamp,
    alt: "Detský golfový kemp s trénerkou BSGA"
  },
  {
    src: galleryTrophies,
    alt: "Trofeje a ceny BSGA Tour na stole"
  },
  {
    src: galleryDuoCourse,
    alt: "Dvaja golfisti na ihrisku počas tréningu"
  }
];

const extraImages = [
  { src: upload8.url, alt: "Pár v záhrade pri západe slnka" },
  { src: upload9.url, alt: "Skupinová selfie BSGA na ihrisku v Španielsku" },
  { src: upload10.url, alt: "Selfie štvorice golfistov na fairwayi" },
  { src: upload11.url, alt: "Mladý tím BSGA v bielych pološkách" },
  { src: upload12.url, alt: "Juniorský tím BSGA s trofejami" },
  { src: upload13.url, alt: "Moderovanie BSGA Tour s mikrofónom" },
  { src: upload14.url, alt: "Veľká skupina študentov na golfovom kempe" },
  { src: upload15.url, alt: "Tím BSGA pri Ryder Cup Camiral 2031" },
  { src: upload16.url, alt: "Skupinová fotografia golfistov na odpalisku" },
];

// Insert extra images at scattered positions for a random feel
const insertPositions = [1, 4, 7, 10, 13, 17, 21, 25, 28];
insertPositions.forEach((pos, i) => {
  images.splice(pos + i, 0, extraImages[i]);
});

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
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
              <img src={images[selectedImage].src} alt={images[selectedImage].alt} decoding="async" className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-md sm:rounded-lg" onClick={e => e.stopPropagation()} />
            </div>}
        </main>
      </AuroraBackground>
      <Footer />
    </>;
};

export default Gallery;
