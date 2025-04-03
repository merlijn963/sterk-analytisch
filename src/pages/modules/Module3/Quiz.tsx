import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Een test meet steeds hetzelfde, maar niet het juiste construct. Wat is waar?",
      options: [
        "Wel valide, niet betrouwbaar",
        "Wel betrouwbaar, niet valide",
        "Niet valide, niet betrouwbaar",
        "Wel valide en betrouwbaar"
      ],
      correctAnswer: 1,
      explanation: "De test is betrouwbaar omdat deze consistent meet, maar niet valide omdat het niet het juiste construct meet."
    },
    {
      id: 2,
      question: "Cronbach's Alpha meet:",
      options: [
        "Validiteit",
        "Betrouwbaarheid",
        "Constructvaliditeit",
        "Toevalsmeetfout"
      ],
      correctAnswer: 1,
      explanation: "Cronbach's Alpha is een maat voor de interne consistentie en daarmee voor de betrouwbaarheid van een meetinstrument."
    },
    {
      id: 3,
      question: "De vragen van een test behandelen slechts een deel van het onderwerp. Wat ontbreekt?",
      options: [
        "Betrouwbaarheid",
        "Constructvaliditeit",
        "Inhoudsvaliditeit",
        "Interne validiteit"
      ],
      correctAnswer: 2,
      explanation: "Inhoudsvaliditeit ontbreekt omdat niet alle belangrijke aspecten van het construct worden gemeten."
    },
    {
      id: 4,
      question: "Een IQ-test bevat vooral motivatievragen. Wat is fout?",
      options: [
        "Het is niet betrouwbaar",
        "Het is niet valide",
        "Het is volledig valide",
        "Cronbach's Alpha is te laag"
      ],
      correctAnswer: 1,
      explanation: "De test is niet valide omdat deze niet meet wat het pretendeert te meten (intelligentie)."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowFeedback(false);
    } else {
      // Bereken score
      const score = answers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      const percentage = (score / questions.length) * 100;

      // Navigeer naar dashboard als score ≥ 70%
      if (percentage >= 70) {
        navigate('/dashboard');
      }
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Quiz: Validiteit & Betrouwbaarheid</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            Vraag {currentQuestion + 1} van {questions.length}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

        <div className="space-y-4">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-md transition-colors ${
                showFeedback
                  ? index === currentQ.correctAnswer
                    ? 'bg-green-100 text-green-800'
                    : answers[currentQuestion] === index
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-50'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-gray-700">{currentQ.explanation}</p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!showFeedback}
            className={`btn ${
              showFeedback ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Volgende' : 'Afronden'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 