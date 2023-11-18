import { configureStore } from '@reduxjs/toolkit';
import { searchValueReducer } from './searchValue/searchValueSlice';
import { itemsPerPageReducer } from './itemsPerPage/itemsPerPageSlice';
import { productListLoadingReducer } from './productListLoadingState/productListLoadingState';
import { detailsLoadingReducer } from './detailsLoadingState/detailsLoadingState';

export const store = configureStore({
  reducer: {
    searchValue: searchValueReducer,
    itemsPerPage: itemsPerPageReducer,
    productListLoadingState: productListLoadingReducer,
    detailsLoadingState: detailsLoadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
