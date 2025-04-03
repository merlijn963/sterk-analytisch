import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaGraduationCap, FaTrophy, FaLightbulb } from 'react-icons/fa';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="text-indigo-600 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ModulePreview: React.FC<{
  title: string;
  description: string;
  progress: number;
  isLocked?: boolean;
  moduleId: string;
}> = ({ title, description, progress, isLocked = false, moduleId }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">{progress}% voltooid</p>
        </div>
        {!isLocked && (
          <div className="mt-6">
            <Link
              to={`/modules/${moduleId}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Start Module
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const BadgePreview: React.FC<{
  title: string;
  imageUrl: string;
  isEarned: boolean;
}> = ({ title, imageUrl, isEarned }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
          <img src={imageUrl} alt={title} className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">{title}</h3>
        <p className="mt-2 text-sm text-gray-500 text-center">
          {isEarned ? 'Behaald' : 'Nog te behalen'}
        </p>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Maak statistiek</span>
          <span className="block text-indigo-600">begrijpelijk en leuk</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Leer statistiek op een interactieve en praktische manier. Van basisconcepten tot geavanceerde analyses, wij maken het begrijpelijk.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/modules"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Start met Leren
            </Link>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Waarom Statistisch Sterk?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FaChartLine />}
            title="Praktische Leermethode"
            description="Leer door te doen met interactieve oefeningen en real-world voorbeelden."
          />
          <FeatureCard
            icon={<FaGraduationCap />}
            title="Stapsgewijze Modules"
            description="Bouw je kennis op met zorgvuldig gestructureerde leermodules."
          />
          <FeatureCard
            icon={<FaLightbulb />}
            title="Duidelijke Uitleg"
            description="Complexe concepten worden begrijpelijk uitgelegd met duidelijke voorbeelden."
          />
          <FeatureCard
            icon={<FaTrophy />}
            title="Beloningen"
            description="Verdien badges en certificaten terwijl je vordert in je leerproces."
          />
        </div>
      </div>

      {/* Popular modules section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Populaire Modules</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModulePreview
            title="Output Interpreteren"
            description="Leer hoe je statistische output moet interpreteren, van normaliteitstests tot effectgroottes."
            progress={0}
            moduleId="6"
          />
          <ModulePreview
            title="Hypothesen & P-waarde"
            description="Begrijp hypothesetoetsing, éénzijdig vs tweezijdig toetsen, en de interpretatie van p-waardes."
            progress={0}
            moduleId="hypothesis"
          />
          <ModulePreview
            title="Validiteit & Betrouwbaarheid"
            description="Leer over interne en externe validiteit, Cronbach's alpha en steekproefgrootte."
            progress={0}
            isLocked={true}
            moduleId="validity"
          />
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/modules"
            className="text-base font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Bekijk alle modules <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Recent badges section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Recent Behaalde Badges</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BadgePreview
            title="Data Visualisatie Expert"
            imageUrl="/badges/visualization.svg"
            isEarned={false}
          />
          <BadgePreview
            title="Hypothese Master"
            imageUrl="/badges/hypothesis.svg"
            isEarned={false}
          />
          <BadgePreview
            title="Validiteit Specialist"
            imageUrl="/badges/validity.svg"
            isEarned={false}
          />
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/badges"
            className="text-base font-medium text-indigo-600 hover:text-indigo-500"
          >
            Bekijk alle badges <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 