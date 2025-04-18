import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Get the upload directory from environment variables or use a default
const uploadDir = process.env.UPLOAD_DIR || 'public/uploads';

// Ensure the upload directory exists
export function ensureUploadDirExists() {
  const fullPath = path.resolve(process.cwd(), uploadDir);
  
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  
  return fullPath;
}

// Save a file to the uploads directory
export async function saveFile(file: File): Promise<string> {
  const fullUploadDir = ensureUploadDirExists();
  
  // Generate a unique filename
  const filename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
  const filePath = path.join(fullUploadDir, filename);
  
  // Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Write the file
  fs.writeFileSync(filePath, buffer);
  
  // Return the public URL
  return `/${uploadDir.replace(/^public\//, '')}/${filename}`;
}

// Delete a file from the uploads directory
export function deleteFile(fileUrl: string): boolean {
  try {
    // Extract the filename from the URL
    const filename = fileUrl.split('/').pop();
    if (!filename) return false;
    
    // Get the full path
    const fullPath = path.join(ensureUploadDirExists(), filename);
    
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
