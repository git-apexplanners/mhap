import { create } from 'zustand';
import { Category, Project, ProjectImage } from './mysql';

interface AdminStore {
  categories: Category[];
  projects: Project[];
  selectedProject: Project | null;
  projectImages: ProjectImage[];
  setCategories: (categories: Category[]) => void;
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (project: Project | null) => void;
  setProjectImages: (images: ProjectImage[]) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  categories: [],
  projects: [],
  selectedProject: null,
  projectImages: [],
  setCategories: (categories) => set({ categories }),
  setProjects: (projects) => set({ projects }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setProjectImages: (images) => set({ projectImages: images }),
}));