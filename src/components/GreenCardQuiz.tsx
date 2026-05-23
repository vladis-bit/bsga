import { useState } from 'react';
import { Trophy, CheckCircle, XCircle, ChevronRight, ChevronLeft, RefreshCw, BookOpen, ShieldAlert, Flag } from 'lucide-react';

const ETIKA_QUESTIONS = [
  { id: 'e1', q: '1. Čo urobíte pred začiatkom hry?', options: ['podáme si ruky, zoznámime sa, oznámime akou loptou hráme a poprajeme si peknú hru', 'dáme si rukavicu', 'urobíme tri cvičné švihy'], correct: 0 },
  { id: 'e2', q: '2. Kedy je potrebné zakričať „FORE"?', options: ['keď niekto zahrá jednu ranu pod par', 'keď lopta skončí v pieskovej prekážke', 'keď lopta letí smerom na iných hráčov alebo môže niekoho ohroziť'], correct: 2 },
  { id: 'e3', q: '3. Keď počujete na ihrisku kričať „FORE", čo urobíte?', options: ['pozeráte sa okolo seba, kto kričí', 'prikrčíte sa a zakryjete si hlavu rukami', 'pokračujete ďalej, akoby sa nič nestalo'], correct: 1 },
  { id: 'e4', q: '4. Keď robíte cvičný švih, na čo musíte dávať pozor?', options: ['či nestojíte v aute', 'či niekoho neohrozujete a či niekoho nevyrušujete pri údere', 'aby ste pri cvičnom švihu trafili zem čo najsilnejšie'], correct: 1 },
  { id: 'e5', q: '5. Kde sa postavíte, keď váš spoluhráč hrá loptu?', options: ['šikmo za hráčom, v bezpečnej vzdialenosti mimo smeru letu lopty', 'priamo pred hráča do smeru jeho švihu alebo letu lopty', 'tesne vedľa hráča počas švihu'], correct: 0 },
  { id: 'e6', q: '6. Kedy môžete predbehnúť flight pred vami?', options: ['svojvoľne, keď za ním čakáte', 'keď čakáte viac ako päť minút', 'keď vám to flight pred vami naznačí, mimo turnajovej hry'], correct: 2 },
  { id: 'e7', q: '7. Kde zapisujeme výsledok práve dohranej jamky?', options: ['na greene, kde sme práve dohrali', 'na ďalšom odpalisku', 'v klube po dohraní všetkých jamiek'], correct: 1 },
  { id: 'e8', q: '8. Koľko trestných rán dostane hráč za porušenie etiky?', options: ['jednu trestnú ranu', 'zvyčajne žiadny trest, ale za vážne porušenie môže byť hráč diskvalifikovaný', 'vždy dve trestné rany'], correct: 1 },
  { id: 'e9', q: '9. Kedy opravíme pitch mark na greene?', options: ['vždy, keď ho vidíme', 'len keď sme ho spravili my', 'nikdy ho neopravujeme'], correct: 0 },
  { id: 'e10', q: '10. Čo je správne urobiť s odrezaným kusom trávy (divotom) po údere z fairwaye?', options: ['nechať ho ležať na zemi', 'vložiť ho späť na miesto a pritlačiť nohou', 'zahodiť ho do roughu, aby nezavadzal ostatným hráčom'], correct: 1 },
  { id: 'e11', q: '11. Ktoré z uvedených je dôležité dodržiavať pri hre z piesku?', options: ['pred úderom si môžeme palicou skúšať piesok za loptou', 'pred úderom je vhodné rukou skúšať kvalitu piesku', 'pred úderom sa nesmieme dotknúť piesku palicou za loptou a po údere po sebe stopy v piesku pohrabeme'], correct: 2 },
  { id: 'e12', q: '12. Čo urobí hráč po príchode na green ako prvé?', options: ['položí si golfový bag na green', 'opraví pitch mark, ak ho lopta vytvorila, a potom si označí (omarkuje) svoju loptu', 'vyzuje sa, aby nepoškodil green'], correct: 1 },
];

const PRAVIDLA_QUESTIONS = [
  { id: 'p13', q: '13. Ako je vyhradený priestor na odpalisku, kde si môžeme natíčkovať loptu?', options: ['kdekoľvek, kde je nízko pokosená tráva', 'medzi odpaliskovými kameňmi a najviac dve dĺžky palice dozadu', 'medzi odpaliskovými kameňmi a 50 cm dozadu'], correct: 1 },
  { id: 'p14', q: '14. Koľko palíc najviac môže mať hráč v bagu?', options: ['koľko chce', '18', '14'], correct: 2 },
  { id: 'p15', q: '15. Ako sa nazýva výsledok jeden úder nad par?', options: ['birdie', 'divot', 'bogey'], correct: 2 },
  { id: 'p16', q: '16. Kedy hráme provizórnu loptu?', options: ['keď si chceme zatrénovať', 'ak môže byť pôvodná lopta stratená mimo trestnej zóny alebo môže byť mimo hraníc ihriska', 'keď sa nám nepodarila prvá rana'], correct: 1 },
  { id: 'p17', q: '17. Koľko minút od začatia hľadania má hráč na nájdenie lopty?', options: ['3 minúty', '4 minúty', '5 minút'], correct: 0 },
  { id: 'p18', q: '18. Ak hráč zahrá loptu do OUT-u, čo musí urobiť?', options: ['dropnúť si loptu tam, kde preťala biele kolíky, bez trestu', 'dropnúť si loptu tam, kde preťala biele kolíky, s jednou trestnou ranou', 'hrať znova z pôvodného miesta s jednou trestnou ranou'], correct: 2 },
  { id: 'p19', q: '19. Hráč druhou ranou zahrá loptu do OUT-u. Čo nasleduje?', options: ['hrá štvrtú ranu z miesta posledného úderu', 'hrá štvrtú ranu z miesta, kde lopta preťala OUT', 'hrá tretiu ranu z miesta posledného úderu'], correct: 0 },
  { id: 'p20', q: '20. Akými kolíkmi sú označené hranice ihriska?', options: ['červenými', 'modrými', 'bielymi'], correct: 2 },
  { id: 'p21', q: '21. Akými kolíkmi môže byť označená trestná zóna?', options: ['bielymi alebo modrými', 'červenými alebo žltými', 'iba červenými'], correct: 1 },
  { id: 'p22', q: '22. Lopta skončí v trestnej zóne označenej žltými kolíkmi. Ktorá možnosť je správna?', options: ['hráč môže s jednou trestnou ranou hrať znova z miesta predchádzajúceho úderu', 'hráč môže dropnúť loptu na dve dĺžky palice od miesta vstupu do trestnej zóny', 'hráč môže beztrestne premiestniť loptu mimo trestnej zóny'], correct: 0 },
  { id: 'p23', q: '23. Lopta skončí v trestnej zóne označenej červenými kolíkmi. Ktorá možnosť je správna?', options: ['beztrestne dropnúť loptu čo najbližšie k miestu, kde lopta vstúpila do trestnej zóny', 'dropnúť do dvoch dĺžok palice od miesta, kde lopta preťala hranicu trestnej zóny, nie bližšie k jamke, s jednou trestnou ranou', 'hrať z pôvodného miesta s dvomi trestnými ranami'], correct: 1 },
  { id: 'p24', q: '24. Ak lopta skončí v pôde v oprave, čo môže hráč urobiť?', options: ['musí ju hrať ako leží', 'môže si beztrestne dropnúť loptu na jednu dĺžku palice od najbližšieho miesta úľavy, nie bližšie k jamke', 'môže ranu automaticky opakovať'], correct: 1 },
  { id: 'p25', q: '25. Lopta skončí pri mladom stromčeku, ktorý prekáža v postoji alebo švihu. Čo môžete urobiť?', options: ['vždy si beztrestne dropnúť loptu na jednu dĺžku palice', 'ak to povoľujú miestne pravidlá, môžete si vziať beztrestnú úľavu', 'vždy si beztrestne dropnúť loptu na dve dĺžky palice'], correct: 1 },
  { id: 'p26', q: '26. Ak hráč nevie, či je nájdená lopta jeho, čo môže urobiť?', options: ['loptu môže zdvihnúť a úplne očistiť bez označenia', 'loptu nesmie nikdy zdvihnúť', 'musí si označiť polohu lopty, môže ju zdvihnúť na identifikáciu a očistiť len nevyhnutne'], correct: 2 },
  { id: 'p27', q: '27. Kedy si môže hráč vymeniť loptu?', options: ['kedykoľvek počas jamky', 'len medzi jednotlivými jamkami', 'medzi jamkami alebo keď to pravidlá dovoľujú, napríklad pri poškodenej lopte alebo pri úľave'], correct: 2 },
  { id: 'p28', q: '28. Ak hráč trafí vlajku umiestnenú v jamke pri hre na greene, aký trest dostane?', options: ['jednu trestnú ranu', 'všeobecný trest', 'žiadny trest'], correct: 2 },
  { id: 'p29', q: '29. Ak hráč pri putte z greenu trafí loptu spoluhráča ležiacu na greene, aký trest dostane?', options: ['žiadny trest', 'všeobecný trest – dve trestné rany alebo strata jamky', 'jednu trestnú ranu'], correct: 1 },
  { id: 'p30', q: '30. Hráč trafí loptou seba, svoju výstroj alebo svojho nosiča. Aký trest dostáva?', options: ['jednu trestnú ranu', 'všeobecný trest', 'žiadny trest'], correct: 2 },
  { id: 'p31', q: '31. Hráč pri odstraňovaní pohyblivej zábrany spôsobí pohyb svojej lopty. Čo musí urobiť?', options: ['pokračuje beztrestne odtiaľ, kde lopta zastavila', 'vráti loptu na pôvodné miesto bez trestu', 'vráti loptu na pôvodné miesto s jednou trestnou ranou'], correct: 1 },
  { id: 'p32', q: '32. Kolíky na ihrisku vám prekážajú v postoji alebo švihu. Čo platí?', options: ['nikdy sa nesmú pohnúť', 'môžete si beztrestne posunúť loptu', 'môžete odstrániť pohyblivý kolík, okrem bielych kolíkov označujúcich hranicu ihriska'], correct: 2 },
  { id: 'p33', q: '33. Hráč našiel loptu v kríku, kde nevie zaujať postoj ani zahrať úder. Jeho provizórna lopta je v ideálnej pozícii. Čo platí?', options: ['môže pokračovať provizórnou loptou, lebo je v lepšej pozícii', 'môže beztrestne presunúť pôvodnú loptu na ľahšie hrateľné miesto', 'môže vyhlásiť pôvodnú loptu za nehrateľnú a pokračovať s jednou trestnou ranou podľa pravidiel'], correct: 2 },
  { id: 'p34', q: '34. Kedy môže hráč vyhlásiť loptu za nehrateľnú?', options: ['kedykoľvek s jednou trestnou ranou, okrem trestnej zóny', 'iba ak mu prekáža nejaký objekt', 'len ak s tým súhlasí spoluhráč'], correct: 0 },
  { id: 'p35', q: '35. Ktorú možnosť NEMÔŽE hráč využiť pri nehrateľnej lopte?', options: ['hrať z najbližšieho možného miesta úľavy beztrestne', 'hrať z pôvodného miesta s jednou trestnou ranou', 'hrať dozadu na spojnici lopta – jamka s jednou trestnou ranou'], correct: 0 },
  { id: 'p36', q: '36. Ak hráčova lopta skončí v pieskovej prekážke a nechce alebo nevie ju zahrať, čo môže urobiť?', options: ['beztrestne ju vybrať a položiť mimo piesku', 's dvoma trestnými ranami dropnúť mimo pieskoviska dozadu na spojnici jamka – lopta', 's jednou trestnou ranou dropnúť mimo pieskoviska kdekoľvek podľa vlastného výberu'], correct: 1 },
  { id: 'p37', q: '37. Kedy môže hráč počas turnaja dostať radu od iného hráča?', options: ['kedykoľvek počas celej hry', 'len ak ide o pravidlá alebo bezpečnosť', 'pri každom údere a výbere palice'], correct: 1 },
  { id: 'p38', q: '38. Čo sa stane, ak hráč podpíše a odovzdá scorekartu s nižším výsledkom, ako v skutočnosti zahral?', options: ['nič sa nedeje', 'je diskvalifikovaný', 'musí chybu len dodatočne opraviť'], correct: 1 },
  { id: 'p39', q: '39. Keď začne hrmieť a rozhodca preruší turnaj, čo musíte urobiť?', options: ['okamžite prestať hrať a presunúť sa do bezpečia', 'dohrať jamku a potom prerušiť hru', 'môžete hrať ďalej, ak chcete'], correct: 0 },
  { id: 'yn40', q: '40. ÁNO/NIE: Keď vkročíte spoluhráčovi do dráhy puttu, musíte si pripočítať dve trestné rany?', options: ['ÁNO', 'NIE'], correct: 1 },
  { id: 'yn41', q: '41. ÁNO/NIE: Loptičku môžeme kedykoľvek zdvihnúť a očistiť.', options: ['ÁNO', 'NIE'], correct: 1 },
  { id: 'yn42', q: '42. ÁNO/NIE: Spoluhráča na turnaji sa môžeme pýtať, akou palicou hrá.', options: ['ÁNO', 'NIE'], correct: 1 },
  { id: 'yn43', q: '43. ÁNO/NIE: Počet trestných rán v červenej a žltej trestnej zóne je rovnaký.', options: ['ÁNO', 'NIE'], correct: 0 },
  { id: 'yn44', q: '44. ÁNO/NIE: Hráč by mal mať počas hry vypnutý alebo stíšený mobilný telefón, aby nerušil ostatných hráčov.', options: ['ÁNO', 'NIE'], correct: 0 },
  { id: 'yn45', q: '45. ÁNO/NIE: Voľnú úľavu (free drop) môžeme použiť aj vtedy, keď lopta leží na tráve, ale hráč stojí jednou nohou na ceste.', options: ['ÁNO', 'NIE'], correct: 0 },
  { id: 'yn46', q: '46. ÁNO/NIE: Za úľavu z pôdy v oprave je jedna trestná rana.', options: ['ÁNO', 'NIE'], correct: 1 },
  { id: 'yn47', q: '47. ÁNO/NIE: Ak zahráme mimo poradia v bežnej hre na rany, je za to trestná rana.', options: ['ÁNO', 'NIE'], correct: 1 },
  { id: 'b48', q: '48. BONUS – Situácia: Hráč chipuje štvrtú ranu z roughu, trafí spoluhráčovu loptu ležiacu na greene a jeho lopta sa po odraze zakotúľa do jamky. Dostane hráč jednu trestnú ranu?', options: ['ÁNO', 'NIE'], correct: 1 },
  { id: 'b49', q: '49. BONUS – Rovnaká situácia: Počíta sa jeho úder ako zahraný do jamky?', options: ['ÁNO', 'NIE'], correct: 0 },
  { id: 'b50', q: '50. BONUS – Rovnaká situácia: Spoluhráčova lopta sa vráti na pôvodné miesto.', options: ['ÁNO', 'NIE'], correct: 0 },
];

type Section = 'welcome' | 'quiz' | 'results';

const GreenCardQuiz = () => {
  const [section, setSection] = useState<Section>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [...ETIKA_QUESTIONS, ...PRAVIDLA_QUESTIONS];
  const currentQuestion = questions[currentQuestionIndex];

  const handleStart = () => {
    setSection('quiz');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsSubmitted(false);
  };

  const handleAnswer = (optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitted(true);
      setSection('results');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  if (section === 'welcome') {
    return (
      <div className="flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-card rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-gold/20 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gold rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl shadow-gold/20 rotate-3 transform transition-transform hover:rotate-0">
            <Trophy className="text-primary-foreground w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3 sm:mb-4 tracking-tight">
            Záverečný test
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gold mb-8 sm:mb-10">
            Testové otázky podľa oficiálneho dokumentu
          </h3>
          <div className="flex flex-col items-center">
            <button 
              onClick={handleStart}
              className="group w-full p-5 sm:p-6 md:p-8 bg-card hover:bg-gold/5 border-2 border-gold/20 hover:border-gold rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="bg-gold/10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
                  <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-gold group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-left">
                  <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Kompletný test</h4>
                  <p className="text-muted-foreground text-sm">50 otázok (Etika, Pravidlá, ÁNO/NIE + Bonus)</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (section === 'results') {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-card rounded-3xl shadow-xl p-8 border border-border text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${percentage >= 80 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
            {percentage >= 80 ? (
              <CheckCircle className="text-green-600 dark:text-green-400 w-12 h-12" />
            ) : (
              <ShieldAlert className="text-red-600 dark:text-red-400 w-12 h-12" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Výsledok Testu</h2>
          <div className="text-5xl font-black text-gold mb-2">{score} / {questions.length}</div>
          <p className="text-xl text-muted-foreground mb-8 font-medium">Úspešnosť: {percentage}%</p>
          <div className="p-6 bg-muted/50 rounded-2xl mb-8 text-left border border-border">
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Analýza výsledkov
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {questions.map((q, idx) => (
                <div key={q.id} className="flex items-start gap-3 text-sm p-2 rounded-lg bg-card border border-border">
                  {answers[idx] === q.correct ? (
                    <CheckCircle className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="text-red-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <span className="text-muted-foreground font-semibold">Otázka {idx + 1}:</span>{' '}
                    <span className="text-foreground">{q.q}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setSection('welcome')}
            className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-primary-foreground font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-gold/20"
          >
            <RefreshCw className="w-5 h-5" /> Skúsiť znova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8 px-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-wider">Priebeh testu</span>
              <h2 className="text-lg font-bold text-foreground">Otázka {currentQuestionIndex + 1} z {questions.length}</h2>
            </div>
            <span className="text-sm font-medium text-muted-foreground">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-3xl shadow-xl p-6 md:p-10 border border-gold/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Flag className="w-32 h-32 text-foreground" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-8 leading-relaxed relative z-10">
            {currentQuestion.q}
          </h3>

          <div className="space-y-4 relative z-10">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                  answers[currentQuestionIndex] === idx 
                    ? 'border-gold bg-gold/10 text-foreground shadow-sm' 
                    : 'border-border hover:border-gold/50 hover:bg-muted/50 text-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-colors ${
                  answers[currentQuestionIndex] === idx 
                    ? 'bg-gold text-primary-foreground' 
                    : 'bg-muted text-muted-foreground group-hover:bg-gold/20 group-hover:text-gold'
                }`}>
                  {String.fromCharCode(97 + idx)}
                </div>
                <span className="text-md font-medium">{option}</span>
              </button>
            ))}
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-between items-center border-t border-border pt-8">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all w-full md:w-auto justify-center ${
                currentQuestionIndex === 0 
                  ? 'text-muted-foreground/50 cursor-not-allowed' 
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <ChevronLeft className="w-5 h-5" /> Späť
            </button>
            <button
              onClick={handleNext}
              disabled={answers[currentQuestionIndex] === undefined}
              className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold transition-all shadow-lg w-full md:w-auto justify-center ${
                answers[currentQuestionIndex] === undefined 
                  ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                  : 'bg-gold text-primary-foreground hover:bg-gold-dark shadow-gold/20'
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Ukončiť a vyhodnotiť' : 'Ďalšia otázka'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenCardQuiz;
