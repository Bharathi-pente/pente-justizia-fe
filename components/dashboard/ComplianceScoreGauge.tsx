'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ComplianceScoreGaugeProps {
  score: number;
  cellName?: string;
}

export function ComplianceScoreGauge({ score, cellName }: ComplianceScoreGaugeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return '#16a34a'; // green
    if (score >= 75) return '#eab308'; // yellow
    return '#dc2626'; // red
  };

  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const COLORS = [getScoreColor(score), '#e5e7eb'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {cellName ? `${cellName} Compliance Score` : 'Compliance Score'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-4xl font-bold" style={{ color: getScoreColor(score) }}>
            {score}%
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {score >= 90 && 'Excellent Compliance'}
            {score >= 75 && score < 90 && 'Good Compliance'}
            {score < 75 && 'Needs Improvement'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
