"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building, Home, Users, Landmark } from 'lucide-react';
import { cachedData } from '@/lib/cached-data';
import { Project } from '@/lib/mysql';
import { Button } from '@/components/ui/button';

export default function ArchitectureOverviewPage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      setLoading(true);
      try {
        // Get all categories
        const categories = await cachedData.getCategories();

        // Filter categories related to architecture
        const architectureCategories = categories.filter(cat =>
          cat.name.toLowerCase().includes('architecture') ||
          cat.name.toLowerCase().includes('residence') ||
          cat.name.toLowerCase().includes('housing') ||
          cat.name.toLowerCase().includes('counseling')
        );

        if (architectureCategories.length > 0) {
          const categoryIds = architectureCategories.map(cat => cat.id);

          // Get all projects
          const allProjects = await cachedData.getProjects();

          // Filter projects by category and published status
          const filteredProjects = allProjects
            .filter(project =>
              categoryIds.includes(project.category_id) &&
              project.published
            )
            // Sort by created_at (newest first)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            // Limit to 6 projects
            .slice(0, 6);

          setFeaturedProjects(filteredProjects);
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80"
            alt="Architectural design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Architecture</h1>
              <p className="text-xl">
                For over three decades, Michael Hart Architects has been creating spaces that inspire, function, and endure. Our architectural practice spans residential, commercial, and public sectors, always with a focus on sustainability, context, and human experience.
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Categories */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Our Architectural Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/portfolio/architecture/private-residences" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[200px]">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                    alt="Private Residences"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Home className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Private Residences
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Bespoke homes that reflect the unique personalities and lifestyles of their owners, while responding sensitively to their contexts.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/portfolio/architecture/housing" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[200px]">
                  <Image
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80"
                    alt="Housing Projects"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Housing
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Innovative multi-unit residential developments that create community, affordability, and quality living environments.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/portfolio/architecture/counseling" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[200px]">
                  <Image
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80"
                    alt="Counseling Spaces"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Landmark className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Counseling
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Therapeutic environments designed to support mental health and wellbeing through thoughtful spatial design and attention to sensory experience.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Our Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Architectural Approach</h2>
            <p className="text-lg text-muted-foreground">
              At Michael Hart Architects, we believe that great architecture emerges from a deep understanding of people, place, and purpose. Our design process is collaborative and iterative, involving clients at every stage to ensure that the final building truly meets their needs and aspirations.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Context-Responsive Design</h3>
                  <p className="text-muted-foreground">
                    We design buildings that belong to their place, responding to climate, landscape, cultural context, and urban fabric.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Human-Centered Spaces</h3>
                  <p className="text-muted-foreground">
                    We prioritize the human experience, creating spaces that support wellbeing, foster connection, and enhance daily life.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Landmark className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Enduring Quality</h3>
                  <p className="text-muted-foreground">
                    We design for longevity, with attention to craft, material integrity, and timeless aesthetics that transcend trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
              alt="Architectural design process"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="text-3xl font-semibold">Featured Projects</h2>
              <Button variant="outline" asChild>
                <Link href="/portfolio/architecture/all-projects">
                  View All Projects
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.category_id}/${project.slug}`}
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
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-sm">{project.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-secondary p-8 rounded-lg text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Whether you&apos;re planning a new home, a multi-unit development, or a specialized facility, we&apos;d love to discuss how we can bring your vision to life.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
