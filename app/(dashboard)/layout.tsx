'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/auth.store';
import { DashboardShell } from '@/components/layout/DashboardShell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const { isAuthenticated: storeAuthenticated } = useAuthStore();
  const router = useRouter();

  // Check both Keycloak state and auth store
  const userIsAuthenticated = isAuthenticated || storeAuthenticated;

  console.log('Dashboard Layout - Auth check:', { 
    isAuthenticated, 
    storeAuthenticated, 
    userIsAuthenticated, 
    isLoading 
  });

  useEffect(() => {
    if (!isLoading && !userIsAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      router.push('/login');
    } else if (userIsAuthenticated) {
      console.log('User is authenticated, showing dashboard');
    }
  }, [userIsAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!userIsAuthenticated) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
