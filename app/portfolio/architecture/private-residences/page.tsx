"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home, Sun, Trees, Droplets, Wind } from 'lucide-react';
import { cachedData } from '@/lib/cached-data';
// import { db } from '@/lib/mysql'; // Not used in this component
import { Project, Category } from '@/lib/mysql';
import { Button } from '@/components/ui/button';

export default function PrivateResidencesPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState<Category | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // First, try to find the private residences category
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
            <Link href="/portfolio/architecture" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Architecture
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
            alt="Private Residence"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Private Residences</h1>
              <p className="text-xl">
                Our residential architecture creates homes that reflect the unique personalities and lifestyles of their owners while responding sensitively to their contexts. Each residence is a bespoke creation, tailored to its site and the people who will inhabit it.
              </p>
            </div>
          </div>
        </div>

        {/* Design Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Residential Design Philosophy</h2>
            <p className="text-lg text-muted-foreground">
              We believe that a home should be more than just a beautiful object—it should be a place that nurtures its inhabitants, connects them to their surroundings, and evolves with their lives. Our residential designs are guided by three core principles:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Personalized Living</h3>
                  <p className="text-muted-foreground">
                    We design homes that reflect and support the unique patterns, rituals, and aspirations of the people who will live in them.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Sun className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Environmental Harmony</h3>
                  <p className="text-muted-foreground">
                    Our homes work with their natural context, optimizing orientation, views, and climate response to create comfortable, energy-efficient spaces.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Trees className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Timeless Craft</h3>
                  <p className="text-muted-foreground">
                    We prioritize quality materials, thoughtful detailing, and enduring design that will remain relevant and beautiful for generations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
              alt="Residential interior"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Featured Approach */}
        <div className="bg-secondary p-8 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-semibold">Climate-Responsive Design</h2>
              <p className="text-lg text-muted-foreground">
                South Africa&apos;s diverse climate zones require thoughtful, region-specific design approaches. Our residential projects incorporate passive design strategies tailored to their specific microclimate, reducing energy consumption while enhancing comfort and connection to place.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Solar Optimization</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Strategic orientation, shading, and thermal mass to harness or mitigate solar gain as needed.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Natural Ventilation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cross-ventilation, stack effect, and courtyard strategies to enhance airflow and cooling.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Water Sensitivity</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rainwater harvesting, greywater systems, and drought-resistant landscaping for water conservation.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-auto rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9?auto=format&fit=crop&q=80"
                alt="Climate responsive home"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        {projects.length > 0 ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Our Residential Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/architecture/private-residences/${project.slug}`}
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
            <h2 className="text-3xl font-semibold">Our Residential Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample projects when no data is available */}
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80"
                    alt="Clifton Beach House"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Clifton Beach House</h3>
                <p className="text-muted-foreground">
                  A contemporary coastal home that maximizes ocean views while providing privacy and protection from the elements.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80"
                    alt="Stellenbosch Vineyard Residence"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Stellenbosch Vineyard Residence</h3>
                <p className="text-muted-foreground">
                  A family home integrated into a working vineyard, blending agricultural functionality with refined living spaces.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
                    alt="Karoo Desert Retreat"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Karoo Desert Retreat</h3>
                <p className="text-muted-foreground">
                  A sustainable off-grid home that responds to the harsh desert climate while celebrating the expansive landscape.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Client Testimonials */}
        <div className="bg-card p-8 rounded-lg border">
          <h2 className="text-3xl font-semibold mb-6 text-center">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="italic text-muted-foreground">
                &quot;Michael and his team transformed our vision into a home that exceeds our expectations. They listened carefully to our needs and created spaces that work perfectly for our family while connecting beautifully to the surrounding landscape.&quot;
              </p>
              <p className="font-semibold">James & Sarah Thompson</p>
              <p className="text-sm text-muted-foreground">Cape Town Hillside Residence</p>
            </div>
            <div className="space-y-4">
              <p className="italic text-muted-foreground">
                &quot;The attention to detail and thoughtful design solutions have made our home not just visually stunning but also incredibly functional. Five years later, we&apos;re still discovering subtle design elements that enhance our daily lives.&quot;
              </p>
              <p className="font-semibold">Thabo & Lerato Molefe</p>
              <p className="text-sm text-muted-foreground">Johannesburg Garden Pavilion</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold">Ready to Create Your Dream Home?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;d love to discuss how we can design a residence that perfectly suits your lifestyle, site, and aspirations.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
