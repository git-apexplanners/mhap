"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { cachedData } from '@/lib/cached-data';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Eye,
  Save,
  ArrowLeft,
  Upload,
  Loader2,
  ImagePlus,
  // FileText, // Not used in this component
} from 'lucide-react';

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
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
    console.error('Error uploading file:', error);
    throw new Error(errorMessage);
  }
}

// Page types
const PAGE_TYPES = [
  { id: 'standard', name: 'Standard Page' },
  { id: 'landing', name: 'Landing Page' },
  { id: 'contact', name: 'Contact Page' },
  { id: 'about', name: 'About Page' },
];

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // State for file inputs
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    page_type: 'standard',
    published: false,
    featured_image: null as string | null,
    meta_title: '',
    meta_description: '',
    sort_order: 0,
    parent_id: null as string | null,
  });

  const [pages, setPages] = useState<{ id: string; title: string; slug: string; parent_id?: string | null }[]>([]);

  useEffect(() => {
    // Fetch all pages for parent selection
    const fetchPages = async () => {
      try {
        // Get pages using cachedData
        const pages = await cachedData.getPages();
        setPages(pages);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch pages';
        toast({
          title: "Error fetching pages",
          description: errorMessage,
          variant: "destructive",
        });
      }
    };

    const fetchPage = async () => {
      if (params.id === 'new') {
        // Reset form for new page
        setFormData({
          title: '',
          slug: '',
          description: '',
          content: '',
          page_type: 'standard',
          published: false,
          featured_image: null,
          meta_title: '',
          meta_description: '',
          sort_order: 0,
          parent_id: null,
        });
        setFeaturedImagePreview(null);
        setFeaturedImageFile(null);
        return;
      }

      setLoading(true);
      try {
        // Get page by ID using cachedData
        const page = await cachedData.getPageById(params.id as string);

        if (!page) {
          toast({
            title: "Error",
            description: "Page not found",
            variant: "destructive",
          });
          router.push('/admin/pages');
          return;
        }

        setFormData({
          title: page.title,
          slug: page.slug,
          description: page.description || '',
          content: page.content || '',
          page_type: page.page_type || 'standard',
          published: page.published,
          featured_image: page.featured_image || null,
          meta_title: page.meta_title || '',
          meta_description: page.meta_description || '',
          sort_order: page.sort_order || 0,
          parent_id: page.parent_id || null,
        });

        // Set preview
        setFeaturedImagePreview(page.featured_image || null);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch page';
        toast({
          title: "Error fetching page",
          description: errorMessage,
          variant: "destructive",
        });
        router.push('/admin/pages');
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
    fetchPage();
  }, [params.id, router, toast]);

  // Handle featured image change
  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFeaturedImageFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFeaturedImageFile(null);
      setFeaturedImagePreview(formData.featured_image);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = { ...formData };

    try {
      // Upload featured image if changed
      if (featuredImageFile) {
        const uploadedImageUrl = await uploadFile(
          featuredImageFile,
          'pages',
          `featured/${formData.slug || 'page'}-`
        );
        updatedFormData.featured_image = uploadedImageUrl;
      }

      // Save page data using API
      let savedPage;
      if (params.id === 'new') {
        // Create new page via API
        const response = await fetch('/api/pages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatedFormData.title,
            slug: updatedFormData.slug,
            description: updatedFormData.description,
            content: updatedFormData.content,
            page_type: updatedFormData.page_type,
            published: updatedFormData.published,
            featured_image: updatedFormData.featured_image,
            meta_title: updatedFormData.meta_title,
            meta_description: updatedFormData.meta_description,
            sort_order: updatedFormData.sort_order,
            parent_id: updatedFormData.parent_id
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create page');
        }

        savedPage = await response.json();
      } else {
        // Update existing page via API
        const response = await fetch(`/api/pages/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatedFormData.title,
            slug: updatedFormData.slug,
            description: updatedFormData.description,
            content: updatedFormData.content,
            page_type: updatedFormData.page_type,
            published: updatedFormData.published,
            featured_image: updatedFormData.featured_image,
            meta_title: updatedFormData.meta_title,
            meta_description: updatedFormData.meta_description,
            sort_order: updatedFormData.sort_order,
            parent_id: updatedFormData.parent_id
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update page');
        }

        savedPage = await response.json();
      }

      // Clear cache
      cachedData.clearPageCache();

      toast({
        title: "Success",
        description: "Page saved successfully",
      });

      // Update state after successful save
      setFormData(updatedFormData);
      setFeaturedImageFile(null);
      setFeaturedImagePreview(updatedFormData.featured_image);

      if (params.id === 'new' && savedPage) {
        router.push(`/admin/pages/${savedPage.id}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save page';
      toast({
        title: "Error saving page",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle preview button click
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Preview: {formData.title}</h1>
          <Button onClick={togglePreview} variant="outline">
            Back to Editor
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {formData.featured_image && (
            <div className="relative h-[400px] w-full">
              <Image
                src={formData.featured_image}
                alt={formData.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">{formData.title}</h2>

            <p className="text-muted-foreground">{formData.description}</p>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formData.content || '' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {params.id === 'new' ? 'New Page' : 'Edit Page'}
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={togglePreview}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/admin/pages')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pages
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Page
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({
                  ...formData,
                  title: e.target.value,
                  slug: (params.id === 'new' || !formData.slug)
                    ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                    : formData.slug,
                  meta_title: formData.meta_title || e.target.value,
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({
                  ...formData,
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '').replace(/^-+|-+$/g, ''),
                })}
              />
              <p className="text-xs text-muted-foreground">
                This will be used in the page URL: /pages/{formData.slug}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({
                ...formData,
                description: e.target.value,
                meta_description: formData.meta_description || e.target.value,
              })}
              placeholder="Brief description of this page"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Featured Image</Label>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {featuredImagePreview ? (
                    <div className="space-y-4">
                      <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                        <Image
                          src={featuredImagePreview}
                          alt="Featured image"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              if (e.target instanceof HTMLInputElement && e.target.files) {
                                handleFeaturedImageChange({ target: { files: e.target.files } } as React.ChangeEvent<HTMLInputElement>);
                              }
                            };
                            input.click();
                          }}
                        >
                          Change Image
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            setFeaturedImageFile(null);
                            setFeaturedImagePreview(null);
                            setFormData({
                              ...formData,
                              featured_image: null,
                            });
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
                      <ImagePlus className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">Drag and drop or click to upload</p>
                      <Button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => {
                            if (e.target instanceof HTMLInputElement && e.target.files) {
                              handleFeaturedImageChange({ target: { files: e.target.files } } as React.ChangeEvent<HTMLInputElement>);
                            }
                          };
                          input.click();
                        }}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <Label>Page Content</Label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData({
                ...formData,
                content,
              })}
              minHeight="500px"
            />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Page Type</Label>
              <Select
                value={formData.page_type}
                onValueChange={(value) => setFormData({
                  ...formData,
                  page_type: value,
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select page type" />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Parent Page</Label>
              <Select
                value={formData.parent_id || 'none'}
                onValueChange={(value) => setFormData({
                  ...formData,
                  parent_id: value === 'none' ? null : value,
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="No parent (top level)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No parent (top level)</SelectItem>
                  {pages
                    .filter(page => page.id !== params.id) // Prevent self-reference
                    .map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order.toString()}
                onChange={(e) => setFormData({
                  ...formData,
                  sort_order: parseInt(e.target.value) || 0,
                })}
              />
              <p className="text-xs text-muted-foreground">
                Lower numbers appear first in navigation
              </p>
            </div>

            <div className="space-y-2">
              <Label>Published</Label>
              <div className="flex items-center space-x-2 h-10">
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
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input
              id="meta_title"
              value={formData.meta_title}
              onChange={(e) => setFormData({
                ...formData,
                meta_title: e.target.value,
              })}
              placeholder={formData.title}
            />
            <p className="text-xs text-muted-foreground">
              Appears in browser tab and search results. If left empty, page title will be used.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) => setFormData({
                ...formData,
                meta_description: e.target.value,
              })}
              placeholder={formData.description}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              Appears in search results. If left empty, page description will be used.
            </p>
          </div>

          <div className="space-y-2">
            <Label>SEO Preview</Label>
            <div className="border rounded-lg p-4 space-y-2">
              <div className="text-blue-600 text-lg font-medium truncate">
                {formData.meta_title || formData.title || 'Page Title'}
              </div>
              <div className="text-green-700 text-sm">
                {`https://yourdomain.com/pages/${formData.slug || 'page-url'}`}
              </div>
              <div className="text-sm text-gray-600 line-clamp-2">
                {formData.meta_description || formData.description || 'Page description will appear here. Make sure to add a compelling description to improve click-through rates from search results.'}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
