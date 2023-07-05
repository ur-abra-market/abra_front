import { createSlice } from '@reduxjs/toolkit';

import { getFavoritesProductsService, getPersonalInfo, updatePersonalInfo } from '.';

import { LoadingStatusEnum } from 'common/types';
import { logout } from 'store/reducers/authSlice';

export interface IUserPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
}

export interface ILoading {
  personalInfoLoading: LoadingStatusEnum;
}

interface IUserSliceInitialState {
  loading: ILoading;
  personalInfo: IUserPersonalInfo;
  favoritesProducts: any[];
}

const initialState: IUserSliceInitialState = {
  loading: {
    personalInfoLoading: LoadingStatusEnum.Idle,
  },
  personalInfo: {
    firstName: '',
    lastName: '',
    countryShort: '',
    phoneNumber: '',
  },
  favoritesProducts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPersonalInfo.pending, state => {
        state.loading = {
          ...state.loading,
          personalInfoLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo.lastName = action.payload.last_name;
        state.personalInfo.firstName = action.payload.first_name;
        state.personalInfo.countryShort =
          action.payload.country && action.payload.country.country_short;
        state.personalInfo.phoneNumber = action.payload.phone_number;

        state.loading = {
          ...state.loading,
          personalInfoLoading: LoadingStatusEnum.Success,
        };
      })
      .addCase(getPersonalInfo.rejected, state => {
        state.loading = {
          ...state.loading,
          personalInfoLoading: LoadingStatusEnum.Failed,
        };
      })

      .addCase(updatePersonalInfo.pending, state => {
        state.loading = {
          ...state.loading,
          personalInfoLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(updatePersonalInfo.rejected, state => {
        state.loading = {
          ...state.loading,
          personalInfoLoading: LoadingStatusEnum.Failed,
        };
      })

      .addCase(getFavoritesProductsService.fulfilled, (state, action) => {
        state.favoritesProducts = action.payload;
      })

      .addCase(logout.fulfilled, state => {
        state.personalInfo = {
          firstName: '',
          lastName: '',
          countryShort: '',
          phoneNumber: '',
        };
      });
  },
});

export const userReducer = userSlice.reducer;
