import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold">Michael Hart</h1>
            <p className="text-xl text-muted-foreground">
              With over 33 years of experience in architectural design and urban planning, Michael Hart has established himself as a leading figure in sustainable and community-focused architecture.
            </p>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Professional Journey</h2>
              <p className="text-muted-foreground">
                Starting his career in 1990, Michael has led numerous landmark projects across residential, commercial, and public sectors. His work is characterized by a unique blend of functionality, sustainability, and aesthetic excellence.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Education & Credentials</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Master of Architecture, University of Cape Town</li>
                <li>• Registered Architect, SACAP</li>
                <li>• Green Building Council SA Member</li>
                <li>• Urban Design Institute of South Africa Fellow</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                alt="Michael Hart"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Areas of Expertise</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Sustainable Architecture</li>
                <li>• Urban Planning</li>
                <li>• Heritage Conservation</li>
                <li>• Community Development</li>
                <li>• Residential Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}