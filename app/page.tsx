import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section" 
import { ProjectsSection } from "@/components/projects-section-dynamic"
import { HorizontalTechScroll } from "@/components/horizontal-tech-scroll"
import { ContactSection } from "@/components/contact-section-dynamic"
import { Footer } from "@/components/footer"
import { FloatingTechBackground } from "@/components/floating-tech-background"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative">
      <FloatingTechBackground />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <HorizontalTechScroll />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
