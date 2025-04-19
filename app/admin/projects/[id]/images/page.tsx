"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useAdminStore } from '@/lib/store';
import { cachedData } from '@/lib/cached-data';
// import type { ProjectImage } from '@/lib/mysql'; // Not used directly in this component
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Upload } from 'lucide-react';

export default function ProjectImages() {
  const params = useParams();
  const { toast } = useToast();
  const { projectImages, setProjectImages } = useAdminStore();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Get project images using cachedData
        const images = await cachedData.getProjectImages(params.id as string);
        setProjectImages(images);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch images';
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    };

    fetchImages();

    // Set up polling for data updates every 30 seconds
    const pollingInterval = setInterval(() => {
      // Clear cache and refresh data
      cachedData.clearProjectCache();
      fetchImages();
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(pollingInterval);
    };
  }, [params.id, setProjectImages, toast]);

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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];

    try {
      // 1. Upload the file and get the URL
      const imageUrl = await uploadFile(file, 'project-images', `${params.id}/`);

      // 2. Get the current project to update its gallery_image_urls
      const project = await cachedData.getProjectById(params.id as string);
      if (!project) {
        throw new Error("Project not found");
      }

      // 3. Parse existing gallery_image_urls or initialize as empty array
      let galleryUrls = [];
      if (project.gallery_image_urls) {
        if (typeof project.gallery_image_urls === 'string') {
          try {
            galleryUrls = JSON.parse(project.gallery_image_urls);
          } catch {
            galleryUrls = [];
          }
        } else if (Array.isArray(project.gallery_image_urls)) {
          galleryUrls = project.gallery_image_urls;
        }
      }

      // 4. Add the new URL to the gallery
      galleryUrls.push(imageUrl);

      // 5. Update the project with the new gallery_image_urls
      await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gallery_image_urls: galleryUrls
        }),
      });

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      // 6. Refresh images
      cachedData.clearProjectCache();
      const updatedImages = await cachedData.getProjectImages(params.id as string);
      setProjectImages(updatedImages);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      // 1. Get the current project to update its gallery_image_urls
      const project = await cachedData.getProjectById(params.id as string);
      if (!project) {
        throw new Error("Project not found");
      }

      // 2. Find the image to delete
      const imageToDelete = projectImages.find(img => img.id === imageId);
      if (!imageToDelete) {
        throw new Error("Image not found");
      }

      // 3. Parse existing gallery_image_urls
      let galleryUrls = [];
      if (project.gallery_image_urls) {
        if (typeof project.gallery_image_urls === 'string') {
          try {
            galleryUrls = JSON.parse(project.gallery_image_urls);
          } catch {
            galleryUrls = [];
          }
        } else if (Array.isArray(project.gallery_image_urls)) {
          galleryUrls = project.gallery_image_urls;
        }
      }

      // 4. Remove the URL from the gallery
      const updatedGalleryUrls = galleryUrls.filter((url: string) => url !== imageToDelete.url);

      // 5. Update the project with the new gallery_image_urls
      await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gallery_image_urls: updatedGalleryUrls
        }),
      });

      // 6. Update the UI
      setProjectImages(projectImages.filter(img => img.id !== imageId));

      // 7. Clear cache
      cachedData.clearProjectCache();

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete image';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Project Images</h1>
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <Label htmlFor="image-upload">
            <Button asChild>
              <div>
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Image'}
              </div>
            </Button>
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-video rounded-lg overflow-hidden group"
          >
            <Image
              src={image.url}
              alt={image.alt || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(image.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}