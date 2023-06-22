import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatusEnum } from '../../../../common/types';
import { ISupplierNotifications } from '../../../../services/supplier/supplier.serviceTypes';
import { getPersonalInfo } from '../../userSlice';

import {
  getBusinessInfo,
  getSupplierNotifications,
  updateSupplierNotifications,
} from './thunks';

export interface ISupplierPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
}

interface IBusinessSector {
  value: string;
}

interface ICountryRegistration {
  label: string;
  value: number | null;
}

export interface ISupplierBusinessInfo {
  storeName: string;
  businessSector: IBusinessSector;
  isManufacturer: boolean;
  license: string;
  yearEstablished: number | null;
  numEmployees: number | null;
  countryRegistration: ICountryRegistration;
  description: string;
  email: string;
  phoneNumber: string;
  id: number | null;
  countryShort: string;
  countryCode: string;
  address: string;
}

interface ISupplierProfileSliceInitialState {
  loading: LoadingStatusEnum;
  personalInfo: ISupplierPersonalInfo;
  businessInfo: ISupplierBusinessInfo;
  notifications: ISupplierNotifications | null;
}

const initialState: ISupplierProfileSliceInitialState = {
  loading: LoadingStatusEnum.Idle,
  personalInfo: {
    firstName: '',
    lastName: '',
    countryShort: '',
    phoneNumber: '',
  },
  businessInfo: {
    storeName: '',
    businessSector: { value: '' },
    isManufacturer: false,
    license: '',
    yearEstablished: null,
    numEmployees: null,
    countryRegistration: { value: null, label: '' },
    description: '',
    email: '',
    address: '',
    countryShort: '',
    phoneNumber: '',
    id: null,
    countryCode: '',
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
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo.lastName = action.payload.last_name;
        state.personalInfo.firstName = action.payload.first_name;
        state.personalInfo.countryShort = action.payload.country.country_short;
        state.personalInfo.phoneNumber = action.payload.phone_number;
        state.loading = LoadingStatusEnum.Success;
      });
    builder.addCase(getBusinessInfo.fulfilled, (state, action) => {
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
        phone,
      } = action.payload.company;

      state.businessInfo.storeName = name;
      state.businessInfo.businessSector.value = business_sector;
      state.businessInfo.isManufacturer = is_manufacturer;
      state.businessInfo.license = action.payload.license_number;
      state.businessInfo.yearEstablished = year_established;
      state.businessInfo.numEmployees = number_employees;
      state.businessInfo.countryRegistration.value = country.id;
      state.businessInfo.countryRegistration.label = country.country;
      state.businessInfo.description = description;
      state.businessInfo.email = business_email;
      state.businessInfo.address = address;
      state.businessInfo.id = phone.country.id;
      state.businessInfo.phoneNumber = phone.phone_number;
      state.businessInfo.countryShort = phone.country.country_short;
      state.businessInfo.countryCode = phone.country.country_code;
    });
    builder
      .addCase(getSupplierNotifications.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getSupplierNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(getSupplierNotifications.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })
      .addCase(updateSupplierNotifications.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(updateSupplierNotifications.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
