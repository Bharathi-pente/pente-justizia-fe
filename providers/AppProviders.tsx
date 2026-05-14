'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { QueryProvider } from './QueryProvider';

const KeycloakProvider = dynamic(
  () => import('./KeycloakProvider').then((mod) => mod.KeycloakProvider),
  { ssr: false }
);

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <KeycloakProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </KeycloakProvider>
  );
}
