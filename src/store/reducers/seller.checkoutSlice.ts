import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
import { AsyncThunkConfig } from '../../services/auth.serviceType';
import { sellerFetch } from '../../services/seller.service';

export const addAddress = createAsyncThunk<{ data: any }, any, AsyncThunkConfig>(
  'modal/addAddress',
  async (params, { rejectWithValue }) => {
    try {
      return await sellerFetch.addAddress(params);
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
    addressData: [
      {
        seller_data: {
          first_name: 'Никита' as string,
          last_name: 'Лойко' as string,
        },
        seller_address_data: {
          country: 'Беларуст' as string,
          area: 'Минская' as string,
          city: 'Минск' as string,
          street: 'Бровки' as string,
          appartment: 'вффыв' as string,
          postal_code: '332' as string,
          building: '14' as string,
        },
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
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.loading = Status.Success;
      state.addressData = action.payload.data;
    });
    builder.addCase(addAddress.rejected, state => {
      state.loading = Status.Failed;
    });
  },
});

export default sellerCheckoutSlice.reducer;
