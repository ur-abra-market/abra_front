import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  addFavoriteProduct,
  getPopularProducts,
  getProductById,
  getProductsCompilation,
  getSimilarProducts,
  manageProducts,
  removeFavoriteProduct,
} from './thunks';
import { IProductCard, IProductSliceInitialState, IProductsListRequest } from './types';

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
  products: null,
};

const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
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
