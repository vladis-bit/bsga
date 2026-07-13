import { X } from "lucide-react";
import SEO from "@/components/SEO";
import GreenCardQuiz from "@/components/GreenCardQuiz";

const EducationTests = () => {
  return (
    <>
      <SEO
        title="Záverečný test ZK | Edukačné centrum | BSGA"
        description="Záverečné otázky na zelenú kartu - otestujte svoje znalosti golfovej etikety a pravidiel."
        path="/edukacne-centrum/testy"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Edukačné centrum", url: "https://bsga.sk/edukacne-centrum" },
          { name: "Záverečný test ZK", url: "https://bsga.sk/edukacne-centrum/testy" },
        ]}
      />

      <main className="min-h-screen bg-white text-slate-900">
        <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => window.close()}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
              aria-label="Zatvoriť test"
            >
              <X className="h-4 w-4" />
              Zavrieť
            </button>
          </div>
          <GreenCardQuiz />
        </div>
      </main>
    </>
  );
};

export default EducationTests;
