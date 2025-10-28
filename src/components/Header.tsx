import { Github, Mail } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-white/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="section flex h-14 items-center justify-between">
        <NavLink to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,.6)]" />
          Ethan Sanders
        </NavLink>
        <nav className="hidden gap-6 text-sm text-gray-300 md:flex">
          <NavLink to="/projects" className={({isActive}) => isActive ? 'text-white' : 'hover:text-white'}>Projects</NavLink>
          <NavLink to="/skills" className={({isActive}) => isActive ? 'text-white' : 'hover:text-white'}>Skills</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'text-white' : 'hover:text-white'}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'text-white' : 'hover:text-white'}>Contact</NavLink>
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
