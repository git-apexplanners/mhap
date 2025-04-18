-- Add main_image_url column to projects table
ALTER TABLE projects
ADD COLUMN main_image_url TEXT NULL;

-- Add gallery_image_urls column to projects table (as an array of text)
ALTER TABLE projects
ADD COLUMN gallery_image_urls TEXT[] NULL;
