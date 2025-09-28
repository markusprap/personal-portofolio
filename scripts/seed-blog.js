require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const sampleBlogPosts = [
  {
    title: "Building Modern Web Applications with Next.js 14",
    slug: "nextjs-14-guide",
    content: `Next.js 14 brings exciting new features that make building modern web applications easier than ever. In this comprehensive guide, we'll explore the latest updates and how to leverage them in your projects.

## Key Features

1. **App Router**: The new App Router provides a more intuitive way to structure your application
2. **Server Components**: Render components on the server for better performance
3. **Streaming**: Improve loading times with streaming support
4. **Improved TypeScript Support**: Better type safety and developer experience

## Getting Started

To create a new Next.js 14 project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Conclusion

Next.js 14 is a powerful framework that continues to evolve with the needs of modern web development.`,
    excerpt: "A comprehensive guide to building modern web applications with Next.js 14 and its latest features.",
    author: "Markus Prap Kurniawan",
    category: "Web Development",
    tags: ["nextjs", "react", "web-development", "javascript"],
    published: true,
    featured: true,
    reading_time: 5
  },
  {
    title: "Mastering React Hooks: Advanced Patterns",
    slug: "react-hooks-advanced-patterns",
    content: `React Hooks revolutionized how we write React components. Let's explore advanced patterns that can elevate your React development skills.

## Custom Hooks

Custom hooks allow you to extract component logic into reusable functions:

\`\`\`javascript
function useApi(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [url])
  
  return { data, loading }
}
\`\`\`

## useCallback and useMemo

These hooks help optimize performance by memoizing values and functions.

## Conclusion

Mastering React Hooks opens up new possibilities for creating clean, efficient components.`,
    excerpt: "Learn advanced React Hooks patterns to write more efficient and reusable components.",
    author: "Markus Prap Kurniawan",
    category: "React",
    tags: ["react", "hooks", "javascript", "performance"],
    published: true,
    featured: false,
    reading_time: 8
  },
  {
    title: "Full-Stack Development with Supabase",
    slug: "fullstack-supabase-guide",
    content: `Supabase is an excellent alternative to Firebase that provides a complete backend-as-a-service solution. Let's build a full-stack application with Supabase.

## What is Supabase?

Supabase provides:
- PostgreSQL database
- Authentication
- Real-time subscriptions
- Storage
- Edge Functions

## Setting Up Your Project

1. Create a new Supabase project
2. Set up your database schema
3. Configure authentication
4. Connect your frontend

## Database Setup

\`\`\`sql
CREATE TABLE posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp DEFAULT now()
);
\`\`\`

## Frontend Integration

Using the Supabase JavaScript client is straightforward:

\`\`\`javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)
\`\`\`

## Conclusion

Supabase makes full-stack development accessible and enjoyable for developers of all levels.`,
    excerpt: "A complete guide to building full-stack applications using Supabase as your backend service.",
    author: "Markus Prap Kurniawan",
    category: "Backend",
    tags: ["supabase", "fullstack", "postgresql", "backend"],
    published: true,
    featured: true,
    reading_time: 12
  }
]

async function seedBlogPosts() {
  console.log('Starting blog posts seeding...')
  
  try {
    // First, check if any blog posts already exist
    const { data: existingPosts, error: checkError } = await supabase
      .from('blog_posts')
      .select('slug')
    
    if (checkError) {
      console.error('Error checking existing posts:', checkError)
      return
    }
    
    console.log(`Found ${existingPosts?.length || 0} existing blog posts`)
    
    // Filter out posts that already exist
    const existingSlugs = existingPosts?.map(post => post.slug) || []
    const newPosts = sampleBlogPosts.filter(post => !existingSlugs.includes(post.slug))
    
    if (newPosts.length === 0) {
      console.log('All sample blog posts already exist!')
      return
    }
    
    // Insert new blog posts
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(newPosts)
      .select()
    
    if (error) {
      console.error('Error inserting blog posts:', error)
      return
    }
    
    console.log(`Successfully inserted ${data?.length || 0} blog posts:`)
    data?.forEach(post => {
      console.log(`- ${post.title} (${post.slug})`)
    })
    
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

// Run the seeding function
seedBlogPosts()