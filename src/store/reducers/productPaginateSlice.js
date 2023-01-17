import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import productPaginateFetch from '../../services/productPaginate.service';

const initialState = {
  dataProductPaginate: [],
  productActive: null,
  stateProduct: 'nothing',
};

export const productPaginateService = createAsyncThunk(
  'productPaginate/productPaginateService',
  async function (productPaginateData, { rejectWithValue }) {
    try {
      const data = await productPaginateFetch.getProductPaginateList(productPaginateData);

      return data.result;
    } catch (error) {
      const err = error.response.data.result ? error.response.data.result : error.message;

      return rejectWithValue(err);
    }
  },
);

export const productPaginateSlice = createSlice({
  name: 'productPaginate',
  initialState,
  extraReducers: bulder => {
    bulder.addCase(productPaginateService.pending, state => {
      state.dataProductPaginate = [];
      state.stateProduct = 'loading';
    });
    bulder.addCase(productPaginateService.fulfilled, (state, action) => {
      state.dataProductPaginate = action.payload;
      state.stateProduct = 'presence';
    });
    bulder.addCase(productPaginateService.rejected, state => {
      state.dataProductPaginate = [];
      state.stateProduct = 'nothing';
    });
  },
  reducers: {
    actve: (state, action) => {
      state.productActive = action.payload;
    },
  },
});

export const { actve } = productPaginateSlice.actions;
export default productPaginateSlice.reducer;
