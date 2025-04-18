"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Landmark, Users, Building, History } from 'lucide-react';
import { cachedData } from '@/lib/cached-data';
// import { db } from '@/lib/mysql'; // Not used in this component
import { Project, Category } from '@/lib/mysql';
import { Button } from '@/components/ui/button';

export default function HeritageUrbanDesignPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  // These state variables are only used for their setters, not their values
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_category, setCategory] = useState<Category | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // First, try to find the heritage category
        // Get all categories
        const categories = await cachedData.getCategories();

        // Find the category
        const categoryData = categories.find(cat =>
          cat.slug === 'category-slug' ||
          cat.name.toLowerCase().includes('category-name')
        );

        if (categoryData) {
          setCategory(categoryData);

          // Fetch projects in this category
          // Get all projects
          const allProjects = await cachedData.getProjects();

          // Filter projects by category and published status
          const projectsData = allProjects
            .filter(project =>
              project.category_id === categoryData.id &&
              project.published
            )
            // Sort by created_at (newest first)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

          if (projectsData) {
            setProjects(projectsData);
          }
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back Navigation */}
        <div>
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/portfolio/urban-design" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Urban Design
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&q=80"
            alt="Heritage Urban Design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Heritage</h1>
              <p className="text-xl">
                Our heritage-focused urban design work balances preservation with adaptation, ensuring that historic urban environments remain relevant, vibrant, and meaningful for contemporary communities while honoring their cultural significance.
              </p>
            </div>
          </div>
        </div>

        {/* Heritage Categories */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Heritage Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/portfolio/urban-design/heritage/community-projects" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[250px]">
                  <Image
                    src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80"
                    alt="Community Projects"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Community Projects
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Collaborative initiatives that engage local communities in preserving and celebrating their heritage through urban interventions, public space design, and cultural programming.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/portfolio/urban-design/heritage/adaptive-reuse" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[250px]">
                  <Image
                    src="https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?auto=format&fit=crop&q=80"
                    alt="Adaptive Reuse"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Building className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Adaptive Reuse
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Transforming historic buildings and districts for contemporary uses while preserving their character and cultural significance.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Design Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Heritage Design Philosophy</h2>
            <p className="text-lg text-muted-foreground">
              We believe that heritage is not static but evolving—a living connection between past, present, and future. Our approach to heritage in urban design seeks to honor history while enabling communities to continue writing their stories in meaningful ways.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Landmark className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Layered Authenticity</h3>
                  <p className="text-muted-foreground">
                    We respect the multiple layers of history embedded in places, revealing and interpreting them in ways that enrich the urban experience.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Community Memory</h3>
                  <p className="text-muted-foreground">
                    We engage with local communities to understand the intangible heritage and collective memories that give places their meaning and significance.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <History className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Adaptive Evolution</h3>
                  <p className="text-muted-foreground">
                    We design interventions that allow heritage places to evolve and adapt while maintaining their essential character and cultural value.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80"
              alt="Heritage urban landscape"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?auto=format&fit=crop&q=80"
                alt="District Six Memory Project"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Featured Case Study</h3>
                <h2 className="text-3xl font-semibold">District Six Memory Project</h2>
              </div>
              <p className="text-muted-foreground">
                This collaborative project worked with former residents and their descendants to create a series of urban interventions that commemorate the history of District Six while supporting its ongoing redevelopment. Through public spaces, interpretive elements, and community facilities, the project helps preserve the area&apos;s cultural memory while creating new opportunities for connection and belonging.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Community memory mapping with 200+ participants
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Network of 7 public spaces linked by heritage trail
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Adaptive reuse of 3 historic buildings
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Digital archive integrated with physical environment
                </li>
              </ul>
              <Button asChild>
                <Link href="/portfolio/urban-design/heritage/district-six-case-study">
                  View Full Case Study
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        {projects.length > 0 ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Featured Heritage Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/urban-design/heritage/${project.slug}`}
                  className="group"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project.featured_image || ''}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm">View Project</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Featured Heritage Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample projects when no data is available */}
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?auto=format&fit=crop&q=80"
                    alt="Bo-Kaap Cultural Precinct"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Bo-Kaap Cultural Precinct</h3>
                <p className="text-muted-foreground">
                  A community-led urban design framework that preserves the unique character of this historic neighborhood while supporting local businesses and cultural activities.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?auto=format&fit=crop&q=80"
                    alt="Woodstock Industrial Heritage"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Woodstock Industrial Heritage</h3>
                <p className="text-muted-foreground">
                  Adaptive reuse of former industrial buildings into a mixed-use creative district that celebrates the area&apos;s manufacturing history.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80"
                    alt="Stellenbosch Historic Core"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Stellenbosch Historic Core</h3>
                <p className="text-muted-foreground">
                  A public realm strategy that enhances the historic town center while accommodating contemporary needs for mobility, commerce, and public life.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Testimonial */}
        <div className="bg-secondary p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Landmark className="h-12 w-12 mx-auto text-primary" />
            <p className="text-xl italic text-muted-foreground">
              &quot;Michael Hart Architects&apos; approach to heritage is refreshingly nuanced. They don&apos;t just preserve buildings; they understand how to keep the soul of a place alive while allowing it to grow and change. Their work on our community heritage project has transformed how residents relate to our neighborhood&apos;s history.&quot;
            </p>
            <div>
              <p className="font-semibold">Dr. Nomsa Ndlovu</p>
              <p className="text-sm text-muted-foreground">Director, Cape Town Heritage Trust</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold">Interested in Heritage-Focused Urban Design?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re a municipality, heritage organization, or community group, we&apos;d love to discuss how our approach can help you preserve and revitalize your heritage assets.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
