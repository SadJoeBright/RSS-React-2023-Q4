import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  itemsPerPage: 5,
};

const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setItemsPerPage } = itemsPerPageSlice.actions;

export const itemsPerPageReducer = itemsPerPageSlice.reducer;
