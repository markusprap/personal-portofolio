import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Rss } from "lucide-react"

const popularTags = [
  "React",
  "Next.js",
  "JavaScript",
  "Node.js",
  "Go",
  "PHP",
  "Laravel",
  "Python",
  "Database",
  "API",
  "Microservices",
  "Docker",
  "AWS",
  "Performance",
]

const recentPosts = [
  {
    title: "Building Scalable React Applications with Next.js 15",
    date: "Jan 15, 2024",
  },
  {
    title: "Microservices Architecture with Go and Docker",
    date: "Jan 10, 2024",
  },
  {
    title: "Modern PHP Development with Laravel 11",
    date: "Jan 5, 2024",
  },
]

export function BlogSidebar() {
  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I am a passionate fullstack developer who loves modern web technologies. In this blog, I
            share experiences, tutorials, and insights about development.
          </p>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={index} className="space-y-1">
                <h4 className="text-sm font-medium text-foreground hover:text-accent transition-colors cursor-pointer line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-muted-foreground">{post.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Rss size={18} />
            Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe untuk mendapatkan artikel terbaru langsung di email Anda.
          </p>
          <div className="space-y-3">
            <Input placeholder="Your email address" type="email" />
            <Button className="w-full" size="sm">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
