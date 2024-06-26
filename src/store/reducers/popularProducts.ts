import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from 'enums/status.enum';
import { IRequestPopularProduct } from 'interfaces';
import { productFetch } from 'services/product.service';

export const getPopularProductsById = createAsyncThunk<[], IRequestPopularProduct>(
  'popularProducts/getPopularProducts',
  async (payload, { rejectWithValue }) => {
    try {
      const { result } = await productFetch.getPopularProductById(payload);

      return result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: getPopularProductsById');
    }
  },
);

const initialState = {
  popularProducts: [],
  status: Status.Idle,
};

export const popularProductsSlice = createSlice({
  name: 'popularProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPopularProductsById.pending, state => {
      state.status = Status.Loading;
    });
    builder.addCase(getPopularProductsById.fulfilled, (state, action) => {
      state.popularProducts = action.payload;
      state.status = Status.Success;
    });
    builder.addCase(getPopularProductsById.rejected, state => {
      state.popularProducts = [];
      state.status = Status.Failed;
    });
  },
  reducers: {},
});

export const popularProductsReducer = popularProductsSlice.reducer;
