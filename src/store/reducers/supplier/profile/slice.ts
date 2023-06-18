import { createSlice } from '@reduxjs/toolkit';

import { getPersonalInfo } from '../../userSlice';

import { deleteCompanyImage, fetchCompanyImage, uploadCompanyImage } from './thunks';

export interface ISupplierPersonalInfo {
  firstName: string;
  lastName: string;
  phoneCountryCode: string;
  phoneNumberBody: string;
}

export interface ISupplierBusinessInfo {
  companyLogo: string;
  companyLogoId: number;
}

interface ISupplierProfileSliceInitialState {
  loading: boolean;
  personalInfo: ISupplierPersonalInfo;
  businessInfo: ISupplierBusinessInfo;
}

const initialState: ISupplierProfileSliceInitialState = {
  loading: false,
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneCountryCode: '',
    phoneNumberBody: '',
  },
  businessInfo: {
    companyLogo: '',
    companyLogoId: 0,
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
        state.personalInfo.phoneCountryCode = action.payload.phone_country_code;
        state.personalInfo.phoneNumberBody = action.payload.phone_number;
        state.loading = false;
      })
      .addCase(fetchCompanyImage.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload.result;
      })
      .addCase(uploadCompanyImage.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload.result.image;
        state.businessInfo.companyLogoId = action.payload.result.id;
      })
      .addCase(deleteCompanyImage.fulfilled, state => {
        state.businessInfo.companyLogo = '';
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
