/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  itemsPerPage: Number(localStorage.getItem('itemsPerPage')) || 5,
};

const itemsPerPageSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setItemsPerPage } = itemsPerPageSlice.actions;

export const itemsPerPageReduser = itemsPerPageSlice.reducer;
