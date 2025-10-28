export function Footer() {
  return (
    <footer id="contact" className="section mt-10 border-t border-white/10 py-10 text-sm text-gray-400">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          © {new Date().getFullYear()} Ethan Sanders. Built with React & Vite.
        </div>
        <div className="flex items-center gap-4">
          <a className="hover:text-white" href="mailto:Ethan.sanders10@outlook.com">Email</a>
          <a className="hover:text-white" href="https://github.com/Ethanjoyce2010" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
