import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IProductsListRequest } from './productSlice/types';

import { LoadingStatusEnum } from 'common/types';
import { productService } from 'services/product/product.service';

export const deleteProducts = createAsyncThunk<any, any>(
  'manageProducts/deleteProducts',
  async (id: number[], { rejectWithValue, dispatch }) => {
    try {
      const response = await productService.deleteList(id);

      dispatch(removeProducts(id));

      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[deleteProducts]: ERROR');
    }
  },
);

interface IManageProductsInitialState {
  products: IProductsListRequest[] | null;
  isLoading: LoadingStatusEnum;
  error: string | null;
}

const initialState: IManageProductsInitialState = {
  products: null,
  isLoading: LoadingStatusEnum.Idle,
  // isStarted: false,
  error: null,
};

const manageProductsSlice = createSlice({
  name: 'manageProducts',
  initialState,

  extraReducers: builder => {
    builder.addCase(deleteProducts.pending, state => {
      state.isLoading = LoadingStatusEnum.Loading;
      // state.isStarted = true
      state.error = null;
    });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.isLoading = LoadingStatusEnum.Success;
      state.products = action.payload;
    });
    builder.addCase(deleteProducts.rejected, (state, action) => {
      state.isLoading = LoadingStatusEnum.Failed;
      state.error = action.payload as string;
    });
  },

  reducers: {
    products: (state, action) => {
      state.products = action.payload;
    },
    removeProducts(state, action) {
      if (state.products) {
        state.products = state.products.filter(
          product => product.id !== action.payload.id,
        );
      }
    },
  },
});

export const { products, removeProducts } = manageProductsSlice.actions;
export default manageProductsSlice.reducer;
