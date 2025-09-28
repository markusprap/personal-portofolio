"use client";

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
  SiFramer,
  SiTailwindcss,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiAmazon,
  SiVercel
} from 'react-icons/si';

const techStackExtended = [
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400 hover:text-yellow-300" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-500 hover:text-blue-400" },
  { name: "React.js", icon: SiReact, color: "text-cyan-400 hover:text-cyan-300" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-foreground hover:text-muted-foreground" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500 hover:text-green-400" },
  { name: "Python", icon: SiPython, color: "text-blue-400 hover:text-blue-300" },
  { name: "Go", icon: SiGo, color: "text-cyan-500 hover:text-cyan-400" },
  { name: "PHP", icon: SiPhp, color: "text-purple-400 hover:text-purple-300" },
  { name: "Laravel", icon: SiLaravel, color: "text-red-400 hover:text-red-300" },
  { name: "Docker", icon: SiDocker, color: "text-blue-500 hover:text-blue-400" },
  { name: "Redis", icon: SiRedis, color: "text-red-500 hover:text-red-400" },
  { name: "GraphQL", icon: SiGraphql, color: "text-pink-500 hover:text-pink-400" },
  { name: "MySQL", icon: SiMysql, color: "text-blue-600 hover:text-blue-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400 hover:text-blue-300" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500 hover:text-green-400" },
  { name: "Firebase", icon: SiFirebase, color: "text-orange-500 hover:text-orange-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400 hover:text-teal-300" },
  { name: "Framer Motion", icon: SiFramer, color: "text-purple-500 hover:text-purple-400" },
  { name: "AWS", icon: SiAmazon, color: "text-orange-400 hover:text-orange-300" },
  { name: "Vercel", icon: SiVercel, color: "text-foreground hover:text-muted-foreground" },
];

export function HorizontalTechScroll() {
  // Triple array for smoother infinite scroll and prevent reset
  const duplicatedTech = [...techStackExtended, ...techStackExtended, ...techStackExtended];

  return (
    <div className="py-16 bg-gradient-to-r from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Powered by Modern Technologies
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building with the latest tools and frameworks to deliver exceptional results
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling content */}
          <div className="flex animate-scroll-x">
            {duplicatedTech.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 mx-8 group cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 hover:border-border hover:scale-105 transition-all duration-300 min-w-[120px] h-[120px]">
                  <tech.icon 
                    className={`text-4xl mb-3 transition-all duration-300 group-hover:scale-110 ${tech.color}`}
                  />
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}