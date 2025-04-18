"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Building2, Landmark, History, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdaptiveReusePage() {
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
          <Link href="/portfolio/urban-design/heritage" className="hover:text-foreground">
            Heritage
          </Link>
          <span>/</span>
          <span className="text-foreground">Adaptive Reuse</span>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?auto=format&fit=crop&q=80"
            alt="Adaptive Reuse Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">Adaptive Reuse</h1>
              <p className="text-lg max-w-2xl">
                Transforming historic buildings and spaces for contemporary uses while preserving their character and cultural significance.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portfolio/urban-design/heritage" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Heritage
            </Link>
          </Button>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-semibold">Our Adaptive Reuse Approach</h2>
            <p className="text-muted-foreground">
              At Michael Hart Architects, we view adaptive reuse as a powerful strategy for sustainable urban development that honors heritage while meeting contemporary needs. Our approach to adaptive reuse seeks to find the optimal balance between preservation and transformation, respecting the historical and cultural significance of buildings while giving them new life and purpose.
            </p>
            <p className="text-muted-foreground">
              Each adaptive reuse project presents unique challenges and opportunities. We begin with thorough research and documentation to understand the building&apos;s history, architectural significance, and structural condition. Through careful analysis and creative design thinking, we develop solutions that highlight original features while sensitively integrating new elements and systems to meet contemporary functional requirements, sustainability goals, and regulatory standards.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Landmark className="h-5 w-5 text-primary mt-0.5" />
                  <span>Cultural heritage preservation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Reduced environmental impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <History className="h-5 w-5 text-primary mt-0.5" />
                  <span>Urban revitalization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Featured Adaptive Reuse Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?auto=format&fit=crop&q=80"
                  alt="Woodstock Industrial Heritage"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Woodstock Industrial Heritage</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Cape Town, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2021</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Transformation of former industrial buildings into a mixed-use creative district that celebrates the area&apos;s manufacturing history while providing spaces for artists, entrepreneurs, and community activities.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&q=80"
                  alt="Historic Market Conversion"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Historic Market Conversion</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Johannesburg, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2020</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adaptive reuse of a historic market building into a vibrant food hall and community space, preserving the original structure while introducing contemporary amenities and sustainable systems.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?auto=format&fit=crop&q=80"
                  alt="Heritage Education Center"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Heritage Education Center</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Durban, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2022</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Conversion of a historic building into a community education center focused on local heritage, featuring interactive exhibits, workshop spaces, and a digital archive of community stories.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-secondary p-8 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?auto=format&fit=crop&q=80"
                alt="Woodstock Industrial Heritage"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Case Study: Woodstock Industrial Heritage</h2>
              <p className="text-muted-foreground">
                The Woodstock Industrial Heritage project involved the adaptive reuse of a cluster of former manufacturing buildings in Cape Town&apos;s Woodstock neighborhood. The buildings, dating from the early 20th century, had fallen into disuse as manufacturing declined in the area.
              </p>
              <p className="text-muted-foreground">
                Our approach preserved the industrial character of the buildings—including their distinctive sawtooth roofs, exposed brick walls, and steel trusses—while adapting them for contemporary uses. The project created a mix of affordable studio spaces for artists and craftspeople, offices for creative businesses, exhibition areas, and community facilities.
              </p>
              <p className="text-muted-foreground">
                Key interventions included the introduction of energy-efficient systems, the creation of a central courtyard by selectively removing portions of the buildings, and the addition of contemporary elements that complement the industrial aesthetic. The project has catalyzed the revitalization of the surrounding area while maintaining connections to its industrial past.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
