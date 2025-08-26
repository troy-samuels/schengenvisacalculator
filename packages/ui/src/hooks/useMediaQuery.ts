import { useState, useEffect } from 'react'

/**
 * Custom hook for responsive media query detection
 * Used to determine when to show mobile vs desktop calendar layouts
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      // During SSR, assume desktop (safer fallback)
      setMatches(false)
      return
    }

    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)

    // Create listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    } else {
      // Fallback for older browsers
      media.addListener(listener)
    }

    // Cleanup function
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener)
      } else {
        // Fallback for older browsers
        media.removeListener(listener)
      }
    }
  }, [query])

  return matches
}

/**
 * Convenience hook for mobile detection
 * Returns true when screen width is 768px or less
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}