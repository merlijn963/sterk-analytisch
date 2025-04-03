import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Wanneer gebruik je een ANOVA?',
    options: [
      {
        id: 'A',
        text: 'Bij 2 groepen',
        isCorrect: false,
        explanation: 'Bij 2 groepen gebruik je een T-toets. ANOVA is voor 3 of meer groepen.'
      },
      {
        id: 'B',
        text: 'Bij continue data',
        isCorrect: false,
        explanation: 'Continue data is een voorwaarde, maar niet de reden om ANOVA te gebruiken.'
      },
      {
        id: 'C',
        text: 'Bij 3 of meer groepen',
        isCorrect: true,
        explanation: 'Correct! ANOVA gebruik je om gemiddelden te vergelijken tussen 3 of meer groepen.'
      },
      {
        id: 'D',
        text: 'Bij nominale variabelen',
        isCorrect: false,
        explanation: 'Voor nominale variabelen gebruik je Chi-kwadraat, niet ANOVA.'
      }
    ]
  },
  {
    id: 2,
    question: 'Welke toets gebruik je bij 2 nominale variabelen?',
    options: [
      {
        id: 'A',
        text: 'T-toets',
        isCorrect: false,
        explanation: 'T-toets gebruik je voor het vergelijken van gemiddelden, niet voor nominale variabelen.'
      },
      {
        id: 'B',
        text: 'ANOVA',
        isCorrect: false,
        explanation: 'ANOVA gebruik je voor het vergelijken van gemiddelden tussen 3+ groepen.'
      },
      {
        id: 'C',
        text: 'Chi-kwadraat',
        isCorrect: true,
        explanation: 'Correct! Chi-kwadraat gebruik je voor het onderzoeken van verbanden tussen nominale variabelen.'
      },
      {
        id: 'D',
        text: 'Correlatie',
        isCorrect: false,
        explanation: 'Correlatie gebruik je voor continue variabelen, niet voor nominale variabelen.'
      }
    ]
  },
  {
    id: 3,
    question: 'Wat zegt een p-waarde van 0.02 bij een T-toets?',
    options: [
      {
        id: 'A',
        text: 'Geen verschil',
        isCorrect: false,
        explanation: 'Een p-waarde van 0.02 is kleiner dan 0.05, dus er is wel een significant verschil.'
      },
      {
        id: 'B',
        text: 'Kans is groter dan 5%',
        isCorrect: false,
        explanation: '0.02 is juist kleiner dan 0.05, dus de kans is kleiner dan 5%.'
      },
      {
        id: 'C',
        text: 'H0 wordt verworpen',
        isCorrect: true,
        explanation: 'Correct! Bij p < 0.05 verwerpen we de nulhypothese en concluderen we dat er een significant verschil is.'
      },
      {
        id: 'D',
        text: 'p-waarde heeft geen betekenis',
        isCorrect: false,
        explanation: 'De p-waarde heeft wel degelijk betekenis en geeft de kans op het gevonden resultaat onder H0.'
      }
    ]
  },
  {
    id: 4,
    question: 'Wat is een typisch outputkenmerk van ANOVA?',
    options: [
      {
        id: 'A',
        text: 'F-waarde (Fisher\'s test)',
        isCorrect: true,
        explanation: 'Correct! De F-waarde (Fisher\'s test) is het kenmerk van ANOVA en geeft de verhouding tussen groeps- en errorvariantie aan. Een hoge F-waarde duidt op een significant verschil tussen de groepen.'
      },
      {
        id: 'B',
        text: 't-waarde (Student\'s t-test)',
        isCorrect: false,
        explanation: 'De t-waarde is het kenmerk van de T-toets, niet van ANOVA. Student\'s t-test wordt gebruikt voor het vergelijken van twee groepen.'
      },
      {
        id: 'C',
        text: 'χ²-waarde (Chi-kwadraat)',
        isCorrect: false,
        explanation: 'De χ²-waarde is het kenmerk van de Chi-kwadraat toets, die gebruikt wordt voor het analyseren van verbanden tussen categorische variabelen.'
      },
      {
        id: 'D',
        text: 'r-waarde (Pearson\'s correlatie)',
        isCorrect: false,
        explanation: 'De r-waarde is het kenmerk van correlatie-analyse, die gebruikt wordt voor het meten van de sterkte en richting van het verband tussen twee continue variabelen.'
      }
    ]
  }
];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswerSelect = (questionId: number, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter(
      question => selectedAnswers[question.id] === question.options.find(opt => opt.isCorrect)?.id
    ).length;
    const percentage = (correctAnswers / questions.length) * 100;
    setScore(percentage);
    
    // Sla de score op in localStorage
    localStorage.setItem('module_tests_progress', percentage.toString());
    
    // Als score >= 70%, markeer module als voltooid
    if (percentage >= 70) {
      localStorage.setItem('module_tests_completed', 'true');
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length === questions.length) {
      setShowFeedback(true);
      calculateScore();
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setScore(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quiz: Statistische Toetsen</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {!showFeedback ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Vraag {currentQuestion + 1} van {questions.length}
              </h2>
              <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
              <div className="space-y-3">
                {questions[currentQuestion].options.map(option => (
                  <div
                    key={option.id}
                    className={`p-3 rounded-lg border cursor-pointer ${
                      selectedAnswers[questions[currentQuestion].id] === option.id
                        ? 'bg-blue-50 border-blue-500'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                    onClick={() => handleAnswerSelect(questions[currentQuestion].id, option.id)}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                disabled={currentQuestion === 0}
              >
                Vorige
              </button>
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                disabled={currentQuestion === questions.length - 1}
              >
                Volgende
              </button>
            </div>

            {Object.keys(selectedAnswers).length === questions.length && (
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Controleer antwoorden
                </button>
              </div>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Resultaten</h2>
            <div className="mb-6">
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${score}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                  />
                </div>
              </div>
              <p className="mt-2 text-lg font-semibold">
                Score: {score?.toFixed(0)}%
              </p>
              {score && score >= 70 && (
                <p className="mt-2 text-green-600">
                  Gefeliciteerd! Je hebt de module succesvol afgerond.
                </p>
              )}
            </div>

            <div className="space-y-6">
              {questions.map(question => {
                const selectedOption = question.options.find(
                  opt => opt.id === selectedAnswers[question.id]
                );
                const correctOption = question.options.find(opt => opt.isCorrect);

                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg ${
                      selectedOption?.isCorrect ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <p className="font-semibold mb-2">{question.question}</p>
                    <p className="mb-2">
                      Jouw antwoord: {selectedOption?.text}
                    </p>
                    <p className="text-sm">
                      {selectedOption?.isCorrect
                        ? selectedOption.explanation
                        : `Helaas, dit is niet correct. ${correctOption?.explanation}`}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <button
                onClick={resetQuiz}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Opnieuw proberen
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/module5/interactie')}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Terug
        </button>
        <button
          onClick={() => navigate('/modules')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Naar dashboard
        </button>
      </div>
    </div>
  );
};

export default Quiz; 