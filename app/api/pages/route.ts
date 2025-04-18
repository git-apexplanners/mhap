import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';
import { cachedData } from '@/lib/cached-data';

/**
 * GET handler for fetching all pages
 */
export async function GET() {
  try {
    const pages = await db.getPages();
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

/**
 * POST handler for creating a new page
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Create the page
    const page = await db.createPage({
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
    console.error('Error creating page:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create page';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
