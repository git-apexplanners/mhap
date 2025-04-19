/**
 * Test Database Setup Script
 *
 * This script tests the database setup by connecting to the database
 * and querying each table to verify the data was inserted correctly.
 *
 * Usage:
 * node scripts/test-db-setup.js
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'project_bolt'
};

// Main function to test the database setup
async function testDatabaseSetup() {
  let connection;

  try {
    console.log('Testing database setup...');

    // Create connection
    connection = await mysql.createConnection(dbConfig);

    // Test connection
    console.log('Connected to MySQL successfully!');

    // Test categories table
    console.log('\nTesting categories table:');
    const [categories] = await connection.query('SELECT * FROM categories');
    console.log(`Found ${categories.length} categories:`);
    categories.forEach(category => {
      console.log(`- ${category.name} (${category.slug})`);
    });

    // Test projects table
    console.log('\nTesting projects table:');
    const [projects] = await connection.query('SELECT * FROM projects');
    console.log(`Found ${projects.length} projects:`);
    projects.forEach(project => {
      console.log(`- ${project.title} (${project.slug})`);
    });

    // Test pages table
    console.log('\nTesting pages table:');
    const [pages] = await connection.query('SELECT * FROM pages');
    console.log(`Found ${pages.length} pages:`);
    pages.forEach(page => {
      console.log(`- ${page.title} (${page.slug})`);
    });

    // Test project_images table
    console.log('\nTesting project_images table:');
    const [images] = await connection.query('SELECT * FROM project_images');
    console.log(`Found ${images.length} project images:`);
    images.forEach(image => {
      console.log(`- ${image.url} (Project ID: ${image.project_id})`);
    });

    // Test users table
    console.log('\nTesting users table:');
    const [users] = await connection.query('SELECT id, email, name, role, is_active FROM users');
    console.log(`Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}, Role: ${user.role})`);
    });

    // Test relationships
    console.log('\nTesting relationships:');

    // Test project-category relationship
    const [projectWithCategory] = await connection.query(`
      SELECT p.title, c.name as category_name
      FROM projects p
      JOIN categories c ON p.category_id = c.id
      LIMIT 1
    `);

    if (projectWithCategory.length > 0) {
      console.log(`Project-Category relationship: Project "${projectWithCategory[0].title}" belongs to category "${projectWithCategory[0].category_name}"`);
    } else {
      console.log('No project-category relationships found');
    }

    // Test project-image relationship
    const [projectWithImages] = await connection.query(`
      SELECT p.title, COUNT(pi.id) as image_count
      FROM projects p
      JOIN project_images pi ON p.id = pi.project_id
      GROUP BY p.id
      LIMIT 1
    `);

    if (projectWithImages.length > 0) {
      console.log(`Project-Image relationship: Project "${projectWithImages[0].title}" has ${projectWithImages[0].image_count} images`);
    } else {
      console.log('No project-image relationships found');
    }

    // Test category-subcategory relationship
    const [categoryWithSubcategories] = await connection.query(`
      SELECT p.name as parent_name, c.name as child_name
      FROM categories p
      JOIN categories c ON p.id = c.parent_id
      LIMIT 1
    `);

    if (categoryWithSubcategories.length > 0) {
      console.log(`Category-Subcategory relationship: Category "${categoryWithSubcategories[0].parent_name}" has subcategory "${categoryWithSubcategories[0].child_name}"`);
    } else {
      console.log('No category-subcategory relationships found');
    }

    console.log('\nDatabase setup test completed successfully!');

  } catch (error) {
    console.error('Error testing database setup:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the test function
testDatabaseSetup();
