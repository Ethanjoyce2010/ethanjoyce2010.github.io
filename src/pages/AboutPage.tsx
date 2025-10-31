import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, GraduationCap, Mail, Wrench, Gamepad2, Cpu, Lightbulb, Terminal, Copy } from 'lucide-react'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/10 bg-black/[.04] px-3 py-1 text-xs text-gray-700 dark:border-white/15 dark:bg-white/5 dark:text-gray-300">
      {children}
    </span>
  )
}

export default function AboutPage() {
  const email = 'ethan.sanders10@outlook.com'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // no-op: clipboard may be unavailable
    }
  }

  return (
    <section className="section py-14 md:py-20">
      <div className="mb-8">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Friendly, tech‑savvy, and always curious</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-glass col-span-1 rounded-2xl p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
            <Terminal size={18} className="opacity-70" />
            <h3 className="text-base font-semibold">Snapshot</h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            I’m Ethan Sanders (aka <strong>Ethanjoyce2010</strong>) — a friendly, tech‑savvy
            problem‑solver who enjoys building practical tools and helping people with
            technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="card-glass col-span-1 rounded-2xl p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
            <Lightbulb size={18} className="opacity-70" />
            <h3 className="text-base font-semibold">Personal attributes</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Approachable',
              'Friendly',
              'Confident',
              'Reliable',
              'Eager to learn',
              'Kind',
              'Patient',
              'Dry sense of humour',
            ].map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-glass col-span-1 rounded-2xl p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
            <Cpu size={18} className="opacity-70" />
            <h3 className="text-base font-semibold">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Problem‑solving',
              'Critical thinking',
              'Tech savvy',
              'Effective communicator (all abilities)',
            ].map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_0.6fr]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="card-glass rounded-2xl p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
            <Wrench size={18} className="opacity-70" />
            <h3 className="text-base font-semibold">Experience</h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Throughout my schooling I’ve provided tech support to staff and students. In my
            personal life I help friends and family troubleshoot and resolve IT issues
            whenever possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="card-glass rounded-2xl p-6"
        >
          <div className="mb-3 flex items-center justify-between text-gray-900 dark:text-white/90">
            <div className="flex items-center gap-2">
              <Mail size={18} className="opacity-70" />
              <h3 className="text-base font-semibold">Email</h3>
            </div>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1 rounded-md border border-black/10 px-2 py-1 text-xs text-gray-700 transition hover:bg-black/5 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5"
              title="Copy email"
            >
              <Copy size={14} /> Copy
            </button>
          </div>
          <a
            href={`mailto:${email}`}
            className="break-all text-sm font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400"
          >
            {email}
          </a>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="card-glass rounded-2xl p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
            <GraduationCap size={18} className="opacity-70" />
            <h3 className="text-base font-semibold">Education</h3>
          </div>
          <ul className="ml-4 list-disc text-sm text-gray-700 dark:text-gray-300">
            <li>Curtin University Cyber Security Program</li>
            <li>More available upon request</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="card-glass rounded-2xl p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
            <Award size={18} className="opacity-70" />
            <h3 className="text-base font-semibold">Commendations & opportunities</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <div className="font-medium">2024</div>
              <p>
                Selected among the highest performers in Digital Technologies at my school;
                invited to attend West Tech Fest in Perth.
              </p>
            </div>
            <div className="pt-2 text-xs text-gray-600 dark:text-gray-400">
              Find more at{' '}
              <Link 
                to="/accomplishments"
                className="font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400"
              >
                Accomplishments
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-6 card-glass rounded-2xl p-6"
      >
        <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
          <Gamepad2 size={18} className="opacity-70" />
          <h3 className="text-base font-semibold">Interests & hobbies</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            'Anything Tech DIY',
            'Electronic components',
            'Research',
            'Virtual reality',
            'How things work',
            'Arduino',
            'Retro games',
            'Robotics',
            'Machines',
            'Tools',
            'Coding',
            'Innovation',
            'E‑waste',
            'Custom PC building',
            'Physics',
          ].map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-6 card-glass rounded-2xl p-6"
      >
        <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
          <Wrench size={18} className="opacity-70" />
          <h3 className="text-base font-semibold">Extra‑curricular</h3>
        </div>
        <ul className="ml-4 list-disc text-sm text-gray-700 dark:text-gray-300">
          <li>Mobile and electronic repairs</li>
          <li>Gaming</li>
        </ul>
      </motion.div>
    </section>
  )
}
