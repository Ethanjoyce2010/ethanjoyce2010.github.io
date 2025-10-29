import { Accomplishment, AccomplishmentCard } from '../components/AccomplishmentCard'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'

const accomplishments: Accomplishment[] = [
  {
    id: 'wa-young-innovator',
    title: 'WA Young Innovator of the Year — Nomination',
    date: '2025',
    issuer: 'Western Australia',
    summary:
      'Recognized for building a classroom‑friendly study assistant that supports clear learning and saves teacher time.',
    tags: ['Education', 'AI', 'Streamlit', 'Gemini', 'Safety'],
  },
  {
    id: 'coderdojo-curtin-attendee',
    title: 'CoderDojo (Curtin University) — Ex Attendee',
    issuer: 'CoderDojo / Curtin University',
    summary:
      'Participated in CoderDojo sessions to build coding skills, collaborate with peers, and explore projects in a supportive community.',
    tags: ['Community', 'Coding Club', 'STEM'],
    link: 'https://codeclub.org/en/coderdojo-community',
  },
  // Add more accomplishments here as my journey grows
]

export default function AccomplishmentsPage() {
  const [activeId, setActiveId] = useState<string>(accomplishments[0]?.id ?? 'wa-young-innovator')
  const active = useMemo(() => accomplishments.find((a) => a.id === activeId) ?? accomplishments[0], [activeId])
  return (
    <section className="section py-14 md:py-20">
      {/* Hero */}
      <div className="relative mb-8">
        <div className="mb-2 flex items-center gap-2 text-xs text-cyan-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,.8)]" />
          Highlights
        </div>
        <h2 className="section-title">Accomplishments</h2>
        <p className="section-subtitle">Milestones I’m proud of—more to come</p>
      </div>

      {/* Cards grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {accomplishments.map((a) => (
          <AccomplishmentCard key={a.id} item={a} onActivate={() => setActiveId(a.id)} />
        ))}
        {/* Placeholder card for future entries */}
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="relative rounded-xl border border-dashed border-white/10 p-5 text-gray-400"
        >
          <div className="mb-2 text-sm uppercase tracking-wide text-white/60">Coming soon</div>
          <div className="text-base">WIP</div> {/* TODO: add more accomplishments here */}
        </motion.article>
      </motion.div>

      {/* Dynamic detail section that updates based on the hovered/active card */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.28, ease: 'easeInOut' } }}
        className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] p-6"
      >
        <div className="mb-1 text-xs uppercase tracking-wide text-cyan-300">Details</div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            layout
          >
            <h3 className="mb-1 text-lg font-semibold text-white/90">{active.title}</h3>
            {active.id === 'wa-young-innovator' ? (
              <>
            <p className="mb-4 text-sm text-gray-300">
              A lightweight Streamlit app powered by Google Gemini to help with studying—chat explanations,
              research planning, auto‑generated quizzes, and rubric guidance—tailored by grade and curriculum,
              with safety filters.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium text-white/90">What it is</h4>
                <ul className="list-disc space-y-1 pl-5 text-gray-300">
                  <li>Chat explanations that guide thinking (not just answers)</li>
                  <li>Research planners with subtopics, guiding questions, and sources</li>
                  <li>Auto‑generated, auto‑graded practice quizzes</li>
                  <li>Rubric criteria explained in plain language</li>
                  <li>Safety filters, profanity guard, safe HTML, retry logic</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-white/90">Benefits for students</h4>
                <ul className="list-disc space-y-1 pl-5 text-gray-300">
                  <li>Understand faster with clear, age‑appropriate explanations</li>
                  <li>Practice anytime with quick, auto‑graded quizzes</li>
                  <li>Learn to research: structured subtopics and guiding questions</li>
                  <li>Demystify assignments: rubric criteria in plain language</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-white/90">Benefits for teachers</h4>
                <ul className="list-disc space-y-1 pl-5 text-gray-300">
                  <li>Save time creating practice quizzes and study prompts</li>
                  <li>Quick formative checks for understanding; easier differentiation</li>
                  <li>Scaffold research and clarify expectations without full solutions</li>
                  <li>Classroom‑friendly guardrails keep content appropriate</li>
                </ul>
              </div>
            </div>
              </>
            ) : active.id === 'coderdojo-curtin-attendee' ? (
              <>
            <p className="mb-4 text-sm text-gray-300">
              CoderDojo at Curtin University is a welcoming community for young people to explore code,
              collaborate, and learn by building projects with mentor support.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium text-white/90">Focus areas</h4>
                <ul className="list-disc space-y-1 pl-5 text-gray-300">
                  <li>Hands‑on projects (from beginner to advanced)</li>
                  <li>Pair programming and peer demos</li>
                  <li>Mentor feedback and guidance</li>
                  <li>Exploring languages and tools (Scratch to Python)</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-white/90">What I gained</h4>
                <ul className="list-disc space-y-1 pl-5 text-gray-300">
                  <li>Practical coding habits and collaboration</li>
                  <li>Confidence sharing ideas and progress</li>
                  <li>Inspiration for new projects and skills</li>
                  <li>Community connections in STEM</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <a className="text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline" href="https://codeclub.org/en/coderdojo-community" target="_blank" rel="noreferrer">
                Learn more about CoderDojo →
              </a>
            </div>
              </>
            ) : (
              <>
            {active.summary && <p className="mb-4 text-sm text-gray-300">{active.summary}</p>}
            {active.tags && active.tags.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-200">{t}</span>
                ))}
              </div>
            )}
            {active.link && (
              <a className="text-sm text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline" href={active.link} target="_blank" rel="noreferrer">
                Learn more →
              </a>
            )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
