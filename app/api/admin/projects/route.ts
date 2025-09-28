import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// GET all projects for admin
export async function GET() {
  try {
    const { getAllProjects } = await import('@/lib/supabase/database-utils')
    const projects = await getAllProjects()
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error in projects GET route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    
    const { 
      title, 
      description, 
      long_description, 
      technologies, 
      image_url, 
      live_url, 
      github_url, 
      category, 
      featured 
    } = body

    // Basic validation
    if (!title || !description || !technologies) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { insertProject } = await import('@/lib/supabase/database-utils')
    const newProject = await insertProject({
      title,
      description,
      long_description,
      technologies,
      image_url,
      live_url,
      github_url,
      category,
      featured
    })

    return NextResponse.json({ project: newProject })
  } catch (error) {
    console.error('Error in projects POST route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update existing project
export async function PUT(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    
    const { 
      id, 
      title, 
      description, 
      long_description, 
      technologies, 
      image_url, 
      live_url, 
      github_url, 
      category, 
      featured 
    } = body

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    const updateData: any = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (long_description !== undefined) updateData.long_description = long_description
    if (technologies) updateData.technologies = Array.isArray(technologies) ? technologies : [technologies]
    if (image_url !== undefined) updateData.image_url = image_url
    if (live_url !== undefined) updateData.live_url = live_url
    if (github_url !== undefined) updateData.github_url = github_url
    if (category !== undefined) updateData.category = category
    if (featured !== undefined) updateData.featured = featured

    const { data: updatedProject, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }

    return NextResponse.json({ project: updatedProject })
  } catch (error) {
    console.error('Error in projects PUT route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE project
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting project:', error)
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in projects DELETE route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}