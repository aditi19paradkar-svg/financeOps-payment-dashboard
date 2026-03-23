'use client';

import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useGetMetricsQuery } from '@/store/api/analyticsApi';

export default function MetricsGrid() {
  const { data, isLoading, error } = useGetMetricsQuery();

  if (isLoading || !data) {
    return <Typography>Loading metrics...</Typography>;
  }

  if (error) {
    return <Typography color="error">Failed to load metrics</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Volume</Typography>
            <Typography variant="h4">
              ${data?.totalVolume ?? 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Success Rate</Typography>
            <Typography variant="h4">
              {data?.successRate?.toFixed(2)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Average Amount</Typography>
            <Typography variant="h4">
              ${data?.averageAmount?.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Peak Hour</Typography>
            <Typography variant="h4">
              {data?.peakHour ?? '-'}:00
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}