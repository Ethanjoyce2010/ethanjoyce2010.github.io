// Seasonal theming utility
import { isUserInUSA, getUserCountry } from './geolocation'

export interface SeasonalTheme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
  message: string
  emoji: string
}

// Countries in the Southern Hemisphere (or with reversed seasons)
const SOUTHERN_HEMISPHERE_COUNTRIES = [
  'AR', 'AU', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GF', 'GY', 'NZ', 
  'PE', 'PY', 'SR', 'UY', 'VE', 'ZA', 'ZW', 'BW', 'NA', 'LS', 'SZ',
  'MZ', 'MG', 'MW', 'ZM', 'AO', 'TZ', 'KE', 'ID', 'TL', 'PG', 'FJ'
]

async function isInSouthernHemisphere(): Promise<boolean> {
  const location = await getUserCountry()
  return location.countryCode ? SOUTHERN_HEMISPHERE_COUNTRIES.includes(location.countryCode) : false
}

export async function getCurrentSeason(): Promise<SeasonalTheme> {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-12
  const day = now.getDate()

  // Check if user is in USA for USA-specific holidays
  const isUSA = await isUserInUSA()
  
  // Check if user is in Southern Hemisphere for reversed seasons
  const isSouthern = await isInSouthernHemisphere()

  // December: Christmas
  if (month === 12) {
    return {
      name: 'Christmas',
      colors: {
        primary: '#c41e3a', // Christmas red
        secondary: '#165b33', // Christmas green
        accent: '#ffd700', // Gold
        background: 'rgba(196, 30, 58, 0.05)'
      },
      message: '🎄 Happy Holidays! 🎅',
      emoji: '🎄'
    }
  }

  // October: Halloween
  if (month === 10) {
    return {
      name: 'Halloween',
      colors: {
        primary: '#ff6b35', // Orange
        secondary: '#6a0dad', // Purple
        accent: '#000000', // Black
        background: 'rgba(255, 107, 53, 0.05)'
      },
      message: '🎃 Happy Halloween! 👻',
      emoji: '🎃'
    }
  }

  // February: Valentine's Day
  if (month === 2 && day <= 14) {
    return {
      name: 'Valentines',
      colors: {
        primary: '#ff1744', // Red
        secondary: '#ff4081', // Pink
        accent: '#f50057', // Deep pink
        background: 'rgba(255, 23, 68, 0.05)'
      },
      message: '💝 Happy Valentine\'s Day! 💕',
      emoji: '💝'
    }
  }

  // March 17: St. Patrick's Day
  if (month === 3 && day >= 10 && day <= 17) {
    return {
      name: 'StPatricks',
      colors: {
        primary: '#00a651', // Irish green
        secondary: '#ffc72c', // Gold
        accent: '#169b62',
        background: 'rgba(0, 166, 81, 0.05)'
      },
      message: '☘️ Happy St. Patrick\'s Day! 🍀',
      emoji: '☘️'
    }
  }

  // July 4: Independence Day (USA ONLY)
  if (month === 7 && day <= 7 && isUSA) {
    return {
      name: 'IndependenceDay',
      colors: {
        primary: '#b22234', // Red
        secondary: '#3c3b6e', // Blue
        accent: '#ffffff', // White
        background: 'rgba(178, 34, 52, 0.05)'
      },
      message: '🎆 Happy 4th of July! 🇺🇸',
      emoji: '🎆'
    }
  }

  // November: Thanksgiving (USA ONLY)
  if (month === 11 && isUSA) {
    return {
      name: 'Thanksgiving',
      colors: {
        primary: '#d2691e', // Chocolate brown
        secondary: '#ff8c00', // Dark orange
        accent: '#8b4513', // Saddle brown
        background: 'rgba(210, 105, 30, 0.05)'
      },
      message: '🦃 Happy Thanksgiving! 🍂',
      emoji: '🦃'
    }
  }

  // Spring (March-May in Northern Hemisphere, September-November in Southern Hemisphere)
  const isSpringMonth = isSouthern 
    ? (month === 9 || month === 10 || month === 11)
    : (month === 3 || month === 4 || month === 5)
  
  if (isSpringMonth && !(month === 10 && !isSouthern) && !(month === 11 && isUSA && !isSouthern)) {
    return {
      name: 'Spring',
      colors: {
        primary: '#ff69b4', // Hot pink
        secondary: '#98d8c8', // Mint green
        accent: '#f7cac9', // Pastel pink
        background: 'rgba(255, 105, 180, 0.05)'
      },
      message: '🌸 Happy Spring! 🌷',
      emoji: '🌸'
    }
  }

  // Summer (June-August in Northern Hemisphere, December-February in Southern Hemisphere)
  const isSummerMonth = isSouthern
    ? (month === 12 || month === 1 || month === 2)
    : (month === 6 || month === 7 || month === 8)
  
  if (isSummerMonth && !(month === 12 && !isSouthern) && !(month === 2 && day <= 14 && !isSouthern) && !(month === 7 && day <= 7 && isUSA && !isSouthern)) {
    return {
      name: 'Summer',
      colors: {
        primary: '#ffd700', // Gold
        secondary: '#00bfff', // Deep sky blue
        accent: '#ff6347', // Tomato
        background: 'rgba(255, 215, 0, 0.05)'
      },
      message: isSouthern ? '☀️ Happy Summer! 🏖️' : '☀️ Happy Summer! 🏖️',
      emoji: '☀️'
    }
  }

  // Fall/Autumn (September-November in Northern Hemisphere, March-May in Southern Hemisphere)
  const isAutumnMonth = isSouthern
    ? (month === 3 || month === 4 || month === 5)
    : (month === 9 || month === 10 || month === 11)
  
  if (isAutumnMonth && !(month === 10 && isSouthern) && !(month === 11 && isUSA && isSouthern) && !(month === 3 && day >= 10 && day <= 17 && isSouthern)) {
    return {
      name: 'Autumn',
      colors: {
        primary: '#d2691e', // Chocolate
        secondary: '#ff8c00', // Dark orange
        accent: '#8b0000', // Dark red
        background: 'rgba(210, 105, 30, 0.05)'
      },
      message: '🍂 Happy Fall! 🍁',
      emoji: '🍂'
    }
  }

  // Winter (December-February in Northern Hemisphere, June-August in Southern Hemisphere)
  const isWinterMonth = isSouthern
    ? (month === 6 || month === 7 || month === 8)
    : (month === 1 || month === 2 || month === 12)
  
  if (isWinterMonth && !(month === 12 && !isSouthern) && !(month === 2 && day <= 14 && !isSouthern)) {
    return {
      name: 'Winter',
      colors: {
        primary: '#4fc3f7', // Light blue
        secondary: '#b3e5fc', // Lighter blue
        accent: '#ffffff', // White
        background: 'rgba(79, 195, 247, 0.05)'
      },
      message: '❄️ Happy Winter! ⛄',
      emoji: '❄️'
    }
  }

  // Default (should rarely hit this)
  return {
    name: 'Default',
    colors: {
      primary: '#3b82f6', // Blue
      secondary: '#8b5cf6', // Purple
      accent: '#22d3ee', // Cyan
      background: 'rgba(59, 130, 246, 0.05)'
    },
    message: '👋 Welcome!',
    emoji: '✨'
  }
}

// Apply seasonal theme to document
export function applySeasonalTheme(theme: SeasonalTheme) {
  const root = document.documentElement
  root.style.setProperty('--seasonal-primary', theme.colors.primary)
  root.style.setProperty('--seasonal-secondary', theme.colors.secondary)
  root.style.setProperty('--seasonal-accent', theme.colors.accent)
  root.style.setProperty('--seasonal-background', theme.colors.background)
}
