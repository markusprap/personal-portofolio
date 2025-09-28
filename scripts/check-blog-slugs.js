require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function getAllBlogSlugs() {
  console.log('Getting all blog slugs...')
  
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, published')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching blog posts:', error)
      return
    }
    
    console.log(`Found ${posts?.length || 0} blog posts:`)
    posts?.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}"`)
      console.log(`   Slug: ${post.slug}`)
      console.log(`   Published: ${post.published}`)
      console.log(`   URL: http://localhost:3001/blog/${post.slug}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

// Run the slug check
getAllBlogSlugs()