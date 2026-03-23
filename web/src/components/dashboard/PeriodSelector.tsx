'use client';

import { ButtonGroup, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPeriod } from '@/store/slices/uiSlice';

export default function PeriodSelector() {
  const dispatch = useAppDispatch();
  const period = useAppSelector((state) => state.ui.period);

  const handleChange = (value: 'day' | 'week' | 'month') => {
    dispatch(setPeriod(value));
  };

  return (
    <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
      <Button
        variant={period === 'day' ? 'contained' : 'outlined'}
        onClick={() => handleChange('day')}
      >
        Day
      </Button>

      <Button
        variant={period === 'week' ? 'contained' : 'outlined'}
        onClick={() => handleChange('week')}
      >
        Week
      </Button>

      <Button
        variant={period === 'month' ? 'contained' : 'outlined'}
        onClick={() => handleChange('month')}
      >
        Month
      </Button>
    </ButtonGroup>
  );
}