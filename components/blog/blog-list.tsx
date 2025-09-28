import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getBlogPosts } from "@/lib/supabase/blog"

interface BlogListProps {
  posts?: any[]
}

export async function BlogList({ posts }: BlogListProps) {
  // If posts not provided as props, fetch from Supabase
  const blogPosts = posts || await getBlogPosts()
  
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="space-y-12">
      {/* Featured Post */}
      {featuredPost && (
        <div className="border-b border-border pb-12">
          <div className="mb-4">
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              Featured
            </Badge>
          </div>
                    <Link key={featuredPost.id} href={`/blog/${featuredPost.slug}`} className="group">
            <article className="relative overflow-hidden rounded-xl">
              <div className="aspect-[2/1] overflow-hidden bg-muted">
                <Image
                  src="/placeholder.svg"
                  alt={featuredPost.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8 space-y-4">
                <h2 className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors text-balance">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {featuredPost.excerpt || "No excerpt available."}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(featuredPost.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {featuredPost.reading_time || 5} min read
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags?.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        </div>
      )}

      {/* Regular Posts */}
      <div className="space-y-8">
                {regularPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <article className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="md:col-span-1">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src="/placeholder.svg"
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-3">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors text-balance">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {post.excerpt || "No excerpt available."}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.reading_time || 5} min read
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.slice(0, 3).map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
