import { useEffect, useState } from 'react'
import { getWeatherSummary, type WeatherSummary } from '../lib/weather'

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const UPDATE_INTERVAL = 5 * 60 * 1000 // Update every 5 minutes

export function WeatherBlurb() {
  const [data, setData] = useState<WeatherSummary | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchWeather = async (useCache = true) => {
    // Try cache first if allowed
    if (useCache) {
      try {
        const raw = sessionStorage.getItem('wx:summary')
        if (raw) {
          const { t, d } = JSON.parse(raw) as { t: number; d: WeatherSummary }
          if (Date.now() - t < CACHE_DURATION) {
            setData(d)
            return
          }
        }
      } catch {}
    }

    // Fetch fresh data
    setIsUpdating(true)
    try {
      const d = await getWeatherSummary()
      setData(d)
      setError(null)
      try {
        if (d) sessionStorage.setItem('wx:summary', JSON.stringify({ t: Date.now(), d }))
      } catch {}
    } catch {
      setError('')
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    let mounted = true
    let intervalId: number | undefined

    // Initial fetch
    fetchWeather()

    // Set up automatic updates every 5 minutes
    intervalId = window.setInterval(() => {
      if (mounted) {
        fetchWeather(false) // Force fresh data on interval
      }
    }, UPDATE_INTERVAL)

    return () => {
      mounted = false
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  if (!data || error !== null) return null

  const accent = data.color
  const text = `${data.emoji} ${data.message}`
  const loc = data.place ? ` · ${data.place}` : ''
  const temp = typeof data.temperatureC === 'number' ? ` · ${Math.round(data.temperatureC)}°C` : ''

  return (
    <div
      className="mt-3 inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-1.5 text-sm dark:border-white/10 relative group cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      style={{
        // subtle adaptive tint; border is handled via classes
        boxShadow: `0 0 0 1px ${accent}20 inset`,
      }}
      title={isUpdating ? 'Updating weather...' : 'Click to refresh weather'}
      onClick={() => !isUpdating && fetchWeather(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isUpdating) {
          e.preventDefault()
          fetchWeather(false)
        }
      }}
    >
      <span 
        className={`inline-block h-2 w-2 rounded-full ${isUpdating ? 'animate-pulse' : ''}`} 
        style={{ backgroundColor: accent }} 
      />
      <span className="text-gray-800 dark:text-gray-200">
        {text}
        <span className="text-gray-500 dark:text-gray-400">{loc}{temp}</span>
      </span>
      {isUpdating && (
        <span className="ml-1 text-xs text-gray-400 animate-spin">⟳</span>
      )}
      <span className="ml-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        {isUpdating ? '' : '↻'}
      </span>
    </div>
  )
}
