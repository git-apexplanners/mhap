-- Sample data for Michael Hart Architects Website

-- Insert admin user (password: Admin123!)
INSERT INTO users (id, name, email, password, role) VALUES 
('1', 'Admin', 'admin@michaelhartarchitects.co.za', '$2b$10$8OuSB.LZQJ0LTnuGZdXOxu0/XQKm7y8LnqS7UH2qP1nRRY0kFwpwW', 'admin');

-- Insert main categories
INSERT INTO categories (id, name, slug, parent_id) VALUES 
('cat-1', 'Architecture', 'architecture', NULL),
('cat-2', 'Urban Design', 'urban-design', NULL);

-- Insert subcategories for Architecture
INSERT INTO categories (id, name, slug, parent_id) VALUES 
('cat-1-1', 'Housing', 'housing', 'cat-1'),
('cat-1-2', 'Private Residences', 'private-residences', 'cat-1'),
('cat-1-3', 'Counseling', 'counseling', 'cat-1');

-- Insert subcategories for Urban Design
INSERT INTO categories (id, name, slug, parent_id) VALUES 
('cat-2-1', 'Heritage', 'heritage', 'cat-2'),
('cat-2-2', 'Urban Regeneration', 'urban-regeneration', 'cat-2'),
('cat-2-3', 'Informal Settlement Upgrade', 'informal-settlement-upgrade', 'cat-2'),
('cat-2-4', 'Neighborhood Design', 'neighborhood-design', 'cat-2');

-- Insert sample projects for Housing
INSERT INTO projects (id, title, slug, description, content, featured_image, category_id, published) VALUES 
('proj-1', 'Affordable Housing Complex', 'affordable-housing-complex', 'A modern affordable housing complex in Cape Town', '<p>This project focuses on creating affordable yet dignified housing solutions for urban residents.</p>', '/images/projects/housing-1.jpg', 'cat-1-1', TRUE),
('proj-2', 'Social Housing Development', 'social-housing-development', 'Social housing project with community facilities', '<p>A comprehensive social housing development that integrates community spaces and facilities.</p>', '/images/projects/housing-2.jpg', 'cat-1-1', TRUE);

-- Insert sample projects for Private Residences
INSERT INTO projects (id, title, slug, description, content, featured_image, category_id, published) VALUES 
('proj-3', 'Clifton Beach House', 'clifton-beach-house', 'Luxury beach house with panoramic ocean views', '<p>A contemporary beach house designed to maximize views while providing privacy and comfort.</p>', '/images/projects/residence-1.jpg', 'cat-1-2', TRUE),
('proj-4', 'Mountain Retreat', 'mountain-retreat', 'Sustainable mountain home with minimal environmental impact', '<p>This mountain retreat blends into its natural surroundings while offering modern comforts.</p>', '/images/projects/residence-2.jpg', 'cat-1-2', TRUE);

-- Insert sample projects for Urban Regeneration
INSERT INTO projects (id, title, slug, description, content, featured_image, category_id, published) VALUES 
('proj-5', 'City Center Revitalization', 'city-center-revitalization', 'Comprehensive urban renewal project for downtown area', '<p>A multi-phase urban regeneration project that transforms underutilized spaces into vibrant public areas.</p>', '/images/projects/urban-1.jpg', 'cat-2-2', TRUE),
('proj-6', 'Waterfront Development', 'waterfront-development', 'Mixed-use waterfront development with public access', '<p>This waterfront project creates a seamless connection between the city and its waterfront.</p>', '/images/projects/urban-2.jpg', 'cat-2-2', TRUE);

-- Insert sample pages
INSERT INTO pages (id, title, slug, content, published, sort_order) VALUES 
('page-1', 'About Us', 'about', '<h1>About Michael Hart Architects</h1><p>Michael Hart Architects is a leading architectural firm based in Cape Town, South Africa, specializing in sustainable design solutions for both urban and residential projects.</p>', TRUE, 1),
('page-2', 'Services', 'services', '<h1>Our Services</h1><p>We offer a comprehensive range of architectural and urban design services, from concept development to construction administration.</p>', TRUE, 2),
('page-3', 'Contact', 'contact', '<h1>Contact Us</h1><p>Get in touch with our team to discuss your project needs and how we can help bring your vision to life.</p>', TRUE, 3);
