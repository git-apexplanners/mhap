'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home, Users } from 'lucide-react';
import { cachedData } from '@/lib/cached-data';
import { Project } from '@/lib/mysql';
import { Button } from '@/components/ui/button';

export default function InformalSettlementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Get all categories
        const categories = await cachedData.getCategories();
        
        // Find the informal settlement category
        const informalSettlementCategory = categories.find(cat => 
          cat.slug === 'informal-settlement' || 
          cat.name.toLowerCase().includes('informal settlement')
        );
        
        if (informalSettlementCategory) {
          // Get all projects
          const allProjects = await cachedData.getProjects();
          
          // Filter projects by category and published status
          const filteredProjects = allProjects
            .filter(project => 
              project.category_id === informalSettlementCategory.id && 
              project.published
            )
            // Sort by created_at (newest first)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          
          setProjects(filteredProjects);
        }
      } catch (error) {
        console.error('Error fetching informal settlement projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back to Urban Design */}
        <div>
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/portfolio/urban-design" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Urban Design
            </Link>
          </Button>
        </div>
        
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&q=80"
            alt="Informal Settlement Upgrade"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Informal Settlement Upgrade</h1>
            <p className="text-xl max-w-2xl text-center">
              Transforming informal settlements into sustainable, dignified communities through participatory design and incremental development.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Approach to Informal Settlement Upgrades</h2>
            <p className="text-lg text-muted-foreground">
              At Michael Hart Architects, we believe in working with communities to improve living conditions in informal settlements through participatory design processes. Our approach respects existing social networks and spatial patterns while introducing infrastructure, services, and housing improvements that enhance quality of life.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Community Participation</h3>
                  <p className="text-muted-foreground">
                    We engage residents as active participants in the design and implementation process, ensuring solutions reflect local needs and aspirations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Incremental Development</h3>
                  <p className="text-muted-foreground">
                    We design for phased implementation, allowing improvements to be made gradually as resources become available.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Integrated Solutions</h3>
                  <p className="text-muted-foreground">
                    Our designs address housing, infrastructure, public space, and economic opportunities in an integrated way.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518005068251-37900150dfca?auto=format&fit=crop&q=80"
              alt="Informal settlement community engagement"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Informal Settlement Projects</h2>
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/urban-design/informal-settlement/${project.slug}`}
                  className="group"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={project.featured_image || project.main_image_url || '/images/placeholder.jpg'}
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
          ) : (
            <div className="text-center p-12 bg-muted rounded-lg">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">Check back soon for updates on our informal settlement upgrade projects.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-secondary p-8 rounded-lg text-center">
          <h2 className="text-3xl font-semibold mb-4">Working on an Informal Settlement Project?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            We collaborate with communities, NGOs, and government agencies to create sustainable solutions for informal settlements.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
