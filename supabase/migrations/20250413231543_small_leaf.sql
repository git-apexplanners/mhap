/*
  # Create projects and categories tables

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `parent_id` (uuid, self-referential foreign key)
      - `created_at` (timestamp)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `content` (text)
      - `featured_image` (text)
      - `category_id` (uuid, foreign key)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `project_images`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `url` (text)
      - `alt` (text)
      - `order` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Add policies for public users to read published content
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  parent_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  content text,
  featured_image text,
  category_id uuid REFERENCES categories(id),
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create project_images table
CREATE TABLE project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Categories policies
CREATE POLICY "Allow public read access to categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Projects policies
CREATE POLICY "Allow public read access to published projects"
  ON projects
  FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Allow authenticated users to manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Project images policies
CREATE POLICY "Allow public read access to project images"
  ON project_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage project images"
  ON project_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);