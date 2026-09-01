import { X } from "lucide-react";
import SEO from "@/components/SEO";
import GreenCardQuiz, { type QuizQuestion } from "@/components/GreenCardQuiz";

const KIDS_QUESTIONS: QuizQuestion[] = [
  { id: 'k1', q: '1. Čo urobíš pred začiatkom hry?', options: ['Dáš si rukavicu', 'Podáš si ruku so spoluhráčmi, povieš, akou loptou hráš, a poprajete si peknú hru', 'Urobíš tri cvičné švihy'], correct: 1 },
  { id: 'k2', q: '2. Kedy zakričíš „FORE"?', options: ['Keď lopta skončí v piesku', 'Keď zahráš veľmi dobrú ranu', 'Keď lopta letí smerom na iných ľudí a mohla by ich zasiahnuť'], correct: 2 },
  { id: 'k3', q: '3. Počuješ, ako niekto na ihrisku kričí „FORE". Čo urobíš?', options: ['Obzeráš sa, kto to kričal', 'Prikrčíš sa a rukami si zakryješ hlavu', 'Hráš ďalej, akoby sa nič nestalo'], correct: 1 },
  { id: 'k4', q: '4. Na čo dávaš pozor, keď robíš cvičný švih?', options: ['Aby si trafil zem čo najsilnejšie', 'Aby si nikoho neohrozil a nikoho nevyrušoval pri údere', 'Aby ťa videl tréner'], correct: 1 },
  { id: 'k5', q: '5. Kde sa postavíš, keď hrá tvoj spoluhráč?', options: ['Šikmo za ním, v bezpečnej vzdialenosti mimo smeru letu lopty', 'Priamo pred neho, aby si videl, kam lopta letí', 'Tesne vedľa neho počas švihu'], correct: 0 },
  { id: 'k6', q: '6. Kde si zapíšeš výsledok jamky, ktorú si práve dohral?', options: ['Na greene hneď po doputovaní', 'Až na ďalšom odpalisku', 'V klube po celej hre'], correct: 1 },
  { id: 'k7', q: '7. Kedy opravíš pitch mark (jamku po dopade lopty) na greene?', options: ['Vždy, keď ho uvidíš – aj keď nie je tvoj', 'Len keď ho spravila tvoja lopta', 'Nikdy, opravuje to greenkeeper'], correct: 0 },
  { id: 'k8', q: '8. Vysekol si úderom z fairwayu kus trávy (divot). Čo s ním?', options: ['Necháš ho ležať na zemi', 'Vrátiš ho späť na miesto a pritlačíš nohou', 'Odhodíš ho do roughu, aby nezavadzal'], correct: 1 },
  { id: 'k9', q: '9. Zahral si loptu z pieskovej prekážky. Čo urobíš potom?', options: ['Rýchlo odídeš, aby si nezdržiaval', 'Pohrabeš po sebe stopy v piesku', 'Zahladíš piesok palicou'], correct: 1 },
  { id: 'k10', q: '10. Čo urobíš ako prvé, keď prídeš na green?', options: ['Položíš si bag na green', 'Opravíš pitch mark a označíš (omarkuješ) si loptu', 'Vyzuješ sa, aby si nepoškodil green'], correct: 1 },
  { id: 'k11', q: '11. Ako to má byť s mobilom počas hry?', options: ['Môže zvoniť, veď je to len hra', 'Má byť vypnutý alebo stíšený, aby nerušil ostatných', 'Musíš ho nechať v aute'], correct: 1 },
  { id: 'k12', q: '12. Čo ti hrozí, keď sa na turnaji správaš veľmi nešportovo?', options: ['Vôbec nič', 'Jedna trestná rana', 'Za vážne porušenie ťa môžu z turnaja vylúčiť (diskvalifikovať)'], correct: 2 },
  { id: 'k13', q: '13. Koľko palíc najviac môžeš mať v bagu?', options: ['Koľko chceš', '14', '18'], correct: 1 },
  { id: 'k14', q: '14. Ako sa volá výsledok o jeden úder horší ako par?', options: ['Birdie', 'Bogey', 'Divot'], correct: 1 },
  { id: 'k15', q: '15. Koľko minút máš na hľadanie stratenej lopty?', options: ['3 minúty', '5 minút', '10 minút'], correct: 0 },
  { id: 'k16', q: '16. Akými kolíkmi je označená hranica ihriska (out)?', options: ['Červenými', 'Modrými', 'Bielymi'], correct: 2 },
  { id: 'k17', q: '17. Akými kolíkmi býva označená trestná zóna (napríklad voda)?', options: ['Červenými alebo žltými', 'Bielymi alebo modrými', 'Iba zelenými'], correct: 0 },
  { id: 'k18', q: '18. Odkiaľ môžeš odpáliť z odpaliska?', options: ['Odkiaľkoľvek, kde je nízka tráva', 'Medzi odpaliskovými kameňmi a najviac dve dĺžky palice dozadu', 'Presne z čiary medzi kameňmi'], correct: 1 },
  { id: 'k19', q: '19. Kedy hráš provizórnu loptu?', options: ['Keď sa ti nepodarila prvá rana', 'Keď môže byť tvoja lopta stratená alebo za hranicou ihriska (v aute)', 'Keď si chceš zatrénovať'], correct: 1 },
  { id: 'k20', q: '20. Zahral si loptu do autu. Čo urobíš?', options: ['Dropneš si loptu pri bielych kolíkoch bez trestu', 'Hráš znova z pôvodného miesta a pripočítaš si jednu trestnú ranu', 'Pokračuješ ďalej bez trestu'], correct: 1 },
  { id: 'k21', q: '21. Puttuješ z greenu a trafíš vlajku, ktorá je v jamke. Aký máš trest?', options: ['Jednu trestnú ranu', 'Dve trestné rany', 'Žiadny trest'], correct: 2 },
  { id: 'k22', q: '22. Lopta sa po údere odrazí a trafí teba alebo tvoj bag. Aký máš trest?', options: ['Jednu trestnú ranu', 'Žiadny trest', 'Dve trestné rany'], correct: 1 },
  { id: 'k23', q: '23. Puttuješ z greenu a trafíš loptu spoluhráča, ktorá tiež leží na greene. Čo sa stane?', options: ['Nič, hrá sa ďalej', 'Dostaneš trest – dve trestné rany', 'Musíš putt opakovať bez trestu'], correct: 1 },
  { id: 'k24', q: '24. Lopta ti skončila v „pôde v oprave" (opravovaná časť ihriska). Čo môžeš urobiť?', options: ['Musíš ju zahrať tak, ako leží', 'Beztrestne si dropneš do jednej dĺžky palice od najbližšieho miesta úľavy, nie bližšie k jamke', 'Zoberieš si loptu a pokračuješ z odpaliska'], correct: 1 },
  { id: 'k25', q: '25. Nevieš, či je nájdená lopta tvoja. Čo urobíš?', options: ['Zdvihneš ju, poriadne umyješ a hráš ďalej', 'Nesmieš sa jej vôbec dotknúť', 'Označíš si jej polohu, zdvihneš ju na overenie a vrátiš späť'], correct: 2 },
  { id: 'k26', q: '26. Kedy môžeš vyhlásiť loptu za nehrateľnú?', options: ['Kedykoľvek s jednou trestnou ranou – okrem trestnej zóny', 'Len keď ti prekáža strom', 'Len keď ti to dovolí spoluhráč'], correct: 0 },
  { id: 'k27', q: '27. Lopta skončila v trestnej zóne označenej červenými kolíkmi. Čo môžeš urobiť?', options: ['Beztrestne ju vyložiť na trávu', 'S jednou trestnou ranou dropnúť do dvoch dĺžok palice od miesta, kde lopta prešla hranicu zóny, nie bližšie k jamke', 'Hrať z pôvodného miesta s dvomi trestnými ranami'], correct: 1 },
  { id: 'k28', q: '28. Lopta skončila v trestnej zóne označenej žltými kolíkmi. Čo môžeš urobiť?', options: ['S jednou trestnou ranou zahrať znova z miesta predchádzajúceho úderu', 'Beztrestne loptu premiestniť mimo zóny', 'Dropnúť si kdekoľvek na fairwayi'], correct: 0 },
  { id: 'k29', q: '29. Začne hrmieť a rozhodca preruší turnaj. Čo urobíš?', options: ['Dohráš jamku a až potom prestaneš', 'Okamžite prestaneš hrať a odídeš do bezpečia', 'Hráš ďalej, ak sa ti chce'], correct: 1 },
  { id: 'k30', q: '30. Kedy sa môžeš na turnaji poradiť s iným hráčom?', options: ['Kedykoľvek a o čomkoľvek', 'Len o pravidlách alebo o bezpečnosti', 'Pri každom výbere palice'], correct: 1 },
];

const EducationTestsKids = () => {
  const quizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Záverečný test zelenej karty pre deti",
    url: "https://bsga.sk/edukacne-centrum/testy-deti",
    inLanguage: "sk",
    educationalLevel: "Beginner",
    about: { "@type": "Thing", name: "Pravidlá golfu a golfová etiketa pre deti" },
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
        title="Záverečný test ZK pre deti | Edukačné centrum | BSGA"
        description="Detský záverečný test na zelenú kartu – 30 otázok z golfovej etikety, bezpečnosti a pravidiel, prispôsobených juniorom. Vyskúšajte si test online zadarmo."
        path="/edukacne-centrum/testy-deti"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Edukačné centrum", url: "https://bsga.sk/edukacne-centrum" },
          { name: "Záverečný test ZK pre deti", url: "https://bsga.sk/edukacne-centrum/testy-deti" },
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
            Záverečný test ZK pre deti
          </h1>
          <GreenCardQuiz questions={KIDS_QUESTIONS} />
        </div>
      </main>
    </>
  );
};

export default EducationTestsKids;
