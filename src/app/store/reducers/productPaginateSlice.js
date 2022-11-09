import { createSlice } from '@reduxjs/toolkit';
import productPaginateFetch from "../../services/productPaginate.service";
import { createAsyncThunk } from "@reduxjs/toolkit";


const initialState= {  
  productsPage: [],  
  productActive: null,
  stateProduct: 'nothing',
  totalProducts: 0
};


export const productPaginateService = createAsyncThunk(
  "productPaginate/productPaginateService",
  async function (productPaginateData, { rejectWithValue }) {
    try {
      const data = await productPaginateFetch.getProductPaginateList(productPaginateData);      
      return data;
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message;
      return rejectWithValue(err);
    }
  }
);

export const productPaginateSlice = createSlice({
  name: 'productPaginate',
  initialState,
  extraReducers: (bulder) => {
    bulder.addCase(productPaginateService.pending, (state) => {
      state.productsPage = [];
      state.totalProducts = 0;
      state.stateProduct = 'loading';
    });
    bulder.addCase(productPaginateService.fulfilled, (state, action) => {
      state.productsPage = action.payload.result; 
      state.totalProducts = action.payload.total_products;            
      state.stateProduct = 'presence';
    });
    bulder.addCase(productPaginateService.rejected, (state) => {
      state.productsPage = [];
      state.totalProducts = 0;
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
