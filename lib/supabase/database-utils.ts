import { createAdminClient } from './admin'

// Simple utility functions for database operations without type constraints

export async function insertContact(data: {
  name: string
  email: string
  message: string
  status?: string
}) {
  const supabase = createAdminClient()
  
  const { data: result, error } = await supabase
    .from('contacts')
    .insert([{
      name: data.name,
      email: data.email,
      message: data.message,
      status: data.status || 'unread'
    }])
    .select()
    .single()

  if (error) throw error
  return result
}

export async function insertProject(data: {
  title: string
  description: string
  long_description?: string
  technologies: string[]
  image_url?: string
  live_url?: string
  github_url?: string
  category?: string
  featured?: boolean
}) {
  const supabase = createAdminClient()
  
  const { data: result, error } = await supabase
    .from('projects')
    .insert([{
      title: data.title,
      description: data.description,
      long_description: data.long_description || null,
      technologies: data.technologies,
      image_url: data.image_url || null,
      live_url: data.live_url || null,
      github_url: data.github_url || null,
      category: data.category || null,
      featured: data.featured || false
    }])
    .select()
    .single()

  if (error) throw error
  return result
}

export async function insertBlogPost(data: {
  title: string
  slug: string
  content: string
  excerpt?: string
  author: string
  tags: string[]
  published?: boolean
  featured?: boolean
  reading_time?: number
}) {
  const supabase = createAdminClient()
  
  const { data: result, error } = await supabase
    .from('blog_posts')
    .insert([{
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt || null,
      author: data.author,
      tags: data.tags,
      published: data.published !== false,
      featured: data.featured || false,
      reading_time: data.reading_time || null
    }])
    .select()
    .single()

  if (error) throw error
  return result
}

export async function getAllContacts() {
  const supabase = createAdminClient()
  
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getAllProjects() {
  const supabase = createAdminClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getAllBlogPosts() {
  const supabase = createAdminClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}