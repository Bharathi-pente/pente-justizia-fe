'use client';

import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';
import { AuthUser, UserRole, JwtPayload } from '@/types/auth.types';
import { useAuthStore } from '@/store/auth.store';

export function useAuth() {
  const { keycloak, initialized } = useKeycloak();
  const { user, isAuthenticated, setUser, setToken, setAuthenticated, logout: storeLogout } = useAuthStore();
  const [hasRestoredFromStorage, setHasRestoredFromStorage] = useState(false);

  // Restore authentication from localStorage on initial load
  useEffect(() => {
    if (!initialized || hasRestoredFromStorage) return;

    const storedToken = localStorage.getItem('kc_token');
    const storedRefreshToken = localStorage.getItem('kc_refreshToken');
    const storedIdToken = localStorage.getItem('kc_idToken');

    console.log('Checking for stored tokens:', { 
      hasToken: !!storedToken, 
      hasRefreshToken: !!storedRefreshToken,
      hasIdToken: !!storedIdToken 
    });

    if (storedToken && storedRefreshToken) {
      try {
        // Validate JWT format
        const parts = storedToken.split('.');
        if (parts.length === 3) {
          // Parse the token
          const tokenParsed = JSON.parse(atob(parts[1])) as JwtPayload;
          
          // Check if token is expired
          const now = Math.floor(Date.now() / 1000);
          if (tokenParsed.exp && tokenParsed.exp > now) {
            console.log('Restoring valid token from localStorage');
            
            // Set tokens in Keycloak instance
            keycloak.token = storedToken;
            keycloak.refreshToken = storedRefreshToken;
            if (storedIdToken) {
              keycloak.idToken = storedIdToken;
            }
            keycloak.tokenParsed = tokenParsed;
            keycloak.authenticated = true;

            // Extract role and create auth user
            const roles = tokenParsed.realm_access?.roles || [];
            const userRole = roles.find((role) => 
              Object.values(UserRole).includes(role as UserRole)
            ) as UserRole || UserRole.CELL_PARALEGAL;

            const authUser: AuthUser = {
              id: tokenParsed.sub,
              email: tokenParsed.email,
              name: tokenParsed.name || tokenParsed.preferred_username || tokenParsed.email,
              role: userRole,
              cellId: tokenParsed.cell_id,
              fundedCellIds: tokenParsed.funded_cell_ids,
            };

            console.log('Restored auth user from localStorage:', authUser);
            setUser(authUser);
            setToken(storedToken);
            setAuthenticated(true);
          } else {
            console.log('Stored token is expired, clearing localStorage');
            localStorage.removeItem('kc_token');
            localStorage.removeItem('kc_refreshToken');
            localStorage.removeItem('kc_idToken');
          }
        }
      } catch (error) {
        console.error('Error restoring token from localStorage:', error);
        localStorage.removeItem('kc_token');
        localStorage.removeItem('kc_refreshToken');
        localStorage.removeItem('kc_idToken');
      }
    }

    setHasRestoredFromStorage(true);
  }, [initialized, hasRestoredFromStorage, keycloak, setUser, setToken, setAuthenticated]);

  // Update auth state when Keycloak state changes
  useEffect(() => {
    if (!initialized || !hasRestoredFromStorage) return;

    console.log('useAuth effect triggered:', { 
      initialized, 
      authenticated: keycloak.authenticated, 
      hasToken: !!keycloak.token,
      hasParsedToken: !!keycloak.tokenParsed 
    });

    if (keycloak.authenticated && keycloak.token && keycloak.tokenParsed) {
      const tokenParsed = keycloak.tokenParsed as JwtPayload;
      
      console.log('useAuth - Token parsed:', {
        sub: tokenParsed.sub,
        email: tokenParsed.email,
        name: tokenParsed.name,
        realm_access: tokenParsed.realm_access,
        cell_id: tokenParsed.cell_id,
      });
      
      // Extract role from realm_access.roles
      const roles = tokenParsed.realm_access?.roles || [];
      console.log('Available roles in token:', roles);
      
      const userRole = roles.find((role) => 
        Object.values(UserRole).includes(role as UserRole)
      ) as UserRole || UserRole.CELL_PARALEGAL;
      
      console.log('Extracted user role:', userRole);

      const authUser: AuthUser = {
        id: tokenParsed.sub,
        email: tokenParsed.email,
        name: tokenParsed.name || tokenParsed.preferred_username || tokenParsed.email,
        role: userRole,
        cellId: tokenParsed.cell_id,
        fundedCellIds: tokenParsed.funded_cell_ids,
      };

      console.log('Setting auth user:', authUser);
      setUser(authUser);
      setToken(keycloak.token || null);
      setAuthenticated(true);
    } else if (!keycloak.authenticated) {
      console.log('useAuth - Not authenticated, clearing state');
      setUser(null);
      setToken(null);
      setAuthenticated(false);
    }
  }, [initialized, hasRestoredFromStorage, keycloak.authenticated, keycloak.token, keycloak.tokenParsed, setUser, setToken, setAuthenticated]);

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('kc_token');
    localStorage.removeItem('kc_refreshToken');
    localStorage.removeItem('kc_idToken');
    
    storeLogout();
    keycloak.logout();
  };

  return {
    user,
    role: user?.role,
    cellId: user?.cellId,
    fundedCellIds: user?.fundedCellIds,
    isAuthenticated: (initialized && hasRestoredFromStorage) ? (keycloak.authenticated || isAuthenticated) : false,
    isLoading: !initialized || !hasRestoredFromStorage,
    logout,
    keycloak,
  };
}
