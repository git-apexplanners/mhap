import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';

/**
 * GET handler for fetching all categories
 */
export async function GET() {
  try {
    // Environment variables are checked but not logged to console

    // Fetch categories
    const categories = await db.getCategories();
    // Successfully found categories
    return NextResponse.json(categories);
  } catch (error) {
    // Detailed error logging
    console.error('API Categories - Error fetching categories:', error);

    // Return a more detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorCode = (error as Error & { code?: string })?.code || 'UNKNOWN_ERROR';

    return NextResponse.json({
      error: 'Failed to fetch categories',
      message: errorMessage,
      code: errorCode
    }, { status: 500 });
  }
}

/**
 * POST handler for creating a new category
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Create the category
    const category = await db.createCategory({
      name: data.name,
      slug: data.slug,
      parent_id: data.parent_id
    });

    // Note: Cache will be cleared client-side after the API call

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create category';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
