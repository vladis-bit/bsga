import { useState } from 'react';
import { Trophy, CheckCircle, XCircle, ChevronRight, ChevronLeft, RefreshCw, BookOpen, ShieldAlert, Flag, Eye, Send } from 'lucide-react';

const QUESTIONS = [
  // ČASŤ 1: ZÁKLADY GOLFU
  { id: 'k1', q: 'Koľko jamiek má štandardné golfové ihrisko?', options: ['9', '12', '18', '24'], correct: 2 },
  { id: 'k2', q: 'Ako sa volá palica, ktorou sa zvyčajne odpaľuje loptička z tee?', options: ['Iron', 'Putter', 'Driver', 'Wedge'], correct: 2 },
  { id: 'k3', q: 'Čo znamená pojem „par" v golfe?', options: ['Počet hráčov v skupinke', 'Vzdialenosť od tee po green', 'Predpokladaný počet úderov na jamku', 'Názov golfovej palice'], correct: 2 },
  { id: 'k4', q: 'Ako sa volá miesto, odkiaľ sa štartuje každá jamka?', options: ['Fairway', 'Green', 'Tee box', 'Bunker'], correct: 2 },
  { id: 'k5', q: 'Čo je „birdie"?', options: ['Vtáčik na ihrisku, ktorý treba chrániť', 'O jeden úder menej ako par', 'O jeden úder viac ako par', 'Presný zásah na par 3'], correct: 1 },
  { id: 'k6', q: 'Ako sa volá trávnatá plocha okolo jamky, kde sa puttuje?', options: ['Fairway', 'Rough', 'Green', 'Apron'], correct: 2 },
  { id: 'k7', q: 'Koľko palíc smie mať hráč maximálne v taške počas kola?', options: ['10', '12', '14', '16'], correct: 2 },
  { id: 'k8', q: 'Čo je „hole-in-one"?', options: ['Keď hráč vynechá jamku', 'Keď loptička skončí v pieskovej prekážke', 'Keď hráč dostane loptičku do jamky na jeden úder', 'Keď hráč zahrá par'], correct: 2 },
  { id: 'k9', q: 'Ako sa volá dlhá trávnatá časť ihriska medzi tee boxom a greenom?', options: ['Fairway', 'Rough', 'Bunker', 'Fringe'], correct: 0 },
  { id: 'k10', q: 'Čo je „eagle"?', options: ['O jeden úder menej ako par', 'O dva údery menej ako par', 'O dva údery viac ako par', 'Presný úder z bunkra'], correct: 1 },
  // ČASŤ 2: ETIKETA
  { id: 'k11', q: 'Čo musíte urobiť, keď vaša loptička letí smerom k iným hráčom?', options: ['Nič, je to ich problém', 'Zavolať rozhodcu', 'Hlasno zakričať „Fore!"', 'Zastaviť hru'], correct: 2 },
  { id: 'k12', q: 'Kedy smieš rozprávať nahlas alebo robiť hluk?', options: ['Kedykoľvek chceš', 'Len keď ty sám hráš úder', 'Nikdy počas toho, keď niekto iný hrá úder', 'Len na greeni'], correct: 2 },
  { id: 'k13', q: 'Čo treba urobiť s jamou (divotom) v trávniku, ktorú vytvorí váš úder?', options: ['Nechať ju tak, uprace to obsluha', 'Vrátiť vytrhanú trávu späť a pritlačiť ju', 'Zakryť ju pieskom', 'Označiť ju vlajočkou'], correct: 1 },
  { id: 'k14', q: 'Kto hrá ako prvý na tee boxe na začiatku kola?', options: ['Najmladší hráč', 'Najvyšší hráč', 'Hráč s najnižším handicapom alebo určený losovaním', 'Vždy hostiteľ ihriska'], correct: 2 },
  { id: 'k15', q: 'Čo treba urobiť na greeni po tom, ako vaša loptička urobí jamku (pitch mark)?', options: ['Nechať to tak', 'Zavolať greenkeepera', 'Opraviť poškodenie trávy špeciálnym nástrojom', 'Označiť miesto vlajočkou'], correct: 2 },
  { id: 'k16', q: 'Ako sa správa slušný golfista, keď prehral alebo vyhral?', options: ['Víťaz sa chváli a porazený sa sťažuje', 'Obaja si podajú ruku a poďakujú si za hru', 'Víťaz odíde bez rozlúčky', 'Porazený zaplatí za nápoje bez slova'], correct: 1 },
  { id: 'k17', q: 'Ako rýchlo by mal golfista hrať, aby nezdržiaval ostatných?', options: ['Hrať čo najpomalšie, aby bol presný', 'Hrať len vtedy, keď je absolútne pripravený aj hodinu', 'Byť pripravený hrať, keď príde jeho rad, a udržiavať tempo hry', 'Rýchlosť hry nie je dôležitá'], correct: 2 },
  { id: 'k18', q: 'Kde na greeni sa NESMIE chodiť?', options: ['Okolo jamky', 'Po čiare putt iného hráča (medzi jeho loptičkou a jamkou)', 'Za vlajočkou', 'Na okraji greenu'], correct: 1 },
  { id: 'k19', q: 'Čo urobíte, ak vaša skupinka hrá pomaly a za vami čaká rýchlejšia skupinka?', options: ['Ignorovať ich', 'Hrať ešte pomalšie, aby sa naučili trpezlivosti', 'Pustiť ich dopredu (tzv. „let through")', 'Zavolať na nich, aby počkali'], correct: 2 },
  { id: 'k20', q: 'Aké oblečenie je väčšinou požadované na golfovom ihrisku?', options: ['Plavky a žabky', 'Tepláky a mikina s kapucňou', 'Polo tričko s golierom a vhodné golfové nohavice alebo sukňa', 'Formálny oblek a kravata'], correct: 2 },
  // ČASŤ 3: PRAVIDLÁ
  { id: 'k21', q: 'Čo sa stane, ak vaša loptička skončí mimo hraníc ihriska (OB – Out of Bounds)?', options: ['Zahráte ju odkiaľ leží, bez penalizácie', 'Hra sa zastavuje a jamka sa nepočíta', 'Dostanete trestný úder a hráte znova z pôvodného miesta', 'Iný hráč vám hodí loptičku späť'], correct: 2 },
  { id: 'k22', q: 'Čo je „handicap" v golfe?', options: ['Fyzické obmedzenie hráča', 'Počet palíc v taške', 'Číslo vyjadrujúce úroveň hráča, ktoré vyrovnáva šance v hre', 'Maximálny počet úderov na jamku'], correct: 2 },
  { id: 'k23', q: 'Smiete sa dotknúť piesku v bunkri pred samotným úderom?', options: ['Áno, môžete si vyrovnať piesok', 'Áno, ak je to len nohami', 'Nie, pred úderom sa nesmiete dotknúť piesku palicou', 'Áno, ale len raz'], correct: 2 },
  { id: 'k24', q: 'Čo je „stroke play" (hra na rany)?', options: ['Hráči súťažia o každú jamku zvlášť', 'Víťazí hráč s najmenším celkovým počtom úderov za celé kolo', 'Každý úder má inú bodovú hodnotu', 'Hráči si vymieňajú loptičky po každej jamke'], correct: 1 },
  { id: 'k25', q: 'Čo musíš urobiť, ak nemôžeš nájsť svoju loptičku na ihrisku?', options: ['Hrať inú loptičku bez penalizácie', 'Čakať neobmedzene, kým ju nájdeš', 'Máš 3 minúty na hľadanie, potom hráš náhradnú loptičku s penalizáciou', 'Požiadať rozhodcu, aby loptičku našiel za teba'], correct: 2 },
  { id: 'k26', q: 'Čo je „match play" (hra na jamky)?', options: ['Hráči počítajú celkový počet úderov', 'Víťazí ten, kto vyhrá viac jamiek, nie kto má menej úderov celkovo', 'Hra, kde každý hráč hrá sám za seba bez súpera', 'Hra, kde sa hrajú len párne jamky'], correct: 1 },
  { id: 'k27', q: 'Smiete si vybrať loptičku a utrieť ju kdekoľvek na ihrisku?', options: ['Áno, kedykoľvek chcete', 'Nie, nikdy počas hry', 'Áno, ale len na greeni a na niektorých ďalších povolených miestach', 'Len ak je loptička v rough'], correct: 2 },
  { id: 'k28', q: 'Čo je „provisional ball" (predbežná loptička)?', options: ['Loptička, ktorú používajú začiatočníci', 'Záložná loptička v taške', 'Loptička zahraná pre prípad, že pôvodná je stratená alebo OB', 'Špeciálna loptička na tréning'], correct: 2 },
  { id: 'k29', q: 'Čo je „water hazard" (vodná prekážka)?', options: ['Dážď počas hry', 'Mokrá tráva na fairway', 'Jazero, potok alebo iná vodná plocha označená na ihrisku', 'Rosou pokrytý green ráno'], correct: 2 },
  { id: 'k30', q: 'Aký trest dostanete, ak omylom pohnete svojou loptičkou na greeni pred úderom?', options: ['Žiadny trest, stane sa to každému', 'Jeden trestný úder a loptičku vrátite na pôvodné miesto', 'Vyradíte sa z danej jamky', 'Musíte zahrať loptičku z miesta, kde skončila'], correct: 1 },
];

type Section = 'welcome' | 'quiz' | 'review' | 'results';

const KidsGolfQuiz = () => {
  const [section, setSection] = useState<Section>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];

  const handleStart = () => {
    setSection('quiz');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setSection('review');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (idx: number) => {
    setCurrentQuestionIndex(idx);
    setSection('quiz');
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
  const answeredCount = Object.keys(answers).length;

  // ============ WELCOME ============
  if (section === 'welcome') {
    return (
      <div className="flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-card rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-gold/20 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gold rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl shadow-gold/20 rotate-3 transform transition-transform hover:rotate-0">
            <Trophy className="text-primary-foreground w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3 sm:mb-4 tracking-tight">
            ⛳ Golfový kvíz pre deti
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gold mb-8 sm:mb-10">
            30 otázok pre vek 8–16 rokov
          </h3>
          <button
            onClick={handleStart}
            className="group w-full p-5 sm:p-6 md:p-8 bg-card hover:bg-gold/5 border-2 border-gold/20 hover:border-gold rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="bg-gold/10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-gold group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="text-left">
                <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Začať kvíz</h4>
                <p className="text-muted-foreground text-sm">Základy, etiketa a pravidlá</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ============ REVIEW (skontroluj odpovede pred odoslaním) ============
  if (section === 'review') {
    return (
      <div className="flex flex-col items-center p-4">
        <div className="max-w-3xl w-full bg-card rounded-3xl shadow-xl p-6 md:p-10 border border-gold/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Skontrolujte svoje odpovede</h2>
            <p className="text-muted-foreground">
              Zodpovedané: <span className="font-bold text-foreground">{answeredCount} / {questions.length}</span>
            </p>
            {answeredCount < questions.length && (
              <p className="text-sm text-red-500 mt-2">
                Niektoré otázky ešte nemáte zodpovedané. Kliknite na ne a doplňte odpoveď.
              </p>
            )}
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 mb-8">
            {questions.map((q, idx) => {
              const answered = answers[idx] !== undefined;
              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    answered
                      ? 'border-gold/30 bg-gold/5 hover:border-gold'
                      : 'border-red-300 bg-red-50 dark:bg-red-950/20 hover:border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      answered ? 'bg-gold text-primary-foreground' : 'bg-red-500 text-white'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground mb-1">{q.q}</p>
                      <p className="text-xs text-muted-foreground">
                        {answered
                          ? <>Vaša odpoveď: <span className="font-semibold text-foreground">{q.options[answers[idx]]}</span></>
                          : <span className="text-red-500 font-semibold">Bez odpovede — kliknite a doplňte</span>}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between border-t border-border pt-6">
            <button
              onClick={() => { setCurrentQuestionIndex(0); setSection('quiz'); }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-foreground hover:bg-muted transition-all"
            >
              <ChevronLeft className="w-5 h-5" /> Späť k otázkam
            </button>
            <button
              onClick={() => setSection('results')}
              disabled={answeredCount < questions.length}
              className={`flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold transition-all shadow-lg ${
                answeredCount < questions.length
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-gold text-primary-foreground hover:bg-gold-dark shadow-gold/20'
              }`}
            >
              <Send className="w-5 h-5" /> Potvrdiť a vyhodnotiť
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ RESULTS ============
  if (section === 'results') {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-card rounded-3xl shadow-xl p-6 md:p-10 border border-border text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${percentage >= 80 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
            {percentage >= 80 ? (
              <CheckCircle className="text-green-600 dark:text-green-400 w-12 h-12" />
            ) : (
              <ShieldAlert className="text-red-600 dark:text-red-400 w-12 h-12" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Výsledok testu</h2>
          <div className="text-5xl font-black text-gold mb-2">{score} / {questions.length}</div>
          <p className="text-xl text-muted-foreground mb-8 font-medium">Úspešnosť: {percentage}%</p>

          <div className="p-4 md:p-6 bg-muted/50 rounded-2xl mb-8 text-left border border-border">
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Detailné vyhodnotenie
            </h4>
            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2">
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const isCorrect = userAns === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect
                        ? 'border-green-500/50 bg-green-50 dark:bg-green-950/20'
                        : 'border-red-500/50 bg-red-50 dark:bg-red-950/20'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="text-green-600 dark:text-green-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="text-red-600 dark:text-red-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="font-semibold text-foreground text-sm">
                        <span className="text-muted-foreground">Otázka {idx + 1}:</span> {q.q}
                      </p>
                    </div>
                    <div className="space-y-1.5 ml-8">
                      {q.options.map((opt, optIdx) => {
                        const isUserChoice = optIdx === userAns;
                        const isRightAnswer = optIdx === q.correct;
                        let cls = 'text-muted-foreground';
                        let prefix = '';
                        if (isRightAnswer) {
                          cls = 'text-green-700 dark:text-green-400 font-semibold';
                          prefix = '✓ ';
                        }
                        if (isUserChoice && !isRightAnswer) {
                          cls = 'text-red-700 dark:text-red-400 font-semibold line-through';
                          prefix = '✗ ';
                        }
                        return (
                          <p key={optIdx} className={`text-sm ${cls}`}>
                            {prefix}{opt}
                            {isUserChoice && <span className="ml-2 text-xs italic">(vaša odpoveď)</span>}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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

  // ============ QUIZ ============
  return (
    <div className="flex flex-col items-center p-4">
      <div className="max-w-3xl w-full">
        <div className="mb-8 px-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-wider">Priebeh kvízu</span>
              <h2 className="text-lg font-bold text-foreground">Otázka {currentQuestionIndex + 1} z {questions.length}</h2>
            </div>
            <span className="text-sm font-medium text-muted-foreground">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

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
                  {String.fromCharCode(65 + idx)}
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
              onClick={() => setSection('review')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-foreground hover:bg-muted transition-all w-full md:w-auto justify-center"
            >
              <Eye className="w-5 h-5" /> Skontrolovať odpovede
            </button>
            <button
              onClick={handleNext}
              disabled={answers[currentQuestionIndex] === undefined}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg w-full md:w-auto justify-center ${
                answers[currentQuestionIndex] === undefined
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-gold text-primary-foreground hover:bg-gold-dark shadow-gold/20'
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Skontrolovať a odoslať' : 'Ďalšia otázka'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsGolfQuiz;
