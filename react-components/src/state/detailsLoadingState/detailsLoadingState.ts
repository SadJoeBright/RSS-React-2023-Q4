import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const detailsLoadingSlice = createSlice({
  name: 'detailsLoadingSlice',
  initialState,
  reducers: {
    setDetailsLoadingState(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setDetailsLoadingState } = detailsLoadingSlice.actions;

export const detailsLoadingReducer = detailsLoadingSlice.reducer;
