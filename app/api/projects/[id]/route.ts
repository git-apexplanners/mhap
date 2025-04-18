import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';

/**
 * GET handler for fetching a specific project by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projects = await db.getProjects();
    const project = projects.find(p => p.id === params.id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(`Error fetching project ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch project';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * PUT handler for updating a project
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Update the project
    const project = await db.updateProject(params.id, {
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
    console.error(`Error updating project ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update project';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * DELETE handler for deleting a project
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.deleteProject(params.id);

    // Note: Cache will be cleared client-side after the API call

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting project ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
