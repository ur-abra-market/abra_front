import { INumberEmployees } from '.';

import { CountriesArrayType } from 'services/common/common.serviceTypes';
import { RootStateType } from 'store/createStore';

export const numberEmployeesSelector = (state: RootStateType): INumberEmployees[] =>
  state.common.numberEmployees;
export const countriesSelector = (state: RootStateType): CountriesArrayType =>
  state.common.countries;
