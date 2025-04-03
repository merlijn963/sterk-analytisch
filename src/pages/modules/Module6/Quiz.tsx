import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    question: "Je ziet de volgende resultaten van een statistische analyse:\n- Normaliteitstest: p = 0.68\n- Homogeniteitstest: p = 0.62\n- t-test: p = 0.04\n- Cohen's d = 0.85\n\nWat is de juiste interpretatie?",
    options: [
      {
        id: "a",
        text: "De data is normaal verdeeld (p = 0.68), de varianties zijn gelijk (p = 0.62), en er is een significant verschil tussen de groepen (p = 0.04) met een groot effect (d = 0.85)",
        isCorrect: true,
        explanation: "Dit is correct omdat:\n1. De normaliteitstest p = 0.68 > 0.5, dus de data is normaal verdeeld\n2. De homogeniteitstest p = 0.62 > 0.5, dus de varianties zijn gelijk\n3. De t-test p = 0.04 < 0.05, dus er is een significant verschil\n4. Cohen's d = 0.85 > 0.8, dus er is een groot effect"
      },
      {
        id: "b",
        text: "De data is niet normaal verdeeld (p = 0.68), de varianties zijn ongelijk (p = 0.62), en er is geen significant verschil (p = 0.04)",
        isCorrect: false,
        explanation: "Dit is fout omdat:\n1. De normaliteitstest p = 0.68 > 0.5, dus de data is WEL normaal verdeeld\n2. De homogeniteitstest p = 0.62 > 0.5, dus de varianties zijn WEL gelijk\n3. De t-test p = 0.04 < 0.05, dus er is WEL een significant verschil"
      },
      {
        id: "c",
        text: "De data is normaal verdeeld (p = 0.68), de varianties zijn gelijk (p = 0.62), maar er is geen significant verschil (p = 0.04)",
        isCorrect: false,
        explanation: "Dit is fout omdat:\n1. De eerste twee beweringen zijn correct (p > 0.5 voor beide tests)\n2. Maar de t-test p = 0.04 < 0.05, dus er is WEL een significant verschil"
      },
      {
        id: "d",
        text: "De data is normaal verdeeld (p = 0.68), de varianties zijn ongelijk (p = 0.62), dus je moet Mann-Whitney gebruiken",
        isCorrect: false,
        explanation: "Dit is fout omdat:\n1. De normaliteitstest p = 0.68 > 0.5, dus de data is normaal verdeeld\n2. De homogeniteitstest p = 0.62 > 0.5, dus de varianties zijn WEL gelijk\n3. Omdat beide aannames voldaan zijn (p > 0.5), is de t-test geschikt en hoef je geen Mann-Whitney te gebruiken"
      }
    ]
  },
  {
    id: 2,
    question: "Je ziet de volgende resultaten van een statistische analyse:\n- Normaliteitstest: p = 0.45\n- Homogeniteitstest: p = 0.32\n- Mann-Whitney U test: p = 0.03\n- Effectgrootte r = 0.42\n\nWat is de juiste interpretatie?",
    options: [
      {
        id: "a",
        text: "De data is niet normaal verdeeld (p = 0.45), de varianties zijn ongelijk (p = 0.32), en er is een significant verschil (p = 0.03) met een groot effect (r = 0.42)",
        isCorrect: true,
        explanation: "Dit is correct omdat:\n1. De normaliteitstest p = 0.45 < 0.5, dus de data is niet normaal verdeeld\n2. De homogeniteitstest p = 0.32 < 0.5, dus de varianties zijn ongelijk\n3. De Mann-Whitney p = 0.03 < 0.05, dus er is een significant verschil\n4. r = 0.42 > 0.3, dus er is een groot effect"
      },
      {
        id: "b",
        text: "De data is normaal verdeeld (p = 0.45), de varianties zijn gelijk (p = 0.32), dus je moet de t-test gebruiken",
        isCorrect: false,
        explanation: "Dit is fout omdat:\n1. De normaliteitstest p = 0.45 < 0.5, dus de data is NIET normaal verdeeld\n2. De homogeniteitstest p = 0.32 < 0.5, dus de varianties zijn NIET gelijk\n3. Omdat beide aannames niet voldaan zijn (p < 0.5), moet je Mann-Whitney gebruiken, niet de t-test"
      },
      {
        id: "c",
        text: "De data is niet normaal verdeeld (p = 0.45), de varianties zijn ongelijk (p = 0.32), maar er is geen significant verschil (p = 0.03)",
        isCorrect: false,
        explanation: "Dit is fout omdat:\n1. De eerste twee beweringen zijn correct (p < 0.5 voor beide tests)\n2. Maar de Mann-Whitney p = 0.03 < 0.05, dus er is WEL een significant verschil"
      },
      {
        id: "d",
        text: "De data is niet normaal verdeeld (p = 0.45), de varianties zijn ongelijk (p = 0.32), en er is een significant verschil (p = 0.03) met een klein effect (r = 0.42)",
        isCorrect: false,
        explanation: "Dit is fout omdat:\n1. De eerste drie beweringen zijn correct\n2. Maar r = 0.42 > 0.3, dus er is een GROOT effect, niet een klein effect"
      }
    ]
  },
  {
    id: 3,
    question: "Je ziet de volgende resultaten van een statistische analyse:\n- Normaliteitstest: p = 0.72\n- Homogeniteitstest: p = 0.58\n- t-test: p = 0.07\n- Cohen's d = 0.52\n\nWat is de juiste interpretatie?",
    options: [
      {
        id: "a",
        text: "De data is normaal verdeeld (p = 0.72), de varianties zijn gelijk (p = 0.58), maar er is geen significant verschil (p = 0.07) met een middelmatig effect (d = 0.52)",
        isCorrect: true,
        explanation: "Dit is correct omdat:\n1. De normaliteitstest p = 0.72 > 0.5, dus de data is normaal verdeeld\n2. De homogeniteitstest p = 0.58 > 0.5, dus de varianties zijn gelijk\n3. De t-test p = 0.07 > 0.05, dus er is geen significant verschil\n4. Cohen's d = 0.52 is tussen 0.2 en 0.8, dus er is een middelmatig effect"
      },
      {
        id: "b",
        text: "De data is niet normaal verdeeld (p = 0.72), de varianties zijn ongelijk (p = 0.58), dus je moet Mann-Whitney gebruiken",
        isCorrect: false,
        explanation: "Dit is fout omdat:\n1. De normaliteitstest p = 0.72 > 0.5, dus de data is WEL normaal verdeeld\n2. De homogeniteitstest p = 0.58 > 0.5, dus de varianties zijn WEL gelijk\n3. Omdat beide aannames voldaan zijn (p > 0.5), is de t-test geschikt en hoef je geen Mann-Whitney te gebruiken"
      },
      {
        id: "c",
        text: "De data is normaal verdeeld (p = 0.72), de varianties zijn gelijk (p = 0.58), en er is een significant verschil (p = 0.07)",
        isCorrect: false,
        explanation: "Dit is fout omdat:\n1. De eerste twee beweringen zijn correct (p > 0.5 voor beide tests)\n2. Maar de t-test p = 0.07 > 0.05, dus er is GEEN significant verschil"
      },
      {
        id: "d",
        text: "De data is normaal verdeeld (p = 0.72), de varianties zijn gelijk (p = 0.58), en er is geen significant verschil (p = 0.07) met een groot effect (d = 0.52)",
        isCorrect: false,
        explanation: "Dit is fout omdat:\n1. De eerste drie beweringen zijn correct\n2. Maar Cohen's d = 0.52 is tussen 0.2 en 0.8, dus er is een MIDDELMATIG effect, niet een groot effect"
      }
    ]
  }
];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerId;
    setSelectedAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      const score = selectedAnswers.reduce((acc, answer, index) => {
        const question = questions[index];
        const selectedOption = question.options.find(opt => opt.id === answer);
        return acc + (selectedOption?.isCorrect ? 1 : 0);
      }, 0);
      const percentage = (score / questions.length) * 100;
      setQuizCompleted(true);
      
      // Save progress to localStorage
      localStorage.setItem('module_output_progress', percentage.toString());
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
      const question = questions[index];
      const selectedOption = question.options.find(opt => opt.id === answer);
      return acc + (selectedOption?.isCorrect ? 1 : 0);
    }, 0);
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quiz: Output Interpreteren</h1>

      {!quizCompleted ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              Vraag {currentQuestion + 1} van {questions.length}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{currentQuestionData.question}</h2>
          </div>

          <div className="space-y-4">
            {currentQuestionData.options.map((option) => (
              <div
                key={option.id}
                className={`p-4 rounded-lg border cursor-pointer ${
                  selectedAnswers[currentQuestion] === option.id
                    ? showFeedback
                      ? option.isCorrect
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                      : 'bg-blue-50 border-blue-500'
                    : showFeedback && option.isCorrect
                    ? 'bg-green-50 border-green-500'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
                onClick={() => !showFeedback && handleAnswerSelect(option.id)}
              >
                <div className="flex items-center">
                  <span className="font-medium">{option.text}</span>
                </div>
                {showFeedback && (
                  (selectedAnswers[currentQuestion] === option.id || option.isCorrect) && (
                    <p className={`mt-2 text-sm ${
                      option.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {option.explanation}
                    </p>
                  )
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              Vorige
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion]}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {currentQuestion === questions.length - 1 ? 'Afronden' : 'Volgende'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Voltooid!</h2>
          <p className="text-xl mb-4">Je score: {calculateScore()}%</p>
          <button
            onClick={() => navigate('/modules')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Terug naar Modules
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz; 