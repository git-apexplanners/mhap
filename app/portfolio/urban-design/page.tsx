"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Landmark, Home, Map, Trees, Users } from 'lucide-react';
import { cachedData } from '@/lib/cached-data';
// import { db } from '@/lib/mysql'; // Not used in this component
import { Project } from '@/lib/mysql'; // Only importing the types we need
import { Button } from '@/components/ui/button';

export default function UrbanDesignOverviewPage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  // This state variable is only used for its setter, not its value
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      setLoading(true);
      try {
        // Get all categories
        const allCategories = await cachedData.getCategories();

        // Filter categories related to urban design
        const filteredCategories = allCategories.filter(cat =>
          cat.name.toLowerCase().includes('urban') ||
          cat.name.toLowerCase().includes('heritage') ||
          cat.name.toLowerCase().includes('regeneration') ||
          cat.name.toLowerCase().includes('settlement') ||
          cat.name.toLowerCase().includes('neighborhood')
        );

        if (filteredCategories.length > 0) {
          const categoryIds = filteredCategories.map(cat => cat.id);

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
            src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80"
            alt="Urban design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Urban Design</h1>
              <p className="text-xl">
                Our urban design practice focuses on creating vibrant, sustainable, and inclusive communities. We work at various scales—from neighborhood planning to city-wide strategies—always with a commitment to enhancing quality of life and environmental stewardship.
              </p>
            </div>
          </div>
        </div>

        {/* Urban Design Categories */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Our Urban Design Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/portfolio/urban-design/heritage" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[250px]">
                  <Image
                    src="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&q=80"
                    alt="Heritage"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Landmark className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Heritage
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Preserving and revitalizing historic urban fabric while accommodating contemporary needs and functions. Our heritage work includes community projects that celebrate local identity and cultural significance.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/portfolio/urban-design/regeneration" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[250px]">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                    alt="Urban Regeneration"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Urban Regeneration
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Transforming underutilized or declining urban areas into vibrant, mixed-use districts that support economic vitality, social inclusion, and environmental sustainability.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/portfolio/urban-design/informal-settlement" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[250px]">
                  <Image
                    src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&q=80"
                    alt="Informal Settlement Upgrade"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Home className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Informal Settlement Upgrade
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Working with communities to improve living conditions in informal settlements through participatory design, infrastructure provision, and incremental development strategies.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/portfolio/urban-design/neighborhood" className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-[250px]">
                  <Image
                    src="https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80"
                    alt="Neighborhood Design"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Map className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold flex items-center">
                    Neighborhood Design
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">
                    Creating walkable, diverse, and resilient neighborhoods that foster community connections, provide access to amenities, and promote sustainable lifestyles.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Our Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80"
              alt="Urban design process"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl font-semibold">Our Urban Design Approach</h2>
            <p className="text-lg text-muted-foreground">
              Our approach to urban design is rooted in a deep understanding of place, people, and systems. We believe that successful urban environments emerge from collaborative processes that engage diverse stakeholders and integrate multiple layers of knowledge.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Community-Centered</h3>
                  <p className="text-muted-foreground">
                    We engage meaningfully with communities to understand their needs, aspirations, and local knowledge, ensuring our designs reflect and support the people who will use them.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Trees className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Ecologically Responsive</h3>
                  <p className="text-muted-foreground">
                    We integrate natural systems and green infrastructure into our urban designs, enhancing biodiversity, managing water, and creating resilient places.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Contextually Grounded</h3>
                  <p className="text-muted-foreground">
                    We respect and respond to the existing urban fabric, cultural context, and historical patterns, creating designs that belong to their place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="text-3xl font-semibold">Featured Projects</h2>
              <Button variant="outline" asChild>
                <Link href="/portfolio/urban-design/all-projects">
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

        {/* Case Study */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80"
                alt="Urban regeneration project"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Featured Case Study</h3>
                <h2 className="text-3xl font-semibold">Cape Town Waterfront Revitalization</h2>
              </div>
              <p className="text-muted-foreground">
                This award-winning project transformed an underutilized industrial waterfront into a vibrant mixed-use district that reconnects the city to its harbor. Through careful integration of historic buildings, new development, and public spaces, we created a place that serves both locals and visitors while celebrating Cape Town&apos;s maritime heritage.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  20 hectares of revitalized urban space
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  12 restored heritage buildings
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  5 km of new pedestrian waterfront promenade
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  30% affordable housing component
                </li>
              </ul>
              <Button asChild>
                <Link href="/portfolio/urban-design/regeneration/waterfront-case-study">
                  View Full Case Study
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-secondary p-8 rounded-lg text-center">
          <h2 className="text-3xl font-semibold mb-4">Interested in Urban Design Services?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Whether you&apos;re a municipality, developer, or community organization, we&apos;d love to discuss how our urban design expertise can help create more vibrant, sustainable, and inclusive places.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
