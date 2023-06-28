import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getBusinessInfo,
  deleteCompanyLogo,
  fetchCompanyLogo,
  uploadCompanyLogo,
  getSupplierNotifications,
} from './thunks';

import { LoadingStatusEnum } from 'common/types';
import { ISupplierNotifications } from 'services/supplier/supplier.serviceTypes';
import { getPersonalInfo } from 'store/reducers/userSlice';

export interface ISupplierPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
}

interface IBusinessSector {
  value: string;
}

export interface ISupplierBusinessInfo {
  storeName: string;
  businessSector: IBusinessSector;
  isManufacturer: boolean;
  license: string;
  yearEstablished: number | null;
  numEmployees: number | null;
  countryRegistration: number | null;
  description: string;
  email: string;
  phoneNumber: string;
  phoneId: number | null;
  countryShort: string;
  countryCode: string;
  address: string;
  companyLogo: string;
  companyLogoId: number | null;
  countryId: number | null;
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
    countryRegistration: null,
    description: '',
    email: '',
    address: '',
    companyLogo: '',
    companyLogoId: null,
    countryShort: '',
    phoneNumber: '',
    phoneId: null,
    countryCode: '',
    countryId: null,
  },
  notifications: null,
};

export const supplierProfileSlice = createSlice({
  name: 'supplierAccount',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingStatusEnum>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPersonalInfo.fulfilled, (state, action) => {
      state.personalInfo.lastName = action.payload.last_name;
      state.personalInfo.firstName = action.payload.first_name;
      state.personalInfo.countryShort = action.payload.country.country_short;
      state.personalInfo.phoneNumber = action.payload.phone_number;
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
      state.businessInfo.countryRegistration = country.id;
      state.businessInfo.description = description;
      state.businessInfo.email = business_email;
      state.businessInfo.address = address;
      state.businessInfo.phoneId = phone.id;
      state.businessInfo.phoneNumber = phone.phone_number;
      state.businessInfo.countryShort = phone.country.country_short;
      state.businessInfo.countryCode = phone.country.country_code;
      state.businessInfo.countryId = phone.country.id;
    });
    builder
      .addCase(getSupplierNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(fetchCompanyLogo.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload;
      })
      .addCase(uploadCompanyLogo.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload.result.image;
        state.businessInfo.companyLogoId = action.payload.result.id;
      })
      .addCase(deleteCompanyLogo.fulfilled, state => {
        state.businessInfo.companyLogo = '';
      });
  },
});

export const { setLoadingStatus } = supplierProfileSlice.actions;
export const supplierProfileReducer = supplierProfileSlice.reducer;
