// API client for fetching data from the server
import { Category, Project, Page, defaultData } from './mysql';

// Cache for API responses
type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const apiCache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minute cache TTL

// In-flight requests tracking to prevent duplicate requests
const inFlightRequests = new Map<string, Promise<unknown>>();

// Helper function to handle API responses with caching and request deduplication
async function fetchAPI<T>(url: string): Promise<T> {
  // Check cache first - always use cache if available
  const cachedData = apiCache.get(url);
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data as T;
  }

  // Check if there's already a request in flight for this URL
  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url) as Promise<T>;
  }

  // Create a new request
  const fetchPromise = (async () => {
    try {
      const response = await fetch(url, {
        // Add cache control headers
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Cache the response
      apiCache.set(url, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      throw error;
    } finally {
      // Remove from in-flight requests when done
      inFlightRequests.delete(url);
    }
  })();

  // Store the promise in the in-flight requests map
  inFlightRequests.set(url, fetchPromise);

  return fetchPromise;
}

// Function to fetch static fallback data
async function fetchFallbackData() {
  try {
    const response = await fetch('/data/fallback-data.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch fallback data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching fallback data:', error);
    return { categories: defaultData.categories, projects: defaultData.projects };
  }
}

// Client-side API functions
export const apiClient = {
  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      // Try to use the direct API route for categories
      return await fetchAPI<Category[]>('/api/direct-categories');
    } catch (error) {
      console.error('Error fetching categories from API:', error);

      // Try to fetch from static fallback data
      try {
        const fallbackData = await fetchFallbackData();
        return fallbackData.categories;
      } catch (fallbackError) {
        console.error('Error fetching fallback categories:', fallbackError);
        return defaultData.categories;
      }
    }
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      // Try to use the direct API route for projects
      return await fetchAPI<Project[]>('/api/direct-projects');
    } catch (error) {
      console.error('Error fetching projects from API:', error);

      // Try to fetch from static fallback data
      try {
        const fallbackData = await fetchFallbackData();
        return fallbackData.projects;
      } catch (fallbackError) {
        console.error('Error fetching fallback projects:', fallbackError);
        return defaultData.projects;
      }
    }
  },

  // Pages
  async getPages(): Promise<Page[]> {
    try {
      // Try to use the direct API route for pages
      return await fetchAPI<Page[]>('/api/direct-pages');
    } catch (error) {
      console.error('Error fetching pages from API:', error);

      // Return default pages
      return defaultData.pages;
    }
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    try {
      // Get all pages and find the one with the matching slug
      const pages = await this.getPages();
      return pages.find(page => page.slug === slug) || null;
    } catch (error) {
      console.error(`Error fetching page with slug ${slug}:`, error);
      return null;
    }
  },

  // Add more API client methods as needed
};
