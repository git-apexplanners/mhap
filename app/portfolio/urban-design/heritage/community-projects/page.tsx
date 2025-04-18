"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Users, Landmark, MapPin, MessageSquare, Camera } from 'lucide-react';
import { cachedData } from '@/lib/cached-data';
// import { db } from '@/lib/mysql'; // Not used in this component
import type { Project, Category } from '@/lib/mysql';
import { Button } from '@/components/ui/button';

export default function CommunityProjectsPage() {
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
        // Get all categories
        const categories = await cachedData.getCategories();

        // Find the community projects category
        const communityCategory = categories.find(cat =>
          cat.slug === 'community-projects' ||
          (cat.name && cat.name.toLowerCase().includes('community') && cat.name.toLowerCase().includes('project'))
        );

        if (communityCategory) {
          setCategory(communityCategory);

          // Get all projects
          const allProjects = await cachedData.getProjects();

          // Filter projects in this category that are published
          const categoryProjects = allProjects.filter(project =>
            project.category_id === communityCategory.id &&
            project.published === true
          );

          // Sort by created_at in descending order
          categoryProjects.sort((a, b) => {
            const dateA = new Date(a.created_at || 0).getTime();
            const dateB = new Date(b.created_at || 0).getTime();
            return dateB - dateA;
          });

          setProjects(categoryProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    // Set up polling for data updates every 60 seconds
    const pollingInterval = setInterval(() => {
      // Clear cache and refresh data
      cachedData.clearProjectCache();
      cachedData.clearCategoryCache();
      fetchProjects();
    }, 60000); // 60 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back Navigation */}
        <div>
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/portfolio/urban-design/heritage" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Heritage
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80"
            alt="Community Heritage Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Community Heritage Projects</h1>
              <p className="text-xl">
                Our community-focused heritage projects engage local residents in preserving, celebrating, and reimagining their cultural heritage through collaborative design processes and meaningful urban interventions.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Community-Centered Approach</h2>
            <p className="text-lg text-muted-foreground">
              We believe that heritage belongs to communities, not just experts. Our approach puts local knowledge and lived experience at the center of the design process, ensuring that heritage projects reflect the values, memories, and aspirations of the people who call these places home.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Participatory Process</h3>
                  <p className="text-muted-foreground">
                    We use a range of engagement tools to involve community members of all ages and backgrounds in the design process, from initial visioning to implementation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Landmark className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Tangible & Intangible Heritage</h3>
                  <p className="text-muted-foreground">
                    We address both physical heritage (buildings, landscapes) and intangible heritage (stories, traditions, practices) in our community projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Place-Based Implementation</h3>
                  <p className="text-muted-foreground">
                    We develop context-specific interventions that respond to local conditions, resources, and capacities, ensuring sustainable outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80"
              alt="Community workshop"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Engagement Tools */}
        <div className="bg-secondary p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Community Engagement Toolkit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Oral History Collection</h3>
              </div>
              <p className="text-muted-foreground">
                We gather stories and memories from community members to understand the lived experience of heritage places and inform design decisions.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Structured interviews with elders</li>
                <li>• Community storytelling events</li>
                <li>• Digital story archives</li>
              </ul>
            </div>
            <div className="bg-card p-6 rounded-lg border space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Cultural Mapping</h3>
              </div>
              <p className="text-muted-foreground">
                We work with communities to map significant places, routes, and activities that may not be visible in official heritage records.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Participatory GIS mapping</li>
                <li>• Memory walks and site visits</li>
                <li>• Historical photo mapping</li>
              </ul>
            </div>
            <div className="bg-card p-6 rounded-lg border space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Visual Documentation</h3>
              </div>
              <p className="text-muted-foreground">
                We use various visual methods to document heritage and engage communities in seeing their environment in new ways.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Photovoice projects</li>
                <li>• Community film-making</li>
                <li>• Before/after visualization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 space-y-6 order-2 lg:order-1">
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Featured Case Study</h3>
                <h2 className="text-3xl font-semibold">Langa Cultural Heritage Trail</h2>
              </div>
              <p className="text-muted-foreground">
                Working with the Langa Heritage Foundation and local residents, we developed a community-led heritage trail that celebrates the rich cultural history of Cape Town&apos;s oldest township. The project combined physical interventions—including signage, public art, and gathering spaces—with digital storytelling tools that allow visitors to access oral histories and archival material.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  25 community workshops with 300+ participants
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  12 heritage nodes connected by 3km walking route
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  50+ oral histories collected and integrated
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Local artists and craftspeople involved in implementation
                </li>
              </ul>
              <Button asChild>
                <Link href="/portfolio/urban-design/heritage/community-projects/langa-trail">
                  View Full Case Study
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] lg:h-auto order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80"
                alt="Langa Cultural Heritage Trail"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        {projects.length > 0 ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Featured Community Heritage Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/urban-design/heritage/community-projects/${project.slug}`}
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
            <h2 className="text-3xl font-semibold">Featured Community Heritage Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample projects when no data is available */}
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80"
                    alt="Langa Cultural Heritage Trail"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Langa Cultural Heritage Trail</h3>
                <p className="text-muted-foreground">
                  A community-led heritage trail celebrating the rich cultural history of Cape Town&apos;s oldest township.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80"
                    alt="District Six Memory Project"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">District Six Memory Project</h3>
                <p className="text-muted-foreground">
                  A series of urban interventions commemorating the history of District Six while supporting its ongoing redevelopment.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80"
                    alt="Bo-Kaap Cultural Precinct"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Bo-Kaap Cultural Precinct</h3>
                <p className="text-muted-foreground">
                  A community-led urban design framework preserving the unique character of this historic neighborhood.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Impact Metrics */}
        <div className="bg-card p-8 rounded-lg border">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Community Heritage Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">15+</p>
              <p className="text-xl font-semibold">Communities</p>
              <p className="text-muted-foreground">Engaged in heritage projects across South Africa</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">500+</p>
              <p className="text-xl font-semibold">Oral Histories</p>
              <p className="text-muted-foreground">Collected and preserved through our projects</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">30+</p>
              <p className="text-xl font-semibold">Heritage Sites</p>
              <p className="text-muted-foreground">Revitalized through community-led interventions</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">8</p>
              <p className="text-xl font-semibold">Heritage Awards</p>
              <p className="text-muted-foreground">Recognizing our community heritage work</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-center">Community Voices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary p-6 rounded-lg">
              <p className="italic text-muted-foreground mb-4">
                &quot;Working with Michael Hart Architects on our heritage project was transformative for our community. They didn&apos;t just listen to us—they truly heard us and helped us translate our memories and hopes into meaningful spaces that tell our story.&quot;
              </p>
              <p className="font-semibold">Thandi Nkosi</p>
              <p className="text-sm text-muted-foreground">Langa Heritage Foundation</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <p className="italic text-muted-foreground mb-4">
                &quot;What sets this team apart is their genuine respect for community knowledge. They brought technical expertise but never imposed their vision. Instead, they helped us articulate and realize our own vision for preserving our heritage.&quot;
              </p>
              <p className="font-semibold">James van der Merwe</p>
              <p className="text-sm text-muted-foreground">District Six Community Representative</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold">Interested in a Community Heritage Project?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re a community organization, heritage institution, or municipality, we&apos;d love to discuss how we can help you engage communities in preserving and celebrating their heritage.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
