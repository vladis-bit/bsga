import Navbar from "@/components/Navbar";

import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Mail, FileText, Trophy } from "lucide-react";
import asbisAsset from "@/assets/partner-asbis.webp.asset.json";
import checkpointAsset from "@/assets/partner-checkpoint.webp.asset.json";
import vitaziAsset from "@/assets/tour-promos/vitazi-bsga-tour-2026.pdf.asset.json";
import bozinAsset from "@/assets/partners/partner-bozin-roastery.webp.asset.json";
import lahoferAsset from "@/assets/partners/partner-lahofer.webp.asset.json";
import nilioAsset from "@/assets/partners/partner-nilio.webp.asset.json";
import stNicolausAsset from "@/assets/partners/partner-st-nicolaus.webp.asset.json";
import xpengHedinAsset from "@/assets/partners/partner-xpeng-hedin.webp.asset.json";
import arcgeoAsset from "@/assets/partners/partner-arcgeo.webp.asset.json";
import brokerConsultingAsset from "@/assets/partners/partner-broker-consulting.webp.asset.json";
import cylliumAsset from "@/assets/partners/partner-cyllium.webp.asset.json";
import dolgitAsset from "@/assets/partners/partner-dolgit.webp.asset.json";
import gapitAsset from "@/assets/partners/partner-gapit.webp.asset.json";
import homolaAsset from "@/assets/partners/partner-homola.webp.asset.json";
import megawattsAsset from "@/assets/partners/partner-megawatts.webp.asset.json";
import metlifeAsset from "@/assets/partners/partner-metlife.webp.asset.json";
import mobilneChladenieAsset from "@/assets/partners/partner-mobilne-chladenie.webp.asset.json";
import o2BusinessServicesAsset from "@/assets/partners/partner-o2-business-services.webp.asset.json";
import procedConsultingAsset from "@/assets/partners/partner-proced-consulting.webp.asset.json";
import plautAsset from "@/assets/partners/partner-plaut.webp.asset.json";
import starsForStarsAsset from "@/assets/partners/partner-stars-for-stars.webp.asset.json";
import technopolAsset from "@/assets/partners/partner-technopol.webp.asset.json";
import torreolAsset from "@/assets/partners/partner-torreol.webp.asset.json";
import unionAsset from "@/assets/partners/partner-union.webp.asset.json";
import uniqaAsset from "@/assets/partners/partner-uniqa.webp.asset.json";
import unityAsset from "@/assets/partners/partner-unity.webp.asset.json";
import vnetAsset from "@/assets/partners/partner-vnet.webp.asset.json";
import itcAsset from "@/assets/partners/partner-itc.webp.asset.json";
import jucad2Asset from "@/assets/partners/partner-jucad-2.webp.asset.json";
import TournamentCard from "@/components/TournamentCard";
import { tournamentTitle } from "@/lib/ordinals";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import promo1Asset from "@/assets/tour-promos/promo-tour-1.pdf.asset.json";
import promo2Asset from "@/assets/tour-promos/promo-tour-2.pdf.asset.json";
import promo3Asset from "@/assets/tour-promos/promo-tour-3.pdf.asset.json";
import promo4Asset from "@/assets/tour-promos/promo-tour-4.pdf.asset.json";
import promo5Asset from "@/assets/tour-promos/promo-tour-5.pdf.asset.json";
import rd4StandingsAsset from "@/assets/tour-promos/bsga-tour-rd4.pdf.asset.json";
import tour5FinalAsset from "@/assets/tour-promos/bsga-tour5-final.pdf.asset.json";


import hrubaBorsaImg from "@/assets/courses/hruba-borsa.webp";
import taleImg from "@/assets/courses/tale.webp";
import heritageImgAsset from "@/assets/courses/heritage.jpg.asset.json";
const heritageImg = heritageImgAsset.url;
import legendImg from "@/assets/courses/legend.webp";
import ostraviceImg from "@/assets/courses/ostravice.webp";
import sedinImg from "@/assets/courses/sedin.webp";
import kaskadaImg from "@/assets/courses/kaskada.webp";
import redOakAsset from "@/assets/courses/red-oak-nitra.webp.asset.json";
const redOakImg = redOakAsset.url;
import kacovAsset from "@/assets/courses/panorama-kacov.webp.asset.json";
const kacovImg = kacovAsset.url;
import apexAsset from "@/assets/apex-golf-club.webp.asset.json";
const apexImg = apexAsset.url;
import tour2026Card1Asset from "@/assets/courses/tour-2026-card-1.webp.asset.json";
import tour2026Card2Asset from "@/assets/courses/tour-2026-card-2.webp.asset.json";
import tour2026Card3Asset from "@/assets/courses/tour-2026-card-3.webp.asset.json";
import tour2026Card4Asset from "@/assets/courses/tour-2026-card-4.webp.asset.json";
import tour2026Card5Asset from "@/assets/courses/tour-2026-card-5.webp.asset.json";

interface ProductPartner {
  name: string;
  logo: string;
  logoClass?: string;
}

const productPartners: ProductPartner[] = [
  { name: "Bozin Roastery", logo: bozinAsset.url },
  { name: "Lahofer Vinařství", logo: lahoferAsset.url, logoClass: "max-w-[80%] max-h-[75%]" },
  { name: "Nilio Brewery", logo: nilioAsset.url, logoClass: "max-w-[85%] max-h-[80%]" },
  { name: "St. Nicolaus", logo: stNicolausAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "XPeng Hedin Automotive", logo: xpengHedinAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "JuCad", logo: jucad2Asset.url, logoClass: "max-w-[92%] max-h-[80%]" },
];

const tourPartners: ProductPartner[] = [
  { name: "Arcgeo", logo: arcgeoAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Broker Consulting", logo: brokerConsultingAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Cyllium", logo: cylliumAsset.url, logoClass: "max-w-[80%] max-h-[80%]" },
  { name: "Dolgit", logo: dolgitAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Gapit", logo: gapitAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Homola", logo: homolaAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Megawatts", logo: megawattsAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Metlife", logo: metlifeAsset.url, logoClass: "max-w-[80%] max-h-[80%]" },
  { name: "Mobilné chladenie", logo: mobilneChladenieAsset.url, logoClass: "max-w-[92%] max-h-[85%]" },
  { name: "O2 Business Services", logo: o2BusinessServicesAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Proced Consulting", logo: procedConsultingAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Plaut", logo: plautAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Stars for Stars", logo: starsForStarsAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Technopol International", logo: technopolAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Torreol", logo: torreolAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Union poisťovňa", logo: unionAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "UNIQA", logo: uniqaAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "Unity Media", logo: unityAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "VNET", logo: vnetAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
  { name: "ITC", logo: itcAsset.url, logoClass: "max-w-[92%] max-h-[80%]" },
];

const tournaments = [
  {
    number: 1,
    date: "15.5.2026",
    location: "Hrubá Borša",
    image: tour2026Card1Asset.url,
    presenter: "NN",
    promoUrl: promo1Asset.url,
    links: { locationUrl: "https://maps.app.goo.gl/4RYGX7fM6i6JNign6", resultsUrl: "https://www.skga.sk/turnaje/turnaj?id=1000028130", galleryUrl: "https://drive.google.com/drive/folders/1TLphxWdQEHPAuaNvflVUHiIw8qfApUiC?usp=sharing" }
  },
  {
    number: 2,
    date: "5.6.2026",
    location: "Tále",
    image: tour2026Card2Asset.url,
    presenter: "Soitron",
    promoUrl: promo2Asset.url,
    links: { locationUrl: "https://maps.app.goo.gl/etftEGLtnH7MNFyBA", resultsUrl: "https://www.skga.sk/turnaje/turnaj?id=1000028133", galleryUrl: "https://drive.google.com/drive/folders/1WsLb9zka0RqK7mYmQU-koTFq_0IgcpOP?usp=sharing" }
  },
  {
    number: 3,
    date: "17.7.2026",
    location: "Penati Heritage",
    image: tour2026Card3Asset.url,
    presenter: "ELV produkt a.s.",
    promoUrl: promo3Asset.url,
    links: { locationUrl: "https://maps.app.goo.gl/BZufvXZoWCtmWYgj9", resultsUrl: "https://www.golfgenius.com/pages/12463043224119850432", galleryUrl: "https://drive.google.com/drive/folders/1D6lcI6d3Ojp6wXup8qxJmXqqY88ed_LX?usp=drive_link" }
  },
  {
    number: 4,
    date: "14.8.2026",
    location: "Penati Legend",
    image: tour2026Card4Asset.url,
    presenter: "ELcomp s.r.o.",
    promoUrl: promo4Asset.url,
    links: { locationUrl: "https://maps.app.goo.gl/BZufvXZoWCtmWYgj9", resultsUrl: "https://www.golfgenius.com/pages/12463049917557945799", galleryUrl: "https://drive.google.com/drive/folders/12TcsW8fck2_i5miq28QNIDxl_tdyDmpu?usp=drive_link" }
  },
  {
    number: 5,
    date: "4.9.2026",
    location: "Ostravice",
    image: tour2026Card5Asset.url,
    presenter: "Altron",
    promoUrl: promo5Asset.url,
    links: { locationUrl: "https://maps.app.goo.gl/A3H9g8qwsKDs9DEx7", resultsUrl: "https://www.cgf.cz/cz/turnaje/turnaje-vyhledavani/turnaj?id=1300146509", galleryUrl: "https://drive.google.com/drive/folders/14x4ceHAhcAK09kfIsNbTOSi48UROPHzb?usp=drive_link" }
  }
];

const tournaments2025 = [
  {
    number: 1,
    date: "15.5.2025",
    location: "Sedin Golf Resort",
    image: sedinImg,
    links: { locationUrl: "https://maps.app.goo.gl/8ozSp7g31v1baDVc8", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1KcaYOJLdWfGV59cG3FdUS9K_Ds7ppCq5?usp=sharing" }
  },
  {
    number: 2,
    date: "6.6.2025",
    location: "Grey Bear Tále",
    image: taleImg,
    links: { locationUrl: "https://maps.app.goo.gl/QR5zbcFmDYnCBygr7", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/19Ze1l42gGIKrpISB44pIfiyXa--Zs1Yq?usp=sharing" }
  },
  {
    number: 3,
    date: "11.7.2025",
    location: "Penati - Heritage",
    image: heritageImg,
    links: { locationUrl: "https://maps.app.goo.gl/StdaRFJwztpQWAuX7", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1wGALPYzW8Px-oL7JhTPL8D60ttJCSbzq?usp=sharing" }
  },
  {
    number: 4,
    date: "15.8.2025",
    location: "Penati - Legend",
    image: legendImg,
    links: { locationUrl: "https://maps.app.goo.gl/StdaRFJwztpQWAuX7", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1T5nGSa_EeLylJ-YtDAz1t7-sSlOus7WW?usp=sharing" }
  },
  {
    number: 5,
    date: "5.9.2025",
    location: "Kaskáda Golf Resort",
    image: kaskadaImg,
    links: { locationUrl: "https://maps.app.goo.gl/31e6dkciYh7kvxuE9", resultsUrl: "#", galleryUrl: "https://drive.google.com/drive/folders/1KLktpEYwdaGhSdIcHfo5rJgBFgqVL6T1?usp=sharing" }
  }
];

const tournaments2024 = [
  { number: 1, date: "2024", location: "Sedin Golf Resort", image: sedinImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1F9h7_pAYavpg3URVyeIVJvQfUtTTH8kj?usp=drive_link" } },
  { number: 2, date: "2024", location: "Penati Heritage", image: heritageImg, links: { galleryUrl: "https://drive.google.com/drive/folders/18EFhgHFKbfdTqbTdDBIGHccMIi4yKyh7?usp=drive_link" } },
  { number: 3, date: "2024", location: "Apex Golf Club", image: apexImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1z8B3nC7V-pMWEg21NVxpcpzTo6-rf5Si?usp=drive_link" } },
  { number: 4, date: "2024", location: "Penati Legend", image: legendImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1hNZhuP4o2eORtY2xIqiDuqaVueGvkV7S?usp=drive_link" } },
  { number: 5, date: "2024", location: "Panoráma Kácov", image: kacovImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1wkWsmRjY9u-xN7hGpYfbj5o44WMSCwHB?usp=drive_link" } },
];

const tournaments2023 = [
  { number: 1, date: "2023", location: "Red Oak Nitra", image: redOakImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1UlBQtMT_06Kc9D054-rLqOrut9MtJKEG?usp=drive_link" } },
  { number: 2, date: "2023", location: "Sedin Golf Resort", image: sedinImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1E5N9RDdO-pMmHxZtZ3AmPXOZ3ct9i4Hk?usp=drive_link" } },
  { number: 3, date: "2023", location: "Apex Golf Club", image: apexImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1ARvyCLjz0E0XKMQsPHOtpOCaUL7dtRL9?usp=drive_link" } },
  { number: 4, date: "2023", location: "Penati Legend", image: legendImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1XeHbJ6TIeOyMBlv8vn8CwyWNlAqSiSBZ?usp=drive_link" } },
  { number: 5, date: "2023", location: "Penati Heritage", image: heritageImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1RGrsDKs-OLBJxxByT73nRcWtNjW93UhL?usp=drive_link" } },
];

const tournaments2022 = [
  { number: 1, date: "2022", location: "Red Oak Nitra", image: redOakImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1LtdBgABivavBaUdljQ1rv-JNmwyo7ibj?usp=drive_link" } },
  { number: 2, date: "2022", location: "Sedin Golf Resort", image: sedinImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1GOAvOjffOmL7N3x3kHnc1hQlx3pE4lmE?usp=drive_link" } },
  { number: 3, date: "2022", location: "Penati Heritage", image: heritageImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1NEedCiAGgdeDCe6KpE7g-uDouCxw1oX1?usp=drive_link" } },
  { number: 4, date: "2022", location: "Penati Legend", image: legendImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1GL1QRqcc0MKndx5qN3Vux1ceix9OyGjC?usp=drive_link" } },
  { number: 5, date: "2022", location: "Hrubá Borša", image: hrubaBorsaImg, links: { galleryUrl: "https://drive.google.com/drive/folders/1m2WOPzWxIUhmIzHm8XdeLT1cBHMZKUC9?usp=drive_link" } },
];

const tournaments2027 = [
  { number: 1, date: "TBD", location: "TBD", image: undefined, links: {} },
  { number: 2, date: "TBD", location: "TBD", image: undefined, links: {} },
  { number: 3, date: "TBD", location: "TBD", image: undefined, links: {} },
  { number: 4, date: "TBD", location: "TBD", image: undefined, links: {} },
  { number: 5, date: "TBD", location: "TBD", image: undefined, links: {} },
];

const SITE_URL = "https://bsga.sk";
const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

/** Presné adresy ihrísk – Google Rich Results vyžaduje kompletnú PostalAddress. */
const COURSE_PLACES: Record<string, { name: string; street?: string; locality: string; region?: string; postal?: string; country: string }> = {
  "Hrubá Borša": { name: "Black Stork Golf Resort Hrubá Borša", street: "Hrubá Borša 384", locality: "Hrubá Borša", region: "Bratislavský kraj", postal: "925 23", country: "SK" },
  "Grey Bear Tále": { name: "Gray Bear Golf Club Tále", street: "Tále 100", locality: "Bystrá", region: "Banskobystrický kraj", postal: "977 01", country: "SK" },
  "Penati Heritage": { name: "Penati Golf Resort – Heritage Course", street: "Šenkvická cesta", locality: "Šajdíkove Humence", region: "Trnavský kraj", postal: "906 07", country: "SK" },
  "Penati - Heritage": { name: "Penati Golf Resort – Heritage Course", locality: "Šajdíkove Humence", region: "Trnavský kraj", postal: "906 07", country: "SK" },
  "Penati Legend": { name: "Penati Golf Resort – Legend Course", locality: "Šajdíkove Humence", region: "Trnavský kraj", postal: "906 07", country: "SK" },
  "Penati - Legend": { name: "Penati Golf Resort – Legend Course", locality: "Šajdíkove Humence", region: "Trnavský kraj", postal: "906 07", country: "SK" },
  "Ostravice": { name: "Golf Resort Ostravice", locality: "Ostravice", region: "Moravskoslezský kraj", postal: "739 14", country: "CZ" },
  "Sedin Golf Resort": { name: "Sedin Golf Resort", locality: "Sedín", region: "Nitriansky kraj", country: "SK" },
  "Kaskáda Golf Resort": { name: "Golf Resort Kaskáda", locality: "Jinačovice", region: "Jihomoravský kraj", postal: "664 34", country: "CZ" },
  "Red Oak Nitra": { name: "Red Oak Golf Resort Nitra", locality: "Nitra", region: "Nitriansky kraj", country: "SK" },
  "Panoráma Kácov": { name: "Panorama Golf Resort Kácov", locality: "Kácov", region: "Středočeský kraj", country: "CZ" },
  "Apex Golf Club": { name: "Apex Golf Club", locality: "Bratislava", region: "Bratislavský kraj", country: "SK" },
};

const placeSchema = (location: string, mapUrl?: string) => {
  const p = COURSE_PLACES[location];
  return {
    "@type": "Place",
    name: p?.name ?? location,
    ...(mapUrl && mapUrl !== "#" ? { hasMap: mapUrl } : {}),
    address: {
      "@type": "PostalAddress",
      ...(p?.street ? { streetAddress: p.street } : {}),
      addressLocality: p?.locality ?? location,
      ...(p?.region ? { addressRegion: p.region } : {}),
      ...(p?.postal ? { postalCode: p.postal } : {}),
      addressCountry: p?.country ?? "SK",
    },
  };
};

/** Organizátor sa uvádza inline (nie len cez @id), aby validátor videl povinné pole name. */
const ORGANIZER = {
  "@type": "Organization",
  "@id": "https://bsga.sk/#organization",
  name: "Best Swing Golf Academy",
  url: "https://bsga.sk/",
};

const BREADCRUMBS = [
  { name: "Domov", url: "https://bsga.sk/" },
  { name: "BSGA Tour", url: "https://bsga.sk/tour" },
];

const Tour = () => {
  const toIso = (d: string) => {
    const [day, month, year] = d.split(".");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  const buildEvent = (
    t: { number: number; date: string; location: string; image: string; presenter?: string; links?: { locationUrl?: string } },
    season: number,
    isPast: boolean,
  ) => ({
    "@type": "SportsEvent",
    "@id": `${SITE_URL}/tour#turnaj-${season}-${t.number}`,
    name: `${tournamentTitle(t.number)} ${season} – ${t.location}`,
    description: `${tournamentTitle(t.number)} ${season} sa ${isPast ? "hral" : "hrá"} ${t.date} na ihrisku ${t.location}${t.presenter ? `, presented by ${t.presenter}` : ""}.`,
    image: [abs(t.image)],
    startDate: `${toIso(t.date)}T08:00:00+02:00`,
    endDate: `${toIso(t.date)}T18:00:00+02:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Golf",
    inLanguage: "sk",
    isAccessibleForFree: false,
    location: placeSchema(t.location, t.links?.locationUrl),
    organizer: ORGANIZER,
    performer: { "@type": "SportsTeam", name: "Hráči BSGA Tour" },
    superEvent: { "@id": `${SITE_URL}/tour#seria-${season}` },
    url: `${SITE_URL}/tour`,
  });

  const seriesSchema = (season: number, list: typeof tournaments, isPast: boolean) => ({
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "@id": `${SITE_URL}/tour#seria-${season}`,
    name: `BSGA Tour ${season}`,
    description: `Séria piatich amatérskych golfových turnajov BSGA Tour ${season}.`,
    url: `${SITE_URL}/tour`,
    organizer: ORGANIZER,
    startDate: toIso(list[0].date),
    endDate: toIso(list[list.length - 1].date),
    location: placeSchema(list[0].location, list[0].links?.locationUrl),
    subEvent: list.map((t) => buildEvent(t as never, season, isPast)),
  });

  const tourPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/tour#webpage`,
    name: "BSGA Tour 2026 – termíny a výsledky golfových turnajov",
    description:
      "Kalendár, propozície, priebežné poradie a výsledky amatérskej golfovej série BSGA Tour 2026 na Slovensku a v Česku.",
    url: `${SITE_URL}/tour`,
    inLanguage: "sk-SK",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/tour#seria-2026` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const eventSchemas = [
    tourPageSchema,
    seriesSchema(2026, tournaments, false),
    seriesSchema(2025, tournaments2025 as never, true),
  ];




  return <>
      <SEO
        title="BSGA Tour 2026 – termíny a výsledky golfových turnajov"
        description="Kalendár BSGA Tour 2026: Hrubá Borša, Tále, Penati Heritage, Penati Legend a Ostravice. Propozície, priebežné poradie, výsledky a galérie z turnajov."
        path="/tour"
        image="https://bsga.sk/og/tour.jpg"
        imageAlt="BSGA Tour 2026 – golfové turnaje Best Swing Golf Academy"
        breadcrumbs={BREADCRUMBS}
        preloadImage={ostraviceImg}
        jsonLd={eventSchemas}
      />

      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main>
          {/* Hero – poďakovanie za sezónu 2026 */}
          <section id="tour-hero" data-section="Poďakovanie" className="scroll-mt-28 relative w-full bg-background px-0 pt-28 sm:px-4 sm:pt-32 md:px-6 md:pt-40">
            <div className="container mx-auto px-4 pb-14 text-center sm:px-6 sm:pb-16 md:pb-20">
              <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                <Trophy size={13} /> BSGA Tour 2026
                <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              </span>

              <h1 className="mt-5 text-balance font-serif text-4xl font-bold leading-[1.08] text-foreground sm:mt-6 sm:text-6xl md:text-7xl lg:text-8xl">
                Ďakujeme za úžasnú sezónu
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-lg">
                Desiaty ročník BSGA Tour je za nami. Ďakujeme všetkým hráčom, partnerom a fanúšikom, ktorí ho svojou účasťou a podporou spravili výnimočným.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-lg">
                Tešíme sa na vás opäť na jedenástom ročníku v roku 2027.
              </p>

              <div className="mx-auto mt-8 flex w-full max-w-4xl flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <a
                  href={tour5FinalAsset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-primary transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground active:scale-[0.98] sm:px-10"
                >
                  <Trophy size={16} />
                  Kompletné poradie
                </a>
                <a
                  href={vitaziAsset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-sm font-bold text-foreground transition-colors duration-300 hover:border-gold/60 hover:bg-muted active:scale-[0.98] sm:px-10"
                >
                  <FileText size={16} className="text-gold" />
                  Víťazi BSGA Tour 2026
                </a>
                <a
                  href="mailto:touroffice@bsga.sk?subject=Prihlásenie na 11. ročník turnajov v 2027"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground bg-foreground px-8 py-4 text-sm font-bold text-primary-foreground transition-colors duration-300 hover:bg-background hover:text-foreground active:scale-[0.98] sm:px-10"
                >
                  <Mail size={16} />
                  Prihlásiť sa na 11. ročník
                </a>
              </div>
            </div>
          </section>

          {/* Partners */}
          <section id="tour-generalni-partneri" data-section="Generální partneri" className="scroll-mt-28 bg-muted/50 py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card px-4 py-6 sm:gap-6 sm:px-6 sm:py-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                  Generální partneri
                </span>
                <div className="grid w-full grid-cols-2 items-center justify-items-center gap-3 sm:flex sm:w-auto sm:gap-12 md:gap-16">
                  <div className="flex h-28 w-full max-w-[10rem] items-center justify-center rounded-2xl border border-border bg-card p-3 sm:h-44 sm:w-52 sm:max-w-none md:h-56 md:w-60">
                    <img src={asbisAsset.url} alt="ASBIS logo" loading="lazy" decoding="async" draggable={false} className="max-w-[80%] max-h-[80%] w-auto h-auto object-contain hover:scale-105 transition-transform cursor-pointer select-none" />
                  </div>
                  <div className="flex h-28 w-full max-w-[10rem] items-center justify-center rounded-2xl border border-border bg-card p-3 sm:h-44 sm:w-52 sm:max-w-none md:h-56 md:w-60">
                    <img src={checkpointAsset.url} alt="Check Point logo" loading="lazy" decoding="async" draggable={false} className="max-w-[92%] max-h-[80%] w-auto h-auto object-contain hover:scale-105 transition-transform cursor-pointer select-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tournament Schedule */}
          <section id="tour-dokumenty" data-section="Dokumenty" className="scroll-mt-28 bg-background pt-6 pb-6 sm:pt-8 md:pb-10">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="mb-8 text-center font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:mb-10 sm:text-4xl">
                Dôležité dokumenty
              </h2>
              <div className="flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-4">
                <a href="/documents/BSGA_Tour_2026_propozicie.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-gold/60 hover:bg-muted">
                  <FileText size={16} className="text-gold" />
                  Propozície
                </a>
                <a href="/documents/BSGA_Tour_2026_program.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-gold/60 hover:bg-muted">
                  <FileText size={16} className="text-gold" />
                  Program turnaja
                </a>
                <a href="/documents/BSGA_Tour_2026.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-gold/60 hover:bg-muted">
                  <FileText size={16} className="text-gold" />
                  Prezentácia BSGA Tour
                </a>
                <a href={tour5FinalAsset.url} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-primary transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground sm:w-auto">
                  <Trophy size={16} />
                  Kompletné poradie
                </a>
              </div>

            </div>
          </section>

          {/* Partneri túry */}
          <section id="tour-partneri-tury" data-section="Partneri túry" className="py-12 bg-muted/50 overflow-hidden">
            <div className="container mx-auto px-6 mb-10">
              <div className="mx-auto max-w-xl border-b border-border pb-6 text-center">
                <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-foreground md:text-4xl">Partneri túry</h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
                  Spolupracujeme
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted to-transparent z-10" />

              <div className="flex w-max animate-scroll-tour-partners motion-reduce:animate-none">
                {[...tourPartners, ...tourPartners].map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 px-6 sm:px-8 md:px-10 py-4 flex items-center justify-center"
                  >
                    <div className="flex w-44 h-36 items-center justify-center rounded-2xl border border-border bg-card sm:w-52 sm:h-44 md:w-60 md:h-56">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={`${partner.logoClass ?? "max-w-[80%] max-h-[80%]"} w-auto h-auto object-contain hover:scale-105 transition-transform cursor-pointer select-none`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              @keyframes scroll-tour-partners {
                0% {
                  transform: translate3d(0, 0, 0);
                }
                100% {
                  transform: translate3d(-50%, 0, 0);
                }
              }
              .animate-scroll-tour-partners {
                will-change: transform;
                backface-visibility: hidden;
                transform: translate3d(0, 0, 0);
                animation: scroll-tour-partners 50s linear infinite;
              }
              @media (max-width: 640px) {
                .animate-scroll-tour-partners {
                  animation-duration: 65s;
                }
              }
              @media (hover: hover) {
                .animate-scroll-tour-partners:hover {
                  animation-play-state: paused;
                }
              }
            `}</style>
          </section>

          {/* Produktoví partneri */}
          <section id="tour-product-partneri" data-section="Produktoví partneri" className="py-12 bg-muted/50 overflow-hidden">
            <div className="container mx-auto px-6 mb-10">
              <div className="mx-auto max-w-xl border-b border-border pb-6 text-center">
                <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-foreground md:text-4xl">Produktoví partneri</h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
                  Spolupracujeme
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted to-transparent z-10" />

              <div className="flex w-max animate-scroll-tour motion-reduce:animate-none">
                {[...productPartners, ...productPartners].map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 px-6 sm:px-8 md:px-10 py-4 flex items-center justify-center"
                  >
                    <div className="flex w-44 h-36 items-center justify-center rounded-2xl border border-border bg-card sm:w-52 sm:h-44 md:w-60 md:h-56">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={`${partner.logoClass ?? "max-w-[80%] max-h-[80%]"} w-auto h-auto object-contain hover:scale-105 transition-transform cursor-pointer select-none`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              @keyframes scroll-tour {
                0% {
                  transform: translate3d(0, 0, 0);
                }
                100% {
                  transform: translate3d(-50%, 0, 0);
                }
              }
              .animate-scroll-tour {
                will-change: transform;
                backface-visibility: hidden;
                transform: translate3d(0, 0, 0);
                animation: scroll-tour 22s linear infinite;
              }
              @media (max-width: 640px) {
                .animate-scroll-tour {
                  animation-duration: 30s;
                }
              }
              @media (hover: hover) {
                .animate-scroll-tour:hover {
                  animation-play-state: paused;
                }
              }
            `}</style>
          </section>

          {/* BSGA Tour 2027 — Sneak peek */}
          <section id="tour-2027" data-section="Tour 2027" className="scroll-mt-28 bg-muted/30 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2027
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">11. ročník</p>
                </div>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40 md:block">
                  Dátumy a lokality budú čoskoro
                </span>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2027.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          season="2027"
                          image={tournament.image}
                          links={tournament.links}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>

          {/* Registration */}
          <section id="tour-registracia" data-section="Registrácia" className="scroll-mt-28 bg-foreground py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-muted p-8 text-center sm:p-10 md:p-12">
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Oslovila vás BSGA Tour ?</h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">Pre prihlásenie alebo viac informácií nás kontaktujte</p>
                <a href="mailto:touroffice@bsga.sk" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-bold text-primary transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground">
                  <Mail size={18} />
                  touroffice@bsga.sk
                </a>
              </div>
            </div>
          </section>

          {/* BSGA Tour 2026 */}
          <section id="tour-2026" data-section="Archív 2026" className="scroll-mt-28 bg-background py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2026
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Archív — 10. ročník</p>
                </div>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40 md:block">
                  {"\n"}
                </span>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          season="2026"
                          image={tournament.image}
                          presenter={tournament.presenter}
                          links={tournament.links}
                          promoUrl={tournament.promoUrl}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>

          {/* BSGA Tour 2025 */}
          <section id="tour-2025" data-section="Archív 2025" className="scroll-mt-28 bg-muted/50 py-16 md:py-24">

            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2025
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Archív — 9. ročník</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2025.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          season="2025"
                          image={tournament.image}
                          links={tournament.links}
                          hideResults
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>
          {/* BSGA Tour 2024 */}
          <section id="tour-2024" data-section="Archív 2024" className="scroll-mt-28 bg-background py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2024
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Archív — 8. ročník</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2024.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          season="2024"
                          image={tournament.image}
                          links={tournament.links}
                          hideResults
                          hideLocation
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>

          {/* BSGA Tour 2023 */}
          <section id="tour-2023" data-section="Archív 2023" className="scroll-mt-28 bg-muted/50 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2023
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Archív — 7. ročník</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2023.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          season="2023"
                          image={tournament.image}
                          links={tournament.links}
                          hideResults
                          hideLocation
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>

          {/* BSGA Tour 2022 */}
          <section id="tour-2022" data-section="Archív 2022" className="scroll-mt-28 bg-background py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                    BSGA Tour 2022
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Archív — 6. ročník</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                  <CarouselContent>
                    {tournaments2022.map((tournament) => (
                      <CarouselItem key={tournament.number}>
                        <TournamentCard
                          theme="ivory"
                          number={tournament.number}
                          date={tournament.date}
                          location={tournament.location}
                          season="2022"
                          image={tournament.image}
                          links={tournament.links}
                          hideResults
                          hideLocation
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                    <CarouselNext className="static translate-y-0 rounded-full bg-card border-border text-foreground hover:border-gold/60 hover:bg-muted" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>;
};

export default Tour;
