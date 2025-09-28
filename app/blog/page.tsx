import { Navigation } from "@/components/navigation"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogList } from "@/components/blog/blog-list"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { getBlogPosts } from "@/lib/supabase/blog"

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24">
        <BlogHeader />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <BlogList posts={posts} />
            </div>
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
