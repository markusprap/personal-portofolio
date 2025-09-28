import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { Analytics } from "@/lib/analytics"
import { generateSEO, generatePersonStructuredData } from "@/lib/seo"
import { ClientWrapperWithSuspense } from "@/components/client-wrapper-navigation"
import { AnalyticsTracker } from "@/components/analytics-tracker"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://markusprap.space'),
  ...generateSEO({
    title: "Markus Prap Kurniawan - Fullstack Web Developer",
    description: "Portfolio website of Markus Prap Kurniawan, a passionate fullstack web developer specializing in modern web technologies, React.js, Next.js, Node.js, and more.",
    keywords: [
      "Fullstack Developer",
      "React Developer", 
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "Frontend",
      "Backend",
      "Portfolio",
      "Markus Prap Kurniawan"
    ],
    author: "Markus Prap Kurniawan",
    type: "website",
    url: "https://markusprap.space",
    image: "/logo_title.png"
  })
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personStructuredData = generatePersonStructuredData()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo_title.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientWrapperWithSuspense>
            {children}
          </ClientWrapperWithSuspense>
          <AnalyticsTracker />
          <Toaster />
          <SonnerToaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
