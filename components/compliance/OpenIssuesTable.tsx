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
import { ComplianceIssue, ComplianceSeverity } from '@/types/compliance.types';
import { formatDate } from '@/lib/utils';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OpenIssuesTableProps {
  issues: ComplianceIssue[];
}

export function OpenIssuesTable({ issues }: OpenIssuesTableProps) {
  const getSeverityBadge = (severity: ComplianceSeverity) => {
    const variants: Record<ComplianceSeverity, 'destructive' | 'warning' | 'secondary' | 'default'> = {
      critical: 'destructive',
      high: 'warning',
      medium: 'secondary',
      low: 'default',
    };
    
    const icons = {
      critical: <AlertCircle className="h-3 w-3 mr-1" />,
      high: <AlertTriangle className="h-3 w-3 mr-1" />,
      medium: <Info className="h-3 w-3 mr-1" />,
      low: <Info className="h-3 w-3 mr-1" />,
    };

    return (
      <Badge variant={variants[severity]}>
        <div className="flex items-center">
          {icons[severity]}
          {severity.toUpperCase()}
        </div>
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'warning' | 'success' | 'destructive'> = {
      open: 'destructive',
      in_progress: 'warning',
      resolved: 'success',
    };
    return <Badge variant={variants[status] as any}>{status.replace('_', ' ')}</Badge>;
  };

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = now.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Sort by severity and overdue status
  const sortedIssues = [...issues].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return getDaysOverdue(b.dueDate) - getDaysOverdue(a.dueDate);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Open Compliance Issues</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedIssues.map((issue) => {
              const daysOverdue = getDaysOverdue(issue.dueDate);
              const isOverdue = daysOverdue > 0 && issue.status !== 'resolved';

              return (
                <TableRow key={issue.id} className={isOverdue ? 'bg-red-50' : ''}>
                  <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                  <TableCell className="font-medium max-w-xs">
                    <div>
                      {issue.title}
                      {isOverdue && (
                        <p className="text-xs text-red-600 mt-1">
                          {daysOverdue} days overdue
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {issue.category.replace('_', ' ')}
                  </TableCell>
                  <TableCell>{issue.assignedTo}</TableCell>
                  <TableCell>{formatDate(issue.dueDate)}</TableCell>
                  <TableCell>{getStatusBadge(issue.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
