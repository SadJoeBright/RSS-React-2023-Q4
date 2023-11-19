import { configureStore } from '@reduxjs/toolkit';
import { searchValueReducer } from './searchValue/searchValueSlice';
import { itemsPerPageReducer } from './itemsPerPage/itemsPerPageSlice';
import { productListLoadingReducer } from './productListLoadingState/productListLoadingState';
import { detailsLoadingReducer } from './detailsLoadingState/detailsLoadingState';
import { appApi } from './appApi';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    searchValue: searchValueReducer,
    itemsPerPage: itemsPerPageReducer,
    productListLoadingState: productListLoadingReducer,
    detailsLoadingState: detailsLoadingReducer,
  },

  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
