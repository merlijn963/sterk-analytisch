import React from 'react';
import { useNavigate } from 'react-router-dom';

const Uitleg: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Typen Validiteit & Betrouwbaarheid</h1>
      
      {/* Illustratie */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Visuele Uitleg</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            {/* Onbetrouwbaar & niet valide */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-2">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <div className="absolute inset-4 bg-gray-300 rounded-full"></div>
                <div className="absolute inset-8 bg-gray-400 rounded-full"></div>
                <div className="absolute inset-12 bg-gray-500 rounded-full"></div>
                {/* Willekeurige punten */}
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '10%', left: '20%' }}></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '70%', left: '50%' }}></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '40%', left: '80%' }}></div>
              </div>
              <p className="font-medium">Onbetrouwbaar & niet valide</p>
              <p className="text-gray-600">Verspreide punten, verkeerd doel</p>
            </div>

            {/* Onbetrouwbaar maar wel valide */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-2">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <div className="absolute inset-4 bg-gray-300 rounded-full"></div>
                <div className="absolute inset-8 bg-gray-400 rounded-full"></div>
                <div className="absolute inset-12 bg-gray-500 rounded-full"></div>
                {/* Willekeurige punten rond het centrum */}
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '30%', left: '40%' }}></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '50%', left: '60%' }}></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '40%', left: '50%' }}></div>
              </div>
              <p className="font-medium">Onbetrouwbaar maar wel valide</p>
              <p className="text-gray-600">Verspreide punten, juist doel</p>
            </div>

            {/* Betrouwbaar maar niet valide */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-2">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <div className="absolute inset-4 bg-gray-300 rounded-full"></div>
                <div className="absolute inset-8 bg-gray-400 rounded-full"></div>
                <div className="absolute inset-12 bg-gray-500 rounded-full"></div>
                {/* Gegroepeerde punten op de verkeerde plek */}
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '70%', left: '20%' }}></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '75%', left: '25%' }}></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '65%', left: '15%' }}></div>
              </div>
              <p className="font-medium">Betrouwbaar maar niet valide</p>
              <p className="text-gray-600">Gegroepeerde punten, verkeerd doel</p>
            </div>

            {/* Betrouwbaar en valide */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-2">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <div className="absolute inset-4 bg-gray-300 rounded-full"></div>
                <div className="absolute inset-8 bg-gray-400 rounded-full"></div>
                <div className="absolute inset-12 bg-gray-500 rounded-full"></div>
                {/* Gegroepeerde punten in het centrum */}
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '45%', left: '45%' }}></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '50%', left: '50%' }}></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '55%', left: '55%' }}></div>
              </div>
              <p className="font-medium">Betrouwbaar en valide</p>
              <p className="text-gray-600">Gegroepeerde punten, juist doel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nieuwe uitleg over interactie */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hoe werken de visualisaties?</h2>
        <p className="text-gray-700 mb-4">
          In de interactie zie je verschillende visualisaties die de concepten validiteit en betrouwbaarheid illustreren. 
          Hier is een korte uitleg van wat elke visualisatie betekent:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Onbetrouwbaar & niet valide:</strong> De punten zijn willekeurig verspreid en raken het doel niet.
          </li>
          <li>
            <strong>Onbetrouwbaar maar wel valide:</strong> De punten zijn willekeurig verspreid, maar liggen rond het juiste doel.
          </li>
          <li>
            <strong>Betrouwbaar maar niet valide:</strong> De punten zijn gegroepeerd, maar liggen niet op het juiste doel.
          </li>
          <li>
            <strong>Betrouwbaar en valide:</strong> De punten zijn gegroepeerd en liggen precies op het juiste doel.
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Validiteit Sectie */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Typen Validiteit</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Inhoudsvaliditeit (Content Validity)</h3>
              <p className="text-gray-700 font-semibold">Wat is het?</p>
              <p className="text-gray-700">De mate waarin de test alle belangrijke onderdelen van het onderwerp meet.</p>
              <p className="text-gray-700 font-semibold mt-2">Waarom belangrijk?</p>
              <p className="text-gray-700">Je wilt dat de test het hele construct goed afdekt.</p>
              <p className="text-gray-700 font-semibold mt-2">Voorbeeld:</p>
              <p className="text-gray-700">Een toets over wiskunde moet niet alleen optellen toetsen, maar ook breuken en vergelijkingen als die bij de leerdoelen horen.</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Constructvaliditeit</h3>
              <p className="text-gray-700 font-semibold">Wat is het?</p>
              <p className="text-gray-700">De test meet echt het abstracte begrip dat je wilt meten, zoals motivatie of zelfvertrouwen.</p>
              <p className="text-gray-700 font-semibold mt-2">Waarom belangrijk?</p>
              <p className="text-gray-700">Omdat abstracte begrippen niet direct meetbaar zijn, moet je zeker weten dat de test goed aansluit bij het concept.</p>
              <p className="text-gray-700 font-semibold mt-2">Voorbeeld:</p>
              <p className="text-gray-700">Een vragenlijst over motivatie moet niet alleen gedrag meten (zoals studietijd), maar ook interne motivatie (zoals interesse of doorzettingsvermogen).</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Criteriumvaliditeit</h3>
              <p className="text-gray-700 font-semibold">Wat is het?</p>
              <p className="text-gray-700">De mate waarin de test overeenkomt met een andere betrouwbare maatstaf (het criterium).</p>
              <p className="text-gray-700 font-semibold mt-2">Waarom belangrijk?</p>
              <p className="text-gray-700">Het toont aan dat de test ook buiten de testcontext bruikbaar is, bijvoorbeeld voor voorspellen of vergelijken.</p>
              <p className="text-gray-700 font-semibold mt-2">Vormen en voorbeelden:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Predictieve validiteit:</strong> voorspelt de test toekomstige prestaties? 
                  <br />Bijvoorbeeld: scoort iemand hoog op een sollicitatietest → presteert die persoon later goed op het werk?
                </li>
                <li>
                  <strong>Gelijktijdige validiteit:</strong> komt de test overeen met een bestaande betrouwbare test op hetzelfde moment? 
                  <br />Bijvoorbeeld: meet een digitale thermometer dezelfde temperatuur als een kwikthermometer?
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Face Validity (Oppervlakkige validiteit)</h3>
              <p className="text-gray-700 font-semibold">Wat is het?</p>
              <p className="text-gray-700">De mate waarin een test er op het eerste gezicht logisch uitziet — lijkt het te meten wat het moet meten?</p>
              <p className="text-gray-700 font-semibold mt-2">Waarom belangrijk?</p>
              <p className="text-gray-700">Het is geen wetenschappelijk bewijs, maar zorgt wel voor acceptatie bij deelnemers.</p>
              <p className="text-gray-700 font-semibold mt-2">Voorbeeld:</p>
              <p className="text-gray-700">Een toets over sport bevat vragen over kracht, conditie en uithoudingsvermogen — dat voelt logisch aan.</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Interne Validiteit</h3>
              <p className="text-gray-700 font-semibold">Wat is het?</p>
              <p className="text-gray-700">De mate waarin het effect in je studie echt veroorzaakt wordt door wat je onderzoekt (de onafhankelijke variabele), zonder dat andere factoren invloed hebben.</p>
              <p className="text-gray-700 font-semibold mt-2">Waarom belangrijk?</p>
              <p className="text-gray-700">Alleen dan kun je een geldige oorzaak-gevolgconclusie trekken.</p>
              <p className="text-gray-700 font-semibold mt-2">Voorbeeld:</p>
              <p className="text-gray-700">Je onderzoekt of een nieuwe lesmethode werkt, maar de ene groep heeft ook een andere docent. Dan weet je niet of het verschil komt door de methode of de docent (storende variabele).</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Externe Validiteit</h3>
              <p className="text-gray-700 font-semibold">Wat is het?</p>
              <p className="text-gray-700">De mate waarin je onderzoeksresultaten ook gelden voor andere situaties, mensen of tijdstippen.</p>
              <p className="text-gray-700 font-semibold mt-2">Waarom belangrijk?</p>
              <p className="text-gray-700">Je wilt weten of je conclusies ook buiten je onderzoek van toepassing zijn.</p>
              <p className="text-gray-700 font-semibold mt-2">Voorbeeld:</p>
              <p className="text-gray-700">Je onderzoekt de effectiviteit van een training bij hotelstudenten in Maastricht. Kun je dezelfde conclusies trekken bij horecapersoneel in Amsterdam?</p>
            </div>
          </div>
        </section>

        {/* Betrouwbaarheid Sectie */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Betrouwbaarheid</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Consistentie</h3>
              <p className="text-gray-700">
                Bij herhaalde metingen onder dezelfde omstandigheden worden vergelijkbare 
                resultaten gevonden.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Cronbach's Alpha</h3>
              <p className="text-gray-700">
                Een maat voor interne consistentie. Een waarde ≥ 0.70 wordt vaak als 
                acceptabel beschouwd.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Voorbeelden:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>"Een motivatievragenlijst wordt gebruikt als IQ-test" → niet valide</li>
              <li>"Elke keer dezelfde score bij herhaalde afname" → wel betrouwbaar</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate('/module3/interactie')}
          className="btn btn-primary"
        >
          Start interactie
        </button>
      </div>
    </div>
  );
};

export default Uitleg;