'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { useDashboard } from '@/hooks/useDashboard';
import { KPICard } from '@/components/dashboard/KPICard';
import { CellComparisonTable } from '@/components/dashboard/CellComparisonTable';
import { ComplianceScoreGauge } from '@/components/dashboard/ComplianceScoreGauge';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { Building2, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function HQOverviewPage() {
  const { cells, kpis, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <RoleGuard roles={[UserRole.HQ_ADMIN, UserRole.HQ_COMPLIANCE, UserRole.HQ_BDM]}>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
          </div>
        </div>
      </RoleGuard>
    );
  }

  const kpisArray = Array.isArray(kpis) ? kpis : [];
  const totalCases = kpisArray.reduce((sum, k) => sum + k.totalCases, 0);
  const activeCases = kpisArray.reduce((sum, k) => sum + k.activeCases, 0);
  const avgCompliance = kpisArray.length > 0
    ? kpisArray.reduce((sum, k) => sum + k.complianceScore, 0) / kpisArray.length
    : 0;
  const totalRecovered = kpisArray.reduce((sum, k) => sum + k.totalRecovered, 0);

  return (
    <RoleGuard roles={[UserRole.HQ_ADMIN, UserRole.HQ_COMPLIANCE, UserRole.HQ_BDM]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">HQ Overview</h1>
          <p className="text-muted-foreground mt-1">
            Monitor performance across all cells
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            label="Total Cells"
            value={cells?.length || 0}
            icon={Building2}
            trend={5.2}
          />
          <KPICard
            label="Active Cases"
            value={activeCases}
            icon={FileText}
            trend={12.3}
          />
          <KPICard
            label="Avg Compliance Score"
            value={`${avgCompliance.toFixed(1)}%`}
            icon={CheckCircle2}
            trend={2.1}
          />
          <KPICard
            label="Total Recovered"
            value={totalRecovered}
            icon={TrendingUp}
            format="currency"
            trend={18.5}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {cells && <CellComparisonTable cells={cells} />}
          </div>
          <div className="space-y-6">
            <ComplianceScoreGauge score={avgCompliance} />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
