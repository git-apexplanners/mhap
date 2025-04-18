"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FolderKanban, Users, Tag, LogOut, FileText } from 'lucide-react';
import { useAuth, AuthProvider } from '@/lib/auth-context';
import { HelpPanel } from '@/components/admin/help-panel';
import { cn } from '@/lib/utils';

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, userName, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // Short delay to allow for animation to be visible
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isSliding) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router, isSliding]);

  const handleSignOut = () => {
    setIsSliding(true);

    // Delay logout and navigation to allow animation to complete
    setTimeout(() => {
      logout();
      router.push('/admin/login');
    }, 500); // Match this with the animation duration
  };

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  // Don't render anything if not authenticated (except on login page)
  if (!isAuthenticated && pathname !== '/admin/login' && !isSliding) {
    return null;
  }

  // Only render login page content if on login page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="flex">
        <nav className={cn(
          "w-64 min-h-screen bg-card border-r p-4 flex flex-col transition-all duration-500",
          isLoading ? "translate-x-[-100%]" : "translate-x-0",
          isSliding ? "animate-slide-out-left" : isLoading ? "" : "animate-slide-in-left"
        )}>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            </div>

            <div className="space-y-1">
              <Button
                variant={isActive('/admin') && pathname === '/admin' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>

              <Button
                variant={pathname?.startsWith('/admin/projects') ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href="/admin/projects">
                  <FolderKanban className="mr-2 h-4 w-4" />
                  Projects
                </Link>
              </Button>

              <Button
                variant={pathname?.startsWith('/admin/pages') ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href="/admin/pages">
                  <FileText className="mr-2 h-4 w-4" />
                  Pages
                </Link>
              </Button>

              <Button
                variant={pathname?.startsWith('/admin/categories') ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href="/admin/categories">
                  <Tag className="mr-2 h-4 w-4" />
                  Categories
                </Link>
              </Button>

              <Button
                variant={pathname?.startsWith('/admin/users') ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Link>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{userName}</span>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </nav>
        <main className={cn(
          "flex-1 p-8 overflow-auto relative transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}>
          {children}
          {isAuthenticated && !isSliding && <HelpPanel />}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AuthProvider>
  );
}