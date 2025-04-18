/**
 * Script to verify MySQL data
 * 
 * This script connects to the MySQL database and fetches data from all tables
 * to verify that the data is being stored and retrieved correctly.
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

async function verifyMySQLData() {
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
    
    // Fetch categories
    console.log('\n--- Categories ---');
    const [categories] = await connection.execute('SELECT * FROM categories');
    console.log(`Found ${categories.length} categories:`);
    categories.forEach(category => {
      console.log(`- ${category.name} (${category.slug})`);
    });
    
    // Fetch projects
    console.log('\n--- Projects ---');
    const [projects] = await connection.execute('SELECT * FROM projects');
    console.log(`Found ${projects.length} projects:`);
    projects.forEach(project => {
      console.log(`- ${project.title} (${project.slug})`);
      console.log(`  Category ID: ${project.category_id}`);
      console.log(`  Published: ${project.published ? 'Yes' : 'No'}`);
    });
    
    // Fetch project images
    console.log('\n--- Project Images ---');
    const [projectImages] = await connection.execute('SELECT * FROM project_images');
    console.log(`Found ${projectImages.length} project images:`);
    projectImages.forEach(image => {
      console.log(`- Image ID: ${image.id}`);
      console.log(`  Project ID: ${image.project_id}`);
      console.log(`  URL: ${image.url}`);
    });
    
    // Fetch pages
    console.log('\n--- Pages ---');
    const [pages] = await connection.execute('SELECT * FROM pages');
    console.log(`Found ${pages.length} pages:`);
    pages.forEach(page => {
      console.log(`- ${page.title} (${page.slug})`);
      console.log(`  Published: ${page.published ? 'Yes' : 'No'}`);
    });
    
    // Close connection
    await connection.end();
    console.log('\nConnection closed.');
  } catch (error) {
    console.error('Error verifying MySQL data:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Make sure MySQL server is running and accessible.');
    }
    process.exit(1);
  }
}

// Run the verification
verifyMySQLData();
