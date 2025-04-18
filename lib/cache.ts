"use client";

// Simple in-memory cache implementation
type CacheEntry<T> = {
  data: T;
  timestamp: number;
  expiresAt: number;
};

class Cache {
  // Using unknown instead of any for better type safety
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache: Map<string, CacheEntry<any>> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Get data from cache
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    // If entry doesn't exist or has expired, return null
    if (!entry || Date.now() > entry.expiresAt) {
      if (entry) {
        // Clean up expired entry
        this.cache.delete(key);
      }
      return null;
    }

    return entry.data;
  }

  // Set data in cache with optional TTL
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const timestamp = Date.now();
    const expiresAt = timestamp + ttl;

    this.cache.set(key, {
      data,
      timestamp,
      expiresAt,
    });
  }

  // Remove data from cache
  delete(key: string): void {
    this.cache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
  }

  // Get all keys
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  // Check if key exists and is not expired
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // Check if entry has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

// Create a singleton instance
export const cache = new Cache();

// Helper function to wrap async data fetching with caching
export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  fallbackData?: T,
  ttl?: number
): Promise<T> {
  // Try to get from cache first
  const cachedData = cache.get<T>(key);
  if (cachedData !== null) {
    return cachedData;
  }

  try {
    // If not in cache, fetch fresh data
    const data = await fetchFn();

    // Store in cache
    cache.set(key, data, ttl);

    return data;
  } catch (error) {
    console.error(`Error fetching data for key ${key}:`, error);

    // If we have fallback data, use it
    if (fallbackData !== undefined) {
      // Store fallback data in cache with a short TTL
      const shortTTL = 30 * 1000; // 30 seconds
      cache.set(key, fallbackData, shortTTL);
      return fallbackData;
    }

    // Re-throw the error if no fallback data
    throw error;
  }
}
