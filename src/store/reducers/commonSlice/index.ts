export { getCountries, getCompanyNumberEmployees, getAllCategories } from './thunks';
export {
  numberEmployeesSelector,
  countriesSelector,
  selectedCategoryId,
  categoriesSelector,
  categoriesLoadingSelector,
} from './selectors';
export type { INumberEmployees, IInitialState } from './types';
