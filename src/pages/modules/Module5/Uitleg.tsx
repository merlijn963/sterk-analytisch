import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TestInfo {
  name: string;
  whenToUse: string;
  dataType: string;
  example: string;
  output: string;
  interpretation: string;
  bgColor: string;
}

const tests: TestInfo[] = [
  {
    name: 'T-toets',
    whenToUse: 'Gemiddelden van 2 groepen vergelijken',
    dataType: 'Continue data (interval/ratio)',
    example: 'Verschil in gemiddeld gewicht tussen mannen en vrouwen',
    output: 't-waarde, df (vrijheidsgraden), p-waarde',
    interpretation: 'Als p < 0.05: significant verschil tussen de groepen',
    bgColor: 'bg-blue-50'
  },
  {
    name: 'ANOVA',
    whenToUse: 'Gemiddelden van 3 of meer groepen vergelijken',
    dataType: 'Continue data + categorische groepen',
    example: 'Verschil in tevredenheid tussen 4 verschillende merken',
    output: 'F-waarde, df (vrijheidsgraden), p-waarde',
    interpretation: 'Als p < 0.05: minstens één groep verschilt significant',
    bgColor: 'bg-green-50'
  },
  {
    name: 'Chi-kwadraat',
    whenToUse: 'Verband tussen 2 categorische variabelen',
    dataType: 'Nominaal/ordinaal',
    example: 'Verband tussen geslacht en studiekeuze',
    output: 'χ²-waarde, df (vrijheidsgraden), p-waarde',
    interpretation: 'Als p < 0.05: significant verband tussen de variabelen',
    bgColor: 'bg-purple-50'
  },
  {
    name: 'Correlatie',
    whenToUse: 'Verband tussen 2 continue variabelen',
    dataType: 'Interval/ratio',
    example: 'Verband tussen lengte en gewicht',
    output: 'r (correlatiecoëfficiënt), p-waarde',
    interpretation: 'r tussen -1 en 1, p < 0.05 voor significant verband',
    bgColor: 'bg-yellow-50'
  }
];

const Uitleg: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Uitleg Statistische Toetsen</h1>

      {/* Beslisboom */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Beslisboom: Welke toets kies je?</h2>
        <div className="border-2 border-gray-200 rounded-lg p-4">
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-3 rounded-lg mb-2 text-center">
              Wat wil je onderzoeken?
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 p-3 rounded-lg mb-2 text-center w-full">
                  Vergelijken van gemiddelden
                </div>
                <div className="border-l-2 border-blue-300 h-8"></div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-blue-50 p-2 rounded-lg text-center">
                    2 groepen<br />→ T-toets
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg text-center">
                    3+ groepen<br />→ ANOVA
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-100 p-3 rounded-lg mb-2 text-center w-full">
                  Onderzoeken van verbanden
                </div>
                <div className="border-l-2 border-purple-300 h-8"></div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-purple-50 p-2 rounded-lg text-center">
                    Categorisch<br />→ Chi-kwadraat
                  </div>
                  <div className="bg-yellow-50 p-2 rounded-lg text-center">
                    Continue data<br />→ Correlatie
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Uitleg per toets */}
      <div className="space-y-6">
        {tests.map((test, index) => (
          <div key={index} className={`${test.bgColor} rounded-lg shadow-md p-6`}>
            <h2 className="text-xl font-semibold mb-4">{test.name}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Wanneer gebruiken?</h3>
                <p className="mb-2">{test.whenToUse}</p>
                <h3 className="font-semibold mb-2">Type data</h3>
                <p className="mb-2">{test.dataType}</p>
                <h3 className="font-semibold mb-2">Voorbeeld</h3>
                <p>{test.example}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Output</h3>
                <p className="mb-2">{test.output}</p>
                <h3 className="font-semibold mb-2">Interpretatie</h3>
                <p>{test.interpretation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/module5')}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Terug
        </button>
        <button
          onClick={() => navigate('/module5/interactie')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Ga naar oefening
        </button>
      </div>
    </div>
  );
};

export default Uitleg; 