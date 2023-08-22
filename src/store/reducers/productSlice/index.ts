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
} from './selectors';

export {
  getProductById,
  addFavoriteProduct,
  removeFavoriteProduct,
  getSimilarProducts,
  getPopularProducts,
  getProductsCompilation,
} from './thunks';
export { productReducer, setProductsPerPage } from './slice';
export type {
  IProductCard,
  IProductSliceInitialState,
  IImage,
  IPrice,
  ISupplier,
} from './types';
