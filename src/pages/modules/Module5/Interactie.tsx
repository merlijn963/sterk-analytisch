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
    text: 'Is er verschil in klanttevredenheid tussen 3 hotels?',
    type: 'ANOVA',
    explanation: 'Je vergelijkt gemiddelde tevredenheid tussen 3 groepen (hotels), dus ANOVA is de juiste keuze.'
  },
  {
    id: 'scenario2',
    text: 'Bestaat er een verband tussen geslacht en productkeuze?',
    type: 'Chi-kwadraat',
    explanation: 'Beide variabelen zijn categorisch (geslacht en productkeuze), dus Chi-kwadraat is geschikt.'
  },
  {
    id: 'scenario3',
    text: 'Is er een verband tussen opleidingsniveau en inkomen?',
    type: 'Correlatie',
    explanation: 'Je onderzoekt het verband tussen twee continue variabelen, dus gebruik je correlatie.'
  },
  {
    id: 'scenario4',
    text: 'Zijn mannen en vrouwen even lang gemiddeld?',
    type: 'T-toets',
    explanation: 'Je vergelijkt gemiddelde lengte tussen 2 groepen (mannen en vrouwen), dus T-toets is geschikt.'
  },
  {
    id: 'scenario5',
    text: 'Zijn mensen met hond gelukkiger dan mensen zonder hond?',
    type: 'T-toets',
    explanation: 'Je vergelijkt gemiddeld geluksniveau tussen 2 groepen (met/zonder hond), dus T-toets is geschikt.'
  }
];

const toetsTypes = ['T-toets', 'ANOVA', 'Chi-kwadraat', 'Correlatie'];

const Interactie: React.FC = () => {
  const navigate = useNavigate();
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [placedItems, setPlacedItems] = useState<{ [key: string]: DragItem[] }>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDragStart = (item: DragItem, sourceType?: string) => {
    setDraggedItem(item);
    if (sourceType) {
      // Als het item uit een vak komt, verwijder het uit dat vak
      const newPlacedItems = { ...placedItems };
      newPlacedItems[sourceType] = newPlacedItems[sourceType].filter(i => i.id !== item.id);
      if (newPlacedItems[sourceType].length === 0) {
        delete newPlacedItems[sourceType];
      }
      setPlacedItems(newPlacedItems);
    }
  };

  const handleDrop = (targetType: string) => {
    if (draggedItem) {
      const newPlacedItems = { ...placedItems };
      if (!newPlacedItems[targetType]) {
        newPlacedItems[targetType] = [];
      }
      newPlacedItems[targetType].push(draggedItem);
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

  const isCorrect = (type: string, item: DragItem) => {
    return item.type === type;
  };

  // Bereken welke scenarios nog niet geplaatst zijn
  const unplacedScenarios = scenarios.filter(scenario => 
    !Object.values(placedItems).flat().some(item => item.id === scenario.id)
  );

  const allItemsPlaced = scenarios.length === Object.values(placedItems).flat().length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Oefening: Kies de Juiste Toets</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Sleep elke onderzoeksvraag naar de juiste statistische toets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {toetsTypes.map(type => (
            <div
              key={type}
              onDrop={() => handleDrop(type)}
              onDragOver={handleDragOver}
              className={`p-4 rounded-lg border-2 min-h-[150px] ${
                showFeedback && placedItems[type]?.length > 0
                  ? placedItems[type].every(item => isCorrect(type, item))
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <h3 className="font-semibold mb-2">{type}</h3>
              {placedItems[type]?.map(item => (
                <div 
                  key={item.id}
                  draggable={!showFeedback}
                  onDragStart={() => handleDragStart(item, type)}
                  className={`p-2 mb-2 ${
                    showFeedback
                      ? isCorrect(type, item)
                        ? 'bg-green-100'
                        : 'bg-red-100'
                      : 'bg-blue-50 cursor-move hover:bg-blue-100'
                  } rounded shadow`}
                >
                  {item.text}
                  {showFeedback && (
                    <p className={`mt-2 text-sm ${
                      isCorrect(type, item) ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Beschikbare onderzoeksvragen:</h3>
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
            disabled={!allItemsPlaced}
            className={`px-6 py-2 rounded-md ${
              !allItemsPlaced
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
          onClick={() => navigate('/module5/uitleg')}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Terug
        </button>
        <button
          onClick={() => navigate('/module5/quiz')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Naar de quiz
        </button>
      </div>
    </div>
  );
};

export default Interactie; 