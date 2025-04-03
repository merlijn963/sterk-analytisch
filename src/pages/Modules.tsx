import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Module {
  id: string;
  title: string;
  description: string;
  isLocked?: boolean;
  progress?: number;
  path?: string;
}

const modules: Module[] = [
  {
    id: 'descriptive',
    title: 'Meetniveaus & Diagrammen',
    description: 'Leer de verschillende meetniveaus en welke diagrammen je kunt gebruiken voor data-analyse.',
    isLocked: false
  },
  {
    id: 'hypothesis',
    title: 'Hypothesen & P-waarde',
    description: 'Begrijp hypothesetoetsing, éénzijdig vs tweezijdig toetsen, en de interpretatie van p-waardes.',
    isLocked: false
  },
  {
    id: 'validity',
    title: 'Validiteit & Betrouwbaarheid',
    description: "Leer over validiteit, betrouwbaarheid en Cronbach's Alpha.",
    path: '/module3',
    progress: 0
  },
  {
    id: 'sampling',
    title: 'Steekproeven & Steekproeftechnieken',
    description: 'Ontdek verschillende steekproefmethoden en wanneer je welke techniek gebruikt.',
    path: '/module4',
    progress: 0
  },
  {
    id: 'tests',
    title: 'Statistische Toetsen & Toetskeuze',
    description: 'Leer welke statistische toets je wanneer gebruikt en hoe je de resultaten interpreteert.',
    path: '/module5/intro',
    progress: 0
  },
  {
    id: 'output',
    title: 'Output Interpreteren',
    description: 'Leer hoe je de output van statistische software interpreteert en de juiste conclusies trekt.',
    path: '/module6/intro',
    progress: 0
  }
];

const Modules: React.FC = () => {
  const [modulesWithProgress, setModulesWithProgress] = useState<Module[]>(modules);

  useEffect(() => {
    // Load progress from localStorage for each module
    const updatedModules = modules.map(module => {
      const savedProgress = localStorage.getItem(`module_${module.id}_progress`);
      return {
        ...module,
        progress: savedProgress ? parseInt(savedProgress) : 0
      };
    });
    setModulesWithProgress(updatedModules);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Modules</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modulesWithProgress.map((module) => (
          <div
            key={module.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{module.description}</p>
              {module.progress !== undefined && (
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${module.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{module.progress}% voltooid</p>
                </div>
              )}
              <div className="mt-6">
                <Link
                  to={module.path || `/modules/${module.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Module
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modules; 