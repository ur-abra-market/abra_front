import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { activateProducts, deActivateProducts, getSupplierProducts } from './thunks';
import {
  IProductsListRequest,
  IProductSortOptions,
  ISupplierProductSliceInitialState,
} from './types';

import { IActivateStatus } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';

const initialState: ISupplierProductSliceInitialState = {
  products: [],
  totalCount: 0,
  isLoading: false,
  deactivationProductIds: [],
  activeProductIds: [],
  selectAllProducts: false,
  hasChanged: false,
  page: 1,
  params: {
    offset: 0,
    limit: 20,
    ascending: false,
    categoryIds: [],
    sort: 'date',
  },
};

const supplierProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.params.limit = action.payload;
    },
    setParams: (state, action: PayloadAction<IProductSortOptions>) => {
      state.params = action.payload;
    },
    selectAllProducts(state, action: PayloadAction<boolean>) {
      state.selectAllProducts = action.payload;
    },
    setArrayForProductsDeactivation(state, action: PayloadAction<IActivateStatus[]>) {
      state.deactivationProductIds = action.payload;
    },
    setArrayForProductsActivation(state, action: PayloadAction<IActivateStatus[]>) {
      state.activeProductIds = action.payload;
    },
    setProductStatus(state, action: PayloadAction<IActivateStatus>) {
      const { checked, id, status } = action.payload;

      if (checked && status) {
        state.deactivationProductIds.push(action.payload);
      } else if (!checked && status) {
        const index = state.deactivationProductIds.findIndex(el => el.id === id);

        if (index > -1) {
          state.deactivationProductIds.splice(index, 1);
        }
      } else if (checked && !status) {
        state.activeProductIds.push(action.payload);
      } else if (!checked && !status) {
        const index = state.activeProductIds.findIndex(el => el.id === id);

        if (index > -1) {
          state.activeProductIds.splice(index, 1);
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSupplierProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getSupplierProducts.fulfilled,
        (state, action: PayloadAction<IProductsListRequest>) => {
          state.products = action.payload.products;
          state.totalCount = action.payload.total_count;
          state.isLoading = false;
        },
      )
      .addCase(getSupplierProducts.rejected, state => {
        state.isLoading = false;
      })
      .addCase(activateProducts.fulfilled, state => {
        state.activeProductIds = [];
        state.deactivationProductIds = [];
        state.selectAllProducts = false;
      })
      .addCase(deActivateProducts.fulfilled, state => {
        state.deactivationProductIds = [];
        state.activeProductIds = [];
        state.selectAllProducts = false;
        state.hasChanged = !state.hasChanged;
      });
  },
});

export const supplierProductReducer = supplierProductSlice.reducer;
export const {
  setPage,
  setPageSize,
  selectAllProducts,
  setProductStatus,
  setArrayForProductsDeactivation,
  setArrayForProductsActivation,
  setParams,
} = supplierProductSlice.actions;
