import mysql from 'mysql2/promise';

// Check if we're on the server side
const isServer = typeof window === 'undefined';

// MySQL connection info is checked but not logged to console
// to avoid console warnings

// Create a connection pool only on the server side
const pool = isServer
  ? mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'project_bolt',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  : null;

// Helper function to execute queries
// Define a more specific type for query parameters
type QueryParam = string | number | boolean | null | Buffer | Date;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query(sql: string, params: QueryParam[] = []) {
  // Check if we're on the server side
  if (!isServer) {
    console.error('Database queries can only be executed on the server side');
    throw new Error('Cannot execute database query on the client side');
  }

  try {
    const [results] = await pool!.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Types for our database models
export type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  featured_image: string | null;
  main_image_url: string | null;
  gallery_image_urls: string[] | null;
  category_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  url: string;
  alt: string | null;
  order: number;
  created_at: string;
};

export type Page = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;

  // These fields are not in the database but used in the UI
  // They will be ignored when saving to the database
  description?: string | null;
  featured_image?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  parent_id?: string | null;
  page_type?: string;
};

// Database helper functions
export const db = {
  // Categories
  async getCategories() {
    return await query('SELECT * FROM categories ORDER BY name') as Category[];
  },

  async getCategoryById(id: string) {
    const results = await query('SELECT * FROM categories WHERE id = ?', [id]) as Category[];
    return results.length ? results[0] : null;
  },

  async createCategory(category: Omit<Category, 'id' | 'created_at'>) {
    const id = generateId();

    // Format date for MySQL timestamp
    const now = new Date();
    const mysqlDatetime = formatMySQLDate(now);
    await query(
      'INSERT INTO categories (id, name, slug, parent_id, created_at) VALUES (?, ?, ?, ?, ?)',
      [id, category.name, category.slug, category.parent_id, mysqlDatetime]
    );
    return { id, ...category, created_at: now.toISOString() };
  },

  async updateCategory(id: string, category: Partial<Omit<Category, 'id' | 'created_at'>>) {
    const updates = Object.entries(category)
      .filter(([_, value]) => value !== undefined)
      .map(([key, _]) => `${key} = ?`);

    if (updates.length === 0) return await db.getCategoryById(id);

    const values = Object.entries(category)
      .filter(([_, value]) => value !== undefined)
      .map(([_, value]) => value);

    await query(
      `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`,
      [...values, id]
    );

    return await db.getCategoryById(id);
  },

  async deleteCategory(id: string) {
    await query('DELETE FROM categories WHERE id = ?', [id]);
  },

  // Projects
  async getProjects() {
    return await query('SELECT * FROM projects ORDER BY created_at DESC') as Project[];
  },

  async getProjectById(id: string) {
    const results = await query('SELECT * FROM projects WHERE id = ?', [id]) as Project[];
    return results.length ? results[0] : null;
  },

  async getProjectBySlug(slug: string) {
    const results = await query('SELECT * FROM projects WHERE slug = ?', [slug]) as Project[];
    return results.length ? results[0] : null;
  },

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const id = generateId();

    // Format date for MySQL timestamp
    const now = new Date();
    const mysqlDatetime = formatMySQLDate(now);

    // Handle gallery_image_urls as JSON
    const gallery_image_urls = project.gallery_image_urls
      ? JSON.stringify(project.gallery_image_urls)
      : null;

    await query(
      `INSERT INTO projects (
        id, title, slug, description, content, featured_image,
        main_image_url, gallery_image_urls, category_id, published,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, project.title, project.slug, project.description, project.content,
        project.featured_image, project.main_image_url, gallery_image_urls,
        project.category_id, project.published, mysqlDatetime, mysqlDatetime
      ]
    );

    return {
      id,
      ...project,
      created_at: now.toISOString(),
      updated_at: now.toISOString()
    };
  },

  async updateProject(id: string, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) {
    const updates = Object.entries(project)
      .filter(([_, value]) => value !== undefined)
      .map(([key, _]) => `${key} = ?`);

    if (updates.length === 0) return await db.getProjectById(id);

    const values = Object.entries(project)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        // Handle gallery_image_urls as JSON
        if (key === 'gallery_image_urls' && value !== null) {
          return JSON.stringify(value);
        }
        return value;
      });

    // Format date for MySQL timestamp
    const now = new Date();
    const mysqlDatetime = formatMySQLDate(now);

    await query(
      `UPDATE projects SET ${updates.join(', ')}, updated_at = ? WHERE id = ?`,
      [...values, mysqlDatetime, id]
    );

    return await db.getProjectById(id);
  },

  async deleteProject(id: string) {
    await query('DELETE FROM projects WHERE id = ?', [id]);
  },

  // Project Images
  async getProjectImages(projectId: string) {
    return await query(
      'SELECT * FROM project_images WHERE project_id = ? ORDER BY `order`',
      [projectId]
    ) as ProjectImage[];
  },

  async createProjectImage(image: Omit<ProjectImage, 'id' | 'created_at'>) {
    const id = generateId();

    // Format date for MySQL timestamp
    const now = new Date();
    const mysqlDatetime = formatMySQLDate(now);

    await query(
      'INSERT INTO project_images (id, project_id, url, alt, `order`, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [id, image.project_id, image.url, image.alt, image.order, mysqlDatetime]
    );

    return { id, ...image, created_at: now.toISOString() };
  },

  async deleteProjectImage(id: string) {
    await query('DELETE FROM project_images WHERE id = ?', [id]);
  },

  // Pages
  async getPages() {
    return await query('SELECT * FROM pages ORDER BY sort_order') as Page[];
  },

  async getPageBySlug(slug: string) {
    const results = await query('SELECT * FROM pages WHERE slug = ?', [slug]) as Page[];
    return results.length ? results[0] : null;
  },

  async createPage(page: Omit<Page, 'id' | 'created_at' | 'updated_at'>) {
    const id = generateId();

    // Format date for MySQL timestamp
    const now = new Date();
    const mysqlDatetime = formatMySQLDate(now);

    // Only use fields that exist in the database
    await query(
      `INSERT INTO pages (
        id, title, slug, content, published, sort_order, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, page.title, page.slug, page.content,
        page.published, page.sort_order || 0, mysqlDatetime, mysqlDatetime
      ]
    );

    return {
      id,
      title: page.title,
      slug: page.slug,
      content: page.content,
      published: page.published,
      sort_order: page.sort_order || 0,
      created_at: now.toISOString(),
      updated_at: now.toISOString()
    };
  },

  async updatePage(id: string, page: Partial<Omit<Page, 'id' | 'created_at' | 'updated_at'>>) {
    // Filter out fields that don't exist in the database
    const validFields = ['title', 'slug', 'content', 'published', 'sort_order'];
    const filteredPage: Record<string, unknown> = {};

    // Only include fields that exist in the database
    Object.entries(page).forEach(([key, value]) => {
      if (validFields.includes(key)) {
        filteredPage[key] = value;
      }
    });

    const updates = Object.entries(filteredPage)
      .filter(([_, value]) => value !== undefined)
      .map(([key, _]) => `${key} = ?`);

    if (updates.length === 0) {
      const pages = await db.getPages();
      return pages.find(p => p.id === id) || null;
    }

    const values = Object.entries(filteredPage)
      .filter(([_, value]) => value !== undefined)
      .map(([_, value]) => value);

    // Format date for MySQL timestamp
    const now = new Date();
    const mysqlDatetime = formatMySQLDate(now);

    await query(
      `UPDATE pages SET ${updates.join(', ')}, updated_at = ? WHERE id = ?`,
      [...values, mysqlDatetime, id]
    );

    const pages = await db.getPages();
    return pages.find(p => p.id === id) || null;
  },

  async deletePage(id: string) {
    await query('DELETE FROM pages WHERE id = ?', [id]);
  }
};

// Helper function to generate unique IDs
function generateId() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

// Helper function to format dates for MySQL
function formatMySQLDate(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Default data for when database is not available
export const defaultData = {
  categories: [
    {
      id: 'arch-1',
      name: 'Architecture',
      slug: 'architecture',
      parent_id: null,
      created_at: new Date().toISOString()
    },
    {
      id: 'urban-1',
      name: 'Urban Design',
      slug: 'urban-design',
      parent_id: null,
      created_at: new Date().toISOString()
    }
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'Sample Project 1',
      slug: 'sample-project-1',
      description: 'This is a sample project',
      content: '<p>This is a sample project content.</p>',
      featured_image: null,
      main_image_url: '/images/placeholder.jpg',
      gallery_image_urls: [],
      category_id: 'arch-1',
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'proj-2',
      title: 'Sample Project 2',
      slug: 'sample-project-2',
      description: 'This is another sample project',
      content: '<p>This is another sample project content.</p>',
      featured_image: null,
      main_image_url: '/images/placeholder.jpg',
      gallery_image_urls: [],
      category_id: 'urban-1',
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],

  pages: [
    {
      id: 'page-1',
      title: 'About Us',
      slug: 'about',
      content: '<p>This is the about page content.</p>',
      published: true,
      sort_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'page-2',
      title: 'Contact',
      slug: 'contact',
      content: '<p>This is the contact page content.</p>',
      published: true,
      sort_order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};
