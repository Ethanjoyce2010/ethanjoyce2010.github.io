// Geolocation utility to detect user's country
export interface GeolocationData {
  country: string | null
  countryCode: string | null
  error?: string
}

let cachedLocation: GeolocationData | null = null

/**
 * Detect user's country using IP geolocation
 * Uses a free API with fallback options
 */
export async function getUserCountry(): Promise<GeolocationData> {
  // Return cached result if available
  if (cachedLocation) {
    return cachedLocation
  }

  try {
    // Try ipapi.co first (free, no key required, 1k requests/day)
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(5000) // 5 second timeout
    })

    if (!response.ok) {
      throw new Error('Failed to fetch geolocation')
    }

    const data = await response.json()
    
    cachedLocation = {
      country: data.country_name || null,
      countryCode: data.country_code || null
    }

    // Store in sessionStorage for persistence
    try {
      sessionStorage.setItem('userCountry', JSON.stringify(cachedLocation))
    } catch {}

    return cachedLocation
  } catch (error) {
    console.warn('Geolocation failed:', error)
    
    // Try to get from sessionStorage
    try {
      const stored = sessionStorage.getItem('userCountry')
      if (stored) {
        cachedLocation = JSON.parse(stored)
        if (cachedLocation) {
          return cachedLocation
        }
      }
    } catch {}

    // Return unknown country
    cachedLocation = {
      country: null,
      countryCode: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
    
    return cachedLocation
  }
}

/**
 * Check if user is in the United States
 */
export async function isUserInUSA(): Promise<boolean> {
  const location = await getUserCountry()
  return location.countryCode === 'US'
}

/**
 * Reset cached location (useful for testing)
 */
export function resetLocationCache() {
  cachedLocation = null
  try {
    sessionStorage.removeItem('userCountry')
  } catch {}
}
