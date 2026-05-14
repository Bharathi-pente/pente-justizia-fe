'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { useFunding } from '@/hooks/useFunding';
import { FundingOverviewCard } from '@/components/funding/FundingOverviewCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';

export default function FunderPage() {
  const { user } = useAuth();
  const { funderPortfolio, isLoading } = useFunding(undefined, user?.id);

  if (isLoading) {
    return (
      <RoleGuard roles={[UserRole.FUNDER, UserRole.HQ_ADMIN]}>
        <Skeleton className="h-96" />
      </RoleGuard>
    );
  }

  return (
    <RoleGuard roles={[UserRole.FUNDER, UserRole.HQ_ADMIN]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Funder Portfolio</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your funding facilities and portfolio performance
          </p>
        </div>

        {funderPortfolio && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Facility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {formatCurrency(funderPortfolio.totalFacilitySize)}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Drawn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {formatCurrency(funderPortfolio.totalDrawn)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {((funderPortfolio.totalDrawn / funderPortfolio.totalFacilitySize) * 100).toFixed(1)}% utilization
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(funderPortfolio.totalAvailable)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Funded Cells</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funderPortfolio.cells.map((cell) => (
                    <div key={cell.cellId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{cell.cellName}</p>
                        <p className="text-sm text-muted-foreground">
                          {cell.activeCases} active cases
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(cell.drawnAmount)}</p>
                        <p className="text-sm text-muted-foreground">
                          of {formatCurrency(cell.facilitySize)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </RoleGuard>
  );
}
