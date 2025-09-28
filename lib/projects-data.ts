export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  status: 'completed' | 'in-progress' | 'planned'
  featured: boolean
  createdAt: string
}

export const projects: Project[] = [
  {
    id: 'wastewise-ai',
    title: 'WasteWise AI',
    description: 'AI-powered waste classification web application for sustainable waste management and environmental awareness.',
    longDescription: 'An intelligent waste management solution that uses AI to classify different types of waste, provide proper disposal recommendations, and connect users with nearby waste banks. Features include real-time waste scanning, comprehensive waste processing guidelines, and location-based waste bank recommendations for better environmental impact.',
    image: '/projects/waste-wise.png',
    tags: ['React', 'TensorFlow.js', 'Machine Learning', 'Environmental Tech', 'Waste Classification', 'Sustainability'],
    githubUrl: 'https://github.com/markusprap/waste-classification-webapp',
    liveUrl: 'https://waste-classification-webapp.vercel.app/',
    status: 'completed',
    featured: true,
    createdAt: '2024-09-15'
  },
  {
    id: 'skinscan-ai',
    title: 'SkinScan AI',
    description: 'Advanced facial skin analysis platform with AI-powered skin condition detection and personalized skincare recommendations.',
    longDescription: 'A comprehensive skincare analysis platform that uses computer vision and machine learning to analyze facial skin conditions, detect potential skin issues, and provide personalized skincare recommendations. Features include real-time skin analysis, skin type classification, condition severity assessment, and tailored skincare routine suggestions.',
    image: '/projects/skin-scan.png',
    tags: ['AI/ML', 'Computer Vision', 'React', 'Skin Analysis', 'Healthcare Tech', 'Personalization'],
    githubUrl: 'https://github.com/markusprap/frontend-skinmate',
    liveUrl: 'https://v0-skincare-analysis-website-kc.vercel.app/',
    status: 'completed',
    featured: true,
    createdAt: '2024-08-20'
  },
  {
    id: 'personal-note-app',
    title: 'Personal Note',
    description: 'Modern personal note-taking web application with intuitive interface and efficient note management.',
    longDescription: 'A clean and intuitive personal note-taking application designed for productivity and organization. Features include quick note creation, efficient search functionality, categorization system, and responsive design for seamless note-taking across devices. Perfect for students, professionals, and anyone who needs to organize their thoughts.',
    image: '/projects/personal-note.png',
    tags: ['React', 'JavaScript', 'Local Storage', 'Productivity', 'Note Management', 'Responsive Design'],
    githubUrl: 'https://github.com/markusprap/personal-note-markusprap',
    liveUrl: 'https://personal-notes-app-starter-tau.vercel.app/',
    status: 'completed',
    featured: true,
    createdAt: '2024-07-10'
  },
  {
    id: 'photo-color-generator',
    title: 'Photo Color Generator',
    description: 'Creative photo color tone transformation tool supporting the Indonesian people\'s movement for justice.',
    longDescription: 'A web application for transforming photo color tones with a meaningful purpose - supporting the 17+8 demands of the Indonesian people to the government. This tool allows users to creatively modify their photos while raising awareness about social justice issues. Features include multiple color tone presets, real-time photo processing, and export functionality.',
    image: '/projects/photo-color-generator.png',
    tags: ['React', 'Image Processing', 'Creative Tools', 'Social Awareness', 'Frontend', 'Color Manipulation'],
    liveUrl: 'https://pink-green-photo-generator.vercel.app/',
    status: 'completed',
    featured: false,
    createdAt: '2024-06-25'
  },
  {
    id: 'medisync-saas',
    title: 'MediSync SaaS',
    description: 'Comprehensive SaaS platform for healthcare clinic data management and information systems (Collaborative Project).',
    longDescription: 'A comprehensive Software-as-a-Service platform designed specifically for healthcare clinics to manage patient data, appointments, medical records, and administrative tasks. This collaborative project features patient management, appointment scheduling, medical history tracking, billing integration, and reporting dashboard. Built with modern technologies to ensure HIPAA compliance and data security.',
    image: '/projects/medisync.png',
    tags: ['SaaS', 'Healthcare', 'Data Management', 'Collaboration', 'Patient Management', 'Medical Records'],
    status: 'completed',
    featured: false,
    createdAt: '2024-05-30'
  }
]

// Helper functions
export const getFeaturedProjects = () => projects.filter(project => project.featured)

export const getProjectsByStatus = (status: Project['status']) => 
  projects.filter(project => project.status === status)

export const getProjectById = (id: string) => 
  projects.find(project => project.id === id)

export const getRecentProjects = (limit: number = 3) => 
  projects
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)