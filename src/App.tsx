import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Modules from './pages/Modules'
import ModuleDetail from './pages/ModuleDetail'
import Badges from './pages/Badges'
import Module3Intro from './pages/modules/Module3/Intro'
import Module3Uitleg from './pages/modules/Module3/Uitleg'
import Module3Interactie from './pages/modules/Module3/Interactie'
import Module3Quiz from './pages/modules/Module3/Quiz'
import Module4Intro from './pages/modules/Module4/Intro'
import Module4Uitleg from './pages/modules/Module4/Uitleg'
import Module4Interactie from './pages/modules/Module4/Interactie'
import Module4Quiz from './pages/modules/Module4/Quiz'
import Module5Intro from './pages/modules/Module5/Intro'
import Module5Uitleg from './pages/modules/Module5/Uitleg'
import Module5Interactie from './pages/modules/Module5/Interactie'
import Module5Quiz from './pages/modules/Module5/Quiz'
import Module6Intro from './pages/modules/Module6/Intro'
import Module6Uitleg from './pages/modules/Module6/Uitleg'
import Module6Interactie from './pages/modules/Module6/Interactie'
import Module6Quiz from './pages/modules/Module6/Quiz'

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/modules/:moduleId" element={<ModuleDetail />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/module3" element={<Module3Intro />} />
            <Route path="/module3/uitleg" element={<Module3Uitleg />} />
            <Route path="/module3/interactie" element={<Module3Interactie />} />
            <Route path="/module3/quiz" element={<Module3Quiz />} />
            <Route path="/module4" element={<Module4Intro />} />
            <Route path="/module4/uitleg" element={<Module4Uitleg />} />
            <Route path="/module4/interactie" element={<Module4Interactie />} />
            <Route path="/module4/quiz" element={<Module4Quiz />} />
            <Route path="/module5/intro" element={<Module5Intro />} />
            <Route path="/module5/uitleg" element={<Module5Uitleg />} />
            <Route path="/module5/interactie" element={<Module5Interactie />} />
            <Route path="/module5/quiz" element={<Module5Quiz />} />
            <Route path="/module6/intro" element={<Module6Intro />} />
            <Route path="/module6/uitleg" element={<Module6Uitleg />} />
            <Route path="/module6/interactie" element={<Module6Interactie />} />
            <Route path="/module6/quiz" element={<Module6Quiz />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 