import { X } from "lucide-react";
import SEO from "@/components/SEO";
import GreenCardQuiz from "@/components/GreenCardQuiz";

const EducationTests = () => {
  const quizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Záverečný test zelenej karty",
    url: "https://bsga.sk/edukacne-centrum/testy",
    inLanguage: "sk",
    educationalLevel: "Beginner",
    about: { "@type": "Thing", name: "Pravidlá golfu a golfová etiketa" },
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Golf – pravidlá a etiketa",
    },
    provider: { "@id": "https://bsga.sk/#organization" },
  };
  return (
    <>
      <SEO
        title="Záverečný test ZK | Edukačné centrum | BSGA"
        description="Záverečný test na zelenú kartu od BSGA – otestujte si online znalosti golfových pravidiel, etikety a bezpečnosti na ihrisku pred získaním zelenej karty."
        path="/edukacne-centrum/testy"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Edukačné centrum", url: "https://bsga.sk/edukacne-centrum" },
          { name: "Záverečný test ZK", url: "https://bsga.sk/edukacne-centrum/testy" },
        ]}
        jsonLd={quizJsonLd}
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
          <h1 className="mb-6 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Záverečný test golfových pravidiel a etiky
          </h1>
          <GreenCardQuiz />
        </div>
      </main>
    </>
  );
};

export default EducationTests;
