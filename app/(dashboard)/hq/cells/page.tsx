'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { useDashboard } from '@/hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function CellsPage() {
  const { cells, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <RoleGuard roles={[UserRole.HQ_ADMIN, UserRole.HQ_COMPLIANCE, UserRole.HQ_BDM]}>
        <Skeleton className="h-96" />
      </RoleGuard>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      onboarding: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.active;
  };

  return (
    <RoleGuard roles={[UserRole.HQ_ADMIN, UserRole.HQ_COMPLIANCE, UserRole.HQ_BDM]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">All Cells</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all legal cells
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cells?.map((cell) => (
            <Card key={cell.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{cell.name}</CardTitle>
                  <Badge className={getStatusColor(cell.status)}>
                    {cell.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vertical:</span>
                    <span className="font-medium capitalize">
                      {cell.vertical.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Cases:</span>
                    <span className="font-medium">{cell.activeCases}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Compliance:</span>
                    <span className={`font-medium ${
                      cell.complianceScore >= 90 ? 'text-green-600' :
                      cell.complianceScore >= 75 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {cell.complianceScore}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{cell.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
