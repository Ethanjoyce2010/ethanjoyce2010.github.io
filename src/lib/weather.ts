// Lightweight client-side weather helper using IP-based geolocation (approximate).
// No precise GPS is used.

export type WeatherSummary = {
  emoji: string
  label: string // e.g., Sunny, Rain, Snow
  message: string
  color: string // accent hex
  temperatureC: number | null
  place: string | null
}

type IpLocation = {
  city?: string
  region?: string
  country_code?: string
  latitude?: number
  longitude?: number
}

async function fetchJson<T>(url: string, timeoutMs = 4500): Promise<T> {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as T
  } finally {
    clearTimeout(id)
  }
}

export async function getApproxLocation(): Promise<{
  lat: number
  lon: number
  place: string | null
} | null> {
  try {
    // ipwho.is tends to allow CORS without a key
    const data = await fetchJson<any>('https://ipwho.is/')
    if (!data || data.success === false) return null
    const lat = Number(data.latitude)
    const lon = Number(data.longitude)
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
    const city = data.city as string | undefined
    const region = data.region as string | undefined
    const country = (data.country_code || data.country_code_iso3) as string | undefined
    const place = city ? `${city}${country ? `, ${country}` : ''}` : country || region || null
    return { lat, lon, place }
  } catch {
    try {
      // Fallback: ipapi.co
      const d = await fetchJson<IpLocation>('https://ipapi.co/json/')
      const lat = Number((d as any).latitude ?? (d as any).lat)
      const lon = Number((d as any).longitude ?? (d as any).lon)
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
      const place = d.city ? `${d.city}${d.country_code ? `, ${d.country_code}` : ''}` : d.country_code || d.region || null
      return { lat, lon, place }
    } catch {
      return null
    }
  }
}

type OpenMeteoCurrent = {
  current?: {
    temperature_2m?: number
    weather_code?: number
    is_day?: number
  }
  current_weather?: { // older API shape
    temperature?: number
    weathercode?: number
    is_day?: number
  }
}

export async function getCurrentWeather(lat: number, lon: number): Promise<{
  tempC: number | null
  code: number | null
  isDay: boolean
} | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`
    const data = await fetchJson<OpenMeteoCurrent>(url)
    const cur = data.current || undefined
    const legacy = data.current_weather || undefined
    const tempC = cur?.temperature_2m ?? legacy?.temperature ?? null
    const code = cur?.weather_code ?? legacy?.weathercode ?? null
    const isDay = (cur?.is_day ?? legacy?.is_day ?? 1) === 1
    return { tempC, code, isDay }
  } catch {
    return null
  }
}

const CATEGORY: Record<string, { color: string; emoji: string; labels: string[]; messages: string[] }> = {
  sunny: {
    color: '#00bfff',
    emoji: '☀️',
    labels: ['Sunny', 'Clear'],
    messages: [
      'It’s a bright and sunny day — perfect for getting things done!',
      'Plenty of sunshine out there today ☀️',
      'Clear skies ahead — hope your day’s going just as smoothly.',
      'A nice and sunny day — good vibes only!',
      'The sun’s out and so are the good ideas.'
    ]
  },
  partly: {
    color: '#5dade2',
    emoji: '🌤️',
    labels: ['Partly Cloudy', 'Fair', 'Cloudy'],
    messages: [
      'A calm day with a few clouds — great time to relax and explore.',
      'A little cloudy, but still a good day to create.',
      'Mild weather today — perfect coding conditions.',
      'Partly cloudy skies — just enough shade to think clearly.',
      'Nice balance of sun and clouds out there today.'
    ]
  },
  rainy: {
    color: '#3498db',
    emoji: '🌧️',
    labels: ['Rain', 'Showers', 'Drizzle'],
    messages: [
      'Looks like some rain today — ideal weather to stay in and build something cool.',
      'Rainy days are great for deep focus ☔',
      'Showers outside, ideas flowing inside.',
      'A cozy, rainy kind of day — grab a drink and dive into some projects.',
      'It’s raining — maybe the universe is debugging too.'
    ]
  },
  stormy: {
    color: '#1f3b73',
    emoji: '⛈️',
    labels: ['Stormy', 'Thunderstorms', 'Windy'],
    messages: [
      'Stormy weather out there — stay safe and keep creating.',
      'The weather’s wild, but that’s how innovation happens too.',
      'Windy day — hang on to your ideas!',
      'Thunderstorms rolling through — time to power up your imagination.'
    ]
  },
  snowy: {
    color: '#aee1f9',
    emoji: '❄️',
    labels: ['Snow', 'Flurries'],
    messages: [
      'Snowflakes and code — both unique and beautiful ❄️',
      'Cold day out there — perfect reason to stay warm and build something.',
      'It’s freezing outside, but creativity never hibernates.',
      'Snowy weather — a good time for hot coffee and cool projects.',
      'Bundle up! It’s chilly but inspiring.'
    ]
  },
  foggy: {
    color: '#95a5a6',
    emoji: '🌫️',
    labels: ['Foggy', 'Hazy', 'Misty'],
    messages: [
      'A bit foggy today — clarity comes from good design.',
      'The world’s a little hazy, but your vision doesn’t have to be.',
      'Fog outside, focus inside.',
      'Hazy weather, clear thoughts.',
      'Misty day — mysterious and inspiring.'
    ]
  },
  hot: {
    color: '#ff914d',
    emoji: '🌡️',
    labels: ['Hot', 'Warm'],
    messages: [
      'Hot day ahead — stay cool and keep creating.',
      'It’s toasty outside — good time to chill indoors.',
      'Warm weather and bright ideas ☀️',
      'Feels like summer — perfect day for something new.',
      'The temperature’s up, but so is the motivation.'
    ]
  },
  cold: {
    color: '#00bcd4',
    emoji: '🧊',
    labels: ['Cold'],
    messages: [
      'Crisp day ahead — perfect for focused work.',
      'Chilly vibes — warm ideas.',
      'Bundle up and build something great.',
      'Cool air, clear mind.'
    ]
  }
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function summarizeWeather(code: number | null, tempC: number | null): {
  key: keyof typeof CATEGORY
  label: string
  emoji: string
  color: string
  message: string
} {
  // Default
  let key: keyof typeof CATEGORY = 'partly'

  if (code !== null) {
    if (code === 0) key = 'sunny'
    else if ([1, 2, 3].includes(code)) key = 'partly'
    else if ([45, 48].includes(code)) key = 'foggy'
    else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) key = 'rainy'
    else if ([71, 73, 75, 77, 85, 86].includes(code)) key = 'snowy'
    else if ([95, 96, 99].includes(code)) key = 'stormy'
  }

  // Temperature overrides for "feel"
  if (tempC !== null) {
    if (tempC >= 28 && key !== 'stormy' && key !== 'snowy' && key !== 'rainy') key = 'hot'
    else if (tempC <= 5 && key !== 'snowy' && key !== 'stormy' && key !== 'rainy') key = 'cold'
  }

  const c = CATEGORY[key]
  const label = pick(c.labels)
  const message = pick(c.messages)
  return { key, label, emoji: c.emoji, color: c.color, message }
}

export async function getWeatherSummary(): Promise<WeatherSummary | null> {
  const loc = await getApproxLocation()
  if (!loc) return null
  const wx = await getCurrentWeather(loc.lat, loc.lon)
  if (!wx) return null
  const { emoji, color, label, message } = summarizeWeather(wx.code, wx.tempC)
  return {
    emoji,
    label,
    message,
    color,
    temperatureC: wx.tempC ?? null,
    place: loc.place ?? null,
  }
}
