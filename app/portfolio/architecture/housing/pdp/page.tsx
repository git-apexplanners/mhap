"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Users, Building2, MapPin, Calendar, Lightbulb, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PDPHousingPage() {
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
          <span className="text-foreground">PDP</span>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80"
            alt="PDP Housing Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">Property Development Program (PDP) Housing</h1>
              <p className="text-lg max-w-2xl">
                Innovative housing solutions that balance commercial viability with social responsibility and architectural excellence.
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
            <h2 className="text-3xl font-semibold">Our PDP Housing Approach</h2>
            <p className="text-muted-foreground">
              The Property Development Program (PDP) at Michael Hart Architects focuses on creating housing solutions that are commercially viable while maintaining high standards of design, sustainability, and community integration. We work with developers, investors, and public entities to create housing that serves diverse market segments.
            </p>
            <p className="text-muted-foreground">
              Our PDP projects range from affordable housing developments to mixed-income communities and market-rate residential complexes. In each case, we apply our expertise in urban design, sustainable architecture, and community planning to create developments that are both financially successful and socially responsible.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Program Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                  <span>Innovative financing models</span>
                </li>
                <li className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Mixed-use development expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <span>Regulatory compliance management</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <span>Stakeholder engagement strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Featured PDP Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1464082354059-27db6ce50048?auto=format&fit=crop&q=80"
                  alt="Waterfront Residences"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Waterfront Residences</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Cape Town, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2020</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A mixed-income development of 200 units with integrated commercial spaces and public waterfront access.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80"
                  alt="Green Valley Community"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Green Valley Community</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Stellenbosch, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2021</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A sustainable housing development with 150 units featuring renewable energy systems, water conservation, and community gardens.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&q=80"
                  alt="Urban Heights"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Urban Heights</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Johannesburg, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed 2022</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A high-density urban development with 300 units, featuring a mix of affordable and market-rate apartments with shared amenities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
