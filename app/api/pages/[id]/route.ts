import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';
import { cachedData } from '@/lib/cached-data';

/**
 * GET handler for fetching a specific page by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pages = await db.getPages();
    const page = pages.find(p => p.id === params.id);
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    return NextResponse.json(page);
  } catch (error) {
    console.error(`Error fetching page ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch page';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * PUT handler for updating a page
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    // Update the page
    const page = await db.updatePage(params.id, {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      page_type: data.page_type,
      published: data.published,
      featured_image: data.featured_image,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      sort_order: data.sort_order,
      parent_id: data.parent_id
    });
    
    // Clear the page cache
    cachedData.clearPageCache();
    
    return NextResponse.json(page);
  } catch (error) {
    console.error(`Error updating page ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update page';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * DELETE handler for deleting a page
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.deletePage(params.id);
    
    // Clear the page cache
    cachedData.clearPageCache();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting page ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete page';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
