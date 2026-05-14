'use client';

import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { AuthUser, UserRole, JwtPayload } from '@/types/auth.types';
import { useAuthStore } from '@/store/auth.store';

export function useAuth() {
  const { keycloak, initialized } = useKeycloak();
  const { user, isAuthenticated, setUser, setToken, setAuthenticated, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    console.log('useAuth effect triggered:', { 
      initialized, 
      authenticated: keycloak.authenticated, 
      hasToken: !!keycloak.token,
      hasParsedToken: !!keycloak.tokenParsed 
    });

    if (initialized && keycloak.authenticated && keycloak.token) {
      // If tokenParsed is not available, try to access it via keycloak object
      const tokenParsed = keycloak.tokenParsed as JwtPayload;
      
      if (!tokenParsed) {
        console.error('useAuth - Token parsed is not available!');
        return;
      }
      
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
    } else if (initialized && !keycloak.authenticated) {
      console.log('useAuth - Not authenticated');
      setUser(null);
      setToken(null);
      setAuthenticated(false);
    }
  }, [initialized, keycloak.authenticated, keycloak.token, keycloak.tokenParsed, setUser, setToken, setAuthenticated]);

  const logout = () => {
    storeLogout();
    keycloak.logout();
  };

  return {
    user,
    role: user?.role,
    cellId: user?.cellId,
    fundedCellIds: user?.fundedCellIds,
    // Use keycloak.authenticated directly to avoid race condition
    isAuthenticated: initialized && keycloak.authenticated,
    isLoading: !initialized,
    logout,
    keycloak,
  };
}
