"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { LuTrendingUp, LuFileText, LuFolderOpen, LuMail, LuPlus, LuSettings, LuUsers, LuSave, LuLoader } from "react-icons/lu"

interface AdminDashboardProps {
  stats: {
    projects: number
    blogPosts: number
    contacts: number
    totalViews: number
  }
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState<any[]>([])
  
  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    long_description: '',
    technologies: '',
    live_url: '',
    github_url: '',
    category: '',
    featured: false
  })
  
  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: 'Markus Prap Kurniawan',
    tags: '',
    published: true,
    featured: false
  })
  
  // Load contacts when component mounts
  useEffect(() => {
    if (activeTab === 'contacts') {
      loadContacts()
    }
  }, [activeTab])
  
  const loadContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts')
      const data = await response.json()
      setContacts(data.contacts || [])
    } catch (error) {
      console.error('Error loading contacts:', error)
    }
  }
  
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectForm,
          technologies: projectForm.technologies.split(',').map(t => t.trim())
        })
      })
      
      if (response.ok) {
        toast.success('Project added successfully!')
        setProjectForm({
          title: '',
          description: '',
          long_description: '',
          technologies: '',
          live_url: '',
          github_url: '',
          category: '',
          featured: false
        })
      } else {
        toast.error('Failed to add project')
      }
    } catch (error) {
      toast.error('Error adding project')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleAddBlogPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blogForm,
          tags: blogForm.tags.split(',').map(t => t.trim())
        })
      })
      
      if (response.ok) {
        toast.success('Blog post added successfully!')
        setBlogForm({
          title: '',
          slug: '',
          content: '',
          excerpt: '',
          author: 'Markus Prap Kurniawan',
          tags: '',
          published: true,
          featured: false
        })
      } else {
        toast.error('Failed to add blog post')
      }
    } catch (error) {
      toast.error('Error adding blog post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio content and analytics</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/">
              View Portfolio
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://upldtggpuyxzsqxipkki.supabase.co/project/default" target="_blank">
              Open Supabase
            </Link>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <LuFolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.projects}</div>
                <p className="text-xs text-muted-foreground">Portfolio projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                <LuFileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.blogPosts}</div>
                <p className="text-xs text-muted-foreground">Published articles</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <LuTrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalViews}</div>
                <p className="text-xs text-muted-foreground">Blog post views</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                <LuMail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.contacts}</div>
                <p className="text-xs text-muted-foreground">From contact form</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="h-auto p-4">
                  <Link href="https://upldtggpuyxzsqxipkki.supabase.co/project/default/editor" target="_blank" className="flex flex-col items-center space-y-2">
                    <LuPlus className="h-6 w-6" />
                    <span>Add New Project</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-auto p-4">
                  <Link href="https://upldtggpuyxzsqxipkki.supabase.co/project/default/editor" target="_blank" className="flex flex-col items-center space-y-2">
                    <LuFileText className="h-6 w-6" />
                    <span>Write Blog Post</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-auto p-4">
                  <Link href="https://upldtggpuyxzsqxipkki.supabase.co/project/default/editor" target="_blank" className="flex flex-col items-center space-y-2">
                    <LuMail className="h-6 w-6" />
                    <span>View Messages</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Content Management Instructions</CardTitle>
              <CardDescription>How to manage your portfolio content using Supabase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary">1</Badge>
                  <div>
                    <h4 className="font-medium">Projects Management</h4>
                    <p className="text-sm text-muted-foreground">Go to Supabase → Table Editor → projects table to add, edit, or delete projects</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary">2</Badge>
                  <div>
                    <h4 className="font-medium">Blog Posts</h4>
                    <p className="text-sm text-muted-foreground">Use blog_posts table to manage articles. Set published=true to make them visible</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary">3</Badge>
                  <div>
                    <h4 className="font-medium">Contact Messages</h4>
                    <p className="text-sm text-muted-foreground">Check contacts table for form submissions. Update status to track responses</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
              <CardDescription>Add a new project to your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                      placeholder="Web Development, Mobile App, etc."
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="long_description">Detailed Description</Label>
                  <Textarea
                    id="long_description"
                    value={projectForm.long_description}
                    onChange={(e) => setProjectForm({...projectForm, long_description: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="technologies">Technologies (comma-separated) *</Label>
                  <Input
                    id="technologies"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                    placeholder="React, Node.js, PostgreSQL, Docker"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="live_url">Live Demo URL</Label>
                    <Input
                      id="live_url"
                      type="url"
                      value={projectForm.live_url}
                      onChange={(e) => setProjectForm({...projectForm, live_url: e.target.value})}
                      placeholder="https://myproject.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github_url">GitHub URL</Label>
                    <Input
                      id="github_url"
                      type="url"
                      value={projectForm.github_url}
                      onChange={(e) => setProjectForm({...projectForm, github_url: e.target.value})}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
                
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <LuSave className="mr-2 h-4 w-4" />
                      Add Project
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Write New Blog Post</CardTitle>
              <CardDescription>Create a new blog post for your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBlogPost} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="blog-title">Post Title *</Label>
                    <Input
                      id="blog-title"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})}
                      placeholder="my-blog-post-title"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                    placeholder="Brief description of your blog post"
                    rows={2}
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                    placeholder="Write your blog post content here..."
                    rows={12}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
                      placeholder="React, JavaScript, Tutorial"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={blogForm.published}
                      onChange={(e) => setBlogForm({...blogForm, published: e.target.checked})}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="blog-featured"
                      checked={blogForm.featured}
                      onChange={(e) => setBlogForm({...blogForm, featured: e.target.checked})}
                    />
                    <Label htmlFor="blog-featured">Featured post</Label>
                  </div>
                </div>
                
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <LuSave className="mr-2 h-4 w-4" />
                      Publish Post
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages ({contacts.length})</CardTitle>
              <CardDescription>View and respond to contact form submissions</CardDescription>
              <Button onClick={loadContacts} variant="outline" size="sm">
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <div className="text-center py-8">
                  <LuMail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Messages Yet</h3>
                  <p className="text-muted-foreground">
                    Contact form submissions will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <Card key={contact.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={contact.status === 'unread' ? 'destructive' : 'secondary'}>
                            {contact.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {contact.subject && (
                        <p className="text-sm font-medium mb-2">Subject: {contact.subject}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{contact.message}</p>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}