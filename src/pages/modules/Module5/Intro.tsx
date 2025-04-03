import React from 'react';
import { useNavigate } from 'react-router-dom';

const Intro: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Statistische Toetsen & Toetskeuze</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welke toets kies je wanneer?</h2>
        <p className="mb-4">
          Het kiezen van de juiste statistische toets is cruciaal voor betrouwbaar onderzoek.
          Een verkeerde toetskeuze kan leiden tot onjuiste conclusies en interpretaties.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">Voorbeeld:</h3>
          <p>
            Stel, je wilt weten of er verschil is in gemiddelde tevredenheid tussen drie verschillende ziekenhuizen.
            Omdat je:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>3 groepen vergelijkt (de ziekenhuizen)</li>
            <li>Kijkt naar gemiddelden (tevredenheid op schaal 1-10)</li>
            <li>Continue data gebruikt (scores kunnen alle waarden aannemen)</li>
          </ul>
          <p className="mt-2 font-semibold text-blue-800">
            → Dan gebruik je een ANOVA toets!
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Waarom is de juiste toetskeuze belangrijk?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Verkeerde toets</h3>
            <ul className="list-disc pl-6 space-y-1 text-red-800">
              <li>Onjuiste conclusies</li>
              <li>Onbetrouwbare resultaten</li>
              <li>Verkeerde beslissingen</li>
              <li>Niet-reproduceerbaar onderzoek</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Juiste toets</h3>
            <ul className="list-disc pl-6 space-y-1 text-green-800">
              <li>Betrouwbare conclusies</li>
              <li>Valide resultaten</li>
              <li>Onderbouwde beslissingen</li>
              <li>Wetenschappelijk verantwoord</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Wat ga je leren?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>De verschillende statistische toetsen en hun toepassingen</li>
          <li>Hoe je de juiste toets kiest op basis van je onderzoeksvraag</li>
          <li>Het belang van meetniveaus bij toetskeuze</li>
          <li>Hoe je resultaten interpreteert (p-waarden, F-waarden, etc.)</li>
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
          onClick={() => navigate('/module5/uitleg')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Start uitleg
        </button>
      </div>
    </div>
  );
};

export default Intro; 