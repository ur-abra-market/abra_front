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
} from './types';
