'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'case' | 'compliance' | 'audit' | 'user';
  description: string;
  timestamp: string;
  user: string;
}

interface ActivityFeedProps {
  activities?: Activity[];
}

export function ActivityFeed({ activities = [] }: ActivityFeedProps) {
  const getActivityBadge = (type: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'success' | 'warning'> = {
      case: 'default',
      compliance: 'warning',
      audit: 'success',
      user: 'secondary',
    };
    return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
  };

  // Mock data if no activities provided
  const displayActivities = activities.length > 0 ? activities : [
    {
      id: '1',
      type: 'case' as const,
      description: 'New case created: PI-2026-001',
      timestamp: new Date().toISOString(),
      user: 'John Smith',
    },
    {
      id: '2',
      type: 'compliance' as const,
      description: 'Compliance audit completed',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      user: 'Sarah Jones',
    },
    {
      id: '3',
      type: 'audit' as const,
      description: 'Site visit scheduled',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      user: 'Mike Brown',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex gap-3 border-l-2 border-navy-200 pl-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getActivityBadge(activity.type)}
                  <span className="text-xs text-muted-foreground">
                    {activity.user}
                  </span>
                </div>
                <p className="text-sm">{activity.description}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(activity.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
