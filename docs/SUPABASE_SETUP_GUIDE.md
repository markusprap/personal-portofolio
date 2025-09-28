# Supabase Database Setup Instructions

## Step 1: Create New Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose organization (or create new one)
4. Fill project details:
   - **Name**: portfolio-website
   - **Database Password**: Generate secure password
   - **Region**: Choose closest to your location
5. Click "Create new project"
6. Wait for project to be ready (2-3 minutes)

## Step 2: Get Project Credentials

1. Go to **Settings > API**
2. Copy these values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon/public key** (starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
   - **service_role key** (starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)

## Step 3: Create Environment File

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 4: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire SQL schema from `docs/SUPABASE_SCHEMA.md`
4. Click "Run" to execute
5. Verify all tables are created in **Database > Tables**

## Step 5: Insert Sample Data

In SQL Editor, run the sample data queries from the schema file:

```sql
-- Projects Sample Data
INSERT INTO projects (title, description, long_description, technologies, image_url, category, featured) VALUES
('E-Commerce Platform', 'Modern e-commerce solution with React and Node.js', 'A comprehensive e-commerce platform...', '{"React", "Node.js", "PostgreSQL", "Stripe", "JWT"}', '/modern-ecommerce-interface.png', 'Web Development', true);

-- Blog Posts Sample Data
INSERT INTO blog_posts (title, slug, excerpt, content, author, published, featured, tags, reading_time) VALUES
('Getting Started with Next.js 14', 'getting-started-nextjs-14', 'Learn the fundamentals...', 'Content here...', 'Markus Prap', true, true, '{"Next.js", "React", "Web Development"}', 8);
```

## Step 6: Test Connection

1. Start your Next.js development server: `npm run dev`
2. Check browser console for any connection errors
3. Test CRUD operations work properly

## Quick Setup Commands

```bash
# Create environment file
cp .env.example .env.local

# Edit with your Supabase credentials
nano .env.local

# Test the connection
npm run dev
```

## Troubleshooting

- **Connection Error**: Check URL and keys are correct
- **RLS Policies**: Make sure Row Level Security policies are created
- **CORS Issues**: Add your domain to Supabase allowed origins
- **Environment Variables**: Restart dev server after adding .env.local

## Next Steps After Setup

1. ✅ Database schema created
2. ✅ Sample data inserted
3. ✅ Environment configured
4. 🚀 Ready to integrate with components!

The Supabase backend is now ready for your portfolio website! 🎉