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
} from './selectors';

export {
  getProductById,
  addFavoriteProduct,
  removeFavoriteProduct,
  getSimilarProducts,
  getPopularProducts,
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
