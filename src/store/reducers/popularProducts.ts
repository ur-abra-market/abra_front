import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IRequestPopularProduct } from '../../services/product/product.serviceTypes';

import { LoadingStatus } from 'common/types/enums/status.enum';
import { productService } from 'services/product/product.service';

export const getPopularProductsById = createAsyncThunk<[], IRequestPopularProduct>(
  'popularProducts/getPopularProducts',
  async (payload, { rejectWithValue }) => {
    try {
      const { result } = await productService.getPopularProductById(payload);

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
  status: LoadingStatus.Idle,
};

export const popularProductsSlice = createSlice({
  name: 'popularProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPopularProductsById.pending, state => {
      state.status = LoadingStatus.Loading;
    });
    builder.addCase(getPopularProductsById.fulfilled, (state, action) => {
      state.popularProducts = action.payload;
      state.status = LoadingStatus.Success;
    });
    builder.addCase(getPopularProductsById.rejected, state => {
      state.popularProducts = [];
      state.status = LoadingStatus.Failed;
    });
  },
  reducers: {},
});

export const popularProductsReducer = popularProductsSlice.reducer;
