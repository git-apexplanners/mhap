/**
 * Script to migrate remaining files from Supabase to MySQL
 * 
 * This script updates the remaining files that still use Supabase
 * to use MySQL instead.
 */

const fs = require('fs');
const path = require('path');

// Files to migrate
const filesToMigrate = [
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

// Function to update imports
function updateImports(content) {
  // Replace Supabase imports with MySQL imports
  return content
    .replace(/import\s+{\s*supabase\s*}\s+from\s+['"]@\/lib\/supabase['"];?/g, 
             'import { db } from \'@/lib/mysql\';\nimport { cachedData } from \'@/lib/cached-data\';')
    .replace(/import\s+{\s*cachedData\s*}\s+from\s+['"]@\/lib\/supabase['"];?/g, 
             'import { cachedData } from \'@/lib/cached-data\';')
    .replace(/import\s+{\s*Project(?:,\s*Category)?(?:,\s*\w+)*\s*}\s+from\s+['"]@\/lib\/supabase['"];?/g, 
             'import { Project, Category } from \'@/lib/mysql\';');
}

// Function to update Supabase queries
function updateQueries(content) {
  // Replace Supabase queries with MySQL queries
  return content
    // Replace category queries
    .replace(/const\s+{\s*data(?::\s*categories)?(?:,\s*error)?\s*}\s*=\s*await\s+supabase\s*\.\s*from\(['"]categories['"]\)\s*\.\s*select\(['"]\*['"]\)/g,
             'const categories = await cachedData.getCategories()')
    // Replace project queries
    .replace(/const\s+{\s*data(?::\s*projects)?(?:,\s*error)?\s*}\s*=\s*await\s+supabase\s*\.\s*from\(['"]projects['"]\)\s*\.\s*select\(['"]\*['"]\)/g,
             'const projects = await cachedData.getProjects()')
    // Replace page queries
    .replace(/const\s+{\s*data(?::\s*pages)?(?:,\s*error)?\s*}\s*=\s*await\s+supabase\s*\.\s*from\(['"]pages['"]\)\s*\.\s*select\(['"]\*['"]\)/g,
             'const pages = await cachedData.getPages()');
}

// Function to migrate a file
function migrateFile(filePath) {
  console.log(`Migrating file: ${filePath}`);
  
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Update imports and queries
    let updatedContent = updateImports(content);
    updatedContent = updateQueries(updatedContent);
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`✅ Successfully migrated: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error migrating file ${filePath}:`, error.message);
  }
}

// Main function to migrate all files
function migrateFiles() {
  console.log('Starting migration of remaining files...');
  
  filesToMigrate.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    migrateFile(filePath);
  });
  
  console.log('Migration complete!');
}

// Run the migration
migrateFiles();
