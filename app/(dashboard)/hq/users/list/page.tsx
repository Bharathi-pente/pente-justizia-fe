'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';

export default function UsersListPage() {
  return (
    <RoleGuard roles={[UserRole.HQ_ADMIN]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/hq/users">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Users</h1>
            <p className="text-muted-foreground">
              View and manage all users in the system
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>
              View all users across HQ, cells, funders, and insurers
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">User List Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              This page will display all users in the system with filtering and search capabilities.
            </p>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
