"use client";

import { useEffect, useState, useCallback } from 'react';
// import { useRouter } from 'next/navigation'; // Not used in this component
import { cachedData } from '@/lib/cached-data';
import type { Category } from '@/lib/mysql';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Plus, Save } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

export default function CategoriesPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parent_id: null as string | null,
  });

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      // Get categories using cachedData
      const categories = await cachedData.getCategories();
      setCategories(categories);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCategories();

    // Set up polling for data updates every 30 seconds
    const pollingInterval = setInterval(() => {
      // Clear cache and refresh data
      cachedData.clearCategoryCache();
      fetchCategories();
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(pollingInterval);
    };
  }, [fetchCategories]); // Include fetchCategories in the dependency array

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      parent_id: null,
    });
    setDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      parent_id: category.parent_id,
    });
    setDialogOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setEditingCategory(category);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCategory = async () => {
    if (!editingCategory) return;

    try {
      // First check if there are any child categories
      const allCategories = await cachedData.getCategories();
      const childCategories = allCategories.filter(cat => cat.parent_id === editingCategory.id);

      if (childCategories.length > 0) {
        toast({
          title: "Cannot Delete",
          description: "This category has child categories. Please delete or reassign them first.",
          variant: "destructive",
        });
        setDeleteDialogOpen(false);
        return;
      }

      // Then check if there are any projects using this category
      const projects = await cachedData.getProjects();
      const projectsUsingCategory = projects.filter(project => project.category_id === editingCategory.id);

      if (projectsUsingCategory.length > 0) {
        toast({
          title: "Cannot Delete",
          description: "This category is used by existing projects. Please reassign those projects first.",
          variant: "destructive",
        });
        setDeleteDialogOpen(false);
        return;
      }

      // If no dependencies, proceed with deletion via API
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete category');
      }

      toast({
        title: "Success",
        description: "Category deleted successfully",
      });

      // Clear cache and refresh data
      cachedData.clearCategoryCache();
      cachedData.clearProjectCache(); // Also clear project cache as they might reference categories
      fetchCategories();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete category';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Generate slug if empty
      if (!formData.slug) {
        formData.slug = formData.name.toLowerCase().replace(/\s+/g, '-');
      }

      if (editingCategory) {
        // Update existing category via API
        const response = await fetch(`/api/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            slug: formData.slug,
            parent_id: formData.parent_id
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update category');
        }

        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        // Create new category via API
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            slug: formData.slug,
            parent_id: formData.parent_id
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create category');
        }

        toast({
          title: "Success",
          description: "Category created successfully",
        });
      }

      // Clear cache and refresh data
      cachedData.clearCategoryCache();
      cachedData.clearProjectCache(); // Also clear project cache as they might reference categories
      fetchCategories();
      setDialogOpen(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save category';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Function removed as it's no longer used

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={handleCreateCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading categories...</div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Parent Category</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No categories found. Create your first category to get started.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {category.parent_id ? (
                        <span className="flex items-center">
                          <span className="text-muted-foreground mr-2">↳</span>
                          {category.name}
                        </span>
                      ) : (
                        <span className="font-medium">{category.name}</span>
                      )}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      {category.parent_id ? (
                        categories.find(c => c.id === category.parent_id)?.name || 'Unknown'
                      ) : (
                        'None'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Category Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Create Category'}</DialogTitle>
            <DialogDescription>
              {editingCategory
                ? 'Update the details of this category.'
                : 'Add a new category to organize your projects.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({
                  ...formData,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({
                  ...formData,
                  slug: e.target.value,
                })}
              />
              <p className="text-sm text-muted-foreground">
                Used in URLs. Auto-generated from name if left empty.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="parent">Parent Category</Label>
              <Select
                value={formData.parent_id || 'none'}
                onValueChange={(value) => setFormData({
                  ...formData,
                  parent_id: value === 'none' ? null : value,
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {categories
                    .filter(cat => !cat.parent_id && cat.id !== editingCategory?.id) // Only show root categories as parents
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Only top-level categories can be selected as parents to prevent deep nesting
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the category &quot;{editingCategory?.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCategory}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
