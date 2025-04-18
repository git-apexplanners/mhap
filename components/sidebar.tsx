"use client";

import { useState } from 'react';
// import Link from 'next/link'; // Not used in this component
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation, NavItem } from '@/lib/navigation-context';



const NavItemComponent = ({ item, isExpanded, level = 0 }: { item: NavItem; isExpanded: boolean; level?: number }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const isActiveParent = pathname?.startsWith(item.href + '/') ||
    (item.children?.some((child: NavItem) =>
      pathname === child.href || pathname?.startsWith(child.href + '/')));
  const hasChildren = item.children && item.children.length > 0;

  // Auto-expand if this item or any child is active
  const [isOpen, setIsOpen] = useState(isActive || isActiveParent);

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors',
          isActive ? 'bg-primary text-primary-foreground' :
            isActiveParent ? 'bg-primary/10 text-primary' : 'hover:bg-secondary',
          level > 0 && 'ml-4'
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {item.icon && <item.icon className="h-5 w-5" />}
        {isExpanded && (
          <>
            <span className="flex-1">{item.name}</span>
            {hasChildren && (
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform',
                  isOpen && 'transform rotate-90'
                )}
              />
            )}
          </>
        )}
      </div>
      {isOpen && isExpanded && hasChildren && (
        <div className="mt-1">
          {item.children.map((child: NavItem, index: number) => (
            <NavItemComponent
              key={child.name + index}
              item={child}
              isExpanded={isExpanded}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function Sidebar() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false); // Start collapsed
  const { navigationItems } = useNavigation();

  // We don't need to refresh navigation here since it's already refreshed in the NavigationProvider

  // Handle mouse enter/leave for auto-expand/collapse
  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={cn(
        'h-screen sticky top-0 bg-card border-r transition-all duration-300 p-4 flex flex-col gap-4',
        isExpanded ? 'w-60' : 'w-[72px]'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between">
        {isExpanded && (
          <h1 className="font-semibold text-lg">Michael Hart</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering mouse events
            setIsExpanded(!isExpanded);
          }}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavItemComponent
            key={item.name}
            item={item}
            isExpanded={isExpanded}
          />
        ))}
      </nav>

      {/* Settings button */}
      <div className="pt-4 border-t">
        <Button
          variant="ghost"
          size="icon"
          className="w-full flex justify-center"
          onClick={() => router.push('/admin')}
          title="Admin Dashboard"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}