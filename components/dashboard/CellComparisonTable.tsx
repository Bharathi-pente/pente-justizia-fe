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
import { Cell } from '@/types/cell.types';
import { formatCurrency } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CellComparisonTableProps {
  cells: Cell[];
}

type SortKey = 'name' | 'activeCases' | 'complianceScore';

export function CellComparisonTable({ cells }: CellComparisonTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedCells = [...cells].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
      active: 'success',
      onboarding: 'warning',
      suspended: 'destructive',
      closed: 'secondary',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 font-semibold';
    if (score >= 75) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cell Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('name')}>
                  Cell Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Vertical</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('activeCases')}>
                  Active Cases
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('complianceScore')}>
                  Compliance Score
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCells.map((cell) => (
              <TableRow key={cell.id}>
                <TableCell className="font-medium">{cell.name}</TableCell>
                <TableCell className="capitalize">{cell.vertical.replace('_', ' ')}</TableCell>
                <TableCell>{getStatusBadge(cell.status)}</TableCell>
                <TableCell>{cell.activeCases}</TableCell>
                <TableCell className={getComplianceColor(cell.complianceScore)}>
                  {cell.complianceScore}%
                </TableCell>
                <TableCell>{cell.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
