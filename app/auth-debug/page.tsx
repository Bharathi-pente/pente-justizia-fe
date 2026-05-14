'use client';

import { useKeycloak } from '@react-keycloak/web';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthDebugPage() {
  const { keycloak, initialized } = useKeycloak();
  const auth = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Authentication Debug Page</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Keycloak State</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
              {JSON.stringify({
                initialized,
                authenticated: keycloak.authenticated,
                hasToken: !!keycloak.token,
                hasTokenParsed: !!keycloak.tokenParsed,
                tokenParsed: keycloak.tokenParsed,
              }, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useAuth Hook State</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
              {JSON.stringify(auth, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
