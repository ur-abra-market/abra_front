import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { productFetch } from '../../services/product.service';

const initialState = {
  products: {},
  isLoading: false,
  error: null,
};

export const fetchProductList = createAsyncThunk(
  'mainPageProducts/fetchProductsList',
  async (productData, { rejectWithValue }) => {
    // productData: { type: 'bestsellers' | 'new' | 'rating' | 'hot', category: 1 | 2 | 3 }
    try {
      const response = await productFetch.getList(productData);

      return {
        data: response,
        category: productData.category || 'all',
      };
    } catch (e) {
      return rejectWithValue(e);
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
      state.error = null;
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
      state.error = action.payload;
    });
  },
});

export const mainPageReducer = mainPageSlice.reducer;
