export type Repo = {
  id: number
  name: string
  full_name: string
  description: string | null
  language: string | null
  stargazers_count: number
  html_url: string
  homepage?: string | null
  fork: boolean
  archived: boolean
  updated_at: string
}

export async function fetchRepos(user: string): Promise<Repo[]> {
  const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated` as const
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json',
    },
  })

  if (!res.ok) {
    // Rate limit or other error; try a tiny backoff once
    if (res.status === 403) {
      await new Promise((r) => setTimeout(r, 500))
      const retry = await fetch(url)
      if (!retry.ok) throw new Error(`GitHub API error: ${res.status}`)
      return (await retry.json()) as Repo[]
    }
    throw new Error(`GitHub API error: ${res.status}`)
  }

  const data = (await res.json()) as Repo[]
  return data
}
