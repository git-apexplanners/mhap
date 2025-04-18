"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Building2, Map, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UrbanRegenerationPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-foreground">
            Portfolio
          </Link>
          <span>/</span>
          <Link href="/portfolio/urban-design" className="hover:text-foreground">
            Urban Design
          </Link>
          <span>/</span>
          <span className="text-foreground">Urban Regeneration</span>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80"
            alt="Urban Regeneration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">Urban Regeneration</h1>
              <p className="text-lg max-w-2xl">
                Revitalizing urban spaces through thoughtful design, community engagement, and sustainable development.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portfolio/urban-design" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Urban Design
            </Link>
          </Button>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-semibold">Our Approach to Urban Regeneration</h2>
            <p className="text-muted-foreground">
              At Michael Hart Architects, we view urban regeneration as an opportunity to breathe new life into existing urban areas while respecting their history, character, and community. Our approach integrates physical, social, economic, and environmental considerations to create holistic regeneration strategies that benefit all stakeholders.
            </p>
            <p className="text-muted-foreground">
              We believe that successful urban regeneration must be inclusive and community-driven. Through extensive engagement with local residents, businesses, and institutions, we develop regeneration plans that reflect local needs and aspirations while addressing broader urban challenges such as sustainability, mobility, and economic development.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Key Focus Areas</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Adaptive reuse of existing structures</span>
                </li>
                <li className="flex items-start gap-3">
                  <Map className="h-5 w-5 text-primary mt-0.5" />
                  <span>Public space enhancement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Landmark className="h-5 w-5 text-primary mt-0.5" />
                  <span>Heritage integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Urban Development Framework */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Urban Development Framework (UDF)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our Urban Development Framework (UDF) approach provides comprehensive guidelines for sustainable urban regeneration. UDFs integrate spatial planning, infrastructure considerations, economic development, social inclusion, and environmental sustainability to create holistic visions for urban areas.
              </p>
              <p className="text-muted-foreground">
                Each UDF is tailored to the specific context, challenges, and opportunities of the area it addresses. We employ a collaborative approach, engaging with local communities, authorities, and stakeholders to ensure that our frameworks reflect local needs and aspirations.
              </p>
              <Button asChild className="mt-4">
                <Link href="/portfolio/urban-design/regeneration/udf">
                  Explore UDF Projects
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80"
                alt="Urban Development Framework"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Featured Regeneration Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&q=80"
                  alt="Waterfront Revitalization"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Waterfront Revitalization</h3>
                <p className="text-sm text-muted-foreground">
                  Transformation of an underutilized waterfront area into a vibrant mixed-use district with enhanced public access to the water.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portfolio/urban-design/regeneration/udf">
                    View UDF Projects
                  </Link>
                </Button>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                  alt="Industrial Zone Transformation"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Industrial Zone Transformation</h3>
                <p className="text-sm text-muted-foreground">
                  Adaptive reuse of a former industrial area, creating a new innovation district with mixed-use development and public spaces.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portfolio/urban-design/regeneration/udf">
                    View UDF Projects
                  </Link>
                </Button>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80"
                  alt="Historic District Revitalization"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Historic District Revitalization</h3>
                <p className="text-sm text-muted-foreground">
                  Revitalization of a historic district, balancing heritage preservation with economic development and contemporary needs.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portfolio/urban-design/regeneration/udf">
                    View UDF Projects
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
