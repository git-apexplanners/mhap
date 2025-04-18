"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Landmark, Users, Map, Calendar, MapPin, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DistrictSixCaseStudyPage() {
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
          <span className="text-foreground">District Six Case Study</span>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?auto=format&fit=crop&q=80"
            alt="District Six Memory Project"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">District Six Memory Project</h1>
              <p className="text-lg max-w-2xl">
                A collaborative urban design initiative that commemorates history while supporting community redevelopment.
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

        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-semibold">Project Overview</h2>
            <p className="text-muted-foreground">
              The District Six Memory Project is a collaborative urban design initiative that works with former residents and their descendants to create a series of interventions that commemorate the history of District Six while supporting its ongoing redevelopment. The project addresses the complex legacy of forced removals during apartheid, seeking to preserve cultural memory while creating new opportunities for connection and belonging.
            </p>
            <p className="text-muted-foreground">
              Our role involved facilitating a participatory design process, developing the spatial framework for memory elements, designing key public spaces, and coordinating with various stakeholders including community organizations, the District Six Museum, and government agencies. The project demonstrates how thoughtful urban design can help communities reclaim and reinterpret contested spaces while building a more inclusive future.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Project Details</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span>District Six, Cape Town, South Africa</span>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <span>2019-2022</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <span>Community memory mapping with 200+ participants</span>
                </li>
                <li className="flex items-start gap-3">
                  <Map className="h-5 w-5 text-primary mt-0.5" />
                  <span>Network of 7 public spaces linked by heritage trail</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Project Components */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Project Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Component 1 */}
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80"
                  alt="Memory Mapping"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Memory Mapping</h3>
                <p className="text-sm text-muted-foreground">
                  A participatory process that engaged former residents in documenting memories, stories, and significant places through workshops, interviews, and digital tools. This created a rich archive of spatial memories that informed the design of physical interventions.
                </p>
              </div>
            </div>

            {/* Component 2 */}
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80"
                  alt="Heritage Trail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Heritage Trail</h3>
                <p className="text-sm text-muted-foreground">
                  A network of pathways that follows the historic street pattern of District Six, connecting key sites and public spaces. The trail features interpretive elements, including paving markers, information panels, and digital interfaces that reveal the layered history of the area.
                </p>
              </div>
            </div>

            {/* Component 3 */}
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&q=80"
                  alt="Adaptive Reuse"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Adaptive Reuse</h3>
                <p className="text-sm text-muted-foreground">
                  Restoration and repurposing of three surviving historic buildings as community facilities, including a cultural center, skills development hub, and memory archive. These buildings serve as anchors for the redeveloping neighborhood.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Design Process */}
        <div className="bg-secondary p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">Participatory Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card p-6 rounded-lg border relative">
              <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="font-semibold mb-2 mt-2">Community Engagement</h3>
              <p className="text-sm text-muted-foreground">
                We began with extensive outreach to former residents, descendants, and community organizations to establish trust and gather initial input.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border relative">
              <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="font-semibold mb-2 mt-2">Memory Collection</h3>
              <p className="text-sm text-muted-foreground">
                Through workshops, interviews, and digital tools, we documented spatial memories, stories, and significant places that formed the foundation of the design.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border relative">
              <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
              <h3 className="font-semibold mb-2 mt-2">Co-Design</h3>
              <p className="text-sm text-muted-foreground">
                We facilitated collaborative design sessions where community members actively shaped the interventions, ensuring they authentically represented local memories.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border relative">
              <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
              <h3 className="font-semibold mb-2 mt-2">Implementation</h3>
              <p className="text-sm text-muted-foreground">
                We worked with local craftspeople and artists to create elements that reflected community input, while ensuring integration with broader redevelopment plans.
              </p>
            </div>
          </div>
        </div>

        {/* Impact */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Project Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80"
                alt="Community gathering at District Six"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Community Reconnection</h3>
                    <p className="text-muted-foreground">
                      The project has helped reconnect dispersed community members with each other and with the physical space of District Six, facilitating healing and reconciliation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <History className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Heritage Preservation</h3>
                    <p className="text-muted-foreground">
                      The project has documented and preserved intangible heritage that might otherwise have been lost, creating a rich archive for future generations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Landmark className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Urban Integration</h3>
                    <p className="text-muted-foreground">
                      The interventions have helped integrate the redeveloping District Six with the surrounding city, creating connections that enhance urban cohesion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-card p-8 rounded-lg border">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-xl italic text-muted-foreground">
              &quot;The District Six Memory Project has given us a way to reconnect with our history while looking forward. It&apos;s not just about remembering what was lost, but about creating new memories in a place that still holds so much meaning for our community.&quot;
            </p>
            <div>
              <p className="font-semibold">Fatima Abrahams</p>
              <p className="text-sm text-muted-foreground">Former District Six resident and project participant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
