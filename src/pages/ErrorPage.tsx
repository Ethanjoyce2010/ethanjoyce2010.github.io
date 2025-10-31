import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const CODE_INFO: Record<string, { title: string; description: string }> = {
  '400': { title: 'Bad request', description: 'The request could not be understood. Please check the URL and try again.' },
  '401': { title: 'Unauthorized', description: 'You might need permission to view this content.' },
  '403': { title: 'Forbidden', description: 'You do not have access to this page.' },
  '404': { title: 'Page not found', description: 'The page you’re looking for doesn’t exist or may have moved.' },
  '500': { title: 'Server error', description: 'Something went wrong on our end.' },
  '502': { title: 'Bad gateway', description: 'Temporary upstream issue. Please try again shortly.' },
  '503': { title: 'Service unavailable', description: 'The service is temporarily unavailable. Please try again later.' },
}

export default function ErrorPage() {
  const params = useParams()
  const code = params.code ?? '404'
  const info = CODE_INFO[code] ?? { title: 'Unexpected error', description: 'An unexpected error occurred.' }

  return (
  <section className="section flex min-h-[60vh] flex-col items-center justify-center py-14 md:py-20">
      {/* subtle background flair */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_top_right,rgba(34,211,238,0.06),transparent_60%),radial-gradient(30rem_30rem_at_bottom_left,rgba(147,51,234,0.06),transparent_60%)]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-3 py-1 text-xs tracking-wide text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-cyan-300">
          Error
          <span className="rounded bg-black/10 px-1.5 py-0.5 text-gray-900 dark:bg-white/10 dark:text-white/90">{code}</span>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white/90 md:text-4xl">{info.title}</h1>
        <p className="mt-2 max-w-xl text-balance text-sm text-gray-700 dark:text-gray-300 md:text-base">{info.description}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link to="/" className="rounded-md border border-black/10 bg-black/5 px-4 py-2 text-gray-900 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">Go to homepage</Link>
          {code !== '404' && (
            <Link to="/contact" className="rounded-md border border-black/10 bg-black/5 px-4 py-2 text-gray-900 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">Contact</Link>
          )}
        </div>
      </motion.div>
    </section>
  )
}
