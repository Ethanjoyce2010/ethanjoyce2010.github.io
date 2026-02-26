import { useEffect, useMemo, useState } from 'react'
import { Github } from 'lucide-react'
import { fetchRepos, type Repo } from '../lib/github'
import { FadeIn } from './FadeIn'

const FEATURED: Array<Pick<Repo, 'name' | 'description' | 'language' | 'html_url'>> = [
  {
    name: 'Recaptcha-notifier',
    description: 'Userscript that alerts you when a reCAPTCHA appears',
    language: 'JavaScript',
    html_url: 'https://github.com/Ethanjoyce2010/Recaptcha-notifier',
  },
  {
    name: 'Scrabble-wordgen',
    description: 'Generate Scrabble word scores / lists',
    language: 'Python',
    html_url: 'https://github.com/Ethanjoyce2010/Scrabble-wordgen',
  },
  {
    name: 'lrcput',
    description: 'Graphical remake / interface for lrcput, using LrcLib',
    language: 'Python',
    html_url: 'https://github.com/Ethanjoyce2010/lrcput',
  },
]

function RepoCard({ repo }: { repo: Pick<Repo, 'name' | 'description' | 'language' | 'html_url' | 'stargazers_count' | 'updated_at'> }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="seasonal-hover group card-glass block h-full rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-xl hover:bg-black/10 dark:hover:bg-white/[.06]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white/90">{repo.name}</h3>
        <Github className="size-4 text-gray-500 dark:text-gray-400 opacity-75 transition group-hover:opacity-100" />
      </div>
      <p className="mt-2 max-h-12 overflow-hidden text-ellipsis text-sm text-gray-700 dark:text-gray-300">{repo.description || 'No description yet.'}</p>
      <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
        <span className="rounded-lg border border-black/10 bg-black/[.04] px-2 py-1 dark:border-white/10 dark:bg-white/5">{repo.language || 'Other'}</span>
      </div>
    </a>
  )
}

export function Projects() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRepos('Ethanjoyce2010')
      .then((data) => setRepos(data))
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load projects'))
  }, [])

  const combined = useMemo(() => {
    const featuredMap = new Map(FEATURED.map((f) => [f.name.toLowerCase(), f]))
    const list: Array<Pick<Repo, 'name' | 'description' | 'language' | 'html_url' | 'stargazers_count' | 'updated_at'>> = []

    // Put featured first
    FEATURED.forEach((f) =>
      list.push({ ...f, stargazers_count: 0, updated_at: new Date().toISOString() })
    )

    // Then add top repos from API
    if (repos) {
      repos
        .filter((r) =>
          !r.fork &&
          !r.archived &&
          r.name.toLowerCase() !== 'ethanjoyce2010' &&
          r.name.toLowerCase() !== 'ethanjoyce2010.github.io' &&
          r.name.toLowerCase() !== 'active-project' &&
          !featuredMap.has(r.name.toLowerCase())
        )
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 9)
        .forEach((r) => list.push(r))
    }

    return list
  }, [repos])

  return (
    <section id="projects" className="section py-14 md:py-20">
      <FadeIn>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">Things I build, explore, and tinker with</p>
          </div>
          <a
            href="https://github.com/Ethanjoyce2010?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-cyan-400 hover:underline"
          >
            View all →
          </a>
        </div>
      </FadeIn>

      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {combined.map((repo, i) => (
          <FadeIn key={repo.name} delay={i * 0.1}>
            <RepoCard repo={repo} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
