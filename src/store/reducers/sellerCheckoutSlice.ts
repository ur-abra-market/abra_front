import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
import { AsyncThunkConfig } from '../../services/auth.serviceType';
import {
  ISellerAddressData,
  ResponseAddAddress,
  ResponseAddressData,
  sellerFetch,
} from '../../services/seller.service';

export const addAddress = createAsyncThunk<
  ResponseAddAddress,
  ISellerAddressData,
  AsyncThunkConfig
>('modal/addAddress', async (params, { rejectWithValue }) => {
  try {
    const { data } = await sellerFetch.addAddress(params);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[modalSlice]: Error');
  }
});
export const editAddress = createAsyncThunk<ISellerAddressData, any, AsyncThunkConfig>(
  'modal/editAddress',
  async ({ address_id, param }, { rejectWithValue }) => {
    try {
      const { data } = await sellerFetch.editAddress(address_id, param);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[modalSlice]: Error');
    }
  },
);
export const getAddress = createAsyncThunk<ResponseAddressData, void, AsyncThunkConfig>(
  'modal/getAddress',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await sellerFetch.getAddress();

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[modalSlice]: Error');
    }
  },
);
const sellerCheckoutSlice = createSlice({
  name: 'seller-checkout',
  initialState: {
    seller_address: [
      {
        country: '' as string,
        area: '' as string,
        city: '' as string,
        street: '' as string,
        appartment: '' as string,
        postal_code: '' as string,
        building: '' as string,
      },
    ],
    loading: Status.Idle as Status,
    isAddress: false as boolean,
    isPayment: false as boolean,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addAddress.pending, state => {
      state.loading = Status.Loading;
    });
    builder.addCase(addAddress.fulfilled, state => {
      state.loading = Status.Success;
    });
    builder.addCase(addAddress.rejected, state => {
      state.loading = Status.Failed;
    });
    builder.addCase(getAddress.pending, state => {
      state.loading = Status.Loading;
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.loading = Status.Success;
      state.seller_address = action.payload.result.seller_address;
    });
    builder.addCase(getAddress.rejected, state => {
      state.loading = Status.Failed;
    });
    builder.addCase(editAddress.pending, state => {
      state.loading = Status.Loading;
    });
    builder.addCase(editAddress.fulfilled, state => {
      state.loading = Status.Success;
    });
    builder.addCase(editAddress.rejected, state => {
      state.loading = Status.Failed;
    });
  },
});

export default sellerCheckoutSlice.reducer;
