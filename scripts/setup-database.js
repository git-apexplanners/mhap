/**
 * Database Setup Script
 *
 * This script sets up the MySQL database for the website.
 * It creates the database, tables, and adds sample data.
 *
 * Usage:
 * node scripts/setup-database.js
 */

const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Qwerty777$$$',
  multipleStatements: true // Allow multiple SQL statements in one query
};

// Database name
const DB_NAME = 'project_bolt';

// SQL statements to create tables
const CREATE_TABLES_SQL = `
-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  parent_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  featured_image VARCHAR(255),
  main_image_url VARCHAR(255),
  gallery_image_urls JSON,
  category_id VARCHAR(36),
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Project images table
CREATE TABLE IF NOT EXISTS project_images (
  id VARCHAR(36) PRIMARY KEY,
  project_id VARCHAR(36) NOT NULL,
  url VARCHAR(255) NOT NULL,
  alt VARCHAR(255),
  \`order\` INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT,
  published BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

// Sample data for categories
const sampleCategories = [
  { id: 'arch-1', name: 'Architecture', slug: 'architecture', parent_id: null },
  { id: 'urban-1', name: 'Urban Design', slug: 'urban-design', parent_id: null },
  { id: 'housing-1', name: 'Housing', slug: 'housing', parent_id: 'arch-1' },
  { id: 'private-1', name: 'Private Residences', slug: 'private-residences', parent_id: 'arch-1' },
  { id: 'counseling-1', name: 'Counseling', slug: 'counseling', parent_id: 'arch-1' },
  { id: 'heritage-1', name: 'Heritage', slug: 'heritage', parent_id: 'urban-1' },
  { id: 'regeneration-1', name: 'Urban Regeneration', slug: 'regeneration', parent_id: 'urban-1' },
  { id: 'informal-1', name: 'Informal Settlement Upgrade', slug: 'informal-settlement', parent_id: 'urban-1' },
  { id: 'neighborhood-1', name: 'Neighborhood Design', slug: 'neighborhood', parent_id: 'urban-1' }
];

// Sample data for projects
const sampleProjects = [
  {
    id: 'proj-1',
    title: 'Sample Architecture Project',
    slug: 'sample-architecture-project',
    description: 'This is a sample architecture project',
    content: '<p>This is the content for the sample architecture project.</p>',
    main_image_url: '/images/placeholder.jpg',
    category_id: 'arch-1',
    published: true
  },
  {
    id: 'proj-2',
    title: 'Sample Urban Design Project',
    slug: 'sample-urban-design-project',
    description: 'This is a sample urban design project',
    content: '<p>This is the content for the sample urban design project.</p>',
    main_image_url: '/images/placeholder.jpg',
    category_id: 'urban-1',
    published: true
  }
];

// Sample data for pages
const samplePages = [
  {
    id: 'page-1',
    title: 'About Us',
    slug: 'about',
    content: '<p>This is the about page content.</p>',
    published: true,
    sort_order: 1
  },
  {
    id: 'page-2',
    title: 'Contact',
    slug: 'contact',
    content: '<p>This is the contact page content.</p>',
    published: true,
    sort_order: 2
  }
];

// Sample data for project images
const sampleProjectImages = [
  {
    id: 'img-1',
    project_id: 'proj-1',
    url: '/images/placeholder.jpg',
    alt: 'Sample image 1',
    order: 1
  },
  {
    id: 'img-2',
    project_id: 'proj-1',
    url: '/images/placeholder.jpg',
    alt: 'Sample image 2',
    order: 2
  },
  {
    id: 'img-3',
    project_id: 'proj-2',
    url: '/images/placeholder.jpg',
    alt: 'Sample image 3',
    order: 1
  }
];

// Sample data for users
// Note: In a real application, passwords should be hashed
// This is a hashed version of "admin123" using bcrypt
const sampleUsers = [
  {
    id: 'user-1',
    email: 'admin@example.com',
    password: '$2b$10$8OxDEuDS7HN5.Z0vRrOUB.jEX4V9JR9K9LYf1.zjH.8.z7.JRKUWC',
    name: 'Admin User',
    role: 'admin',
    is_active: true
  },
  {
    id: 'user-2',
    email: 'editor@example.com',
    password: '$2b$10$8OxDEuDS7HN5.Z0vRrOUB.jEX4V9JR9K9LYf1.zjH.8.z7.JRKUWC',
    name: 'Editor User',
    role: 'editor',
    is_active: true
  }
];

// Helper function to format dates for MySQL
function formatMySQLDate(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Main function to set up the database
async function setupDatabase() {
  let connection;

  try {
    console.log('Starting database setup...');

    // Create connection without database selected
    connection = await mysql.createConnection(dbConfig);

    // Create database if it doesn't exist
    console.log(`Creating database ${DB_NAME} if it doesn't exist...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

    // Use the database
    console.log(`Using database ${DB_NAME}...`);
    await connection.query(`USE ${DB_NAME}`);

    // Create tables
    console.log('Creating tables...');
    await connection.query(CREATE_TABLES_SQL);

    // Insert sample categories
    console.log('Inserting sample categories...');
    for (const category of sampleCategories) {
      const now = new Date();
      const mysqlDatetime = formatMySQLDate(now);

      await connection.query(
        'INSERT INTO categories (id, name, slug, parent_id, created_at) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)',
        [category.id, category.name, category.slug, category.parent_id, mysqlDatetime]
      );
    }

    // Insert sample projects
    console.log('Inserting sample projects...');
    for (const project of sampleProjects) {
      const now = new Date();
      const mysqlDatetime = formatMySQLDate(now);

      // Handle gallery_image_urls as JSON
      const gallery_image_urls = project.gallery_image_urls
        ? JSON.stringify(project.gallery_image_urls)
        : null;

      await connection.query(
        `INSERT INTO projects (
          id, title, slug, description, content, featured_image,
          main_image_url, gallery_image_urls, category_id, published,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title)`,
        [
          project.id, project.title, project.slug, project.description, project.content,
          project.featured_image || null, project.main_image_url, gallery_image_urls,
          project.category_id, project.published, mysqlDatetime, mysqlDatetime
        ]
      );
    }

    // Insert sample pages
    console.log('Inserting sample pages...');
    for (const page of samplePages) {
      const now = new Date();
      const mysqlDatetime = formatMySQLDate(now);

      await connection.query(
        `INSERT INTO pages (
          id, title, slug, content, published, sort_order, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title)`,
        [
          page.id, page.title, page.slug, page.content,
          page.published, page.sort_order, mysqlDatetime, mysqlDatetime
        ]
      );
    }

    // Insert sample project images
    console.log('Inserting sample project images...');
    for (const image of sampleProjectImages) {
      const now = new Date();
      const mysqlDatetime = formatMySQLDate(now);

      await connection.query(
        'INSERT INTO project_images (id, project_id, url, alt, `order`, created_at) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE url = VALUES(url)',
        [image.id, image.project_id, image.url, image.alt, image.order, mysqlDatetime]
      );
    }

    console.log('Database setup completed successfully!');

    // Insert sample users
    console.log('Inserting sample users...');
    for (const user of sampleUsers) {
      const now = new Date();
      const mysqlDatetime = formatMySQLDate(now);

      await connection.query(
        `INSERT INTO users (
          id, email, password, name, role, created_at, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE email = VALUES(email)`,
        [
          user.id, user.email, user.password, user.name, user.role, mysqlDatetime, user.is_active
        ]
      );
    }

    // Verify setup by counting records in each table
    const [categoryCount] = await connection.query('SELECT COUNT(*) as count FROM categories');
    const [projectCount] = await connection.query('SELECT COUNT(*) as count FROM projects');
    const [pageCount] = await connection.query('SELECT COUNT(*) as count FROM pages');
    const [imageCount] = await connection.query('SELECT COUNT(*) as count FROM project_images');
    const [userCount] = await connection.query('SELECT COUNT(*) as count FROM users');

    console.log('Database statistics:');
    console.log(`- Categories: ${categoryCount[0].count}`);
    console.log(`- Projects: ${projectCount[0].count}`);
    console.log(`- Pages: ${pageCount[0].count}`);
    console.log(`- Project Images: ${imageCount[0].count}`);
    console.log(`- Users: ${userCount[0].count}`);

  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup function
setupDatabase();
