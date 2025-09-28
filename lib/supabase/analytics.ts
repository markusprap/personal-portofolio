import { supabase } from './client'
import { Analytics } from './types'

export async function trackPageView(page: string, user_agent?: string): Promise<Analytics | null> {
  const { data, error } = await supabase
    .from('analytics')
    .insert([{
      event_type: 'page_view' as const,
      page,
      user_agent,
      timestamp: new Date().toISOString()
    }])
    .select()
    .single()

  if (error) {
    console.error('Error tracking page view:', error)
    return null
  }

  return data
}

export async function trackEvent(
  event_type: Analytics['event_type'],
  page: string,
  metadata?: Record<string, any>,
  user_agent?: string
): Promise<Analytics | null> {
  const { data, error } = await supabase
    .from('analytics')
    .insert([{
      event_type,
      page,
      metadata,
      user_agent,
      timestamp: new Date().toISOString()
    }])
    .select()
    .single()

  if (error) {
    console.error('Error tracking event:', error)
    return null
  }

  return data
}

export async function getAnalytics(
  startDate?: string,
  endDate?: string
): Promise<Analytics[]> {
  let query = supabase
    .from('analytics')
    .select('*')
    .order('timestamp', { ascending: false })

  if (startDate) {
    query = query.gte('timestamp', startDate)
  }
  if (endDate) {
    query = query.lte('timestamp', endDate)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching analytics:', error)
    return []
  }

  return data || []
}

export async function getPageViewStats(): Promise<{ page: string; views: number }[]> {
  const { data, error } = await supabase
    .from('analytics')
    .select('page')
    .eq('event_type', 'page_view')

  if (error) {
    console.error('Error fetching page view stats:', error)
    return []
  }

  // Aggregate page views
  const pageViews = data.reduce((acc: Record<string, number>, { page }) => {
    acc[page] = (acc[page] || 0) + 1
    return acc
  }, {})

  return Object.entries(pageViews).map(([page, views]) => ({ page, views }))
}