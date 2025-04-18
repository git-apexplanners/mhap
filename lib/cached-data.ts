import { Project, Category, ProjectImage, Page, db } from '@/lib/mysql';
import { apiClient } from '@/lib/api-client';
import { cache, cachedFetch } from '@/lib/cache';

// Cache keys
const CACHE_KEYS = {
  PROJECTS: 'projects',
  PROJECT: (id: string) => `project_${id}`,
  PROJECT_BY_SLUG: (slug: string) => `project_slug_${slug}`,
  PROJECT_IMAGES: (projectId: string) => `project_images_${projectId}`,
  CATEGORIES: 'categories',
  CATEGORY: (id: string) => `category_${id}`,
  PAGES: 'pages',
  PAGE: (id: string) => `page_${id}`,
  PAGE_BY_SLUG: (slug: string) => `page_slug_${slug}`,
};

// Default cache TTL (5 minutes)
const DEFAULT_TTL = 5 * 60 * 1000;

// Cached data access functions
export const cachedData = {
  // Projects
  async getProjects(): Promise<Project[]> {
    return cachedFetch(
      CACHE_KEYS.PROJECTS,
      async () => await apiClient.getProjects(),
      [],
      DEFAULT_TTL
    );
  },

  async getProjectById(id: string): Promise<Project | null> {
    return cachedFetch(
      CACHE_KEYS.PROJECT(id),
      async () => {
        try {
          // Try to fetch from API first
          const projects = await this.getProjects();
          const project = projects.find(p => p.id === id);
          if (project) return project;

          // If not found in API response, try direct DB access
          return await db.getProjectById(id);
        } catch (error) {
          console.error(`Error fetching project ${id}:`, error);
          return null;
        }
      },
      null,
      DEFAULT_TTL
    );
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return cachedFetch(
      CACHE_KEYS.PROJECT_BY_SLUG(slug),
      async () => {
        try {
          // Try to fetch from API first
          const projects = await this.getProjects();
          const project = projects.find(p => p.slug === slug);
          if (project) return project;

          // If not found in API response, try direct DB access
          return await db.getProjectBySlug(slug);
        } catch (error) {
          console.error(`Error fetching project by slug ${slug}:`, error);
          return null;
        }
      },
      null,
      DEFAULT_TTL
    );
  },

  async getProjectImages(projectId: string): Promise<ProjectImage[]> {
    return cachedFetch(
      CACHE_KEYS.PROJECT_IMAGES(projectId),
      async () => {
        try {
          // First try to get the project from the cache
          const project = await this.getProjectById(projectId);

          if (project && project.gallery_image_urls) {
            // If gallery_image_urls is a string (JSON), parse it
            const galleryUrls = typeof project.gallery_image_urls === 'string'
              ? JSON.parse(project.gallery_image_urls)
              : project.gallery_image_urls;

            // Convert to ProjectImage objects
            if (Array.isArray(galleryUrls)) {
              return galleryUrls.map((url, index) => ({
                id: `${projectId}_${index}`,
                project_id: projectId,
                url,
                alt: `Image ${index + 1} for ${project.title}`,
                order: index,
                created_at: project.created_at
              }));
            }
          }
          return [];
        } catch (error) {
          console.error(`Error fetching project images for ${projectId}:`, error);
          return [];
        }
      },
      [],
      DEFAULT_TTL
    );
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    return cachedFetch(
      CACHE_KEYS.CATEGORIES,
      async () => await apiClient.getCategories(),
      [],
      DEFAULT_TTL
    );
  },

  async getCategoryById(id: string): Promise<Category | null> {
    return cachedFetch(
      CACHE_KEYS.CATEGORY(id),
      async () => {
        try {
          // Try to fetch from API first
          const categories = await this.getCategories();
          const category = categories.find(c => c.id === id);
          if (category) return category;

          // If not found in API response, try direct DB access
          return await db.getCategoryById(id);
        } catch (error) {
          console.error(`Error fetching category ${id}:`, error);
          return null;
        }
      },
      null,
      DEFAULT_TTL
    );
  },

  // Pages
  async getPages(): Promise<Page[]> {
    return cachedFetch(
      CACHE_KEYS.PAGES,
      async () => await apiClient.getPages(),
      [],
      DEFAULT_TTL
    );
  },

  async getPageById(id: string): Promise<Page | null> {
    return cachedFetch(
      CACHE_KEYS.PAGE(id),
      async () => {
        const pages = await apiClient.getPages();
        return pages.find(page => page.id === id) || null;
      },
      null,
      DEFAULT_TTL
    );
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    return cachedFetch(
      CACHE_KEYS.PAGE_BY_SLUG(slug),
      async () => await apiClient.getPageBySlug(slug),
      null,
      DEFAULT_TTL
    );
  },

  // Cache clearing functions
  clearProjectCache() {
    // Clear all project-related caches
    const keys = cache.keys();
    keys.forEach(key => {
      if (
        key === CACHE_KEYS.PROJECTS ||
        key.startsWith('project_')
      ) {
        cache.delete(key);
      }
    });
  },

  clearCategoryCache() {
    // Clear all category-related caches
    const keys = cache.keys();
    keys.forEach(key => {
      if (
        key === CACHE_KEYS.CATEGORIES ||
        key.startsWith('category_')
      ) {
        cache.delete(key);
      }
    });
  },

  clearPageCache() {
    // Clear all page-related caches
    const keys = cache.keys();
    keys.forEach(key => {
      if (
        key === CACHE_KEYS.PAGES ||
        key.startsWith('page_')
      ) {
        cache.delete(key);
      }
    });
  },

  clearAllCache() {
    cache.clear();
  }
};
