import Link from 'next/link'
import { projects } from '@/lib/projects-data'
import { ProjectCard } from './project-card'
import { Button } from '@/components/ui/button'

export function ProjectsSection() {
  // Filter to show only featured projects on homepage
  const featuredProjects = projects.filter(project => project.featured)

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work in web development, featuring modern technologies 
            and innovative solutions
          </p>
        </div>

        {featuredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured projects available.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/projects">
                  View All Projects
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}