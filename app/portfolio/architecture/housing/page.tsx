"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Users, Building, Home, Shield } from 'lucide-react';
import { cachedData } from '@/lib/cached-data';
// import { db } from '@/lib/mysql'; // Not used in this component
import { Project, Category } from '@/lib/mysql';
import { Button } from '@/components/ui/button';

export default function HousingPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState<Category | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Get all categories
        const categories = await cachedData.getCategories();

        // Find the housing category
        const housingCategory = categories.find(cat =>
          cat.slug === 'housing' ||
          cat.name.toLowerCase().includes('housing')
        );

        if (housingCategory) {
          setCategory(housingCategory);

          // Get all projects
          const allProjects = await cachedData.getProjects();

          // Filter projects by category and published status
          const filteredProjects = allProjects
            .filter(project =>
              project.category_id === housingCategory.id &&
              project.published
            )
            // Sort by created_at (newest first)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

          setProjects(filteredProjects);
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
            <Link href="/portfolio/architecture" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Architecture
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80"
            alt="Housing Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Housing</h1>
              <p className="text-xl">
                Our housing projects create communities where people can thrive. From social housing to market-rate developments, we design residential environments that are affordable, sustainable, and foster a sense of belonging.
              </p>
            </div>
          </div>
        </div>

        {/* Housing Categories */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Housing Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/portfolio/architecture/housing/social" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[200px]">
                  <Image
                    src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80"
                    alt="Social Housing"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Social Housing
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Affordable, dignified housing that creates stable communities and provides quality homes for those most in need.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/portfolio/architecture/housing/pdp" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[200px]">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
                    alt="Property Development Projects"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Building className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    PDP
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Property Development Projects that balance market viability with design excellence and community integration.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/portfolio/architecture/housing/cruwmbs" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[200px]">
                  <Image
                    src="https://images.unsplash.com/photo-1523192193543-6e7296d960e4?auto=format&fit=crop&q=80"
                    alt="Community Residential Units"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    CRUWMBS
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Community Residential Units With Mixed-Use Buildings and Spaces that create vibrant, integrated neighborhoods.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Design Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&q=80"
              alt="Housing community"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl font-semibold">Our Housing Design Philosophy</h2>
            <p className="text-lg text-muted-foreground">
              We believe that quality housing is a fundamental right and a foundation for individual and community wellbeing. Our approach to housing design is guided by principles of equity, sustainability, and community-building.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Dignity Through Design</h3>
                  <p className="text-muted-foreground">
                    We create homes that provide privacy, security, and a sense of ownership, regardless of budget constraints or housing typology.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Community Integration</h3>
                  <p className="text-muted-foreground">
                    Our housing projects include thoughtfully designed shared spaces that foster social connections and community resilience.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Adaptability & Growth</h3>
                  <p className="text-muted-foreground">
                    We design housing that can evolve over time, accommodating changing needs and allowing for incremental improvements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Approach */}
        <div className="bg-secondary p-8 rounded-lg">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-center">Participatory Design Process</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              Our housing projects are developed through a collaborative process that engages future residents and community stakeholders. This approach ensures that our designs respond to real needs and foster a sense of ownership.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-card p-6 rounded-lg border relative">
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                <h3 className="font-semibold mb-2 mt-2">Community Engagement</h3>
                <p className="text-sm text-muted-foreground">
                  We begin by listening to community members, understanding their needs, aspirations, and local knowledge.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border relative">
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="font-semibold mb-2 mt-2">Co-Design Workshops</h3>
                <p className="text-sm text-muted-foreground">
                  We facilitate interactive design sessions where stakeholders actively contribute to shaping their future homes.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border relative">
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="font-semibold mb-2 mt-2">Prototype Testing</h3>
                <p className="text-sm text-muted-foreground">
                  We develop and test design solutions, using models and mock-ups to gather feedback and refine our approach.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border relative">
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
                <h3 className="font-semibold mb-2 mt-2">Ongoing Involvement</h3>
                <p className="text-sm text-muted-foreground">
                  We maintain community engagement throughout construction and post-occupancy to ensure long-term success.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        {projects.length > 0 ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Featured Housing Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/architecture/housing/${project.slug}`}
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
            <h2 className="text-3xl font-semibold">Featured Housing Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample projects when no data is available */}
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80"
                    alt="Langa Social Housing"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Langa Social Housing</h3>
                <p className="text-muted-foreground">
                  A 120-unit development that combines affordable housing with community facilities and public space.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
                    alt="Observatory Mixed-Use Development"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Observatory Mixed-Use Development</h3>
                <p className="text-muted-foreground">
                  A property development project integrating residential units with retail and office space in a vibrant urban context.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1523192193543-6e7296d960e4?auto=format&fit=crop&q=80"
                    alt="Woodstock Community Residential Units"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Woodstock Community Residential Units</h3>
                <p className="text-muted-foreground">
                  A CRUWMBS project that transformed an underutilized site into a thriving mixed-use community hub.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Impact Metrics */}
        <div className="bg-card p-8 rounded-lg border">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Housing Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">1,200+</p>
              <p className="text-xl font-semibold">Housing Units</p>
              <p className="text-muted-foreground">Designed and delivered across South Africa</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">85%</p>
              <p className="text-xl font-semibold">Energy Reduction</p>
              <p className="text-muted-foreground">Average energy savings compared to conventional housing</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">15</p>
              <p className="text-xl font-semibold">Communities</p>
              <p className="text-muted-foreground">Transformed through integrated housing solutions</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">4,500+</p>
              <p className="text-xl font-semibold">Residents</p>
              <p className="text-muted-foreground">Living in homes designed by our practice</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold">Interested in Our Housing Expertise?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re a developer, municipality, or community organization, we&apos;d love to discuss how our approach to housing can meet your needs.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
