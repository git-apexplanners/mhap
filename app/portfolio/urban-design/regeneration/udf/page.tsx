"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Building2, Map, Users, MapPin, Calendar, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UDFPage() {
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
          <Link href="/portfolio/urban-design/regeneration" className="hover:text-foreground">
            Urban Regeneration
          </Link>
          <span>/</span>
          <span className="text-foreground">UDF</span>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80"
            alt="Urban Development Framework"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">Urban Development Framework (UDF)</h1>
              <p className="text-lg max-w-2xl">
                Comprehensive planning frameworks for sustainable urban regeneration and development.
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
            <h2 className="text-3xl font-semibold">Our UDF Approach</h2>
            <p className="text-muted-foreground">
              At Michael Hart Architects, we develop Urban Development Frameworks (UDFs) that provide comprehensive guidelines for sustainable urban regeneration and development. Our UDFs integrate spatial planning, infrastructure considerations, economic development, social inclusion, and environmental sustainability to create holistic visions for urban areas.
            </p>
            <p className="text-muted-foreground">
              Each UDF is tailored to the specific context, challenges, and opportunities of the area it addresses. We employ a collaborative approach, engaging with local communities, authorities, and stakeholders to ensure that our frameworks reflect local needs and aspirations while aligning with broader urban development goals.
            </p>
            <p className="text-muted-foreground">
              Our UDFs have been successfully implemented in various urban contexts, from revitalizing historic districts to transforming post-industrial areas and developing new urban extensions. In each case, our frameworks provide clear, actionable guidelines that balance immediate interventions with long-term strategic planning.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">UDF Components</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Map className="h-5 w-5 text-primary mt-0.5" />
                  <span>Spatial planning and land use</span>
                </li>
                <li className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Infrastructure and services</span>
                </li>
                <li className="flex items-start gap-3">
                  <Landmark className="h-5 w-5 text-primary mt-0.5" />
                  <span>Heritage and cultural preservation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <span>Community facilities and public spaces</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Featured UDF Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80"
                  alt="Central District Regeneration"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Central District Regeneration</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Cape Town, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>2020-2022</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A comprehensive UDF for the revitalization of a historic central business district, balancing heritage preservation with economic development.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&q=80"
                  alt="Waterfront Development Framework"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Waterfront Development Framework</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Durban, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>2019-2021</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A UDF for the transformation of an underutilized waterfront area into a vibrant mixed-use district with enhanced public access to the water.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                  alt="Post-Industrial Zone Transformation"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Post-Industrial Zone Transformation</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Johannesburg, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>2021-2023</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A UDF for the adaptive reuse of a former industrial area, creating a new innovation district with mixed-use development and public spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
