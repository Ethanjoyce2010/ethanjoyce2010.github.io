import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { SeasonalBanner } from './components/SeasonalBanner'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { getCurrentSeason, applySeasonalTheme } from './lib/seasonal'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SnakePage from './pages/SnakePage'
import AccomplishmentsPage from './pages/AccomplishmentsPage'
import ErrorPage from './pages/ErrorPage'

export function App() {
  const location = useLocation()

  // Apply seasonal theme on mount
  useEffect(() => {
    getCurrentSeason().then(theme => {
      applySeasonalTheme(theme)
    })
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-background dark:text-gray-100">
      {/* background visuals */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_60rem_at_top_left,rgba(34,211,238,0.07),transparent_60%),radial-gradient(40rem_40rem_at_bottom_right,rgba(147,51,234,0.07),transparent_60%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-grid-fade bg-[size:24px_24px] animate-grid-pan" />
      </div>

      <SeasonalBanner />
      <Header />
      <main className="pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/accomplishments" element={<AccomplishmentsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Hidden easter egg route */}
              <Route path="/snake" element={<SnakePage />} />
              {/* Error routes */}
              <Route path="/error/:code" element={<ErrorPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
