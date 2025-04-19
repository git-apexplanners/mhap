"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { helpContent } from '@/lib/help-content';

export function HelpPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<{ title: string; content: React.ReactNode }>({
    title: 'Help',
    content: <p>Select a section to view help content.</p>
  });
  const pathname = usePathname();

  // Update content based on current path
  useEffect(() => {
    if (!pathname) return;

    // Extract the relevant part of the path for matching
    const path = pathname.split('/').filter(Boolean);

    // Start with admin
    if (path[0] === 'admin') {
      // Default admin help
      let newContent = helpContent.admin;

      // Check for specific section
      if (path.length > 1) {
        const section = path[1];
        if (section in helpContent) {
          newContent = helpContent[section];

          // Check for subsections
          if (path.length > 2 && section in helpContent && 'subsections' in helpContent[section]) {
            const subsection = path[2];
            const sectionContent = helpContent[section];

            // Type guard to ensure subsections exists
            if ('subsections' in sectionContent &&
                sectionContent.subsections &&
                subsection in sectionContent.subsections) {
              newContent = sectionContent.subsections[subsection];
            }
          }
        }
      }

      setContent(newContent);
    }
  }, [pathname]);

  return (
    <>
      {/* Help Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 rounded-full w-10 h-10 bg-black text-white hover:bg-black/90 shadow-lg animate-pulse-slow"
        onClick={() => setIsOpen(true)}
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      {/* Help Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">{content.title}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-6">
              <div className="prose prose-slate max-w-none">
                {content.content}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
}
