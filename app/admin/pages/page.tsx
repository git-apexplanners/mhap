"use client";

import { useEffect, useState, useCallback } from 'react';
// import Link from 'next/link'; // Not used in this component
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cachedData } from '@/lib/cached-data';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  FileText,
  ExternalLink,
  Loader2,
  Search,
  X,
  Filter,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Page {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  featured_image: string | null;
  published: boolean;
  page_type: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export default function PagesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [publishedFilter, setPublishedFilter] = useState<boolean | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPages = await cachedData.getPages();
      // Sort pages by title
      fetchedPages.sort((a, b) => a.title.localeCompare(b.title));

      // Convert the fetched pages to the local Page type
      const convertedPages: Page[] = fetchedPages.map(page => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
        description: page.description || null,
        featured_image: page.featured_image || null,
        published: page.published,
        page_type: page.page_type || 'standard',
        parent_id: page.parent_id || null,
        created_at: page.created_at,
        updated_at: page.updated_at || page.created_at
      }));

      setPages(convertedPages);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch pages';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleDeletePage = (page: Page) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePage = async () => {
    if (!pageToDelete) return;

    setLoading(true);
    try {
      // Delete the page via API
      const response = await fetch(`/api/pages/${pageToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete page');
      }

      // Clear the page cache
      cachedData.clearPageCache();

      toast({
        title: "Success",
        description: "Page deleted successfully",
      });

      fetchPages();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete page';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  const getPageTypeName = (type: string) => {
    switch (type) {
      case 'standard': return 'Standard Page';
      case 'landing': return 'Landing Page';
      case 'contact': return 'Contact Page';
      case 'about': return 'About Page';
      default: return type;
    }
  };

  const getParentPageName = (parentId: string | null) => {
    if (!parentId) return 'None';
    const parent = pages.find(p => p.id === parentId);
    return parent ? parent.title : 'Unknown';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredPages = pages.filter(page => {
    // Apply search filter
    const matchesSearch = searchQuery === '' ||
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (page.description && page.description.toLowerCase().includes(searchQuery.toLowerCase()));

    // Apply published filter
    const matchesPublished = publishedFilter === null || page.published === publishedFilter;

    return matchesSearch && matchesPublished;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setPublishedFilter(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pages</h1>
        <Button onClick={() => router.push('/admin/pages/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Page
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {publishedFilter === true ? <Eye className="h-4 w-4 mr-2" /> :
                publishedFilter === false ? <Eye className="h-4 w-4 mr-2 text-muted-foreground" /> :
                  <Filter className="h-4 w-4 mr-2" />}
              Status
              {publishedFilter !== null && <span className="ml-1 text-xs bg-primary/20 px-1 rounded">1</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setPublishedFilter(null)}
              className={publishedFilter === null ? "bg-primary/10" : ""}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setPublishedFilter(true)}
              className={publishedFilter === true ? "bg-primary/10" : ""}
            >
              <Eye className="h-4 w-4 mr-2" />
              Published
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setPublishedFilter(false)}
              className={publishedFilter === false ? "bg-primary/10" : ""}
            >
              <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
              Draft
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {(searchQuery || publishedFilter !== null) && (
          <Button variant="ghost" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    {pages.length === 0
                      ? "No pages found. Create your first page to get started."
                      : "No pages match your filters."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div className="relative h-10 w-16 rounded overflow-hidden">
                        {page.featured_image ? (
                          <Image
                            src={page.featured_image}
                            alt={page.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-muted flex items-center justify-center">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>{getPageTypeName(page.page_type)}</TableCell>
                    <TableCell>
                      {page.published ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Draft
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{getParentPageName(page.parent_id)}</TableCell>
                    <TableCell>{formatDate(page.updated_at || page.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => router.push(`/admin/pages/${page.id}`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Page
                          </DropdownMenuItem>
                          {page.published && (
                            <DropdownMenuItem
                              onClick={() => {
                                window.open(`/pages/${page.slug}`, '_blank');
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Live
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeletePage(page)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the page &quot;{pageToDelete?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeletePage} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
