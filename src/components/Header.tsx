import { Github, Mail, Moon, Sun, Menu, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function Header() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )
  // Easter egg: click "Projects" 5 times quickly to unlock Snake
  const clickCountRef = useRef(0)
  const lastClickRef = useRef(0)
  const resetTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
    }
  }, [])

  // Sync theme to document and localStorage
  useEffect(() => {
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    try {
      localStorage.setItem('theme', theme)
    } catch {}
    try {
      const m = document.querySelector('meta[name="theme-color"]')
      if (m) m.setAttribute('content', isDark ? '#0b0f19' : '#ffffff')
    } catch {}
  }, [theme])

  // Follow system preference when no explicit choice
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const onChange = () => {
      if (!stored) setTheme(media.matches ? 'dark' : 'light')
    }
    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const handleProjectsClick = (e: any) => {
    const now = Date.now()
    // Reset if too slow between clicks (>1500ms)
    if (now - lastClickRef.current > 1500) {
      clickCountRef.current = 0
    }
    lastClickRef.current = now
    clickCountRef.current += 1

    // Auto reset after 2s of inactivity
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
    resetTimerRef.current = window.setTimeout(() => {
      clickCountRef.current = 0
    }, 2000)

    if (clickCountRef.current >= 5) {
      e.preventDefault()
      clickCountRef.current = 0
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
      navigate('/snake')
    }
  }

  return (
    <header className="sticky top-0 z-20 w-full border-b border-black/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-background/60 dark:supports-[backdrop-filter]:bg-background/50">
      <div className="section flex h-14 items-center justify-between">
        <NavLink to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white/90">
          <img
            src="https://github.com/Ethanjoyce2010.png?size=80"
            alt="Ethan Sanders avatar"
            className="h-7 w-7 rounded-full border border-black/10 object-cover dark:border-white/10"
            loading="eager"
            decoding="async"
          />
          Ethan Sanders
        </NavLink>
        <nav className="hidden gap-6 text-sm text-gray-600 dark:text-gray-300 md:flex">
          {['Projects', 'Skills', 'Accomplishments', 'About', 'Contact'].map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={item === 'Projects' ? handleProjectsClick : undefined}
              className={({ isActive }) =>
                `relative px-1 py-1 transition-colors ${
                  isActive
                    ? 'text-gray-900 dark:text-white'
                    : 'hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[1px] left-0 right-0 h-[3px] rounded-full bg-cyan-500 dark:bg-cyan-400"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={toggleTheme} className="rounded-full p-2 text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/5">
            {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <a aria-label="GitHub" className="rounded-full p-2 text-gray-700 hover:bg-black/5 dark:text-inherit dark:hover:bg-white/5" href="https://github.com/Ethanjoyce2010" target="_blank" rel="noreferrer">
            <Github className="size-5" />
          </a>
          <a aria-label="Email" className="rounded-full p-2 text-gray-700 hover:bg-black/5 dark:text-inherit dark:hover:bg-white/5" href="mailto:Ethan.sanders10@outlook.com">
            <Mail className="size-5" />
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full p-2 text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/5 md:hidden"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-black/10 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-background/95 md:hidden"
        >
          <nav className="flex flex-col p-4">
            {['Projects', 'Skills', 'Accomplishments', 'About', 'Contact'].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                onClick={(e) => {
                  setIsMenuOpen(false)
                  if (item === 'Projects') handleProjectsClick(e)
                }}
                className={({ isActive }) =>
                  `py-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  )
}
