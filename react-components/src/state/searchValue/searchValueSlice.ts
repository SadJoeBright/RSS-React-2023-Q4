import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  // searchValue: window.localStorage.getItem('searchValue') || '',
  searchValue: '',
};

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchValueSlice.actions;

export const searchValueReducer = searchValueSlice.reducer;
