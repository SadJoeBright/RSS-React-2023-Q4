import { createSlice } from '@reduxjs/toolkit';
import { getNames } from 'country-list';

const initialState = getNames();

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export default countrySlice.reducer;
export const countryReducer = countrySlice.reducer;
