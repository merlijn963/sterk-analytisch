import React from 'react';
import { useNavigate } from 'react-router-dom';

const Intro: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Module 6: Output Interpreteren</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welkom bij Module 6!</h2>
        
        <div className="prose max-w-none mb-6">
          <p className="text-lg mb-4">
            In deze module leer je hoe je de output van statistische software (SPSS en Jamovi) interpreteert.
            Je leert output lezen, p-waardes en effectgroottes begrijpen, en de juiste toets kiezen.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">Wat ga je leren?</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Output van statistische toetsen lezen en begrijpen</li>
              <li>P-waardes en effectgroottes interpreteren</li>
              <li>De juiste toets kiezen voor je onderzoeksvraag</li>
              <li>Specifieke tests begrijpen zoals:
                <ul className="list-disc pl-5 mt-2">
                  <li>Levene's test voor gelijke variantie</li>
                  <li>Cohen's d voor effectgrootte bij t-toetsen</li>
                  <li>Cramér's V voor verbanden bij Chi-kwadraat</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">Voorbeeld</h3>
            <p>
              Stel je voor: je hebt een output met p = 0.03 en Cohen's d = 0.85.
              Wat betekent dit? In deze module leer je dit soort resultaten te interpreteren
              en de juiste conclusies te trekken.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">Vereenvoudigde uitleg</h3>
            <p className="mb-3">
              We gebruiken eenvoudige taal en voorbeelden om de statistische begrippen uit te leggen:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold">📊 P-waarde</h4>
                <p className="text-sm">"Hoe groot is de kans dat wat we zien, gewoon toeval is?"</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold">📉 Levene's Test</h4>
                <p className="text-sm">"Kijken of de spreiding in groepen ongeveer gelijk is"</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold">📏 Cohen's d</h4>
                <p className="text-sm">"Hoe groot is het verschil tussen twee groepen?"</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold">🔗 Cramér's V</h4>
                <p className="text-sm">"Hoe sterk is het verband tussen twee categorieën?"</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/module6/uitleg')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Start uitleg
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/modules')}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Terug naar modules
        </button>
      </div>
    </div>
  );
};

export default Intro; 