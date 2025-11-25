import { FadeIn } from './FadeIn'

export function Skills() {
  return (
    <section id="skills" className="section py-14 md:py-20">
      <FadeIn>
        <div className="mb-6">
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-subtitle">Things I enjoy and am exploring</p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FadeIn delay={0.1}>
          <div className="card-glass rounded-2xl p-5">
            <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
            <div className="mt-2 font-medium text-gray-900 dark:text-white/90">Python, JavaScript</div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="card-glass rounded-2xl p-5">
            <div className="text-sm text-gray-600 dark:text-gray-400">Tools & Frameworks</div>
            <div className="mt-2 font-medium text-gray-900 dark:text-white/90">Node.js, userscripts, GUI frameworks</div>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="card-glass rounded-2xl p-5">
            <div className="text-sm text-gray-600 dark:text-gray-400">Practices</div>
            <div className="mt-2 font-medium text-gray-900 dark:text-white/90">Git/GitHub, testing, refactoring</div>
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="card-glass rounded-2xl p-5">
            <div className="text-sm text-gray-600 dark:text-gray-400">Interests</div>
            <div className="mt-2 font-medium text-gray-900 dark:text-white/90">Automation, utility scripts, CLI tools</div>
          </div>
        </FadeIn>
        <FadeIn delay={0.5}>
          <div className="card-glass rounded-2xl p-5">
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Focus</div>
            <div className="mt-2 font-medium text-gray-900 dark:text-white/90">Web dev, frontend tooling</div>
          </div>
        </FadeIn>
        <FadeIn delay={0.6}>
          <div className="card-glass rounded-2xl p-5">
            <div className="text-sm text-gray-600 dark:text-gray-400">Goals</div>
            <div className="mt-2 font-medium text-gray-900 dark:text-white/90">Open source, collaboration, backend</div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.7}>
        <div id="about" className="mt-10 rounded-2xl border border-black/10 bg-black/[.035] p-5 text-sm text-gray-700 dark:border-white/10 dark:bg-white/[.035] dark:text-gray-300">
          <p>
            I’m always excited to learn new languages, frameworks, and tools. I enjoy building
            small utilities, scripts, and creative side‑projects.
          </p>
        </div>
      </FadeIn>
    </section>
  )
}
