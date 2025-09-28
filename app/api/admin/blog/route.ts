import { NextRequest, NextResponse } from 'next/server'
import { insertBlogPost, getAllBlogPosts } from '@/lib/supabase/database-utils'

// GET all blog posts for admin
export async function GET() {
  try {
    const blogPosts = await getAllBlogPosts()
    return NextResponse.json({ blogPosts })
  } catch (error) {
    console.error('Error in blog GET route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { 
      title, 
      slug,
      content, 
      excerpt,
      author,
      tags,
      published,
      featured
    } = body

    // Basic validation
    if (!title || !slug || !content || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    const newPost = await insertBlogPost({
      title,
      slug,
      content,
      excerpt,
      author,
      tags: Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim()),
      published: published !== false,
      featured: featured || false,
      reading_time: readingTime
    })

    return NextResponse.json({ post: newPost })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}