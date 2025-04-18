"use client";

import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminStore } from '@/lib/store';
import { cachedData } from '@/lib/cached-data';
// import { db } from '@/lib/mysql'; // Not needed as we're using API endpoints
// No need to import Project and Category types directly as they're used implicitly
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import RichTextEditor from '@/components/rich-text-editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'; // For Add Category Modal
import Image from 'next/image'; // For displaying images

// Helper function for file upload using the local file storage API
async function uploadFile(file: File, folder: string, pathPrefix: string = ''): Promise<string> {
  try {
    // Create a unique filename
    const fileExt = file.name.split('.').pop() || '';
    const fileName = `${pathPrefix}${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;

    // Create a FormData object
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', `${folder}`);
    formData.append('filename', fileName);

    // Upload the file using the API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload file');
    }

    const data = await response.json();
    return data.url;
  } catch (error: unknown) {
    console.error('Error uploading file:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to upload file'
    );
  }
}


export default function ProjectEditor() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categories, setCategories, setSelectedProject } = useAdminStore(); // selectedProject is not used in this component
  const [loading, setLoading] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // State for category modal
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryParentId, setNewCategoryParentId] = useState<string | null>(null); // State for new category input

  // State for file inputs
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<FileList | null>(null);

  // State for image previews
  const [mainImageUrlPreview, setMainImageUrlPreview] = useState<string | null>(null);
  const [galleryUrlsPreview, setGalleryUrlsPreview] = useState<string[]>([]);

  // Define a more comprehensive form data type that includes fields not in the Project type
  type ProjectFormData = {
    title: string;
    slug: string;
    description: string;
    content: string;
    category_id: string;
    published: boolean;
    main_image_url: string;
    gallery_image_urls: string[];
    year_completed: string; // Custom field not in the Project type
  };

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    slug: '',
    description: '',
    content: '',
    category_id: '',
    published: false,
    main_image_url: '',
    gallery_image_urls: [],
    year_completed: '',
  });

  useEffect(() => {
    // Function to fetch categories
    const fetchCategoriesData = async () => {
      setLoading(true); // Indicate loading while fetching categories too
      try {
        // Use cachedData to get categories with caching
        const categories = await cachedData.getCategories();
        setCategories(categories);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
        toast({
          title: "Error fetching categories",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    // Fetch categories if not already loaded
    if (categories.length === 0) {
      fetchCategoriesData();
    }

    const fetchProject = async () => {
      if (params.id === 'new') {
        // Reset form for new project
        setFormData({
          title: '',
          slug: '',
          description: '',
          content: '',
          category_id: '',
          published: false,
          main_image_url: '',
          gallery_image_urls: [],
          year_completed: '',
        });
        setMainImageUrlPreview(null);
        setGalleryUrlsPreview([]);
        setMainImageFile(null);
        setGalleryImageFiles(null);
        setSelectedProject(null);
        return;
      }

      setLoading(true);
      try {
        // Get project by ID using cachedData
        const project = await cachedData.getProjectById(params.id as string);

        if (!project) {
          toast({ title: "Error", description: "Project not found", variant: "destructive" });
          router.push('/admin/projects'); // Redirect if project not found
          return;
        }

        setSelectedProject(project);
        setFormData({
          title: project.title,
          slug: project.slug,
          description: project.description || '',
          content: project.content || '',
          category_id: project.category_id || '',
          published: project.published,
          main_image_url: project.main_image_url || '', // Populate main image URL
          gallery_image_urls: project.gallery_image_urls || [], // Populate gallery URLs
          year_completed: '', // We don't have year_completed in the Project type
        });
        // Set previews
        setMainImageUrlPreview(project.main_image_url || null);

        // Handle gallery_image_urls which might be a JSON string
        let galleryUrls = project.gallery_image_urls || [];
        if (typeof galleryUrls === 'string') {
          try {
            galleryUrls = JSON.parse(galleryUrls);
          } catch {
            // If parsing fails, use empty array
            galleryUrls = [];
          }
        }
        setGalleryUrlsPreview(galleryUrls);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch project';
        toast({
          title: "Error fetching project",
          description: errorMessage,
          variant: "destructive"
        });
        router.push('/admin/projects'); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchProject();

    // Set up polling for data updates every 30 seconds
    // This replaces the real-time subscriptions from Supabase
    const pollingInterval = setInterval(() => {
      // Only refresh categories, not the current project being edited
      cachedData.clearCategoryCache();
      if (categories.length === 0) {
        fetchCategoriesData();
      }
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(pollingInterval);
    };
  }, [params.id, setSelectedProject, setCategories, categories.length, toast, router]); // Updated dependencies

  // Handlers for file inputs
  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImageFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImageUrlPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setMainImageFile(null);
      setMainImageUrlPreview(formData.main_image_url || null); // Revert to saved URL if file removed
    }
  };

  const handleGalleryImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImageFiles(e.target.files);
      // Create preview URLs
      const filesArray = Array.from(e.target.files);
      const previewUrls: string[] = [];
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previewUrls.push(reader.result as string);
          // Update state once all files are read (simple approach)
          if (previewUrls.length === filesArray.length) {
            setGalleryUrlsPreview(previewUrls);
          }
        };
        reader.readAsDataURL(file);
      });
      if (filesArray.length === 0) {
        setGalleryUrlsPreview(formData.gallery_image_urls || []); // Revert if all files removed
      }
    } else {
      setGalleryImageFiles(null);
      setGalleryUrlsPreview(formData.gallery_image_urls || []); // Revert if files removed
    }
  };

  // Handle creating a new category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({ title: "Error", description: "Category name cannot be empty", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      // Create slug from category name
      const slug = newCategoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      // Create new category using API
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategoryName,
          slug: slug,
          parent_id: newCategoryParentId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create category');
      }

      const newCategory = await response.json();

      // Refresh categories
      const updatedCategories = await cachedData.getCategories();
      setCategories(updatedCategories);

      // Select the new category
      setFormData({ ...formData, category_id: newCategory.id });
      setIsCategoryModalOpen(false);
      setNewCategoryName('');
      setNewCategoryParentId(null);
      toast({ title: "Success", description: "Category created successfully" });

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create category';
      toast({
        title: "Error creating category",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = { ...formData };

    try {
      // 1. Upload Main Image if changed
      if (mainImageFile) {
        const uploadedMainImageUrl = await uploadFile(mainImageFile, 'project-images', `main/${formData.slug || 'project'}-`);
        updatedFormData.main_image_url = uploadedMainImageUrl;
      }

      // 2. Upload Gallery Images if changed
      if (galleryImageFiles && galleryImageFiles.length > 0) {
        const uploadPromises = Array.from(galleryImageFiles).map(file =>
          uploadFile(file, 'project-images', `gallery/${formData.slug || 'project'}-`)
        );
        const uploadedGalleryUrls = await Promise.all(uploadPromises);
        // Append new URLs to existing ones (or replace, depending on desired logic)
        // For simplicity, let's assume replacement for now if new files are selected
        updatedFormData.gallery_image_urls = uploadedGalleryUrls;
      }

      // 3. Save Project Data (including image URLs)
      let savedProject;
      if (params.id === 'new') {
        // Create new project via API
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatedFormData.title,
            slug: updatedFormData.slug,
            description: updatedFormData.description,
            content: updatedFormData.content,
            category_id: updatedFormData.category_id,
            published: updatedFormData.published,
            main_image_url: updatedFormData.main_image_url,
            gallery_image_urls: updatedFormData.gallery_image_urls,
            featured_image: updatedFormData.main_image_url // Use main image as featured image
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create project');
        }

        savedProject = await response.json();
      } else {
        // Update existing project via API
        const response = await fetch(`/api/projects/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatedFormData.title,
            slug: updatedFormData.slug,
            description: updatedFormData.description,
            content: updatedFormData.content,
            category_id: updatedFormData.category_id,
            published: updatedFormData.published,
            main_image_url: updatedFormData.main_image_url,
            gallery_image_urls: updatedFormData.gallery_image_urls,
            featured_image: updatedFormData.main_image_url // Use main image as featured image
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update project');
        }

        savedProject = await response.json();
      }

      // Clear cache
      cachedData.clearProjectCache();

      toast({
        title: "Success",
        description: "Project saved successfully",
      });

      // Update state after successful save
      setFormData(updatedFormData);
      setMainImageFile(null); // Clear file state after upload
      setGalleryImageFiles(null); // Clear file state after upload
      setMainImageUrlPreview(updatedFormData.main_image_url || null); // Update preview to saved URL
      setGalleryUrlsPreview(updatedFormData.gallery_image_urls || []); // Update preview to saved URLs

      if (params.id === 'new' && savedProject) {
        router.push(`/admin/projects/${savedProject.id}`); // Navigate to the new project's edit page
      } else if (savedProject) {
        setSelectedProject(savedProject); // Update selected project in store after edit
      }

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save project';
      toast({
        title: "Error saving project",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection change
  const handleCategoryChange = (value: string) => {
    if (value === 'add_new_category') {
      setIsCategoryModalOpen(true);
      return;
    }

    setFormData({ ...formData, category_id: value });
  };

  // Handle preview button click
  const handlePreview = () => {
    if (params.id === 'new' || !formData.slug || !formData.category_id) {
      toast({ title: "Cannot Preview", description: "Save the project and select a category first.", variant: "destructive" });
      return;
    }
    // Find category slug (assuming categories are loaded)
    const category = categories.find(cat => cat.id === formData.category_id);
    if (!category || !category.slug) {
      toast({ title: "Cannot Preview", description: "Category details not found.", variant: "destructive" });
      return;
    }
    const previewUrl = `/portfolio/${category.slug}/${formData.slug}`;
    window.open(previewUrl, '_blank'); // Open in new tab
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {params.id === 'new' ? 'New Project' : 'Edit Project'}
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={handlePreview} // Added Preview button
            disabled={params.id === 'new' || !formData.category_id} // Disable if new or no category
          >
            Preview
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/admin/projects')} // Changed Cancel to go back to projects list
          >
            Back to Projects
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Project'}
          </Button>
        </div>
      </div>

      <form className="space-y-8">
        {/* Title and Slug */}
        <div className="grid grid-cols-2 gap-6">
          {/* ... Title Input ... */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({
                ...formData,
                title: e.target.value,
                // Auto-generate slug only if it's a new project or slug is empty
                slug: (params.id === 'new' || !formData.slug) ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : formData.slug,
              })}
            />
          </div>
          {/* ... Slug Input ... */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({
                ...formData,
                slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '').replace(/^-+|-+$/g, ''), // Basic slug sanitization
              })}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          {/* ... Description Textarea ... */}
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({
              ...formData,
              description: e.target.value,
            })}
          />
        </div>

        {/* Main Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="main-image">Main Image</Label>
          <Input
            id="main-image"
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
          />
          {mainImageUrlPreview && (
            <div className="mt-2">
              <Image src={mainImageUrlPreview} alt="Main image preview" width={200} height={150} className="object-cover rounded border" />
            </div>
          )}
        </div>

        {/* Gallery Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="gallery-images">Gallery Images</Label>
          <Input
            id="gallery-images"
            type="file"
            accept="image/*"
            multiple // Allow multiple files
            onChange={handleGalleryImagesChange}
          />
          {galleryUrlsPreview.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {galleryUrlsPreview.map((url, index) => (
                <Image key={index} src={url} alt={`Gallery image preview ${index + 1}`} width={100} height={75} className="object-cover rounded border" />
              ))}
            </div>
          )}
        </div>


        {/* Content Editor */}
        <div className="space-y-2">
          <Label>Content</Label>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData({
              ...formData,
              content,
            })}
            minHeight="500px"
          />
        </div>

        {/* Category and Published */}
        <div className="grid grid-cols-2 gap-6">
          {/* Category Select */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={formData.category_id}
              onValueChange={handleCategoryChange} // Use dedicated handler
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
                {/* Add New Category Option */}
                <SelectItem value="add_new_category">
                  + Add New Category...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Year Completed Input */}
          <div className="space-y-2">
            <Label htmlFor="year_completed">Year Completed</Label>
            <Input
              id="year_completed"
              placeholder="e.g. 2023"
              value={formData.year_completed}
              onChange={(e) => setFormData({
                ...formData,
                year_completed: e.target.value,
              })}
            />
          </div>
        </div>

        {/* Published Switch */}
        <div className="space-y-2">
          <Label>Published</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                published: checked,
              })}
            />
            <span>{formData.published ? 'Published' : 'Draft'}</span>
          </div>
        </div>
      </form>

      {/* Add Category Modal */}
      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-category-name">Category Name</Label>
              <Input
                id="new-category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parent-category">Parent Category (Optional)</Label>
              <Select
                value={newCategoryParentId || 'none'}
                onValueChange={(value) => setNewCategoryParentId(value === 'none' ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {categories
                    .filter(cat => !cat.parent_id) // Only show root categories as parents
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Select a parent category to create a hierarchical structure
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateCategory} disabled={loading}>
              {loading ? 'Saving...' : 'Save Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
