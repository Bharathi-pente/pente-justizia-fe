'use client';

import { ReactNode } from 'react';
import { UserRole } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { useRoleAccess } from '@/hooks/useRoleAccess';

interface RoleGuardProps {
  children: ReactNode;
  roles?: UserRole[];
  cellId?: string;
  fallback?: ReactNode;
}

export function RoleGuard({ children, roles, cellId, fallback }: RoleGuardProps) {
  const { role, isLoading, user } = useAuth();
  const { canAccessCell } = useRoleAccess();

  console.log('RoleGuard check:', { role, isLoading, requiredRoles: roles, user });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading permissions...</p>
      </div>
    );
  }

  // Check role permission
  if (roles && (!role || !roles.includes(role))) {
    console.log('RoleGuard: Access denied. Required roles:', roles, 'User role:', role);
    return fallback ? <>{fallback}</> : (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don&apos;t have permission to view this page.</p>
          <p className="text-sm text-muted-foreground mt-2">Your role: {role || 'none'}</p>
          <p className="text-sm text-muted-foreground">Required: {roles?.join(', ')}</p>
        </div>
      </div>
    );
  }

  // Check cell access permission
  if (cellId && !canAccessCell(cellId)) {
    console.log('RoleGuard: Cell access denied for cell:', cellId);
    return fallback ? <>{fallback}</> : (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don&apos;t have permission to access this cell.</p>
        </div>
      </div>
    );
  }

  console.log('RoleGuard: Access granted');
  return <>{children}</>;
}
