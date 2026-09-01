/**
 * Zdieľané Schema.org objekty pre BSGA.
 * Všetko odkazuje na jednu Organization entitu (`ORGANIZATION_ID`),
 * aby Google chápal lokality a služby ako súčasť jednej firmy.
 */

export const SITE_URL = "https://bsga.sk";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SAME_AS = [
  "https://www.instagram.com/bsga.sk/",
  "https://www.facebook.com/p/Best-Swing-Golf-Academy-100057246887696/",
  "https://linktr.ee/BSGAmedia",
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Best Swing Golf Academy",
  alternateName: "BSGA",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.png`,
    caption: "Best Swing Golf Academy",
  },
  image: `${SITE_URL}/og/default.jpg`,
  description:
    "Najväčšia golfová akadémia na Slovensku od roku 2016. Individuálne a skupinové lekcie, zelené karty, juniorský golf, fitting a firemné akcie.",
  foundingDate: "2016",
  email: "info@bsga.sk",
  telephone: "+421917225276",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zuzany Chalupovej 12",
    postalCode: "851 07",
    addressLocality: "Bratislava",
    addressRegion: "Bratislavský kraj",
    addressCountry: "SK",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+421917225276",
      email: "info@bsga.sk",
      contactType: "customer service",
      areaServed: "SK",
      availableLanguage: ["sk", "en"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+421911994888",
      email: "kids@bsga.sk",
      contactType: "sales",
      areaServed: "SK",
      availableLanguage: ["sk", "en"],
    },
  ],
  areaServed: ["Bratislava", "Nitra", "Hrubá Borša", "Slovensko"],
  sameAs: SAME_AS,
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "Best Swing Golf Academy",
  alternateName: "BSGA",
  inLanguage: "sk-SK",
  publisher: { "@id": ORGANIZATION_ID },
};

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type LocationInput = {
  id: string;
  name: string;
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  telephone: string;
  email: string;
  image: string;
  hasMap: string;
  opens: string;
  closes: string;
  areaServed: string[];
};

const buildLocation = (l: LocationInput) => ({
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": `${SITE_URL}/#${l.id}`,
  name: l.name,
  url: `${SITE_URL}/`,
  image: l.image,
  telephone: l.telephone,
  email: l.email,
  priceRange: "€€",
  sport: "Golf",
  currenciesAccepted: "EUR",
  paymentAccepted: "Hotovosť, Platobná karta, Bankový prevod",
  address: {
    "@type": "PostalAddress",
    streetAddress: l.street,
    postalCode: l.postalCode,
    addressLocality: l.locality,
    addressRegion: l.region,
    addressCountry: "SK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: l.latitude,
    longitude: l.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ALL_DAYS,
      opens: l.opens,
      closes: l.closes,
    },
  ],
  hasMap: l.hasMap,
  areaServed: l.areaServed.map((name) => ({ "@type": "City", name })),
  parentOrganization: { "@id": ORGANIZATION_ID },
});

export const performanceCenterLocation = buildLocation({
  id: "localbusiness",
  name: "BSGA Performance Center Bratislava",
  street: "Zuzany Chalupovej 12",
  postalCode: "851 07",
  locality: "Bratislava",
  region: "Bratislavský kraj",
  latitude: 48.1108,
  longitude: 17.1247,
  telephone: "+421911994888",
  email: "info@bsga.sk",
  image: `${SITE_URL}/og/default.jpg`,
  hasMap: "https://www.google.com/maps?q=Zuzany+Chalupovej+12,+851+07+Bratislava",
  opens: "07:00",
  closes: "22:00",
  areaServed: ["Bratislava", "Pezinok", "Senec", "Trnava"],
});

export const hrubaBorsaLocation = buildLocation({
  id: "location-hruba-borsa",
  name: "Best Swing Golf Academy — Hrubá Borša (GKHB)",
  street: "Golf Klub Hrubá Borša",
  postalCode: "925 32",
  locality: "Hrubá Borša",
  region: "Trnavský kraj",
  latitude: 48.1667,
  longitude: 17.4333,
  telephone: "+421917225276",
  email: "info@bsga.sk",
  image: `${SITE_URL}/og/akademia.jpg`,
  hasMap: "https://www.google.com/maps?q=Golf+Klub+Hrub%C3%A1+Bor%C5%A1a",
  opens: "08:00",
  closes: "20:00",
  areaServed: ["Senec", "Bratislava", "Trnava"],
});

export const nitraLocation = buildLocation({
  id: "location-nitra",
  name: "Best Swing Golf Academy — Nitra (Red Oak Golf Club)",
  street: "Red Oak Golf Club",
  postalCode: "949 01",
  locality: "Nitra",
  region: "Nitriansky kraj",
  latitude: 48.3069,
  longitude: 18.0764,
  telephone: "+421917225276",
  email: "info@bsga.sk",
  image: `${SITE_URL}/og/default.jpg`,
  hasMap: "https://www.google.com/maps?q=Red+Oak+Golf+Club+Nitra",
  opens: "08:00",
  closes: "20:00",
  areaServed: ["Nitra", "Zlaté Moravce", "Šaľa"],
});

export const allLocations = [
  performanceCenterLocation,
  hrubaBorsaLocation,
  nitraLocation,
];
