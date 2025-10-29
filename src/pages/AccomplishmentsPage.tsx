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
  const detailVariants = {
    initial: { opacity: 0, y: 6 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, when: 'beforeChildren', staggerChildren: 0.03, delayChildren: 0.02 },
    },
    exit: { opacity: 0, y: -6, transition: { duration: 0.18, when: 'afterChildren', staggerChildren: 0.02, staggerDirection: -1 } },
  }
  const itemVariants = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
  }
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
        transition={{ layout: { type: 'spring', stiffness: 260, damping: 28 } }}
        className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] p-6"
      >
        <div className="mb-1 text-xs uppercase tracking-wide text-cyan-300">Details</div>
         <AnimatePresence mode="popLayout">
          <motion.div
            key={active.id}
            variants={detailVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <motion.h3 variants={itemVariants} className="mb-1 text-lg font-semibold text-white/90">{active.title}</motion.h3>
            {active.id === 'wa-young-innovator' ? (
              <>
            <motion.p variants={itemVariants} className="mb-4 text-sm text-gray-300">
              A lightweight Streamlit app powered by Google Gemini to help with studying—chat explanations,
              research planning, auto‑generated quizzes, and rubric guidance—tailored by grade and curriculum,
              with safety filters.
            </motion.p>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div variants={itemVariants}>
                <h4 className="mb-2 font-medium text-white/90">What it is</h4>
                <motion.ul variants={itemVariants} className="list-disc space-y-1 pl-5 text-gray-300">
                  <motion.li variants={itemVariants}>Chat explanations that guide thinking (not just answers)</motion.li>
                  <motion.li variants={itemVariants}>Research planners with subtopics, guiding questions, and sources</motion.li>
                  <motion.li variants={itemVariants}>Auto‑generated, auto‑graded practice quizzes</motion.li>
                  <motion.li variants={itemVariants}>Rubric criteria explained in plain language</motion.li>
                  <motion.li variants={itemVariants}>Safety filters, profanity guard, safe HTML, retry logic</motion.li>
                </motion.ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h4 className="mb-2 font-medium text-white/90">Benefits for students</h4>
                <motion.ul variants={itemVariants} className="list-disc space-y-1 pl-5 text-gray-300">
                  <motion.li variants={itemVariants}>Understand faster with clear, age‑appropriate explanations</motion.li>
                  <motion.li variants={itemVariants}>Practice anytime with quick, auto‑graded quizzes</motion.li>
                  <motion.li variants={itemVariants}>Learn to research: structured subtopics and guiding questions</motion.li>
                  <motion.li variants={itemVariants}>Demystify assignments: rubric criteria in plain language</motion.li>
                </motion.ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h4 className="mb-2 font-medium text-white/90">Benefits for teachers</h4>
                <motion.ul variants={itemVariants} className="list-disc space-y-1 pl-5 text-gray-300">
                  <motion.li variants={itemVariants}>Save time creating practice quizzes and study prompts</motion.li>
                  <motion.li variants={itemVariants}>Quick formative checks for understanding; easier differentiation</motion.li>
                  <motion.li variants={itemVariants}>Scaffold research and clarify expectations without full solutions</motion.li>
                  <motion.li variants={itemVariants}>Classroom‑friendly guardrails keep content appropriate</motion.li>
                </motion.ul>
              </motion.div>
            </div>
              </>
            ) : active.id === 'coderdojo-curtin-attendee' ? (
              <>
            <motion.p variants={itemVariants} className="mb-4 text-sm text-gray-300">
              CoderDojo at Curtin University is a welcoming community for young people to explore code,
              collaborate, and learn by building projects with mentor support.
            </motion.p>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div variants={itemVariants}>
                <h4 className="mb-2 font-medium text-white/90">Focus areas</h4>
                <motion.ul variants={itemVariants} className="list-disc space-y-1 pl-5 text-gray-300">
                  <motion.li variants={itemVariants}>Hands‑on projects (from beginner to advanced)</motion.li>
                  <motion.li variants={itemVariants}>Pair programming and peer demos</motion.li>
                  <motion.li variants={itemVariants}>Mentor feedback and guidance</motion.li>
                  <motion.li variants={itemVariants}>Exploring languages and tools (Scratch to Python)</motion.li>
                </motion.ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h4 className="mb-2 font-medium text-white/90">What I gained</h4>
                <motion.ul variants={itemVariants} className="list-disc space-y-1 pl-5 text-gray-300">
                  <motion.li variants={itemVariants}>Practical coding habits and collaboration</motion.li>
                  <motion.li variants={itemVariants}>Confidence sharing ideas and progress</motion.li>
                  <motion.li variants={itemVariants}>Inspiration for new projects and skills</motion.li>
                  <motion.li variants={itemVariants}>Community connections in STEM</motion.li>
                </motion.ul>
              </motion.div>
            </div>
            <motion.div variants={itemVariants} className="mt-4 text-sm">
              <a className="text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline" href="https://codeclub.org/en/coderdojo-community" target="_blank" rel="noreferrer">
                Learn more about CoderDojo →
              </a>
            </motion.div>
              </>
            ) : (
              <>
            {active.summary && <motion.p variants={itemVariants} className="mb-4 text-sm text-gray-300">{active.summary}</motion.p>}
            {active.tags && active.tags.length > 0 && (
              <motion.div variants={itemVariants} className="mb-2 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-200">{t}</span>
                ))}
              </motion.div>
            )}
            {active.link && (
              <motion.a variants={itemVariants} className="text-sm text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline" href={active.link} target="_blank" rel="noreferrer">
                Learn more →
              </motion.a>
            )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
