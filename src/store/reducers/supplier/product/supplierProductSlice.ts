import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { selectedProducts, unselectedProducts, getSupplierProducts } from './thunks';
import { IProductsListResponse, ISupplierProductSliceInitialState } from './types';

const initialState: ISupplierProductSliceInitialState = {
  products: [],
  totalCount: 0,
  isLoading: false,
  unselectedProductIds: [],
  selectedProductIds: [],
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
    selectSelectedProduct: (state, action: PayloadAction<number>) => {
      const existingIndex = state.selectedProductIds.findIndex(
        el => el === action.payload,
      );

      if (existingIndex !== -1) {
        // If an item with this number already exists, remove it
        state.selectedProductIds.splice(existingIndex, 1);
      } else {
        // If there is no item with this number, add it
        state.selectedProductIds.push(action.payload);
      }

      state.selectAllProducts = false;
    },

    selectUnselectedProduct: (state, action: PayloadAction<number>) => {
      const existingIndex = state.unselectedProductIds.findIndex(
        el => el === action.payload,
      );

      if (existingIndex !== -1) {
        // If an item with this number already exists, remove it
        state.unselectedProductIds.splice(existingIndex, 1);
      } else {
        // If there is no item with this number, add it
        state.unselectedProductIds.push(action.payload);
      }

      state.selectAllProducts = false;
    },

    selectAllProducts(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        // Find identifiers of active and deactivated products that are not yet in state.selectedProductIds and state.unselectedProductIds
        const newActiveIds = state.products
          .filter(
            el => el.id && !state.selectedProductIds.includes(el.id) && el.is_active,
          )
          .map(el => el.id);

        const newDeactivatedIds = state.products
          .filter(
            el => el.id && !state.unselectedProductIds.includes(el.id) && !el.is_active,
          )
          .map(el => el.id);

        // Add new identifiers to the existing state.selectedProductIds and state.unselectedProductIds
        state.selectedProductIds = [...state.selectedProductIds, ...newActiveIds];
        state.unselectedProductIds = [
          ...state.unselectedProductIds,
          ...newDeactivatedIds,
        ];
      } else {
        // If action.payload is false (deselect all products)

        // Filter state.selectedProductIds, leaving only identifiers not present in state.products
        state.selectedProductIds = state.selectedProductIds.filter(
          id => !state.products.some(product => product.id === id),
        );

        // Filter state.unselectedProductIds, leaving only identifiers not present in state.products
        state.unselectedProductIds = state.unselectedProductIds.filter(
          id => !state.products.some(product => product.id === id),
        );
      }

      // Set the value of state.selectAllProducts to action.payload
      state.selectAllProducts = action.payload;
    },
    resetProductStatusSelection: state => {
      state.selectedProductIds = [];
      state.unselectedProductIds = [];
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
      .addCase(selectedProducts.fulfilled, state => {
        state.unselectedProductIds = [];
        state.hasChanged = !state.hasChanged;
        state.selectAllProducts = false;
      })
      .addCase(unselectedProducts.fulfilled, state => {
        state.selectedProductIds = [];
        state.hasChanged = !state.hasChanged;
        state.selectAllProducts = false;
      });
  },
});

export const supplierProductReducer = supplierProductSlice.reducer;
export const {
  hasPageChanged,
  selectAllProducts,
  selectSelectedProduct,
  selectUnselectedProduct,
  resetProductStatusSelection,
} = supplierProductSlice.actions;
