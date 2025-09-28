export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          long_description: string | null
          technologies: string[]
          image_url: string | null
          live_url: string | null
          github_url: string | null
          category: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          long_description?: string | null
          technologies: string[]
          image_url?: string | null
          live_url?: string | null
          github_url?: string | null
          category?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          long_description?: string | null
          technologies?: string[]
          image_url?: string | null
          live_url?: string | null
          github_url?: string | null
          category?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          author: string
          tags: string[]
          published: boolean
          featured: boolean
          reading_time: number | null
          views: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          author: string
          tags?: string[]
          published?: boolean
          featured?: boolean
          reading_time?: number | null
          views?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          author?: string
          tags?: string[]
          published?: boolean
          featured?: boolean
          reading_time?: number | null
          views?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          status: 'unread' | 'read' | 'replied'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          status?: 'unread' | 'read' | 'replied'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          status?: 'unread' | 'read' | 'replied'
          created_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          event_type: string
          data: Record<string, any> | null
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          data?: Record<string, any> | null
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          data?: Record<string, any> | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Type helpers
export type Project = Database['public']['Tables']['projects']['Row']
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type Contact = Database['public']['Tables']['contacts']['Row']
export type Analytics = Database['public']['Tables']['analytics']['Row']