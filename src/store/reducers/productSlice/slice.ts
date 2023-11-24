import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  addFavoriteProduct,
  getPopularProducts,
  getProductById,
  getProductsBySearch,
  getProductsCompilation,
  getProductsListCompilation,
  getSimilarProducts,
  removeFavoriteProduct,
} from './thunks';
import { IProductCard, IProductSliceInitialState, ISortField, ISortBy } from './types';

import { LoadingStatusEnum } from 'common/types';
import { IProductCompilation } from 'services/product/product.serviceTypes';

const initialState: IProductSliceInitialState = {
  isFavorite: false,
  productsPerPage: 20,
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
  loading: LoadingStatusEnum.Idle,
  productsList: [],
  sortField: 'rating',
  sortBy: 'desc',
  totalProductsCount: 0,
};

const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setProductsPerPage: (state, action: PayloadAction<number>) => {
      state.productsPerPage = action.payload;
    },
    setSortField: (state, action: PayloadAction<ISortField>) => {
      state.sortField = action.payload;
    },
    setSortBy: (state, action: PayloadAction<ISortBy>) => {
      state.sortBy = action.payload;
    },
    setResetAllFilters: state => {
      state.sortField = 'rating';
      state.sortBy = 'desc';
    },
  },
  extraReducers: builder => {
    builder
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

      .addCase(getProductsCompilation.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getProductsCompilation.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })
      .addCase(getProductsCompilation.fulfilled, (state, action) => {
        state.productsCompilation = {
          ...state.productsCompilation,
          [action.payload.category]: action.payload.data.products,
        };

        state.loading = LoadingStatusEnum.Success;
      })

      .addCase(getProductsListCompilation.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getProductsListCompilation.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })
      .addCase(getProductsListCompilation.fulfilled, (state, action) => {
        state.productsList = action.payload.data.products;
        state.totalProductsCount = action.payload.data.total_count;
        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(getProductsBySearch.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getProductsBySearch.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })
      .addCase(getProductsBySearch.fulfilled, (state, action) => {
        state.productsList = action.payload.data.products;
        state.totalProductsCount = action.payload.data.total_count;
        state.loading = LoadingStatusEnum.Success;
      });
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const { setProductsPerPage, setSortField, setSortBy, setResetAllFilters } =
  productActions;
