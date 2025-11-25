import { motion } from 'framer-motion'
import { WeatherBlurb } from './WeatherBlurb'

export function Hero() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  return (
    <section id="top" className="section relative py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold leading-tight text-gray-900 dark:text-white/95 md:text-5xl"
          >
            <span className="block text-base font-normal text-gray-600 dark:text-gray-400">{greeting} — I’m</span>
            Ethan Sanders
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="max-w-2xl text-balance text-base text-gray-700 dark:text-gray-300 md:text-lg"
          >
            Passionate about coding, problem solving, and open source. Exploring web
            development, automation, and tooling. I love building small utilities and
            creative side‑projects.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="typewriter text-sm text-gray-600 dark:text-gray-400"
            style={{ ['--tw-ch' as any]: 40, ['--tw-steps' as any]: 40 }}
          >
            Building things I wish already existed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="seasonal-hover rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-medium text-gray-900 shadow-glow transition hover:bg-cyan-400"
              style={{ 
                backgroundColor: 'var(--seasonal-primary)',
                color: '#fff'
              }}
            >
              See projects
            </a>
            <a
              href="https://github.com/Ethanjoyce2010"
              target="_blank"
              rel="noreferrer"
              className="seasonal-hover rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-black/5 dark:border-white/15 dark:text-white/90 dark:hover:bg-white/5"
            >
              Visit GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <WeatherBlurb />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="card-glass relative overflow-hidden rounded-2xl p-6 md:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-fuchsia-500/10" />
          <ul className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
            <li className="rounded-lg bg-black/[.04] p-3 dark:bg-white/5">
              <span className="text-xs text-gray-400">Languages</span>
              <div className="mt-1 font-medium">Python, JavaScript</div>
            </li>
            <li className="rounded-lg bg-black/[.04] p-3 dark:bg-white/5">
              <span className="text-xs text-gray-400">Frameworks</span>
              <div className="mt-1 font-medium">Node.js, Userscripts</div>
            </li>
            <li className="rounded-lg bg-black/[.04] p-3 dark:bg-white/5">
              <span className="text-xs text-gray-400">Practices</span>
              <div className="mt-1 font-medium">Git/GitHub, Testing</div>
            </li>
            <li className="rounded-lg bg-black/[.04] p-3 dark:bg-white/5">
              <span className="text-xs text-gray-400">Interests</span>
              <div className="mt-1 font-medium">Automation, CLI, Web</div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
