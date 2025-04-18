"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { cachedData } from '@/lib/cached-data';
import type { Project, Category } from '@/lib/mysql';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Tabs components removed as they're not used in this file
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Filter, X, Calendar, SlidersHorizontal } from 'lucide-react';

// Number of projects per page
const ITEMS_PER_PAGE = 9;

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State for data
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Get current URL params
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const query = searchParams.get('q') || '';

  // Update state from URL params when they change
  useEffect(() => {
    setCurrentPage(page);
    setCategoryFilter(category);
    setSortOrder(sort);
    setSearchQuery(query);
  }, [page, category, sort, query]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch projects and categories
        const projectsData = await cachedData.getProjects();
        const categoriesData = await cachedData.getCategories();

        // Only show published projects
        const publishedProjects = projectsData.filter(project => project.published);

        setAllProjects(publishedProjects);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    if (allProjects.length === 0) return;

    let result = [...allProjects];

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(project => project.category_id === categoryFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project =>
        project.title.toLowerCase().includes(query) ||
        (project.description && project.description.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortOrder === 'a-z') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'z-a') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProjects(result);
  }, [allProjects, categoryFilter, searchQuery, sortOrder]);

  // Helper function to get category name from category ID
  const getCategoryName = (categoryId: string | null | undefined) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  // Helper function to get category slug from category ID
  const getCategorySlug = (categoryId: string | null | undefined) => {
    if (!categoryId) return '';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.slug : '';
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Update URL with current filters
  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (sortOrder !== 'newest') params.set('sort', sortOrder);
    if (searchQuery) params.set('q', searchQuery);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl, { scroll: false });
  }, [currentPage, categoryFilter, sortOrder, searchQuery, router]);

  // Handle filter changes
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when search changes
    updateUrlParams();
  };

  const clearFilters = () => {
    setCategoryFilter('all');
    setSortOrder('newest');
    setSearchQuery('');
    setCurrentPage(1);
    router.push('/projects');
  };

  // Update URL when filters change
  useEffect(() => {
    updateUrlParams();
  }, [currentPage, categoryFilter, sortOrder, searchQuery, updateUrlParams]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="text-xl text-muted-foreground">
            Explore our complete portfolio of architectural and urban design projects
          </p>
        </div>

        {/* Filters and Search */}
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button type="submit">Search</Button>
          </form>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select value={sortOrder} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(categoryFilter !== 'all' || sortOrder !== 'newest' || searchQuery) && (
              <Button variant="outline" onClick={clearFilters} className="ml-auto">
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
          </div>
        </div>

        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="aspect-video rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          // Projects grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No projects found</p>
              </div>
            ) : (
              paginatedProjects.map((project) => {
                const categorySlug = getCategorySlug(project.category_id);
                return (
                  <Link
                    key={project.id}
                    href={`/portfolio/${categorySlug}/${project.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={project.main_image_url || '/images/placeholder.svg'}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 text-white">
                          <h2 className="text-xl font-semibold">{project.title}</h2>
                          <p className="text-sm">{project.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium">{project.title}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">{getCategoryName(project.category_id)}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(project.created_at)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                  />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                // Show first page, last page, current page, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={pageNumber === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                // Show ellipsis for gaps
                if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return null;
              })}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
