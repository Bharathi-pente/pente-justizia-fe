'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditSchedule } from '@/types/compliance.types';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface AuditScheduleCalendarProps {
  audits: AuditSchedule[];
}

export function AuditScheduleCalendar({ audits }: AuditScheduleCalendarProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'warning' | 'success'> = {
      scheduled: 'default',
      in_progress: 'warning',
      completed: 'success',
    };
    return <Badge variant={variants[status] as any}>{status.replace('_', ' ')}</Badge>;
  };

  const getAuditTypeBadge = (type: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'warning'> = {
      routine: 'default',
      spot_check: 'warning',
      follow_up: 'secondary',
    };
    return <Badge variant={variants[type] as any}>{type.replace('_', ' ')}</Badge>;
  };

  const upcomingAudits = audits
    .filter(audit => audit.status !== 'completed')
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

  const completedAudits = audits
    .filter(audit => audit.status === 'completed')
    .sort((a, b) => new Date(b.completedDate!).getTime() - new Date(a.completedDate!).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Audits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingAudits.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming audits scheduled</p>
            ) : (
              upcomingAudits.map((audit) => (
                <div key={audit.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-navy-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getAuditTypeBadge(audit.auditType)}
                      {getStatusBadge(audit.status)}
                    </div>
                    <p className="text-sm font-medium">{audit.cellId}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(audit.scheduledDate, 'long')}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Auditor: {audit.auditor}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recently Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedAudits.length === 0 ? (
              <p className="text-sm text-muted-foreground">No completed audits</p>
            ) : (
              completedAudits.map((audit) => (
                <div key={audit.id} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getAuditTypeBadge(audit.auditType)}
                      {getStatusBadge(audit.status)}
                    </div>
                    <p className="text-sm font-medium">{audit.cellId}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Completed: {formatDate(audit.completedDate!, 'long')}
                    </p>
                    {audit.findings && (
                      <p className="text-xs mt-2 line-clamp-2">{audit.findings}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
