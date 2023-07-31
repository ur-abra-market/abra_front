import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { activateProducts, deActivateProducts, manageProducts } from './thunks';
import { IProductsListRequest, ISupplierProductSliceInitialState } from './types';

import { IActivateStatus } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';

const initialState: ISupplierProductSliceInitialState = {
  products: [],
  deactivationProductIds: [],
  activationProductIds: [],
  selectAllProducts: false,
  page_size: 20,
  page_num: 1,
};

const supplierProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page_num = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.page_size = action.payload;
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
      });
  },
});

export const supplierProductReducer = supplierProductSlice.reducer;
export const supplierProductActions = supplierProductSlice.actions;
