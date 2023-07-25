import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  activateProducts,
  addFavoriteProduct,
  deActivateProducts,
  getPopularProducts,
  getProductById,
  getProductsCompilation,
  getSimilarProducts,
  manageProducts,
  removeFavoriteProduct,
} from './thunks';
import { IProductCard, IProductSliceInitialState, IProductsListRequest } from './types';

import { IActivateStatus } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';
import { IProductCompilation } from 'services/product/product.serviceTypes';

const initialState: IProductSliceInitialState = {
  isFavorite: false,
  productCard: {
    grade_average: '',
    id: null,
    name: '',
    datetime: '',
    description: '',
    is_active: false,
    uuid: '',
    total_orders: null,
    category: { name: '', level: null, id: null, parent_id: null },
    supplier: { id: null, grade_average: null, additional_info: '', license_number: '' },
    images: [],
    prices: [],
    tags: [],
    variations: [],
  },
  popularProducts: [],
  similarProducts: [],
  productsCompilation: {},
  products: [],
  deactivationProductIds: [],
  activationProductIds: [],
  selectAllProducts: false,
};

const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
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
      .addCase(activateProducts.fulfilled, state => {
        state.activationProductIds = [];
        state.deactivationProductIds = [];
        state.selectAllProducts = false;
      })
      .addCase(deActivateProducts.fulfilled, state => {
        state.deactivationProductIds = [];
        state.activationProductIds = [];
        state.selectAllProducts = false;
      })
      .addCase(
        manageProducts.fulfilled,
        (state, action: PayloadAction<IProductsListRequest[]>) => {
          state.products = action.payload;
        },
      )
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<IProductCard>) => {
        state.productCard = action.payload;
      })
      .addCase(addFavoriteProduct.fulfilled, state => {
        state.isFavorite = true;
      })
      .addCase(removeFavoriteProduct.fulfilled, state => {
        state.isFavorite = false;
      })
      .addCase(
        getSimilarProducts.fulfilled,
        (state, action: PayloadAction<IProductCompilation[]>) => {
          state.similarProducts = action.payload;
        },
      )
      .addCase(
        getPopularProducts.fulfilled,
        (state, action: PayloadAction<IProductCompilation[]>) => {
          state.popularProducts = action.payload;
        },
      )
      .addCase(getProductsCompilation.fulfilled, (state, action) => {
        state.productsCompilation = {
          ...state.productsCompilation,
          [action.payload.category]: action.payload.data,
        };
      });
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
