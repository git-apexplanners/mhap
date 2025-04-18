/**
 * Script to test MySQL connection directly without environment variables
 */

const mysql = require('mysql2/promise');

async function testDirectConnection() {
  console.log('Testing direct MySQL connection...');
  
  try {
    // Create connection with hardcoded values
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'password',
      database: 'project_bolt'
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
    process.exit(1);
  }
}

// Run the test
testDirectConnection();
