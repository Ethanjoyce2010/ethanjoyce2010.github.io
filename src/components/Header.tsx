import { Github, Mail, Moon, Sun } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'

export function Header() {
  const navigate = useNavigate()
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
          <NavLink to="/projects" onClick={handleProjectsClick} className={({isActive}: {isActive: boolean}) => isActive ? 'text-gray-900 dark:text-white' : 'hover:text-gray-900 dark:hover:text-white'}>Projects</NavLink>
          <NavLink to="/skills" className={({isActive}: {isActive: boolean}) => isActive ? 'text-gray-900 dark:text-white' : 'hover:text-gray-900 dark:hover:text-white'}>Skills</NavLink>
          <NavLink to="/accomplishments" className={({isActive}: {isActive: boolean}) => isActive ? 'text-gray-900 dark:text-white' : 'hover:text-gray-900 dark:hover:text-white'}>Accomplishments</NavLink>
          <NavLink to="/about" className={({isActive}: {isActive: boolean}) => isActive ? 'text-gray-900 dark:text-white' : 'hover:text-gray-900 dark:hover:text-white'}>About</NavLink>
          <NavLink to="/contact" className={({isActive}: {isActive: boolean}) => isActive ? 'text-gray-900 dark:text-white' : 'hover:text-gray-900 dark:hover:text-white'}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={toggleTheme} className="rounded-md p-2 text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/5">
            {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <a aria-label="GitHub" className="rounded-md p-2 text-gray-700 hover:bg-black/5 dark:text-inherit dark:hover:bg-white/5" href="https://github.com/Ethanjoyce2010" target="_blank" rel="noreferrer">
            <Github className="size-5" />
          </a>
          <a aria-label="Email" className="rounded-md p-2 text-gray-700 hover:bg-black/5 dark:text-inherit dark:hover:bg-white/5" href="mailto:Ethan.sanders10@outlook.com">
            <Mail className="size-5" />
          </a>
        </div>
      </div>
    </header>
  )
}
