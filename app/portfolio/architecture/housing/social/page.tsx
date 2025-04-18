"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Home, Users, Building2, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SocialHousingPage() {
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
          <Link href="/portfolio/architecture" className="hover:text-foreground">
            Architecture
          </Link>
          <span>/</span>
          <Link href="/portfolio/architecture/housing" className="hover:text-foreground">
            Housing
          </Link>
          <span>/</span>
          <span className="text-foreground">Social</span>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
            alt="Social Housing Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">Social Housing Projects</h1>
              <p className="text-lg max-w-2xl">
                Sustainable, community-focused housing solutions that prioritize quality of life and social integration.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portfolio/architecture" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Architecture
            </Link>
          </Button>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-semibold">Our Approach to Social Housing</h2>
            <p className="text-muted-foreground">
              At Michael Hart Architects, we believe that social housing should be more than just affordable shelter. Our approach integrates community needs, sustainable design principles, and innovative space utilization to create dignified living environments that foster community and well-being.
            </p>
            <p className="text-muted-foreground">
              Our social housing projects prioritize quality of life through thoughtful design that considers natural light, ventilation, privacy, and community spaces. We work closely with communities, local authorities, and stakeholders to ensure our designs meet the specific needs of residents while contributing positively to the broader urban context.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <span>Community-centered design approach</span>
                </li>
                <li className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-primary mt-0.5" />
                  <span>Dignified, quality living spaces</span>
                </li>
                <li className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Integrated community facilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span>Context-sensitive urban integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80"
                  alt="Riverside Community Housing"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Riverside Community Housing</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Cape Town, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2021</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A 120-unit development that integrates housing with community spaces, gardens, and small business opportunities.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80"
                  alt="Hillside Terrace Housing"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Hillside Terrace Housing</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Johannesburg, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2019</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  An award-winning development of 85 units designed to maximize natural light and ventilation while creating safe community spaces.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                  alt="Urban Renewal Housing"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Urban Renewal Housing</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Durban, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2022</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A mixed-use development with 150 housing units integrated with retail spaces and community facilities in a previously neglected urban area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
