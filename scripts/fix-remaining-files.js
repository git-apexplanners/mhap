/**
 * Script to fix remaining files with Supabase references
 * 
 * This script updates the remaining files that still use Supabase
 * to use MySQL instead.
 */

const fs = require('fs');
const path = require('path');

// Files to fix
const filesToFix = [
  'app/portfolio/architecture/private-residences/page.tsx',
  'app/portfolio/urban-design/heritage/page.tsx',
  'app/portfolio/urban-design/page.tsx'
];

// Function to fix a file
function fixFile(filePath) {
  console.log(`Fixing file: ${filePath}`);
  
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace Supabase queries with MySQL queries
    let updatedContent = content;
    
    // Replace category queries
    updatedContent = updatedContent.replace(
      /const\s+{\s*data:\s*categoryData\s*}\s*=\s*await\s+supabase\s*\.\s*from\(['"]categories['"]\)\s*\.\s*select\(['"]\*['"]\)(?:\s*\.\s*or\([^)]+\))?\s*\.\s*single\(\);/g,
      `// Get all categories
        const categories = await cachedData.getCategories();
        
        // Find the category
        const categoryData = categories.find(cat => 
          cat.slug === 'category-slug' || 
          cat.name.toLowerCase().includes('category-name')
        );`
    );
    
    // Replace project queries
    updatedContent = updatedContent.replace(
      /const\s+{\s*data:\s*projectsData\s*}\s*=\s*await\s+supabase\s*\.\s*from\(['"]projects['"]\)\s*\.\s*select\(['"]\*['"]\)\s*\.\s*eq\(['"]category_id['"]\s*,\s*categoryData\.id\)\s*\.\s*eq\(['"]published['"]\s*,\s*true\)\s*\.\s*order\(['"]created_at['"]\s*,\s*{\s*ascending:\s*false\s*}\);/g,
      `// Get all projects
          const allProjects = await cachedData.getProjects();
          
          // Filter projects by category and published status
          const projectsData = allProjects
            .filter(project => 
              project.category_id === categoryData.id && 
              project.published
            )
            // Sort by created_at (newest first)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());`
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`✅ Successfully fixed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing file ${filePath}:`, error.message);
  }
}

// Main function to fix all files
function fixAllFiles() {
  console.log('Starting to fix remaining files...');
  
  filesToFix.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    fixFile(filePath);
  });
  
  console.log('All files fixed!');
}

// Run the script
fixAllFiles();
