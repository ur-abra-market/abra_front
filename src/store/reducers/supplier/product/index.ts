export {
  pageNumber,
  pageSize,
  getDeactivatedIds,
  getActiveIds,
  getMainCheckedStatus,
  getSortedData,
  supplierProductsSelector,
  getParamsSelector,
  hasChangedSelector,
  isLoadingSelector,
  totalCountSelector,
} from './selectors';

export { activateProducts, deActivateProducts, getSupplierProducts } from './thunks';

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
