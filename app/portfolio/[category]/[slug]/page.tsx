"use client";

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
// import { db } from '@/lib/mysql'; // Not used in this component
import type { Project } from '@/lib/mysql';
import { cachedData } from '@/lib/supabase';
import ProjectGallery from '@/components/project-gallery';
import { useToast } from '@/components/ui/use-toast';

// Define a type for database project images
interface ProjectImage {
  id: string;
  url: string;
  project_id: string;
  sort_order?: number;
  caption?: string;
  alt?: string | null;
  [key: string]: string | number | null | undefined;
}

export default function ProjectPage() {
  const params = useParams();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProject = useCallback(async () => {
    if (!params.slug) return;
    setLoading(true);

    try {
      // Fetch projects from cache or API
      const projects = await cachedData.getProjects();

      // Find the project by slug
      const foundProject = projects.find(p => p.slug === params.slug);

      if (!foundProject) {
        toast({
          title: "Project not found",
          description: "The requested project could not be found.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setProject(foundProject);

      // Fetch project images with caching
      const projectImages = await cachedData.getProjectImages(foundProject.id);
      // Use type assertion to handle the type mismatch
      setImages((projectImages || []) as ProjectImage[]);
    } catch (error: unknown) {
      console.error('Error fetching project:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load project details";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [params.slug, toast]);

  useEffect(() => {
    // Initial data fetch
    fetchProject();

    // Set up polling for data updates every 30 seconds
    // This replaces the real-time subscriptions from Supabase
    const pollingInterval = setInterval(() => {
      // Clear cache to ensure fresh data
      cachedData.clearProjectCache();
      fetchProject();
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(pollingInterval);
    };
  }, [fetchProject]);

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Project Gallery with Popup */}
        <ProjectGallery
          images={images.map(img => ({
            id: img.id,
            url: img.url,
            alt: img.alt || ''
          }))}
          mainImage={project.featured_image || project.main_image_url || images[0]?.url || ''}
          title={project.title}
        />

        {/* Project Info */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {project.category_id && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {params.category}
              </div>
            )}
          </div>
          <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

          {/* Project Content */}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: project.content || '' }} />
        </div>
      </div>
    </div>
  );
}