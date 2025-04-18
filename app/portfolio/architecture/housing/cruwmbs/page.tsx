"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Users, Building2, MapPin, Calendar, Recycle, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CRUWMBSHousingPage() {
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
          <span className="text-foreground">CRUWMBS</span>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&q=80"
            alt="CRUWMBS Housing Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">CRUWMBS Housing Initiative</h1>
              <p className="text-lg max-w-2xl">
                Climate Resilient Urban Water Management and Building Systems for sustainable housing solutions.
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
            <h2 className="text-3xl font-semibold">About CRUWMBS</h2>
            <p className="text-muted-foreground">
              The Climate Resilient Urban Water Management and Building Systems (CRUWMBS) initiative represents our commitment to developing housing solutions that address climate change challenges while ensuring sustainable water management and building practices.
            </p>
            <p className="text-muted-foreground">
              CRUWMBS projects integrate innovative water conservation, harvesting, and recycling systems with climate-adaptive building designs. These developments are specifically engineered to withstand extreme weather events, reduce resource consumption, and provide resilient living environments for communities facing climate-related challenges.
            </p>
            <p className="text-muted-foreground">
              Our CRUWMBS approach has been implemented in various contexts, from urban renewal projects to new developments in water-stressed regions, demonstrating how thoughtful architectural design can address some of the most pressing environmental challenges of our time.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Recycle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Integrated water recycling systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-primary mt-0.5" />
                  <span>Climate-adaptive building materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Resilient structural design</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <span>Community-based resource management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Featured CRUWMBS Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80"
                  alt="Blue Horizon Development"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Blue Horizon Development</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Cape Town, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2022</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A 120-unit development featuring rainwater harvesting, greywater recycling, and drought-resistant landscaping in a water-stressed urban area.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80"
                  alt="Resilient Ridge Community"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Resilient Ridge Community</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Durban, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2021</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A flood-resistant housing development with 85 units designed to withstand extreme weather events while maintaining water security.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&q=80"
                  alt="Green Water Terraces"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Green Water Terraces</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Johannesburg, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2023</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  An innovative 150-unit development featuring terraced gardens that function as water filtration systems and community food production spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
