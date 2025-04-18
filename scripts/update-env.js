/**
 * Script to update environment variables
 * 
 * This script updates the .env file to remove Supabase-related variables
 * and add MySQL-related variables.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Path to the .env file
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

// MySQL environment variables to add
const mysqlVars = {
  MYSQL_HOST: 'localhost',
  MYSQL_PORT: '3306',
  MYSQL_USER: 'root',
  MYSQL_PASSWORD: '',
  MYSQL_DATABASE: 'project_bolt',
};

// Supabase variables to remove
const supabaseVarsToRemove = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
];

/**
 * Update the .env file
 */
async function updateEnvFile(filePath) {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.log(`Creating new ${path.basename(filePath)} file...`);
    
    // Create a new .env file with MySQL variables
    const envContent = Object.entries(mysqlVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    fs.writeFileSync(filePath, envContent);
    console.log(`Created ${path.basename(filePath)} file with MySQL variables.`);
    return;
  }
  
  // Read the existing .env file
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');
  
  // Keep track of variables we've seen
  const seenVars = new Set();
  
  // Process each line
  const updatedLines = lines.filter(line => {
    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith('#')) {
      return true;
    }
    
    // Parse the variable name
    const match = line.match(/^([A-Z0-9_]+)=/);
    if (!match) {
      return true;
    }
    
    const varName = match[1];
    seenVars.add(varName);
    
    // Remove Supabase variables
    return !supabaseVarsToRemove.includes(varName);
  });
  
  // Add MySQL variables if they don't exist
  for (const [key, value] of Object.entries(mysqlVars)) {
    if (!seenVars.has(key)) {
      updatedLines.push(`${key}=${value}`);
    }
  }
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedLines.join('\n'));
  console.log(`Updated ${path.basename(filePath)} file.`);
}

/**
 * Main function
 */
async function main() {
  try {
    // Update the .env file
    await updateEnvFile(envPath);
    
    // Update the .env.example file
    await updateEnvFile(envExamplePath);
    
    console.log('Environment variables updated successfully!');
  } catch (error) {
    console.error('Error updating environment variables:', error);
    process.exit(1);
  }
}

// Run the script
main();
