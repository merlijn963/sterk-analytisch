import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DragItem {
  id: string;
  text: string;
  category: 'validiteit' | 'betrouwbaarheid';
  explanation: string;
}

const items: DragItem[] = [
  { 
    id: '1', 
    text: 'Een test meet wél altijd hetzelfde, maar niet het juiste', 
    category: 'betrouwbaarheid',
    explanation: 'Dit is een voorbeeld van hoge betrouwbaarheid maar lage validiteit. De test meet consistent (betrouwbaar) maar meet niet wat het zou moeten meten (niet valide).'
  },
  { 
    id: '2', 
    text: 'Een meetinstrument mist een deel van het onderwerp', 
    category: 'validiteit',
    explanation: 'Dit is een probleem met inhoudsvaliditeit: het meetinstrument dekt niet het volledige construct dat het zou moeten meten.'
  },
  { 
    id: '3', 
    text: "Cronbach's α = 0.91", 
    category: 'betrouwbaarheid',
    explanation: 'Cronbach\'s Alpha is een maat voor betrouwbaarheid (interne consistentie). Een waarde van 0.91 duidt op een hoge betrouwbaarheid.'
  },
  { 
    id: '4', 
    text: 'De test voorspelt de praktijk niet goed', 
    category: 'validiteit',
    explanation: 'Dit is een probleem met criteriumvaliditeit: de test is niet goed in staat om externe uitkomsten te voorspellen.'
  },
  { 
    id: '5', 
    text: 'De resultaten zijn stabiel over tijd', 
    category: 'betrouwbaarheid',
    explanation: 'Stabiliteit over tijd is een kenmerk van betrouwbaarheid - het meetinstrument geeft consistente resultaten bij herhaalde metingen.'
  },
  { 
    id: '6', 
    text: 'De vragen meten niet goed wat je wil meten', 
    category: 'validiteit',
    explanation: 'Dit is een fundamenteel probleem met validiteit: het meetinstrument meet niet wat het zou moeten meten.'
  }
];

const Interactie: React.FC = () => {
  const navigate = useNavigate();
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [unplacedItems, setUnplacedItems] = useState<DragItem[]>(items);
  const [placedItems, setPlacedItems] = useState<{
    validiteit: DragItem[];
    betrouwbaarheid: DragItem[];
  }>({
    validiteit: [],
    betrouwbaarheid: []
  });

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDrop = (category: 'validiteit' | 'betrouwbaarheid') => {
    if (!draggedItem) return;

    // Verwijder het item uit zijn huidige locatie
    if (unplacedItems.find(item => item.id === draggedItem.id)) {
      setUnplacedItems(unplacedItems.filter(item => item.id !== draggedItem.id));
    } else {
      setPlacedItems({
        validiteit: placedItems.validiteit.filter(item => item.id !== draggedItem.id),
        betrouwbaarheid: placedItems.betrouwbaarheid.filter(item => item.id !== draggedItem.id)
      });
    }

    // Voeg het item toe aan de nieuwe categorie
    setPlacedItems(prev => ({
      ...prev,
      [category]: [...prev[category], draggedItem]
    }));

    setDraggedItem(null);
  };

  const handleReset = () => {
    setUnplacedItems(items);
    setPlacedItems({ validiteit: [], betrouwbaarheid: [] });
    setShowFeedback(false);
  };

  const handleCheck = () => {
    setShowFeedback(true);
  };

  const allItemsPlaced = unplacedItems.length === 0;
  const allCorrect = showFeedback && 
    placedItems.validiteit.every(item => item.category === 'validiteit') &&
    placedItems.betrouwbaarheid.every(item => item.category === 'betrouwbaarheid');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Sleep de voorbeelden naar de juiste categorie</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Validiteit Container */}
        <div 
          className="bg-purple-100 p-6 rounded-lg min-h-[300px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop('validiteit')}
        >
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Validiteit</h2>
          <div className="space-y-2">
            {placedItems.validiteit.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className={`p-3 rounded cursor-move ${
                  showFeedback
                    ? item.category === 'validiteit'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <p>{item.text}</p>
                {showFeedback && (
                  <p className="mt-2 text-sm italic">
                    {item.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Betrouwbaarheid Container */}
        <div 
          className="bg-blue-100 p-6 rounded-lg min-h-[300px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop('betrouwbaarheid')}
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Betrouwbaarheid</h2>
          <div className="space-y-2">
            {placedItems.betrouwbaarheid.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className={`p-3 rounded cursor-move ${
                  showFeedback
                    ? item.category === 'betrouwbaarheid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <p>{item.text}</p>
                {showFeedback && (
                  <p className="mt-2 text-sm italic">
                    {item.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ongeplaatste items */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Te plaatsen items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unplacedItems.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="bg-white p-4 rounded shadow cursor-move hover:shadow-md transition-shadow"
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleReset}
          className="btn btn-secondary"
        >
          Reset
        </button>
        
        <div className="space-x-4">
          <button
            onClick={handleCheck}
            disabled={!allItemsPlaced || showFeedback}
            className={`btn ${
              allItemsPlaced && !showFeedback
                ? 'btn-primary'
                : 'btn-secondary opacity-50 cursor-not-allowed'
            }`}
          >
            Controleer
          </button>

          {showFeedback && allCorrect && (
            <button
              onClick={() => navigate('/module3/quiz')}
              className="btn btn-primary"
            >
              Ga door naar Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interactie; 