import { TypingAnimation } from "./typing-animation"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const typingTexts = [
    "Fullstack Web Developer who builds modern digital experiences.",
    "Software Engineer passionate about clean code and user experience.",
    "Tech Enthusiast who turns ideas into scalable web solutions."
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-2xl md:text-3xl text-muted-foreground mb-2">Hello 👋</div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">I'm Markus Prap Kurniawan</h1>
          <div className="text-xl md:text-2xl text-muted-foreground mb-6 h-16 md:h-12 flex items-center justify-center">
            <TypingAnimation texts={typingTexts} speed={60} pauseTime={3000} />
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          I'm a passionate fullstack web developer focused on creating modern web applications with cutting-edge
          technologies. I love crafting digital solutions that not only look great but also provide exceptional user
          experiences.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <Button asChild>
            <a href="#projects">View My Work</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/markusprap/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://github.com/markusprap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            aria-label="GitHub Profile"
          >
            <Github size={28} />
          </a>
          <a
            href="mailto:prapkurniawanmarkus@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            aria-label="Send Email"
          >
            <Mail size={28} />
          </a>
        </div>
      </div>
    </section>
  )
}
