import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { CategoryType } from '../../pages/sellerPages/MainPage/StatusProduct/StatusProduct';
import { IRequestCategory } from '../../services/product/product.serviceTypes';

import { productService } from 'services/product/product.service';

export const productFetch = createAsyncThunk<any, IRequestCategory>(
  'product/productService',
  async (productData, { rejectWithValue }) => {
    try {
      const data = await productService.getList(productData);

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[productService]: ERROR');
    }
  },
);

const initialState = {
  dataProduct: null,
  statusProduct: 'bestsellers' as CategoryType,
  categoryProduct: 'all',
  sumProduct: 100,
  stateProduct: 'nothing',
  quantity: 0,
  max: 1000000,
  price: 8.5,
  reward: 4,
  step: 100,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder.addCase(productFetch.pending, state => {
      state.dataProduct = null;
      state.stateProduct = 'loading';
    });
    builder.addCase(productFetch.fulfilled, (state, action) => {
      state.dataProduct = action.payload;
      state.stateProduct = 'presence';
    });
    builder.addCase(productFetch.rejected, state => {
      state.dataProduct = null;
      state.stateProduct = 'nothing';
    });
  },
  reducers: {
    status: (state, action) => {
      state.statusProduct = action.payload;
    },
    category: (state, action) => {
      state.categoryProduct = action.payload;
    },
    increment: state => {
      state.quantity =
        state.quantity === state.max ? state.max : state.quantity + state.step;
    },
    decrement: state => {
      state.quantity = state.quantity === 0 ? 0 : state.quantity - state.step;
    },
    input: (state, action) => {
      const value = Math.ceil(action.payload / 100) * 100;

      if (value < 0) state.quantity = 0;
      else if (value > state.max) state.quantity = state.max;
      else state.quantity = value;
    },
  },
});
export const { status, category, input } = productSlice.actions;
export default productSlice.reducer;
