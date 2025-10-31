import { useEffect, useState } from 'react'
import { getWeatherSummary, type WeatherSummary } from '../lib/weather'

export function WeatherBlurb() {
  const [data, setData] = useState<WeatherSummary | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    // Try cache first (30 minutes)
    try {
      const raw = sessionStorage.getItem('wx:summary')
      if (raw) {
        const { t, d } = JSON.parse(raw) as { t: number; d: WeatherSummary }
        if (Date.now() - t < 30 * 60 * 1000) {
          setData(d)
          return
        }
      }
    } catch {}

    getWeatherSummary()
      .then((d) => {
        if (mounted) setData(d)
        try {
          if (d) sessionStorage.setItem('wx:summary', JSON.stringify({ t: Date.now(), d }))
        } catch {}
      })
      .catch(() => { if (mounted) setError('') })
    return () => { mounted = false }
  }, [])

  if (!data || error !== null) return null

  const accent = data.color
  const text = `${data.emoji} ${data.message}`
  const loc = data.place ? ` · ${data.place}` : ''
  const temp = typeof data.temperatureC === 'number' ? ` · ${Math.round(data.temperatureC)}°C` : ''

  return (
    <div
      className="mt-3 inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-1.5 text-sm dark:border-white/10"
      style={{
        // subtle adaptive tint; border is handled via classes
        boxShadow: `0 0 0 1px ${accent}20 inset`,
      }}
    >
      <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
      <span className="text-gray-800 dark:text-gray-200">
        {text}
        <span className="text-gray-500 dark:text-gray-400">{loc}{temp}</span>
      </span>
    </div>
  )
}
