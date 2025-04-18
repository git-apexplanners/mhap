"use client";

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAdminStore } from '@/lib/store';
import { cachedData } from '@/lib/cached-data';
import { db } from '@/lib/mysql';
import { usePolling } from '@/lib/hooks/use-polling';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  // BarChart, // Not used in this component
  Building2,
  Edit,
  Eye,
  FileText,
  FolderPlus,
  Layers,
  Plus,
  Tag,
  Trash2,
  Users,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react';
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

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const { projects, setProjects, categories, setCategories } = useAdminStore();
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    totalCategories: 0,
    totalPages: 0,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; title: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch projects with caching
      const projects = await cachedData.getProjects();

      // Fetch project images for each project
      const processedProjects = await Promise.all(
        projects.map(async (project) => {
          // If project has a main_image_url, use that as featured_image
          if (project.main_image_url) {
            return {
              ...project,
              featured_image: project.main_image_url
            };
          }

          // Otherwise, fetch and use the first project image
          const images = await cachedData.getProjectImages(project.id);
          if (images && images.length > 0) {
            return {
              ...project,
              featured_image: images[0].url,
              project_images: images
            };
          }

          return project;
        })
      );

      setProjects(processedProjects);
      setStats(prev => ({
        ...prev,
        totalProjects: processedProjects.length,
        publishedProjects: processedProjects.filter(p => p.published).length,
        draftProjects: processedProjects.filter(p => !p.published).length,
      }));

      // Fetch categories with caching
      const categories = await cachedData.getCategories();
      setCategories(categories);
      setStats(prev => ({
        ...prev,
        totalCategories: categories.length,
      }));

      // Fetch pages with caching
      const pages = await cachedData.getPages();
      setStats(prev => ({
        ...prev,
        totalPages: pages.length,
      }));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
      toast({
        title: "Error fetching data",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [setCategories, setProjects, toast]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up polling for data updates
  usePolling('admin-dashboard', () => {
    // Clear caches to ensure fresh data
    cachedData.clearProjectCache();
    cachedData.clearCategoryCache();
    cachedData.clearPageCache();
    fetchData();
  }, 30000); // 30 seconds

  const handleDeleteProject = (project: { id: string; title: string }) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    setLoading(true);
    try {
      // Delete the project using MySQL
      await db.deleteProject(projectToDelete.id);

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      // Clear cache and refresh data
      cachedData.clearProjectCache();
      fetchData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedProjects}</div>
            <p className="text-xs text-muted-foreground">Live on the website</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draftProjects}</div>
            <p className="text-xs text-muted-foreground">Unpublished projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">Project categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPages}</div>
            <p className="text-xs text-muted-foreground">Custom pages</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Button asChild className="h-auto py-4 flex flex-col gap-2">
          <Link href="/admin/projects/new">
            <FolderPlus className="h-5 w-5" />
            <span>New Project</span>
          </Link>
        </Button>
        <Button asChild className="h-auto py-4 flex flex-col gap-2 bg-primary/10 text-primary hover:bg-primary/20">
          <Link href="/admin/pages/new">
            <FileText className="h-5 w-5" />
            <span>New Page</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <Link href="/admin/categories">
            <Layers className="h-5 w-5" />
            <span>Manage Categories</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <Link href="/admin/users">
            <Users className="h-5 w-5" />
            <span>Manage Users</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <Link href="/" target="_blank">
            <Building2 className="h-5 w-5" />
            <span>View Website</span>
          </Link>
        </Button>
      </div>

      {/* All Projects */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">All Projects</h2>
          <Button onClick={() => router.push('/admin/projects/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </div>
        <Card>
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="relative h-10 w-16 rounded overflow-hidden">
                        {(project.featured_image || project.main_image_url) ? (
                          <Image
                            src={project.featured_image || project.main_image_url || '/placeholder.jpg'}
                            alt={project.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-muted flex items-center justify-center">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      {project.published ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Draft
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {categories.find(c => c.id === project.category_id)?.name || 'Uncategorized'}
                    </TableCell>
                    <TableCell>
                      {new Date(project.updated_at || project.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
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
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/projects/${project.id}/images`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Manage Images
                          </DropdownMenuItem>
                          {project.published && project.category_id && (
                            <DropdownMenuItem
                              onClick={() => {
                                const category = categories.find(c => c.id === project.category_id);
                                if (category && project.slug) {
                                  window.open(`/portfolio/${category.slug}/${project.slug}`, '_blank');
                                }
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Live
                            </DropdownMenuItem>
                          )}
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
                ))}
                {projects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No projects found. Create your first project to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>

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
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteProject} disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}