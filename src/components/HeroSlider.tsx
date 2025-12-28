import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import heroImage1 from "@/assets/hero-golf-1.jpg";
import heroImage2 from "@/assets/hero-golf-2.jpg";
import heroImage3 from "@/assets/hero-golf-3.jpg";
const slides = [{
  image: heroImage1,
  title: "Best Swing Golf Academy",
  subtitle: "Najväčšia golfová akadémia na Slovensku"
}, {
  image: heroImage2,
  title: "Profesionálni tréneri",
  subtitle: "Plne kvalifikovaní PGA profesionáli"
}, {
  image: heroImage3,
  title: "Začni svoju cestu",
  subtitle: "Golf pre všetky vekové kategórie"
}];
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };
  return;
};
export default HeroSlider;