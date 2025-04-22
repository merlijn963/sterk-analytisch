const module1Data = {
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
          explanation: "Temperatuur in Celsius is een interval meetniveau omdat het verschil tussen waarden betekenisvol is, maar er geen absoluut nulpunt is (0°C is niet de afwezigheid van temperatuur)."
        },
        {
          question: "Welk diagram is het meest geschikt voor nominale data?",
          options: ["Spreidingsdiagram", "Staafdiagram", "Lijndiagram", "Boxplot"],
          correctAnswer: 1,
          explanation: "Een staafdiagram is het meest geschikt voor nominale data omdat het frequenties of aantallen per categorie duidelijk weergeeft."
        }
      ]
    },
    {
      id: 2,
      title: "Diagrammen",
      type: 'visualization',
      content: `
        Het kiezen van het juiste diagram hangt af van je meetniveau en wat je wilt laten zien:
        
        Nominaal & Ordinaal:
        • Staafdiagram - voor frequenties per categorie
        • Cirkeldiagram - voor verhoudingen tussen categorieën
        • Gestapeld staafdiagram - voor meerdere categorische variabelen
        
        Interval & Ratio:
        • Histogram - voor continue variabelen
        • Boxplot - voor spreiding en uitbijters
        • Spreidingsdiagram - voor correlaties
        • Lijndiagram - voor trends over tijd
      `,
      chartData: {
        labels: ['HBO', 'WO', 'MBO'],
        datasets: [{
          label: 'Aantal studenten',
          data: [150, 100, 200],
          backgroundColor: [
            'rgba(59, 130, 246, 0.5)',
            'rgba(99, 102, 241, 0.5)',
            'rgba(139, 92, 246, 0.5)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(99, 102, 241)',
            'rgb(139, 92, 246)',
          ],
          borderWidth: 1
        }]
      }
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
          voorbeelden: ["18", "19", "21", "25", "30"]
        },
        {
          variabele: "Studierichting",
          meetniveau: "nominaal",
          voorbeelden: ["Psychologie", "Economie", "Informatica"]
        },
        {
          variabele: "Tevredenheid",
          meetniveau: "ordinaal",
          voorbeelden: ["Zeer ontevreden", "Ontevreden", "Neutraal", "Tevreden", "Zeer tevreden"]
        },
        {
          variabele: "Temperatuur klaslokaal",
          meetniveau: "interval",
          voorbeelden: ["18°C", "20°C", "22°C", "24°C"]
        }
      ]
    }
  ]
};

export default module1Data;
