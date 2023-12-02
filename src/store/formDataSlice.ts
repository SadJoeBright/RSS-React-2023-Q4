/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFormData {
  name: string;
  age: string;
  email: string;
  password: string;
  gender: string;
  confirmPassword: string;
  country: string;
  image: string;
  termsAndConditions: boolean;
}

const initialState: { formData: IFormData[] } = {
  formData: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<IFormData>) {
      state.formData = [...state.formData, action.payload];
    },
  },
});

export const { setFormData } = formDataSlice.actions;

export const formDataReducer = formDataSlice.reducer;
