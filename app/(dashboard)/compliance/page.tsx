'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { useCompliance } from '@/hooks/useCompliance';
import { SRAChecklistTable } from '@/components/compliance/SRAChecklistTable';
import { OpenIssuesTable } from '@/components/compliance/OpenIssuesTable';
import { AuditScheduleCalendar } from '@/components/compliance/AuditScheduleCalendar';
import { Skeleton } from '@/components/ui/skeleton';

export default function CompliancePage() {
  const { complianceItems, openIssues, auditSchedule, isLoading } = useCompliance();

  if (isLoading) {
    return (
      <RoleGuard roles={[UserRole.HQ_ADMIN, UserRole.HQ_COMPLIANCE]}>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-96" />
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard roles={[UserRole.HQ_ADMIN, UserRole.HQ_COMPLIANCE]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Compliance Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor SRA compliance across all cells
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {complianceItems && <SRAChecklistTable items={complianceItems} />}
            {openIssues && <OpenIssuesTable issues={openIssues} />}
          </div>
          <div>
            {auditSchedule && <AuditScheduleCalendar audits={auditSchedule} />}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
