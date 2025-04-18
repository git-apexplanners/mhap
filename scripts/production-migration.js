/**
 * Production Migration Script
 * 
 * This script helps with migrating from Supabase to MySQL in production.
 * It performs the following tasks:
 * 1. Checks if the MySQL database is accessible
 * 2. Verifies that the schema has been applied
 * 3. Checks if the upload directories exist
 * 4. Verifies that the environment variables are set correctly
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function checkMySQLConnection() {
  try {
    console.log('Checking MySQL connection...');
    
    // Create connection using environment variables
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DATABASE || 'project_bolt'
    });
    
    console.log('✅ Connected to MySQL successfully!');
    
    // Check if tables exist
    console.log('\nChecking if tables exist...');
    const [tables] = await connection.execute('SHOW TABLES');
    
    const tableNames = tables.map(table => Object.values(table)[0]);
    console.log(`Found ${tableNames.length} tables: ${tableNames.join(', ')}`);
    
    const requiredTables = ['categories', 'projects', 'project_images', 'pages'];
    const missingTables = requiredTables.filter(table => !tableNames.includes(table));
    
    if (missingTables.length > 0) {
      console.error(`❌ Missing tables: ${missingTables.join(', ')}`);
      console.error('Please apply the schema to the database.');
    } else {
      console.log('✅ All required tables exist!');
    }
    
    // Close connection
    await connection.end();
  } catch (error) {
    console.error('❌ Error connecting to MySQL:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Make sure MySQL server is running and accessible.');
    }
  }
}

function checkUploadDirectories() {
  console.log('\nChecking upload directories...');
  
  const directories = [
    'public/uploads',
    'public/uploads/projects',
    'public/uploads/projects/main',
    'public/uploads/projects/gallery',
    'public/uploads/pages'
  ];
  
  const missingDirectories = [];
  
  directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      missingDirectories.push(dir);
      console.error(`❌ Directory does not exist: ${dir}`);
    } else {
      console.log(`✅ Directory exists: ${dir}`);
    }
  });
  
  if (missingDirectories.length > 0) {
    console.error('\nPlease create the missing directories:');
    missingDirectories.forEach(dir => {
      console.log(`mkdir -p ${dir}`);
    });
  }
}

function checkEnvironmentVariables() {
  console.log('\nChecking environment variables...');
  
  const requiredVars = [
    'MYSQL_HOST',
    'MYSQL_PORT',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE'
  ];
  
  const missingVars = [];
  
  requiredVars.forEach(variable => {
    if (!process.env[variable]) {
      missingVars.push(variable);
      console.error(`❌ Missing environment variable: ${variable}`);
    } else {
      console.log(`✅ Environment variable set: ${variable}`);
    }
  });
  
  if (missingVars.length > 0) {
    console.error('\nPlease set the missing environment variables.');
  }
}

async function runMigrationChecks() {
  console.log('=== Production Migration Checks ===\n');
  
  await checkMySQLConnection();
  checkUploadDirectories();
  checkEnvironmentVariables();
  
  console.log('\n=== Migration Checks Complete ===');
}

// Run the migration checks
runMigrationChecks();
