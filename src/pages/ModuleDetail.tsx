import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Registreer Chart.js componenten
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  antwoordUitleg?: string[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface PraktijkData {
  variabele: string;
  meetniveau?: string;
  voorbeelden: string[];
  vraag?: string;
  opties?: string[];
  correctAntwoord?: number;
  uitleg?: string;
  antwoordUitleg?: string[];
}

interface Section {
  id: number;
  title: string;
  type: 'theory' | 'visualization' | 'practical';
  content: string;
  quizzes?: Quiz[];
  chartData?: ChartData;
  praktijkData?: PraktijkData[];
}

interface ModuleData {
  title: string;
  sections: Section[];
}

// Module definities
const moduleData: Record<string, ModuleData> = {
  descriptive: {
    title: 'Meetniveaus & Diagrammen',
    sections: [
      {
        id: 1,
        title: 'Meetniveaus',
        type: 'theory',
        content: `
          In de statistiek onderscheiden we vier verschillende meetniveaus:
          
          1. Nominaal: Categorieën zonder rangorde (bijvoorbeeld: geslacht, bloedgroep, woonplaats)
          2. Ordinaal: Categorieën met een rangorde (bijvoorbeeld: opleidingsniveau, Likert-schaal)
          3. Interval: Getallen met gelijke intervallen, geen absoluut nulpunt (bijvoorbeeld: temperatuur in °C, jaartallen)
          4. Ratio: Getallen met gelijke intervallen én absoluut nulpunt (bijvoorbeeld: lengte, gewicht, leeftijd)
        `,
        quizzes: [
          {
            question: "Welk meetniveau is 'temperatuur in graden Celsius'?",
            options: ["Nominaal", "Ordinaal", "Interval", "Ratio"],
            correctAnswer: 2,
            explanation: "Temperatuur in Celsius is een interval meetniveau omdat het verschil tussen waarden betekenisvol is, maar er geen absoluut nulpunt is (0°C is niet de afwezigheid van temperatuur).",
            antwoordUitleg: [
              "Nominaal is niet correct omdat temperatuur geen categorieën zonder rangorde is.",
              "Ordinaal is niet correct omdat temperatuur geen categorieën met rangorde is.",
              "Interval is correct omdat temperatuur een interval meetniveau is.",
              "Ratio is niet correct omdat temperatuur geen absoluut nulpunt heeft."
            ]
          },
          {
            question: "Welke van de volgende variabelen is een voorbeeld van een nominaal meetniveau?",
            options: [
              "De grootte van een T-shirt (S, M, L, XL)",
              "De favoriete kleur van een persoon",
              "De maand waarin iemand geboren is",
              "De temperatuur buiten in graden Celsius"
            ],
            correctAnswer: 1,
            explanation: "De favoriete kleur van een persoon is nominaal omdat het categorieën zonder volgorde zijn.",
            antwoordUitleg: [
              "Fout: De grootte van een T-shirt is ordinaal omdat er een volgorde is.",
              "Correct: De favoriete kleur is nominaal omdat er geen volgorde is.",
              "Fout: De maand waarin iemand geboren is heeft een volgorde en is dus ordinaal.",
              "Fout: De temperatuur in graden Celsius is interval omdat het numerieke waarden met gelijke intervallen zijn."
            ]
          },
          {
            question: "Welke variabele is van het ordinaal meetniveau?",
            options: [
              "Postcode van een wijk",
              "Cijfer op een schaal van 1 t/m 10",
              "Klanttevredenheid gemeten op een schaal van “zeer slecht” tot “uitstekend”",
              "Leeftijd in jaren"
            ],
            correctAnswer: 2,
            explanation: "Klanttevredenheid is ordinaal omdat er een volgorde is, maar de afstanden tussen categorieën zijn niet gelijk.",
            antwoordUitleg: [
              "Fout: Postcode is nominaal omdat het geen volgorde heeft.",
              "Fout: Een cijfer op een schaal van 1 t/m 10 is interval omdat de afstanden gelijk zijn.",
              "Correct: Klanttevredenheid is ordinaal omdat er een volgorde is zonder gelijke afstanden.",
              "Fout: Leeftijd in jaren is ratio omdat het een absoluut nulpunt heeft."
            ]
          },
          {
            question: "Welke van deze variabelen heeft het intervalniveau?",
            options: [
              "Temperatuur in graden Celsius",
              "Lengte van een persoon in cm",
              "Inkomsten per maand in euro’s",
              "Leeftijd van een dier in maanden"
            ],
            correctAnswer: 0,
            explanation: "Temperatuur in graden Celsius is interval omdat het gelijke intervallen heeft, maar geen absoluut nulpunt.",
            antwoordUitleg: [
              "Correct: Temperatuur in graden Celsius is interval.",
              "Fout: Lengte van een persoon is ratio omdat het een absoluut nulpunt heeft.",
              "Fout: Inkomsten per maand is ratio omdat het een absoluut nulpunt heeft.",
              "Fout: Leeftijd van een dier is ratio omdat het een absoluut nulpunt heeft."
            ]
          },
          {
            question: "Welke meetniveau hoort bij het gegeven: 'Aantal kopjes koffie dat iemand per dag drinkt'?",
            options: ["Nominaal", "Ordinaal", "Interval", "Ratio"],
            correctAnswer: 3,
            explanation: "Aantal kopjes koffie is ratio omdat het een absoluut nulpunt heeft en je ermee kunt rekenen.",
            antwoordUitleg: [
              "Fout: Nominaal is niet correct omdat het geen categorieën zijn.",
              "Fout: Ordinaal is niet correct omdat er geen volgorde is.",
              "Fout: Interval is niet correct omdat er een absoluut nulpunt is.",
              "Correct: Ratio is correct omdat het een absoluut nulpunt heeft."
            ]
          },
          {
            question: "Wat is het belangrijkste verschil tussen interval en ratio?",
            options: [
              "Ratio heeft categorieën, interval niet",
              "Ratio heeft een absoluut nulpunt, interval niet",
              "Interval meet ordinale data, ratio niet",
              "Er is geen verschil"
            ],
            correctAnswer: 1,
            explanation: "Het belangrijkste verschil is dat ratio een absoluut nulpunt heeft en interval niet.",
            antwoordUitleg: [
              "Fout: Ratio en interval hebben geen categorieën.",
              "Correct: Ratio heeft een absoluut nulpunt, interval niet.",
              "Fout: Interval meet geen ordinale data.",
              "Fout: Er is wel een verschil tussen interval en ratio."
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Diagrammen",
        type: 'visualization',
        content: `
          Welke grafiek gebruik je bij welk type data?
          Het kiezen van de juiste grafiek is belangrijk om je data duidelijk en overzichtelijk weer te geven. Hieronder leggen we uit welke grafiek je gebruikt op basis van het type variabelen dat je onderzoekt.

          🔹 1 Categorische Variabele
          Gebruik: Staafdiagram of Taartdiagram
          Wanneer? Als je één vraag stelt waarbij je wilt weten hoe vaak iets voorkomt of wat de voorkeur is binnen één categorie.
          Voorbeelden:
          - Wat is de favoriete vakantiebestemming van 100 mensen?
          - Uit welk land komen de meeste hotelgasten (Nederland, Duitsland, Frankrijk, België)?
          - Welk type ontbijt is het populairst (croissant, yoghurt, smoothie, niks)?
          Waarom deze grafiek? Je maakt geen onderscheid in groepen; je kijkt puur naar de verdeling binnen één categorie.

          🔹 2 Categorische Variabelen
          Gebruik: Geclusterd staafdiagram
          Wanneer? Als je verschillen tussen groepen binnen meerdere categorieën wilt vergelijken.
          Voorbeelden:
          - Wat is de favoriete keuken van mannen versus vrouwen?
          - Verschilt de kamerkeuze tussen gasten met of zonder kinderen?
          - Welk vervoermiddel gebruiken gasten per leeftijdsgroep?
          Waarom deze grafiek? Je vergelijkt meerdere categorieën binnen subgroepen (bijv. man/vrouw, jong/oud).

          🔹 1 Continue Variabele
          Gebruik: Histogram
          Wanneer? Als je de verdeling van een numerieke waarde over een groep wilt laten zien.
          Voorbeelden:
          - Hoeveel minuten zitten mensen gemiddeld in de sauna?
          - Hoe is de spreiding van leeftijden onder hotelgasten?
          - Hoeveel uur sporten mensen gemiddeld per dag?
          Waarom deze grafiek? Je wilt weten hoe vaak bepaalde waardes voorkomen (frequentieverdeling).

          🔹 2 Continue Variabelen
          Gebruik: Lijndiagram of Spreidingsdiagram (Puntenwolk / scatterplot)
          Wanneer? Als je het verband tussen twee numerieke variabelen wilt analyseren.
          Voorbeelden:
          - Is er een verband tussen slaapuren en klanttevredenheid?
          - Geven oudere mensen meer geld uit aan de bar?
          - Heeft de buitentemperatuur invloed op het aantal verkochte drankjes?
          Waarom deze grafiek? Je onderzoekt een relatie tussen twee meetbare factoren.

          🔹 1 Continue + 1 Categorische Variabele
          Gebruik: Boxplot of foutjesbalk (bar chart met gemiddelden)
          Wanneer? Als je gemiddelden van een meetbare waarde wilt vergelijken tussen groepen.
          Voorbeelden:
          - Slaapgemiddelde vergelijken tussen mannen en vrouwen
          - Restaurantbestedingen vergelijken tussen gasten uit verschillende landen
          - Invloed van kamertype op klanttevredenheidsscore
          Waarom deze grafiek? Je vergelijkt gemiddelden binnen groepen, niet de aantallen.
        `,
        chartData: {
          labels: ['Maastricht', 'Kerkrade', 'Venlo'], // Steden op de x-as
          datasets: [
            {
              label: 'WO',
              data: [50, 30, 20], // Aantal WO-studenten per stad
              backgroundColor: 'rgba(59, 130, 246, 0.5)', // Kleur voor WO
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 1,
            },
            {
              label: 'HBO',
              data: [60, 40, 30], // Aantal HBO-studenten per stad
              backgroundColor: 'rgba(99, 102, 241, 0.5)', // Kleur voor HBO
              borderColor: 'rgb(99, 102, 241)',
              borderWidth: 1,
            },
            {
              label: 'MBO',
              data: [40, 50, 60], // Aantal MBO-studenten per stad
              backgroundColor: 'rgba(139, 92, 246, 0.5)', // Kleur voor MBO
              borderColor: 'rgb(139, 92, 246)',
              borderWidth: 1,
            },
          ],
        },
      },
      {
        id: 3,
        title: "Praktijkopdracht",
        type: 'practical',
        content: "In deze opdracht ga je werken met een echte dataset over studieresultaten.",
        praktijkData: [
          {
            variabele: "Leeftijd",
            meetniveau: "ratio",
            voorbeelden: ["18", "19", "21", "25", "30"],
            vraag: "Wat is het meetniveau van de variabele 'Leeftijd'?",
            opties: ["Nominaal", "Ordinaal", "Interval", "Ratio"],
            correctAntwoord: 3,
            antwoordUitleg: [
              "Fout: Leeftijd is geen nominale variabele, omdat het geen categorieën zijn.",
              "Fout: Leeftijd is geen ordinale variabele, omdat er geen volgorde van categorieën is.",
              "Fout: Leeftijd is geen intervalvariabele, omdat het een echt nulpunt heeft.",
              "Correct: Leeftijd is ratio, omdat het een echt nulpunt heeft en je ermee kunt rekenen (bijvoorbeeld: 20 jaar is twee keer zo oud als 10 jaar)."
            ]
          },
          {
            variabele: "Studierichting",
            meetniveau: "nominaal",
            voorbeelden: ["Psychologie", "Economie", "Informatica"],
            vraag: "Wat is het meetniveau van de variabele 'Studierichting'?",
            opties: ["Nominaal", "Ordinaal", "Interval", "Ratio"],
            correctAntwoord: 0,
            antwoordUitleg: [
              "Correct: Studierichting is nominaal, omdat het categorieën zijn zonder volgorde.",
              "Fout: Studierichting is geen ordinale variabele, omdat er geen volgorde is.",
              "Fout: Studierichting is geen intervalvariabele, omdat het geen getallen zijn.",
              "Fout: Studierichting is geen ratio, omdat het geen getallen zijn."
            ]
          },
          {
            variabele: "Tevredenheid",
            meetniveau: "ordinaal",
            voorbeelden: ["Zeer ontevreden", "Ontevreden", "Neutraal", "Tevreden", "Zeer tevreden"],
            vraag: "Wat is het meetniveau van de variabele 'Tevredenheid'?",
            opties: ["Nominaal", "Ordinaal", "Interval", "Ratio"],
            correctAntwoord: 1,
            antwoordUitleg: [
              "Fout: Tevredenheid is geen nominaal meetniveau, omdat er een volgorde is.",
              "Correct: Tevredenheid is ordinaal, omdat er een volgorde is (bijvoorbeeld: ontevreden is minder dan tevreden).",
              "Fout: Tevredenheid is geen interval, omdat je de verschillen niet kunt meten.",
              "Fout: Tevredenheid is geen ratio, omdat er geen echt nulpunt is."
            ]
          },
          {
            variabele: "Temperatuur klaslokaal",
            meetniveau: "interval",
            voorbeelden: ["18°C", "20°C", "22°C", "24°C"],
            vraag: "Wat is het meetniveau van de variabele 'Temperatuur klaslokaal'?",
            opties: ["Nominaal", "Ordinaal", "Interval", "Ratio"],
            correctAntwoord: 2,
            antwoordUitleg: [
              "Fout: Temperatuur is geen nominaal meetniveau, omdat het geen categorieën zijn.",
              "Fout: Temperatuur is geen ordinaal meetniveau, omdat er geen volgorde van categorieën is.",
              "Correct: Temperatuur in graden Celsius is interval, omdat je de verschillen kunt meten (bijvoorbeeld: 20°C is 2°C warmer dan 18°C).",
              "Fout: Temperatuur in graden Celsius is geen ratio, omdat het geen echt nulpunt heeft. Kelvin heeft wel een echt nulpunt (0 Kelvin betekent geen warmte)."
            ]
          },
          {
            variabele: "Populairste koffiedrank",
            voorbeelden: ["Espresso", "Cappuccino", "Latte", "Americano"],
            vraag: "Je onderzoekt welk soort koffiedrank (espresso, cappuccino, latte, americano) het populairst is onder studenten. Welke grafiek kies je?",
            opties: ["Taartdiagram", "Spreidingsdiagram", "Histogram", "Boxplot"],
            correctAntwoord: 0,
            antwoordUitleg: [
              "Correct: Een taartdiagram is geschikt om de verdeling van categorieën te tonen.",
              "Fout: Een spreidingsdiagram is niet geschikt voor categorische data.",
              "Fout: Een histogram is bedoeld voor continue data.",
              "Fout: Een boxplot is bedoeld voor het vergelijken van spreiding binnen groepen."
            ]
          },
          {
            variabele: "Werkplekvoorkeur",
            voorbeelden: ["Thuis", "Kantoor", "Café"],
            vraag: "Je wilt het verschil onderzoeken in favoriete werkplek (thuis, kantoor, café) tussen studenten en werkenden. Welke grafiek gebruik je?",
            opties: ["Lijndiagram", "Boxplot", "Geclusterd staafdiagram", "Histogram"],
            correctAntwoord: 2,
            antwoordUitleg: [
              "Fout: Een lijndiagram is niet geschikt voor categorische data.",
              "Fout: Een boxplot is bedoeld voor het vergelijken van spreiding binnen groepen.",
              "Correct: Een geclusterd staafdiagram is geschikt om verschillen tussen groepen te vergelijken.",
              "Fout: Een histogram is bedoeld voor continue data."
            ]
          },
          {
            variabele: "Lengte hotelgasten",
            voorbeelden: ["200 hotelgasten"],
            vraag: "Je hebt data over de lengte van 200 hotelgasten. Welke grafiek gebruik je om de verdeling te tonen?",
            opties: ["Spreidingsdiagram", "Histogram", "Staafdiagram", "Boxplot"],
            correctAntwoord: 1,
            antwoordUitleg: [
              "Fout: Een spreidingsdiagram is bedoeld voor het tonen van relaties tussen twee variabelen.",
              "Correct: Een histogram is geschikt om de verdeling van een continue variabele te tonen.",
              "Fout: Een staafdiagram is bedoeld voor categorische data.",
              "Fout: Een boxplot is bedoeld voor het vergelijken van spreiding binnen groepen."
            ]
          },
          {
            variabele: "Reisafstand en ontbijtuitgaven",
            voorbeelden: ["Reisafstand", "Ontbijtuitgaven"],
            vraag: "Je wilt weten of mensen die verder reizen naar het hotel ook meer geld uitgeven aan het ontbijt. Wat gebruik je?",
            opties: ["Boxplot", "Taartdiagram", "Spreidingsdiagram", "Staafdiagram"],
            correctAntwoord: 2,
            antwoordUitleg: [
              "Fout: Een boxplot is bedoeld voor het vergelijken van spreiding binnen groepen.",
              "Fout: Een taartdiagram is niet geschikt voor het tonen van relaties tussen variabelen.",
              "Correct: Een spreidingsdiagram is geschikt om relaties tussen twee continue variabelen te tonen.",
              "Fout: Een staafdiagram is bedoeld voor categorische data."
            ]
          },
          {
            variabele: "Gemiddelde besteding hotelbar",
            voorbeelden: ["Nederland", "Duitsland", "Italië"],
            vraag: "Je vergelijkt de gemiddelde besteding in de hotelbar tussen gasten uit Nederland, Duitsland en Italië. Welke grafiek gebruik je?",
            opties: ["Boxplot", "Geclusterd staafdiagram", "Spreidingsdiagram", "Histogram"],
            correctAntwoord: 0,
            antwoordUitleg: [
              "Correct: Een boxplot is geschikt om gemiddelden en spreiding binnen groepen te vergelijken.",
              "Fout: Een geclusterd staafdiagram is bedoeld voor categorische data.",
              "Fout: Een spreidingsdiagram is bedoeld voor het tonen van relaties tussen twee variabelen.",
              "Fout: Een histogram is bedoeld voor de verdeling van een enkele continue variabele."
            ]
          }
        ]
      }
    ]
  },
  hypothesis: {
    title: 'Hypothesen & Toetsbeslissingen',
    sections: [
      {
        id: 1,
        title: 'Introductie',
        type: 'theory',
        content: `
          Wat is een hypothese?
          Een hypothese is een toetsbare voorspelling of veronderstelling over de werkelijkheid.

          
          In de statistiek werken we met twee soorten hypothesen:

          
          1. Nulhypothese (H0):
          • Gaat uit van "geen effect" of "geen verschil"
          • Is wat we proberen te verwerpen
          • Bijvoorbeeld: "Het medicijn heeft geen effect" (H0: μ = 0)

          
          2. Alternatieve hypothese (H1):
          • Beschrijft het effect dat we verwachten
          • Is vaak wat we willen aantonen
          • Bijvoorbeeld: "Het medicijn heeft een positief effect" (H1: μ > 0)

          
          Symbolen in hypothesen:

          
          μ (mu) - Gemiddelde:
          • Wordt gebruikt voor continue variabelen (bijvoorbeeld: lengte, gewicht, tijd)
          • Staat voor het populatiegemiddelde
          • Bijvoorbeeld: "HMSM-studenten fietsen gemiddeld 65 km per week" (μ = 65)

          
          π (pi) - Proportie:
          • Wordt gebruikt voor categorische variabelen (bijvoorbeeld: percentage, frequentie)
          • Staat voor het percentage of aandeel in de populatie
          • Bijvoorbeeld: "8.1% van de bevolking is zware drinker" (π = 0.081)

          
          Voorbeelden:

          
          Voorbeeld 1 - Medicijnonderzoek:
          • H0: Het medicijn heeft geen effect (μmedicijn = μplacebo)
          • H1: Het medicijn heeft wel effect (μmedicijn ≠ μplacebo)

          
          Voorbeeld 2 - Fietsgedrag studenten:
          • H0: HMSM-studenten fietsen gemiddeld niet meer dan UM-studenten (μHMSM ≤ 65km)
          • H1: HMSM-studenten fietsen gemiddeld meer dan UM-studenten (μHMSM > 65km)

          
          Voorbeeld 3 - Alcoholcampagne:
          • H0: Het percentage zware drinkers is niet verlaagd (π ≥ 0.081)
          • H1: Het percentage zware drinkers is verlaagd (π < 0.081)

          
          Eenzijdig vs. Tweezijdig toetsen:

          
          Eenzijdige toets:
          • Je verwacht een effect in één specifieke richting
          • Bijvoorbeeld: "Het nieuwe medicijn werkt beter" (niet slechter)
          • H1 bevat > of <

          
          Tweezijdige toets:
          • Je wilt weten of er überhaupt een verschil is
          • Richting van het verschil maakt niet uit
          • H1 bevat ≠
        `.replace(/\n\n/g, '\n\n\n'), // Voeg extra lege regels toe voor meer ruimte
        quizzes: [
          {
            question: "Welke hypothese proberen we meestal te verwerpen?",
            options: [
              "De alternatieve hypothese (H1)",
              "De nulhypothese (H0)",
              "Beide hypothesen",
              "Geen van beide hypothesen"
            ],
            correctAnswer: 1,
            explanation: "We proberen altijd de nulhypothese (H0) te verwerpen. Dit is de hypothese die stelt dat er geen effect of verschil is.",
            antwoordUitleg: [
              "De alternatieve hypothese (H1) is niet correct omdat we deze willen aantonen, niet verwerpen.",
              "De nulhypothese (H0) is correct omdat we deze willen verwerpen.",
              "Beide hypothesen is niet correct omdat we alleen de nulhypothese willen verwerpen.",
              "Geen van beide hypothesen is niet correct omdat we altijd de nulhypothese willen verwerpen."
            ]
          },
          {
            question: "Wanneer gebruik je een eenzijdige toets?",
            options: [
              "Als je verwacht dat er een verschil is in een specifieke richting",
              "Als je wilt weten of er überhaupt een verschil is",
              "Als je geen idee hebt wat het effect zal zijn",
              "Als je twee groepen wilt vergelijken"
            ],
            correctAnswer: 0,
            explanation: "Een eenzijdige toets gebruik je wanneer je vooraf een specifieke verwachting hebt over de richting van het effect (bijvoorbeeld dat groep A beter presteert dan groep B).",
            antwoordUitleg: [
              "Correct: Een eenzijdige toets gebruik je wanneer je een specifieke verwachting hebt over de richting van het effect.",
              "Fout: Een tweezijdige toets gebruik je wanneer je wilt weten of er überhaupt een verschil is.",
              "Fout: Een eenzijdige toets vereist een specifieke verwachting over de richting van het effect.",
              "Fout: Het vergelijken van twee groepen kan zowel eenzijdig als tweezijdig zijn, afhankelijk van de verwachting."
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'P-waarde & Toetsbeslissingen',
        type: 'theory',
        content: `
          De p-waarde en toetsbeslissingen

          
          Wat is een p-waarde?
          • De kans om je gevonden resultaat (of extremer) te vinden als H0 waar zou zijn
          • Hoe kleiner de p-waarde, hoe sterker het bewijs tegen H0
          • Let op: zegt niets over de grootte van het effect!

          
          Beslisregel met α = 0.05:
          • p < 0.05: Verwerp H0 (significant resultaat)
          • p ≥ 0.05: Behoud H0 (niet significant)

          
          Soorten fouten bij toetsen:

          
          Type I fout (α):
          • H0 verwerpen terwijl deze waar is
          • "Onschuldige veroordelen"
          • Kans hierop = α (meestal 5%)

          
          Type II fout (β):
          • H0 niet verwerpen terwijl deze onwaar is
          • "Brandalarm gaat niet af bij brand"
          • Kans hierop hangt af van steekproefgrootte

          
          1. Point Estimates (Puntschattingen)
          Een point estimate is een enkele waarde die gebruikt wordt als een schatting van een onbekende parameter in een populatie.
          🔹 Voorbeeld: Het gemiddelde gewicht van een steekproef is 75 kg → dat is een puntschatting voor het gemiddelde gewicht van de hele populatie.

          
          2. Confidence Intervals (Betrouwbaarheidsintervallen)
          Een confidence interval is een range (interval) van waarden waarvan je aanneemt dat deze met een bepaalde zekerheid de werkelijke populatiewaarde bevat.
          🔹 Voorbeeld: Een 95% betrouwbaarheidsinterval voor het gemiddelde gewicht is [72, 78] → je bent 95% zeker dat het echte gemiddelde ergens in dit interval ligt.

          
          3. Degree of Certainty (Mate van Zekerheid)
          De degree of certainty verwijst naar hoe zeker je bent dat het betrouwbaarheidsinterval de werkelijke waarde bevat.
          🔹 Meestal uitgedrukt als 95% of 99%. Dit hangt direct samen met het betrouwbaarheidsinterval.

          
          4. Significance (Significantieniveau, α)
          Het significantieniveau (vaak aangeduid als α) is de kans dat je ten onrechte de nulhypothese verwerpt (Type I-fout).
          🔹 Een veelgebruikte waarde is α = 0.05, wat betekent dat je een foutkans van 5% accepteert.
        `.replace(/\n\n/g, '\n\n\n'), // Voeg extra lege regels toe voor meer ruimte
        quizzes: [
          {
            question: "Je vindt p = 0.03 bij α = 0.05. Wat concludeer je?",
            options: [
              "H0 behouden want p < α",
              "H0 verwerpen want p < α",
              "H0 behouden want p > α",
              "Geen conclusie mogelijk"
            ],
            correctAnswer: 1,
            explanation: "Als p < α (hier: 0.03 < 0.05), dan verwerpen we H0. Dit betekent dat we voldoende bewijs hebben tegen de nulhypothese.",
            antwoordUitleg: [
              "Fout: H0 behouden is niet correct omdat p < α.",
              "Correct: H0 verwerpen is correct omdat p < α.",
              "Fout: H0 behouden is niet correct omdat p < α.",
              "Fout: Er is wel een conclusie mogelijk omdat p < α."
            ]
          },
          {
            question: "Wat is een Type I fout?",
            options: [
              "H0 niet verwerpen terwijl deze onwaar is",
              "H0 verwerpen terwijl deze waar is",
              "De verkeerde toets gebruiken",
              "Een te kleine steekproef nemen"
            ],
            correctAnswer: 1,
            explanation: "Een Type I fout is het verwerpen van H0 terwijl deze eigenlijk waar is. Dit is vergelijkbaar met het veroordelen van een onschuldige persoon.",
            antwoordUitleg: [
              "Fout: Dit is een Type II fout.",
              "Correct: Dit is een Type I fout.",
              "Fout: Dit is geen Type I fout.",
              "Fout: Dit is geen Type I fout."
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Praktijkopdracht',
        type: 'practical',
        content: "In deze opdracht ga je de juiste hypothesen opstellen voor verschillende onderzoekssituaties.",
        praktijkData: [
          {
            variabele: "Fietsgedrag studenten",
            voorbeelden: ["UM-studenten fietsen gemiddeld 65 km per week", "Je wilt testen of HMSM-studenten meer fietsen", "Steekproef: 50 studenten van elke instelling"],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ < 65    H1: μ ≥ 65",
              "H0: μ ≤ 65    H1: μ > 65",
              "H0: π < 65    H1: π ≥ 65",
              "H0: π ≥ 65    H1: π < 65"
            ],
            correctAntwoord: 1,
            uitleg: "We willen testen of HMSM-studenten MEER fietsen dan 65 km. De nulhypothese (H0) moet de 'geen effect' situatie bevatten (≤ 65), en de alternatieve hypothese (H1) het effect dat we verwachten (> 65). We gebruiken μ omdat we een gemiddelde vergelijken (aantal kilometers per week), niet een percentage of proportie.",
            antwoordUitleg: [
              "Fout: H0 bevat < 65, wat betekent dat HMSM-studenten minder fietsen. Dit is niet de 'geen effect' situatie die we willen testen.",
              "Correct: H0 bevat ≤ 65 (geen effect of minder) en H1 bevat > 65 (meer), precies wat we willen testen. We gebruiken μ omdat we gemiddelden vergelijken.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken. π gebruik je voor percentages of proporties.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken, en de richting is omgekeerd (we willen testen of ze meer fietsen, niet minder)."
            ]
          },
          {
            variabele: "Alcoholcampagne",
            voorbeelden: ["In the Netherlands, 8.1% of the population are classified as heavy drinkers. The government runs an ad campaign with the intent to lower the amount of people who fall into this category. What are their hypotheses?"],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ < 8.1    H1: μ ≥ 8.1",
              "H0: μ ≥ 8.1    H1: μ < 8.1",
              "H0: π > 8.1    H1: π ≤ 8.1",
              "H0: π ≥ 8.1    H1: π < 8.1"
            ],
            correctAntwoord: 3,
            uitleg: "We testen of het percentage (π) zware drinkers is VERLAAGD. De nulhypothese (H0) moet de 'geen effect' situatie bevatten (≥ 8.1%), en de alternatieve hypothese (H1) het verwachte effect (< 8.1%). We gebruiken π omdat we met percentages werken (8.1% van de bevolking), niet met gemiddelden.",
            antwoordUitleg: [
              "Fout: We gebruiken μ (mu) terwijl we met percentages werken, en de richting is omgekeerd (we willen testen of het percentage is verlaagd).",
              "Fout: We gebruiken μ (mu) terwijl we met percentages werken. μ gebruik je voor gemiddelden, niet voor percentages.",
              "Fout: De richting is omgekeerd. H0 moet ≥ 8.1 bevatten (geen verlaging) en H1 moet < 8.1 bevatten (wel verlaging).",
              "Correct: We gebruiken π (pi) omdat we met percentages werken, en H0 bevat ≥ 8.1 (geen verlaging) en H1 bevat < 8.1 (wel verlaging)."
            ]
          },
          {
            variabele: "Allergieën vergelijken",
            voorbeelden: ["You want to test whether the amount of people who are allergic to peanut butter is different from the amount of people who are allergic to bees. What are your hypotheses?"],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ pinda > μ bijen      H1: μ pinda ≤ μ bijen",
              "H0: μ pinda = μ bijen      H1: μ pinda ≠ μ bijen",
              "H0: π pinda > π bijen      H1: π pinda ≤ π bijen",
              "H0: π pinda = π bijen      H1: π pinda ≠ π bijen"
            ],
            correctAntwoord: 3,
            uitleg: "We willen weten of er een VERSCHIL is tussen de percentages. We gebruiken een tweezijdige toets (≠) omdat we niet weten welke allergie vaker voorkomt. We gebruiken π omdat we percentages vergelijken (percentage mensen met allergie), niet gemiddelden.",
            antwoordUitleg: [
              "Fout: We gebruiken μ (mu) terwijl we met percentages werken, en we gebruiken een eenzijdige toets terwijl we niet weten welke allergie vaker voorkomt.",
              "Fout: We gebruiken μ (mu) terwijl we met percentages werken. μ gebruik je voor gemiddelden, niet voor percentages.",
              "Fout: We gebruiken een eenzijdige toets (> en ≤) terwijl we niet weten welke allergie vaker voorkomt. We moeten een tweezijdige toets gebruiken (= en ≠).",
              "Correct: We gebruiken π (pi) omdat we met percentages werken, en we gebruiken een tweezijdige toets (= en ≠) omdat we niet weten welke allergie vaker voorkomt."
            ]
          },
          {
            variabele: "iPhone vs Android kosten",
            voorbeelden: ["6.	A researcher believes the iphone costs the same, or even less than, the amount of money it takes to make an android. What should their hypotheses be?"],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ iPhone ≤ μ Android     H1: μ iPhone > μ Android",
              "H0: μ iPhone > μ Android     H1: μ iPhone ≤ μ Android",
              "H0: π iPhone ≥ π Android     H1: π iPhone < π Android",
              "H0: π iPhone > π Android     H1: π iPhone ≤ π Android"
            ],
            correctAntwoord: 1,
            uitleg: "De onderzoeker denkt dat iPhone evenveel of MINDER kost. De nulhypothese (H0) moet de 'geen effect' situatie bevatten (> Android), en de alternatieve hypothese (H1) het verwachte effect (≤ Android). We gebruiken μ omdat we gemiddelde kosten vergelijken (euro's), niet percentages.",
            antwoordUitleg: [
              "Fout: De richting is omgekeerd. De onderzoeker denkt dat iPhone evenveel of MINDER kost, dus H0 moet > Android bevatten en H1 moet ≤ Android bevatten.",
              "Correct: H0 bevat > Android (geen effect of duurder) en H1 bevat ≤ Android (evenveel of goedkoper), precies wat de onderzoeker wil testen. We gebruiken μ omdat we gemiddelden vergelijken.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken. π gebruik je voor percentages of proporties.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken, en de richting is omgekeerd (we willen testen of iPhone evenveel of minder kost)."
            ]
          },
          {
            variabele: "Pikant vs niet-pikant eten",
            voorbeelden: ["You believe that spicy food is bought more frequently than non-spicy food. To test this, you decide to measure the amount of money made from each respective entree. What are your hypotheses? "],
            vraag: "Welke hypothesen stel je op?",
            opties: [
              "H0: μ niet-pikant ≤ μ pikant     H1: μ niet-pikant > μ pikant",
              "H0: π niet-pikant ≥ π pikant     H1: π niet-pikant < π pikant",
              "H0: μ niet-pikant ≥ μ pikant     H1: μ niet-pikant < μ pikant",
              "H0: π niet-pikant > π pikant     H1: π niet-pikant ≤ π pikant"
            ],
            correctAntwoord: 2,
            uitleg: "We testen of pikant eten VAKER wordt gekocht. De nulhypothese (H0) moet de 'geen effect' situatie bevatten (≥), en de alternatieve hypothese (H1) het verwachte effect (<). We gebruiken μ omdat we gemiddelde omzet vergelijken (euro's per gerecht), niet percentages.",
            antwoordUitleg: [
              "Fout: De richting is omgekeerd. We willen testen of pikant eten vaker wordt gekocht, dus H0 moet ≥ pikant bevatten en H1 moet < pikant bevatten.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken. π gebruik je voor percentages of proporties.",
              "Correct: H0 bevat ≥ pikant (geen effect of vaker) en H1 bevat < pikant (minder vaak), precies wat we willen testen. We gebruiken μ omdat we gemiddelden vergelijken.",
              "Fout: We gebruiken π (pi) terwijl we met gemiddelden werken, en de richting is omgekeerd (we willen testen of pikant eten vaker wordt gekocht)."
            ]
          }
        ]
      }
    ]
  }
};

const ModuleDetail: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [sectionsCompleted, setSectionsCompleted] = useState<boolean[]>([]);
  const [selectedChart, setSelectedChart] = useState<'bar' | 'pie' | 'table' | 'stackedBar' | 'histogram' | 'boxplot' | 'scatter' | 'line'>('table');
  const [praktijkStarted, setPraktijkStarted] = useState(false);
  const [praktijkAnswers, setPraktijkAnswers] = useState<{ [key: string]: string }>({});
  const [showFeedback, setShowFeedback] = useState(false);

  // Haal module data op
  const module = moduleId ? moduleData[moduleId as keyof typeof moduleData] : null;

  // Als de module niet bestaat, ga terug naar de modules pagina
  useEffect(() => {
    if (!module) {
      navigate('/modules');
    }
  }, [module, navigate]);

  // Effect om sectie voltooiing bij te houden
  useEffect(() => {
    if (!module) return;

    const currentSection = module.sections[activeSection];
    if (!currentSection) return;

    // Controleer quiz voltooiing als er quizzes zijn
    if (currentSection.quizzes) {
      const quizCompleted = currentSection.quizzes.every(
        q => selectedAnswers[q.question] === q.correctAnswer.toString()
      );
      if (quizCompleted) {
        const newSectionsCompleted = [...sectionsCompleted];
        newSectionsCompleted[activeSection] = true;
        setSectionsCompleted(newSectionsCompleted);
      }
    }
  }, [selectedAnswers, activeSection, module]);

  if (!module) {
    return null;
  }

  // Render de module content
  const renderContent = () => {
    const section = module.sections[activeSection];
    if (!section) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{section.title}</h3>
        
        {/* Theorie content */}
        {section.content && (
          <div className="prose max-w-none">
            {section.type === 'theory' && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                {section.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 mb-4">
                    {paragraph.split('\n').map((line, lineIdx) => (
                      <span key={lineIdx} className="block">{line}</span>
                    ))}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Visualisatie content */}
        {section.type === 'visualization' && section.content && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            {section.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-gray-600 mb-4">
                {paragraph.split('\n').map((line, lineIdx) => (
                  <span key={lineIdx} className="block">{line}</span>
                ))}
              </p>
            ))}
          </div>
        )}

        {/* Quiz vragen */}
        {section.quizzes && (
          <div className="mt-8">
            <h4 className="font-medium text-gray-900">Test je kennis</h4>
            {section.quizzes.map((quiz, index) => (
              <div key={index} className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                <p className="font-medium text-gray-900">{quiz.question}</p>
                <div className="mt-4 space-y-2">
                  {quiz.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => {
                        setSelectedAnswers(prev => ({
                          ...prev,
                          [quiz.question]: optionIndex.toString()
                        }));
                        setShowExplanation(true);
                      }}
                      className={`w-full text-left p-3 rounded-md ${
                        selectedAnswers[quiz.question] === optionIndex.toString()
                          ? optionIndex === quiz.correctAnswer
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showExplanation && selectedAnswers[quiz.question] && (
                  <div className="mt-4 p-4 rounded-md">
                    {parseInt(selectedAnswers[quiz.question]) === quiz.correctAnswer ? (
                      <div className="bg-blue-50 text-blue-800">
                        <p className="text-sm">{quiz.explanation}</p>
                      </div>
                    ) : (
                      <div className="bg-red-50 text-red-800">
                        <p className="text-sm">
                          {quiz.antwoordUitleg?.[parseInt(selectedAnswers[quiz.question])] || 
                          "Dit antwoord is niet correct. Probeer het opnieuw."}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Visualisatie sectie */}
        {section.type === 'visualization' && section.chartData && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">Interactieve Voorbeelden</h4>
            <p className="mt-2 text-gray-600">
              Bekijk hoe dezelfde data op verschillende manieren kan worden weergegeven:
            </p>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                {selectedChart === 'table' ? (
                  <>
                    <h5 className="font-medium text-gray-900 mb-2">Voorbeeld Dataset</h5>
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Opleiding</th>
                          <th className="text-right p-2">Aantal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.chartData?.labels.map((label: string, idx: number) => (
                          <tr key={idx}>
                            <td className="p-2">{label}</td>
                            <td className="text-right p-2">{section.chartData?.datasets[0].data[idx]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : selectedChart === 'bar' ? (
                  <Bar data={section.chartData} options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: 'Staafdiagram' }
                    }
                  }} />
                ) : selectedChart === 'stackedBar' ? (
                  <Bar
                    data={{
                      labels: section.chartData.labels,
                      datasets: [
                        {
                          label: 'WO',
                          data: [50, 30, 20],
                          backgroundColor: 'rgba(59, 130, 246, 0.5)',
                          borderColor: 'rgb(59, 130, 246)',
                          borderWidth: 1,
                        },
                        {
                          label: 'HBO',
                          data: [60, 40, 30],
                          backgroundColor: 'rgba(99, 102, 241, 0.5)',
                          borderColor: 'rgb(99, 102, 241)',
                          borderWidth: 1,
                        },
                        {
                          label: 'MBO',
                          data: [40, 50, 60],
                          backgroundColor: 'rgba(139, 92, 246, 0.5)',
                          borderColor: 'rgb(139, 92, 246)',
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Gestapeld Staafdiagram' },
                      },
                      scales: {
                        x: { stacked: true },
                        y: { stacked: true, beginAtZero: true },
                      },
                    }}
                  />
                ) : selectedChart === 'histogram' ? (
                  <Bar
                    data={{
                      labels: ['0-10', '10-20', '20-30', '30-40', '40-50'],
                      datasets: [
                        {
                          label: 'Aantal studenten',
                          data: [5, 15, 25, 10, 5],
                          backgroundColor: [
                            'rgba(59, 130, 246, 0.5)',
                            'rgba(99, 102, 241, 0.5)',
                            'rgba(139, 92, 246, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                          ],
                          borderColor: [
                            'rgb(59, 130, 246)',
                            'rgb(99, 102, 241)',
                            'rgb(139, 92, 246)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 159, 64)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Histogram' },
                      },
                      scales: {
                        x: {
                          title: { display: true, text: 'Waarden' },
                        },
                        y: {
                          title: { display: true, text: 'Frequentie' },
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                ) : selectedChart === 'boxplot' ? (
                  <div className="text-center">
                    <h5 className="font-medium text-gray-900 mb-2">Boxplot</h5>
                    <img
                      src="/images/boxplot.png" // Correct path for the boxplot image
                      alt="Boxplot Example"
                      className="mx-auto max-w-full h-auto"
                    />
                  </div>
                ) : selectedChart === 'scatter' ? (
                  <div className="text-center">
                    <h5 className="font-medium text-gray-900 mb-2">Spreidingsdiagram</h5>
                    <img
                      src="/images/spreidingsdiagram.png" // Correct path for the scatter plot image
                      alt="Spreidingsdiagram Example"
                      className="mx-auto max-w-full h-auto"
                    />
                  </div>
                ) : selectedChart === 'line' ? (
                  <div className="text-center">
                    <h5 className="font-medium text-gray-900 mb-2">Lijndiagram</h5>
                    <img
                      src="/images/lijndiagram.png" // Correct path for the line chart image
                      alt="Lijndiagram Example"
                      className="mx-auto max-w-full h-auto"
                    />
                  </div>
                ) : null}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Visualisatie Opties</h5>
                <div className="space-y-2">
                  <button 
                    className={`w-full btn ${selectedChart === 'bar' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('bar')}
                  >
                    Staafdiagram
                  </button>
                  <button 
                    className={`w-full btn ${selectedChart === 'pie' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('pie')}
                  >
                    Cirkeldiagram
                  </button>
                  <button 
                    className={`w-full btn ${selectedChart === 'stackedBar' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('stackedBar')}
                  >
                    Gestapeld Staafdiagram
                  </button>
                  <button 
                    className={`w-full btn ${selectedChart === 'histogram' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('histogram')}
                  >
                    Histogram
                  </button>
                  <button 
                    className={`w-full btn ${selectedChart === 'boxplot' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('boxplot')}
                  >
                    Boxplot
                  </button>
                  <button 
                    className={`w-full btn ${selectedChart === 'scatter' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('scatter')}
                  >
                    Spreidingsdiagram
                  </button>
                  <button 
                    className={`w-full btn ${selectedChart === 'line' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedChart('line')}
                  >
                    Lijndiagram
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Praktijkopdracht sectie */}
        {section.type === 'practical' && section.praktijkData && (
          <div className="space-y-6">
            {!praktijkStarted ? (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600">
                  In deze opdracht ga je werken met een echte dataset over studieresultaten.
                  Je gaat:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 list-disc list-inside">
                  <li>De hypothesen en p-waardes interpreteren</li>
                  <li>De juiste conclusies trekken</li>
                  <li>Leren omgaan met verschillende soorten toetsen</li>
                </ul>
                
                <div className="mt-6">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setPraktijkStarted(true)}
                  >
                    Start Opdracht
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {section.praktijkData?.map((data: PraktijkData, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900">Casus: {data.variabele}</h4>
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="text-gray-600">
                        {data.voorbeelden.map((voorbeeld, idx) => (
                          <span key={idx} className="block">{voorbeeld}</span>
                        ))}
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      {data.vraag && (
                        <label className="block text-sm font-medium text-gray-700">
                          {data.vraag}
                        </label>
                      )}
                      {data.opties && (
                        <div className="mt-2 space-y-2">
                          {data.opties.map((optie, optieIndex) => (
                            <button
                              key={optieIndex}
                              onClick={() => {
                                setPraktijkAnswers(prev => ({
                                  ...prev,
                                  [data.variabele]: optieIndex.toString()
                                }));
                                setShowFeedback(true);

                                // Check if all answers are correct
                                const allCorrect = section.praktijkData?.every(
                                  data => data.correctAntwoord !== undefined && 
                                  parseInt(praktijkAnswers[data.variabele] || '') === data.correctAntwoord
                                );
                                if (allCorrect) {
                                  const newSectionsCompleted = [...sectionsCompleted];
                                  newSectionsCompleted[activeSection] = true;
                                  setSectionsCompleted(newSectionsCompleted);
                                }
                              }}
                              className={`w-full text-left p-3 rounded-md ${
                                praktijkAnswers[data.variabele] === optieIndex.toString()
                                  ? optieIndex === data.correctAntwoord
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                            >
                              {optie}
                            </button>
                          ))}
                        </div>
                      )}

                      {showFeedback && praktijkAnswers[data.variabele] && data.correctAntwoord !== undefined && (
                        <div className={`mt-2 p-3 rounded-md ${
                          parseInt(praktijkAnswers[data.variabele]) === data.correctAntwoord
                            ? 'bg-green-50 text-green-800'
                            : 'bg-red-50 text-red-800'
                        }`}>
                          <p className="text-sm">
                            {parseInt(praktijkAnswers[data.variabele]) === data.correctAntwoord
                              ? "Correct! " + (data.uitleg || "")
                              : "Niet correct. Kijk nog eens goed naar de vorm van de hypothesen en wat deze betekenen."
                            }
                          </p>
                          
                          {/* Toon gedetailleerde uitleg voor elk antwoord */}
                          {data.antwoordUitleg && (
                            <div className="mt-4 space-y-2">
                              <p className="font-medium">Uitleg per antwoord:</p>
                              {data.antwoordUitleg.map((uitleg, index) => (
                                <div 
                                  key={index} 
                                  className={`p-2 rounded ${
                                    index === data.correctAntwoord 
                                      ? 'bg-green-100' 
                                      : 'bg-gray-100'
                                  }`}
                                >
                                  <p className="text-sm">
                                    <span className="font-medium">Optie {index + 1}:</span> {uitleg}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar met sectie navigatie */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {module.sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(index)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === index
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                } ${sectionsCompleted[index] ? 'text-green-600' : ''}`}
              >
                <span className="truncate">{section.title}</span>
                {sectionsCompleted[index] && (
                  <svg className="ml-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-900">Voortgang</h4>
            <div className="mt-2">
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                  <div
                    style={{ width: `${(sectionsCompleted.filter(Boolean).length / module.sections.length) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {sectionsCompleted.filter(Boolean).length} van de {module.sections.length} secties voltooid
              </p>
            </div>
          </div>
        </div>

        {/* Hoofdcontent */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              {renderContent()}
              
              {/* Navigatieknoppen */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => {
                    if (activeSection > 0) {
                      setActiveSection(activeSection - 1);
                      window.scrollTo(0, 0);
                    } else {
                      navigate('/modules');
                    }
                  }}
                  className="btn btn-secondary"
                >
                  {activeSection === 0 ? 'Terug naar Modules' : 'Vorige'}
                </button>
                {activeSection < module.sections.length - 1 ? (
                  <button
                    onClick={() => {
                      // Controleer of de huidige sectie "Diagrammen" is
                      const currentSection = module.sections[activeSection];
                      if (currentSection.type === 'visualization' || sectionsCompleted[activeSection]) {
                        setActiveSection(activeSection + 1);
                        window.scrollTo(0, 0);
                      }
                    }}
                    className={`btn ${
                      module.sections[activeSection].type === 'visualization' || sectionsCompleted[activeSection]
                        ? 'btn-primary'
                        : 'btn-secondary opacity-50 cursor-not-allowed'
                    }`}
                    disabled={module.sections[activeSection].type !== 'visualization' && !sectionsCompleted[activeSection]}
                  >
                    Volgende
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/modules')}
                    className={`btn ${
                      sectionsCompleted[activeSection] ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!sectionsCompleted[activeSection]}
                  >
                    Terug naar Modules
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
