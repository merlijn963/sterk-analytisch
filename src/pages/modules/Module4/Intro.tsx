import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Intro: React.FC = () => {
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Steekproeven & Steekproeftechnieken</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Waarom steekproeven?</h2>
        <p className="mb-4">
          Bij statistisch onderzoek is het vaak onmogelijk of onpraktisch om een hele populatie te onderzoeken.
          Steekproeven bieden een praktische en efficiënte manier om betrouwbare conclusies te trekken over grote groepen.
        </p>
        <div className="bg-blue-50 p-4 rounded-md mb-4">
          <h3 className="font-semibold mb-2">Denk eens na:</h3>
          <p className="mb-2">Wat als je iedereen in Nederland moet onderzoeken voor je scriptie?</p>
          <button 
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-blue-600 hover:text-blue-700"
          >
            {showAnswer ? "Verberg antwoord" : "Toon antwoord"}
          </button>
          {showAnswer && (
            <div className="mt-2 text-blue-800">
              Dit zou betekenen dat je meer dan 17 miljoen mensen moet bereiken! 
              Dit is:
              <ul className="list-disc pl-6 mt-2">
                <li>Tijdrovend</li>
                <li>Zeer kostbaar</li>
                <li>Praktisch onmogelijk</li>
                <li>Niet efficiënt</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Populatie vs. Steekproef</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Populatie</h3>
            <p>De complete groep waarover je uitspraken wilt doen.</p>
            <p className="mt-2 text-sm text-purple-700">Bijvoorbeeld: alle studenten in Nederland</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Steekproef</h3>
            <p>Een zorgvuldig gekozen deel van de populatie.</p>
            <p className="mt-2 text-sm text-green-700">Bijvoorbeeld: 1000 willekeurig gekozen studenten</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Belang van representativiteit</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Je steekproef moet een goede afspiegeling zijn van de populatie</li>
          <li>Alle belangrijke groepen moeten vertegenwoordigd zijn</li>
          <li>Voorkomt vertekening (bias) in je resultaten</li>
          <li>Maakt generalisatie mogelijk</li>
        </ul>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/modules')}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Terug
        </button>
        <button
          onClick={() => navigate('/module4/uitleg')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Start uitleg
        </button>
      </div>
    </div>
  );
};

export default Intro; 