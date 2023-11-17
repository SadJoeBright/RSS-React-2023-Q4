import { configureStore } from '@reduxjs/toolkit';
import { searchValueReduser } from './searchValue/searchValueSlice';

export const store = configureStore({
  reducer: {
    searchValue: searchValueReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
