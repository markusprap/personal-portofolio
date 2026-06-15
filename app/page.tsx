"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"

function DeveloperIllustration() {
  return (
    <svg
      viewBox="0 0 500 310"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm mx-auto"
      aria-hidden="true"
    >
      {/* Filing cabinet */}
      <rect x="345" y="150" width="72" height="68" rx="2" fill="#cfd8dc" />
      <rect x="352" y="162" width="58" height="13" rx="1" fill="#b0bec5" />
      <rect x="352" y="179" width="58" height="13" rx="1" fill="#b0bec5" />
      <rect x="352" y="196" width="58" height="13" rx="1" fill="#b0bec5" />
      <rect x="377" y="167" width="12" height="3" rx="1.5" fill="#78909c" />
      <rect x="377" y="184" width="12" height="3" rx="1.5" fill="#78909c" />

      {/* Big monitor - bezel */}
      <rect x="265" y="100" width="138" height="118" rx="5" fill="#455a64" />
      {/* Big monitor - screen */}
      <rect x="271" y="106" width="126" height="106" rx="3" fill="#1a237e" />
      {/* Code lines on big monitor */}
      <rect x="279" y="114" width="50" height="4" rx="2" fill="#ef5350" />
      <rect x="279" y="122" width="74" height="4" rx="2" fill="#e0e0e0" />
      <rect x="287" y="130" width="42" height="4" rx="2" fill="#4fc3f7" />
      <rect x="287" y="138" width="62" height="4" rx="2" fill="#e0e0e0" />
      <rect x="287" y="146" width="34" height="4" rx="2" fill="#aed581" />
      <rect x="279" y="154" width="48" height="4" rx="2" fill="#e0e0e0" />
      <rect x="287" y="162" width="56" height="4" rx="2" fill="#4fc3f7" />
      <rect x="287" y="170" width="38" height="4" rx="2" fill="#ef5350" />
      <rect x="279" y="178" width="66" height="4" rx="2" fill="#e0e0e0" />
      <rect x="287" y="186" width="30" height="4" rx="2" fill="#aed581" />
      <rect x="279" y="194" width="52" height="4" rx="2" fill="#4fc3f7" />
      {/* Monitor stand */}
      <rect x="327" y="218" width="12" height="8" fill="#546e7a" />
      <rect x="313" y="226" width="40" height="5" rx="2" fill="#546e7a" />

      {/* Laptop - lid */}
      <rect x="105" y="148" width="118" height="70" rx="4" fill="#455a64" />
      {/* Laptop - screen */}
      <rect x="111" y="154" width="106" height="60" rx="2" fill="#283593" />
      {/* Code lines on laptop */}
      <rect x="118" y="161" width="38" height="3" rx="1.5" fill="#ef5350" />
      <rect x="118" y="168" width="60" height="3" rx="1.5" fill="#e0e0e0" />
      <rect x="125" y="175" width="34" height="3" rx="1.5" fill="#4fc3f7" />
      <rect x="125" y="182" width="48" height="3" rx="1.5" fill="#aed581" />
      <rect x="118" y="189" width="42" height="3" rx="1.5" fill="#e0e0e0" />
      <rect x="125" y="196" width="44" height="3" rx="1.5" fill="#4fc3f7" />
      <rect x="118" y="203" width="33" height="3" rx="1.5" fill="#ef5350" />
      {/* Laptop base */}
      <rect x="95" y="218" width="140" height="6" rx="3" fill="#546e7a" />

      {/* Desk surface */}
      <rect x="65" y="218" width="350" height="9" rx="3" fill="#90a4ae" />
      {/* Desk legs */}
      <rect x="75" y="227" width="9" height="53" fill="#78909c" />
      <rect x="396" y="227" width="9" height="53" fill="#78909c" />

      {/* Chair back */}
      <rect x="210" y="188" width="80" height="80" rx="10" fill="#8d6e63" />
      {/* Chair seat */}
      <rect x="200" y="265" width="100" height="18" rx="7" fill="#6d4c41" />
      {/* Chair pole */}
      <rect x="246" y="283" width="8" height="22" fill="#757575" />
      {/* Chair wheels shadow */}
      <ellipse cx="250" cy="307" rx="28" ry="5" fill="#616161" opacity="0.4" />
      <circle cx="224" cy="309" r="5" fill="#424242" />
      <circle cx="276" cy="309" r="5" fill="#424242" />
      <circle cx="250" cy="312" r="5" fill="#424242" />

      {/* Person body - teal shirt */}
      <path
        d="M208 198 C222 188 235 190 250 192 C265 190 278 188 292 198 L290 265 C265 272 235 272 210 265Z"
        fill="#26a69a"
      />
      {/* Left arm toward laptop */}
      <path
        d="M210 205 C195 216 175 224 152 228"
        stroke="#26a69a"
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="149" cy="229" rx="9" ry="7" fill="#ffb74d" />
      {/* Right arm toward monitor */}
      <path
        d="M290 205 C305 218 315 226 322 231"
        stroke="#26a69a"
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="325" cy="233" rx="9" ry="7" fill="#ffb74d" />

      {/* Neck */}
      <rect x="243" y="168" width="14" height="22" rx="5" fill="#ffb74d" />
      {/* Head */}
      <ellipse cx="250" cy="150" rx="26" ry="25" fill="#ffb74d" />
      {/* Hair - top */}
      <path
        d="M225 145 C228 118 250 114 272 118 C274 145 269 130 250 128 C231 130 226 146 225 145Z"
        fill="#212121"
      />
      {/* Hair - left side */}
      <path
        d="M225 145 C222 156 224 167 226 168 C228 160 228 150 225 145Z"
        fill="#212121"
      />
      {/* Hair - right side */}
      <path
        d="M275 145 C278 156 276 167 274 168 C272 160 272 150 275 145Z"
        fill="#212121"
      />

      {/* Pants/legs below chair */}
      <path
        d="M215 268 L212 295 L232 295 L250 278 L268 295 L288 295 L285 268Z"
        fill="#1565c0"
      />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { href: "https://github.com/markusprap", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/markusprap", icon: Linkedin, label: "LinkedIn" },
  { href: "https://instagram.com/markusprap", icon: Instagram, label: "Instagram" },
  { href: "mailto:prapkurniawanmarkus@gmail.com", icon: Mail, label: "Email" },
] as const

export default function MaintenancePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #4c6ef5 0%, #748ffc 100%)" }}
    >
      {/* Decorative corner triangles */}
      <svg className="absolute top-0 left-0 w-56 h-56 opacity-20" viewBox="0 0 200 200" aria-hidden="true">
        <polygon points="0,0 200,0 0,200" fill="white" />
      </svg>
      <svg className="absolute top-0 left-0 w-36 h-36 opacity-15" viewBox="0 0 200 200" aria-hidden="true">
        <polygon points="0,0 200,0 0,200" fill="white" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-56 h-56 opacity-20" viewBox="0 0 200 200" aria-hidden="true">
        <polygon points="200,200 0,200 200,0" fill="white" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-36 h-36 opacity-15" viewBox="0 0 200 200" aria-hidden="true">
        <polygon points="200,200 0,200 200,0" fill="white" />
      </svg>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl px-10 pt-10 pb-8 w-full max-w-lg text-center relative z-10"
      >
        <DeveloperIllustration />

        <h1 className="text-2xl font-bold text-gray-800 mt-5 mb-1.5">
          Sedang dalam Perbaikan
        </h1>
        <p className="text-gray-400 text-sm mb-7">
          Website sedang diredesign untuk tampilan yang lebih baik. Segera hadir!
        </p>

        <div className="h-px bg-gray-100 mb-5" />

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-gray-400 text-xs mr-1">Find me on:</span>
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="w-9 h-9 rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-500 text-gray-400 flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <p className="mt-6 text-gray-300 text-xs">
          © {new Date().getFullYear()} Markus Prap Kurniawan
        </p>
      </motion.div>
    </main>
  )
}
