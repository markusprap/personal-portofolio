import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET() {
  try {
    // Test blog posts connection
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(3)

    // Test projects connection
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(3)

    // Test contacts connection
    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('*')
      .limit(3)

    return NextResponse.json({
      success: true,
      data: {
        blog_posts: {
          count: blogPosts?.length || 0,
          data: blogPosts || [],
          error: blogError?.message || null
        },
        projects: {
          count: projects?.length || 0,
          data: projects || [],
          error: projectsError?.message || null
        },
        contacts: {
          count: contacts?.length || 0,
          data: contacts || [],
          error: contactsError?.message || null
        }
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}