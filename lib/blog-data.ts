export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: string
  updatedAt?: string
  readingTime: number // minutes
  tags: string[]
  category: string
  featured: boolean
  coverImage: string
  views?: number
  likes?: number
  status: 'draft' | 'published' | 'archived'
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  count: number
  color: string
}

// Sample blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Modern Portfolio Website with Next.js 14 and TypeScript",
    slug: "building-modern-portfolio-nextjs-14-typescript",
    excerpt: "Learn how to create a stunning portfolio website using the latest Next.js 14 features, TypeScript, and modern UI components with Shadcn/ui.",
    content: `
# Building a Modern Portfolio Website with Next.js 14 and TypeScript

In this comprehensive guide, we'll explore how to build a professional portfolio website using Next.js 14, TypeScript, and modern web technologies.

## Why Next.js 14?

Next.js 14 brings several exciting features:
- **App Router**: A new paradigm for building React applications
- **Server Components**: Improved performance and SEO
- **Turbopack**: Lightning-fast bundling and hot reload
- **Enhanced Image Optimization**: Better performance and user experience

## Tech Stack Overview

Our portfolio website will use:
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Hook Form** for form handling
- **Next-themes** for dark/light mode

## Project Structure

\`\`\`
app/
├── globals.css
├── layout.tsx
├── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── projects/
    └── page.tsx

components/
├── ui/
├── blog/
├── navigation.tsx
├── hero-section.tsx
└── ...
\`\`\`

## Implementation Steps

### 1. Setting up the Project

\`\`\`bash
npx create-next-app@latest portfolio-website --typescript --tailwind --eslint --app
cd portfolio-website
\`\`\`

### 2. Installing Dependencies

\`\`\`bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react next-themes
npm install react-hook-form @hookform/resolvers zod
\`\`\`

### 3. Creating the Layout

The layout component serves as the foundation for all pages:

\`\`\`tsx
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
\`\`\`

## Best Practices

1. **Component Organization**: Keep components modular and reusable
2. **Type Safety**: Use TypeScript interfaces for all data structures
3. **Performance**: Optimize images and use Server Components where possible
4. **Accessibility**: Ensure proper semantic HTML and ARIA attributes
5. **SEO**: Use proper meta tags and structured data

## Conclusion

Building a modern portfolio website with Next.js 14 provides excellent performance, developer experience, and maintainability. The combination of TypeScript, Tailwind CSS, and Shadcn/ui creates a robust foundation for any professional portfolio.

Ready to start building? Check out the complete source code and follow along with the tutorial series!
    `,
    author: {
      name: "Alex Thompson",
      avatar: "/placeholder-user.jpg",
      bio: "Full-stack developer passionate about modern web technologies and clean code architecture."
    },
    publishedAt: "2024-01-15",
    readingTime: 12,
    tags: ["Next.js", "TypeScript", "React", "Portfolio", "Web Development"],
    category: "Tutorial",
    featured: true,
    coverImage: "/placeholder.jpg",
    views: 1250,
    likes: 89,
    status: "published"
  },
  {
    id: "2",
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    slug: "mastering-typescript-advanced-patterns-best-practices",
    excerpt: "Dive deep into advanced TypeScript patterns, utility types, and best practices for building scalable applications.",
    content: `
# Mastering TypeScript: Advanced Patterns and Best Practices

TypeScript has become an essential tool for modern JavaScript development. In this article, we'll explore advanced patterns and best practices.

## Advanced Type Patterns

### 1. Conditional Types

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T }
\`\`\`

### 2. Mapped Types

\`\`\`typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}
\`\`\`

### 3. Template Literal Types

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`
\`\`\`

## Best Practices

1. Use strict mode
2. Prefer interfaces over types for object shapes
3. Use utility types effectively
4. Implement proper error handling

## Conclusion

These advanced TypeScript patterns will help you write more robust and maintainable code.
    `,
    author: {
      name: "Alex Thompson",
      avatar: "/placeholder-user.jpg",
      bio: "Full-stack developer passionate about modern web technologies and clean code architecture."
    },
    publishedAt: "2024-01-10",
    readingTime: 8,
    tags: ["TypeScript", "JavaScript", "Programming", "Best Practices"],
    category: "Tutorial",
    featured: false,
    coverImage: "/placeholder.jpg",
    views: 892,
    likes: 67,
    status: "published"
  },
  {
    id: "3",
    title: "State Management in React: Zustand vs Redux Toolkit",
    slug: "state-management-react-zustand-vs-redux-toolkit",
    excerpt: "A comprehensive comparison of modern state management solutions for React applications, including performance benchmarks and use cases.",
    content: `
# State Management in React: Zustand vs Redux Toolkit

Choosing the right state management solution is crucial for React applications. Let's compare two popular options.

## Zustand: Simple and Lightweight

\`\`\`typescript
import { create } from 'zustand'

interface TodoStore {
  todos: Todo[]
  addTodo: (todo: Todo) => void
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ 
    todos: [...state.todos, todo] 
  }))
}))
\`\`\`

## Redux Toolkit: Powerful and Feature-Rich

\`\`\`typescript
import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    }
  }
})
\`\`\`

## When to Use Which?

- **Zustand**: Small to medium apps, simple state
- **Redux Toolkit**: Large apps, complex state, time-travel debugging

Both are excellent choices depending on your needs!
    `,
    author: {
      name: "Alex Thompson",
      avatar: "/placeholder-user.jpg",
      bio: "Full-stack developer passionate about modern web technologies and clean code architecture."
    },
    publishedAt: "2024-01-05",
    readingTime: 6,
    tags: ["React", "State Management", "Zustand", "Redux", "JavaScript"],
    category: "Comparison",
    featured: true,
    coverImage: "/placeholder.jpg",
    views: 1100,
    likes: 78,
    status: "published"
  }
]

export const blogCategories: BlogCategory[] = [
  {
    id: "1",
    name: "Tutorial",
    slug: "tutorial",
    description: "Step-by-step guides and tutorials",
    count: 2,
    color: "blue"
  },
  {
    id: "2", 
    name: "Comparison",
    slug: "comparison",
    description: "Technology comparisons and analysis",
    count: 1,
    color: "green"
  },
  {
    id: "3",
    name: "Best Practices",
    slug: "best-practices", 
    description: "Tips and best practices for development",
    count: 0,
    color: "purple"
  },
  {
    id: "4",
    name: "Case Study",
    slug: "case-study",
    description: "Real-world project case studies",
    count: 0,
    color: "orange"
  }
]

// Utility functions
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured)
export const getPostsByCategory = (categorySlug: string) => 
  blogPosts.filter(post => post.category.toLowerCase().replace(' ', '-') === categorySlug)
export const getPostBySlug = (slug: string) => 
  blogPosts.find(post => post.slug === slug)
export const getAllTags = () => Array.from(new Set(blogPosts.flatMap(post => post.tags)))
export const getRelatedPosts = (currentPost: BlogPost, limit = 3) => 
  blogPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => post.tags.some(tag => currentPost.tags.includes(tag)))
    .slice(0, limit)