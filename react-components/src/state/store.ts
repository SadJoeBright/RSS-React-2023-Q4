import { configureStore } from '@reduxjs/toolkit';
import { searchValueReduser } from './searchValue/searchValueSlice';
import { itemsPerPageReduser } from './itemsPerPage/itemsPerPageSlice';
import { productListLoadingReduser } from './productListLoadingState/productListLoadingState';

export const store = configureStore({
  reducer: {
    searchValue: searchValueReduser,
    itemsPerPage: itemsPerPageReduser,
    productListLoadingState: productListLoadingReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
