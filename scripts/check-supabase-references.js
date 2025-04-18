/**
 * Script to check for remaining Supabase references
 *
 * This script scans the codebase for any remaining references to Supabase
 * that need to be updated to use MySQL instead.
 */

const fs = require('fs');
const path = require('path');

// Directories to scan
const dirsToScan = ['app', 'components', 'lib'];

// Files to ignore (already migrated or intentionally kept)
const ignoredFiles = [
  'lib/supabase.ts', // This file is kept for backward compatibility
  'scripts/cleanup-supabase.js', // This is the cleanup script itself
];

// Function to check if a file should be ignored
function shouldIgnoreFile(filePath) {
  return ignoredFiles.some(ignoredPath => filePath.includes(ignoredPath));
}

// Function to scan a file for Supabase references
function scanFileForSupabase(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Check for direct Supabase references
    const directReferences = [
      'supabase.',
      'createClient',
      'from(\'',
      '.storage',
      '.auth',
      '.rpc',
    ];

    const hasDirectReferences = directReferences.some(ref => content.includes(ref));

    // Check for import statements
    const importRegex = /import.*from.*supabase/;
    const hasImport = importRegex.test(content);

    if (hasDirectReferences || hasImport) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error scanning file ${filePath}:`, error.message);
    return false;
  }
}

// Main function to scan the codebase
function scanCodebase() {
  console.log('Scanning codebase for Supabase references...');

  let filesWithReferences = [];

  dirsToScan.forEach(dir => {
    try {
      const dirPath = path.join(process.cwd(), dir);
      if (fs.existsSync(dirPath)) {
        const results = scanDirectory(dirPath);
        filesWithReferences = [...filesWithReferences, ...results];
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error.message);
    }
  });

  return filesWithReferences;
}

// Run the scan
const filesWithReferences = scanCodebase();

if (filesWithReferences.length > 0) {
  console.log('\nFound Supabase references in the following files:');
  filesWithReferences.forEach(file => {
    console.log(`- ${file}`);
  });
  console.log(`\nTotal files with Supabase references: ${filesWithReferences.length}`);
  console.log('\nThese files need to be updated to use MySQL instead of Supabase.');
} else {
  console.log('\nNo Supabase references found! The migration is complete.');
}
