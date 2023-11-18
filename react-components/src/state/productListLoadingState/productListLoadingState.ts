/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const productListLoadingSlice = createSlice({
  name: 'productListLoadingState',
  initialState,
  reducers: {
    setProductListLoadingState(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setProductListLoadingState } = productListLoadingSlice.actions;

export const productListLoadingReducer = productListLoadingSlice.reducer;
