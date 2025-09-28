# Supabase Database Schema

This document outlines the database schema for the portfolio website using Supabase PostgreSQL.

## Tables

### 1. Projects
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[] NOT NULL,
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Blog Posts
```sql
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);

-- Create updated_at trigger
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. Contacts
```sql
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for efficient querying
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
```

### 4. Analytics
```sql
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'contact_form', 'project_click', 'download', 'external_link')),
  page TEXT NOT NULL,
  metadata JSONB,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_page ON analytics(page);
CREATE INDEX idx_analytics_timestamp ON analytics(timestamp DESC);
```

## Row Level Security (RLS)

### Projects Table
```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published projects
CREATE POLICY "Public can read projects" ON projects
  FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can modify projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');
```

### Blog Posts Table
```sql
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public can read published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can modify blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');
```

### Contacts Table
```sql
-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can insert contacts (contact form submissions)
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can read/update contacts
CREATE POLICY "Authenticated users can read contacts" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contacts" ON contacts
  FOR UPDATE USING (auth.role() = 'authenticated');
```

### Analytics Table
```sql
-- Enable RLS
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Anyone can insert analytics events
CREATE POLICY "Anyone can insert analytics" ON analytics
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can read analytics
CREATE POLICY "Authenticated users can read analytics" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Sample Data

### Projects Sample Data
```sql
INSERT INTO projects (title, description, long_description, technologies, image_url, category, featured) VALUES
('E-Commerce Platform', 'Modern e-commerce solution with React and Node.js', 'A comprehensive e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.', '{"React", "Node.js", "PostgreSQL", "Stripe", "JWT"}', '/modern-ecommerce-interface.png', 'Web Development', true),
('Task Management Dashboard', 'Collaborative task management tool', 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.', '{"Vue.js", "Express.js", "MongoDB", "Socket.io", "JWT"}', '/task-management-dashboard.png', 'Web Development', true),
('Weather Dashboard', 'Real-time weather monitoring application', 'A responsive weather dashboard that provides real-time weather data, forecasts, and weather alerts for multiple locations worldwide.', '{"React", "TypeScript", "OpenWeather API", "Chart.js"}', '/weather-dashboard-interface.png', 'Web Development', false);
```

### Blog Posts Sample Data
```sql
INSERT INTO blog_posts (title, slug, excerpt, content, author, published, featured, tags, reading_time) VALUES
('Getting Started with Next.js 14', 'getting-started-nextjs-14', 'Learn the fundamentals of Next.js 14 and its new features', 'Next.js 14 introduces several exciting features that make building React applications even more powerful and efficient...', 'Markus Prap', true, true, '{"Next.js", "React", "Web Development"}', 8),
('Building Scalable APIs with Node.js', 'building-scalable-apis-nodejs', 'Best practices for creating robust and scalable API architectures', 'When building APIs for production applications, scalability and maintainability are crucial considerations...', 'Markus Prap', true, false, '{"Node.js", "API", "Backend"}', 12);
```

## Environment Variables

Make sure to set these environment variables in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Usage Instructions

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL commands above to create the tables and policies
4. Insert the sample data if desired
5. Update your environment variables
6. Your application should now be connected to Supabase!