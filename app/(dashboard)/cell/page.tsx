'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboard';
import { useCases } from '@/hooks/useCases';
import { KPICard } from '@/components/dashboard/KPICard';
import { CasePipelineChart } from '@/components/dashboard/CasePipelineChart';
import { ComplianceScoreGauge } from '@/components/dashboard/ComplianceScoreGauge';
import { FileText, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CellOverviewPage() {
  const { cellId } = useAuth();
  const { cell, kpis, isLoading: dashboardLoading } = useDashboard(cellId);
  const { pipeline, isLoading: casesLoading } = useCases(cellId || '');

  if (dashboardLoading || casesLoading || !cellId) {
    return (
      <RoleGuard roles={[UserRole.CELL_ADMIN, UserRole.CELL_SOLICITOR, UserRole.CELL_PARALEGAL]}>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
          </div>
        </div>
      </RoleGuard>
    );
  }

  const cellKpis = !Array.isArray(kpis) ? kpis : undefined;

  return (
    <RoleGuard roles={[UserRole.CELL_ADMIN, UserRole.CELL_SOLICITOR, UserRole.CELL_PARALEGAL]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">{cell?.name || 'Cell Overview'}</h1>
          <p className="text-muted-foreground mt-1">
            Manage cases and operations for your cell
          </p>
        </div>

        {cellKpis && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              label="Active Cases"
              value={cellKpis.activeCases}
              icon={FileText}
              trend={8.3}
            />
            <KPICard
              label="Avg Cycle Days"
              value={cellKpis.avgCycleDays}
              icon={Clock}
              trend={-5.1}
            />
            <KPICard
              label="Compliance Score"
              value={`${cellKpis.complianceScore}%`}
              icon={CheckCircle2}
              trend={3.2}
            />
            <KPICard
              label="Total Recovered"
              value={cellKpis.totalRecovered}
              icon={TrendingUp}
              format="currency"
              trend={22.1}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {pipeline && <CasePipelineChart data={pipeline} />}
          </div>
          <div>
            {cellKpis && <ComplianceScoreGauge score={cellKpis.complianceScore} cellName={cell?.name} />}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
