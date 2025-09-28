import { NextRequest, NextResponse } from 'next/server'

// Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Rate limiting (simple in-memory store - in production use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const rateLimit = (ip: string): boolean => {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // max 5 requests per window

  const clientData = rateLimitMap.get(ip)
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (clientData.count >= maxRequests) {
    return false
  }
  
  clientData.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1'

    // Check rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 1000 characters.' },
        { status: 400 }
      )
    }

    // Log the contact form submission (in production, save to database)
    console.log('📨 New Contact Form Submission:')
    console.log({
      timestamp: new Date().toISOString(),
      name,
      email,
      message,
      ip
    })

    // Save to Supabase database
    try {
      const { insertContact } = await import('@/lib/supabase/database-utils')
      const data = await insertContact({ name, email, message })
      console.log('✅ Contact saved to database:', data)
    } catch (dbError) {
      console.error('❌ Database integration error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save message. Please try again or email me directly.' },
        { status: 500 }
      )
    }

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, we successfully save to database
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I\'ll get back to you soon.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}