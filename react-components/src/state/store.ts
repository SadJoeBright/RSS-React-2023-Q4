import { configureStore } from '@reduxjs/toolkit';
import { searchValueReduser } from './searchValue/searchValueSlice';
import { itemsPerPageReduser } from './itemsPerPage/itemsPerPageSlice';

export const store = configureStore({
  reducer: {
    searchValue: searchValueReduser,
    itemsPerPage: itemsPerPageReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
