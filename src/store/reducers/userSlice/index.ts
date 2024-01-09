export {
  getPersonalInfo,
  getFavoritesProductsService,
  updatePersonalInfo,
} from './thunks';
export {
  userPersonalInfoSelector,
  userLoadingSelector,
  favoriteProductsSelector,
} from './selectors';
export type { ILoading, IUserSliceInitialState, IUserPersonalInfo } from './types';
