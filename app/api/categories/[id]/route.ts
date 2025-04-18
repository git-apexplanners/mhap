import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';

/**
 * GET handler for fetching a specific category by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await db.getCategoryById(params.id);
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error(`Error fetching category ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch category';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * PUT handler for updating a category
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    // Update the category
    const category = await db.updateCategory(params.id, {
      name: data.name,
      slug: data.slug,
      parent_id: data.parent_id
    });
    
    // Note: Cache will be cleared client-side after the API call
    
    return NextResponse.json(category);
  } catch (error) {
    console.error(`Error updating category ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update category';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * DELETE handler for deleting a category
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First check if there are any child categories
    const allCategories = await db.getCategories();
    const childCategories = allCategories.filter(cat => cat.parent_id === params.id);

    if (childCategories.length > 0) {
      return NextResponse.json({ 
        error: 'This category has child categories. Please delete or reassign them first.' 
      }, { status: 400 });
    }

    // Then check if there are any projects using this category
    const projects = await db.getProjects();
    const projectsUsingCategory = projects.filter(project => project.category_id === params.id);

    if (projectsUsingCategory.length > 0) {
      return NextResponse.json({ 
        error: 'This category is used by existing projects. Please reassign those projects first.' 
      }, { status: 400 });
    }
    
    await db.deleteCategory(params.id);
    
    // Note: Cache will be cleared client-side after the API call
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting category ${params.id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete category';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
