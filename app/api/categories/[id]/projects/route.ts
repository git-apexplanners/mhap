import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get all projects
    const projects = await db.getProjects();
    
    // Filter projects by category ID
    const categoryProjects = projects.filter(project => 
      project.category_id === params.id && project.published
    );
    
    return NextResponse.json(categoryProjects);
  } catch (error) {
    console.error(`Error fetching projects for category ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
