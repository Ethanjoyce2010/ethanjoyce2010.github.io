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
}

export function AccomplishmentCard({ item }: Props) {
  const { title, date, issuer, summary, tags, link } = item
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[.04] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] hover:bg-white/[.06]"
    >
      {/* gradient ring */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-[radial-gradient(40rem_20rem_at_top_right,rgba(34,211,238,0.10),transparent_60%)]" />

      <div className="mb-3 flex items-start gap-3">
        <div className="rounded-lg bg-cyan-400/10 p-2 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.15)]">
          <Award className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white/90">{title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-400">
            {date && (
              <span className="inline-flex items-center gap-1"><Calendar className="size-3" />{date}</span>
            )}
            {issuer && <span className="inline-flex items-center gap-1">• {issuer}</span>}
          </div>
        </div>
      </div>

      {summary && <p className="mb-4 text-sm text-gray-300">{summary}</p>}

      {tags && tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-200">{t}</span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div />
        {link && (
          <a
            className="inline-flex items-center gap-1 text-sm text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            Learn more <ExternalLink className="size-4" />
          </a>
        )}
      </div>
    </motion.article>
  )
}
