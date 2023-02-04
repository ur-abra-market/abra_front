import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import productPaginateFetch from '../../services/productPaginate.service';

const initialState = {
  productsPage: [],
  productActive: null,
  stateProduct: 'nothing',
  totalProducts: 0,
  pageSize: 20,
  amountPages: 1,
  pageNum: 1,
};

export const productPaginateService = createAsyncThunk<any, any>(
  'productPaginate/productPaginateService',
  async function (productPaginateData, { rejectWithValue }) {
    try {
      const data = await productPaginateFetch.getProductPaginateList(productPaginateData);

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[productPaginateService]: ERROR');
    }
  },
);

export const productPaginateSlice = createSlice({
  name: 'productPaginate',
  initialState,
  extraReducers: bulder => {
    bulder.addCase(productPaginateService.pending, state => {
      state.productsPage = [];
      state.totalProducts = 0;
      state.stateProduct = 'loading';
    });
    bulder.addCase(productPaginateService.fulfilled, (state, action) => {
      state.productsPage = action.payload.result;
      state.totalProducts = action.payload.total_products;
      state.amountPages = Math.ceil(action.payload.total_products / state.pageSize);
      state.stateProduct = 'presence';
    });
    bulder.addCase(productPaginateService.rejected, state => {
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
    amount: () => {
      // TODO заглушка так как возможно amount перезатерся в процессе merge
    },
  },
});

export const { active, amount, activeNum, sizePage } = productPaginateSlice.actions;
export default productPaginateSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//
// import productPaginateFetch from '../../services/productPaginate.service';
//
// const initialState = {
//   dataProductPaginate: [],
//   productActive: null,
//   stateProduct: 'nothing',
// };
//
// export const productPaginateService = createAsyncThunk(
//   'productPaginate/productPaginateService',
//   async function (productPaginateData, { rejectWithValue }) {
//     try {
//       const data = await productPaginateFetch.getProductPaginateList(productPaginateData);
//
//       return data.result;
//     } catch (error) {
//       const err = error.response.data.result ? error.response.data.result : error.message;
//
//       return rejectWithValue(err);
//     }
//   },
// );
//
// export const productPaginateSlice = createSlice({
//   name: 'productPaginate',
//   initialState,
//   extraReducers: bulder => {
//     bulder.addCase(productPaginateService.pending, state => {
//       state.dataProductPaginate = [];
//       state.stateProduct = 'loading';
//     });
//     bulder.addCase(productPaginateService.fulfilled, (state, action) => {
//       state.dataProductPaginate = action.payload;
//       state.stateProduct = 'presence';
//     });
//     bulder.addCase(productPaginateService.rejected, state => {
//       state.dataProductPaginate = [];
//       state.stateProduct = 'nothing';
//     });
//   },
//   reducers: {
//     actve: (state, action) => {
//       state.productActive = action.payload;
//     },
//   },
// });
//
// export const { actve } = productPaginateSlice.actions;
// export default productPaginateSlice.reducer;
