'use client';

import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gavel, Loader2 } from 'lucide-react';
import { UserRole, JwtPayload } from '@/types/auth.types';
import { useAuthStore } from '@/store/auth.store';

export default function LoginPage() {
  const { keycloak, initialized } = useKeycloak();
  const router = useRouter();
  const { setUser, setToken, setAuthenticated } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialized && keycloak.authenticated && keycloak.tokenParsed) {
      console.log('User is authenticated, extracting role and redirecting');
      
      const tokenParsed = keycloak.tokenParsed as JwtPayload;
      const roles = tokenParsed.realm_access?.roles || [];
      
      const userRole = roles.find((role) => 
        Object.values(UserRole).includes(role as UserRole)
      ) as UserRole;
      
      // Redirect based on role
      if (userRole?.startsWith('hq_')) {
        router.replace('/hq');
      } else if (userRole?.startsWith('cell_')) {
        router.replace('/cell');
      } else if (userRole === 'funder') {
        router.replace('/funder');
      } else if (userRole === 'insurer') {
        router.replace('/insurer');
      } else {
        router.replace('/');
      }
    }
  }, [initialized, keycloak.authenticated, keycloak.tokenParsed, keycloak.token, router]);

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Clear any existing tokens first
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kc_token');
      localStorage.removeItem('kc_refreshToken');
      localStorage.removeItem('kc_idToken');
      console.log('Cleared old tokens from localStorage');
    }

    try {
      const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
      const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
      const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;

      const response = await fetch(
        `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'password',
            client_id: clientId || '',
            username: username,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || 'Login failed');
      }

      const data = await response.json();

      // Validate that we received proper tokens
      if (!data.access_token || !data.refresh_token || !data.id_token) {
        throw new Error('Invalid token response from server');
      }

      // Validate JWT format
      const isValidJWT = (token: string) => {
        const parts = token.split('.');
        return parts.length === 3 && parts.every(part => part.length > 0);
      };

      if (!isValidJWT(data.access_token) || !isValidJWT(data.refresh_token) || !isValidJWT(data.id_token)) {
        throw new Error('Received malformed tokens from server');
      }

      // Parse the token to get user role
      const tokenParsed = JSON.parse(atob(data.access_token.split('.')[1])) as JwtPayload;
      console.log('Token parsed:', tokenParsed);

      // Manually set the token in Keycloak instance
      keycloak.token = data.access_token;
      keycloak.refreshToken = data.refresh_token;
      keycloak.idToken = data.id_token;
      keycloak.tokenParsed = tokenParsed;
      keycloak.authenticated = true;

      // Store tokens in localStorage for persistence across page reloads
      if (typeof window !== 'undefined') {
        localStorage.setItem('kc_token', data.access_token);
        localStorage.setItem('kc_refreshToken', data.refresh_token);
        localStorage.setItem('kc_idToken', data.id_token);
      }

      console.log('Custom login successful, tokens set and persisted');

      // Extract role and create auth user
      const roles = tokenParsed.realm_access?.roles || [];
      console.log('User roles:', roles);
      
      const userRole = roles.find((role) => 
        Object.values(UserRole).includes(role as UserRole)
      ) as UserRole;
      
      console.log('Extracted user role:', userRole);

      // IMPORTANT: Update auth store immediately
      const authUser = {
        id: tokenParsed.sub,
        email: tokenParsed.email,
        name: tokenParsed.name || tokenParsed.preferred_username || tokenParsed.email,
        role: userRole,
        cellId: tokenParsed.cell_id,
        fundedCellIds: tokenParsed.funded_cell_ids,
      };

      setUser(authUser);
      setToken(data.access_token);
      setAuthenticated(true);

      console.log('Auth store updated with user:', authUser);

      // Determine redirect URL based on role
      let redirectUrl = '/';
      if (userRole?.startsWith('hq_')) {
        redirectUrl = '/hq';
      } else if (userRole?.startsWith('cell_')) {
        redirectUrl = '/cell';
      } else if (userRole === 'funder') {
        redirectUrl = '/funder';
      } else if (userRole === 'insurer') {
        redirectUrl = '/insurer';
      }

      console.log('Redirecting to:', redirectUrl);

      // Use Next.js router for navigation - no page reload needed
      // The auth store is already updated, dashboard will recognize authentication
      router.replace(redirectUrl);
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
      setLoading(false);
    }
    // Don't set loading to false on success, let redirect happen
  };

  const handleKeycloakLogin = () => {
    keycloak.login();
  };

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Initializing...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-navy-900 to-navy-700 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-navy-900 p-4">
              <Gavel className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Justizia</CardTitle>
          <CardDescription>Legal Operations Intelligence Platform</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Custom Login Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username or Email</Label>
              <Input
                id="username"
                type="text"
                placeholder="xavi.hq or xavi@justizia.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          {/* Alternative: Keycloak Hosted Login */}
          <Button 
            onClick={handleKeycloakLogin} 
            variant="outline" 
            className="w-full"
            disabled={loading}
          >
            Sign in with Keycloak SSO
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Secure authentication powered by Keycloak
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
