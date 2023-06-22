import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../../common/types';
import { ISellerNotifications } from '../../../../services/seller/seller.serviceTypes';

import {
  getSellerAddresses,
  getSellerAvatar,
  getSellerNotifications,
  updateSellerNotifications,
} from './thunks';

import { getPersonalInfo } from 'store/reducers/userSlice';

// interface ISellerProfileSlice {
//   loading: LoadingStatus;
//   personalInfo: {
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone: string;
//   };
//   userAdresses: {};
//   notifications: ISellerNotifications | null;
//   profileImage: {
//     null: null;
//   };
//   sellerAddress: null | IISellerAddressData[];
// }

// const initialState: ISellerProfileSlice = {
//   loading: LoadingStatus.Idle,
//   personalInfo: {
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone: '',
//   },
//   userAdresses: {},
//   notifications: null,
//   profileImage: {
//     null: null,
//   },
//   sellerAddress: null,
// };

// const sellerProfileSlice = createSlice({
//   name: 'seller',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(getSellerAddressesService.pending, state => {
//       state.loading = LoadingStatus.Loading;
//     });
//     builder.addCase(getSellerAddressesService.fulfilled, (state, action) => {
//       state.loading = LoadingStatus.Success;
//       state.sellerAddress = action.payload;
//     });
//     builder.addCase(getSellerAddressesService.rejected, state => {
//       state.loading = LoadingStatus.Failed;
//     });
//     builder
//       .addCase(getSellerNotifications.pending, state => {
//         state.loading = LoadingStatus.Loading;
//       })
//       .addCase(getSellerNotifications.fulfilled, (state, action) => {
//         state.notifications = action.payload;
//         state.loading = LoadingStatus.Success;
//       })
//       .addCase(updateSellerNotifications.pending, state => {
//         state.loading = LoadingStatus.Loading;
//       })
//       .addCase(updateSellerNotifications.rejected, (state, action) => {
//         state.loading = LoadingStatus.Failed;
//       });
//   },
// });

export interface ISellerPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
  avatar: string;
}

// to thunk

export interface Root {
  ok: boolean;
  result: IAddress[];
}

export interface IAddress {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_main: boolean;
  area: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  postal_code: string;
  country: ICountry;
}

export interface ICountry {
  id: number;
  country: string;
  country_code: string;
  country_short: string;
  currency: string;
  flag: string;
}

interface ISellerProfileSliceInitialState {
  loading: LoadingStatus;
  personalInfo: ISellerPersonalInfo;
  addresses: IAddress[] | null;
  notifications: ISellerNotifications | null;
}

const initialState: ISellerProfileSliceInitialState = {
  loading: LoadingStatus.Idle,
  personalInfo: {
    firstName: '',
    lastName: '',
    countryShort: '',
    phoneNumber: '',
    avatar: '',
  },
  addresses: null,
  notifications: null,
};

const sellerProfileSlice = createSlice({
  name: 'seller',
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
      .addCase(getSellerNotifications.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getSellerNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = LoadingStatus.Success;
      })
      .addCase(getSellerNotifications.rejected, state => {
        state.loading = LoadingStatus.Failed;
      })
      .addCase(updateSellerNotifications.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(updateSellerNotifications.rejected, (state, action) => {
        state.loading = LoadingStatus.Failed;
      });
    builder
      .addCase(getSellerAddresses.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getSellerAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload.result;
      })
      .addCase(getSellerAddresses.rejected, state => {
        state.loading = LoadingStatus.Failed;
      });
    builder.addCase(getSellerAvatar.fulfilled, (state, action) => {
      state.personalInfo.avatar = action.payload.result.thumbnail_url;
    });
  },
});

export const sellerProfileReducer = sellerProfileSlice.reducer;
