'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FundingRecord } from '@/types/funding.types';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface FundingOverviewCardProps {
  funding: FundingRecord;
}

export function FundingOverviewCard({ funding }: FundingOverviewCardProps) {
  const utilizationPercentage = (funding.drawnAmount / funding.facilitySize) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {funding.funderName} Facility
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Facility Size</p>
            <p className="text-2xl font-bold">{formatCurrency(funding.facilitySize)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Drawn Amount</p>
              <p className="text-xl font-semibold flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-red-600" />
                {formatCurrency(funding.drawnAmount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-xl font-semibold flex items-center gap-1">
                <TrendingDown className="h-4 w-4 text-green-600" />
                {formatCurrency(funding.availableAmount)}
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm text-muted-foreground">Utilization</p>
              <p className="text-sm font-medium">{utilizationPercentage.toFixed(1)}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  utilizationPercentage > 80 ? 'bg-red-600' :
                  utilizationPercentage > 60 ? 'bg-yellow-600' :
                  'bg-green-600'
                }`}
                style={{ width: `${utilizationPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Interest Rate</p>
              <p className="text-sm font-medium">{funding.interestRate}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active Cases</p>
              <p className="text-sm font-medium">{funding.activeCases}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Funded Value</p>
              <p className="text-sm font-medium">{formatCurrency(funding.fundedCaseValue)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
