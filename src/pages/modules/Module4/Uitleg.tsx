import React from 'react';
import { useNavigate } from 'react-router-dom';

const SamplingMethod: React.FC<{
  title: string;
  description: string;
  example: string;
  bgColor: string;
}> = ({ title, description, example, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-6 mb-4`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="mb-2">{description}</p>
    <p className="text-sm italic">Voorbeeld: {example}</p>
  </div>
);

const Uitleg: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Steekproeftechnieken</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Aselecte Steekproeven</h2>
        <div className="space-y-4">
          <SamplingMethod
            title="Eenvoudig willekeurig (Simple Random)"
            description="Ieder element uit de populatie heeft evenveel kans om gekozen te worden."
            example="Namen willekeurig trekken uit een hoed met alle mogelijke deelnemers."
            bgColor="bg-blue-50"
          />
          <SamplingMethod
            title="Gestratificeerd"
            description="De populatie wordt eerst verdeeld in subgroepen (strata) op basis van bepaalde kenmerken, daarna wordt willekeurig geselecteerd binnen elke subgroep."
            example="Eerst studenten opdelen naar studierichting, dan per richting willekeurig kiezen."
            bgColor="bg-green-50"
          />
          <SamplingMethod
            title="Systematisch"
            description="Er wordt een vast interval gebruikt om elementen te selecteren."
            example="Elke 10e persoon uit een lijst kiezen."
            bgColor="bg-purple-50"
          />
          <SamplingMethod
            title="Cluster"
            description="Eerst worden groepen (clusters) geselecteerd, dan worden alle elementen binnen die clusters gebruikt."
            example="Willekeurig 5 scholen kiezen en alle leerlingen van die scholen onderzoeken."
            bgColor="bg-yellow-50"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Selecte Steekproeven</h2>
        <div className="space-y-4">
          <SamplingMethod
            title="Gemak (Convenience)"
            description="Deelnemers worden gekozen op basis van beschikbaarheid en gemak."
            example="Studenten in de kantine vragen om deel te nemen aan je onderzoek."
            bgColor="bg-red-50"
          />
          <SamplingMethod
            title="Doelgericht (Purposive)"
            description="Deelnemers worden bewust gekozen op basis van specifieke kenmerken."
            example="Alleen ervaren docenten selecteren voor een onderzoek naar onderwijsmethoden."
            bgColor="bg-indigo-50"
          />
          <SamplingMethod
            title="Sneeuwbal"
            description="Deelnemers worden gevraagd om andere potentiële deelnemers aan te dragen."
            example="Sporters vragen om andere sporters aan te bevelen voor je onderzoek."
            bgColor="bg-pink-50"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/module4')}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Terug
        </button>
        <button
          onClick={() => navigate('/module4/interactie')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Ga naar oefening
        </button>
      </div>
    </div>
  );
};

export default Uitleg; 