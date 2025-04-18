"use client";

import { useEffect, useState, useCallback } from 'react';
// import Link from 'next/link'; // Not used in this component
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cachedData } from '@/lib/cached-data';
import type { Project, Category } from '@/lib/mysql';
import { usePolling } from '@/lib/hooks/use-polling';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Filter,
  Search,
  X
} from 'lucide-react';

export default function ProjectsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [publishedFilter, setPublishedFilter] = useState<boolean | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      // Use cachedData to get projects with caching
      const projects = await cachedData.getProjects();
      setProjects(projects);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchCategories = useCallback(async () => {
    try {
      // Use cachedData to get categories with caching
      const categories = await cachedData.getCategories();
      setCategories(categories);
    } catch (error: unknown) {
      console.error("Error fetching categories:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  // Initial data fetch
  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, [fetchProjects, fetchCategories]); // Include function dependencies

  // Set up polling for data updates
  usePolling('admin-projects', () => {
    // Clear caches to ensure fresh data
    cachedData.clearProjectCache();
    cachedData.clearCategoryCache();
    fetchProjects();
    fetchCategories();
  }, 30000); // 30 seconds

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      // Delete the project via API
      const response = await fetch(`/api/projects/${projectToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project');
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      // Clear cache and refresh data
      cachedData.clearProjectCache();
      fetchProjects();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const toggleProjectPublished = async (project: Project) => {
    try {
      // Update project published status via API
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !project.published
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update project status');
      }

      toast({
        title: "Success",
        description: `Project ${project.published ? 'unpublished' : 'published'} successfully`,
      });

      // Clear cache and refresh data
      cachedData.clearProjectCache();
      fetchProjects();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update project status';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredProjects = projects.filter(project => {
    // Apply search filter
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));

    // Apply category filter
    const matchesCategory = categoryFilter === null || project.category_id === categoryFilter;

    // Apply published filter
    const matchesPublished = publishedFilter === null || project.published === publishedFilter;

    return matchesSearch && matchesCategory && matchesPublished;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter(null);
    setPublishedFilter(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={() => router.push('/admin/projects/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Category
              {categoryFilter && <span className="ml-1 text-xs bg-primary/20 px-1 rounded">1</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setCategoryFilter(null)}
              className={categoryFilter === null ? "bg-primary/10" : ""}
            >
              All Categories
            </DropdownMenuItem>
            {categories.map(category => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={categoryFilter === category.id ? "bg-primary/10" : ""}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {publishedFilter === true ? <Eye className="h-4 w-4 mr-2" /> :
                publishedFilter === false ? <EyeOff className="h-4 w-4 mr-2" /> :
                  <Filter className="h-4 w-4 mr-2" />}
              Status
              {publishedFilter !== null && <span className="ml-1 text-xs bg-primary/20 px-1 rounded">1</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setPublishedFilter(null)}
              className={publishedFilter === null ? "bg-primary/10" : ""}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setPublishedFilter(true)}
              className={publishedFilter === true ? "bg-primary/10" : ""}
            >
              <Eye className="h-4 w-4 mr-2" />
              Published
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setPublishedFilter(false)}
              className={publishedFilter === false ? "bg-primary/10" : ""}
            >
              <EyeOff className="h-4 w-4 mr-2" />
              Draft
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {(searchQuery || categoryFilter !== null || publishedFilter !== null) && (
          <Button variant="ghost" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    {projects.length === 0
                      ? "No projects found. Create your first project to get started."
                      : "No projects match your filters."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="relative h-12 w-16 rounded overflow-hidden">
                        {project.featured_image ? (
                          <Image
                            src={project.featured_image}
                            alt={project.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-muted flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{getCategoryName(project.category_id)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.published
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(project.created_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => router.push(`/admin/projects/${project.id}`)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/projects/${project.id}/images`)}>
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Manage Images
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleProjectPublished(project)}>
                            {project.published ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Publish
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteProject(project)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the project &quot;{projectToDelete?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteProject}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
