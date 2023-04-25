import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
import { AsyncThunkConfig } from '../../services/auth.serviceType';
import {
  ISellerAddressData,
  PayloadEditAddress,
  ResponseAddAddress,
  ResponseAddressData,
  ResponseDeleteAddress,
  ResponseSellerAddressData,
  ResponseUpdateAddress,
  sellerFetch,
} from '../../services/seller.service';

export const addAddress = createAsyncThunk<
  ResponseAddAddress,
  ISellerAddressData,
  AsyncThunkConfig
>('modal/addAddress', async (params, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await sellerFetch.addAddress(params);

    dispatch(getAddress());

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[modalSlice]: Error');
  }
});
export const editAddress = createAsyncThunk<
  ResponseUpdateAddress,
  PayloadEditAddress,
  AsyncThunkConfig
>('modal/editAddress', async (params, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await sellerFetch.editAddress(params.id, params.params);

    dispatch(getAddress());

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[modalSlice]: Error');
  }
});
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
export const deleteAddress = createAsyncThunk<
  ResponseDeleteAddress,
  number,
  AsyncThunkConfig
>('modal/deleteAddress', async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await sellerFetch.deleteAddress(id);

    dispatch(getAddress());

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[modalSlice]: Error');
  }
});
export interface IAddress extends ResponseSellerAddressData {
  first_name: string;
  last_name: string;
  phone: string;
}
interface IInitialState {
  addresses: IAddress[];

  loading: Status;
}
const initialState: IInitialState = {
  addresses: [],
  loading: Status.Idle,
};

const sellerCheckoutSlice = createSlice({
  name: 'seller-checkout',
  initialState,
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
      const data = {
        first_name: 'TestFirst',
        last_name: 'TestLast',
        phone: '111111111',
      };

      state.addresses = action.payload.result.map(el => ({ ...el, ...data }));
      state.loading = Status.Success;
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
    builder.addCase(deleteAddress.pending, state => {
      state.loading = Status.Loading;
    });
    builder.addCase(deleteAddress.fulfilled, state => {
      state.loading = Status.Success;
    });
    builder.addCase(deleteAddress.rejected, state => {
      state.loading = Status.Failed;
    });
  },
});

export default sellerCheckoutSlice.reducer;
