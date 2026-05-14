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
import { ComplianceItem, SRACategory } from '@/types/compliance.types';
import { formatDate } from '@/lib/utils';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface SRAChecklistTableProps {
  items: ComplianceItem[];
}

export function SRAChecklistTable({ items }: SRAChecklistTableProps) {
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<SRACategory, ComplianceItem[]>);

  // Calculate compliance percentage by category
  const categoryStats = Object.entries(groupedItems).map(([category, items]) => {
    const compliantCount = items.filter(item => item.isCompliant).length;
    const totalCount = items.length;
    const percentage = totalCount > 0 ? (compliantCount / totalCount) * 100 : 0;
    
    return {
      category: category as SRACategory,
      percentage,
      compliantCount,
      totalCount,
      hasWarnings: percentage < 75,
    };
  });

  const getCategoryBadge = (percentage: number) => {
    if (percentage >= 90) return <Badge variant="success">Compliant</Badge>;
    if (percentage >= 75) return <Badge variant="warning">Review Needed</Badge>;
    return <Badge variant="destructive">Action Required</Badge>;
  };

  const formatCategoryName = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SRA Compliance Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Compliance Rate</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Checked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryStats.map((stat) => (
              <TableRow key={stat.category}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {stat.hasWarnings && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                    {!stat.hasWarnings && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {formatCategoryName(stat.category)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          stat.percentage >= 90 ? 'bg-green-600' :
                          stat.percentage >= 75 ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{stat.percentage.toFixed(0)}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  {stat.compliantCount} / {stat.totalCount}
                </TableCell>
                <TableCell>
                  {getCategoryBadge(stat.percentage)}
                </TableCell>
                <TableCell>
                  {groupedItems[stat.category]?.[0]?.lastChecked 
                    ? formatDate(groupedItems[stat.category][0].lastChecked)
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
