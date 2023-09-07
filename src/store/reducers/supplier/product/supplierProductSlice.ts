import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { activateProducts, deActivateProducts, getSupplierProducts } from './thunks';
import { IProductsListResponse, ISupplierProductSliceInitialState } from './types';

const initialState: ISupplierProductSliceInitialState = {
  products: [],
  totalCount: 0,
  isLoading: false,
  deactivatedProductIds: [],
  activeProductIds: [],
  selectAllProducts: false,
  hasChanged: false,
};

const supplierProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    hasPageChanged: state => {
      state.selectAllProducts = false;
    },
    selectActiveProduct: (state, action: PayloadAction<number>) => {
      const existingIndex = state.activeProductIds.findIndex(el => el === action.payload);

      if (existingIndex !== -1) {
        // If an item with this number already exists, remove it
        state.activeProductIds.splice(existingIndex, 1);
      } else {
        // If there is no item with this number, add it
        state.activeProductIds.push(action.payload);
      }

      state.selectAllProducts = false;
    },

    selectDeactivatedProduct: (state, action: PayloadAction<number>) => {
      const existingIndex = state.deactivatedProductIds.findIndex(
        el => el === action.payload,
      );

      if (existingIndex !== -1) {
        // If an item with this number already exists, remove it
        state.deactivatedProductIds.splice(existingIndex, 1);
      } else {
        // If there is no item with this number, add it
        state.deactivatedProductIds.push(action.payload);
      }

      state.selectAllProducts = false;
    },

    selectAllProducts(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        // Find identifiers of active and deactivated products that are not yet in state.activeProductIds and state.deactivatedProductIds
        const newActiveIds = state.products
          .filter(el => el.id && !state.activeProductIds.includes(el.id) && el.is_active)
          .map(el => el.id);

        const newDeactivatedIds = state.products
          .filter(
            el => el.id && !state.deactivatedProductIds.includes(el.id) && !el.is_active,
          )
          .map(el => el.id);

        // Add new identifiers to the existing state.activeProductIds and state.deactivatedProductIds
        state.activeProductIds = [...state.activeProductIds, ...newActiveIds];
        state.deactivatedProductIds = [
          ...state.deactivatedProductIds,
          ...newDeactivatedIds,
        ];
      } else {
        // If action.payload is false (deselect all products)

        // Filter state.activeProductIds, leaving only identifiers not present in state.products
        state.activeProductIds = state.activeProductIds.filter(
          id => !state.products.some(product => product.id === id),
        );

        // Filter state.deactivatedProductIds, leaving only identifiers not present in state.products
        state.deactivatedProductIds = state.deactivatedProductIds.filter(
          id => !state.products.some(product => product.id === id),
        );
      }

      // Set the value of state.selectAllProducts to action.payload
      state.selectAllProducts = action.payload;
    },
    resetProductStatus: state => {
      state.activeProductIds = [];
      state.deactivatedProductIds = [];
      state.selectAllProducts = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSupplierProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getSupplierProducts.fulfilled,
        (state, action: PayloadAction<IProductsListResponse>) => {
          state.products = action.payload.products;
          state.totalCount = action.payload.total_count;
          state.isLoading = false;
        },
      )
      .addCase(getSupplierProducts.rejected, state => {
        state.isLoading = false;
      })
      .addCase(activateProducts.fulfilled, state => {
        state.deactivatedProductIds = [];
        state.hasChanged = !state.hasChanged;
        state.selectAllProducts = false;
      })
      .addCase(deActivateProducts.fulfilled, state => {
        state.activeProductIds = [];
        state.hasChanged = !state.hasChanged;
        state.selectAllProducts = false;
      });
  },
});

export const supplierProductReducer = supplierProductSlice.reducer;
export const {
  hasPageChanged,
  selectAllProducts,
  selectActiveProduct,
  selectDeactivatedProduct,
  resetProductStatus,
} = supplierProductSlice.actions;
