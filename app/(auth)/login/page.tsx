'use client';

import { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gavel } from 'lucide-react';
import { UserRole, JwtPayload } from '@/types/auth.types';

export default function LoginPage() {
  const { keycloak, initialized } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    console.log('Login page - Auth state:', { 
      initialized, 
      authenticated: keycloak.authenticated,
      token: keycloak.token ? 'exists' : 'missing',
      tokenParsed: keycloak.tokenParsed 
    });

    if (initialized && keycloak.authenticated && keycloak.tokenParsed) {
      console.log('User is authenticated, extracting role and redirecting');
      
      const tokenParsed = keycloak.tokenParsed as JwtPayload;
      const roles = tokenParsed.realm_access?.roles || [];
      console.log('Roles in token:', roles);
      
      const userRole = roles.find((role) => 
        Object.values(UserRole).includes(role as UserRole)
      ) as UserRole;
      
      console.log('User role:', userRole);
      
      // Redirect based on role
      if (userRole?.startsWith('hq_')) {
        console.log('Redirecting to /hq');
        router.replace('/hq');
      } else if (userRole?.startsWith('cell_')) {
        console.log('Redirecting to /cell');
        router.replace('/cell');
      } else if (userRole === 'funder') {
        console.log('Redirecting to /funder');
        router.replace('/funder');
      } else if (userRole === 'insurer') {
        console.log('Redirecting to /insurer');
        router.replace('/insurer');
      } else {
        console.log('No specific role, redirecting to dashboard');
        router.replace('/');
      }
    }
  }, [initialized, keycloak.authenticated, keycloak.tokenParsed, keycloak.token, router]);

  const handleLogin = () => {
    console.log('Initiating Keycloak login...');
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
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-navy-900 to-navy-700">
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
          <Button onClick={handleLogin} className="w-full" size="lg">
            Sign in with Keycloak
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            Secure authentication powered by Keycloak
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
