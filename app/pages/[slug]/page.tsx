"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { cachedData } from '@/lib/cached-data';
// import { db } from '@/lib/mysql'; // Not used in this component
import { Loader2 } from 'lucide-react';

// Import the Page type from MySQL library
import type { Page } from '@/lib/mysql';

export default function CustomPage() {
  const params = useParams();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get page by slug using cachedData
        const page = await cachedData.getPageBySlug(params.slug as string);

        if (page && page.published) {
          setPage(page);

          // Update page metadata
          if (page.meta_title) {
            document.title = page.meta_title;
          }

          if (page.meta_description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute('content', page.meta_description);
            } else {
              const meta = document.createElement('meta');
              meta.name = 'description';
              meta.content = page.meta_description;
              document.head.appendChild(meta);
            }
          }
        } else {
          setError('Page not found');
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load page';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPage();

      // Set up polling for data updates every 60 seconds
      const pollingInterval = setInterval(() => {
        // Clear cache and refresh data
        cachedData.clearPageCache();
        fetchPage();
      }, 60000); // 60 seconds

      // Cleanup interval on component unmount
      return () => {
        clearInterval(pollingInterval);
      };
    }
  }, [params.slug]); // error is not needed as a dependency since it's only used in a condition

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-muted-foreground">
            The page you are looking for does not exist or is not published.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {page.featured_image && (
          <div className="relative h-[40vh] rounded-lg overflow-hidden">
            <Image
              src={page.featured_image}
              alt={page.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{page.title}</h1>

          {page.description && (
            <p className="text-xl text-muted-foreground">{page.description}</p>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content || '' }}
          />
        </div>
      </div>
    </div>
  );
}
