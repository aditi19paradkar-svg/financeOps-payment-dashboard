'use client';

import MetricsGrid from '@/components/dashboard/MetricsGrid';
//import TrendChart from '@/components/dashboard/TrendChart';
import EventsFeed from '@/components/dashboard/EventsFeed';
import PeriodSelector from '@/components/dashboard/PeriodSelector';
import dynamic from 'next/dynamic';

import { Container, Typography, Box } from '@mui/material';
const TrendChart = dynamic(
  () => import('@/components/dashboard/TrendChart'),
  { ssr: false }
);

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment Analytics Dashboard
      </Typography>

      <MetricsGrid />

      <Box sx={{ mt: 5 }}>
        <PeriodSelector />
        <TrendChart />
      </Box>

      <Box sx={{ mt: 5 }}>
        <EventsFeed />
      </Box>
    </Container>
  );
}