'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Track page views when component mounts
const ViewTracker = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Track view only once per page load
    const trackView = async () => {
      try {
        await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname,
            referrer: document.referrer || 'direct',
            userAgent: navigator.userAgent,
          }),
        })
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.error('Failed to track view:', error)
      }
    }

    // Small delay to ensure page is fully loaded
    const timer = setTimeout(trackView, 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  return null // This component doesn't render anything
}

export default ViewTracker

