/**
 * Script to fix imports in files
 * 
 * This script updates the imports from @/lib/supabase to @/lib/cached-data
 */

const fs = require('fs');
const path = require('path');

// Files to fix
const filesToFix = [
  'app/admin/categories/page.tsx',
  'app/admin/pages/page.tsx',
  'app/admin/projects/page.tsx',
  'app/admin/page.tsx',
  'app/portfolio/architecture/housing/page.tsx',
  'app/portfolio/architecture/private-residences/page.tsx',
  'app/portfolio/architecture/page.tsx',
  'app/portfolio/urban-design/heritage/community-projects/page.tsx',
  'app/portfolio/urban-design/heritage/page.tsx',
  'app/portfolio/urban-design/page.tsx'
];

// Function to fix imports
function fixImports(filePath) {
  console.log(`Fixing imports in: ${filePath}`);
  
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace the import
    const updatedContent = content.replace(
      /import\s+{\s*cachedData\s*}\s+from\s+['"]@\/lib\/supabase['"];?/g,
      'import { cachedData } from \'@/lib/cached-data\';'
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`✅ Successfully fixed imports in: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing imports in ${filePath}:`, error.message);
  }
}

// Main function to fix all files
function fixAllFiles() {
  console.log('Starting to fix imports...');
  
  filesToFix.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    fixImports(filePath);
  });
  
  console.log('All imports fixed!');
}

// Run the script
fixAllFiles();
