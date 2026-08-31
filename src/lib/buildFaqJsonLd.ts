export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Builds a schema.org FAQPage JSON-LD object accepted by the SEO component's `jsonLd` prop.
 */
export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
