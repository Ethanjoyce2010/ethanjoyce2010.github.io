import { useEffect, useState } from 'react'
import { getCurrentSeason, type SeasonalTheme } from '../lib/seasonal'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export function SeasonalBanner() {
  const [theme, setTheme] = useState<SeasonalTheme | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    getCurrentSeason().then(seasonalTheme => {
      setTheme(seasonalTheme)

      // Check if user has dismissed the banner for this season
      const dismissedSeason = sessionStorage.getItem('dismissedSeasonalBanner')
      if (dismissedSeason === seasonalTheme.name) {
        setIsDismissed(true)
        setIsVisible(false)
      }
    })
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    if (theme) {
      sessionStorage.setItem('dismissedSeasonalBanner', theme.name)
      setIsDismissed(true)
    }
  }

  if (!theme || isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="seasonal-banner relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}15)`
          }}
        >
          <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>
                {theme.emoji}
              </span>
              <p 
                className="text-sm md:text-base font-medium"
                style={{ color: theme.colors.primary }}
              >
                {theme.message}
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" style={{ color: theme.colors.primary }} />
            </button>
          </div>
          
          {/* Decorative elements */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, ${theme.colors.accent} 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
