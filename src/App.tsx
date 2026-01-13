import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Tour from "./pages/Tour";
import Akademia from "./pages/Akademia";
import Gallery from "./pages/Gallery";
import GDPR from "./pages/GDPR";
import EducationCenter from "./pages/EducationCenter";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/o-nas" element={<About />} />
            <Route path="/sluzby" element={<Services />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/akademia" element={<Akademia />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/edukacne-centrum" element={<EducationCenter />} />
            <Route path="/obchod" element={<Shop />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
