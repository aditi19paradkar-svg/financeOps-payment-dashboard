import { configureStore } from '@reduxjs/toolkit';
import { analyticsApi } from './api/analyticsApi';
import eventsReducer from './slices/eventsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    events: eventsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(analyticsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;