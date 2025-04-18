"use client";

import Image from 'next/image';
import { Building2, Users, Lightbulb, Ruler, PenTool, FileCheck } from 'lucide-react';

export default function CorporateDesignProcessPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="relative h-[40vh] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80"
              alt="Corporate architecture"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">Corporate Design Process</h1>
                <p className="text-lg max-w-2xl">
                  Our approach to corporate architecture balances functionality, brand identity, and employee well-being to create spaces that inspire productivity and collaboration.
                </p>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Our Corporate Design Philosophy</h2>
              <p className="text-lg text-muted-foreground">
                At Michael Hart Architects, we understand that corporate spaces are more than just buildings—they&apos;re physical manifestations of a company&apos;s culture, values, and aspirations. Our design process for corporate clients is collaborative, innovative, and focused on creating environments that enhance productivity, foster creativity, and reflect brand identity.
              </p>
              <p className="text-lg text-muted-foreground">
                With over three decades of experience working with businesses of all sizes, we&apos;ve developed a comprehensive approach that addresses the unique challenges and opportunities of corporate architecture.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80"
                alt="Corporate design meeting"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Process Steps */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-center">Our Corporate Design Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">1. Discovery & Analysis</h3>
                </div>
                <p className="text-muted-foreground">
                  We begin by understanding your organization&apos;s culture, workflow, and goals. This involves site analysis, stakeholder interviews, and operational assessments to identify key requirements and constraints.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">2. Collaborative Visioning</h3>
                </div>
                <p className="text-muted-foreground">
                  We facilitate workshops with leadership and employees to develop a shared vision for the space. This collaborative approach ensures the design reflects your company&apos;s identity and meets the needs of those who will use it daily.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">3. Concept Development</h3>
                </div>
                <p className="text-muted-foreground">
                  Our team develops multiple design concepts that address your functional requirements while expressing your brand identity. We present these options with visualizations to help you envision the possibilities.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Ruler className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">4. Detailed Design</h3>
                </div>
                <p className="text-muted-foreground">
                  Once a direction is chosen, we refine the design with detailed space planning, material selections, and technical specifications. We integrate sustainable practices and wellness considerations throughout this phase.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <PenTool className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">5. Documentation & Coordination</h3>
                </div>
                <p className="text-muted-foreground">
                  We produce comprehensive construction documents and coordinate with engineers, contractors, and other consultants to ensure all aspects of the design are properly integrated and buildable.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">6. Implementation & Evaluation</h3>
                </div>
                <p className="text-muted-foreground">
                  We provide oversight during construction to ensure the design intent is realized. After completion, we conduct post-occupancy evaluations to assess the effectiveness of the space and identify opportunities for improvement.
                </p>
              </div>
            </div>
          </div>

          {/* Case Studies */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Featured Corporate Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                    alt="Cape Town Innovation Hub"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">View Project</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Cape Town Innovation Hub</h3>
                <p className="text-muted-foreground">
                  A collaborative workspace designed to foster innovation and cross-pollination of ideas among technology startups.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1577760258779-e787a1733016?auto=format&fit=crop&q=80"
                    alt="Johannesburg Financial Center"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">View Project</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Johannesburg Financial Center</h3>
                <p className="text-muted-foreground">
                  A prestigious headquarters that balances corporate identity with employee wellness through biophilic design principles.
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
                  &quot;Michael Hart Architects transformed our workplace into a space that truly reflects our company culture. The collaborative process ensured that our team&apos;s needs were met while creating an environment that impresses clients and inspires creativity.&quot;
                </p>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">CEO, TechSphere Solutions</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <p className="italic text-muted-foreground mb-4">
                  &quot;The attention to detail and thoughtful integration of our brand throughout the design has made a significant impact on how our clients perceive us. More importantly, our staff productivity and satisfaction have increased dramatically in our new space.&quot;
                </p>
                <p className="font-semibold">David Nkosi</p>
                <p className="text-sm text-muted-foreground">Managing Director, Horizon Financial Group</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
