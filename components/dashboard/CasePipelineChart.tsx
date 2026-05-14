'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CasePipeline } from '@/types/case.types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface CasePipelineChartProps {
  data: CasePipeline[];
}

export function CasePipelineChart({ data }: CasePipelineChartProps) {
  const chartData = data.map(item => ({
    stage: item.stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    count: item.count,
    value: item.totalValue,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Pipeline by Stage</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="stage" 
              angle={-45}
              textAnchor="end"
              height={100}
              fontSize={12}
            />
            <YAxis yAxisId="left" orientation="left" stroke="#334e68" />
            <YAxis yAxisId="right" orientation="right" stroke="#627d98" />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'Total Value') {
                  return formatCurrency(value);
                }
                return value;
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="count" fill="#334e68" name="Case Count" />
            <Bar yAxisId="right" dataKey="value" fill="#627d98" name="Total Value" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
