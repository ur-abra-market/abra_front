import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
import { AsyncThunkConfig } from '../../services/auth.serviceType';
import {
  ISellerAddressData,
  PayloadEditAddress,
  ResponseAddAddress,
  ResponseAddressData,
  ResponseDeleteAddress,
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
const sellerCheckoutSlice = createSlice({
  name: 'seller-checkout',
  initialState: {
    seller_address: [
      {
        id: 0 as number,
        user_id: 0 as number,
        country: '' as string,
        area: '' as string,
        city: '' as string,
        street: '' as string,
        apartment: '' as string,
        postal_code: '' as string,
        building: '' as string,
      },
    ],
    loading: Status.Idle as Status,
    selected: false as boolean,
  },
  reducers: {
    changeSelected(state, action: PayloadAction<{ selected: boolean }>) {
      state.selected = action.payload.selected;
    },
  },
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
      state.seller_address = action.payload.result;
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

export const { changeSelected } = sellerCheckoutSlice.actions;

export default sellerCheckoutSlice.reducer;
