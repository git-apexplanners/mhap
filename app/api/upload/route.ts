import { NextRequest, NextResponse } from 'next/server';
import { saveFile } from '@/lib/file-storage';

/**
 * API route for file uploads
 *
 * This route handles file uploads and saves them to the local file system.
 * It returns the public URL of the saved file.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();

    // Get the file from the form data
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Get the folder from the form data (default to 'misc')
    const folder = (formData.get('folder') as string) || 'misc';

    // Get the filename from the form data (optional)
    const filename = formData.get('filename') as string | undefined;

    // Save the file
    const url = await saveFile(file, folder, filename);

    // Return the URL
    return NextResponse.json({ url });
  } catch (error: unknown) {
    console.error('Error uploading file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * Configure the API route to handle large files
 * Using the new route segment config format
 */
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
// The bodySize limit is now handled automatically by Next.js
