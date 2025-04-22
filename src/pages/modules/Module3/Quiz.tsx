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
      question: "Een onderzoek naar sociale angst gebruikt een vragenlijst met items over angst, vermijding, lichamelijke klachten en zelfbeeld. Wat is dit een voorbeeld van?",
      options: [
        "Criteriumvaliditeit",
        "Inhoudsvaliditeit",
        "Interne validiteit",
        "Externe validiteit"
      ],
      correctAnswer: 1,
      explanation: `
        ❌ Fout: Dit zegt niets over de relatie met een externe maatstaf, zoals gedrag of prestaties.
        ✅ Goed: De test dekt alle belangrijke onderdelen van sociale angst — dus de inhoud is volledig.
        ❌ Fout: Interne validiteit gaat over oorzaak-gevolg, niet over testinhoud.
        ❌ Fout: Externe validiteit gaat over toepasbaarheid buiten de onderzoeksgroep, niet over wat er precies gemeten wordt.
      `
    },
    {
      id: 2,
      question: "Een vragenlijst over discipline is gebaseerd op bestaande theorieën over zelfcontrole en doorzettingsvermogen. Welke validiteit wordt hiermee versterkt?",
      options: [
        "Constructvaliditeit",
        "Interne validiteit",
        "Criteriumvaliditeit",
        "Face validity"
      ],
      correctAnswer: 0,
      explanation: `
        ✅ Goed: De test is gebaseerd op theoretische definities van het construct ‘discipline’.
        ❌ Fout: Die gaat over storende factoren binnen een experiment.
        ❌ Fout: Die gaat over of de test overeenkomt met een externe uitkomst, zoals werkprestaties.
        ❌ Fout: Die zegt iets over of de test er logisch uitziet — niet of hij goed gebaseerd is op theorie.
      `
    },
    {
      id: 3,
      question: "Een HR-afdeling ontwikkelt een test om teamwork te meten. Ze vergelijken de testresultaten met beoordelingen van teamleiders. Welke validiteit is hier van toepassing?",
      options: [
        "Inhoudsvaliditeit",
        "Constructvaliditeit",
        "Criteriumvaliditeit",
        "Interne validiteit"
      ],
      correctAnswer: 2,
      explanation: `
        ❌ Fout: Die zegt of alle onderdelen van teamwork in de test zitten, niet of het overeenkomt met iets anders.
        ❌ Fout: Die gaat over of de test theoretisch goed aansluit.
        ✅ Goed: De test wordt vergeleken met een externe maatstaf (de beoordelingen van leidinggevenden).
        ❌ Fout: Dat heeft te maken met oorzaak-gevolgrelaties in experimenten.
      `
    },
    {
      id: 4,
      question: "Een vragenlijst over mentale gezondheid bevat herkenbare en logische vragen volgens de deelnemers, maar is niet wetenschappelijk gevalideerd. Wat zegt dit over de validiteit?",
      options: [
        "Hoge inhoudsvaliditeit",
        "Lage betrouwbaarheid",
        "Hoge face validity",
        "Lage constructvaliditeit"
      ],
      correctAnswer: 2,
      explanation: `
        ❌ Fout: Dat kun je alleen zeggen als het echt alle onderdelen van het onderwerp dekt — hier gaat het alleen om indruk.
        ❌ Fout: Niets in de vraag wijst op onbetrouwbare (wisselende) uitkomsten.
        ✅ Goed: De test ziet er logisch uit voor gebruikers, ook al is hij niet wetenschappelijk getest.
        ❌ Fout: Misschien klopt dat ook, maar de vraag zegt daar niks over — de nadruk ligt op hoe het eruitziet.
      `
    },
    {
      id: 5,
      question: "Onderzoekers testen het effect van een nieuwe training, maar vergeten dat sommige deelnemers ook al extra coaching kregen. Wat raakt hierdoor verstoord?",
      options: [
        "Externe validiteit",
        "Face validity",
        "Inhoudsvaliditeit",
        "Interne validiteit"
      ],
      correctAnswer: 3,
      explanation: `
        ❌ Fout: Dat gaat over toepasbaarheid buiten de onderzoeksgroep, niet over verstoring binnen het experiment.
        ❌ Fout: Hier gaat het niet om hoe logisch iets eruitziet.
        ❌ Fout: Het probleem zit niet in de testinhoud.
        ✅ Goed: Er is een andere factor (extra coaching) die het effect kan verklaren → dus oorzaak-gevolg is niet duidelijk.
      `
    },
    {
      id: 6,
      question: "Een studie over gastvrijheid wordt uitgevoerd op een klein resort, maar de resultaten worden toegepast op grote stadshotels wereldwijd. Welke validiteit is hier mogelijk beperkt?",
      options: [
        "Interne validiteit",
        "Constructvaliditeit",
        "Externe validiteit",
        "Criteriumvaliditeit"
      ],
      correctAnswer: 2,
      explanation: `
        ❌ Fout: Intern klopt het misschien prima — het probleem is juist de toepasbaarheid buiten de context.
        ❌ Fout: Er is geen reden om te denken dat het construct fout gemeten wordt.
        ✅ Goed: Je weet niet zeker of de resultaten van het resort ook gelden voor grote hotels — dus generaliseerbaarheid is beperkt.
        ❌ Fout: Er wordt niets vergeleken met een externe maatstaf of uitkomst.
      `
    },
    {
      id: 7,
      question: "Een onderzoeker meet motivatie met een test die elke keer andere resultaten oplevert bij dezelfde persoon, onder dezelfde omstandigheden. Wat is het probleem?",
      options: [
        "Betrouwbaarheid",
        "Face validity",
        "Criteriumvaliditeit",
        "Externe validiteit"
      ],
      correctAnswer: 0,
      explanation: `
        ✅ Goed: De test is niet consistent — dus de betrouwbaarheid is laag.
        ❌ Fout: Dit zegt niets over hoe de test eruitziet.
        ❌ Fout: Er wordt niets gezegd over vergelijking met een andere uitkomst.
        ❌ Fout: We hebben geen informatie over toepasbaarheid buiten de steekproef.
      `
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const getFeedback = () => {
    const selectedAnswer = answers[currentQuestion];
    if (selectedAnswer === currentQ.correctAnswer) {
      return `✅ Goed: ${currentQ.explanation.split('✅ Goed: ')[1]?.split('❌')[0].trim()}`;
    } else {
      const incorrectExplanation = currentQ.explanation
        .split('❌ Fout: ')[selectedAnswer + 1]
        ?.split('✅')[0]
        .trim();
      return `❌ Fout: ${incorrectExplanation}`;
    }
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
      } else {
        // Toon een bericht als de score lager is dan 70%
        alert(`Je hebt de quiz afgerond met een score van ${percentage}%. Probeer het opnieuw!`);
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