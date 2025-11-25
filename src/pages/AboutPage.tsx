import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, GraduationCap, Mail, Wrench, Gamepad2, Cpu, Lightbulb, Terminal, Copy, Briefcase } from 'lucide-react'
import HireModal from '../components/HireModal'
import { FadeIn } from '../components/FadeIn'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/10 bg-black/[.04] px-3 py-1 text-xs text-gray-700 dark:border-white/15 dark:bg-white/5 dark:text-gray-300">
      {children}
    </span>
  )
}

export default function AboutPage() {
  const email = 'ethan.sanders10@outlook.com'
  const [isHireModalOpen, setIsHireModalOpen] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // no-op: clipboard may be unavailable
    }
  }

  return (
    <section className="section py-14 md:py-20">
      <FadeIn>
        <div className="mb-8">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Friendly, tech‑savvy, and always curious</p>
        </div>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-3">
        <FadeIn delay={0.1} className="col-span-1">
          <div className="card-glass h-full rounded-2xl p-6">
            <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
              <Terminal size={18} className="opacity-70" />
              <h3 className="text-base font-semibold">Snapshot</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              I’m Ethan Sanders (aka <strong>Ethanjoyce2010</strong>) — a friendly, tech‑savvy
              problem‑solver who enjoys building practical tools and helping people with
              technology.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="col-span-1">
          <div className="card-glass h-full rounded-2xl p-6">
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
                'Humourous',
              ].map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="col-span-1">
          <div className="card-glass h-full rounded-2xl p-6">
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
          </div>
        </FadeIn>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_0.6fr]">
        <FadeIn delay={0.1}>
          <div className="card-glass rounded-2xl p-6">
            <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
              <Wrench size={18} className="opacity-70" />
              <h3 className="text-base font-semibold">Experience</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Throughout my schooling I’ve provided tech support to staff and students. In my
              personal life I help friends and family troubleshoot and resolve IT issues
              whenever possible.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="card-glass rounded-2xl p-6">
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
          </div>
        </FadeIn>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <FadeIn delay={0.1}>
          <div className="card-glass rounded-2xl p-6">
            <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
              <GraduationCap size={18} className="opacity-70" />
              <h3 className="text-base font-semibold">Education</h3>
            </div>
            <ul className="ml-4 list-disc text-sm text-gray-700 dark:text-gray-300">
              <li>Curtin University Cyber Security Program</li>
              <li>More available upon request</li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="card-glass rounded-2xl p-6">
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
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <div className="mt-6 card-glass rounded-2xl p-6">
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
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-6 card-glass rounded-2xl p-6">
          <div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white/90">
            <Wrench size={18} className="opacity-70" />
            <h3 className="text-base font-semibold">Extra‑curricular</h3>
          </div>
          <ul className="ml-4 list-disc text-sm text-gray-700 dark:text-gray-300">
            <li>Mobile and electronic repairs</li>
            <li>Gaming</li>
          </ul>
        </div>
      </FadeIn>

      {/* Hire Button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-8 flex justify-center"
      >
        <button
          onClick={() => setIsHireModalOpen(true)}
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:shadow-xl hover:scale-105 dark:from-cyan-500 dark:to-blue-500"
        >
          <Briefcase size={20} className="transition group-hover:rotate-12" />
          Looking to hire someone with my skills?
        </button>
      </motion.div>

      {/* Hire Modal */}
      <HireModal isOpen={isHireModalOpen} onClose={() => setIsHireModalOpen(false)} />
    </section>
  )
}
