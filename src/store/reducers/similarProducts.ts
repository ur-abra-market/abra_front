import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { productService } from '../../services/product/product.service';
import {
  IProductCompilation,
  IRequestSimilarProduct,
} from '../../services/product/product.serviceTypes';

import { LoadingStatus } from 'common/types/enums/status.enum';

export const getSimilarProducts = createAsyncThunk<
  IProductCompilation[],
  IRequestSimilarProduct
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
  status: LoadingStatus.Idle,
};

export const similarProductsSlice = createSlice({
  name: 'similarProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(getSimilarProducts.pending, state => {
      state.status = LoadingStatus.Loading;
    });
    builder.addCase(getSimilarProducts.fulfilled, (state, action) => {
      state.similarProducts = action.payload;
      state.status = LoadingStatus.Success;
    });
    builder.addCase(getSimilarProducts.rejected, state => {
      state.similarProducts = [];
      state.status = LoadingStatus.Failed;
    });
  },
  reducers: {},
});

export const similarProductsReducer = similarProductsSlice.reducer;
