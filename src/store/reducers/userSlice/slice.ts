import { createSlice } from '@reduxjs/toolkit';

import {
  IUserSliceInitialState,
  getFavoritesProductsService,
  getPersonalInfo,
  updatePersonalInfo,
} from '.';

import { LoadingStatusEnum } from 'common/types';
import { logoutUser } from 'store/reducers/authSlice';

const initialState: IUserSliceInitialState = {
  loading: {
    personalInfoLoading: LoadingStatusEnum.Idle,
    favoritesProductsLoading: LoadingStatusEnum.Idle,
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

      .addCase(getFavoritesProductsService.pending, state => {
        state.loading = {
          ...state.loading,
          favoritesProductsLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(getFavoritesProductsService.fulfilled, (state, action) => {
        state.favoritesProducts = action.payload;
        state.loading = {
          ...state.loading,
          favoritesProductsLoading: LoadingStatusEnum.Success,
        };
      })
      .addCase(getFavoritesProductsService.rejected, state => {
        state.loading = {
          ...state.loading,
          favoritesProductsLoading: LoadingStatusEnum.Failed,
        };
      })

      .addCase(logoutUser.fulfilled, state => {
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
