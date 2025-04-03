import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DragItem {
  id: string;
  text: string;
  type: string;
  explanation: string;
}

interface InterpretationOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

const outputItems: DragItem[] = [
  {
    id: 'output1',
    text: 'Normaliteitstest: p = 0.68\nHomogeniteitstest: p = 0.62\nt(56) = 2.12, p = 0.04, Cohen\'s d = 0.85',
    type: 'interpretation',
    explanation: 'De data is normaal verdeeld (p > 0.5), de varianties zijn gelijk (p > 0.5), er is een significant verschil (p < 0.05) met een groot effect (d > 0.8).'
  },
  {
    id: 'output2',
    text: 'Normaliteitstest: p = 0.45\nHomogeniteitstest: p = 0.32\nMann-Whitney U: p = 0.03, r = 0.42',
    type: 'interpretation',
    explanation: 'De data is niet normaal verdeeld (p < 0.5), de varianties zijn ongelijk (p < 0.5), er is een significant verschil (p < 0.05) met een middelmatig effect (r ≈ 0.4).'
  },
  {
    id: 'output3',
    text: 'Normaliteitstest: p = 0.72\nHomogeniteitstest: p = 0.58\nt(48) = 1.85, p = 0.07, Cohen\'s d = 0.52',
    type: 'interpretation',
    explanation: 'De data is normaal verdeeld (p > 0.5), de varianties zijn gelijk (p > 0.5), er is geen significant verschil (p > 0.05) met een middelmatig effect (d ≈ 0.5).'
  }
];

// Interpretatie-opties voor output 1 (t-test met normale verdeling en gelijke varianties)
const interpretationOptions1: InterpretationOption[] = [
  {
    id: 'interpretation1_1',
    text: 'Je mag de t-test gebruiken (normaliteit en homogeniteit OK)',
    isCorrect: true,
    explanation: 'Correct! Bij normaliteitstest p = 0.68 (> 0.5) en homogeniteitstest p = 0.62 (> 0.5) voldoe je aan de aannames voor de t-test.'
  },
  {
    id: 'interpretation1_2',
    text: 'Je moet Mann-Whitney gebruiken (aannames niet voldaan)',
    isCorrect: false,
    explanation: 'Onjuist! Bij normaliteitstest p = 0.68 (> 0.5) en homogeniteitstest p = 0.62 (> 0.5) voldoe je wel aan de aannames voor de t-test.'
  },
  {
    id: 'interpretation1_3',
    text: 'Het verschil tussen groepen is groot (Cohen\'s d = 0.85)',
    isCorrect: true,
    explanation: 'Correct! Cohen\'s d = 0.85 is groter dan 0.8, wat duidt op een groot effect.'
  },
  {
    id: 'interpretation1_4',
    text: 'Het verschil tussen groepen is niet significant (p > 0.05)',
    isCorrect: false,
    explanation: 'Onjuist! Bij t(56) = 2.12, p = 0.04 (< 0.05) is er wel een significant verschil.'
  }
];

// Interpretatie-opties voor output 2 (Mann-Whitney U met niet-normale verdeling en ongelijke varianties)
const interpretationOptions2: InterpretationOption[] = [
  {
    id: 'interpretation2_1',
    text: 'Je mag de t-test NIET gebruiken (aannames niet voldaan)',
    isCorrect: true,
    explanation: 'Correct! Bij normaliteitstest p = 0.45 (< 0.5) en homogeniteitstest p = 0.32 (< 0.5) voldoe je niet aan de aannames voor de t-test.'
  },
  {
    id: 'interpretation2_2',
    text: 'Je moet Mann-Whitney gebruiken (niet-normale verdeling)',
    isCorrect: true,
    explanation: 'Correct! Bij normaliteitstest p = 0.45 (< 0.5) is de data niet normaal verdeeld, dus moet je Mann-Whitney gebruiken.'
  },
  {
    id: 'interpretation2_3',
    text: 'Het verschil tussen groepen is middelmatig (r = 0.42)',
    isCorrect: true,
    explanation: 'Correct! Bij Mann-Whitney U: r = 0.42 is ongeveer 0.4, wat duidt op een middelmatig effect.'
  },
  {
    id: 'interpretation2_4',
    text: 'Je mag de t-test gebruiken (aannames voldaan)',
    isCorrect: false,
    explanation: 'Onjuist! Bij normaliteitstest p = 0.45 (< 0.5) en homogeniteitstest p = 0.32 (< 0.5) voldoe je niet aan de aannames voor de t-test.'
  }
];

// Interpretatie-opties voor output 3 (t-test met normale verdeling en gelijke varianties, maar geen significant verschil)
const interpretationOptions3: InterpretationOption[] = [
  {
    id: 'interpretation3_1',
    text: 'Je mag de t-test gebruiken (normaliteit en homogeniteit OK)',
    isCorrect: true,
    explanation: 'Correct! Bij normaliteitstest p = 0.72 (> 0.5) en homogeniteitstest p = 0.58 (> 0.5) voldoe je aan de aannames voor de t-test.'
  },
  {
    id: 'interpretation3_2',
    text: 'Je moet Mann-Whitney gebruiken (aannames niet voldaan)',
    isCorrect: false,
    explanation: 'Onjuist! Bij normaliteitstest p = 0.72 (> 0.5) en homogeniteitstest p = 0.58 (> 0.5) voldoe je wel aan de aannames voor de t-test.'
  },
  {
    id: 'interpretation3_3',
    text: 'Het verschil tussen groepen is niet significant (p > 0.05)',
    isCorrect: true,
    explanation: 'Correct! Bij t(48) = 1.85, p = 0.07 (> 0.05) is er geen significant verschil.'
  },
  {
    id: 'interpretation3_4',
    text: 'Het verschil tussen groepen is groot (Cohen\'s d = 0.52)',
    isCorrect: false,
    explanation: 'Onjuist! Cohen\'s d = 0.52 is ongeveer 0.5, wat duidt op een middelmatig effect, niet een groot effect.'
  }
];

const Interactie: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOutput, setSelectedOutput] = useState<DragItem | null>(null);
  const [selectedInterpretations, setSelectedInterpretations] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOutputSelect = (item: DragItem) => {
    setSelectedOutput(item);
    setSelectedInterpretations([]);
    setShowFeedback(false);
  };

  const handleInterpretationSelect = (id: string) => {
    if (selectedInterpretations.includes(id)) {
      setSelectedInterpretations(prev => prev.filter(i => i !== id));
    } else {
      setSelectedInterpretations(prev => [...prev, id]);
    }
  };

  const checkAnswers = () => {
    setShowFeedback(true);
  };

  const resetExercise = () => {
    setSelectedOutput(null);
    setSelectedInterpretations([]);
    setShowFeedback(false);
  };

  // Bepaal welke interpretatie-opties we moeten tonen op basis van de geselecteerde output
  const getInterpretationOptions = () => {
    if (!selectedOutput) return [];
    
    switch (selectedOutput.id) {
      case 'output1':
        return interpretationOptions1;
      case 'output2':
        return interpretationOptions2;
      case 'output3':
        return interpretationOptions3;
      default:
        return [];
    }
  };

  const currentInterpretationOptions = getInterpretationOptions();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Oefening: Output Interpreteren</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Kies een output en selecteer de juiste interpretaties</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Output selectie */}
          <div className="space-y-4">
            <h3 className="font-semibold">Beschikbare outputs:</h3>
            {outputItems.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border cursor-pointer ${
                  selectedOutput?.id === item.id
                    ? 'bg-blue-50 border-blue-500'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
                onClick={() => handleOutputSelect(item)}
              >
                <pre className="whitespace-pre-wrap">{item.text}</pre>
              </div>
            ))}
          </div>

          {/* Interpretatie opties */}
          <div className="space-y-4">
            <h3 className="font-semibold">Selecteer de juiste interpretaties:</h3>
            {selectedOutput && (
              <>
                {currentInterpretationOptions.map(option => (
                  <div
                    key={option.id}
                    className={`p-3 rounded-lg border cursor-pointer ${
                      selectedInterpretations.includes(option.id)
                        ? showFeedback
                          ? option.isCorrect
                            ? 'bg-green-50 border-green-500'
                            : 'bg-red-50 border-red-500'
                          : 'bg-blue-50 border-blue-500'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                    onClick={() => handleInterpretationSelect(option.id)}
                  >
                    {option.text}
                    {showFeedback && (
                      <p className={`mt-2 text-sm ${
                        option.isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {option.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {selectedOutput && (
          <div className="mt-6">
            <button
              onClick={checkAnswers}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Controleer antwoorden
            </button>
            <button
              onClick={resetExercise}
              className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <div className="space-x-4">
          <button
            onClick={() => navigate('/module6/intro')}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Terug naar intro
          </button>
          <button
            onClick={() => navigate('/module6/uitleg')}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Terug naar uitleg
          </button>
        </div>
        <button
          onClick={() => navigate('/module6/quiz')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Naar de quiz
        </button>
      </div>
    </div>
  );
};

export default Interactie; 