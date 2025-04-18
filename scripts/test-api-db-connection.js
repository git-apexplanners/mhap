/**
 * Script to test database connection with the same configuration as the API
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

async function testApiDbConnection() {
  console.log('Testing API database connection...');
  
  // Log environment variables (excluding sensitive info)
  console.log('Environment variables:', {
    MYSQL_HOST: process.env.MYSQL_HOST || 'not set',
    MYSQL_USER: process.env.MYSQL_USER || 'not set',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'not set',
    MYSQL_PASSWORD_SET: process.env.MYSQL_PASSWORD ? 'yes' : 'no',
  });
  
  try {
    // Create connection using environment variables
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DATABASE || 'project_bolt'
    });

    console.log('Connected to MySQL successfully!');
    
    // Test query to get categories
    const [categories] = await connection.execute('SELECT * FROM categories');
    console.log(`Found ${categories.length} categories:`);
    categories.forEach(category => {
      console.log(`- ${category.name} (${category.slug})`);
    });
    
    // Close connection
    await connection.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    if (error.code === 'ECONNREFUSED') {
      console.error('Make sure MySQL server is running and accessible.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Access denied. Check your username and password.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('Database does not exist.');
    }
    process.exit(1);
  }
}

// Run the test
testApiDbConnection();
