import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../../common/types';
import { ISupplierNotifications } from '../../../../services/supplier/supplier.serviceTypes';
import { getPersonalInfo } from '../../userSlice';

import {
  getCompanyInfo,
  getSupplierNotifications,
  updateSupplierNotifications,
} from './thunks';

export interface ISupplierPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
}

export interface IBusinessProfileInfo {
  shopName: string;
  businessSector: { value: string };
  isManufacturer: boolean;
  licenseNumber: string;
  yearEstablished: number;
  numberEmployees: number;
  countryRegistration: { value: number };
  description: string;
  businessEmail: string;
  address: string;
}

interface ISupplierProfileSliceInitialState {
  loading: LoadingStatus;
  personalInfo: ISupplierPersonalInfo;
  businessProfileInfo: IBusinessProfileInfo;
  notifications: ISupplierNotifications | null;
}

const initialState: ISupplierProfileSliceInitialState = {
  loading: LoadingStatus.Idle,
  personalInfo: {
    firstName: '',
    lastName: '',
    countryShort: '',
    phoneNumber: '',
  },
  businessProfileInfo: {
    shopName: '',
    businessSector: { value: '' },
    isManufacturer: false,
    licenseNumber: '',
    yearEstablished: new Date().getFullYear(),
    numberEmployees: 1,
    countryRegistration: { value: 0 },
    description: '',
    businessEmail: '',
    address: '',
  },
  notifications: null,
};

export const supplierProfileSlice = createSlice({
  name: 'supplierAccount',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPersonalInfo.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo.lastName = action.payload.last_name;
        state.personalInfo.firstName = action.payload.first_name;
        state.personalInfo.countryShort = action.payload.country.country_short;
        state.personalInfo.phoneNumber = action.payload.phone_number;
        state.loading = LoadingStatus.Success;
      });
    builder
      .addCase(getCompanyInfo.fulfilled, (state, action) => {
        const {
          name,
          country,
          description,
          address,
          year_established,
          is_manufacturer,
          business_sector,
          business_email,
          number_employees,
        } = action.payload.company;

        state.businessProfileInfo.shopName = name;
        state.businessProfileInfo.businessSector.value = business_sector;
        state.businessProfileInfo.isManufacturer = is_manufacturer;
        state.businessProfileInfo.licenseNumber = action.payload.license_number;
        state.businessProfileInfo.yearEstablished = year_established;
        state.businessProfileInfo.numberEmployees = number_employees;
        state.businessProfileInfo.countryRegistration.value = country.id;
        state.businessProfileInfo.description = description;
        state.businessProfileInfo.businessEmail = business_email;
        state.businessProfileInfo.address = address;
      })
      .addCase(getSupplierNotifications.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getSupplierNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = LoadingStatus.Success;
      })
      .addCase(getSupplierNotifications.rejected, state => {
        state.loading = LoadingStatus.Failed;
      })
      .addCase(updateSupplierNotifications.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(updateSupplierNotifications.rejected, state => {
        state.loading = LoadingStatus.Failed;
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
