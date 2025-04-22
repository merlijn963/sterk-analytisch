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
    options: ["Gestratificeerd", "Convenience", "Sneeuwbal", "Random"],
    correctAnswer: 1,
    explanation: `
      ❌ Fout: Gestratificeerd betekent dat je de populatie in subgroepen verdeelt en daaruit steekproeven neemt.
      ✅ Goed: Dit is een convenience (gemaks) steekproef omdat je alleen mensen selecteert die toevallig aanwezig en beschikbaar zijn.
      ❌ Fout: Sneeuwbal betekent dat deelnemers anderen aanbevelen.
      ❌ Fout: Random betekent dat iedereen in de populatie een gelijke kans heeft om geselecteerd te worden.
    `,
  },
  {
    id: 2,
    text: "Elke 5e bezoeker van een winkel krijgt een enquête. Dit is een...",
    options: ["Systematische steekproef", "Cluster", "Convenience", "Sneeuwbal"],
    correctAnswer: 0,
    explanation: `
      ✅ Goed: Dit is een systematische steekproef omdat er een vast interval (elke 5e persoon) wordt gebruikt om deelnemers te selecteren.
      ❌ Fout: Cluster betekent dat je een hele groep selecteert, zoals een specifieke afdeling.
      ❌ Fout: Convenience betekent dat je mensen kiest die makkelijk bereikbaar zijn.
      ❌ Fout: Sneeuwbal betekent dat deelnemers anderen aanbevelen.
    `,
  },
  {
    id: 3,
    text: "Wat is een nadeel van een gemaksteekproef?",
    options: ["Moeilijk uitvoerbaar", "Geen representatie", "Te veel variabelen", "Te duur"],
    correctAnswer: 1,
    explanation: `
      ❌ Fout: Een gemaksteekproef is juist makkelijk uitvoerbaar.
      ✅ Goed: Het grootste nadeel van een gemaksteekproef is dat deze vaak niet representatief is voor de hele populatie.
      ❌ Fout: Er is geen sprake van te veel variabelen in een gemaksteekproef.
      ❌ Fout: Een gemaksteekproef is meestal goedkoop.
    `,
  },
  {
    id: 4,
    text: "Welke steekproefvorm gebruik je als je via-via mensen moet vinden?",
    options: ["Cluster", "Random", "Sneeuwbal", "Gestratificeerd"],
    correctAnswer: 2,
    explanation: `
      ❌ Fout: Cluster betekent dat je een hele groep selecteert, zoals een specifieke afdeling.
      ❌ Fout: Random betekent dat iedereen in de populatie een gelijke kans heeft om geselecteerd te worden.
      ✅ Goed: De sneeuwbalsteekproef is perfect voor situaties waarin je via-via mensen moet vinden.
      ❌ Fout: Gestratificeerd betekent dat je de populatie in subgroepen verdeelt en daaruit steekproeven neemt.
    `,
  },
  {
    id: 5,
    text: "Je kiest willekeurig een kamernummer als startpunt en kiest vervolgens elke 3e kamer op de lijst. Wat voor sampling is dit?",
    options: ["Clustered sampling", "Systematic sampling", "Stratified sampling", "Convenience sampling"],
    correctAnswer: 1,
    explanation: `
      ❌ Fout: Clustered sampling betekent dat je een hele groep selecteert, zoals een verdieping.
      ✅ Goed: Je gebruikt een vast interval vanaf een random startpunt, wat systematische steekproef is.
      ❌ Fout: Stratified sampling betekent dat je de populatie in subgroepen verdeelt en daaruit steekproeven neemt.
      ❌ Fout: Convenience sampling betekent dat je mensen kiest die makkelijk bereikbaar zijn.
    `,
  },
  {
    id: 6,
    text: "Een onderzoeker vraagt op sociale media of mensen vrijwillig mee willen doen aan zijn onderzoek over slaapgedrag. Wat voor samplingmethode gebruikt hij?",
    options: ["Snowball sampling", "Self-selection sampling", "Quota sampling", "Simple random sampling"],
    correctAnswer: 1,
    explanation: `
      ❌ Fout: Snowball sampling betekent dat deelnemers anderen aanbevelen.
      ✅ Goed: Mensen melden zichzelf aan om mee te doen, wat self-selection sampling is.
      ❌ Fout: Quota sampling betekent dat je vooraf quota bepaalt voor subgroepen.
      ❌ Fout: Simple random sampling betekent dat iedereen in de populatie een gelijke kans heeft om geselecteerd te worden.
    `,
  },
  {
    id: 7,
    text: "Een bedrijf maakt een lijst van al hun medewerkers: parttime ochtend, parttime avond en fulltime. Ze nemen uit elke groep een evenredig aantal respondenten. Wat is dit voor sampling?",
    options: ["Stratified sampling", "Clustered sampling", "Simple random sampling", "Convenience sampling"],
    correctAnswer: 0,
    explanation: `
      ✅ Goed: Je deelt de populatie op in subgroepen en trekt uit elke groep een steekproef, wat stratified sampling is.
      ❌ Fout: Clustered sampling betekent dat je een hele groep selecteert, zoals een specifieke afdeling.
      ❌ Fout: Simple random sampling betekent dat iedereen in de populatie een gelijke kans heeft om geselecteerd te worden.
      ❌ Fout: Convenience sampling betekent dat je mensen kiest die makkelijk bereikbaar zijn.
    `,
  },
];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const getFeedback = () => {
    const selectedAnswer = answers[currentQuestion];
    const currentQ = questions[currentQuestion];
    const explanations = currentQ.explanation.split('\n').map((line) => line.trim());

    if (selectedAnswer === currentQ.correctAnswer) {
      const correctExplanation = explanations.find((line) => line.startsWith('✅ Goed:'));
      return correctExplanation ? correctExplanation : "✅ Goed: Correct antwoord!";
    } else {
      const incorrectExplanation = explanations.find((line) =>
        line.startsWith(`❌ Fout:`) && line.includes(currentQ.options[selectedAnswer])
      );
      return incorrectExplanation ? incorrectExplanation : "❌ Fout: Geen uitleg beschikbaar.";
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowFeedback(false);
    } else {
      const score = answers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      const percentage = (score / questions.length) * 100;

      if (percentage >= 70) {
        navigate('/dashboard');
      } else {
        alert(`Je hebt de quiz afgerond met een score van ${percentage}%. Probeer het opnieuw!`);
      }
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Quiz: Steekproeftechnieken</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            Vraag {currentQuestion + 1} van {questions.length}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-6">{currentQ.text}</h2>

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
            <p className="text-gray-700">{getFeedback()}</p>
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