'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  format?: 'currency' | 'number' | 'percentage';
  className?: string;
}

export function KPICard({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  format = 'number',
  className 
}: KPICardProps) {
  const formattedValue = () => {
    if (typeof value === 'string') return value;
    if (format === 'currency') return formatCurrency(value);
    if (format === 'percentage') return formatPercentage(value);
    return value.toLocaleString();
  };

  const trendPositive = trend !== undefined && trend >= 0;

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold">{formattedValue()}</p>
            
            {trend !== undefined && (
              <div className={cn(
                "mt-2 flex items-center gap-1 text-sm font-medium",
                trendPositive ? "text-green-600" : "text-red-600"
              )}>
                {trendPositive ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{Math.abs(trend).toFixed(1)}%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          
          <div className="rounded-full bg-navy-100 p-3">
            <Icon className="h-6 w-6 text-navy-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
