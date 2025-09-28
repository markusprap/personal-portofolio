import { Code, Coffee, Lightbulb, Users } from "lucide-react"

export function AboutSection() {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full Stack Developer",
      description: "Passionate about building scalable web applications with modern technologies"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Problem Solver",
      description: "Love turning complex challenges into elegant, user-friendly solutions"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Player",
      description: "Experienced in agile environments and cross-functional collaboration"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Continuous Learner",
      description: "Always exploring new technologies and best practices in development"
    }
  ]

  return (
    <section id="about" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building digital experiences that matter, one line of code at a time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Content */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-muted-foreground leading-relaxed">
                Hi there! I'm a passionate full-stack developer with a love for creating 
                innovative web applications. With expertise in modern JavaScript frameworks 
                and a keen eye for user experience, I transform ideas into robust, 
                scalable solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My journey in tech started with curiosity and evolved into a career 
                focused on building applications that make a difference. I specialize 
                in React, Next.js, and Node.js, always staying current with the latest 
                industry trends and best practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open source projects, or sharing knowledge with the 
                developer community. I believe in writing clean, maintainable code 
                and creating seamless user experiences.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className="p-6 bg-background rounded-xl border border-border hover:border-accent/50 transition-colors group"
              >
                <div className="text-accent mb-3 group-hover:scale-110 transition-transform">
                  {highlight.icon}
                </div>
                <h3 className="font-semibold mb-2 text-sm">{highlight.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Unified Stats Section */}
        <div className="mt-16 p-8 bg-card rounded-2xl border border-border">
          <h3 className="text-lg font-semibold mb-6 text-center">Professional Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="text-3xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">3+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">25+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">12</div>
              <div className="text-sm text-muted-foreground">Technologies Mastered</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}