import { productActions } from './slice';

export {
  favoriteProductSelector,
  productCategorySelector,
  productTotalOrdersSelector,
  productGradeSelector,
  productImagesSelector,
  productNameSelector,
  productTagsSelector,
  productVariationsSelector,
  productDescriptionSelector,
  similarProductsSelector,
  popularProductsSelector,
  productsCompilationSelector,
  productsPerPageSelector,
  productsListSelector,
  totalProductsCountSelector,
  sortFieldSelector,
} from './selectors';

export {
  getProductById,
  addFavoriteProduct,
  removeFavoriteProduct,
  getSimilarProducts,
  getPopularProducts,
  getProductsCompilation,
  getProductsListCompilation,
} from './thunks';
export {
  productReducer,
  setProductsPerPage,
  setSortField,
  setSortBy,
  setResetAllFilters,
} from './slice';
export type {
  IProductCard,
  IProductSliceInitialState,
  IImage,
  IPrice,
  ISupplier,
} from './types';
