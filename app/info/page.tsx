import Image from 'next/image';

export default function InfoPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">Our Philosophy</h1>
            <p className="text-lg text-muted-foreground">
              At Michael Hart Architects, we believe that architecture is more than just buildings – it&apos;s about creating spaces that inspire, connect, and endure. With over three decades of experience, we&apos;ve developed a deep understanding of how thoughtful design can transform communities and enhance lives.
            </p>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Approach</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Sustainable design practices</li>
                <li>• Community-focused development</li>
                <li>• Integration of heritage and modern elements</li>
                <li>• Innovative use of materials and space</li>
              </ul>
            </div>
          </div>
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80"
              alt="Architectural design process"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}