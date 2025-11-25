import { useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export function ScrollBouncer({ children }: { children: React.ReactNode }) {
  // Spring configuration for the "rubber band" snap back
  const springY = useSpring(0, { stiffness: 150, damping: 20, mass: 1 })
  
  // Track the accumulated overscroll distance
  const accumulatedY = useRef(0)
  const resetTimer = useRef<number | null>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      
      // Check boundaries
      // We use a small epsilon for float comparison if needed, but scrollY is usually integer-ish
      const isAtTop = scrollTop <= 0
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

      // Only activate if we are scrolling PAST the boundary OR if we are already stretched
      const isStretched = accumulatedY.current !== 0
      const isAttemptingStretch = (isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)

      if (isStretched || isAttemptingStretch) {
        // Determine if we are increasing the stretch (moving away from 0) or releasing (moving towards 0)
        const currentY = accumulatedY.current
        const delta = e.deltaY
        // Increasing if: (positive Y and scrolling up) OR (negative Y and scrolling down) OR (at 0)
        const isIncreasingStretch = (currentY > 0 && delta < 0) || (currentY < 0 && delta > 0) || (currentY === 0)

        // Apply resistance: High resistance when stretching, low/none when returning
        let resistance = 1
        if (isIncreasingStretch) {
          resistance = 5 + Math.abs(accumulatedY.current) / 2
        }

        // Update accumulated distance
        accumulatedY.current -= delta / resistance
        
        // Clamp the maximum stretch to keep it subtle
        const MAX_STRETCH = 60
        accumulatedY.current = Math.max(Math.min(accumulatedY.current, MAX_STRETCH), -MAX_STRETCH)
        
        // If we crossed zero while returning, snap to zero
        if ((currentY > 0 && accumulatedY.current < 0) || (currentY < 0 && accumulatedY.current > 0)) {
          accumulatedY.current = 0
        }

        // Set the spring target
        springY.set(accumulatedY.current)
        
        // Reset timer to snap back when scrolling stops
        if (resetTimer.current) clearTimeout(resetTimer.current)
        resetTimer.current = window.setTimeout(() => {
          accumulatedY.current = 0
          springY.set(0)
        }, 150) // 150ms debounce
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (resetTimer.current) clearTimeout(resetTimer.current)
    }
  }, [springY])

  return (
    <motion.div style={{ y: springY }} className="w-full">
      {children}
    </motion.div>
  )
}
