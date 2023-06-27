import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AsyncThunkConfig, LoadingStatus } from '../../common/types';
import { sellerService } from '../../services/seller/seller.service';
import {
  ResponseAddressData,
  ResponseDeleteAddress,
  SellerAddressData,
} from '../../services/seller/seller.serviceTypes';

import { getSellerAddresses } from 'store/reducers/seller/profile/thunks';

export const addAddress = createAsyncThunk<
  ResponseAddressData,
  SellerAddressData,
  AsyncThunkConfig
>('modal/addAddress', async (params, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await sellerService.addAddress(params);

    dispatch(getAddress());

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[modalSlice]: Error');
  }
});

export const editAddress = createAsyncThunk<any, any>(
  'modal/editAddress',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await sellerService.updateAddress(params);

      dispatch(getSellerAddresses());

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
      const { data } = await sellerService.getSellerAddresses();

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[modalSlice]: Error');
    }
  },
);

export const deleteAddress = createAsyncThunk<
  ResponseDeleteAddress,
  number,
  AsyncThunkConfig
>('modal/deleteAddress', async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await sellerService.deleteAddress(id);

    dispatch(getAddress());

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[modalSlice]: Error');
  }
});

interface IInitialState {
  addresses: SellerAddressData[];
  loading: LoadingStatus;
}

const initialState: IInitialState = {
  addresses: [],
  loading: LoadingStatus.Idle,
};

const sellerCheckoutSlice = createSlice({
  name: 'seller-checkout',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addAddress.pending, state => {
      state.loading = LoadingStatus.Loading;
    });
    builder.addCase(addAddress.fulfilled, state => {
      state.loading = LoadingStatus.Success;
    });
    builder.addCase(addAddress.rejected, state => {
      state.loading = LoadingStatus.Failed;
    });
    builder.addCase(getAddress.pending, state => {
      state.loading = LoadingStatus.Loading;
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.addresses = action.payload.result;
      state.loading = LoadingStatus.Success;
    });
    builder.addCase(getAddress.rejected, state => {
      state.loading = LoadingStatus.Failed;
    });
    builder.addCase(editAddress.pending, state => {
      state.loading = LoadingStatus.Loading;
    });
    builder.addCase(editAddress.fulfilled, state => {
      state.loading = LoadingStatus.Success;
    });
    builder.addCase(editAddress.rejected, state => {
      state.loading = LoadingStatus.Failed;
    });
    builder.addCase(deleteAddress.pending, state => {
      state.loading = LoadingStatus.Loading;
    });
    builder.addCase(deleteAddress.fulfilled, state => {
      state.loading = LoadingStatus.Success;
    });
    builder.addCase(deleteAddress.rejected, state => {
      state.loading = LoadingStatus.Failed;
    });
  },
});

export default sellerCheckoutSlice.reducer;
