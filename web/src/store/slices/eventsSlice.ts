import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventsState {
  list: any[];
  paused: boolean;
}

const initialState: EventsState = {
  list: [],
  paused: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<any>) => {
      if (!state.paused) {
        state.list.unshift(action.payload);
        if (state.list.length > 200) {
          state.list.pop();
        }
      }
    },
    togglePause: (state) => {
      state.paused = !state.paused;
    },
  },
});

export const { addEvent, togglePause } = eventsSlice.actions;
export default eventsSlice.reducer;