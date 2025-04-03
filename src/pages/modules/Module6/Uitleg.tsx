import React from 'react';
import { useNavigate } from 'react-router-dom';

const Uitleg: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Uitleg: Output Interpreteren</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Wat zie je in de output?</h2>
        
        <div className="space-y-6">
          {/* Normaliteitstest */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Normaliteitstest</h3>
            <p className="mb-2">
              <span className="font-bold">📊 "Is je data normaal verdeeld?"</span>
            </p>
            <p className="mb-2">
              De normaliteitstest (bijvoorbeeld Shapiro-Wilk of Kolmogorov-Smirnov) kijkt of je data normaal verdeeld is.
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>p &gt; 0.5: De data is normaal verdeeld</li>
              <li>p &lt; 0.5: De data is niet normaal verdeeld</li>
            </ul>
            <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
              <p className="font-semibold">🍼 Babytolk:</p>
              <p>
                Als je een doos met knikkers hebt, zijn ze dan netjes verdeeld (normaal) of liggen ze allemaal aan één kant (niet normaal)?
              </p>
            </div>
          </div>

          {/* Homogeniteitstest */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Homogeniteitstest</h3>
            <p className="mb-2">
              <span className="font-bold">📉 "Zijn de spreidingen in de groepen gelijk?"</span>
            </p>
            <p className="mb-2">
              De homogeniteitstest (bijvoorbeeld Levene's test) kijkt of de varianties in de groepen gelijk zijn.
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>p &gt; 0.5: De varianties zijn gelijk</li>
              <li>p &lt; 0.5: De varianties zijn ongelijk</li>
            </ul>
            <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
              <p className="font-semibold">🍼 Babytolk:</p>
              <p>
                Als je twee dozen met knikkers hebt, zijn ze dan even verspreid in beide dozen (homogeen) of zit er in de ene doos meer variatie dan in de andere (niet homogeen)?
              </p>
            </div>
          </div>

          {/* P-waarde */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">P-waarde</h3>
            <p className="mb-2">
              <span className="font-bold">📊 "Hoe groot is de kans dat wat we zien, gewoon toeval is?"</span>
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>p &lt; 0.05: Er is een significant verschil/verband</li>
              <li>p &gt; 0.05: Er is geen significant verschil/verband</li>
            </ul>
            <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
              <p className="font-semibold">🍼 Babytolk:</p>
              <p>
                Als je dobbelsteen heel vaak 6 gooit, denk je: "Dit is vast geen normale steen!" → p-waarde helpt ons dat te beslissen.
              </p>
            </div>
          </div>

          {/* Effectgrootte */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Effectgrootte</h3>
            <p className="mb-2">
              <span className="font-bold">📏 "Hoe groot is het verschil of verband?"</span>
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>Cohen's d (t-test):
                <ul className="list-disc pl-6">
                  <li>d &lt; 0.2: Klein effect</li>
                  <li>0.2 &lt; d &lt; 0.8: Middelmatig effect</li>
                  <li>d &gt; 0.8: Groot effect</li>
                </ul>
              </li>
              <li>r (Mann-Whitney U):
                <ul className="list-disc pl-6">
                  <li>r &lt; 0.1: Klein effect</li>
                  <li>0.1 &lt; r &lt; 0.3: Middelmatig effect</li>
                  <li>r &gt; 0.3: Groot effect</li>
                </ul>
              </li>
            </ul>
            <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
              <p className="font-semibold">🍼 Babytolk:</p>
              <p>
                Als groep A gemiddeld 10 punten haalt en groep B gemiddeld 10,1 → klein verschil.
                Als groep A 10 en groep B 18 → groot verschil! Effectgrootte zegt: "Is dit een mini-verschil of een mega-verschil?"
              </p>
            </div>
          </div>

          {/* Cramér's V */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Cramér's V</h3>
            <p className="mb-2">
              <span className="font-bold">🔗 "Hoe sterk is het verband tussen twee categorieën?"</span>
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>Gebruik je bij een Chi²-toets (2 of meer categorieën)</li>
              <li>Cijfers lopen van 0 tot 1:
                <ul className="list-disc pl-6">
                  <li>0.1 = zwak verband</li>
                  <li>0.3 = gemiddeld</li>
                  <li>0.5+ = sterk verband</li>
                </ul>
              </li>
            </ul>
            <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
              <p className="font-semibold">🍼 Babytolk:</p>
              <p>
                Als je checkt of meisjes vaker roze kiezen dan jongens:
                Cramér's V zegt of dat écht vaak zo is, of gewoon een beetje toevallig.
              </p>
            </div>
          </div>

          {/* Eta² */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Eta² (of Partial Eta²)</h3>
            <p className="mb-2">
              <span className="font-bold">🧪 "Hoeveel van het verschil wordt verklaard door je toets (bijv. ANOVA)?"</span>
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>Vergelijkbaar met Cohen's d, maar dan voor meerdere groepen</li>
              <li>Hoe hoger, hoe beter de groepjes het verschil verklaren</li>
            </ul>
            <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
              <p className="font-semibold">🍼 Babytolk:</p>
              <p>
                Als je kijkt naar 3 sportklassen en prestaties → Eta² zegt: "Zorgen de klasgroepen écht voor verschil?"
              </p>
            </div>
          </div>

          {/* Homogeniteitstest en Normaliteitstest */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Homogeniteitstest en Normaliteitstest</h3>
            <p className="mb-4">
              Deze twee tests zijn belangrijk om te bepalen welke statistische test je moet gebruiken. Ze controleren of je data voldoet aan de aannames van de t-test.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Normaliteitstest</h4>
              <p className="mb-2">
                <span className="font-bold">📊 "Is je data normaal verdeeld?"</span>
              </p>
              <p className="mb-2">
                De normaliteitstest (bijvoorbeeld Shapiro-Wilk of Kolmogorov-Smirnov) kijkt of je data normaal verdeeld is.
              </p>
              <ul className="list-disc pl-6 mb-2">
                <li>p &gt; 0.5: De data is normaal verdeeld → je mag de t-test gebruiken</li>
                <li>p &lt; 0.5: De data is niet normaal verdeeld → je moet Mann-Whitney gebruiken</li>
              </ul>
              <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
                <p className="font-semibold">🍼 Babytolk:</p>
                <p>
                  Als je een doos met knikkers hebt, zijn ze dan netjes verdeeld (normaal) of liggen ze allemaal aan één kant (niet normaal)? Als ze niet netjes verdeeld zijn, moet je een andere test gebruiken.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Homogeniteitstest</h4>
              <p className="mb-2">
                <span className="font-bold">📉 "Zijn de spreidingen in de groepen gelijk?"</span>
              </p>
              <p className="mb-2">
                De homogeniteitstest (bijvoorbeeld Levene's test) kijkt of de varianties in de groepen gelijk zijn.
              </p>
              <ul className="list-disc pl-6 mb-2">
                <li>p &gt; 0.5: De varianties zijn gelijk → je mag de t-test gebruiken</li>
                <li>p &lt; 0.5: De varianties zijn ongelijk → je moet Mann-Whitney gebruiken</li>
              </ul>
              <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
                <p className="font-semibold">🍼 Babytolk:</p>
                <p>
                  Als je twee dozen met knikkers hebt, zijn ze dan even verspreid in beide dozen (homogeen) of zit er in de ene doos meer variatie dan in de andere (niet homogeen)? Als de spreiding niet gelijk is, moet je een andere test gebruiken.
                </p>
              </div>
            </div>

            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Belangrijk om te onthouden:</h4>
              <p className="mb-2">
                Als <span className="font-bold">één van deze twee tests</span> een p-waarde &lt; 0.5 geeft, moet je de Mann-Whitney U test gebruiken in plaats van de t-test.
              </p>
              <p>
                Voorbeeld: Als normaliteitstest p = 0.45 en homogeniteitstest p = 0.62, dan moet je toch Mann-Whitney gebruiken omdat de normaliteitstest &lt; 0.5 is.
              </p>
            </div>
          </div>

          {/* Mann-Whitney U Test */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Mann-Whitney U Test</h3>
            <p className="mb-2">
              <span className="font-bold">📊 "Wanneer gebruik je de Mann-Whitney U test?"</span>
            </p>
            <p className="mb-4">
              De Mann-Whitney U test is een alternatief voor de t-test wanneer de data niet voldoet aan de aannames van normaliteit of homogeniteit. Je gebruikt deze test als:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>De normaliteitstest een p-waarde &lt; 0.5 geeft (data is niet normaal verdeeld)</li>
              <li>De homogeniteitstest een p-waarde &lt; 0.5 geeft (varianties zijn ongelijk)</li>
              <li>Je twee onafhankelijke groepen vergelijkt</li>
              <li>Je data op ordinaal niveau is of niet normaal verdeeld is</li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Hoe werkt het?</h4>
              <p className="mb-2">
                In plaats van te kijken naar gemiddelden (zoals bij de t-test), kijkt de Mann-Whitney U test naar de rangordes van de scores:
              </p>
              <ol className="list-decimal pl-6 mb-2">
                <li>Alle scores worden op één rij gezet</li>
                <li>Elke score krijgt een rangnummer (1, 2, 3, etc.)</li>
                <li>De rangnummers worden per groep opgeteld</li>
                <li>De U-waarde wordt berekend op basis van deze rangordes</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">De r-waarde bij Mann-Whitney</h4>
              <p className="mb-2">
                De r-waarde is de effectgrootte bij de Mann-Whitney U test. Deze vertelt je hoe groot het verschil tussen de groepen is:
              </p>
              <ul className="list-disc pl-6 mb-2">
                <li>r &lt; 0.1: Klein effect (bijna geen verschil)</li>
                <li>0.1 &lt; r &lt; 0.3: Middelmatig effect (redelijk verschil)</li>
                <li>r &gt; 0.3: Groot effect (duidelijk verschil)</li>
              </ul>
              <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
                <p className="font-semibold">🍼 Babytolk:</p>
                <p>
                  Stel je voor dat je twee groepen kinderen hebt die een toets maken. De r-waarde zegt: "Is het verschil tussen de groepen klein (bijna hetzelfde), middelmatig (redelijk verschillend) of groot (heel verschillend)?"
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Voorbeeld</h4>
              <p className="mb-2">
                Stel je hebt de volgende output:
              </p>
              <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded mb-2">
                Normaliteitstest: p = 0.45
                Homogeniteitstest: p = 0.32
                Mann-Whitney U: p = 0.03, r = 0.42
              </pre>
              <p className="mb-2">
                Dit betekent:
              </p>
              <ul className="list-disc pl-6">
                <li>De data is niet normaal verdeeld (p &lt; 0.5)</li>
                <li>De varianties zijn ongelijk (p &lt; 0.5)</li>
                <li>Je moet de Mann-Whitney U test gebruiken</li>
                <li>Er is een significant verschil (p &lt; 0.05)</li>
                <li>Het effect is groot (r &gt; 0.3)</li>
              </ul>
            </div>
          </div>

          {/* Samenvatting */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Samenvatting in ultrakorte vorm:</h3>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Term</th>
                  <th className="border border-gray-300 p-2">Wat is het?</th>
                  <th className="border border-gray-300 p-2">Simpel voorbeeld</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Normaliteitstest</td>
                  <td className="border border-gray-300 p-2">Is de data normaal verdeeld?</td>
                  <td className="border border-gray-300 p-2">"Liggen de knikkers netjes verdeeld?"</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Homogeniteitstest</td>
                  <td className="border border-gray-300 p-2">Zijn de spreidingen gelijk tussen groepen?</td>
                  <td className="border border-gray-300 p-2">"Zijn de knikkers even verspreid in beide dozen?"</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">P-waarde</td>
                  <td className="border border-gray-300 p-2">Kans dat je iets toevallig vindt</td>
                  <td className="border border-gray-300 p-2">"Was dit puur toeval?"</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Cohen's d</td>
                  <td className="border border-gray-300 p-2">Hoe groot is het verschil tussen 2 gemiddelden?</td>
                  <td className="border border-gray-300 p-2">"Mini of mega verschil?"</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">r (Mann-Whitney)</td>
                  <td className="border border-gray-300 p-2">Hoe groot is het verschil bij niet-normale data?</td>
                  <td className="border border-gray-300 p-2">"Hoe sterk is het verschil als de data niet netjes is?"</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Cramér's V</td>
                  <td className="border border-gray-300 p-2">Hoe sterk is het verband tussen 2 categorieën?</td>
                  <td className="border border-gray-300 p-2">"Houden jongens meer van voetbal?"</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Eta²</td>
                  <td className="border border-gray-300 p-2">Hoeveel verklaart een groep van het verschil?</td>
                  <td className="border border-gray-300 p-2">"Ligt het echt aan de klas waar je zit?"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/module6/intro')}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Terug
        </button>
        <button
          onClick={() => navigate('/module6/interactie')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Ga naar oefening
        </button>
      </div>
    </div>
  );
};

export default Uitleg; 