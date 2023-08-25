import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { activateProducts, deActivateProducts, getSupplierProducts } from './thunks';
import {
  IProductsListRequest,
  IProductSortOptions,
  ISupplierProductSliceInitialState,
} from './types';

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
      state.selectAllProducts = false;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.params.limit = action.payload;
    },
    setParams: (state, action: PayloadAction<IProductSortOptions>) => {
      state.params = action.payload;
    },
    selectActiveProduct: (state, action: PayloadAction<number>) => {
      const existingIndex = state.activeProductIds.findIndex(el => el === action.payload);

      if (existingIndex !== -1) {
        // Если элемент с таким числом уже есть, удаляем его
        state.activeProductIds.splice(existingIndex, 1);
      } else {
        // Если элемента с таким числом нет, добавляем его
        state.activeProductIds.push(action.payload);
      }

      state.selectAllProducts = false;
    },

    selectAllProducts(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        // Если action.payload истинен (выбраны все продукты)

        // Находим идентификаторы продуктов, которых еще нет в state.activeProductIds
        const newIds = state.products
          .filter(el => el.id && !state.activeProductIds.includes(el.id))
          .map(el => el.id);

        // Добавляем новые идентификаторы к существующим в state.activeProductIds
        state.activeProductIds = [...state.activeProductIds, ...newIds];
      } else {
        // Если action.payload ложен (снимаем выбор со всех продуктов)

        // Фильтруем state.activeProductIds, оставляя только идентификаторы, которые не присутствуют в state.products
        state.activeProductIds = state.activeProductIds.filter(
          id => !state.products.some(product => product.id === id),
        );
      }

      // Устанавливаем значение state.selectAllProducts равным action.payload
      state.selectAllProducts = action.payload;
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
export const { setPage, setPageSize, selectAllProducts, selectActiveProduct, setParams } =
  supplierProductSlice.actions;
