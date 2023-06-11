import { createSlice } from '@reduxjs/toolkit';

import { getPersonalInfo } from '../../userSlice';

export interface ISupplierPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
}

interface ISupplierProfileSliceInitialState {
  loading: boolean;
  personalInfo: {
    firstName: string;
    lastName: string;
    countryShort: string;
    phoneNumber: string;
  };
}

const initialState: ISupplierProfileSliceInitialState = {
  loading: false,
  personalInfo: {
    firstName: '',
    lastName: '',
    countryShort: '',
    phoneNumber: '',
  },
};

export const supplierProfileSlice = createSlice({
  name: 'supplierAccount',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPersonalInfo.pending, state => {
        state.loading = true;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo.lastName = action.payload.last_name;
        state.personalInfo.firstName = action.payload.first_name;
        state.personalInfo.countryShort = action.payload.country.country_short;
        state.personalInfo.phoneNumber = action.payload.phone_number;
        state.loading = false;
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
