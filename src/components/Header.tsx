import { Github, Mail } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export function Header() {
  const navigate = useNavigate()
  // Easter egg: click "Projects" 5 times quickly to unlock Snake
  const clickCountRef = useRef(0)
  const lastClickRef = useRef(0)
  const resetTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
    }
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
    <header className="sticky top-0 z-20 w-full border-b border-white/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="section flex h-14 items-center justify-between">
        <NavLink to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,.6)]" />
          Ethan Sanders
        </NavLink>
        <nav className="hidden gap-6 text-sm text-gray-300 md:flex">
          <NavLink to="/projects" onClick={handleProjectsClick} className={({isActive}: {isActive: boolean}) => isActive ? 'text-white' : 'hover:text-white'}>Projects</NavLink>
          <NavLink to="/skills" className={({isActive}: {isActive: boolean}) => isActive ? 'text-white' : 'hover:text-white'}>Skills</NavLink>
          <NavLink to="/about" className={({isActive}: {isActive: boolean}) => isActive ? 'text-white' : 'hover:text-white'}>About</NavLink>
          <NavLink to="/contact" className={({isActive}: {isActive: boolean}) => isActive ? 'text-white' : 'hover:text-white'}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <a aria-label="GitHub" className="rounded-md p-2 hover:bg-white/5" href="https://github.com/Ethanjoyce2010" target="_blank" rel="noreferrer">
            <Github className="size-5" />
          </a>
          <a aria-label="Email" className="rounded-md p-2 hover:bg-white/5" href="mailto:Ethan.sanders10@outlook.com">
            <Mail className="size-5" />
          </a>
        </div>
      </div>
    </header>
  )
}
