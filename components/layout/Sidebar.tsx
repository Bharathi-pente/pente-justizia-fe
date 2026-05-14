'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth.types';
import { 
  LayoutDashboard, 
  Building2, 
  ClipboardCheck, 
  DollarSign, 
  Shield, 
  Users,
  Gavel,
  X
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'HQ Overview',
    href: '/hq',
    icon: LayoutDashboard,
    roles: [UserRole.HQ_ADMIN, UserRole.HQ_COMPLIANCE, UserRole.HQ_BDM],
  },
  {
    label: 'My Cell',
    href: '/cell',
    icon: Building2,
    roles: [UserRole.CELL_ADMIN, UserRole.CELL_SOLICITOR, UserRole.CELL_PARALEGAL],
  },
  {
    label: 'Compliance',
    href: '/compliance',
    icon: ClipboardCheck,
    roles: [UserRole.HQ_ADMIN, UserRole.HQ_COMPLIANCE],
  },
  {
    label: 'Funder View',
    href: '/funder',
    icon: DollarSign,
    roles: [UserRole.FUNDER, UserRole.HQ_ADMIN],
  },
  {
    label: 'Insurer View',
    href: '/insurer',
    icon: Shield,
    roles: [UserRole.INSURER, UserRole.HQ_ADMIN],
  },
  {
    label: 'User Management',
    href: '/hq/users',
    icon: Users,
    roles: [UserRole.HQ_ADMIN],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role, cellId } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  // Filter nav items based on user role
  const filteredNavItems = NAV_ITEMS.filter(item => 
    role && item.roles.includes(role)
  );

  // Replace [cellId] placeholder with actual cellId
  const getHref = (href: string) => {
    if (href.includes('[cellId]') && cellId) {
      return href.replace('[cellId]', cellId);
    }
    return href;
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r bg-navy-900 text-white transition-transform md:sticky md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <Gavel className="h-6 w-6" />
              <span className="text-xl font-bold">Justizia</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-navy-800"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Separator className="bg-navy-700" />

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const href = getHref(item.href);
              const isActive = pathname === href || pathname?.startsWith(href + '/');

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white text-navy-900"
                      : "text-navy-100 hover:bg-navy-800 hover:text-white"
                  )}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4">
            <Separator className="mb-4 bg-navy-700" />
            <p className="text-xs text-navy-400">
              © 2026 Justizia Legal Operations
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
