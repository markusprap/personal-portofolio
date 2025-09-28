import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@/lib/supabase/server'
import { AdminDashboard } from './dashboard'

export default async function AdminPage() {
  // Simple authentication check - in production, use proper auth
  const isAuthenticated = process.env.NODE_ENV === 'development' || 
    process.env.ADMIN_ACCESS === 'true'

  if (!isAuthenticated) {
    redirect('/')
  }

  const supabase = createServerComponentClient()

  // Get dashboard statistics
  const [projectsResult, blogResult, contactsResult] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact' }),
    supabase.from('blog_posts').select('*', { count: 'exact' }),
    supabase.from('contacts').select('*', { count: 'exact' })
  ])

  const stats = {
    projects: projectsResult.count || 0,
    blogPosts: blogResult.count || 0,
    contacts: contactsResult.count || 0,
    totalViews: blogResult.data?.reduce((sum: number, post: any) => sum + (post.views || 0), 0) || 0
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminDashboard stats={stats} />
    </div>
  )
}