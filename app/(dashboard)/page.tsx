'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const router = useRouter();
  const { role, isLoading, isAuthenticated, user } = useAuth();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected) {
      return;
    }

    // Debug logging
    console.log('Dashboard redirect check:', { role, isLoading, isAuthenticated, user });

    if (isLoading) {
      console.log('Still loading auth...');
      return;
    }

    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      setHasRedirected(true);
      router.replace('/login');
      return;
    }

    // Wait for role to be extracted from token
    if (!role) {
      console.log('Authenticated but role not yet extracted, waiting...');
      return;
    }

    console.log('Role detected:', role, '- Performing redirect');
    setHasRedirected(true);

    if (role.startsWith('hq_')) {
      console.log('Redirecting to /hq');
      router.replace('/hq');
    } else if (role.startsWith('cell_')) {
      console.log('Redirecting to /cell');
      router.replace('/cell');
    } else if (role === 'funder') {
      console.log('Redirecting to /funder');
      router.replace('/funder');
    } else if (role === 'insurer') {
      console.log('Redirecting to /insurer');
      router.replace('/insurer');
    } else {
      console.log('Unknown role, defaulting to /hq');
      router.replace('/hq');
    }
  }, [role, isLoading, isAuthenticated, user, router, hasRedirected]);

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p>Redirecting...</p>
      <p className="text-sm text-muted-foreground">Role: {role || 'Loading...'}</p>
    </div>
  );
}
