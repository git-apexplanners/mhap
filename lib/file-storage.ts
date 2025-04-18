/**
 * Local file storage implementation
 *
 * This module provides functions for handling file uploads to the local file system.
 * In a production environment, you would typically use a cloud storage service like AWS S3,
 * but for local development, this provides a simple solution.
 */

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Base directory for file uploads
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directories exist
function ensureDirectoryExists(directory: string): void {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Initialize upload directories
ensureDirectoryExists(UPLOAD_DIR);

// Project directories
ensureDirectoryExists(path.join(UPLOAD_DIR, 'projects'));
ensureDirectoryExists(path.join(UPLOAD_DIR, 'projects', 'main'));
ensureDirectoryExists(path.join(UPLOAD_DIR, 'projects', 'gallery'));

// Project images directories (used in the project editor)
ensureDirectoryExists(path.join(UPLOAD_DIR, 'project-images'));
ensureDirectoryExists(path.join(UPLOAD_DIR, 'project-images', 'main'));
ensureDirectoryExists(path.join(UPLOAD_DIR, 'project-images', 'gallery'));

// Page directories
ensureDirectoryExists(path.join(UPLOAD_DIR, 'pages'));
ensureDirectoryExists(path.join(UPLOAD_DIR, 'pages', 'featured'));

// User directories
ensureDirectoryExists(path.join(UPLOAD_DIR, 'users'));
ensureDirectoryExists(path.join(UPLOAD_DIR, 'users', 'avatars'));

// Misc directory for other uploads
ensureDirectoryExists(path.join(UPLOAD_DIR, 'misc'));

/**
 * Save a file to the local file system
 *
 * @param file The file to save
 * @param folder The folder to save the file in (relative to the uploads directory)
 * @param filename Optional filename (if not provided, a UUID will be generated)
 * @returns The public URL of the saved file
 */
export async function saveFile(
  file: File,
  folder: string,
  filename?: string
): Promise<string> {
  // Generate a unique filename if not provided
  const fileExt = file.name.split('.').pop() || '';
  const uniqueFilename = filename || `${uuidv4()}.${fileExt}`;

  // Create the full path
  const fullFolder = path.join(UPLOAD_DIR, folder);

  // Ensure the directory exists (including any nested directories)
  ensureDirectoryExists(fullFolder);

  const fullPath = path.join(fullFolder, uniqueFilename);

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write the file
  fs.writeFileSync(fullPath, buffer);

  // Return the public URL
  return `/uploads/${folder}/${uniqueFilename}`;
}

/**
 * Delete a file from the local file system
 *
 * @param url The public URL of the file to delete
 * @returns True if the file was deleted, false otherwise
 */
export function deleteFile(url: string): boolean {
  try {
    // Extract the path from the URL
    const urlPath = url.startsWith('/') ? url.substring(1) : url;
    const fullPath = path.join(process.cwd(), 'public', urlPath);

    // Check if the file exists
    if (fs.existsSync(fullPath)) {
      // Delete the file
      fs.unlinkSync(fullPath);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

/**
 * Get the public URL for a file
 *
 * @param filePath The path of the file relative to the uploads directory
 * @returns The public URL of the file
 */
export function getFileUrl(filePath: string): string {
  return `/uploads/${filePath}`;
}

// Export the file storage API
export const fileStorage = {
  saveFile,
  deleteFile,
  getFileUrl,
};
