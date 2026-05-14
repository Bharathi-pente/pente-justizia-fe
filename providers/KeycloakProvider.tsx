'use client';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '@/lib/keycloak';
import { ReactNode } from 'react';

interface KeycloakProviderProps {
  children: ReactNode;
}

export function KeycloakProvider({ children }: KeycloakProviderProps) {
  const handleKeycloakEvent = (event: string) => {
    console.log('Keycloak event:', event);
    
    if (event === 'onAuthLogout') {
      // Clear stored tokens on logout
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kc_token');
        localStorage.removeItem('kc_refreshToken');
        localStorage.removeItem('kc_idToken');
      }
    }
  };

  const handleKeycloakTokens = (tokens: any) => {
    console.log('Keycloak tokens updated');
    // Update localStorage when tokens refresh
    if (tokens?.token && typeof window !== 'undefined') {
      localStorage.setItem('kc_token', tokens.token);
      if (tokens.refreshToken) {
        localStorage.setItem('kc_refreshToken', tokens.refreshToken);
      }
      if (tokens.idToken) {
        localStorage.setItem('kc_idToken', tokens.idToken);
      }
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: typeof window !== 'undefined' 
          ? `${window.location.origin}/silent-check-sso.html` 
          : undefined,
        pkceMethod: 'S256',
        // Don't check login iframe since we're using custom login
        checkLoginIframe: false,
      }}
      onEvent={handleKeycloakEvent}
      onTokens={handleKeycloakTokens}
      LoadingComponent={<div className="flex items-center justify-center h-screen">
        <div className="text-navy-900">Loading...</div>
      </div>}
    >
      {children}
    </ReactKeycloakProvider>
  );
}
