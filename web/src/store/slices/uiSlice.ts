import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  period: 'day' | 'week' | 'month';
}

const initialState: UIState = {
  period: 'day',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<'day' | 'week' | 'month'>) => {
      state.period = action.payload;
    },
  },
});

export const { setPeriod } = uiSlice.actions;
export default uiSlice.reducer;