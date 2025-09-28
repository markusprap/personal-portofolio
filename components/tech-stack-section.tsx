"use client"

import { 
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPython, 
  SiGo, 
  SiPhp, 
  SiLaravel,
  SiDocker,
  SiRedis,
  SiGraphql,
  SiMysql,
  SiFirebase,
  SiFramer
} from 'react-icons/si'

const techStack = [
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-400 hover:text-yellow-300",
  },
  {
    name: "React.js", 
    icon: SiReact,
    color: "text-cyan-400 hover:text-cyan-300",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-slate-400 hover:text-slate-300 dark:text-white dark:hover:text-gray-300",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "text-green-400 hover:text-green-300",
  },
  {
    name: "Python",
    icon: SiPython,
    color: "text-blue-400 hover:text-blue-300",
  },
  {
    name: "Go",
    icon: SiGo,
    color: "text-cyan-400 hover:text-cyan-300",
  },
  {
    name: "PHP",
    icon: SiPhp,
    color: "text-purple-400 hover:text-purple-300",
  },
  {
    name: "Laravel",
    icon: SiLaravel,
    color: "text-red-400 hover:text-red-300",
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "text-blue-500 hover:text-blue-400",
  },
  {
    name: "Redis",
    icon: SiRedis,
    color: "text-red-500 hover:text-red-400",
  },
  {
    name: "GraphQL",
    icon: SiGraphql,
    color: "text-pink-500 hover:text-pink-400",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    color: "text-blue-600 hover:text-blue-500",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    color: "text-orange-500 hover:text-orange-400",
  },
  {
    name: "Framer Motion",
    icon: SiFramer,
    color: "text-purple-500 hover:text-purple-400",
  },
]

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tech Stack</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Technologies and tools I use to build modern, scalable web applications
          </p>
        </div>

        {/* Tech stack with animated icons */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 mb-16">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className={`group relative transition-all duration-500 hover:scale-150 ${tech.color}`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="relative animate-bounce-slow">
                <tech.icon className="text-5xl hover:animate-pulse transition-all duration-300" />
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-border">
                  {tech.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
