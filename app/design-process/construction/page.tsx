"use client";

import Image from 'next/image';
import { HardHat, Clock, Ruler, Hammer, Truck, FileCheck, Wrench, Recycle } from 'lucide-react';

export default function ConstructionExperiencePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="relative h-[40vh] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
              alt="Construction site"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">Construction Experience</h1>
                <p className="text-lg max-w-2xl">
                  Our hands-on approach to construction ensures that architectural vision becomes reality through meticulous planning, quality materials, and expert craftsmanship.
                </p>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Bridging Design and Construction</h2>
              <p className="text-lg text-muted-foreground">
                At Michael Hart Architects, we believe that exceptional architecture requires not just innovative design, but also a deep understanding of construction processes. With over three decades of experience, we&apos;ve developed expertise in translating architectural concepts into buildable realities.
              </p>
              <p className="text-lg text-muted-foreground">
                Our approach to construction is collaborative, detail-oriented, and focused on quality. We work closely with contractors, engineers, and craftspeople to ensure that every aspect of the design is executed with precision and care.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80"
                alt="Architectural blueprints and models"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Construction Expertise */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-center">Our Construction Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <HardHat className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Site Management</h3>
                </div>
                <p className="text-muted-foreground">
                  Regular site visits and coordination with construction teams to ensure quality control and adherence to design specifications.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Timeline Planning</h3>
                </div>
                <p className="text-muted-foreground">
                  Detailed construction scheduling that accounts for material lead times, seasonal considerations, and project phasing.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Ruler className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Technical Detailing</h3>
                </div>
                <p className="text-muted-foreground">
                  Comprehensive construction documentation with precise details that anticipate and resolve potential field issues before they arise.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Recycle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Sustainable Practices</h3>
                </div>
                <p className="text-muted-foreground">
                  Implementation of environmentally responsible construction methods, waste reduction strategies, and energy-efficient systems.
                </p>
              </div>
            </div>
          </div>

          {/* Construction Process */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Our Construction Process</h2>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
              <div className="space-y-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <div className="bg-card p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-4">Pre-Construction Planning</h3>
                      <p className="text-muted-foreground">
                        Before breaking ground, we conduct thorough planning sessions with all stakeholders. This includes finalizing construction documents, obtaining necessary permits, selecting contractors, and establishing a detailed timeline and budget.
                      </p>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full relative z-10">
                      <FileCheck className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-1 flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full relative z-10">
                      <Truck className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="order-2">
                    <div className="bg-card p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-4">Material Procurement</h3>
                      <p className="text-muted-foreground">
                        We carefully source materials that meet our quality standards and sustainability goals. Our team works with suppliers to ensure timely delivery and proper storage, minimizing delays and ensuring material integrity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <div className="bg-card p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-4">Construction Oversight</h3>
                      <p className="text-muted-foreground">
                        During the construction phase, our architects maintain a regular presence on site, conducting inspections, addressing questions, and making adjustments as needed. We facilitate communication between all parties to ensure smooth progress.
                      </p>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full relative z-10">
                      <Hammer className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-1 flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full relative z-10">
                      <Wrench className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="order-2">
                    <div className="bg-card p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-4">Completion & Handover</h3>
                      <p className="text-muted-foreground">
                        As construction nears completion, we conduct thorough inspections to ensure all work meets our standards. We prepare documentation for the client, coordinate final approvals, and facilitate a smooth transition to occupancy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Featured Construction Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80"
                    alt="Eco-friendly residence"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">View Project</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Eco-Friendly Residence</h3>
                <p className="text-muted-foreground">
                  A sustainable home built with locally-sourced materials and innovative construction techniques.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                    alt="Commercial tower"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">View Project</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Commercial Tower</h3>
                <p className="text-muted-foreground">
                  A complex high-rise project showcasing advanced structural solutions and efficient construction management.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&q=80"
                    alt="Heritage renovation"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">View Project</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Heritage Renovation</h3>
                <p className="text-muted-foreground">
                  Careful restoration of a historic building requiring specialized construction techniques and craftsmanship.
                </p>
              </div>
            </div>
          </div>

          {/* Client Testimonials */}
          <div className="bg-secondary p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center">Client Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg border">
                <p className="italic text-muted-foreground mb-4">
                  &quot;The construction phase of our project could have been stressful, but Michael Hart&apos;s team made it seamless. Their attention to detail and regular communication kept us informed and confident throughout the process.&quot;
                </p>
                <p className="font-semibold">Thomas Mbeki</p>
                <p className="text-sm text-muted-foreground">Private Residence Client</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <p className="italic text-muted-foreground mb-4">
                  &quot;What impressed us most was how the team anticipated and solved construction challenges before they became problems. Their expertise saved us time and money while ensuring the highest quality results.&quot;
                </p>
                <p className="font-semibold">Lisa van der Merwe</p>
                <p className="text-sm text-muted-foreground">Director, Urban Development Corporation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
