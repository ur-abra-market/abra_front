export {
  pageNumber,
  pageSize,
  getDeactivatedIds,
  getActivatedIds,
  getMainCheckedStatus,
  getSortedData,
  manageProductsSelector,
  getParamsSelector,
  hasChangedSelector,
  isLoadingSelector,
  totalCountSelector,
} from './selectors';

export { activateProducts, deActivateProducts, manageProducts } from './thunks';

export type {
  IProductsListRequest,
  ISupplierProductSliceInitialState,
  IProductSortOptions,
  SortType,
  IProductsSortRequest,
  IProduct,
  IProductPaginationParams,
  IProductSortParams,
} from './types';

export {
  setProductStatus,
  selectAllProducts,
  setArrayForProductsDeactivation,
  setArrayForProductsActivation,
  setPageSize,
  setPage,
  setParams,
  supplierProductReducer,
} from './supplierProductSlice';
