import { createSlice } from '@reduxjs/toolkit';
import productFetch from "../../services/product.service";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const productService = createAsyncThunk(
  "product/productService",
  async function (productData, { rejectWithValue }) {
    try {
      const data = await productFetch.getList(productData);
      return data.result;
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message;
      return rejectWithValue(err);
    }
  }
);


const initialState = {
  dataProduct: null,
  statusProduct: 'bestsellers',
  categoryProduct: 'all',
  sumProduct: 100,
  stateProduct: 'nothing',
  quantity: 0,
  max: 100,
  price: 8.50,
  reward: 4
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (bulder) => {
    bulder.addCase(productService.pending, (state) => {
      state.dataProduct = null;
      state.stateProduct = 'loading';
    });
    bulder.addCase(productService.fulfilled, (state, action) => {
      state.dataProduct = action.payload;
      state.stateProduct = 'presence';
    });
    bulder.addCase(productService.rejected, (state) => {
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
    increment: (state) => {
      state.quantity = state.quantity === state.max ? state.max : state.quantity + 1;
    },
    decrement: (state) => {
      state.quantity = state.quantity === 0 ? 0 : state.quantity - 1;
    },
    input: (state, action) => {
      if (action.payload < 0) state.quantity = 0
      else if (action.payload >  state.max) state.quantity = state.max
      else state.quantity = action.payload;
    },
  },
});
export const { status, category, increment, decrement, input } = productSlice.actions;
export default productSlice.reducer;
