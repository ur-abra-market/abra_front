import { createSlice } from '@reduxjs/toolkit';

import { getFavoritesProductsService, getPersonalInfo, updatePersonalInfo } from '.';

import { LoadingStatusEnum } from 'common/types';
import { getSellerAvatar } from 'store/reducers/seller/profile/thunks';

export interface IUserPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
  avatar: string;
}

export interface IUserLoading {
  personalInfoLoading: LoadingStatusEnum;
  userAvatarLoading: LoadingStatusEnum;
}

interface IUserSliceInitialState {
  loading: IUserLoading;
  personalInfo: IUserPersonalInfo;
  favoritesProducts: any[];
}

const initialState: IUserSliceInitialState = {
  loading: {
    personalInfoLoading: LoadingStatusEnum.Idle,
    userAvatarLoading: LoadingStatusEnum.Idle,
  },
  personalInfo: {
    firstName: '',
    lastName: '',
    countryShort: '',
    phoneNumber: '',
    avatar: '',
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

      .addCase(getSellerAvatar.pending, state => {
        state.loading = {
          ...state.loading,
          userAvatarLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(getSellerAvatar.fulfilled, (state, action) => {
        state.personalInfo.avatar = action.payload.result.thumbnail_url;
        state.loading = {
          ...state.loading,
          userAvatarLoading: LoadingStatusEnum.Success,
        };
      })
      .addCase(getSellerAvatar.rejected, state => {
        state.loading = {
          ...state.loading,
          userAvatarLoading: LoadingStatusEnum.Failed,
        };
      });
  },
});

export const userReducer = userSlice.reducer;
