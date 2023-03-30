import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
import {
  ISellerAddressData,
  ISellerData,
  IUserResultFetch,
  sellerFetch,
  ISendSellerResponse,
} from '../../services/seller.service';

export const getSellerInfoService = createAsyncThunk<IUserResultFetch, void>(
  'seller/getSellerInfoService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await sellerFetch.getSellerInfo();

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getSellerInfoService]: Error');
    }
  },
);

export const sendSellerInfoService = createAsyncThunk<ISendSellerResponse, ISellerData>(
  'seller/sendSellerInfoService',
  async (sellerData, { rejectWithValue }) => {
    try {
      const data = await sellerFetch.sendSellerInfo(sellerData);

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[sendSellerInfoService]: Error');
    }
  },
);

export const getSellerAddressesService = createAsyncThunk<ISellerAddressData[], void>(
  'seller/getSellerAddressesService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await sellerFetch.getSellerAddresses();

      return data.result.seller_address;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getSellerAddressesService]: Error');
    }
  },
);

const initialState = {
  loading: Status.Idle as Status,
  userProfileInfo: {
    first_name: '' as string,
    last_name: '' as string,
    email: null as null | string,
    phone: null as null | string,
  },
  userAdresses: {},
  notifications: {
    on_discount: true as boolean,
    on_order_updates: true as boolean,
    on_order_reminders: true as boolean,
    on_stock_again: true as boolean,
    on_product_is_cheaper: true as boolean,
    on_your_favorites_new: true as boolean,
    on_account_support: true as boolean,
  },
  profileImage: {
    null: null as null | string,
  },
  sellerAddress: null as null | ISellerAddressData[],
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSellerInfoService.pending, state => {
      state.loading = Status.Loading;
    });
    builder.addCase(getSellerInfoService.fulfilled, (state, action) => {
      state.loading = Status.Success;
      state.userProfileInfo = action.payload.user_profile_info;
      state.userAdresses = action.payload.user_adresses;
      state.notifications = action.payload.notifications;
      state.profileImage = action.payload.profile_image;
    });
    builder.addCase(getSellerInfoService.rejected, state => {
      state.loading = Status.Failed;
    });

    builder.addCase(getSellerAddressesService.pending, state => {
      state.loading = Status.Loading;
    });
    builder.addCase(getSellerAddressesService.fulfilled, (state, action) => {
      state.loading = Status.Success;
      state.sellerAddress = action.payload;
    });
    builder.addCase(getSellerAddressesService.rejected, state => {
      state.loading = Status.Failed;
    });
  },
});

export default sellerSlice.reducer;
