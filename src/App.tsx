import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Footer } from './components/Footer'

export function App() {
  return (
    <div className="min-h-screen bg-background text-gray-100">
      {/* background visuals */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_60rem_at_top_left,rgba(34,211,238,0.07),transparent_60%),radial-gradient(40rem_40rem_at_bottom_right,rgba(147,51,234,0.07),transparent_60%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-grid-fade bg-[size:24px_24px]" />
      </div>

      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  )
}
