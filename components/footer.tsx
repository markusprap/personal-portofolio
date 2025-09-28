"use client"

import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Main footer text */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              Made with{" "}
              <span className="text-red-500 animate-pulse">❤️</span>
              {" "}and{" "}
              <span className="text-amber-600">☕</span>
              {" "}by{" "}
              <a 
                href="https://www.instagram.com/markusprap/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors font-medium"
              >
                Markus Prap Kurniawan
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/markusprap/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-pink-500 transition-colors hover:scale-110 transform duration-200"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://x.com/markusprap21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-blue-400 transition-colors hover:scale-110 transform duration-200"
              aria-label="Twitter/X"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.facebook.com/markusprap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-blue-600 transition-colors hover:scale-110 transform duration-200"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Optional: Back to top link */}
        <div className="mt-6 pt-4 border-t border-border/50 text-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}