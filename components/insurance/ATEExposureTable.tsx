'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InsurancePolicy, PolicyStatus } from '@/types/insurance.types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface ATEExposureTableProps {
  policies: InsurancePolicy[];
}

export function ATEExposureTable({ policies }: ATEExposureTableProps) {
  const getStatusBadge = (status: PolicyStatus) => {
    const variants: Record<PolicyStatus, 'success' | 'destructive' | 'secondary'> = {
      active: 'success',
      expired: 'secondary',
      cancelled: 'destructive',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const totalExposure = policies
    .filter(p => p.status === 'active')
    .reduce((sum, p) => sum + p.coverageAmount, 0);

  const totalPremiums = policies.reduce((sum, p) => sum + p.premium, 0);
  
  const totalPaidOut = policies.reduce((sum, p) => sum + p.totalPaidOut, 0);

  const lossRatio = totalPremiums > 0 ? (totalPaidOut / totalPremiums) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Active Policies</p>
            <p className="text-2xl font-bold">{policies.filter(p => p.status === 'active').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Exposure</p>
            <p className="text-2xl font-bold">{formatCurrency(totalExposure)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Premiums</p>
            <p className="text-2xl font-bold">{formatCurrency(totalPremiums)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Loss Ratio</p>
            <p className={`text-2xl font-bold ${lossRatio > 70 ? 'text-red-600' : 'text-green-600'}`}>
              {lossRatio.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ATE Policy Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Number</TableHead>
                <TableHead>Case ID</TableHead>
                <TableHead>Coverage Amount</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Claims Made</TableHead>
                <TableHead>Total Paid</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.policyNumber}</TableCell>
                  <TableCell>{policy.caseId}</TableCell>
                  <TableCell>{formatCurrency(policy.coverageAmount)}</TableCell>
                  <TableCell>{formatCurrency(policy.premium)}</TableCell>
                  <TableCell>{formatDate(policy.issueDate)}</TableCell>
                  <TableCell>{formatDate(policy.expiryDate)}</TableCell>
                  <TableCell>{policy.claimsMade}</TableCell>
                  <TableCell>{formatCurrency(policy.totalPaidOut)}</TableCell>
                  <TableCell>{getStatusBadge(policy.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
