import { INumberEmployees } from '.';

import { ICountry } from 'services/common/common.serviceTypes';
import { RootStateType } from 'store/createStore';

export const numberEmployeesSelector = (state: RootStateType): INumberEmployees[] =>
  state.common.numberEmployees;
export const countriesSelector = (state: RootStateType): ICountry[] =>
  state.common.countries;
