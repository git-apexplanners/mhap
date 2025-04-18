"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cachedData } from '@/lib/cached-data';
import type { Project, Category } from '@/lib/mysql';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects and categories
        const projectsData = await cachedData.getProjects();
        const categoriesData = await cachedData.getCategories();

        // Only show published projects and limit to 3 most recent
        const publishedProjects = projectsData
          .filter(project => project.published)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3);

        setProjects(publishedProjects);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get category name from category ID
  const getCategoryName = (categoryId: string | null | undefined) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  // Helper function to get category slug from category ID
  const getCategorySlug = (categoryId: string | null | undefined) => {
    if (!categoryId) return '';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.slug : '';
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="aspect-video rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return null; // Don't show the section if there are no projects
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <Button asChild variant="outline">
          <Link href="/projects">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => {
          const categorySlug = getCategorySlug(project.category_id);
          return (
            <Link
              key={project.id}
              href={`/portfolio/${categorySlug}/${project.slug}`}
              className="group"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={project.main_image_url || '/images/placeholder.svg'}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 text-white">
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{getCategoryName(project.category_id)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
