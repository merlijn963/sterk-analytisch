import React from 'react';

interface Badge {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isEarned: boolean;
  earnedDate?: string;
  requirements: string[];
}

const badges: Badge[] = [
  {
    id: 1,
    title: "Meetniveaus & Diagrammen Expert",
    description: "Behaald door het voltooien van de module Meetniveaus & Diagrammen",
    imageUrl: "/badges/descriptive.svg",
    isEarned: true,
    earnedDate: "2024-03-15",
    requirements: [
      "Voltooi alle lessen in de module",
      "Score van minimaal 80% op de eindtoets",
      "Maak alle praktijkopdrachten af"
    ]
  },
  {
    id: 2,
    title: "Hypothesen & P-waarde Master",
    description: "Verdien deze badge door de Hypothesen & P-waarde module af te ronden",
    imageUrl: "/badges/probability.svg",
    isEarned: false,
    requirements: [
      "Voltooi alle lessen in de module",
      "Score van minimaal 80% op de eindtoets",
      "Los alle praktijkproblemen op"
    ]
  },
  {
    id: 3,
    title: "Validiteit & Betrouwbaarheid Pro",
    description: "Voor het beheersen van validiteit en betrouwbaarheid concepten",
    imageUrl: "/badges/hypothesis.svg",
    isEarned: false,
    requirements: [
      "Voltooi de module Validiteit & Betrouwbaarheid",
      "Voer 5 succesvolle betrouwbaarheidsanalyses uit",
      "Help een medestudent met een analyse"
    ]
  },
  {
    id: 4,
    title: "T-toetsen Talent",
    description: "Toon je expertise in het uitvoeren van t-toetsen",
    imageUrl: "/badges/correlation.svg",
    isEarned: false,
    requirements: [
      "Rond de T-toetsen module af",
      "Voer 3 verschillende t-toetsen uit",
      "Interpreteer resultaten correct"
    ]
  },
  {
    id: 5,
    title: "ANOVA & Post-hoc Ace",
    description: "Voor het meesterschap in variantieanalyse",
    imageUrl: "/badges/anova.svg",
    isEarned: false,
    requirements: [
      "Voltooi de ANOVA & Post-hoc module",
      "Voer een complete ANOVA analyse uit",
      "Begrijp en pas post-hoc testen toe"
    ]
  },
  {
    id: 6,
    title: "Chi-kwadraat & Fisher Fanaat",
    description: "Bewijs je vaardigheid in categorische analyses",
    imageUrl: "/badges/chi-square.svg",
    isEarned: false,
    requirements: [
      "Rond de Chi-kwadraat & Fisher module af",
      "Voer beide type toetsen correct uit",
      "Analyseer complexe kruistabellen"
    ]
  }
];

const BadgeCard: React.FC<Badge> = ({ title, description, imageUrl, isEarned, earnedDate, requirements }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${!isEarned ? 'opacity-75 grayscale' : ''}`}>
      <div className="flex items-center space-x-4 mb-4">
        <img src={imageUrl} alt={title} className="w-16 h-16" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-gray-900 mb-2">Vereisten:</h4>
        <ul className="list-disc list-inside space-y-1">
          {requirements.map((req, index) => (
            <li key={index} className="text-gray-600 text-sm">
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        {isEarned ? (
          <div className="flex items-center text-green-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">
              Behaald op {new Date(earnedDate!).toLocaleDateString('nl-NL')}
            </span>
          </div>
        ) : (
          <div className="flex items-center text-gray-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm font-medium">Nog niet behaald</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Badges: React.FC = () => {
  const earnedCount = badges.filter(badge => badge.isEarned).length;
  const totalCount = badges.length;
  const progressPercentage = (earnedCount / totalCount) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Badges</h1>
        <p className="mt-2 text-gray-600">
          Verzamel badges door modules te voltooien en je statistiek vaardigheden te bewijzen.
        </p>
        
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Totale voortgang</span>
            <span className="text-sm font-medium text-gray-700">{earnedCount} van {totalCount} badges</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 rounded-full h-2 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default Badges; 