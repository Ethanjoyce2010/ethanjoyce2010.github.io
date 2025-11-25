import { Award, Calendar, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export type Accomplishment = {
  id: string
  title: string
  date?: string
  issuer?: string
  summary?: string
  tags?: string[]
  link?: string
}

type Props = {
  item: Accomplishment
  onActivate?: () => void
}

export function AccomplishmentCard({ item, onActivate }: Props) {
  const { title, date, issuer, summary, tags, link } = item
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-black/[.04] p-5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 dark:border-white/10 dark:bg-white/[.04] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] dark:hover:bg-white/[.06] dark:focus-visible:ring-cyan-400/60"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
    >
      {/* gradient ring */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(40rem_20rem_at_top_right,rgba(34,211,238,0.10),transparent_60%)]" />

      <div className="mb-3 flex items-start gap-3">
        <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-700 shadow-[0_0_20px_rgba(34,211,238,.15)] dark:bg-cyan-400/10 dark:text-cyan-300">
          <Award className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white/90">{title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
            {date && (
              <span className="inline-flex items-center gap-1"><Calendar className="size-3" />{date}</span>
            )}
            {issuer && <span className="inline-flex items-center gap-1">• {issuer}</span>}
          </div>
        </div>
      </div>

      {summary && <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">{summary}</p>}

      {tags && tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-md border border-black/10 bg-black/5 px-2 py-1 text-xs text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">{t}</span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between">
        <div />
        {link && (
          <a
            className="inline-flex items-center gap-1 text-sm text-cyan-700 underline-offset-4 hover:text-cyan-600 hover:underline dark:text-cyan-300 dark:hover:text-cyan-200"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            Learn more <ExternalLink className="size-4" />
          </a>
        )}
      </div>
    </article>
  )
}
