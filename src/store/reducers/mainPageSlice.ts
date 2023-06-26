import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { productService } from '../../services/product/product.service';
import { ICategoryRequest } from '../../services/product/product.serviceTypes';

export interface MainPageInitialState {
  products?: { [key: number]: any[] };
  isLoading: boolean;
  error: string;
}

const initialState: MainPageInitialState = {
  products: {},
  isLoading: false,
  error: '',
};

export const fetchProductList = createAsyncThunk<any, ICategoryRequest>(
  'mainPageProducts/fetchProductsList',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productService.getList(productData);

      return {
        data: response,
        category: productData.category_id,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[fetchProductsList]: ERROR');
    }
  },
);

const mainPageSlice = createSlice({
  name: 'mainPageProducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProductList.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.products = {
        ...state.products,
        [action.payload.category]: action.payload.data,
      };
      state.isLoading = false;
    });
    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const mainPageReducer = mainPageSlice.reducer;
