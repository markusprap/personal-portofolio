require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkSchema() {
  console.log('Checking database schema...')
  
  try {
    // Check blog_posts structure by trying to fetch with all possible columns
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Error fetching blog posts:', error)
    } else {
      console.log('Blog posts sample data:', data)
      if (data && data.length > 0) {
        console.log('Available columns:', Object.keys(data[0]))
      } else {
        console.log('No blog posts found')
      }
    }
    
    // Check projects structure
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .limit(1)
    
    if (projectError) {
      console.error('Error fetching projects:', projectError)
    } else {
      console.log('Projects sample data:', projectData)
      if (projectData && projectData.length > 0) {
        console.log('Projects columns:', Object.keys(projectData[0]))
      }
    }
    
    // Check contacts structure
    const { data: contactData, error: contactError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1)
    
    if (contactError) {
      console.error('Error fetching contacts:', contactError)
    } else {
      console.log('Contacts sample data:', contactData)
      if (contactData && contactData.length > 0) {
        console.log('Contacts columns:', Object.keys(contactData[0]))
      }
    }
    
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

// Run the schema check
checkSchema()