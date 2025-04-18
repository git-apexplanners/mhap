"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { Category } from './mysql';
import { apiClient } from './api-client';
import {
  Home,
  Info,
  User,
  Building2,
  // Landmark, // Unused import
  PenTool,
  Award,
  BookOpen,
  Mail,
  FileText,
  FolderKanban,
} from 'lucide-react';

// Define types
interface PageType {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  parent_id?: string | null;
  children?: PageType[];
  // Using a more specific index signature
  [key: string]: string | boolean | number | string[] | null | undefined | PageType[];
}

// Define the navigation item type
export interface NavItem {
  name: string;
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any; // Using any for icon compatibility with Lucide icons
  children?: NavItem[];
}

// Context type
interface NavigationContextType {
  navigationItems: NavItem[];
  refreshNavigation: () => Promise<void>;
}

// Create the context
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Base navigation items (static items)
const baseNavigationItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Info', href: '/info', icon: Info },
  { name: 'About', href: '/about', icon: User },
  {
    name: 'Portfolio',
    icon: Building2,
    children: [],
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: FolderKanban,
  },
  {
    name: 'Design Process',
    icon: PenTool,
    children: [
      { name: 'Corporate', href: '/design-process/corporate' },
      { name: 'Construction Exp', href: '/design-process/construction' },
      { name: 'Material', href: '/design-process/material' },
    ],
  },
  { name: 'Achievements/Awards', href: '/achievements', icon: Award },
  { name: 'Publications/Exhibitions', href: '/publications', icon: BookOpen },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navigationItems, setNavigationItems] = useState<NavItem[]>(baseNavigationItems);

  // Define a more specific type for the category with children
  type CategoryWithChildren = Category & {
    children: CategoryWithChildren[]
  };

  // Helper function to convert a category to a navigation item - wrapped in useCallback
  const categoryToNavItem = useCallback((category: CategoryWithChildren): NavItem => {
    return {
      name: category.name,
      href: category.children.length === 0 ? `/portfolio/${category.slug}` : undefined,
      children: category.children.length > 0 ? category.children.map(categoryToNavItem) : undefined,
    };
  }, []);

  // Helper function to convert a page to a navigation item - wrapped in useCallback
  const pageToNavItem = useCallback((page: PageType): NavItem => {
    return {
      name: page.title,
      href: `/pages/${page.slug}`,
      children: page.children && page.children.length > 0 ? page.children.map(pageToNavItem) : undefined,
    };
  }, []);

  // Track if navigation is currently being refreshed
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Last refresh timestamp
  const [lastRefreshTime, setLastRefreshTime] = useState(0);

  // Function to refresh the navigation
  const refreshNavigation = useCallback(async () => {
    // Prevent multiple simultaneous refreshes
    if (isRefreshing) {
      return;
    }

    // Throttle refreshes to once every 30 seconds
    const now = Date.now();
    if (now - lastRefreshTime < 30000) { // 30 seconds
      return;
    }

    // Set refreshing state
    setIsRefreshing(true);
    setLastRefreshTime(now);

    try {
      // Reset to base navigation
      setNavigationItems(baseNavigationItems);

      // Build portfolio navigation
      const buildPortfolioNavigation = async () => {
        try {
          // Default portfolio structure is defined below when needed

          // If no categories, use default portfolio structure
          let categories: Category[] = [];

          try {
            // Try to fetch categories from API
            categories = await apiClient.getCategories();
          } catch (error) {
            console.error('Error fetching categories from API:', error);
          }

          if (!categories || categories.length === 0) {
            // If no categories, use default portfolio structure
            const defaultPortfolioChildren = [
              {
                name: 'Architecture',
                children: [
                  { name: 'Private Residences', href: '/portfolio/architecture/private-residences' },
                  {
                    name: 'Housing', children: [
                      { name: 'Social', href: '/portfolio/architecture/housing/social' },
                      { name: 'PDP', href: '/portfolio/architecture/housing/pdp' },
                      { name: 'CRUWMBS', href: '/portfolio/architecture/housing/cruwmbs' },
                    ]
                  },
                  { name: 'Counseling', href: '/portfolio/architecture/counseling' },
                ],
              },
              {
                name: 'Urban Design',
                children: [
                  {
                    name: 'Heritage', children: [
                      { name: 'Community Projects', href: '/portfolio/urban-design/heritage/community-projects' },
                    ]
                  },
                  {
                    name: 'Urban Regeneration', children: [
                      { name: 'UDF', href: '/portfolio/urban-design/regeneration/udf' },
                    ]
                  },
                  { name: 'Informal Settlement Upgrade', href: '/portfolio/urban-design/informal-settlement' },
                  { name: 'Neighborhood Design', href: '/portfolio/urban-design/neighborhood' },
                ],
              },
            ];

            // Update the Portfolio item with default children
            const updatedNavigation = navigationItems.map((item) => {
              if (item.name === 'Portfolio') {
                return {
                  ...item,
                  children: defaultPortfolioChildren,
                };
              }
              return item;
            });

            setNavigationItems(updatedNavigation);
            return;
          }

          // Create a map of categories by ID
          const categoryMap = new Map();
          categories.forEach((category) => {
            categoryMap.set(category.id, {
              ...category,
              children: [],
            });
          });

          // Build the category tree
          const rootCategories: CategoryWithChildren[] = [];
          categories.forEach((category) => {
            if (category.parent_id) {
              const parent = categoryMap.get(category.parent_id);
              if (parent) {
                parent.children.push(categoryMap.get(category.id));
              } else {
                // If parent doesn't exist, treat as root
                rootCategories.push(categoryMap.get(category.id));
              }
            } else {
              rootCategories.push(categoryMap.get(category.id));
            }
          });

          // Convert the category tree to navigation items
          const portfolioChildren = rootCategories.map(categoryToNavItem);

          // Update the Portfolio item in the navigation
          const updatedNavigation = navigationItems.map((item) => {
            if (item.name === 'Portfolio') {
              return {
                ...item,
                children: portfolioChildren.length > 0 ? portfolioChildren : item.children,
              };
            }
            return item;
          });

          setNavigationItems(updatedNavigation);

        } catch (error) {
          console.error('Error building portfolio navigation:', error);

          // Ensure we always have a valid navigation structure
          const updatedNavigation = [...baseNavigationItems];
          setNavigationItems(updatedNavigation);
        }
      };

      await buildPortfolioNavigation();

      // Add custom pages
      const addCustomPagesToNavigation = async () => {
        try {
          // For now, we'll use an empty array for pages until we implement the pages API
          const publishedPages: PageType[] = [];

          if (!publishedPages || publishedPages.length === 0) {
            return;
          }

          // Create a map of pages by ID
          const pageMap = new Map();
          publishedPages.forEach((page) => {
            pageMap.set(page.id, {
              ...page,
              children: [],
            });
          });

          // Build the page tree
          const rootPages: PageType[] = [];
          publishedPages.forEach((page) => {
            if (page.parent_id) {
              const parent = pageMap.get(page.parent_id);
              if (parent) {
                parent.children.push(pageMap.get(page.id));
              }
            } else {
              rootPages.push(pageMap.get(page.id));
            }
          });

          // Convert the page tree to navigation items
          const customPagesNavItems = rootPages.map(pageToNavItem);

          // Add custom pages to navigation
          if (customPagesNavItems.length > 0) {
            const customPagesSection = {
              name: 'Pages',
              icon: FileText,
              children: customPagesNavItems,
            };

            // Check if Pages section already exists
            const pagesIndex = navigationItems.findIndex(item => item.name === 'Pages');

            if (pagesIndex >= 0) {
              // Update existing Pages section
              const updatedNavigation = [...navigationItems];
              updatedNavigation[pagesIndex] = customPagesSection;
              setNavigationItems(updatedNavigation);
            } else {
              // Add Pages section after Portfolio
              const portfolioIndex = navigationItems.findIndex(item => item.name === 'Portfolio');
              const insertIndex = portfolioIndex >= 0 ? portfolioIndex + 1 : navigationItems.length;

              const updatedNavigation = [
                ...navigationItems.slice(0, insertIndex),
                customPagesSection,
                ...navigationItems.slice(insertIndex),
              ];

              setNavigationItems(updatedNavigation);
            }
          }
        } catch (error) {
          console.error('Error adding custom pages to navigation:', error);
        }
      };

      await addCustomPagesToNavigation();
    } catch (error) {
      console.error('Error refreshing navigation:', error);
    } finally {
      // Reset refreshing state
      setIsRefreshing(false);
    }
  }, [navigationItems, categoryToNavItem, pageToNavItem, isRefreshing, lastRefreshTime]);

  // Initial fetch with a slight delay to prevent resource contention during page load
  useEffect(() => {
    const timer = setTimeout(() => {
      refreshNavigation();
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [refreshNavigation]);

  return (
    <NavigationContext.Provider value={{ navigationItems, refreshNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
}

// Hook to use the navigation context
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
