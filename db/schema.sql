-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS project_bolt;

-- Use the database
USE project_bolt;

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
  `order` INT DEFAULT 0,
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

-- Insert default categories
INSERT INTO categories (id, name, slug, parent_id) VALUES
('arch-1', 'Architecture', 'architecture', NULL),
('urban-1', 'Urban Design', 'urban-design', NULL),
('housing-1', 'Housing', 'housing', 'arch-1'),
('private-1', 'Private Residences', 'private-residences', 'arch-1'),
('counseling-1', 'Counseling', 'counseling', 'arch-1'),
('heritage-1', 'Heritage', 'heritage', 'urban-1'),
('regeneration-1', 'Urban Regeneration', 'regeneration', 'urban-1'),
('informal-1', 'Informal Settlement Upgrade', 'informal-settlement', 'urban-1'),
('neighborhood-1', 'Neighborhood Design', 'neighborhood', 'urban-1')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample projects
INSERT INTO projects (id, title, slug, description, content, main_image_url, category_id, published) VALUES
('proj-1', 'Sample Architecture Project', 'sample-architecture-project', 
 'This is a sample architecture project', 
 '<p>This is the content for the sample architecture project.</p>', 
 '/images/placeholder.jpg', 'arch-1', TRUE),
('proj-2', 'Sample Urban Design Project', 'sample-urban-design-project', 
 'This is a sample urban design project', 
 '<p>This is the content for the sample urban design project.</p>', 
 '/images/placeholder.jpg', 'urban-1', TRUE)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Insert sample pages
INSERT INTO pages (id, title, slug, content, published, sort_order) VALUES
('page-1', 'About Us', 'about', '<p>This is the about page content.</p>', TRUE, 1),
('page-2', 'Contact', 'contact', '<p>This is the contact page content.</p>', TRUE, 2)
ON DUPLICATE KEY UPDATE title = VALUES(title);
