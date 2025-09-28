"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { ExternalLink, Github, Calendar, X } from "lucide-react"
import { Project } from "@/lib/projects-data"

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 !max-w-[90vw] !w-[90vw] sm:!max-w-[90vw]">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <X size={20} />
        </Button>
        
        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold mb-4 pr-12">{project.title}</DialogTitle>
            <DialogDescription className="text-xl text-muted-foreground">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-64 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover rounded-lg"
              />
              {project.status === 'in-progress' && (
                <Badge variant="secondary" className="absolute top-4 left-4 bg-yellow-100 text-yellow-800">
                  In Progress
                </Badge>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar size={20} />
                  Project Details
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.longDescription}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Created: {new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <Badge variant={
                  project.status === 'completed' ? 'default' :
                  project.status === 'in-progress' ? 'secondary' : 'outline'
                }>
                  {project.status === 'completed' ? 'Completed' :
                   project.status === 'in-progress' ? 'In Progress' : 'Planned'}
                </Badge>
              </div>

              <div className="flex gap-4 pt-4">
                {project.liveUrl && (
                  <Button asChild className="flex-1">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild className={project.liveUrl ? '' : 'flex-1'}>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
