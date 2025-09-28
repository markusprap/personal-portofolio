-- ============================================
-- PORTFOLIO WEBSITE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Create projects table
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

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'contact_form', 'project_click', 'download', 'external_link')),
  page TEXT NOT NULL,
  metadata JSONB,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================

-- Blog posts indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);

-- Contacts indexes
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Analytics indexes
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_page ON analytics(page);
CREATE INDEX idx_analytics_timestamp ON analytics(timestamp DESC);

-- ============================================
-- CREATE UPDATED_AT TRIGGER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Public can read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can modify projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Blog posts policies
CREATE POLICY "Public can read published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can modify blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Contacts policies
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read contacts" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contacts" ON contacts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Analytics policies
CREATE POLICY "Anyone can insert analytics" ON analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read analytics" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Sample projects
INSERT INTO projects (title, description, long_description, technologies, image_url, category, featured) VALUES
(
  'E-Commerce Platform',
  'Modern e-commerce solution with React and Node.js',
  'A comprehensive e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing with Stripe, inventory management, order tracking, and a complete admin dashboard for managing products, orders, and customers.',
  '{"React", "Node.js", "PostgreSQL", "Stripe", "JWT", "Express.js", "Tailwind CSS"}',
  '/modern-ecommerce-interface.png',
  'Web Development',
  true
),
(
  'Task Management Dashboard',
  'Collaborative task management tool with real-time updates',
  'A modern task management application featuring real-time collaboration, drag-and-drop interface, team workspaces, deadline tracking, file attachments, and comprehensive reporting. Built with Vue.js frontend and Express.js backend with Socket.io for real-time features.',
  '{"Vue.js", "Express.js", "MongoDB", "Socket.io", "JWT", "Vuex", "Chart.js"}',
  '/task-management-dashboard.png',
  'Web Development',
  true
),
(
  'Weather Dashboard',
  'Real-time weather monitoring application',
  'A responsive weather dashboard providing real-time weather data, 7-day forecasts, weather alerts, and historical data visualization. Features location-based weather, favorite locations, weather maps, and severe weather notifications using OpenWeather API.',
  '{"React", "TypeScript", "OpenWeather API", "Chart.js", "Tailwind CSS", "PWA"}',
  '/weather-dashboard-interface.png',
  'Web Development',
  false
),
(
  'Blog CMS Admin',
  'Content management system for bloggers',
  'A full-featured content management system with rich text editor, media management, SEO optimization, draft/publish workflow, comment moderation, analytics dashboard, and multi-author support. Built with Next.js and headless CMS architecture.',
  '{"Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Rich Text Editor"}',
  '/blog-cms-admin-interface.jpg',
  'Web Development',
  true
),
(
  'Real Estate Website',  
  'Property listing and management platform',
  'A comprehensive real estate platform featuring property listings, advanced search filters, virtual tours, mortgage calculator, agent profiles, lead management, and CRM integration. Mobile-optimized with map integration and property comparison tools.',
  '{"React", "Next.js", "PostgreSQL", "Google Maps API", "Stripe", "AWS S3"}',
  '/real-estate-website-interface.png',
  'Web Development',
  false
),
(
  'API Gateway Architecture',
  'Microservices API gateway solution',
  'A scalable API gateway built with Go, featuring request routing, load balancing, authentication, rate limiting, monitoring, and service discovery. Includes comprehensive logging, metrics collection, and health checking for microservices architecture.',
  '{"Go", "Docker", "Kubernetes", "Redis", "PostgreSQL", "Prometheus", "Grafana"}',
  '/api-gateway-architecture.png',
  'Backend Development',
  true
);

-- Sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, published, featured, tags, reading_time) VALUES
(
  'Getting Started with Next.js 14',
  'getting-started-nextjs-14',
  'Learn the fundamentals of Next.js 14 and explore its powerful new features including the App Router, Server Components, and improved performance optimizations.',
  'Next.js 14 introduces several exciting features that make building React applications even more powerful and efficient. In this comprehensive guide, we''ll explore the App Router, Server Components, and the new streaming capabilities.

## What''s New in Next.js 14

The latest version of Next.js brings significant improvements in performance, developer experience, and new features that make full-stack React development more enjoyable.

### App Router
The App Router is now stable and provides a more intuitive way to structure your applications. It supports:
- Nested routing
- Server Components by default
- Streaming and Suspense
- Built-in loading states

### Server Components
Server Components allow you to render components on the server, reducing the JavaScript bundle size sent to the client and improving performance.

### Turbopack (Beta)
Next.js 14 includes Turbopack in beta, which provides up to 53% faster local iteration and 94% faster startup times.

## Getting Started

To create a new Next.js 14 project:

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm run dev
```

## Conclusion

Next.js 14 continues to push the boundaries of what''s possible with React development, making it easier than ever to build fast, scalable web applications.',
  'Markus Prap',
  true,
  true,
  '{"Next.js", "React", "Web Development", "JavaScript", "App Router"}',
  8
),
(
  'Building Scalable APIs with Node.js',
  'building-scalable-apis-nodejs',
  'Best practices for creating robust and scalable API architectures using Node.js, Express, and modern design patterns.',
  'When building APIs for production applications, scalability and maintainability are crucial considerations. This guide covers essential patterns and practices for Node.js API development.

## Architecture Patterns

### MVC Pattern
The Model-View-Controller pattern helps organize your codebase:
- Models: Data structure and business logic
- Views: Response formatting (JSON for APIs)
- Controllers: Request handling and coordination

### Middleware Architecture
Express middleware provides a powerful way to handle cross-cutting concerns:
- Authentication and authorization
- Request logging and monitoring
- Error handling
- Input validation and sanitization

## Database Design

### Connection Pooling
Use connection pooling to efficiently manage database connections:

```javascript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Query Optimization
- Use indexes strategically
- Implement pagination for large datasets
- Consider read replicas for read-heavy workloads

## Security Best Practices

### Input Validation
Always validate and sanitize user input:

```javascript
const { body, validationResult } = require(''express-validator'');

app.post(''/api/users'', [
  body(''email'').isEmail().normalizeEmail(),
  body(''password'').isLength({ min: 8 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

### Rate Limiting
Implement rate limiting to prevent abuse:

```javascript
const rateLimit = require(''express-rate-limit'');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(''/api/'', limiter);
```

## Performance Optimization

### Caching Strategies
- Redis for session storage and caching
- HTTP caching headers
- Application-level caching for expensive operations

### Monitoring and Logging
Implement comprehensive monitoring:
- Application Performance Monitoring (APM)
- Error tracking and alerting
- Request/response logging
- Health check endpoints

## Conclusion

Building scalable APIs requires careful consideration of architecture, security, and performance. By following these best practices, you can create APIs that scale with your application''s growth.',
  'Markus Prap',
  true,
  false,
  '{"Node.js", "API", "Backend", "Express.js", "Database", "Security"}',
  12
),
(
  'Mastering TypeScript: Advanced Patterns and Best Practices',
  'mastering-typescript-advanced-patterns-best-practices',
  'Dive deep into advanced TypeScript patterns, utility types, and best practices for building type-safe applications at scale.',
  'TypeScript has become the de facto standard for building large-scale JavaScript applications. This guide explores advanced patterns and techniques for mastering TypeScript.

## Advanced Type Patterns

### Conditional Types
Conditional types allow you to create types that depend on conditions:

```typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type DataResponse = ApiResponse<User>; // { data: User }
```

### Template Literal Types
Create powerful string manipulation types:

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint<T extends HttpMethod> = `${T} /api/users`;
```

### Mapped Types
Transform existing types systematically:

```typescript
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Optional<User>; // All properties optional
type ReadonlyUser = Readonly<User>; // All properties readonly
```

## Utility Types Mastery

### Built-in Utility Types
TypeScript provides powerful built-in utility types:

```typescript
// Pick specific properties
type UserSummary = Pick<User, "id" | "name">;

// Omit specific properties  
type CreateUserRequest = Omit<User, "id">;

// Make all properties required
type RequiredUser = Required<Partial<User>>;

// Extract union member types
type Status = "pending" | "approved" | "rejected";
type ApprovedStatus = Extract<Status, "approved">; // "approved"
```

### Custom Utility Types
Build your own utility types:

```typescript
// Deep partial type
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Non-nullable type
type NonNullable<T> = T extends null | undefined ? never : T;

// Function parameter types
type Parameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never;
```

## Advanced Patterns

### Builder Pattern with Types
Create type-safe builders:

```typescript
class QueryBuilder<T = {}> {
  private conditions: T = {} as T;

  where<K extends string, V>(
    key: K, 
    value: V
  ): QueryBuilder<T & Record<K, V>> {
    return new QueryBuilder<T & Record<K, V>>();
  }

  build(): T {
    return this.conditions;
  }
}

// Usage with full type safety
const query = new QueryBuilder()
  .where("name", "John")
  .where("age", 30)
  .build(); // Type: { name: string; age: number; }
```

### Discriminated Unions
Create type-safe state machines:

```typescript
type LoadingState = {
  status: "loading";
};

type SuccessState = {
  status: "success";
  data: any;
};

type ErrorState = {
  status: "error";
  error: string;
};

type AsyncState = LoadingState | SuccessState | ErrorState;

function handleState(state: AsyncState) {
  switch (state.status) {
    case "loading":
      // TypeScript knows this is LoadingState
      return "Loading...";
    case "success":
      // TypeScript knows this is SuccessState
      return state.data; // ✅ data is available
    case "error":
      // TypeScript knows this is ErrorState
      return state.error; // ✅ error is available
  }
}
```

## Best Practices

### Strict TypeScript Configuration
Use strict mode for maximum type safety:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Type Assertion Best Practices
Use type assertions carefully:

```typescript
// ❌ Dangerous
const user = data as User;

// ✅ Better with type guards
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === "number" && typeof obj.name === "string";
}

if (isUser(data)) {
  // TypeScript knows data is User
  console.log(data.name);
}
```

### Generic Constraints
Use constraints to make generics more specific:

```typescript
interface Identifiable {
  id: string | number;
}

function updateEntity<T extends Identifiable>(
  entity: T, 
  updates: Partial<T>
): T {
  return { ...entity, ...updates };
}
```

## Conclusion

Mastering these advanced TypeScript patterns will help you build more robust, maintainable, and type-safe applications. The key is to leverage TypeScript''s powerful type system to catch errors at compile time and improve the developer experience.',
  'Markus Prap',
  true,
  true,
  '{"TypeScript", "JavaScript", "Advanced Patterns", "Type Safety", "Web Development"}',
  15
),
(
  'State Management in React: Zustand vs Redux Toolkit',
  'state-management-react-zustand-vs-redux-toolkit',
  'A comprehensive comparison of modern React state management solutions, exploring the pros and cons of Zustand and Redux Toolkit.',
  'State management is crucial for building complex React applications. This guide compares two popular solutions: Zustand and Redux Toolkit.

## Introduction to State Management

Modern React applications often need to share state between components that don''t have a direct parent-child relationship. While React''s built-in useState and useContext can handle simple cases, complex applications benefit from dedicated state management libraries.

## Redux Toolkit Overview

Redux Toolkit is the official, opinionated approach to writing Redux logic. It includes utilities to simplify common Redux patterns.

### Key Features
- **Simplified Store Setup**: configureStore() with good defaults
- **Immutable Updates**: Built-in Immer for immutable state updates
- **Async Logic**: createAsyncThunk for handling async operations
- **DevTools Integration**: Excellent debugging experience

### Example Implementation

```typescript
// store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from ''@reduxjs/toolkit'';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  ''users/fetchUsers'',
  async () => {
    const response = await fetch(''/api/users'');
    return response.json();
  }
);

const userSlice = createSlice({
  name: ''users'',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || ''Failed to fetch users'';
      });
  },
});

export const { addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
```

### Store Configuration

```typescript
// store/index.ts
import { configureStore } from ''@reduxjs/toolkit'';
import userReducer from ''./userSlice'';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Zustand Overview

Zustand is a small, fast, and scalable state management solution with a minimal API.

### Key Features
- **Minimal Boilerplate**: Simple API with less ceremony
- **TypeScript Support**: Excellent TypeScript integration
- **No Providers**: Direct hook usage without context providers
- **Flexible**: Works with any React pattern

### Example Implementation

```typescript
// store/userStore.ts
import { create } from ''zustand'';
import { devtools } from ''zustand/middleware'';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      users: [],
      loading: false,
      error: null,
      
      fetchUsers: async () => {
        set({ loading: true });
        try {
          const response = await fetch(''/api/users'');
          const users = await response.json();
          set({ users, loading: false, error: null });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : ''Failed to fetch users'' 
          });
        }
      },
      
      addUser: (user) => {
        set((state) => ({ users: [...state.users, user] }));
      },
      
      updateUser: (updatedUser) => {
        set((state) => ({
          users: state.users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
          )
        }));
      },
    }),
    { name: ''user-store'' }
  )
);
```

## Usage Comparison

### Redux Toolkit Usage

```typescript
// Component with Redux Toolkit
import { useSelector, useDispatch } from ''react-redux'';
import { RootState, AppDispatch } from ''../store'';
import { fetchUsers, addUser } from ''../store/userSlice'';

function UserList() {
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = (user: User) => {
    dispatch(addUser(user));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Zustand Usage

```typescript
// Component with Zustand
import { useUserStore } from ''../store/userStore'';

function UserList() {
  const { users, loading, error, fetchUsers, addUser } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = (user: User) => {
    addUser(user);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Comparison

### Bundle Size
- **Zustand**: ~2.5KB gzipped
- **Redux Toolkit**: ~12KB gzipped + React-Redux ~5KB

### Learning Curve
- **Zustand**: Minimal learning curve, intuitive API
- **Redux Toolkit**: Steeper learning curve, more concepts to understand

### DevTools
- **Zustand**: Good devtools support with middleware  
- **Redux Toolkit**: Excellent Redux DevTools integration

### TypeScript Support
- **Zustand**: Excellent, minimal setup required
- **Redux Toolkit**: Good, but requires more boilerplate

### Performance
- **Zustand**: Automatic optimization, selective subscriptions
- **Redux Toolkit**: Requires manual optimization with selectors

## When to Choose What?

### Choose Zustand When:
- Building small to medium applications
- Want minimal boilerplate and setup
- Team prefers simple, intuitive APIs
- Bundle size is a primary concern
- Don''t need complex middleware or time-travel debugging

### Choose Redux Toolkit When:
- Building large, complex applications
- Need predictable state updates and debugging
- Team is familiar with Redux patterns
- Require extensive middleware ecosystem
- Need advanced debugging capabilities
- Working with legacy Redux code

## Conclusion

Both Zustand and Redux Toolkit are excellent choices for React state management. Zustand excels in simplicity and ease of use, while Redux Toolkit provides more structure and tooling for complex applications. Your choice should depend on project requirements, team expertise, and long-term maintenance considerations.',
  'Markus Prap',
  true,
  false,
  '{"React", "State Management", "Zustand", "Redux", "JavaScript", "TypeScript"}',
  18
),
(
  'Building a Modern Portfolio with Next.js 14 and TypeScript',
  'building-modern-portfolio-nextjs-14-typescript',
  'Step-by-step guide to creating a professional portfolio website using Next.js 14, TypeScript, Tailwind CSS, and modern web development practices.',
  'Creating a professional portfolio is essential for showcasing your skills and attracting opportunities. This guide walks through building a modern portfolio using Next.js 14 and TypeScript.

## Project Setup

### Initial Setup
Start by creating a new Next.js project with TypeScript:

```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app
cd portfolio
npm install
```

### Essential Dependencies
Add additional packages for enhanced functionality:

```bash
npm install framer-motion lucide-react @radix-ui/react-navigation-menu
npm install -D @tailwindcss/typography
```

## Project Structure

Organize your project with a clean, scalable structure:

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   ├── projects/
│   └── blog/
├── components/
│   ├── ui/
│   ├── sections/
│   └── layout/
├── lib/
│   ├── utils.ts
│   └── data.ts
└── types/
    └── index.ts
```

## Design System

### Color Palette
Define a cohesive color system:

```css
/* globals.css */
:root {
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-900: #1e3a8a;
  
  --gray-50: #f9fafb;
  --gray-500: #6b7280;
  --gray-900: #111827;
}

.dark {
  --primary-500: #60a5fa;
  --gray-50: #111827;
  --gray-900: #f9fafb;
}
```

### Typography System
Use Tailwind''s typography plugin for consistent text styling:

```tsx
// components/ui/Typography.tsx
import { cn } from "@/lib/utils";

interface TypographyProps {
  variant: "h1" | "h2" | "h3" | "body" | "caption";
  children: React.ReactNode;
  className?: string;
}

const typographyVariants = {
  h1: "text-4xl md:text-6xl font-bold tracking-tight",
  h2: "text-3xl md:text-4xl font-semibold tracking-tight",
  h3: "text-2xl md:text-3xl font-semibold",
  body: "text-base md:text-lg leading-relaxed",
  caption: "text-sm text-gray-600 dark:text-gray-400",
};

export function Typography({ variant, children, className }: TypographyProps) {
  const Component = variant.startsWith("h") ? variant as "h1" : "p";
  
  return (
    <Component 
      className={cn(typographyVariants[variant], className)}
    >
      {children}
    </Component>
  );
}
```

## Core Components

### Hero Section
Create an impactful hero section:

```tsx
// components/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h1" className="mb-6">
            Hi, I''m{" "}
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              Your Name
            </span>
          </Typography>
          
          <Typography variant="body" className="mb-8 max-w-2xl mx-auto">
            Full-stack developer passionate about creating exceptional digital 
            experiences with modern web technologies.
          </Typography>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              View My Work
            </Button>
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### Project Showcase
Display your projects effectively:

```tsx
// components/sections/ProjectsSection.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    image: "/project-1.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/project",
  },
  // More projects...
];

export function ProjectsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Typography variant="h2" className="text-center mb-12">
          Featured Projects
        </Typography>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <Typography variant="h3" className="mb-2">
                  {project.title}
                </Typography>
                
                <Typography variant="body" className="mb-4 text-gray-600">
                  {project.description}
                </Typography>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
                    >
                      <Github size={16} />
                      Code
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Performance Optimization

### Image Optimization
Use Next.js Image component for optimal performance:

```tsx
import Image from "next/image";

// Optimized image with proper sizing
<Image
  src="/profile.jpg"
  alt="Profile picture"
  width={400}
  height={400}
  className="rounded-full"
  priority // For above-the-fold images
/>
```

### Font Optimization
Use next/font for optimized font loading:

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

## SEO and Metadata

### Dynamic Metadata
Implement proper SEO with Next.js metadata:

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Your Name - Full Stack Developer",
    template: "%s | Your Name",
  },
  description: "Portfolio of a passionate full-stack developer specializing in modern web technologies.",
  keywords: ["developer", "portfolio", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    siteName: "Your Name Portfolio",
    title: "Your Name - Full Stack Developer",
    description: "Portfolio showcasing modern web development projects",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Name Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Full Stack Developer",
    description: "Portfolio showcasing modern web development projects",
    images: ["/og-image.jpg"],
  },
};
```

## Deployment

### Vercel Deployment
Deploy your portfolio to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Configuration
Set up environment variables for different stages:

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://yoursite.com
CONTACT_EMAIL=your@email.com
```

## Best Practices

### Performance
- Use Server Components where possible
- Implement proper lazy loading
- Optimize images and fonts
- Minimize client-side JavaScript

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios

### Code Quality
- Use TypeScript for type safety
- Implement ESLint and Prettier
- Write meaningful commit messages
- Use consistent naming conventions

## Conclusion

Building a modern portfolio with Next.js 14 and TypeScript provides excellent performance, SEO, and developer experience. Focus on showcasing your best work, maintaining clean code, and ensuring great user experience across all devices.',
  'Markus Prap',
  true,
  true,
  '{"Next.js", "TypeScript", "Portfolio", "Web Development", "React", "Tailwind CSS"}',
  20
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if all tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check sample data
SELECT COUNT(*) as project_count FROM projects;
SELECT COUNT(*) as blog_count FROM blog_posts;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';

-- Success message
SELECT 'Database schema created successfully! 🎉' as status;