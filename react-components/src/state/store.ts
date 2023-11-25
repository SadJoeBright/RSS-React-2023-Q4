import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { searchValueReducer } from './searchValue/searchValueSlice';
import { itemsPerPageReducer } from './itemsPerPage/itemsPerPageSlice';
import { productListLoadingReducer } from './productListLoadingState/productListLoadingState';
import { detailsLoadingReducer } from './detailsLoadingState/detailsLoadingState';
import { appApi } from './appApi';

export const store = () =>
  configureStore({
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

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
