"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ProjectImage {
  id: string;
  url: string;
  alt?: string;
}

interface ProjectGalleryProps {
  images: ProjectImage[];
  mainImage?: string;
  title: string;
}

export default function ProjectGallery({ images, mainImage, title }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  // Combine main image with gallery images
  useEffect(() => {
    const imageUrls: string[] = [];
    if (mainImage) {
      imageUrls.push(mainImage);
    }
    images.forEach(img => {
      if (!imageUrls.includes(img.url)) {
        imageUrls.push(img.url);
      }
    });
    setAllImages(imageUrls);
  }, [images, mainImage]);

  // Track which images are in viewport for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleImages(prev => {
              if (prev.includes(index)) return prev;
              return [...prev, index];
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' } // Start loading images when they're 200px from viewport
    );

    // Observe all gallery image containers
    setTimeout(() => {
      document.querySelectorAll('.gallery-image-container').forEach(img => {
        observer.observe(img);
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [images.length]);

  // Set images as loaded after a short delay to prevent layout shifts
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const openGallery = useCallback((index: number) => {
    setCurrentIndex(index);
    setOpen(true);
    // Prevent scrolling when gallery is open
    document.body.style.overflow = 'hidden';
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          setOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleNext, handlePrevious]);

  return (
    <>
      {/* Main Image */}
      {mainImage && (
        <div
          className="relative h-[60vh] rounded-lg overflow-hidden cursor-pointer mb-6"
          onClick={() => openGallery(0)}
        >
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHXG8NQQAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] gallery-image-container"
              onClick={() => openGallery(mainImage ? index + 1 : index)}
              data-index={index}
            >
              {(visibleImages.includes(index) || index < 8) && ( // Always load first 8 images immediately
                <Image
                  src={image.url}
                  alt={image.alt || ''}
                  fill
                  className={`object-cover ${imagesLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                  loading={index < 4 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHXG8NQQAAAABJRU5ErkJggg=="
                />
              )}
              {(!visibleImages.includes(index) && index >= 8) && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Gallery Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 z-50 text-white hover:bg-white/20 h-12 w-12"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 z-50 text-white hover:bg-white/20 h-12 w-12"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Current image */}
            {allImages[currentIndex] && (
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  src={allImages[currentIndex]}
                  alt={`Gallery image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  quality={90}
                  priority
                  sizes="100vw"
                />
              </div>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
