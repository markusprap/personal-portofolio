"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Mail, Wrench } from "lucide-react"

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-24 h-24 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Wrench className="w-12 h-12 text-accent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-accent text-xs font-mono tracking-widest uppercase mb-4">
            Under Maintenance
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Sedang dalam{" "}
            <span className="text-accent">Perbaikan</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-md mx-auto">
            Website sedang dalam proses redesign untuk tampilan yang lebih baik.
            Nantikan kehadirannya kembali!
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="h-px bg-border mb-10 origin-left"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <p className="text-muted-foreground text-sm">Hubungi saya:</p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/markusprap"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-lg border border-border hover:border-accent hover:text-accent text-muted-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/markusprap"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-lg border border-border hover:border-accent hover:text-accent text-muted-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/markusprap"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-lg border border-border hover:border-accent hover:text-accent text-muted-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:prapkurniawanmarkus@gmail.com"
              aria-label="Email"
              className="w-10 h-10 rounded-lg border border-border hover:border-accent hover:text-accent text-muted-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-muted-foreground/40 text-xs font-mono"
        >
          © {new Date().getFullYear()} Markus Prap Kurniawan
        </motion.p>
      </div>
    </main>
  )
}
