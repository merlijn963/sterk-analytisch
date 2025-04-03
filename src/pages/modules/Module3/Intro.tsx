import React from 'react';
import { useNavigate } from 'react-router-dom';

const Intro: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Module 3: Validiteit & Betrouwbaarheid</h1>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Wat zijn validiteit en betrouwbaarheid?</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-purple-600 mb-2">Validiteit</h3>
              <p className="text-gray-700">
                Validiteit gaat over de vraag: "Meet je wat je wilt meten?" Een meetinstrument is valide als het daadwerkelijk 
                meet wat het pretendeert te meten. Het gaat om de juistheid van de meting.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">Betrouwbaarheid</h3>
              <p className="text-gray-700">
                Betrouwbaarheid gaat over de vraag: "Meet je consistent?" Een meetinstrument is betrouwbaar als het onder 
                dezelfde omstandigheden steeds dezelfde resultaten geeft. Het gaat om de stabiliteit en nauwkeurigheid van de meting.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Praktisch voorbeeld:</h4>
              <p className="text-gray-700">
                "Als je een IQ-test afneemt die eigenlijk motivatie meet, is deze niet valide. De test meet niet wat hij 
                zou moeten meten (intelligentie), maar iets anders (motivatie)."
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate('/module3/uitleg')}
            className="btn btn-primary"
          >
            Start uitleg
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro; 