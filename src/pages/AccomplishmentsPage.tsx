import { Accomplishment, AccomplishmentCard } from '../components/AccomplishmentCard'
import { motion } from 'framer-motion'

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
  // Add more accomplishments here as your journey grows
]

export default function AccomplishmentsPage() {
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
          <AccomplishmentCard key={a.id} item={a} />
        ))}
        {/* Placeholder card for future entries */}
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="relative rounded-xl border border-dashed border-white/10 p-5 text-gray-400"
        >
          <div className="mb-2 text-sm uppercase tracking-wide text-white/60">Coming soon</div>
          <div className="text-base">Your next accomplishment will appear here.</div>
        </motion.article>
      </motion.div>

      {/* Detail section for the WA nomination and project */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[.04] p-6">
        <h3 className="mb-1 text-lg font-semibold text-white/90">Project behind the nomination</h3>
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
      </div>
    </section>
  )
}
