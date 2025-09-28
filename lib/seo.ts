import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  author?: string
  type?: 'website' | 'article' | 'profile'
  image?: string
  url?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export function generateSEO({
  title,
  description,
  keywords = [],
  author = 'Alex Thompson',
  type = 'website',
  image = '/placeholder.jpg',
  url,
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: SEOProps): Metadata {
  const siteName = 'Alex Thompson Portfolio'
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    
    openGraph: {
      type,
      title: fullTitle,
      description,
      siteName,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        section,
        authors: [author],
        tags,
      }),
    },
    
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@alexthompson', // Replace with actual Twitter handle
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    alternates: {
      canonical: url,
    },
    
    other: {
      'revisit-after': '7 days',
      'DC.creator': author,
      'DC.type': type,
      'DC.format': 'text/html',
      'DC.language': 'en',
    },
  }
}

// Structured Data for Articles
export function generateArticleStructuredData({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  image,
  url
}: {
  title: string
  description: string
  author: string
  publishedTime: string
  modifiedTime?: string
  image: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [image],
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Person',
      name: author,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

// Structured Data for Person/Portfolio
export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alex Thompson',
    jobTitle: 'Full Stack Developer',
    description: 'Passionate full-stack developer with expertise in React, Next.js, TypeScript, and modern web technologies.',
    url: 'https://alexthompson.dev', // Replace with actual domain
    sameAs: [
      'https://github.com/alexthompson',
      'https://linkedin.com/in/alexthompson',
      'https://twitter.com/alexthompson',
    ],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'AWS',
      'Docker',
      'Kubernetes'
    ],
  }
}