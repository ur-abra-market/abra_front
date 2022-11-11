import { createSlice } from '@reduxjs/toolkit';
import productPaginateFetch from "../../services/productPaginate.service";
import { createAsyncThunk } from "@reduxjs/toolkit";


const initialState= {  
  productsPage: [],  
  productActive: null,
  stateProduct: 'nothing',
  totalProducts: 0,
  pageSize: 20,
  amountPages: 1,
  pageNum: 1,
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
      console.log(action.payload.total_products);
      state.amountPages = Math.ceil(action.payload.total_products / state.pageSize);         
      state.stateProduct = 'presence';
    });
    bulder.addCase(productPaginateService.rejected, (state) => {
      state.productsPage = [];
      state.totalProducts = 0;
      state.amountPages = 1;
      state.stateProduct = 'nothing';
    });
  },
  reducers: {
    active: (state, action) => {
      state.productActive = action.payload;
    },  
    activeNum: (state, action) => {
      state.pageNum = action.payload;
    },  
    sizePage: (state, action) => {
      state.pageSize = action.payload;
    },     
  },
});

export const { active, amount, activeNum, sizePage } = productPaginateSlice.actions;
export default productPaginateSlice.reducer;
