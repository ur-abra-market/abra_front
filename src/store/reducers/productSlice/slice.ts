import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  addFavoriteProduct,
  addFavoriteProductPage,
  getBreadCrumbs,
  getPopularProducts,
  getProductById,
  getProductsCompilation,
  getProductsListCompilation,
  getSimilarProducts,
  removeFavoriteProduct,
  removeFavoriteProductPage,
} from './thunks';
import {
  ISelectedBundle,
  IFavorite,
  IProductSliceInitialState,
  IResponseGetProductCardId,
  ISortBy,
  ISortField,
} from './types';

import { LoadingStatusEnum } from 'common/types';
import { IProductCompilation } from 'services/product/product.serviceTypes';

const initialState: IProductSliceInitialState = {
  isFavorite: false,
  productsPerPage: 20,
  productCard: {
    breadcrumbs: [],
    id: null,
    created_at: '',
    updated_at: '',
    name: '',
    description: '',
    grade_average: '',
    total_orders: null,
    is_active: false,
    is_favorite: false,
    category: {
      id: null,
      created_at: '',
      updated_at: '',
      name: '',
      level: null,
      parent_id: null,
    },
    supplier: {
      id: null,
      created_at: '',
      updated_at: '',
      license_number: '',
      grade_average: null,
      additional_info: '',
      user: {
        first_name: '',
        last_name: '',
        is_verified: false,
      },
      company: {
        id: null,
        created_at: '',
        updated_at: '',
        business_email: '',
        name: '',
        is_manufacturer: false,
        year_established: null,
        employees_number_id: null,
        description: '',
        address: '',
        logo_url: '',
      },
    },
    images: [],
    tags: [],
    bundle_variation_pods: [],
    bundles: [],
    property_types: [],
  },
  feedbacks: {},
  popularProducts: [],
  similarProducts: [],
  productsCompilation: {},
  loading: LoadingStatusEnum.Idle,
  productsList: [],
  sortField: 'rating',
  sortBy: 'desc',
  totalProductsCount: 0,
  selectedBundle: {
    type: 'size',
    bundle: {
      id: 0,
      created_at: '',
      updated_at: '',
      product: '',
      prices: [
        {
          id: 0,
          created_at: '',
          updated_at: '',
          bundle_id: 0,
          price: 0,
          discount: 0,
          start_date: '',
          end_date: '',
          min_quantity: 100,
          bundle: '',
        },
      ],
      pickable_variations: [],
      variation_values: [],
    },
  },
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
    setActiveBundle: (state, action: PayloadAction<ISelectedBundle>) => {
      state.selectedBundle = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<IResponseGetProductCardId>) => {
          state.productCard = action.payload.product;
          state.feedbacks = action.payload.feedbacks;
        },
      )
      .addCase(
        addFavoriteProduct.fulfilled,
        (state, action: PayloadAction<IFavorite>) => {
          const isFindProduct = (product: IProductCompilation): boolean =>
            product.id === action.payload.product_id;

          const product = state.productsList.find(isFindProduct);

          if (product) {
            product.is_favorite = true;
          } else {
            Object.values(state.productsCompilation).forEach(products => {
              const product = products.find(isFindProduct);

              if (product) {
                product.is_favorite = true;
              }
            });
          }
        },
      )
      .addCase(
        removeFavoriteProduct.fulfilled,
        (state, action: PayloadAction<IFavorite>) => {
          const isFindProduct = (product: IProductCompilation): boolean =>
            product.id === action.payload.product_id;

          const product = state.productsList.find(isFindProduct);

          if (product) {
            product.is_favorite = false;
          } else {
            Object.values(state.productsCompilation).forEach(products => {
              const product = products.find(isFindProduct);

              if (product) {
                product.is_favorite = false;
              }
            });
          }
        },
      )
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
      .addCase(addFavoriteProductPage.fulfilled, (state, action) => {
        state.productCard.is_favorite = action.payload;
      })
      .addCase(removeFavoriteProductPage.fulfilled, (state, action) => {
        state.productCard.is_favorite = action.payload;
      })
      .addCase(getBreadCrumbs.fulfilled, (state, action) => {
        state.productCard.breadcrumbs = action.payload;
      });
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const {
  setProductsPerPage,
  setSortField,
  setSortBy,
  setResetAllFilters,
  setActiveBundle,
} = productActions;
