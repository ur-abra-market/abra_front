export {
  pageNumber,
  pageSize,
  getDeactivatedIds,
  getActivatedIds,
  getMainCheckedStatus,
  getSortedData,
  manageProductsSelector,
} from './selectors';

export { activateProducts, deActivateProducts, manageProducts } from './thunks';

export type { IProductsListRequest, ISupplierProductSliceInitialState } from './types';
