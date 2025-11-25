import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { SeasonalBanner } from './components/SeasonalBanner'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { getCurrentSeason, applySeasonalTheme } from './lib/seasonal'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SnakePage from './pages/SnakePage'
import AccomplishmentsPage from './pages/AccomplishmentsPage'
import ErrorPage from './pages/ErrorPage'
import { ScrollBouncer } from './components/ScrollBouncer'

const PAGE_ORDER = ['/', '/projects', '/skills', '/accomplishments', '/about', '/contact']

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    filter: 'blur(5px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    filter: 'blur(5px)',
  }),
}

export function App() {
  const location = useLocation()
  const prevPath = useRef(location.pathname)

  // Calculate direction
  const currIndex = PAGE_ORDER.indexOf(location.pathname)
  const prevIndex = PAGE_ORDER.indexOf(prevPath.current)

  // Default to forward (1) if paths are not found or same
  let direction = 0
  if (currIndex !== -1 && prevIndex !== -1 && currIndex !== prevIndex) {
    direction = currIndex > prevIndex ? 1 : -1
  }

  useEffect(() => {
    prevPath.current = location.pathname
  }, [location.pathname])

  // Apply seasonal theme on mount
  useEffect(() => {
    getCurrentSeason().then(theme => {
      applySeasonalTheme(theme)
    })
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-background dark:text-gray-100">
      {/* background visuals */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[50rem] w-[50rem] animate-blob rounded-full bg-cyan-400/10 mix-blend-multiply blur-3xl filter dark:bg-cyan-500/10 dark:mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] h-[50rem] w-[50rem] animate-blob rounded-full bg-purple-400/10 mix-blend-multiply blur-3xl filter dark:bg-purple-500/10 dark:mix-blend-screen" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-[20%] left-[20%] h-[50rem] w-[50rem] animate-blob rounded-full bg-blue-400/10 mix-blend-multiply blur-3xl filter dark:bg-blue-500/10 dark:mix-blend-screen" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-grid-fade bg-[size:24px_24px] animate-grid-pan" />
      </div>

      <ScrollBouncer>
        <SeasonalBanner />
        <Header />
        <main className="pb-10 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={location.pathname}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
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
      </ScrollBouncer>
    </div>
  )
}
