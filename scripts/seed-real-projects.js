require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Admin client setup
const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

const realProjects = [
  {
    title: 'WasteWise AI',
    description: 'AI-powered waste classification web application for sustainable waste management and environmental awareness.',
    long_description: 'An intelligent waste management solution that uses AI to classify different types of waste, provide proper disposal recommendations, and connect users with nearby waste banks. Features include real-time waste scanning, comprehensive waste processing guidelines, and location-based waste bank recommendations for better environmental impact.',
    technologies: ['React', 'TensorFlow.js', 'Machine Learning', 'Environmental Tech', 'Waste Classification', 'Sustainability'],
    image_url: '/projects/waste-wise.png',
    github_url: 'https://github.com/markusprap/waste-classification-webapp',
    live_url: 'https://waste-classification-webapp.vercel.app/',
    category: 'AI/ML',
    featured: true
  },
  {
    title: 'SkinScan AI',
    description: 'Advanced facial skin analysis platform with AI-powered skin condition detection and personalized skincare recommendations.',
    long_description: 'A comprehensive skincare analysis platform that uses computer vision and machine learning to analyze facial skin conditions, detect potential skin issues, and provide personalized skincare recommendations. Features include real-time skin analysis, skin type classification, condition severity assessment, and tailored skincare routine suggestions.',
    technologies: ['AI/ML', 'Computer Vision', 'React', 'Skin Analysis', 'Healthcare Tech', 'Personalization'],
    image_url: '/projects/skin-scan.png',
    github_url: 'https://github.com/markusprap/frontend-skinmate',
    live_url: 'https://v0-skincare-analysis-website-kc.vercel.app/',
    category: 'AI/ML',
    featured: true
  },
  {
    title: 'Personal Note',
    description: 'Modern personal note-taking web application with intuitive interface and efficient note management.',
    long_description: 'A clean and intuitive personal note-taking application designed for productivity and organization. Features include quick note creation, efficient search functionality, categorization system, and responsive design for seamless note-taking across devices. Perfect for students, professionals, and anyone who needs to organize their thoughts.',
    technologies: ['React', 'JavaScript', 'Local Storage', 'Productivity', 'Note Management', 'Responsive Design'],
    image_url: '/projects/personal-note.png',
    github_url: 'https://github.com/markusprap/personal-note-markusprap',
    live_url: 'https://personal-notes-app-starter-tau.vercel.app/',
    category: 'Web App',
    featured: true
  },
  {
    title: 'Photo Color Generator',
    description: 'Creative photo color tone transformation tool supporting the Indonesian people\'s movement for justice.',
    long_description: 'A web application for transforming photo color tones with a meaningful purpose - supporting the 17+8 demands of the Indonesian people to the government. This tool allows users to creatively modify their photos while raising awareness about social justice issues. Features include multiple color tone presets, real-time photo processing, and export functionality.',
    technologies: ['React', 'Image Processing', 'Creative Tools', 'Social Awareness', 'Frontend', 'Color Manipulation'],
    image_url: '/projects/photo-color-generator.png',
    live_url: 'https://pink-green-photo-generator.vercel.app/',
    category: 'Creative Tool',
    featured: false
  },
  {
    title: 'MediSync SaaS',
    description: 'Comprehensive SaaS platform for healthcare clinic data management and information systems (Collaborative Project).',
    long_description: 'A comprehensive Software-as-a-Service platform designed specifically for healthcare clinics to manage patient data, appointments, medical records, and administrative tasks. This collaborative project features patient management, appointment scheduling, medical history tracking, billing integration, and reporting dashboard. Built with modern technologies to ensure HIPAA compliance and data security.',
    technologies: ['SaaS', 'Healthcare', 'Data Management', 'Collaboration', 'Patient Management', 'Medical Records'],
    image_url: '/projects/medisync.png',
    category: 'SaaS',
    featured: false
  }
];

async function seedRealProjects() {
  try {
    const supabase = createAdminClient();
    
    console.log('🔄 Starting real projects seeding...');
    
    // First, clear existing projects (optional - comment out if you want to keep existing data)
    console.log('🗑️ Clearing existing projects...');
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .gt('created_at', '1900-01-01'); // This will delete all rows
    
    if (deleteError && deleteError.code !== 'PGRST116') {
      console.error('Error clearing projects:', deleteError);
      // Continue anyway
    }
    
    // Insert real projects
    console.log('📝 Inserting real projects...');
    const { data, error } = await supabase
      .from('projects')
      .insert(realProjects)
      .select();
    
    if (error) {
      console.error('❌ Error inserting projects:', error);
      process.exit(1);
    }
    
    console.log(`✅ Successfully seeded ${data.length} real projects!`);
    console.log('📋 Projects inserted:');
    data.forEach(project => {
      console.log(`  - ${project.title} (${project.category})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }
}

seedRealProjects();