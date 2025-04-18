import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';

/**
 * GET handler for fetching all projects
 */
export async function GET() {
  try {
    const projects = await db.getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

/**
 * POST handler for creating a new project
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Create the project
    const project = await db.createProject({
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      category_id: data.category_id,
      published: data.published,
      main_image_url: data.main_image_url,
      gallery_image_urls: data.gallery_image_urls,
      featured_image: data.featured_image
    });

    // Note: Cache will be cleared client-side after the API call

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
