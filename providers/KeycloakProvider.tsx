'use client';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '@/lib/keycloak';
import { ReactNode } from 'react';

interface KeycloakProviderProps {
  children: ReactNode;
}

export function KeycloakProvider({ children }: KeycloakProviderProps) {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: typeof window !== 'undefined' 
          ? `${window.location.origin}/silent-check-sso.html` 
          : undefined,
        pkceMethod: 'S256',
      }}
      LoadingComponent={<div className="flex items-center justify-center h-screen">
        <div className="text-navy-900">Loading...</div>
      </div>}
    >
      {children}
    </ReactKeycloakProvider>
  );
}
