import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DragItem {
  id: string;
  text: string;
  type: string;
  explanation: string;
}

const scenarios: DragItem[] = [
  {
    id: 'scenario1',
    text: 'Elke 10e student wordt gekozen',
    type: 'Systematisch',
    explanation: 'Dit is een systematische steekproef omdat er een vast interval (elke 10e) wordt gebruikt voor selectie.'
  },
  {
    id: 'scenario2',
    text: 'Onderzoekers verdelen studenten eerst op gender, dan random kiezen',
    type: 'Gestratificeerd',
    explanation: 'Dit is een gestratificeerde steekproef omdat de populatie eerst wordt verdeeld in subgroepen (gender) voordat er willekeurig wordt gekozen.'
  },
  {
    id: 'scenario3',
    text: 'Je kiest willekeurig 50 studenten uit een lijst',
    type: 'Simple random',
    explanation: 'Dit is een simple random steekproef omdat iedereen evenveel kans heeft om gekozen te worden.'
  },
  {
    id: 'scenario4',
    text: 'Je ondervraagt alleen studenten die op dat moment in de kantine zitten',
    type: 'Convenience',
    explanation: 'Dit is een convenience steekproef omdat je kiest voor wat makkelijk beschikbaar is.'
  },
  {
    id: 'scenario5',
    text: 'Studenten verwijzen andere studenten door',
    type: 'Sneeuwbal',
    explanation: 'Dit is een sneeuwbalsteekproef omdat deelnemers andere potentiële deelnemers aandragen.'
  },
  {
    id: 'scenario6',
    text: 'Een specifieke groep die aan criteria voldoet wordt geselecteerd',
    type: 'Doelgericht',
    explanation: 'Dit is een doelgerichte steekproef omdat je bewust kiest op basis van specifieke kenmerken.'
  }
];

const steekproefTypes = [
  'Systematisch',
  'Gestratificeerd',
  'Simple random',
  'Convenience',
  'Sneeuwbal',
  'Doelgericht'
];

const Interactie: React.FC = () => {
  const navigate = useNavigate();
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [placedItems, setPlacedItems] = useState<{ [key: string]: DragItem }>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDragStart = (item: DragItem, sourceType?: string) => {
    setDraggedItem(item);
    if (sourceType) {
      // Als het item uit een vak komt, verwijder het uit dat vak
      const newPlacedItems = { ...placedItems };
      delete newPlacedItems[sourceType];
      setPlacedItems(newPlacedItems);
    }
  };

  const handleDrop = (targetType: string) => {
    if (draggedItem) {
      const newPlacedItems = { ...placedItems };
      newPlacedItems[targetType] = draggedItem;
      setPlacedItems(newPlacedItems);
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkAnswers = () => {
    setShowFeedback(true);
  };

  const resetExercise = () => {
    setPlacedItems({});
    setShowFeedback(false);
  };

  const isCorrect = (type: string) => {
    return placedItems[type]?.type === type;
  };

  // Bereken welke scenarios nog niet geplaatst zijn
  const unplacedScenarios = scenarios.filter(scenario => 
    !Object.values(placedItems).some(item => item.id === scenario.id)
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Oefening: Match de Steekproeftechnieken</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Sleep de situaties naar het juiste type steekproef</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {steekproefTypes.map(type => (
            <div
              key={type}
              onDrop={() => handleDrop(type)}
              onDragOver={handleDragOver}
              className={`p-4 rounded-lg border-2 min-h-[100px] ${
                showFeedback
                  ? isCorrect(type)
                    ? 'border-green-500 bg-green-50'
                    : placedItems[type]
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <h3 className="font-semibold mb-2">{type}</h3>
              {placedItems[type] && (
                <div 
                  draggable={!showFeedback}
                  onDragStart={() => handleDragStart(placedItems[type], type)}
                  className={`p-2 ${showFeedback ? 'bg-white' : 'bg-blue-50 cursor-move hover:bg-blue-100'} rounded shadow`}
                >
                  {placedItems[type].text}
                  {showFeedback && (
                    <p className={`mt-2 text-sm ${isCorrect(type) ? 'text-green-600' : 'text-red-600'}`}>
                      {placedItems[type].explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Beschikbare situaties:</h3>
          <div className="space-y-2">
            {unplacedScenarios.map(item => (
              <div
                key={item.id}
                draggable={!showFeedback}
                onDragStart={() => handleDragStart(item)}
                className="p-2 bg-blue-50 rounded cursor-move hover:bg-blue-100"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={checkAnswers}
            disabled={Object.keys(placedItems).length !== steekproefTypes.length}
            className={`px-6 py-2 rounded-md ${
              Object.keys(placedItems).length !== steekproefTypes.length
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Controleer antwoorden
          </button>
          <button
            onClick={resetExercise}
            className="px-6 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/module4/uitleg')}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Terug
        </button>
        <button
          onClick={() => navigate('/module4/quiz')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Naar de quiz
        </button>
      </div>
    </div>
  );
};

export default Interactie; 