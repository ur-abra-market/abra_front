import { createSlice } from '@reduxjs/toolkit';

import { getPersonalInfo } from '../../userSlice';

export interface ISupplierPersonalInfo {
  firstName: string;
  lastName: string;
  phoneCountryCode: string;
  phoneNumberBody: string;
}

interface ISupplierSliceInitialState {
  loading: boolean;
  personalInfo: {
    firstName: string;
    lastName: string;
    phoneCountryCode: string;
    phoneNumberBody: string;
  };
}

const initialState: ISupplierSliceInitialState = {
  loading: false,
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneCountryCode: '',
    phoneNumberBody: '',
  },
};

export const supplierAccountSlice = createSlice({
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
        state.personalInfo.phoneCountryCode = action.payload.phone_country_code;
        state.personalInfo.phoneNumberBody = action.payload.phone_number;
        state.loading = false;
      });
  },
});

export const supplierAccountReducer = supplierAccountSlice.reducer;
