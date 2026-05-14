'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, role } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Redirect based on role
    if (role?.startsWith('hq_')) {
      router.push('/hq');
    } else if (role?.startsWith('cell_')) {
      router.push('/cell');
    } else if (role === 'funder') {
      router.push('/funder');
    } else if (role === 'insurer') {
      router.push('/insurer');
    } else {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, role, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-navy-900">Justizia</h1>
        <p className="text-muted-foreground mt-2">Loading...</p>
      </div>
    </div>
  );
}
