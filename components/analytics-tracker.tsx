"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/supabase/analytics'

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await trackPageView(pathname)
      } catch (error) {
        console.error('Analytics tracking error:', error)
      }
    }

    // Track page view after a short delay to ensure page is loaded
    const timer = setTimeout(trackVisit, 1000)
    
    return () => clearTimeout(timer)
  }, [pathname])

  // This component doesn't render anything
  return null
}