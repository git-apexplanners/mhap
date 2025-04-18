"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Building2, Lightbulb, Users, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CounselingPage() {
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
          <span className="text-foreground">Counseling</span>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80"
            alt="Architectural Counseling"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">Architectural Counseling</h1>
              <p className="text-lg max-w-2xl">
                Expert guidance and consultation services for architectural projects, urban planning, and sustainable design.
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
            <h2 className="text-3xl font-semibold">Our Counseling Services</h2>
            <p className="text-muted-foreground">
              Michael Hart Architects offers specialized architectural counseling services to clients ranging from individual property owners to large organizations and government entities. Our counseling practice draws on over three decades of experience in diverse architectural contexts to provide expert guidance on project feasibility, design solutions, regulatory compliance, and sustainable practices.
            </p>
            <p className="text-muted-foreground">
              Our approach to architectural counseling is collaborative and client-centered. We work closely with stakeholders to understand their specific needs, constraints, and aspirations, then provide tailored advice that balances aesthetic, functional, financial, and environmental considerations. Whether you&apos;re planning a new development, renovating an existing structure, or addressing specific architectural challenges, our counseling services can help you make informed decisions and achieve optimal outcomes.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Service Areas</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Project feasibility assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                  <span>Design concept development</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <span>Stakeholder engagement strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span>Site analysis and selection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Featured Counseling Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80"
                  alt="Urban Renewal Consultation"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Urban Renewal Consultation</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Cape Town, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>2021-2022</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Provided comprehensive counseling for a major urban renewal initiative, including feasibility studies, stakeholder engagement, and design guidelines.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80"
                  alt="Heritage Conservation Advisory"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Heritage Conservation Advisory</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Stellenbosch, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>2020-2021</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Provided expert guidance on the sensitive renovation and adaptive reuse of historic buildings in a heritage district.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-card border rounded-lg overflow-hidden group">
              <div className="relative h-[240px]">
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
                  alt="Sustainable Campus Planning"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Sustainable Campus Planning</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Johannesburg, South Africa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>2022-2023</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Provided comprehensive counseling for a university campus expansion, focusing on sustainable design principles and integration with existing structures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
