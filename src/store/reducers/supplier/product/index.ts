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
} from './selectors';

export { activateProducts, deActivateProducts, manageProducts } from './thunks';

export type {
  IProductsListRequest,
  ISupplierProductSliceInitialState,
  IProductSortOptions,
  SortType,
  IProductsSortRequest,
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
