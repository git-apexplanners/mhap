/**
 * Script to clean up Supabase-related code
 * 
 * This script removes the dummy Supabase client from lib/supabase.ts
 * and updates it to only export the cached data implementation.
 */

const fs = require('fs');
const path = require('path');

// Path to the supabase.ts file
const supabasePath = path.join(process.cwd(), 'lib', 'supabase.ts');

// New content for the supabase.ts file
const newContent = `/**
 * This file is kept for backward compatibility during migration
 * It now re-exports the MySQL-based cached data implementation
 */

import { cachedData } from './cached-data';

// Export the cached data implementation
export { cachedData };
`;

/**
 * Main function
 */
async function main() {
  try {
    // Check if the file exists
    if (!fs.existsSync(supabasePath)) {
      console.error('Supabase file not found:', supabasePath);
      process.exit(1);
    }
    
    // Write the new content to the file
    fs.writeFileSync(supabasePath, newContent);
    console.log('Supabase file updated successfully!');
  } catch (error) {
    console.error('Error updating Supabase file:', error);
    process.exit(1);
  }
}

// Run the script
main();
