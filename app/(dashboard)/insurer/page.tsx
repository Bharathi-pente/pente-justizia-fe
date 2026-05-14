'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { useInsurance } from '@/hooks/useInsurance';
import { ATEExposureTable } from '@/components/insurance/ATEExposureTable';
import { Skeleton } from '@/components/ui/skeleton';

export default function InsurerPage() {
  const { user } = useAuth();
  const { ateExposure, policies, isLoading } = useInsurance(undefined, user?.id);

  if (isLoading) {
    return (
      <RoleGuard roles={[UserRole.INSURER, UserRole.HQ_ADMIN]}>
        <Skeleton className="h-96" />
      </RoleGuard>
    );
  }

  // For demo purposes, using policies if ateExposure is not available
  const displayPolicies = policies || [];

  return (
    <RoleGuard roles={[UserRole.INSURER, UserRole.HQ_ADMIN]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">ATE Insurance Portfolio</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your After-the-Event insurance exposure and claims
          </p>
        </div>

        <ATEExposureTable policies={displayPolicies} />
      </div>
    </RoleGuard>
  );
}
