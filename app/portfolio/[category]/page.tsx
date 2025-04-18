"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// import { db } from '@/lib/mysql'; // Not used in this component
import type { Project, Category } from '@/lib/mysql';

export default function CategoryPage() {
  const params = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryResponse = await fetch(`/api/categories/${params.category}`);
      const category = await categoryResponse.json();

      if (category) {
        setCategory(category);

        const projectsResponse = await fetch(`/api/categories/${category.id}/projects`);
        const projects = await projectsResponse.json();

        if (projects) {
          setProjects(projects);
        }
      }
    };

    fetchCategory();
  }, [params.category]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">{category.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${params.category}/${project.slug}`}
              className="group"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={project.featured_image || ''}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 text-white">
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}