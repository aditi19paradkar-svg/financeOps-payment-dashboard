'use client';

import { useMemo } from 'react';
import { useGetTrendsQuery } from '@/store/api/analyticsApi';
import { useAppSelector } from '@/store/hooks';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function TrendChart() {
  const period = useAppSelector((state) => state.ui.period);

  const { data, isLoading, error } = useGetTrendsQuery(period);

  // ✅ Hooks must be before any return
  const chartData = useMemo(() => {
    if (!data) return [];
    return data;
  }, [data]);

  if (isLoading) return <div>Loading trends...</div>;

  if (error) return <div>Error loading trends</div>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="timestamp" />

        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />

        <Tooltip />

        <Line
          yAxisId="left"
          type="monotone"
          dataKey="amount"
          stroke="#1976d2"
          strokeWidth={2}
        />

        <Line
          yAxisId="right"
          type="monotone"
          dataKey="successRate"
          stroke="#2e7d32"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}