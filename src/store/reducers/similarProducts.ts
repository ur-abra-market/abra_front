import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { LoadingStatusEnum } from '../../common/types';
import { productService } from '../../services/product/product.service';
import {
  IProductCompilation,
  IPopularProductRequest,
} from '../../services/product/product.serviceTypes';

export const getSimilarProducts = createAsyncThunk<
  IProductCompilation[],
  IPopularProductRequest
>('similarProducts/getSimilarProducts', async (payload, { rejectWithValue }) => {
  try {
    const { result } = await productService.getSimilarProducts(payload);

    return result;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }

    return rejectWithValue('[Error]: getSimilarProducts');
  }
});

const initialState = {
  similarProducts: [] as IProductCompilation[],
  status: LoadingStatusEnum.Idle,
};

export const similarProductsSlice = createSlice({
  name: 'similarProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(getSimilarProducts.pending, state => {
      state.status = LoadingStatusEnum.Loading;
    });
    builder.addCase(getSimilarProducts.fulfilled, (state, action) => {
      state.similarProducts = action.payload;
      state.status = LoadingStatusEnum.Success;
    });
    builder.addCase(getSimilarProducts.rejected, state => {
      state.similarProducts = [];
      state.status = LoadingStatusEnum.Failed;
    });
  },
  reducers: {},
});

export const similarProductsReducer = similarProductsSlice.reducer;
