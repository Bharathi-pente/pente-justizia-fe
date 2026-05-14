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
import { Case, CaseStatus, CaseStage } from '@/types/case.types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { exportToCSV } from '@/lib/utils';

interface CasesTableProps {
  cases: Case[];
  onCaseClick?: (caseId: string) => void;
}

export function CasesTable({ cases, onCaseClick }: CasesTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadge = (status: CaseStatus) => {
    const variants: Record<CaseStatus, 'default' | 'secondary' | 'success' | 'destructive' | 'warning'> = {
      open: 'default',
      in_progress: 'warning',
      pending: 'secondary',
      settled: 'success',
      won: 'success',
      lost: 'destructive',
      withdrawn: 'secondary',
    };
    return <Badge variant={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const getStageBadge = (stage: CaseStage) => {
    return <Badge variant="outline">{stage.replace('_', ' ')}</Badge>;
  };

  const filteredCases = cases.filter(c => {
    const matchesSearch = 
      c.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.clientName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const exportData = filteredCases.map(c => ({
      'Case Number': c.caseNumber,
      'Client Name': c.clientName,
      'Status': c.status,
      'Stage': c.stage,
      'Claim Value': c.claimValue,
      'Date Opened': formatDate(c.dateOpened),
      'Assigned Solicitor': c.assignedSolicitor,
    }));
    exportToCSV(exportData, `cases-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Cases</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="settled">Settled</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Claim Value</TableHead>
              <TableHead>Date Opened</TableHead>
              <TableHead>Solicitor</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.caseNumber}</TableCell>
                <TableCell>{c.clientName}</TableCell>
                <TableCell>{getStatusBadge(c.status)}</TableCell>
                <TableCell>{getStageBadge(c.stage)}</TableCell>
                <TableCell>{formatCurrency(c.claimValue)}</TableCell>
                <TableCell>{formatDate(c.dateOpened)}</TableCell>
                <TableCell>{c.assignedSolicitor}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCaseClick?.(c.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredCases.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No cases found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
}
