'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Types for analytics events
interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

interface PageViewEvent {
  page_title: string
  page_location: string
  page_path: string
}

// Google Analytics 4 implementation
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const Analytics = () => {
  const pathname = usePathname()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    // Load Google Analytics script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Track page views
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [pathname])

  return null
}

// Analytics utility functions
export const analytics = {
  // Track page views
  pageView: (data: PageViewEvent) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return
    
    window.gtag('event', 'page_view', data)
  },

  // Track custom events
  event: ({ action, category, label, value }: AnalyticsEvent) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return
    
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  },

  // Track project views
  projectView: (projectId: string, projectTitle: string) => {
    analytics.event({
      action: 'view_project',
      category: 'Projects',
      label: `${projectId} - ${projectTitle}`,
    })
  },

  // Track blog post reads
  blogRead: (postId: string, postTitle: string) => {
    analytics.event({
      action: 'read_article',
      category: 'Blog',
      label: `${postId} - ${postTitle}`,
    })
  },

  // Track contact form submissions
  contactForm: (method: 'email' | 'form') => {
    analytics.event({
      action: 'contact_attempt',
      category: 'Contact',
      label: method,
    })
  },

  // Track download events
  download: (fileName: string, fileType: string) => {
    analytics.event({
      action: 'download',
      category: 'Files',
      label: `${fileName}.${fileType}`,
    })
  },

  // Track external link clicks
  externalLink: (url: string, context: string) => {
    analytics.event({
      action: 'click_external_link',
      category: 'External Links',
      label: `${context} - ${url}`,
    })
  },

  // Track theme changes
  themeChange: (theme: 'light' | 'dark' | 'system') => {
    analytics.event({
      action: 'change_theme',
      category: 'UI',
      label: theme,
    })
  },

  // Track search queries
  search: (query: string, context: 'projects' | 'blog') => {
    analytics.event({
      action: 'search',
      category: 'Search',
      label: `${context} - ${query}`,
    })
  },
}

// Hook for tracking user interactions
export const useAnalytics = () => {
  return analytics
}

// Performance monitoring
export const performanceAnalytics = {
  // Track Core Web Vitals
  webVitals: (metric: {
    name: string
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
  }) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return
    
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.rating,
      value: Math.round(metric.value),
      non_interaction: true,
    })
  },

  // Track page load times
  pageLoad: (loadTime: number) => {
    analytics.event({
      action: 'page_load_time',
      category: 'Performance',
      value: Math.round(loadTime),
    })
  },
}

// Privacy-conscious analytics wrapper
export const privacyAnalytics = {
  // Initialize with consent
  initialize: (hasConsent: boolean) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return
    
    window.gtag('consent', 'default', {
      analytics_storage: hasConsent ? 'granted' : 'denied',
      ad_storage: 'denied',
      functionality_storage: hasConsent ? 'granted' : 'denied',
      personalization_storage: 'denied',
    })
  },

  // Update consent
  updateConsent: (hasConsent: boolean) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return
    
    window.gtag('consent', 'update', {
      analytics_storage: hasConsent ? 'granted' : 'denied',
      functionality_storage: hasConsent ? 'granted' : 'denied',
    })
  },
}