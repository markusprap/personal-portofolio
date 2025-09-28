"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 hover:bg-accent/50 hover:scale-110 active:scale-95 transition-all duration-200 group"
    >
      <div className="relative w-4 h-4 overflow-hidden">
        {/* Sun Icon */}
        <Sun className={`absolute inset-0 h-4 w-4 text-amber-500 transition-all duration-500 ease-in-out
          ${theme === 'light' 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-6 opacity-0 scale-75'
          }
          group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]
        `} />
        
        {/* Moon Icon */}
        <Moon className={`absolute inset-0 h-4 w-4 text-blue-400 transition-all duration-500 ease-in-out
          ${theme === 'dark' 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-6 opacity-0 scale-75'
          }
          group-hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]
        `} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
