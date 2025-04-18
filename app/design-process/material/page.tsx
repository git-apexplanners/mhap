"use client";

import Image from 'next/image';
import { Layers, Leaf, Droplets, Sun, Wind, Paintbrush, Sparkles } from 'lucide-react'; // Removed unused Recycle import

export default function MaterialDesignProcessPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="relative h-[40vh] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518481852452-9415dca8c77d?auto=format&fit=crop&q=80"
              alt="Material samples"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">Material Design Process</h1>
                <p className="text-lg max-w-2xl">
                  Our thoughtful approach to material selection balances aesthetics, functionality, sustainability, and cultural context to create spaces with depth, character, and longevity.
                </p>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">The Language of Materials</h2>
              <p className="text-lg text-muted-foreground">
                At Michael Hart Architects, we believe that materials are fundamental to the experience of architecture. They engage our senses, connect us to place, and communicate meaning. Our material design process is both rigorous and intuitive, drawing on technical knowledge and creative exploration.
              </p>
              <p className="text-lg text-muted-foreground">
                With over three decades of experience, we&apos;ve developed expertise in both traditional and innovative materials, always seeking the perfect balance between form, function, and sustainability.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&q=80"
                alt="Material textures"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Material Selection Principles */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-center">Our Material Selection Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Sustainability</h3>
                </div>
                <p className="text-muted-foreground">
                  We prioritize materials with low environmental impact, considering factors such as embodied carbon, resource depletion, and end-of-life recyclability.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Durability</h3>
                </div>
                <p className="text-muted-foreground">
                  We select materials that will stand the test of time, both physically and aesthetically, reducing the need for replacement and maintenance.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Sensory Experience</h3>
                </div>
                <p className="text-muted-foreground">
                  We consider how materials engage all senses—visual texture, acoustic properties, tactile qualities, and even scent—to create rich, multi-layered environments.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Paintbrush className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Cultural Context</h3>
                </div>
                <p className="text-muted-foreground">
                  We respect local building traditions and material cultures, often reinterpreting them in contemporary ways to create architecture that belongs to its place.
                </p>
              </div>
            </div>
          </div>

          {/* Material Categories */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Material Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg overflow-hidden border">
                <div className="relative h-[250px]">
                  <Image
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80"
                    alt="Natural materials"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold">Natural Materials</h3>
                  <p className="text-muted-foreground">
                    We have extensive experience working with timber, stone, clay, and other natural materials. We understand their properties, limitations, and the craftsmanship they require. Our approach often celebrates the inherent beauty and variation of these materials.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Local hardwoods
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Indigenous stone
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Rammed earth
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Natural fibers
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-card rounded-lg overflow-hidden border">
                <div className="relative h-[250px]">
                  <Image
                    src="https://images.unsplash.com/photo-1565942443747-031188e6e56c?auto=format&fit=crop&q=80"
                    alt="Innovative materials"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold">Innovative Materials</h3>
                  <p className="text-muted-foreground">
                    We stay at the forefront of material innovation, exploring new composites, recycled materials, and bio-based alternatives. We carefully evaluate these materials for performance, sustainability, and aesthetic potential.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Recycled composites
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Bio-based polymers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Smart glass
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Phase-change materials
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Climate Responsive Materials */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Climate-Responsive Material Selection</h2>
            <p className="text-lg text-muted-foreground">
              In South Africa&apos;s diverse climate zones, material selection plays a crucial role in creating comfortable, energy-efficient buildings. Our approach is tailored to each project&apos;s specific microclimate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Sun className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Solar Response</h3>
                </div>
                <p className="text-muted-foreground">
                  We carefully select materials based on their thermal mass, reflectivity, and insulation properties to manage solar gain and create comfortable interior environments.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• High thermal mass for temperature stability</li>
                  <li>• Cool roofing materials in hot regions</li>
                  <li>• Strategic use of glazing with appropriate coatings</li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Wind className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Ventilation & Airflow</h3>
                </div>
                <p className="text-muted-foreground">
                  We incorporate materials and assemblies that facilitate natural ventilation and manage airflow to enhance comfort and reduce energy consumption.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Breathable wall assemblies</li>
                  <li>• Permeable paving for microclimate management</li>
                  <li>• Materials that reduce wind tunneling effects</li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Droplets className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Moisture Management</h3>
                </div>
                <p className="text-muted-foreground">
                  We select materials that appropriately respond to local humidity levels and rainfall patterns, ensuring durability and indoor air quality.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Water-resistant cladding in coastal areas</li>
                  <li>• Vapor-permeable materials in humid regions</li>
                  <li>• Mold-resistant finishes where appropriate</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Material Sourcing */}
          <div className="bg-secondary p-8 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-6">Local Material Sourcing</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  We prioritize locally sourced materials whenever possible, supporting regional economies and reducing transportation-related carbon emissions. This approach also helps our buildings connect more authentically to their surroundings.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our extensive network of South African suppliers, artisans, and manufacturers allows us to specify materials that are both locally appropriate and of the highest quality.
                </p>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80"
                  alt="Local stone quarry"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Material-Focused Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                    alt="Timber residence"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">View Project</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Cape Timber Residence</h3>
                <p className="text-muted-foreground">
                  A home celebrating local timber species through exposed structural elements and fine joinery details.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                    alt="Rammed earth community center"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">View Project</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Karoo Community Center</h3>
                <p className="text-muted-foreground">
                  A public building utilizing rammed earth construction to create thermal comfort and visual connection to the landscape.
                </p>
              </div>
              <div className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
                    alt="Recycled materials pavilion"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">View Project</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Upcycled Urban Pavilion</h3>
                <p className="text-muted-foreground">
                  An experimental structure showcasing innovative uses of recycled materials from Johannesburg&apos;s urban waste stream.
                </p>
              </div>
            </div>
          </div>

          {/* Material Library */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Material Library</h2>
            <p className="text-lg text-muted-foreground">
              We maintain an extensive physical material library in our studio, allowing clients to experience materials firsthand—their weight, texture, color, and acoustic properties. This tangible approach to material selection leads to more informed decisions and better outcomes.
            </p>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80"
                alt="Material library"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
