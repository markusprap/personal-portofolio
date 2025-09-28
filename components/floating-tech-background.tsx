"use client"

import { useEffect, useState } from "react"
import { 
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPython, 
  SiGo, 
  SiPhp, 
  SiLaravel,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiVercel
} from 'react-icons/si'
import { IconType } from 'react-icons'

interface FloatingIcon {
  id: number
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
  opacity: number
  tech: IconType
}

const techIcons: IconType[] = [
  // Core tech stack icons
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiPhp,
  SiLaravel,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiVercel
]

export function FloatingTechBackground() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    // Initialize floating icons
    const initialIcons: FloatingIcon[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 40 + 30, // 30-70px
      speed: Math.random() * 1.2 + 0.3, // 0.3-1.5
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4, // -2 to 2
      opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2
      tech: techIcons[Math.floor(Math.random() * techIcons.length)],
    }))

    setIcons(initialIcons)

    // Animation loop
    const animate = () => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => ({
          ...icon,
          y: icon.y - icon.speed,
          rotation: icon.rotation + icon.rotationSpeed,
          // Reset position when icon goes off screen
          ...(icon.y < -icon.size && {
            y: window.innerHeight + icon.size,
            x: Math.random() * window.innerWidth,
          }),
        })),
      )
    }

    const intervalId = setInterval(animate, 50) // 20 FPS

    // Handle window resize
    const handleResize = () => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => ({
          ...icon,
          x: Math.min(icon.x, window.innerWidth - icon.size),
        })),
      )
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute text-muted-foreground/30 select-none pointer-events-none"
          style={{
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            transform: `rotate(${icon.rotation}deg)`,
            opacity: icon.opacity,
            filter: 'blur(0.5px)',
          }}
        >
          <icon.tech size={icon.size} />
        </div>
      ))}
    </div>
  )
}
