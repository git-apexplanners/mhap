"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Category, Project, ProjectImage, defaultData, db } from './mysql';
import { apiClient } from './api-client';

// Define the context type
interface DataContextType {
  categories: Category[];
  projects: Project[];
  refreshData: () => Promise<void>;
  getProjectById: (id: string) => Promise<Project | null>;
  getProjectBySlug: (slug: string) => Promise<Project | null>;
  getProjectImages: (projectId: string) => Promise<ProjectImage[]>;
  createProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<Project>;
  updateProject: (id: string, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) => Promise<Project | null>;
  deleteProject: (id: string) => Promise<void>;
  createCategory: (category: Omit<Category, 'id' | 'created_at'>) => Promise<Category>;
  updateCategory: (id: string, category: Partial<Omit<Category, 'id' | 'created_at'>>) => Promise<Category | null>;
  deleteCategory: (id: string) => Promise<void>;
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export function DataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(defaultData.categories);
  const [projects, setProjects] = useState<Project[]>(defaultData.projects);
  // Loading state is used internally to track data loading state
  const [, setLoading] = useState(true); // Using empty destructuring to ignore the state value

  // Function to fetch all data
  const refreshData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const fetchedCategories = await apiClient.getCategories();
      setCategories(fetchedCategories.length > 0 ? fetchedCategories : defaultData.categories);

      // Fetch projects
      const fetchedProjects = await apiClient.getProjects();
      setProjects(fetchedProjects.length > 0 ? fetchedProjects : defaultData.projects);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Use default data if database is not available
      setCategories(defaultData.categories);
      setProjects(defaultData.projects);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    refreshData();
  }, []);

  // Get project by ID
  const getProjectById = async (id: string) => {
    try {
      return await db.getProjectById(id);
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      // Return default project if database is not available
      return defaultData.projects.find(p => p.id === id) || null;
    }
  };

  // Get project by slug
  const getProjectBySlug = async (slug: string) => {
    try {
      return await db.getProjectBySlug(slug);
    } catch (error) {
      console.error('Error fetching project by slug:', error);
      // Return default project if database is not available
      return defaultData.projects.find(p => p.slug === slug) || null;
    }
  };

  // Get project images
  const getProjectImages = async (projectId: string) => {
    try {
      return await db.getProjectImages(projectId);
    } catch (error) {
      console.error('Error fetching project images:', error);
      // Return empty array if database is not available
      return [];
    }
  };

  // Create project
  const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newProject = await db.createProject(project);
      await refreshData(); // Refresh data after creating
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      // Create a fake project with a generated ID
      const fakeProject = {
        id: Math.random().toString(36).substring(2, 15),
        ...project,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setProjects([fakeProject, ...projects]);
      return fakeProject;
    }
  };

  // Update project
  const updateProject = async (id: string, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const updatedProject = await db.updateProject(id, project);
      await refreshData(); // Refresh data after updating
      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      // Update the project in the local state
      const updatedProjects = projects.map(p =>
        p.id === id ? { ...p, ...project, updated_at: new Date().toISOString() } : p
      );
      setProjects(updatedProjects);
      return updatedProjects.find(p => p.id === id) || null;
    }
  };

  // Delete project
  const deleteProject = async (id: string) => {
    try {
      await db.deleteProject(id);
      await refreshData(); // Refresh data after deleting
    } catch (error) {
      console.error('Error deleting project:', error);
      // Remove the project from the local state
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  // Create category
  const createCategory = async (category: Omit<Category, 'id' | 'created_at'>) => {
    try {
      const newCategory = await db.createCategory(category);
      await refreshData(); // Refresh data after creating
      return newCategory;
    } catch (error) {
      console.error('Error creating category:', error);
      // Create a fake category with a generated ID
      const fakeCategory = {
        id: Math.random().toString(36).substring(2, 15),
        ...category,
        created_at: new Date().toISOString()
      };
      setCategories([...categories, fakeCategory]);
      return fakeCategory;
    }
  };

  // Update category
  const updateCategory = async (id: string, category: Partial<Omit<Category, 'id' | 'created_at'>>) => {
    try {
      const updatedCategory = await db.updateCategory(id, category);
      await refreshData(); // Refresh data after updating
      return updatedCategory;
    } catch (error) {
      console.error('Error updating category:', error);
      // Update the category in the local state
      const updatedCategories = categories.map(c =>
        c.id === id ? { ...c, ...category } : c
      );
      setCategories(updatedCategories);
      return updatedCategories.find(c => c.id === id) || null;
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      await db.deleteCategory(id);
      await refreshData(); // Refresh data after deleting
    } catch (error) {
      console.error('Error deleting category:', error);
      // Remove the category from the local state
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <DataContext.Provider value={{
      categories,
      projects,
      refreshData,
      getProjectById,
      getProjectBySlug,
      getProjectImages,
      createProject,
      updateProject,
      deleteProject,
      createCategory,
      updateCategory,
      deleteCategory
    }}>
      {children}
    </DataContext.Provider>
  );
}

// Hook to use the data context
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
