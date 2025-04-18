import { ResilientImage } from '@/components/ui/resilient-image';
import FeaturedProjects from '@/components/featured-projects';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative h-[70vh]">
        <ResilientImage
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80"
          alt="Modern architecture"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          fallbackSrc="/images/placeholder.svg"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Michael Hart Architects</h1>
            <p className="text-xl font-light">33+ Years of Architectural Excellence</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Architecture</h2>
            <p className="text-muted-foreground">
              Creating spaces that inspire, function, and endure through innovative design and sustainable practices.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Urban Design</h2>
            <p className="text-muted-foreground">
              Shaping communities through thoughtful urban planning and sustainable development strategies.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Heritage</h2>
            <p className="text-muted-foreground">
              Preserving cultural heritage while adapting spaces for contemporary needs and future generations.
            </p>
          </div>
        </div>

        {/* Featured Projects */}
        <FeaturedProjects />
      </div>
    </div>
  );
}