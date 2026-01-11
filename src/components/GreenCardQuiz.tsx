import { useState } from 'react';
import { Trophy, CheckCircle, XCircle, ChevronRight, ChevronLeft, RefreshCw, BookOpen, ShieldAlert, Flag } from 'lucide-react';

const ETIKA_QUESTIONS = [
  {
    id: 'e1',
    q: 'Kedy je potrebné zakričať slovo FORE?',
    options: [
      'keď niekto zahrá birdie (jeden úder pod par)',
      'keď si niekto čupne a zakryje si hlavu rukami',
      'keď vy alebo váš spoluhráč zahrá loptičku, ktorá letí priamo na iných hráčov'
    ],
    correct: 2
  },
  {
    id: 'e2',
    q: 'Kedy môžete predbehnúť flight pred vami?',
    options: [
      'svojvoľne, keď za ním čakáte',
      'keď čakáte viac ako päť minút',
      'keď vám to pred vami idúci flight naznačí (platí len mimo turnajovej hry)'
    ],
    correct: 2
  },
  {
    id: 'e3',
    q: 'Keď vkročíte do dráhy patu spoluhráčovi, musíte si pripočítať dve trestné rany?',
    options: [
      'áno',
      'nie'
    ],
    correct: 1
  },
  {
    id: 'e4',
    q: 'Čo urobíte pred začiatkom hry?',
    options: [
      'podáme si ruky so svojimi spoluhráčmi, zoznámime sa a poprajeme si peknú hru',
      'dáme si rukavicu',
      'urobíme tri cvičné švihy'
    ],
    correct: 0
  },
  {
    id: 'e5',
    q: 'Kedy opravíme pitch mark (priehlbinu po dopade lopty)?',
    options: [
      'vždy',
      'len keď som to spravil ja',
      'nikdy to neopravujem'
    ],
    correct: 0
  },
  {
    id: 'e6',
    q: 'Keď robíte cvičný švih, na čo musíte dávať pozor?',
    options: [
      'či nestojíte v aute',
      'či niekoho neohrozujete',
      'či niekto iný sa nechystá na úder a vy ho vyrušujete'
    ],
    correct: 1
  },
  {
    id: 'e7',
    q: 'Kde sa postavíte keď váš spoluhráč hrá loptu?',
    options: [
      'oproti hráčovi - šikmo za úrovňou lopty',
      'blízko oproti alebo za chrbtom hráča',
      'ako chcete'
    ],
    correct: 0
  },
  {
    id: 'e8',
    q: 'Čo musíte urobiť pred tým ako opustíte pieskovisko?',
    options: [
      'musíte za sebou upraviť všetky stopy a nerovnosti v pieskovisku',
      'musíte zakričať FORE',
      'nemusíte nič upravovať'
    ],
    correct: 0
  },
  {
    id: 'e9',
    q: 'Kde zapisujeme výsledok práve dohranej jamky?',
    options: [
      'na gríne',
      'na ďalšom odpalisku',
      'v klube po dohraní všetkých jamiek'
    ],
    correct: 1
  },
  {
    id: 'e10',
    q: 'Koľko trestných rán dostane hráč za porušenie etiky?',
    options: [
      'jednu trestnú ranu',
      'žiadny trest (súťažný výbor však môže udeliť diskvalifikáciu za vážne porušenie etiky)',
      'dve trestné rany'
    ],
    correct: 1
  }
];

const PRAVIDLA_QUESTIONS = [
  {
    id: 'p1',
    q: 'Ak trafíte loptu svojho spoluhráča ležiacu na greene po odohratí svojej rany na greene, aký trest dostanete?',
    options: [
      'žiadny trest',
      'všeobecný trest - dve trestné rany alebo strata jamky',
      'jednu trestnú ranu'
    ],
    correct: 1
  },
  {
    id: 'p2',
    q: 'Kedy hráme provizórnu loptu?',
    options: [
      'keď si chceme zatrénovať',
      'ak by pôvodná lopta mohla byť stratená mimo vodnej prekážky v rafe alebo by sa mohla nachádzať mimo hraníc ihriska',
      'keď vám nevyšla prvá rana'
    ],
    correct: 1
  },
  {
    id: 'p3',
    q: 'Keď hráč zahrá loptu do autu (out of bounds), čo musí urobiť?',
    options: [
      'dropnúť si loptu v mieste kde preťala biele kolíky, beztrestne',
      'dropnúť si loptu v mieste kde preťala biele kolíky s jednou trestnou ranou',
      'zahrať loptu z pôvodného miesta s jednou trestnou ranou'
    ],
    correct: 2
  },
  {
    id: 'p4',
    q: 'Koľko palíc najviac môže mať hráč v bagu?',
    options: [
      'koľko chce',
      '18',
      '14'
    ],
    correct: 2
  },
  {
    id: 'p5',
    q: 'Kedy si môže hráč loptu vymeniť?',
    options: [
      'kedykoľvek',
      'len medzi jednotlivými jamkami',
      'medzi jamkami alebo aj keď je lopta poškodená (po súhlase zapisovateľa)'
    ],
    correct: 2
  },
  {
    id: 'p6',
    q: 'Ak hráč trafí vlajku umiestnenú v jamke pri hre na greene, aký trest dostane?',
    options: [
      'jednu trestnú ranu',
      'všeobecný trest - dve trestné rany alebo strata jamky',
      'žiadny trest'
    ],
    correct: 2
  },
  {
    id: 'p7',
    q: 'Lopta skončí pod stromčekom a bráni vám v švihu alebo v postoji, čo môžete urobiť?',
    options: [
      'loptu si beztrestne dropnúť na dĺžku jednej palice, hocikedy',
      'loptu si beztrestne dropnúť na dĺžku jednej palice od najbližšieho miesta úľavy, ak je to uvedené v miestnych pravidlách',
      'loptu si beztrestne dropnúť na dĺžku dvoch palíc'
    ],
    correct: 1
  },
  {
    id: 'p8',
    q: 'Akými kolíkmi môže byť označená trestná zóna?',
    options: [
      'bielymi kolíkmi',
      'modrými kolíkmi',
      'červenými kolíkmi'
    ],
    correct: 2
  },
  {
    id: 'p9',
    q: 'Ak lopta skončí v pôde v oprave, čo musíte urobiť?',
    options: [
      'musíte loptu hrať ako leží',
      'musíte si loptu beztrestne dropnúť na dĺžku jednej palice od najbližšieho miesta úľavy, nie bližšie k jamke',
      'môžete ranu opakovať'
    ],
    correct: 1
  },
  {
    id: 'p10',
    q: 'Keď začne hrmieť a rozhodca preruší turnaj, čo musíte urobiť?',
    options: [
      'musíte loptu označiť, okamžite prestať s hraním a presunúť sa do bezpečia',
      'musíte dohrať jamku a potom hru prerušiť',
      'ak chcete môžete hrať ďalej bez prerušenia hry'
    ],
    correct: 0
  },
  {
    id: 'p11',
    q: 'Keď neviete, či je lopta ktorú ste pri hľadaní našli vaša, čo môžete urobiť?',
    options: [
      'loptu kdekoľvek bez označenia môžete zodvihnúť a očistiť ju',
      'loptu nesmiete zodvihnúť a očistiť',
      'pred zodvihnutím musíte oznámiť úmysel loptu identifikovať, pozíciu označiť a čistiť len nevyhnutne'
    ],
    correct: 2
  },
  {
    id: 'p12',
    q: 'Čo sa stane ak hráč podpíše a odovzdá scorekartu s nižším výsledkom ako v skutočnosti zahral?',
    options: [
      'nič sa nedeje',
      'musí byť diskvalifikovaný',
      'musí chybu napraviť'
    ],
    correct: 1
  },
  {
    id: 'p13',
    q: 'Hráč, ktorý trafí loptou seba, svoju výstroj alebo svojho nosiča, aký trest dostáva?',
    options: [
      'jednu trestnú ranu',
      'všeobecný trest - dve trestné rany alebo strata jamky',
      'žiadny trest'
    ],
    correct: 2
  },
  {
    id: 'p14',
    q: 'Hráč spustil loptu nesprávnym spôsobom a následne zahral úder. Aký trest dostáva?',
    options: [
      'Bez trestu',
      'jednu trestnú ranu',
      'všeobecný trest - dve trestné rany alebo strata jamky'
    ],
    correct: 2
  },
  {
    id: 'p15',
    q: 'Kolíky označujúce rôzne situácie na ihrisku vám prekážajú v postoji alebo vo švihu:',
    options: [
      'musíte loptu hrať a nesmiete koliky pohnúť',
      'môžete si loptu beztrestne posunúť',
      'môžete si kolík odstrániť (okrem bielych kolíkov alebo kolíkov ako integrálnej súčasti)'
    ],
    correct: 2
  },
  {
    id: 'p16',
    q: 'Čo máte urobiť, keď si nie ste istý, či vašu loptu nájdete, alebo či zaletela za hranicu ihriska (out)?',
    options: [
      'zahrať alternatívnu loptu',
      'zahrať provizórnu loptu',
      'zahrať náhradnú loptu'
    ],
    correct: 1
  },
  {
    id: 'p17',
    q: 'Koľko minút od začatia hľadania má hráč na to, aby našiel svoju loptu?',
    options: [
      '3 minúty',
      '4 minúty',
      '5 minút'
    ],
    correct: 0
  },
  {
    id: 'p18',
    q: 'Hráč našiel svoju loptu v kríku, kde nemôže hrať. Jeho provizórna lopta je v ideálnej pozícii.',
    options: [
      'hráč môže pokračovať provizórnou loptou',
      'hráč musí nájsť spôsob ako zahrať loptu',
      'hráč môže vyhlásiť loptu za nehrateľnú s jednou trestnou ranou'
    ],
    correct: 2
  },
  {
    id: 'p19',
    q: 'Loptička skončila v trestnej zóne označenej žltými kolíkmi. Ktorá možnosť je správna?',
    options: [
      'dropnúť si loptičku na najbližšie miesto mimo trestnej zóny s jednou trestnou ranou',
      'dropnúť si loptičku na dve dĺžky palice od miesta kde preťala hranicu s jednou trestnou ranou',
      'hrať loptu ako leží s možnosťou cvičných švihov a založenia palice'
    ],
    correct: 2
  },
  {
    id: 'p20',
    q: 'Loptička skončila v trestnej zóne označenej červenými kolíkmi. Ktorá možnosť je správna?',
    options: [
      'dropnúť si loptičku na najbližšie miesto mimo trestnej zóny s jednou trestnou ranou',
      'dropnúť si loptičku na dve dĺžky palice od miesta prechodu s jednou trestnou ranou',
      'dropnúť si loptičku na spojnici miesta vstupu a odkiaľ hral s jednou trestnou ranou'
    ],
    correct: 1
  },
  {
    id: 'p21',
    q: 'Ak hráčova lopta skončí v pieskovej prekážke (v štandardnom stave):',
    options: [
      'musí loptu hrať ako leží',
      'môže si loptičku spustiť na spojnici jamka-lopta mimo piesku s dvoma trestnými ranami',
      'môže si loptičku spustiť na spojnici jamka-lopta mimo piesku s jednou trestnou ranou'
    ],
    correct: 0
  },
  {
    id: 'p22',
    q: 'Kedy môže hráč vyhlásiť loptu za nehrateľnú?',
    options: [
      'hocikedy s jednou trestnou ranou (s výnimkou trestnej zóny)',
      'iba ak mu v postoji alebo švihu prekáža nejaký objekt',
      'len ak mu v postoji, švihu alebo dráhe hry prekáža objekt'
    ],
    correct: 0
  },
  {
    id: 'p23',
    q: 'Hráč pri odstraňovaní pohyblivej zábrany spôsobil pohyb svojej loptičky:',
    options: [
      'beztrestne pokračuje v hre odtiaľ, kde loptička zastavila',
      'musí loptičku vrátiť na pôvodné miesto beztrestne',
      'musí loptičku vrátiť na pôvodné miesto s jednou trestnou ranou'
    ],
    correct: 1
  }
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
      <div className="flex flex-col items-center justify-center p-4">
        <div className="max-w-xl w-full bg-card rounded-3xl shadow-2xl p-8 md:p-12 border border-gold/20 text-center">
          <div className="w-24 h-24 bg-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gold/20 rotate-3 transform transition-transform hover:rotate-0">
            <Trophy className="text-primary-foreground w-12 h-12" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            Záverečný test
          </h2>
          <h3 className="text-xl md:text-2xl font-medium text-gold mb-10">
            Kurz zelenej karty
          </h3>
          <div className="flex flex-col items-center">
            <button 
              onClick={handleStart}
              className="group w-full max-w-sm p-8 bg-card hover:bg-gold/5 border-2 border-gold/20 hover:border-gold rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md text-center"
            >
              <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors">
                <Trophy className="w-8 h-8 text-gold group-hover:text-primary-foreground transition-colors" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-1">Kompletný kurz</h4>
              <p className="text-muted-foreground text-sm">33 otázok (Etika + Pravidlá)</p>
            </button>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-xs text-muted-foreground uppercase tracking-widest font-bold">
            Best Swing Golf Academy
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
