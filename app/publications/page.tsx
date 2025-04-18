import { BookOpen, Newspaper, Presentation as PresentationScreen } from 'lucide-react';

export default function PublicationsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Publications & Exhibitions</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Published Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">
                  Sustainable Urban Development in Africa
                </h3>
                <p className="text-muted-foreground mb-4">
                  Published in Architecture SA, 2023
                </p>
                <p className="text-sm text-muted-foreground">
                  A comprehensive study of sustainable urban development practices in African cities.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">
                  Heritage Conservation in Modern Cities
                </h3>
                <p className="text-muted-foreground mb-4">
                  Journal of Architecture, 2022
                </p>
                <p className="text-sm text-muted-foreground">
                  Exploring the balance between preservation and progress in urban development.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <PresentationScreen className="h-6 w-6" />
              Exhibitions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">
                  Future Cities Exhibition
                </h3>
                <p className="text-muted-foreground mb-4">
                  Cape Town Design Week, 2023
                </p>
                <p className="text-sm text-muted-foreground">
                  Showcasing innovative urban design solutions for sustainable city development.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">
                  Architectural Heritage Showcase
                </h3>
                <p className="text-muted-foreground mb-4">
                  Johannesburg Art Gallery, 2022
                </p>
                <p className="text-sm text-muted-foreground">
                  Exhibition of heritage conservation projects and their impact on communities.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Newspaper className="h-6 w-6" />
              Media Coverage
            </h2>
            <div className="bg-card p-6 rounded-lg border">
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">Cape Times</p>
                  <p className="text-muted-foreground">
                    &quot;Revolutionizing Urban Spaces: Michael Hart&apos;s Vision for Sustainable Cities&quot;
                  </p>
                </li>
                <li>
                  <p className="font-semibold">Architecture Digest</p>
                  <p className="text-muted-foreground">
                    &quot;The Future of Heritage Conservation in South Africa&quot;
                  </p>
                </li>
                <li>
                  <p className="font-semibold">Design Quarterly</p>
                  <p className="text-muted-foreground">
                    &quot;Innovation Meets Tradition: The Michael Hart Approach&quot;
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}