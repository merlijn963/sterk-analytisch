import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Je ondervraagt alleen mensen die beschikbaar zijn op locatie. Wat voor steekproef is dit?",
    options: [
      "Gestratificeerd",
      "Convenience",
      "Sneeuwbal",
      "Random"
    ],
    correctAnswer: 1,
    explanation: "Dit is een convenience (gemaks) steekproef omdat je alleen mensen selecteert die toevallig aanwezig en beschikbaar zijn. Dit is makkelijk uitvoerbaar maar niet representatief."
  },
  {
    id: 2,
    text: "Elke 5e bezoeker van een winkel krijgt een enquête. Dit is een...",
    options: [
      "Systematische steekproef",
      "Cluster",
      "Convenience",
      "Sneeuwbal"
    ],
    correctAnswer: 0,
    explanation: "Dit is een systematische steekproef omdat er een vast interval (elke 5e persoon) wordt gebruikt om deelnemers te selecteren."
  },
  {
    id: 3,
    text: "Wat is een nadeel van een gemaksteekproef?",
    options: [
      "Moeilijk uitvoerbaar",
      "Geen representatie",
      "Te veel variabelen",
      "Te duur"
    ],
    correctAnswer: 1,
    explanation: "Het grootste nadeel van een gemaksteekproef is dat deze vaak niet representatief is voor de hele populatie, omdat je alleen mensen selecteert die makkelijk bereikbaar zijn."
  },
  {
    id: 4,
    text: "Welke steekproefvorm gebruik je als je via-via mensen moet vinden?",
    options: [
      "Cluster",
      "Random",
      "Sneeuwbal",
      "Gestratificeerd"
    ],
    correctAnswer: 2,
    explanation: "De sneeuwbalsteekproef is perfect voor situaties waarin je via-via mensen moet vinden, omdat deelnemers andere potentiële deelnemers kunnen aanbevelen."
  }
];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      const score = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      const percentage = (score / questions.length) * 100;
      setQuizCompleted(true);
      
      // Save progress to localStorage
      localStorage.setItem('module_sampling_progress', percentage.toString());
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(false);
    }
  };

  const calculateScore = () => {
    const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return Math.round((correctAnswers / questions.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quiz: Steekproeftechnieken</h1>

      {!quizCompleted ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Vraag {currentQuestion + 1}</h2>
            <p className="text-lg mb-4">{questions[currentQuestion].text}</p>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded-md ${
                  selectedAnswers[currentQuestion] === index
                    ? selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                } border ${
                  showFeedback && index === questions[currentQuestion].correctAnswer
                    ? 'border-green-500'
                    : 'border-transparent'
                }`}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-blue-800">{questions[currentQuestion].explanation}</p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-md ${
                currentQuestion === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Vorige
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === -1}
              className={`px-6 py-2 rounded-md ${
                selectedAnswers[currentQuestion] === -1
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Afronden' : 'Volgende'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Quiz afgerond!</h2>
          <p className="text-lg mb-4">
            Je score: {calculateScore()}%
          </p>
          {calculateScore() >= 70 ? (
            <div className="p-4 bg-green-50 rounded-md mb-4">
              <p className="text-green-800">
                Gefeliciteerd! Je hebt de quiz succesvol afgerond met een score van {calculateScore()}%.
                Je hebt voldoende kennis van steekproeftechnieken aangetoond.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 rounded-md mb-4">
              <p className="text-yellow-800">
                Je hebt de quiz afgerond met een score van {calculateScore()}%.
                Om de module succesvol af te ronden heb je een score van minimaal 70% nodig.
                Probeer het nog een keer!
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <button
              onClick={() => {
                setQuizCompleted(false);
                setCurrentQuestion(0);
                setSelectedAnswers(Array(questions.length).fill(-1));
                setShowFeedback(false);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Opnieuw proberen
            </button>
            {calculateScore() >= 70 && (
              <button
                onClick={() => navigate('/modules')}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Terug naar modules
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz; 