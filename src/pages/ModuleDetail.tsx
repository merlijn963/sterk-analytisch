import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Registreer Chart.js componenten
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface PraktijkData {
  variabele: string;
  meetniveau?: string;
  voorbeelden: string[];
  vraag?: string;
  opties?: string[];
  correctAntwoord?: number;
  uitleg?: string;
  antwoordUitleg?: string[];
}

interface Section {
  id: number;
  title: string;
  type: 'theory' | 'visualization' | 'practical';
  content: string;
  quizzes?: Quiz[];
  chartData?: ChartData;
  praktijkData?: PraktijkData[];
}

interface ModuleData {
  title: string;
  sections: Section[];
}

// Module definities
const moduleData: Record<string, ModuleData> = {
  descriptive: {
    title: 'Meetniveaus & Diagrammen',
    sections: [
      {
        id: 1,
        title: 'Meetniveaus',
        type: 'theory',
        content: `
          In de statistiek onderscheiden we vier verschillende meetniveaus:
          
          1. Nominaal: Categorieën zonder rangorde (bijvoorbeeld: geslacht, bloedgroep, woonplaats)
          2. Ordinaal: Categorieën met een rangorde (bijvoorbeeld: opleidingsniveau, Likert-schaal)
          3. Interval: Getallen met gelijke intervallen, geen absoluut nulpunt (bijvoorbeeld: temperatuur in °C, jaartallen)
          4. Ratio: Getallen met gelijke intervallen én absoluut nulpunt (bijvoorbeeld: lengte, gewicht, leeftijd)
        `,
        quizzes: [
          {
            question: "Welk meetniveau is 'temperatuur in graden Celsius'?",
            options: ["Nominaal", "Ordinaal", "Interval", "Ratio"],
            correctAnswer: 2,
            explanation: "Temperatuur in Celsius is een interval meetniveau omdat het verschil tussen waarden betekenisvol is, maar er geen absoluut nulpunt is (0°C is niet de afwezigheid van temperatuur)."
          },
          {
            question: "Welk diagram is het meest geschikt voor nominale data?",
            options: ["Spreidingsdiagram", "Staafdiagram", "Lijndiagram", "Boxplot"],
            correctAnswer: 1,
            explanation: "Een staafdiagram is het meest geschikt voor nominale data omdat het frequenties of aantallen per categorie duidelijk weergeeft."
          }
        ]
      },
      {
        id: 2,
        title: "Diagrammen",
        type: 'visualization',
        content: `
          Het kiezen van het juiste diagram hangt af van je meetniveau en wat je wilt laten zien:
          
          Nominaal & Ordinaal:
          • Staafdiagram - voor frequenties per categorie
          • Cirkeldiagram - voor verhoudingen tussen categorieën
          • Gestapeld staafdiagram - voor meerdere categorische variabelen
          
          Interval & Ratio:
          • Histogram - voor continue variabelen
          • Boxplot - voor spreiding en uitbijters
          • Spreidingsdiagram - voor correlaties
          • Lijndiagram - voor trends over tijd
        `,
        chartData: {
          labels: ['HBO', 'WO', 'MBO'],
          datasets: [{
            label: 'Aantal studenten',
            data: [150, 100, 200],
            backgroundColor: [
              'rgba(59, 130, 246, 0.5)',
              'rgba(99, 102, 241, 0.5)',
              'rgba(139, 92, 246, 0.5)',
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(99, 102, 241)',
              'rgb(139, 92, 246)',
            ],
            borderWidth: 1
          }]
        }
      },
      {
        id: 3,
        title: "Praktijkopdracht",
        type: 'practical',
        content: "In deze opdracht ga je werken met een echte dataset over studieresultaten.",
        praktijkData: [
          {
            variabele: "Leeftijd",
            meetniveau: "ratio",
            voorbeelden: ["18", "19", "21", "25", "30"]
          },
          {
            variabele: "Studierichting",
            meetniveau: "nominaal",
            voorbeelden: ["Psychologie", "Economie", "Informatica"]
          },
          {
            variabele: "Tevredenheid",
            meetniveau: "ordinaal",
            voorbeelden: ["Zeer ontevreden", "Ontevreden", "Neutraal", "Tevreden", "Zeer tevreden"]
          },
          {
            variabele: "Temperatuur klaslokaal",
            meetniveau: "interval",
            voorbeelden: ["18°C", "20°C", "22°C", "24°C"]
          }
        ]
      }
    ]
  },
  hypothesis: {
    title: 'Hypothesen & Toetsbeslissingen',
    sections: [
      {
        id: 1,
        title: 'Introductie',
        type: 'theory',
        content: `
          Wat is een hypothese?
          Een hypothese is een toetsbare voorspelling of veronderstelling over de werkelijkheid.
          
          In de statistiek werken we met twee soorten hypothesen:
          
          1. Nulhypothese (H0):
          • Gaat uit van "geen effect" of "geen verschil"
          • Is wat we proberen te verwerpen
          • Bijvoorbeeld: "Het medicijn heeft geen effect" (H0: μ = 0)
          
          2. Alternatieve hypothese (H1):
          • Beschrijft het effect dat we verwachten
          • Is vaak wat we willen aantonen
          • Bijvoorbeeld: "Het medicijn heeft een positief effect" (H1: μ > 0)
          
          Symbolen in hypothesen:
          
          μ (mu) - Gemiddelde:
          • Wordt gebruikt voor continue variabelen (bijvoorbeeld: lengte, gewicht, tijd)
          • Staat voor het populatiegemiddelde
          • Bijvoorbeeld: "HMSM-studenten fietsen gemiddeld 65 km per week" (μ = 65)
          
          π (pi) - Proportie:
          • Wordt gebruikt voor categorische variabelen (bijvoorbeeld: percentage, frequentie)
          • Staat voor het percentage of aandeel in de populatie
          • Bijvoorbeeld: "8.1% van de bevolking is zware drinker" (π = 0.081)
          
          Voorbeelden:
          
          Voorbeeld 1 - Medicijnonderzoek:
          • H0: Het medicijn heeft geen effect (μmedicijn = μplacebo)
          • H1: Het medicijn heeft wel effect (μmedicijn ≠ μplacebo)
          
          Voorbeeld 2 - Fietsgedrag studenten:
          • H0: HMSM-studenten fietsen gemiddeld niet meer dan UM-studenten (μHMSM ≤ 65km)
          • H1: HMSM-studenten fietsen gemiddeld meer dan UM-studenten (μHMSM > 65km)
          
          Voorbeeld 3 - Alcoholcampagne:
          • H0: Het percentage zware drinkers is niet verlaagd (π ≥ 0.081)
          • H1: Het percentage zware drinkers is verlaagd (π < 0.081)
          
          Eenzijdig vs. Tweezijdig toetsen:
          
          Eenzijdige toets:
          • Je verwacht een effect in één specifieke richting
          • Bijvoorbeeld: "Het nieuwe medicijn werkt beter" (niet slechter)
          • H1 bevat > of <
          
          Tweezijdige toets:
          • Je wilt weten of er überhaupt een verschil is
          • Richting van het verschil maakt niet uit
          • H1 bevat ≠
        `,
        quizzes: [
          {
            question: "Welke hypothese proberen we meestal te verwerpen?",
            options: [
              "De alternatieve hypothese (H1)",
              "De nulhypothese (H0)",
              "Beide hypothesen",
              "Geen van beide hypothesen"
            ],
            correctAnswer: 1,
            explanation: "We proberen altijd de nulhypothese (H0) te verwerpen. Dit is de hypothese die stelt dat er geen effect of verschil is."
          },
          {
            question: "Wanneer gebruik je een eenzijdige toets?",
            options: [
              "Als je verwacht dat er een verschil is in een specifieke richting",
              "Als je wilt weten of er überhaupt een verschil is",
              "Als je geen idee hebt wat het effect zal zijn",
              "Als je twee groepen wilt vergelijken"
            ],
            correctAnswer: 0,
            explanation: "Een eenzijdige toets gebruik je wanneer je vooraf een specifieke verwachting hebt over de richting van het effect (bijvoorbeeld dat groep A beter presteert dan groep B)."
          },
          {
            question: "Wanneer gebruik je μ (mu) in een hypothese?",
            options: [
              "Als je met percentages werkt",
              "Als je met gemiddelden werkt",
              "Als je met frequenties werkt",
              "Als je met correlaties werkt"
            ],
            correctAnswer: 1,
            explanation: "μ (mu) gebruik je wanneer je met gemiddelden van continue variabelen werkt, zoals lengte, gewicht, tijd of afstand."
          },
          {
            question: "Wanneer gebruik je π (pi) in een hypothese?",
            options: [
              "Als je met gemiddelden werkt",
              "Als je met percentages of proporties werkt",
              "Als je met standaarddeviaties werkt",
              "Als je met varianties werkt"
            ],
            correctAnswer: 1,
            explanation: "π (pi) gebruik je wanneer je met percentages of proporties werkt, zoals het percentage mensen met een bepaalde eigenschap of het aandeel van een categorie in een populatie."
          }
        ]
      },
      {
        id: 2,
        title: 'P-waarde & Toetsbeslissingen',
        type: 'theory',
        content: `
          De p-waarde en toetsbeslissingen
          
          Wat is een p-waarde?
          • De kans om je gevonden resultaat (of extremer) te vinden als H0 waar zou zijn
          • Hoe kleiner de p-waarde, hoe sterker het bewijs tegen H0
          • Let op: zegt niets over de grootte van het effect!
          
          Beslisregel met α = 0.05:
          • p < 0.05: Verwerp H0 (significant resultaat)
          • p ≥ 0.05: Behoud H0 (niet significant)
          
          Soorten fouten bij toetsen:
          
          Type I fout (α):
          • H0 verwerpen terwijl deze waar is
          • "Onschuldige veroordelen"
          • Kans hierop = α (meestal 5%)
          
          Type II fout (β):
          • H0 niet verwerpen terwijl deze onwaar is
          • "Brandalarm gaat niet af bij brand"
          • Kans hierop hangt af van steekproefgrootte
          
          Type III fout:
          • Juiste test, verkeerde conclusie
          • "De redenering klopt niet"
          • Bijvoorbeeld: correlatie zien als oorzaak
        `,
        quizzes: [
          {
            question: "Je vindt p = 0.03 bij α = 0.05. Wat concludeer je?",
            options: [
              "H0 behouden want p < α",
              "H0 verwerpen want p < α",
              "H0 behouden want p > α",
              "Geen conclusie mogelijk"
            ],
            correctAnswer: 1,
            explanation: "Als p < α (hier: 0.03 < 0.05), dan verwerpen we H0. Dit betekent dat we voldoende bewijs hebben tegen de nulhypothese."
          },
          {
            question: "Wat is een Type I fout?",
            options: [
              "H0 niet verwerpen terwijl deze onwaar is",
              "H0 verwerpen terwijl deze waar is",
              "De verkeerde toets gebruiken",
              "Een te kleine steekproef nemen"
            ],
            correctAnswer: 1,
            explanation: "Een Type I fout is het verwerpen van H0 terwijl deze eigenlijk waar is. Dit is vergelijkbaar met het veroordelen van een onschuldige persoon."
          }
        ]
      },
      {
        id: 3,
        title: 'Praktijkopdracht',
        type: 'practical',
        content: "In deze opdracht ga je de juiste hypothesen opstellen voor verschillende onderzoekssituaties.",
        praktijkData: [
          {
            variabele: "Fietsgedrag studenten",
            voorbeelden: ["UM-studenten fietsen gemiddeld 65 km per week", "Je wilt testen of HMSM-studenten meer fietsen", "Steekproef: 50 studenten van elke instelling"],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ < 65    H1: μ ≥ 65",
              "H0: μ ≤ 65    H1: μ > 65",
              "H0: π < 65    H1: π ≥ 65",
              "H0: π ≥ 65    H1: π < 65"
            ],
            correctAntwoord: 1,
            uitleg: "We willen testen of HMSM-studenten MEER fietsen dan 65 km. De nulhypothese (H0) moet de 'geen effect' situatie bevatten (≤ 65), en de alternatieve hypothese (H1) het effect dat we verwachten (> 65). We gebruiken μ omdat we een gemiddelde vergelijken (aantal kilometers per week), niet een percentage of proportie.",
            antwoordUitleg: [
              "Fout: H0 bevat < 65, wat betekent dat HMSM-studenten minder fietsen. Dit is niet de 'geen effect' situatie die we willen testen.",
              "Correct: H0 bevat ≤ 65 (geen effect of minder) en H1 bevat > 65 (meer), precies wat we willen testen. We gebruiken μ omdat we gemiddelden vergelijken.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken. π gebruik je voor percentages of proporties.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken, en de richting is omgekeerd (we willen testen of ze meer fietsen, niet minder)."
            ]
          },
          {
            variabele: "Alcoholcampagne",
            voorbeelden: ["8.1% van de bevolking is zware drinker", "De overheid start een campagne om dit percentage te verlagen"],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ < 8.1    H1: μ ≥ 8.1",
              "H0: μ ≥ 8.1    H1: μ < 8.1",
              "H0: π > 8.1    H1: π ≤ 8.1",
              "H0: π ≥ 8.1    H1: π < 8.1"
            ],
            correctAntwoord: 3,
            uitleg: "We testen of het percentage (π) zware drinkers is VERLAAGD. De nulhypothese (H0) moet de 'geen effect' situatie bevatten (≥ 8.1%), en de alternatieve hypothese (H1) het verwachte effect (< 8.1%). We gebruiken π omdat we met percentages werken (8.1% van de bevolking), niet met gemiddelden.",
            antwoordUitleg: [
              "Fout: We gebruiken μ (mu) terwijl we met percentages werken, en de richting is omgekeerd (we willen testen of het percentage is verlaagd).",
              "Fout: We gebruiken μ (mu) terwijl we met percentages werken. μ gebruik je voor gemiddelden, niet voor percentages.",
              "Fout: De richting is omgekeerd. H0 moet ≥ 8.1 bevatten (geen verlaging) en H1 moet < 8.1 bevatten (wel verlaging).",
              "Correct: We gebruiken π (pi) omdat we met percentages werken, en H0 bevat ≥ 8.1 (geen verlaging) en H1 bevat < 8.1 (wel verlaging)."
            ]
          },
          {
            variabele: "Allergieën vergelijken",
            voorbeelden: ["Vergelijk percentage mensen met pinda-allergie", "Vergelijk met percentage mensen met bijenallergie"],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ pinda > μ bijen      H1: μ pinda ≤ μ bijen",
              "H0: μ pinda = μ bijen      H1: μ pinda ≠ μ bijen",
              "H0: π pinda > π bijen      H1: π pinda ≤ π bijen",
              "H0: π pinda = π bijen      H1: π pinda ≠ π bijen"
            ],
            correctAntwoord: 3,
            uitleg: "We willen weten of er een VERSCHIL is tussen de percentages. We gebruiken een tweezijdige toets (≠) omdat we niet weten welke allergie vaker voorkomt. We gebruiken π omdat we percentages vergelijken (percentage mensen met allergie), niet gemiddelden.",
            antwoordUitleg: [
              "Fout: We gebruiken μ (mu) terwijl we met percentages werken, en we gebruiken een eenzijdige toets terwijl we niet weten welke allergie vaker voorkomt.",
              "Fout: We gebruiken μ (mu) terwijl we met percentages werken. μ gebruik je voor gemiddelden, niet voor percentages.",
              "Fout: We gebruiken een eenzijdige toets (> en ≤) terwijl we niet weten welke allergie vaker voorkomt. We moeten een tweezijdige toets gebruiken (= en ≠).",
              "Correct: We gebruiken π (pi) omdat we met percentages werken, en we gebruiken een tweezijdige toets (= en ≠) omdat we niet weten welke allergie vaker voorkomt."
            ]
          },
          {
            variabele: "iPhone vs Android kosten",
            voorbeelden: ["Onderzoeker denkt dat iPhone evenveel of minder kost", "Vergelijk met productiekosten Android"],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ iPhone ≤ μ Android     H1: μ iPhone > μ Android",
              "H0: μ iPhone > μ Android     H1: μ iPhone ≤ μ Android",
              "H0: π iPhone ≥ π Android     H1: π iPhone < π Android",
              "H0: π iPhone > π Android     H1: π iPhone ≤ π Android"
            ],
            correctAntwoord: 1,
            uitleg: "De onderzoeker denkt dat iPhone evenveel of MINDER kost. De nulhypothese (H0) moet de 'geen effect' situatie bevatten (> Android), en de alternatieve hypothese (H1) het verwachte effect (≤ Android). We gebruiken μ omdat we gemiddelde kosten vergelijken (euro's), niet percentages.",
            antwoordUitleg: [
              "Fout: De richting is omgekeerd. De onderzoeker denkt dat iPhone evenveel of MINDER kost, dus H0 moet > Android bevatten en H1 moet ≤ Android bevatten.",
              "Correct: H0 bevat > Android (geen effect of duurder) en H1 bevat ≤ Android (evenveel of goedkoper), precies wat de onderzoeker wil testen. We gebruiken μ omdat we gemiddelden vergelijken.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken. π gebruik je voor percentages of proporties.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken, en de richting is omgekeerd (we willen testen of iPhone evenveel of minder kost)."
            ]
          },
          {
            variabele: "Pikant vs niet-pikant eten",
            voorbeelden: ["Test of pikant eten vaker wordt gekocht", "Meet omzet per type gerecht"],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ niet-pikant ≤ μ pikant     H1: μ niet-pikant > μ pikant",
              "H0: π niet-pikant ≥ π pikant     H1: π niet-pikant < π pikant",
              "H0: μ niet-pikant ≥ μ pikant     H1: μ niet-pikant < μ pikant",
              "H0: π niet-pikant > π pikant     H1: π niet-pikant ≤ π pikant"
            ],
            correctAntwoord: 2,
            uitleg: "We testen of pikant eten VAKER wordt gekocht. De nulhypothese (H0) moet de 'geen effect' situatie bevatten (≥), en de alternatieve hypothese (H1) het verwachte effect (<). We gebruiken μ omdat we gemiddelde omzet vergelijken (euro's per gerecht), niet percentages.",
            antwoordUitleg: [
              "Fout: De richting is omgekeerd. We willen testen of pikant eten vaker wordt gekocht, dus H0 moet ≥ pikant bevatten en H1 moet < pikant bevatten.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken. π gebruik je voor percentages of proporties.",
              "Correct: H0 bevat ≥ pikant (geen effect of vaker) en H1 bevat < pikant (minder vaak), precies wat we willen testen. We gebruiken μ omdat we gemiddelden vergelijken.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken, en de richting is omgekeerd (we willen testen of pikant eten vaker wordt gekocht)."
            ]
          }
        ]
      }
    ]
  }
};

const ModuleDetail: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [sectionsCompleted, setSectionsCompleted] = useState<boolean[]>([]);
  const [selectedChart, setSelectedChart] = useState<'bar' | 'pie' | 'table'>('table');
  const [praktijkStarted, setPraktijkStarted] = useState(false);
  const [praktijkAnswers, setPraktijkAnswers] = useState<{ [key: string]: string }>({});
  const [showFeedback, setShowFeedback] = useState(false);

  // Haal module data op
  const module = moduleId ? moduleData[moduleId as keyof typeof moduleData] : null;

  // Als de module niet bestaat, ga terug naar de modules pagina
  useEffect(() => {
    if (!module) {
      navigate('/modules');
    }
  }, [module, navigate]);

  // Effect om sectie voltooiing bij te houden
  useEffect(() => {
    if (!module) return;

    const currentSection = module.sections[activeSection];
    if (!currentSection) return;

    // Controleer quiz voltooiing als er quizzes zijn
    if (currentSection.quizzes) {
      const quizCompleted = currentSection.quizzes.every(
        q => selectedAnswers[q.question] === q.correctAnswer.toString()
      );
      if (quizCompleted) {
        const newSectionsCompleted = [...sectionsCompleted];
        newSectionsCompleted[activeSection] = true;
        setSectionsCompleted(newSectionsCompleted);
      }
    }
  }, [selectedAnswers, activeSection, module]);

  if (!module) {
    return null;
  }

  // Render de module content
  const renderContent = () => {
    const section = module.sections[activeSection];
    if (!section) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{section.title}</h3>
        
        {/* Theorie content */}
        {section.content && (
          <div className="prose max-w-none">
            {section.type === 'theory' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.content.split('\n\n').map((paragraph, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                    {paragraph.split('\n').map((line, lineIdx) => (
                      <p key={lineIdx} className="text-gray-600">{line}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quiz vragen */}
        {section.quizzes && (
          <div className="mt-8">
            <h4 className="font-medium text-gray-900">Test je kennis</h4>
            {section.quizzes.map((quiz, index) => (
              <div key={index} className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                <p className="font-medium text-gray-900">{quiz.question}</p>
                <div className="mt-4 space-y-2">
                  {quiz.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => {
                        setSelectedAnswers(prev => ({
                          ...prev,
                          [quiz.question]: optionIndex.toString()
                        }));
                        setShowExplanation(true);
                      }}
                      className={`w-full text-left p-3 rounded-md ${
                        selectedAnswers[quiz.question] === optionIndex.toString()
                          ? optionIndex === quiz.correctAnswer
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showExplanation && selectedAnswers[quiz.question] && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">{quiz.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Visualisatie sectie */}
        {section.type === 'visualization' && section.chartData && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">Interactieve Voorbeelden</h4>
            <p className="mt-2 text-gray-600">
              Bekijk hoe dezelfde data op verschillende manieren kan worden weergegeven:
            </p>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                {selectedChart === 'table' ? (
                  <>
                    <h5 className="font-medium text-gray-900 mb-2">Voorbeeld Dataset</h5>
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Opleiding</th>
                          <th className="text-right p-2">Aantal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.chartData?.labels.map((label: string, idx: number) => (
                          <tr key={idx}>
                            <td className="p-2">{label}</td>
                            <td className="text-right p-2">{section.chartData?.datasets[0].data[idx]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : selectedChart === 'bar' ? (
                  <Bar data={section.chartData} options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                      },
                      title: {
                        display: true,
                        text: 'Verdeling studenten per opleidingsniveau'
                      }
                    }
                  }} />
                ) : (
                  <Pie data={section.chartData} options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                      },
                      title: {
                        display: true,
                        text: 'Verdeling studenten per opleidingsniveau'
                      }
                    }
                  }} />
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Visualisatie Opties</h5>
                <div className="space-y-2">
                  <button 
                    className={`w-full btn ${selectedChart === 'bar' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('bar')}
                  >
                    Staafdiagram
                  </button>
                  <button 
                    className={`w-full btn ${selectedChart === 'pie' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('pie')}
                  >
                    Cirkeldiagram
                  </button>
                  <button 
                    className={`w-full btn ${selectedChart === 'table' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('table')}
                  >
                    Tabel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Praktijkopdracht sectie */}
        {section.type === 'practical' && section.praktijkData && (
          <div className="space-y-6">
            {!praktijkStarted ? (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600">
                  In deze opdracht ga je werken met een echte dataset over studieresultaten.
                  Je gaat:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 list-disc list-inside">
                  <li>De hypothesen en p-waardes interpreteren</li>
                  <li>De juiste conclusies trekken</li>
                  <li>Leren omgaan met verschillende soorten toetsen</li>
                </ul>
                
                <div className="mt-6">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setPraktijkStarted(true)}
                  >
                    Start Opdracht
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {section.praktijkData?.map((data: PraktijkData, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900">Casus: {data.variabele}</h4>
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="text-gray-600">
                        {data.voorbeelden.map((voorbeeld, idx) => (
                          <span key={idx} className="block">{voorbeeld}</span>
                        ))}
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      {data.vraag && (
                        <label className="block text-sm font-medium text-gray-700">
                          {data.vraag}
                        </label>
                      )}
                      {data.opties && (
                        <div className="mt-2 space-y-2">
                          {data.opties.map((optie, optieIndex) => (
                            <button
                              key={optieIndex}
                              onClick={() => {
                                setPraktijkAnswers(prev => ({
                                  ...prev,
                                  [data.variabele]: optieIndex.toString()
                                }));
                                setShowFeedback(true);

                                // Check if all answers are correct
                                const allCorrect = section.praktijkData?.every(
                                  data => data.correctAntwoord !== undefined && 
                                  parseInt(praktijkAnswers[data.variabele] || '') === data.correctAntwoord
                                );
                                if (allCorrect) {
                                  const newSectionsCompleted = [...sectionsCompleted];
                                  newSectionsCompleted[activeSection] = true;
                                  setSectionsCompleted(newSectionsCompleted);
                                }
                              }}
                              className={`w-full text-left p-3 rounded-md ${
                                praktijkAnswers[data.variabele] === optieIndex.toString()
                                  ? optieIndex === data.correctAntwoord
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                            >
                              {optie}
                            </button>
                          ))}
                        </div>
                      )}

                      {showFeedback && praktijkAnswers[data.variabele] && data.correctAntwoord !== undefined && (
                        <div className={`mt-2 p-3 rounded-md ${
                          parseInt(praktijkAnswers[data.variabele]) === data.correctAntwoord
                            ? 'bg-green-50 text-green-800'
                            : 'bg-red-50 text-red-800'
                        }`}>
                          <p className="text-sm">
                            {parseInt(praktijkAnswers[data.variabele]) === data.correctAntwoord
                              ? "Correct! " + (data.uitleg || "")
                              : "Niet correct. Kijk nog eens goed naar de vorm van de hypothesen en wat deze betekenen."
                            }
                          </p>
                          
                          {/* Toon gedetailleerde uitleg voor elk antwoord */}
                          {data.antwoordUitleg && (
                            <div className="mt-4 space-y-2">
                              <p className="font-medium">Uitleg per antwoord:</p>
                              {data.antwoordUitleg.map((uitleg, index) => (
                                <div 
                                  key={index} 
                                  className={`p-2 rounded ${
                                    index === data.correctAntwoord 
                                      ? 'bg-green-100' 
                                      : 'bg-gray-100'
                                  }`}
                                >
                                  <p className="text-sm">
                                    <span className="font-medium">Optie {index + 1}:</span> {uitleg}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar met sectie navigatie */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {module.sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(index)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === index
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                } ${sectionsCompleted[index] ? 'text-green-600' : ''}`}
              >
                <span className="truncate">{section.title}</span>
                {sectionsCompleted[index] && (
                  <svg className="ml-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-900">Voortgang</h4>
            <div className="mt-2">
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                  <div
                    style={{ width: `${(sectionsCompleted.filter(Boolean).length / module.sections.length) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {sectionsCompleted.filter(Boolean).length} van de {module.sections.length} secties voltooid
              </p>
            </div>
          </div>
        </div>

        {/* Hoofdcontent */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              {renderContent()}
              
              {/* Navigatieknoppen */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => {
                    if (activeSection > 0) {
                      setActiveSection(activeSection - 1);
                      window.scrollTo(0, 0);
                    } else {
                      navigate('/modules');
                    }
                  }}
                  className="btn btn-secondary"
                >
                  {activeSection === 0 ? 'Terug naar Modules' : 'Vorige'}
                </button>
                {activeSection < module.sections.length - 1 ? (
                  <button
                    onClick={() => {
                      if (sectionsCompleted[activeSection]) {
                        setActiveSection(activeSection + 1);
                        window.scrollTo(0, 0);
                      }
                    }}
                    className={`btn ${
                      sectionsCompleted[activeSection] ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!sectionsCompleted[activeSection]}
                  >
                    Volgende
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/modules')}
                    className={`btn ${
                      sectionsCompleted[activeSection] ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!sectionsCompleted[activeSection]}
                  >
                    Terug naar Modules
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail; 