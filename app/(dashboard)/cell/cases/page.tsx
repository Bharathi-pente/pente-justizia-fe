'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { useCases } from '@/hooks/useCases';
import { CasesTable } from '@/components/cases/CasesTable';
import { Skeleton } from '@/components/ui/skeleton';

export default function CasesPage() {
  const { cellId } = useAuth();
  const { cases, isLoading } = useCases(cellId || '');

  if (isLoading || !cellId) {
    return (
      <RoleGuard roles={[UserRole.CELL_ADMIN, UserRole.CELL_SOLICITOR, UserRole.CELL_PARALEGAL]}>
        <Skeleton className="h-96" />
      </RoleGuard>
    );
  }

  return (
    <RoleGuard roles={[UserRole.CELL_ADMIN, UserRole.CELL_SOLICITOR, UserRole.CELL_PARALEGAL]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Cases</h1>
          <p className="text-muted-foreground mt-1">
            Manage all cases for your cell
          </p>
        </div>

        <CasesTable cases={cases} />
      </div>
    </RoleGuard>
  );
}
