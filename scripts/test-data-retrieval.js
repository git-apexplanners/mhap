/**
 * Script to test data retrieval from MySQL
 * 
 * This script tests data retrieval by fetching data from all tables
 * and verifying that the data is being retrieved correctly.
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

async function testDataRetrieval() {
  console.log('Testing data retrieval from MySQL...');
  
  try {
    // Create connection using environment variables
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DATABASE || 'project_bolt'
    });
    
    console.log('✅ Connected to MySQL successfully!');
    
    // Test category retrieval
    console.log('\nTesting category retrieval...');
    const [categories] = await connection.execute('SELECT * FROM categories');
    console.log(`✅ Retrieved ${categories.length} categories`);
    
    // Test project retrieval
    console.log('\nTesting project retrieval...');
    const [projects] = await connection.execute('SELECT * FROM projects');
    console.log(`✅ Retrieved ${projects.length} projects`);
    
    // Test page retrieval
    console.log('\nTesting page retrieval...');
    const [pages] = await connection.execute('SELECT * FROM pages');
    console.log(`✅ Retrieved ${pages.length} pages`);
    
    // Test joining tables
    console.log('\nTesting joining tables...');
    const [projectsWithCategories] = await connection.execute(`
      SELECT p.id, p.title, p.slug, c.name as category_name
      FROM projects p
      JOIN categories c ON p.category_id = c.id
      WHERE p.published = true
      LIMIT 5
    `);
    console.log(`✅ Retrieved ${projectsWithCategories.length} projects with categories`);
    
    // Display sample data
    if (projectsWithCategories.length > 0) {
      console.log('\nSample project with category:');
      console.log(projectsWithCategories[0]);
    }
    
    // Close connection
    await connection.end();
    console.log('\n✅ Data retrieval tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Error testing data retrieval:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Make sure MySQL server is running and accessible.');
    }
    process.exit(1);
  }
}

// Run the tests
testDataRetrieval();
