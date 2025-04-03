import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaChartBar, FaQuestionCircle } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Module 6: Output Interpreteren</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Over deze module</h2>
        <p className="mb-4">
          In deze module leer je hoe je de output van statistische analyses moet interpreteren. 
          Je leert over normaliteitstests, homogeniteitstests, t-tests, Mann-Whitney U tests, 
          en hoe je effectgroottes zoals Cohen's d en r moet interpreteren.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="uitleg" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaBook className="text-blue-600 mr-2" />
              <h2 className="text-xl font-bold">Uitleg</h2>
            </div>
            <p>
              Leer over de verschillende statistische tests en hoe je hun output moet interpreteren.
              Ontdek wat p-waarden betekenen en hoe je effectgroottes moet beoordelen.
            </p>
          </div>
        </Link>

        <Link to="quiz" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaQuestionCircle className="text-blue-600 mr-2" />
              <h2 className="text-xl font-bold">Quiz</h2>
            </div>
            <p>
              Test je kennis over het interpreteren van statistische output. 
              Beantwoord vragen over normaliteitstests, homogeniteitstests, 
              t-tests, Mann-Whitney U tests en effectgroottes.
            </p>
          </div>
        </Link>

        <Link to="oefenen" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaChartBar className="text-blue-600 mr-2" />
              <h2 className="text-xl font-bold">Oefenen</h2>
            </div>
            <p>
              Oefen met het interpreteren van echte statistische output. 
              Krijg direct feedback op je interpretaties en leer van je fouten.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home; 