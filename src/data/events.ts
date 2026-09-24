// Zabudované eventy – záloha, ak je databáza prázdna, a zdroj pre import do admin centra.
import czechPgaPoster from "@/assets/event-posters/doni-travel-czech-pga-tour.pdf.asset.json";
import camiralPoster from "@/assets/event-posters/doni-travel-camiral.pdf.asset.json";
import livPoster from "@/assets/event-posters/doni-travel-liv.pdf.asset.json";
import proamPoster from "@/assets/event-posters/doni-turnaj-4teams.pdf.asset.json";
import kaskadaPoster from "@/assets/event-posters/kaskada-golfovy-vikend.pdf.asset.json";
import turkeyPoster from "@/assets/event-posters/bsga-turecko-2027.pdf.asset.json";

export interface EventItem {
  title: string;
  date: string;
  location?: string;
  posterUrl?: string;
  /** Skryje tlačidlo "Prihlásiť sa" (karta aj detail). */
  hideSignup?: boolean;
  /** Skryje tlačidlo plagátu aj placeholder "Plagát čoskoro". */
  hidePoster?: boolean;
  /** Označí akciu ako vypredanú/obsadenú. */
  soldOut?: boolean;
  details?: {
    subtitle: string;
    intro: string;
    price: string;
    priceNote: string;
    schedule: { day: string; title: string; items: string[]; tour?: string }[];
    contact: { name: string; email: string | string[]; phone: string };
  };
}



/** Parse the start date from a Slovak date range like "5. – 6. 9. 2026" or "26. 3. – 2. 4. 2027". */
export const parseEventDate = (dateStr: string): number => {
  const normalized = dateStr.replace(/–/g, "-").trim();
  // "D. M. – D. M. YYYY"
  let match = normalized.match(/(\d{1,2})\.\s*(\d{1,2})\.\s*-\s*(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})/);
  if (match) {
    const [, day, month] = match;
    return new Date(Number(match[5]), Number(month) - 1, Number(day)).getTime();
  }
  // "D. – D. M. YYYY"
  match = normalized.match(/(\d{1,2})\.\s*-\s*(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})/);
  if (match) {
    const [, day, , month, year] = match;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }
  // "D. M. YYYY"
  match = normalized.match(/(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})/);
  if (match) {
    const [, day, month, year] = match;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }
  return 0;
};


/** Archivované termíny víkendového kurzu zelenej karty v sezóne 2026 (viď /zacni-s-golfom). */
const archivedWeekendCourseDates = ["19. – 20. 9. 2026", "5. – 6. 9. 2026"];

const weekendGreenCardEvent = (date: string): EventItem => ({
  title: "Víkendový kurz zelenej karty",
  date,
  location: "Green Resort Hrubá Borša (cca 30 km od Bratislavy)",
  hidePoster: true,
  details: {
    subtitle: "Intenzívny dvojdňový kurz pre úplných začiatočníkov",
    intro:
      "Ideálny program pre úplných začiatočníkov. Počas víkendu získate pevné základy, pochopíte, ako golf funguje, a pripravíte sa na získanie zelenej karty. Kurz vedú profesionálni tréneri (členovia PGA SK) a kvalifikovaní golfoví inštruktori, vybavenie vám zapožičiame.",
    price: "139,99 € / osoba",
    priceNote:
      "V cene nie je zahrnutý doplatok 80 € za záverečnú skúšku a vydanie zelenej karty (platba na mieste). Termín je možné po dohode neskôr zmeniť a presúva sa v prípade nepriaznivého počasia alebo nedostatočného počtu prihlásených.",
    schedule: [
      {
        day: "1. deň (sobota)",
        title: "Základy techniky a pravidlá",
        items: [
          "Úvod do techniky golfového švihu",
          "Tréning s profesionálnymi trénermi PGA SK",
          "Pravidlá golfu a golfová etika",
          "Zapožičanie golfového vybavenia a loptičiek",
        ],
      },
      {
        day: "2. deň (nedeľa)",
        title: "Príprava na zelenú kartu",
        items: [
          "Pokračovanie tréningu – celkovo 12 hodín kurzu",
          "Praktický tréning na ihrisku",
          "Záverečná skúška na zelenú kartu",
          "Darček v cene a zelená karta po úspešnom absolvovaní",
        ],
      },
    ],
    contact: {
      name: "Domka Švajlenová",
      email: "bsga@bsga.sk",
      phone: "+421 917 225 276",
    },
  },
});

export const defaultEvents: EventItem[] = [
  ...["3. – 4. 10. 2026"].map((d) => weekendGreenCardEvent(d)),

  {
    title: "Švajlen Invitational",
    date: "25. 9. 2026",
    location: "Golfový klub Hrubá Borša, Slovensko",
    hideSignup: true,
    hidePoster: true,

    details: {
      subtitle: "Jednokolový pozvánkový turnaj",
      intro: "Jednokolový pozvánkový turnaj konajúci sa na golfovom ihrisku v Hrubej Borši (GKHB). Môžete sa tešiť na welcome drink, občerstvenie, obed po hre a vyhlásenie aj s cenami.",
      price: "Pozvánkový turnaj",
      priceNote: "Turnaj je prístupný na pozvánku.",
      schedule: [
        { day: "Piatok 25. 9.", title: "Švajlen Invitational", items: ["Welcome drink a registrácia hráčov", "Občerstvenie počas hry", "Obed po hre", "Vyhlásenie výsledkov a odovzdávanie cien"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: "peter@doni-travel.sk",
        phone: "+421 905 335 501",
      },
    },
  },

  {
    title: "BSGA Ryder Cup – Švajlen vs Hrbáň",
    date: "10. – 17. 10. 2026",
    location: "Voyage Belek Golf & Spa 5★, Turecko",
    soldOut: true,
    details: {
      subtitle: "DONI-TRAVEL × BSGA — Ryder Cup 2026",
      intro: "Spoločný zájazd v BSGA Ryder Cup formáte – Team Švajlen vs. Team Hrbáň. Čaká na vás týždeň plný kvalitného golfu, tímovej súťaže a oddychu v luxusnom rezorte Voyage Belek Golf & Spa 5★.",
      price: "€2 900 / golfista (double room + letenka) · €1 750 / negolfista (double room + letenka)",
      priceNote: "Príplatok za single room: €550. Cena zahŕňa: 7 nocí v dvojlôžkovej izbe, 5x green fee (2x Montgomerie, 2x Kaya, 1x Faldo), letenka a golfový vak.",
      schedule: [
        { day: "Sobota 10. 10.", title: "Prílet do Antalye", items: ["Let do Antalye", "Transfer a ubytovanie v Voyage Belek Golf & Spa 5★"] },
        { day: "Nedeľa 11. 10.", title: "The Montgomerie Maxx Royal", items: ["Hra na The Montgomerie Maxx Royal (1. deň BSGA Ryder Cup)"] },
        { day: "Pondelok 12. 10.", title: "Kaya Palazzo Golf Club", items: ["Hra na Kaya Palazzo Golf Club (2. deň BSGA Ryder Cup)"] },
        { day: "Utorok 13. 10.", title: "Faldo Course", items: ["Hra na Faldo Course (3. deň BSGA Ryder Cup)"] },
        { day: "Streda 14. 10.", title: "The Montgomerie Maxx Royal", items: ["Hra na The Montgomerie Maxx Royal (4. deň BSGA Ryder Cup)"] },
        { day: "Štvrtok 15. 10.", title: "Kaya Palazzo Golf Club", items: ["Hra na Kaya Palazzo Golf Club (5. deň BSGA Ryder Cup)"] },
        { day: "Piatok 16. 10.", title: "Voľný deň / tímové aktivity", items: ["Voľný program v rezorte", "Tímové aktivity a príprava finále"] },
        { day: "Sobota 17. 10.", title: "Odlet domov", items: ["Transfer na letisko", "Let do Bratislavy"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: ["peter@doni-travel.com", "doni@doni-travel.com"],
        phone: "+421 905 335 501",
      },
    },
  },
];


/** Sort upcoming events chronologically by their start date. */
defaultEvents.sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date));


export const defaultArchivedEvents: EventItem[] = [
  {
    title: "DONI-TRAVEL × BSGA — Turnaj Pro-Am Tímov",
    date: "13. – 15. 9. 2026",
    location: "Golf Resort Kaskáda",
    posterUrl: proamPoster.url,
    hideSignup: true,
    details: {
      subtitle: "Tímová súťaž 6–8 členných tímov vedených hrajúcimi profesionálmi",
      intro: "Destinácia: Golf Resort Kaskáda. Formát: Tímová súťaž 6–8 členných tímov vedených hrajúcimi profesionálmi. Tímy: Team Švajlen | Team Hrbáň | Team Fajkusová | Team Gajan.",
      price: "€650 / golfista (double room) · €350 / negolfista (double room)",
      priceNote: "Príplatok za single room: €90. Možnosť doobjednať extra noc 12. 9. – double room €65 | single room €100. Cena zahŕňa: 2 noci s raňajkami, 3x turnajové kolá, 2x obed po hre, pitný režim počas hry, 3x štartovací balíček do bagu, 1x večerný raut s ochutnávkou vína a unlimited vstup do saunového sveta.",
      schedule: [
        { day: "Nedeľa 13. 9.", title: "Príjazd a uvítací program", items: ["Príjazd a ubytovanie v Golf Resort Kaskáda", "Welcome drink a prezentácia tímov", "Voľná hra / príprava na ihrisku"] },
        { day: "Pondelok 14. 9.", title: "1. deň súťaže", items: ["Turnajové kolá pre všetky tímy", "Obed po hre", "Pitný režim počas hry", "Štartovací balíček do bagu"] },
        { day: "Utorok 15. 9.", title: "Finále a vyhlásenie", items: ["Záverečné turnajové kolá", "Obed po hre", "Večerný raut s ochutnávkou vína", "Vyhlásenie víťazov a odovzdávanie cien"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: ["peter@doni-travel.com", "doni@doni-travel.com"],
        phone: "+421 905 335 501",
      },
    },
  },
  {
    title: "Golfový víkend na Kaskáde",
    date: "18. – 20. 9. 2026",
    location: "Golf Resort Kaskáda",
    posterUrl: kaskadaPoster.url,
    hideSignup: true,
    details: {
      subtitle: "Golfový víkend s BSGA trénermi v Golf Resort Kaskáda",
      intro: "Trojdňový zájazd do Českej republiky určený primárne pre úspešných absolventov zelenej karty. V cene sú 2 noci ubytovania v 4* hoteli s raňajkami, 6 hodín skupinových tréningov, playing lessons s BSGA trénermi, neobmedzená hra na 6-jamkovej akadémii, green fee na 9 jamiek a vstup do wellness.",
      price: "€390 / golfista",
      priceNote: "Príplatok za single room: €100.",
      schedule: [
        { day: "Piatok 18. 9.", title: "Tréningový deň", items: ["Príjazd a ubytovanie v 4* hoteli", "Skupinové tréningy s dvoma BSGA trénermi", "Vstup do wellness"] },
        { day: "Sobota 19. 9.", title: "Neobmedzená hra", items: ["Neobmedzená hra na 6-jamkovej akadémii", "Pokračovanie skupinových tréningov", "Vstup do wellness"] },
        { day: "Nedeľa 20. 9.", title: "Green fee a playing lesson", items: ["Green fee na 9 jamiek", "Playing lesson s BSGA trénermi", "Záver zájazdu"] },
      ],
      contact: {
        name: "Maroš Gajan",
        email: "maros@bsga.sk",
        phone: "+421 903 243 999",
      },
    },
  },
  {
    title: "Camiral Trip",
    date: "1. – 6. 5. 2026",
    location: "Camiral, Španielsko",
    posterUrl: camiralPoster.url,
    details: {
      subtitle: "Hosťujúce ihrisko Ryder Cup 2031 – Camiral & Quinta do Lago Resort",
      intro: "Doni Travel pripravil exkluzívny golfový zájazd do Španielska na prestížne Camiral Resort, ktoré bude hostiť Ryder Cup 2031. Súčasťou pobytu je aj výlet do Barcelony so sprievodcom.",
      price: "€1 535 / golfista · €415 / negolfista",
      priceNote: "Priamy let z Bratislavy do Barcelony · Ubytovanie Hotel Lavida 4* na 5 nocí · Letenka nie je zahrnutá v cene",
      schedule: [
        { day: "Piatok 1. 5.", title: "Prílet & Stadium Course", items: ["Priamy let Bratislava – Barcelona", "Camiral Resort – Stadium Course (autíčko v cene)"] },
        { day: "Sobota 2. 5.", title: "Camiral Resort – Tour Course", items: ["Hra na Tour Course (autíčko v cene)"] },
        { day: "Nedeľa 3. 5.", title: "Výlet do Barcelony", items: ["Celodenný výlet so zabezpečeným sprievodcom a vstupmi"] },
        { day: "Pondelok 4. 5.", title: "Camiral Resort – Tour Course", items: ["Hra na Tour Course (autíčko v cene)"] },
        { day: "Utorok 5. 5.", title: "Camiral Resort – Stadium Course", items: ["Hra na Stadium Course (autíčko v cene)"] },
        { day: "Streda 6. 5.", title: "Odlet domov", items: ["Let Barcelona – Bratislava"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: "peter@doni-travel.sk",
        phone: "+421 905 335 501",
      },
    },
  },
  {
    title: "Liv Golf Andalucia",
    date: "6. – 10. 6. 2026",
    location: "Andalúzia, Španielsko",
    posterUrl: livPoster.url,
    details: {
      subtitle: "3x golf v Andalúzii + finálový deň LIV GOLF Spain",
      intro: "Doni Travel pripravil zájazd do slnečnej Andalúzie spojený s návštevou finálového kola LIV GOLF Spain a hrou na troch špičkových ihriskách.",
      price: "€1 290 / golfista · €750 / negolfista",
      priceNote: "Príplatok za single room: €375 · Letenka nie je zahrnutá v cene",
      schedule: [
        { day: "Piatok 6. 6.", title: "Prílet do Malagy", items: ["Let Viedeň – Malaga"] },
        { day: "Sobota 7. 6.", title: "LIV GOLF Spain", items: ["Návšteva finálového kola LIV GOLF Spain"] },
        { day: "Nedeľa 8. 6.", title: "Atalaya New Course", items: ["Hra na Atalaya New Course"] },
        { day: "Pondelok 9. 6.", title: "Estepona Course", items: ["Hra na Estepona Course"] },
        { day: "Utorok 10. 6.", title: "Los Arqueros & odlet", items: ["Hra na Los Arqueros Course", "Let Malaga – Viedeň"] },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: "peter@doni-travel.sk",
        phone: "+421 905 335 501",
      },
    },
  },  {
    title: "PGA Czechia – Po stopách Czech PGA Tour",
    date: "20. – 23. 8. 2026",
    location: "Česká republika",
    posterUrl: czechPgaPoster.url,
    details: {
      subtitle: "Golfové potulky po českých ihriskách",
      intro: "Doni Travel pripravil štvorňový golfový zájazd Czech PGA Tour pod názvom „Golfové potulky po českých ihriskách\". Počas štyroch dní účastníkov čaká hra na prémiových českých ihriskách neďaleko od Prahy.",
      price: "€675 / golfista (double room)",
      priceNote: "Príplatok za single room: €160",
      schedule: [
        { day: "Piatok 20. 8.", title: "Black Bridge Golf Resort", items: ["Ubytovanie na 1 noc v Black Bridge Golf Resort s raňajkami", "1x green fee Black Bridge Golf Resort"], tour: "Czech PGA Tour" },
        { day: "Sobota 21. 8.", title: "Royal Beroun Golf Club", items: ["Ubytovanie na 1 noc v Grand Hotel Litava Beroun s raňajkami", "1x green fee Royal Beroun Golf Club"], tour: "Ladies European Tour" },
        { day: "Nedeľa 22. 8.", title: "Golf Resort Karlštejn", items: ["Ubytovanie na 1 noc v Black Bridge Golf Resort s raňajkami", "1x green fee Golf Resort Karlštejn"], tour: "European Tour" },
        { day: "Pondelok 23. 8.", title: "Prague City Golf – Zbraslav", items: ["1x green fee Prague City Golf – Zbraslav"], tour: "Challenge Tour" },
      ],
      contact: {
        name: "Peter Švajlen, MBA",
        email: "peter@doni-travel.sk",
        phone: "+421 905 335 501",
      },
    },
  },
  ...archivedWeekendCourseDates.map((d) => weekendGreenCardEvent(d)),
];

/** Zoradenie archívu od najnovšieho termínu. */
defaultArchivedEvents.sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date));


/**
 * Akcie sezóny 2027 zobrazené v sekcii "Akcie a pobyty v roku 2027".
 * Slúžia ako zdroj pravdy pre JSON-LD (dátumy zodpovedajú textom v UI).
 */
const turkeyCamp2027: EventItem = {
  title: "Jarný tréningový kemp v Turecku",
  date: "13. – 20. 3. 2027",
  location: "Belek, Turecko",
  posterUrl: turkeyPoster.url,
  details: {
    subtitle: "GOLF Training Camp Turkey 2027 – Cornelia Diamond Golf Resort & Spa",
    intro:
      "Týždenný jarný tréningový kemp v Beleku pod vedením štyroch trénerov Best Swing Golf Academy (Peter Švajlen, Jakub Hrbáň, Maroš Gajan, Vladimír Leško). V cene je letecká doprava SunExpress Viedeň – Antalya, preprava golfových bagov, 7 nocí v hoteli Cornelia Diamond v režime Ultra All Inclusive, 5 × 18 jamiek (3× Faldo, 1× Gloria, 1× Montgomerie) a skupinové tréningy aj hra na ihrisku s trénermi BSGA.",
    price: "2 550 € / golfista (DBL room) · 1 350 € / negolfista (DBL room)",
    priceNote:
      "Golfer SNG room 2 900 € / osoba (príplatok za jednolôžkovú izbu 350 €). Cena zahŕňa leteckú dopravu, prepravu golfových bagov, 7 nocí Ultra All Inclusive a 5 green fee.",
    schedule: [
      {
        day: "13. 3. 2027",
        title: "Odlet a ubytovanie",
        items: [
          "Let SunExpress Viedeň – Antalya",
          "Preprava golfových bagov v cene",
          "Ubytovanie v Cornelia Diamond Golf Resort & Spa – Ultra All Inclusive",
        ],
      },
      {
        day: "14. – 19. 3. 2027",
        title: "Golf a tréningy s trénermi BSGA",
        items: [
          "5 × 18 jamiek: 3× Faldo Golf Course, 1× Gloria Golf Course, 1× Montgomerie Golf Course",
          "Skupinové tréningy s trénermi Best Swing Golf Academy",
          "Hra na ihrisku s trénermi (playing lessons)",
          "Ultra All Inclusive a wellness v rezorte Cornelia Diamond",
        ],
      },
      {
        day: "20. 3. 2027",
        title: "Odlet domov",
        items: ["Transfer na letisko v Antalyi", "Let SunExpress Antalya – Viedeň"],
      },
    ],
    contact: {
      name: "Peter Švajlen, MBA",
      email: "peter@doni-travel.sk",
      phone: "+421 905 335 501",
    },
  },
};

export const defaultEvents2027: EventItem[] = [
  turkeyCamp2027,

  {
    title: "Florida PGA Swing by DONI-Travel",
    date: "26. 3. – 2. 4. 2027",
    location: "Florida, USA",
    soldOut: true,
  },
];
