/**
 * Database setup script for cPanel environments
 * 
 * This script reads the database configuration from the .env file
 * and sets up the database schema and sample data.
 * 
 * Usage:
 * node database/setup-cpanel-db.js
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env' });

// Database configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true
};

// Read SQL files
const schemaPath = path.join(__dirname, 'schema.sql');
const sampleDataPath = path.join(__dirname, 'sample-data.sql');

const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
const sampleDataSQL = fs.readFileSync(sampleDataPath, 'utf8');

async function setupDatabase() {
  console.log('Setting up database...');
  console.log(`Host: ${dbConfig.host}`);
  console.log(`Database: ${dbConfig.database}`);
  
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      multipleStatements: true
    });
    
    // Create database if it doesn't exist
    console.log(`Creating database ${dbConfig.database} if it doesn't exist...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    
    // Use the database
    console.log(`Using database ${dbConfig.database}...`);
    await connection.query(`USE ${dbConfig.database}`);
    
    // Execute schema SQL
    console.log('Creating database schema...');
    await connection.query(schemaSQL);
    console.log('Schema created successfully.');
    
    // Ask if sample data should be imported
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question('Do you want to import sample data? (y/n) ', async (answer) => {
      if (answer.toLowerCase() === 'y') {
        // Execute sample data SQL
        console.log('Importing sample data...');
        await connection.query(sampleDataSQL);
        console.log('Sample data imported successfully.');
      } else {
        console.log('Skipping sample data import.');
      }
      
      // Close connection
      await connection.end();
      readline.close();
      console.log('Database setup completed.');
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
