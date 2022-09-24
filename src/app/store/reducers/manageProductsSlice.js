import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchManageProducts from '../../services/manageProducts.service';

export const manageProductsService = createAsyncThunk(
  'supplierAccount/manageProductsService',

  async function (manageProductsData, { rejectWithValue }) {
    try {
      const data = await fetchManageProducts.getList(manageProductsData);
      return data;
    } catch (error) {
      const err = error.response.data.result ? error.response.data.result : error.message;
      return rejectWithValue(err);
    }
  },
);

const manageProductsSlice = createSlice({
  name: 'manageProducts',
  initialState: {
    products: null,
    status: null,
    error: null,
  },
  reducers: {
    products: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [manageProductsService.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [manageProductsService.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.products = action.payload;
    },
    [manageProductsService.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { products } = manageProductsSlice.actions;
export default manageProductsSlice.reducer;
