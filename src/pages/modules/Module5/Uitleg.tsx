import React from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Ensure this import is correct

interface TestInfo {
  name: string;
  whenToUse: string;
  dataType: string;
  example: string;
  output: string;
  interpretation: string;
  bgColor: string;
  explanation?: string;
}

const tests: TestInfo[] = [
  {
    name: 'T-toets',
    whenToUse: 'Gemiddelden van 2 groepen vergelijken',
    dataType: 'Continue data (interval/ratio)',
    example: 'Verschil in gemiddeld gewicht tussen mannen en vrouwen',
    output: 't-waarde, df (vrijheidsgraden), p-waarde',
    interpretation: 'Als p < 0.05: significant verschil tussen de groepen',
    bgColor: 'bg-blue-50',
    explanation: `✅ T-test in Jamovi

📌 **Wat is een t-test?**

Een t-test gebruik je om te bepalen of er een gemiddeld verschil is tussen twee groepen of tussen twee metingen.  
Je kijkt of dat verschil groot genoeg is om niet door toeval te zijn ontstaan.

**Voorbeelden**:
<ul>
  <li>Is het gemiddelde salaris van vrouwen anders dan dat van mannen?</li>
  <li>Is de gemiddelde bloeddruk na een behandeling lager dan ervoor?</li>
</ul>

---

📊 **Wanneer gebruik je welke t-test?**

**One Sample T-test**:
<ul>
  <li>Vergelijk het gemiddelde van één groep met een vaste waarde.</li>
  <li><strong>Voorbeeld:</strong> is het gemiddelde cijfer van een klas anders dan een 6?</li>
</ul>

**Independent Samples T-test (Onafhankelijke t-test)**:
<ul>
  <li>Vergelijk het gemiddelde van twee losse groepen.</li>
  <li><strong>Voorbeeld:</strong> is het salaris van mannen anders dan dat van vrouwen?</li>
</ul>

**Paired Samples T-test (Afhankelijke t-test)**:
<ul>
  <li>Vergelijk twee metingen bij dezelfde personen.</li>
  <li><strong>Voorbeeld:</strong> is de slaapduur veranderd na een training?</li>
</ul>

---

🛠 **Hoe voer je een t-test uit in Jamovi?**

1. Open Jamovi en laad je dataset.

2. Ga naar:  
   **Analyses > T-Tests**

3. Kies de juiste test:
<ul>
  <li>Independent Samples T-Test bij twee losse groepen</li>
  <li>Paired Samples T-Test bij herhaalde metingen bij dezelfde personen</li>
  <li>One Sample T-Test bij vergelijking met een vast getal</li>
</ul>

4. Vul in:
<ul>
  <li><strong>Dependent Variable</strong> = de variabele waarvan je het gemiddelde wilt vergelijken (bijv. salary)</li>
  <li><strong>Grouping Variable</strong> = de groep die je vergelijkt (bijv. gender)</li>
</ul>

5. Vink eventueel aan:
<ul>
  <li>Effect size (Cohen’s d)</li>
  <li>Confidence interval</li>
  <li>Descriptives (gemiddelden, SD etc.)</li>
</ul>

---

📷 **Voorbeeld van de output in Jamovi**

<div style="text-align: center;">
  <img 
    src="/images/t-test.png" 
    alt="T-test output in Jamovi" 
    style="max-width: 100%; height: auto; border: 1px solid #ccc; padding: 5px;" 
  />
</div>

---

📊 **Hoe lees je de output af in Jamovi?**

1. **Student's t en Welch's t**  
   - **Student’s t**: gebruik je als de varianties gelijk zijn.  
   - **Welch’s t**: gebruik je als de varianties ongelijk zijn.  
   Welke van de twee je moet gebruiken, bepaal je aan de hand van:

2. **Levene’s test (Homogeniteit van varianties)**  
   - Vind je onder “Assumptions”.  
   - **p ≥ 0.05** → varianties zijn gelijk → gebruik Student’s t.  
   - **p < 0.05** → varianties ongelijk → gebruik Welch’s t.

3. **Normaliteitstest (Shapiro-Wilk)**  
   - Ook onder “Assumptions”.  
   - **p < 0.05** → data zijn niet normaal verdeeld.  
   - Als je steekproefgrootte per groep groter is dan ±30, mag je de t-test nog gebruiken (de t-test is robuust).

4. **Welke p-waarde moet je gebruiken?**  
   - Je gebruikt de p-waarde die hoort bij de juiste t-variant (Student’s of Welch’s), op basis van Levene’s test.  
   - **Als p < 0.05** → er is een significant verschil.  
   - **Als p ≥ 0.05** → het verschil is waarschijnlijk toevallig.

---

⚠️ **Wanneer is de t-test betrouwbaar?**

<ul>
  <li>De afhankelijke variabele is numeriek (interval of ratio).</li>
  <li>De groepen zijn onafhankelijk (bij independent t-test).</li>
  <li>De spreiding is gelijk (of je past Welch toe).</li>
  <li>De data zijn normaal verdeeld (vooral bij kleine steekproeven).</li>
</ul>`
  },
  {
    name: 'ANOVA',
    whenToUse: 'Gemiddelden van 3 of meer groepen vergelijken',
    dataType: 'Continue data + categorische groepen',
    example: 'Verschil in tevredenheid tussen 4 verschillende merken',
    output: 'F-waarde, df (vrijheidsgraden), p-waarde',
    interpretation: 'Als p < 0.05: minstens één groep verschilt significant',
    bgColor: 'bg-green-50',
    explanation: `✅ ANOVA in Jamovi

📌 **Wat is ANOVA?**

ANOVA staat voor Analysis of Variance.  
Je gebruikt het om te testen of er verschil is tussen de gemiddelden van drie of meer groepen.

**Voorbeeld**:  
Zijn mensen met een hogere opleiding gelukkiger op hun werk (survey_relations)?

---

🧪 **Wanneer gebruik je een ANOVA?**

- Je hebt één numerieke variabele (bijv. werkgeluk, score, salaris).  
- En één categorische variabele met 3 of meer groepen (bijv. opleiding, afdeling).  
- Je wil weten of de gemiddelden per groep significant van elkaar verschillen.

---

🧭 **Hoe voer je ANOVA uit in Jamovi?**

1. Ga naar **Analyses > ANOVA > One-Way ANOVA**.

2. Zet:
   - **Dependent Variable** = je numerieke variabele (bv. survey_relations).
   - **Fixed Factor** = je categorische groepsindeling (bv. qualification).

3. Vink aan:
   - **Descriptives** voor gemiddelden, SD, SE.
   - **Effect size (Eta²)** om te weten hoeveel verschil verklaard wordt door de groepen.
   - **Post-hoc tests (Games-Howell)** om te zien waar het verschil zit.

---

✅ **Stap-voor-stap interpretatie van de output**

🔹 **1. Check de aannames**  
Ga naar het blokje **Assumption Checks**:

- **Levene’s Test (Homogeniteit van varianties)**:
  - Geeft aan of de spreiding per groep ongeveer gelijk is.
  - **Als p ≥ 0.05** → varianties zijn gelijk → gebruik gewone ANOVA.
  - **Als p < 0.05** → varianties zijn ongelijk → gebruik Welch’s ANOVA.

🔍 **In jouw voorbeeld**:  
Levene’s p = < .001 → varianties zijn ongelijk.  
→ Gebruik Welch’s ANOVA (die Jamovi automatisch toont).

---

🔹 **2. Lees de juiste ANOVA-p af**  
In het blok **One-Way ANOVA** zie je:

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>F</th>
      <th>df1</th>
      <th>df2</th>
      <th>p</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Welch's</td>
      <td>254.3</td>
      <td>4</td>
      <td>22.6</td>
      <td>&lt; .001</td>
    </tr>
    <tr>
      <td>Fisher’s</td>
      <td>79.6</td>
      <td>4</td>
      <td>101</td>
      <td>&lt; .001</td>
    </tr>
  </tbody>
</table>

✅ Omdat Levene’s test ongelijke varianties toont, gebruik je Welch’s rij.  
→ **p < .001** → Er is een significant verschil tussen minstens twee groepen.

---

🔹 **3. Post-hoc test (Games-Howell)**  
Een ANOVA zegt alleen **dát** er verschil is — niet **waar**.  
De **Games-Howell post-hoc test** vergelijkt elke groep met elke andere groep:

<table>
  <thead>
    <tr>
      <th>Groep</th>
      <th>Vergeleken met</th>
      <th>p-waarde</th>
      <th>Conclusie</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>4</td>
      <td>&lt; .001</td>
      <td>Significante toename</td>
    </tr>
    <tr>
      <td>1</td>
      <td>5</td>
      <td>&lt; .001</td>
      <td>Sterk verschil</td>
    </tr>
    <tr>
      <td>2</td>
      <td>4</td>
      <td>&lt; .001</td>
      <td>Significante toename</td>
    </tr>
    <tr>
      <td>3</td>
      <td>5</td>
      <td>&lt; .001</td>
      <td>Significante toename</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>0.039</td>
      <td>Nog net significant</td>
    </tr>
  </tbody>
</table>

🟢 **Dus**: mensen met kwalificatie 4 of 5 zijn duidelijk gelukkiger op werk dan mensen met lagere kwalificatie (1 t/m 3).

---

🔹 **4. Visualisatie begrijpen**  
De grafiek toont:

- **Op de x-as**: qualification (opleidingsniveau).  
- **Op de y-as**: survey_relations (gemiddelde geluksscore).  
- Je ziet dat de gemiddelden stijgen bij hogere kwalificatie.  
- De foutmarges (95% CI) geven de betrouwbaarheid aan.

---

📏 **Belangrijke termen uitgelegd**

<table>
  <thead>
    <tr>
      <th>Term</th>
      <th>Wat is het?</th>
      <th>Simpel voorbeeld</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>F-waarde</td>
      <td>Hoe groot het verschil is tussen groepen vergeleken met binnen de groep</td>
      <td>“Zijn de klassen écht verschillend?”</td>
    </tr>
    <tr>
      <td>p-waarde</td>
      <td>Kans dat het verschil toeval is (p < 0.05 = significant)</td>
      <td>“Is het verschil echt of toeval?”</td>
    </tr>
    <tr>
      <td>df</td>
      <td>Vrijheidsgraden: gebaseerd op aantal groepen en deelnemers</td>
      <td>Hoeveel ‘ruimte’ er is in de data</td>
    </tr>
    <tr>
      <td>Eta²</td>
      <td>Hoeveel van het verschil verklaard wordt door de groep (effectgrootte)</td>
      <td>“Komt het door je opleiding?”</td>
    </tr>
    <tr>
      <td>Levene’s test</td>
      <td>Checkt of de varianties gelijk zijn</td>
      <td>“Zijn de groepen even verspreid?”</td>
    </tr>
    <tr>
      <td>Welch’s ANOVA</td>
      <td>Alternatief als varianties ongelijk zijn</td>
      <td>“Corrigeert voor scheve spreiding”</td>
    </tr>
    <tr>
      <td>Post-hoc test</td>
      <td>Laat zien tussen welke groepen het verschil zit</td>
      <td>“Wie is er precies anders?”</td>
    </tr>
  </tbody>
</table>

---

📷 **Voorbeelden van de output**

<div style="text-align: center;">
  <img 
    src="/images/anovatest.png" 
    alt="ANOVA output in Jamovi" 
    style="max-width: 100%; height: auto; border: 1px solid #ccc; padding: 5px;" 
  />
  <p>Figuur 1: ANOVA output</p>
</div>

<div style="text-align: center; margin-top: 20px;">
  <img 
    src="/images/anovahoctest.png" 
    alt="ANOVA post-hoc test output in Jamovi" 
    style="max-width: 100%; height: auto; border: 1px solid #ccc; padding: 5px;" 
  />
  <p>Figuur 2: Post-hoc test output</p>
</div>

---

📊 **Hoe lees je de output af in Jamovi?**

🔹 **1. Check de aannames**  
Ga naar het blokje **Assumption Checks**:

- **Levene’s Test (Homogeniteit van varianties)**:
  - Geeft aan of de spreiding per groep ongeveer gelijk is.
  - **Als p ≥ 0.05** → varianties zijn gelijk → gebruik Fisher’s ANOVA.
  - **Als p < 0.05** → varianties zijn ongelijk → gebruik Welch’s ANOVA.

🔍 **In jouw voorbeeld**:  
Levene’s p = 0.010 → varianties zijn ongelijk.  
→ Gebruik Welch’s ANOVA (Jamovi toont beide automatisch).

---

🔹 **2. Lees de juiste ANOVA-p af**  
In het blok **One-Way ANOVA** zie je:

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>F</th>
      <th>df1</th>
      <th>df2</th>
      <th>p</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Welch's</td>
      <td>66.2</td>
      <td>4</td>
      <td>24.4</td>
      <td>&lt; .001</td>
    </tr>
    <tr>
      <td>Fisher’s</td>
      <td>27.2</td>
      <td>4</td>
      <td>101</td>
      <td>&lt; .001</td>
    </tr>
  </tbody>
</table>

✅ Omdat Levene’s test een verschil in varianties toont, gebruik je de Welch’s rij.  
→ **p < .001** → Er is een significant verschil tussen minstens twee groepen (kwalificaties) in gemiddeld salaris.

---

🔹 **3. Post-hoc test (Games-Howell)**  
Een ANOVA zegt alleen **dát** er verschil is — niet **waar** het verschil zit.  
De **Games-Howell post-hoc test** vergelijkt elke groep met elke andere groep:

<table>
  <thead>
    <tr>
      <th>Groep</th>
      <th>Vergeleken met</th>
      <th>p-waarde</th>
      <th>Conclusie</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>3</td>
      <td>0.035</td>
      <td>Significante toename</td>
    </tr>
    <tr>
      <td>1</td>
      <td>4</td>
      <td>&lt; .001</td>
      <td>Sterk significant verschil</td>
    </tr>
    <tr>
      <td>1</td>
      <td>5</td>
      <td>&lt; .001</td>
      <td>Sterk significant verschil</td>
    </tr>
    <tr>
      <td>2</td>
      <td>4</td>
      <td>&lt; .001</td>
      <td>Sterke toename</td>
    </tr>
    <tr>
      <td>2</td>
      <td>5</td>
      <td>&lt; .001</td>
      <td>Sterk verschil</td>
    </tr>
    <tr>
      <td>3</td>
      <td>5</td>
      <td>0.002</td>
      <td>Significante toename</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>0.188</td>
      <td>Niet significant</td>
    </tr>
  </tbody>
</table>

🟢 **Dus**: mensen met kwalificatie 4 of 5 verdienen significant meer dan mensen met kwalificatie 1 t/m 3.  
Tussen 4 en 5 is géén duidelijk verschil (**p = 0.188**).

---

🔹 **4. Visualisatie begrijpen**  
De grafiek toont:

- **Op de x-as**: qualification (kwalificatieniveau).  
- **Op de y-as**: salary (gemiddeld salaris).  

Je ziet:

- ✅ Hoe hoger de kwalificatie, hoe hoger het gemiddelde salaris.  
- 📈 De lijnen stijgen duidelijk van links naar rechts.  
- 📉 De foutbalken (error bars) tonen de spreiding/zekerheid (95% CI) van de gemiddelden.
`
  },
  {
    name: 'Chi-kwadraat',
    whenToUse: 'Verband tussen 2 categorische variabelen',
    dataType: 'Nominaal/ordinaal',
    example: 'Verband tussen geslacht en studiekeuze',
    output: 'χ²-waarde, df (vrijheidsgraden), p-waarde',
    interpretation: 'Als p < 0.05: significant verband tussen de variabelen',
    bgColor: 'bg-purple-50',
    explanation: `✅ Chi-kwadraat test in Jamovi

📌 Wat is het?

Een Chi-kwadraat test gebruik je om te kijken of er een verband is tussen twee categorische variabelen.

Voorbeeld: Is er een verschil in studiekeuze tussen mannen en vrouwen?

---

🛠 Hoe voer je dit uit in Jamovi?

1. Ga naar:  
   Analyses > Frequencies > Independent Samples

2. Zet:  
   - Je eerste categorische variabele in Rows (bijv. Geslacht)  
   - Je tweede categorische variabele in Columns (bijv. Studiekeuze)

3. Ga naar het tabblad Statistics  
   - Vink aan: Chi-square test of association

---

❓ Waarom kies je “Independent Samples”?

Omdat je twee onafhankelijke groepen vergelijkt (zoals man/vrouw) op een andere variabele (zoals studiekeuze).  
Je test of de verdeling in de ene variabele afhangt van de andere.

---

📊 Output en betekenis

<table>
  <thead>
    <tr>
      <th>Term</th>
      <th>Betekenis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>χ²-waarde</td>
      <td>De testwaarde die het verschil tussen wat je verwachtte en wat je vond weergeeft. Hoe groter het verschil, hoe hoger deze waarde.</td>
    </tr>
    <tr>
      <td>df (degrees of freedom / vrijheidsgraden)</td>
      <td>Aantal ‘vrije keuzes’. Wordt berekend als: (aantal rijen - 1) × (aantal kolommen - 1)</td>
    </tr>
    <tr>
      <td>p-waarde</td>
      <td>De kans dat je het gevonden verschil krijgt als er eigenlijk géén verschil is. Als p < 0.05, dan is het verschil waarschijnlijk niet toeval.</td>
    </tr>
    <tr>
      <td>N</td>
      <td>Aantal deelnemers in de analyse.</td>
    </tr>
  </tbody>
</table>

---

🧠 Interpretatie

<ul>
  <li><strong>p < 0.05</strong> → Er is een significant verband tussen de variabelen.</li>
  <li><strong>p ≥ 0.05</strong> → Geen bewijs voor een verband (kan toeval zijn).</li>
</ul>

---

🔁 Wanneer gebruik je de andere opties?

- Binomial test 
  → Als je één variabele hebt met twee mogelijke uitkomsten (zoals ja/nee).  
  Bijvoorbeeld: Is het percentage mensen dat “ja” zegt gelijk aan 50%?

- Goodness of fit (χ²)  
  → Als je één categorische variabele met meerdere categorieën vergelijkt met een verwachte verdeling.  
 Bijvoorbeeld: Worden vanille, aardbei en chocolade even vaak gekozen?  
  ➡ Ga naar: Analyses > Frequencies > N Outcomes (χ² Goodness of Fit)

- McNemar test (Paired Samples)  
  → Gebruik je als je dezelfde personen vóór en na iets test met een ja/nee-uitkomst.  
  Bijvoorbeeld: Stemmen mensen voor een maatregel vóór en na een campagne?

---

📊 **Expected Value in een Chi-kwadraattest**

De expected value is de waarde die je in een cel van je kruistabel zou verwachten als er geen verband is tussen de twee variabelen. Je vergelijkt de gemeten (observed) waarden met de expected waarden om te bepalen of het verschil toeval is.

**Formule**:

<div style="text-align: center; font-weight: bold;">
  Expected = (rijtotaal × kolomtotaal) / totaal aantal observaties
</div>

**Belangrijk**:
<ul>
  <li>Elke expected value moet minimaal 5 zijn.</li>
  <li>Als een of meer expected values lager zijn dan 5, is de Chi-kwadraattest niet betrouwbaar.</li>
  <li>In dat geval mag je de p-waarde niet gebruiken om een conclusie te trekken.</li>
</ul>

**Oplossing bij expected < 5**:
<ul>
  <li>Categorieën samenvoegen.</li>
  <li>Of een alternatieve test gebruiken, zoals Fisher’s Exact Test (bij 2×2-tabellen).</li>
</ul>

---

📷 **Voorbeeld van de output in Jamovi**

<div style="text-align: center;">
  <img 
    src="/images/chi-kwadraat.png" 
    alt="Chi-kwadraat output in Jamovi" 
    style="max-width: 100%; height: auto; border: 1px solid #ccc; padding: 5px;" 
  />
</div>

---

📊 **Hoe lees je de output af in Jamovi?**

<table>
  <thead>
    <tr>
      <th>Aspect</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <h3>Observed en Expected Counts</h3>
        <ul>
          <li><strong>Observed:</strong> Het werkelijke aantal mensen dat in elke combinatie valt. Bijvoorbeeld: vrouwen met kwalificatieniveau 1 = 22.</li>
          <li><strong>Expected:</strong> Hoeveel mensen je daar zou verwachten als er géén verband is tussen gender en kwalificatieniveau. Bijvoorbeeld: 16.9.</li>
          <li>Als de verschillen groot zijn, kan dit een teken zijn van een verband.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <h3>χ²-waarde, df en p-waarde</h3>
        <ul>
          <li><strong>χ² (chi-kwadraatwaarde):</strong> Waarde = 6.86. Hoe groter dit getal, hoe groter het verschil tussen de waargenomen en verwachte waarden.</li>
          <li><strong>df (degrees of freedom):</strong> Waarde = 4. Wordt berekend als (aantal rijen - 1) × (aantal kolommen - 1).</li>
          <li><strong>p-waarde:</strong> Waarde = 0.143. Deze geeft aan of het verschil statistisch significant is.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <h3>Hoe interpreteer je de p-waarde?</h3>
        <ul>
          <li><strong>p = 0.143:</strong> Dit is groter dan 0.05. Je verwerpt de nulhypothese niet.</li>
          <li>Er is geen significant verband tussen gender en kwalificatieniveau.</li>
          <li><strong>Kort gezegd:</strong> De verdeling van kwalificatieniveaus is niet verschillend genoeg tussen mannen en vrouwen om van een statistisch verband te spreken.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <h3>Controleer de expected values</h3>
        <ul>
          <li>Kijk of alle expected counts minstens 5 zijn.</li>
          <li>Als meerdere cellen onder de 5 zitten, is de test mogelijk onbetrouwbaar.</li>
          <li><strong>Voorbeelden:</strong>
            <ul>
              <li>Qualification 3 bij vrouwen: expected = 3.02.</li>
              <li>Qualification 5 bij mannen: expected = 1.98.</li>
            </ul>
          </li>
          <li><strong>Let op:</strong> Dit is een waarschuwing dat de testresultaten minder betrouwbaar zijn.</li>
          <li><strong>Alternatief:</strong> Categorieën samenvoegen (bijv. kwalificatie 3, 4, 5).</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

📋 **Conclusie op basis van jouw Jamovi-output**

<table>
  <thead>
    <tr>
      <th>Onderdeel</th>
      <th>Waarde</th>
      <th>Betekenis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>χ²-waarde</td>
      <td>6.86</td>
      <td>De grootte van het verschil tussen expected en observed</td>
    </tr>
    <tr>
      <td>df</td>
      <td>4</td>
      <td>Aantal vrijheidsgraden</td>
    </tr>
    <tr>
      <td>p-waarde</td>
      <td>0.143</td>
      <td>Niet significant → geen sterk bewijs voor een verband</td>
    </tr>
    <tr>
      <td>Expected values < 5</td>
      <td>Meerdere</td>
      <td>Test mogelijk onbetrouwbaar, overweeg samenvoegen</td>
    </tr>
  </tbody>
</table>`
  },
  {
    name: 'Correlatie',
    whenToUse: 'Verband tussen 2 continue variabelen',
    dataType: 'Interval/ratio',
    example: 'Verband tussen lengte en gewicht',
    output: 'r (correlatiecoëfficiënt), p-waarde',
    interpretation: 'r tussen -1 en 1, p < 0.05 voor significant verband',
    bgColor: 'bg-yellow-50',
    explanation: `✅ Correlatietest in Jamovi

📌 **Wat is een correlatietest?**

Een correlatietest onderzoekt of er een lineair verband is tussen twee numerieke (continue) variabelen.  
Je meet of de waarden van de ene variabele samenhangen met de waarden van de andere.

**Voorbeelden**:
- Is er een verband tussen aantal uren studeren en tentamencijfer?
- Is er een verband tussen leeftijd en aantal uren slaap?

---

📊 **Uitkomst van een correlatietest**

**Correlatiecoëfficiënt (r)**:
<ul>
  <li>Ligt tussen -1 en +1.</li>
  <li><strong>r = 0</strong>: geen lineair verband.</li>
  <li><strong>r > 0</strong>: als de ene variabele toeneemt, neemt de andere ook toe.</li>
  <li><strong>r < 0</strong>: als de ene variabele toeneemt, neemt de andere af.</li>
</ul>

**Vuistregel**:
<ul>
  <li>0.1 tot 0.3 = zwak verband</li>
  <li>0.3 tot 0.7 = matig verband</li>
  <li>0.7 tot 1.0 = sterk verband</li>
</ul>

**P-waarde**:
<ul>
  <li>Geeft aan of het verband toeval kan zijn.</li>
  <li><strong>p < 0.05</strong>: het verband is statistisch significant.</li>
  <li><strong>p ≥ 0.05</strong>: het verband kan op toeval berusten.</li>
</ul>

---

🛠 **Correlatietest uitvoeren in Jamovi**

1. Ga naar:  
   **Analyses > Regression > Correlation Matrix**

2. Selecteer de twee numerieke variabelen die je wilt vergelijken.

3. Vink aan:
<ul>
  <li>Pearson’s r</li>
  <li>p-value</li>
  <li>Eventueel: confidence interval</li>
</ul>

**Let op**:
- Gebruik **Pearson’s r** bij lineaire verbanden met normaal verdeelde data.
- Gebruik **Spearman’s correlatie** als de data scheef verdeeld zijn of als het verband niet lineair is.

---

Wanneer gebruik je geen correlatietest?

- Als je werkt met categorische variabelen (zoals geslacht of opleidingsniveau).  
  In dat geval gebruik je bijvoorbeeld een chi-kwadraattest.

---

Verschil met de chi-kwadraattest

- De chi-kwadraattest test of er een verband is tussen twee categorische variabelen. Hierbij werk je met frequenties en expected values.
- Bij een correlatietest vergelijk je geen frequenties maar kijk je of twee cijferreeksen samen op- of aflopen.

Voorbeeld:
Je onderzoekt of er een verband is tussen het aantal uren studeren en het tentamencijfer.  
Uitkomst: r = 0.62, p = 0.004.  
Conclusie: er is een redelijk sterk positief verband dat niet op toeval berust.

---

📷 Voorbeeld van de output in Jamovi

<div style="text-align: center;">
  <img 
    src="/images/correlatietest.png" 
    alt="Correlatietest output in Jamovi" 
    style="max-width: 100%; height: auto; border: 1px solid #ccc; padding: 5px;" 
  />
</div>

---

📊 **Hoe lees je de output af in Jamovi?**

<table>
  <thead>
    <tr>
      <th>Aspect</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <h3>Pearson's r</h3>
        <ul>
          <li><strong>r = 0.019:</strong> Dit is de correlatiecoëfficiënt tussen salary en age.</li>
          <li>0.019 is bijna nul, dus er is bijna geen verband tussen leeftijd en salaris.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <h3>Degrees of freedom (df)</h3>
        <ul>
          <li><strong>df = 104:</strong> Dit wordt berekend als het aantal waarnemingen - 2.</li>
          <li>In dit geval waren er 106 waarnemingen, dus 106 - 2 = 104.</li>
          <li>Je haalt er 2 af omdat je bij een correlatie twee gemiddelden gebruikt:  
            <ul>
              <li>één voor salary en één voor age.</li>
            </ul>
          </li>
          <li>Die twee gemiddelden nemen al informatie weg uit de data, dus je hebt twee vrijheden minder.</li>
          <li>De df bepaalt hoe betrouwbaar en precies je de correlatie mag inschatten.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <h3>P-waarde</h3>
        <ul>
          <li><strong>p = 0.850:</strong> Deze waarde is veel groter dan 0.05, dus het gevonden verband is niet significant.</li>
          <li>Het kleine verband dat je ziet kan gewoon door toeval zijn ontstaan.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>`
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
            {test.explanation && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Uitleg</h3>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      test.explanation
                        .replace(/\*\*/g, '') // Remove all asterisks used for bold
                        .replace(/\n\n/g, '<br><br>') // Convert double line breaks to <br><br>
                    ),
                  }}
                />
              </div>
            )}
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