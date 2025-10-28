import { Github, Mail } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-white/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="section flex h-14 items-center justify-between">
        <a href="#top" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,.6)]" />
          Ethan Sanders
        </a>
        <nav className="hidden gap-6 text-sm text-gray-300 md:flex">
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#skills" className="hover:text-white">Skills</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
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
