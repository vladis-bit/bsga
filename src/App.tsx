import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
const CookieBanner = lazy(() => import("./components/CookieBanner"));
const MobileCTABar = lazy(() => import("./components/MobileCTABar"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Tour = lazy(() => import("./pages/Tour"));
const Akademia = lazy(() => import("./pages/Akademia"));
const Gallery = lazy(() => import("./pages/Gallery"));
const GDPR = lazy(() => import("./pages/GDPR"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const EducationCenter = lazy(() => import("./pages/EducationCenter"));
const EducationTests = lazy(() => import("./pages/EducationTests"));
const EducationCalculators = lazy(() => import("./pages/EducationCalculators"));
const Shop = lazy(() => import("./pages/Shop"));
const Fitting = lazy(() => import("./pages/Fitting"));
const CorporateEvents = lazy(() => import("./pages/CorporateEvents"));
const Events = lazy(() => import("./pages/Events"));
const StartGolf = lazy(() => import("./pages/StartGolf"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen bg-primary" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/o-nas" element={<About />} />
            <Route path="/sluzby" element={<Services />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/akademia" element={<Akademia />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/edukacne-centrum" element={<EducationCenter />} />
            <Route path="/edukacne-centrum/testy" element={<EducationTests />} />
            <Route path="/edukacne-centrum/kalkulacky" element={<EducationCalculators />} />
            
            <Route path="/obchod" element={<Shop />} />
            <Route path="/fitting" element={<Fitting />} />
            <Route path="/firemne-akcie" element={<CorporateEvents />} />
            <Route path="/eventy" element={<Events />} />
            <Route path="/zacni-s-golfom" element={<StartGolf />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/obchodne-podmienky" element={<TermsAndConditions />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <CookieBanner />
            <MobileCTABar />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
