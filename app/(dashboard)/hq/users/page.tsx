'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function UsersPage() {
  return (
    <RoleGuard roles={[UserRole.HQ_ADMIN]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage users across all cells
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              User management interface will be implemented here. This includes creating, editing, and deleting users, as well as assigning roles and cell access.
            </p>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
