import { INumberEmployees } from '.';

import { LoadingStatusEnum } from 'common/types';
import {
  CountriesArrayType,
  ICategoryResponse,
} from 'services/common/common.serviceTypes';
import { RootStateType } from 'store/createStore';

export const numberEmployeesSelector = (state: RootStateType): INumberEmployees[] =>
  state.common.numberEmployees;
export const countriesSelector = (state: RootStateType): CountriesArrayType =>
  state.common.countries;
export const categoriesSelector = (state: RootStateType): [] | ICategoryResponse[] =>
  state.common.categories;
export const categoriesLoadingSelector = (state: RootStateType): LoadingStatusEnum =>
  state.common.loading.categoriesLoading;
