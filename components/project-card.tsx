"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LuExternalLink, LuGithub } from "react-icons/lu"
import { ProjectModal } from "@/components/project-modal"
import type { Project } from "@/lib/projects-data"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card 
          className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-border transition-all duration-300 hover:shadow-lg cursor-pointer"
          onClick={handleCardClick}
        >
        {project.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>

            </div>
            {project.featured && (
              <Badge variant="default" className="ml-2">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription className="text-muted-foreground leading-relaxed">
            {project.description}
          </CardDescription>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tech: string) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 4} more
                </Badge>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {project.liveUrl && (
              <Button size="sm" asChild className="flex-1">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <LuExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="sm" variant="outline" asChild className="flex-1">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <LuGithub className="w-4 h-4 mr-2" />
                  Code
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>

    <ProjectModal 
      project={project}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  )
}