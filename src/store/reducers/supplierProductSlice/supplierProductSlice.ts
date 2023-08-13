import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { activateProducts, deActivateProducts, manageProducts } from './thunks';
import {
  IProductsListRequest,
  IProductSortOptions,
  ISupplierProductSliceInitialState,
} from './types';

import { IActivateStatus } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';

const initialState: ISupplierProductSliceInitialState = {
  products: [],
  deactivationProductIds: [],
  activationProductIds: [],
  selectAllProducts: false,
  hasChanged: false,
  page: 1,
  params: {
    offset: 0,
    limit: 20,
    ascending: true,
    categoryId: 0,
    sort: 'date',
    onSale: true,
    isActive: true,
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
      state.activationProductIds = action.payload;
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
        state.activationProductIds.push(action.payload);
      } else if (!checked && !status) {
        const index = state.activationProductIds.findIndex(el => el.id === id);

        if (index > -1) {
          state.activationProductIds.splice(index, 1);
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        manageProducts.fulfilled,
        (state, action: PayloadAction<IProductsListRequest[]>) => {
          state.products = action.payload;
        },
      )
      .addCase(activateProducts.fulfilled, state => {
        state.activationProductIds = [];
        state.deactivationProductIds = [];
        state.selectAllProducts = false;
      })
      .addCase(deActivateProducts.fulfilled, state => {
        state.deactivationProductIds = [];
        state.activationProductIds = [];
        state.selectAllProducts = false;
        state.hasChanged = !state.hasChanged;
      });
  },
});

export const supplierProductReducer = supplierProductSlice.reducer;
export const supplierProductActions = supplierProductSlice.actions;
