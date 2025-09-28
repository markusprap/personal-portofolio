"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const [logoTransitioning, setLogoTransitioning] = useState(false)
  const [prevTheme, setPrevTheme] = useState(resolvedTheme)

  const navItems = [
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#tech-stack", label: "Tech Stack" },
    { href: "/#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ]

  // Dynamic logo based on theme
  const currentLogo = resolvedTheme === 'dark' ? '/logo_dark.png' : '/logo_light.png'
  const prevLogo = prevTheme === 'dark' ? '/logo_dark.png' : '/logo_light.png'

  // Handle theme change with animation
  useEffect(() => {
    if (prevTheme !== resolvedTheme && prevTheme !== undefined) {
      setLogoTransitioning(true)
      setTimeout(() => {
        setPrevTheme(resolvedTheme)
        setLogoTransitioning(false)
      }, 250) // Half of transition duration
    } else if (prevTheme === undefined) {
      setPrevTheme(resolvedTheme)
    }
  }, [resolvedTheme, prevTheme])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative overflow-hidden w-[180px] h-[60px]">
              {/* Previous logo (sliding out) */}
              <Image
                src={prevLogo}
                alt="Markus Prap Kurniawan"
                width={180}
                height={60}
                className={`absolute inset-0 transition-all duration-500 ease-in-out group-hover:scale-105 ${
                  logoTransitioning ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                }`}
                priority
              />
              {/* Current logo (sliding in) */}
              <Image
                src={currentLogo}
                alt="Markus Prap Kurniawan"
                width={180}
                height={60}
                className={`absolute inset-0 transition-all duration-500 ease-in-out group-hover:scale-105 ${
                  logoTransitioning ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
