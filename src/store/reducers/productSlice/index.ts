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
} from './selectors';

export {
  getProductById,
  addFavoriteProduct,
  removeFavoriteProduct,
  getSimilarProducts,
  getPopularProducts,
  getProductsCompilation,
} from './thunks';
export { productReducer } from './slice';
export type {
  IProductCard,
  IProductSliceInitialState,
  IImage,
  IPrice,
  ICategory,
  ISupplier,
} from './types';
