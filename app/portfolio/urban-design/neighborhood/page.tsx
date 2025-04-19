'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home, Users, Map } from 'lucide-react';
import { cachedData } from '@/lib/cached-data';
import { Project } from '@/lib/mysql';
import { Button } from '@/components/ui/button';

export default function NeighborhoodDesignPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Get all categories
        const categories = await cachedData.getCategories();
        
        // Find the neighborhood design category
        const neighborhoodCategory = categories.find(cat => 
          cat.slug === 'neighborhood' || 
          cat.name.toLowerCase().includes('neighborhood')
        );
        
        if (neighborhoodCategory) {
          // Get all projects
          const allProjects = await cachedData.getProjects();
          
          // Filter projects by category and published status
          const filteredProjects = allProjects
            .filter(project => 
              project.category_id === neighborhoodCategory.id && 
              project.published
            )
            // Sort by created_at (newest first)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          
          setProjects(filteredProjects);
        }
      } catch (error) {
        console.error('Error fetching neighborhood design projects:', error);
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
            src="https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80"
            alt="Neighborhood Design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Neighborhood Design</h1>
            <p className="text-xl max-w-2xl text-center">
              Creating vibrant, walkable, and sustainable neighborhoods that foster community and enhance quality of life.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Neighborhood Design Approach</h2>
            <p className="text-lg text-muted-foreground">
              At Michael Hart Architects, we believe that well-designed neighborhoods are the foundation of sustainable cities and thriving communities. Our neighborhood designs integrate housing, public spaces, amenities, and transportation networks to create places that are livable, inclusive, and environmentally responsible.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Community-Centered Planning</h3>
                  <p className="text-muted-foreground">
                    We design neighborhoods that foster social interaction and build community through thoughtful arrangement of public spaces and amenities.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Map className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Walkable Urban Form</h3>
                  <p className="text-muted-foreground">
                    Our designs prioritize pedestrian-friendly streets, mixed uses, and human-scale development to reduce car dependency.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Housing Diversity</h3>
                  <p className="text-muted-foreground">
                    We incorporate a range of housing types and price points to create inclusive neighborhoods that accommodate diverse households.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1530695440407-21fef47230b1?auto=format&fit=crop&q=80"
              alt="Neighborhood design"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Neighborhood Design Projects</h2>
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/urban-design/neighborhood/${project.slug}`}
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
              <p className="text-muted-foreground">Check back soon for updates on our neighborhood design projects.</p>
            </div>
          )}
        </div>

        {/* Case Studies */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Neighborhood Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&q=80"
                  alt="Public Spaces"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">Public Spaces as Social Infrastructure</h3>
                <p className="text-muted-foreground">
                  We design networks of public spaces that serve as the social infrastructure of neighborhoods, providing places for gathering, recreation, and cultural expression.
                </p>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                  alt="Mixed-Use Development"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">Mixed-Use Integration</h3>
                <p className="text-muted-foreground">
                  Our neighborhood designs integrate housing, retail, services, and workplaces to create vibrant, 24-hour communities with reduced transportation needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-secondary p-8 rounded-lg text-center">
          <h2 className="text-3xl font-semibold mb-4">Planning a Neighborhood Development?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            We work with developers, municipalities, and community organizations to create neighborhoods that are livable, sustainable, and economically viable.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
