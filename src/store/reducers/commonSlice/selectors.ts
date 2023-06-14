import { ICountry } from '../../../services/common/common.serviceTypes';
import { RootStateType } from '../../createStore';

import { INumberEmployees } from './slice';

export const numberEmployeesSelector = (state: RootStateType): INumberEmployees[] =>
  state.common.numberEmployees;
export const countriesSelector = (state: RootStateType): ICountry[] =>
  state.common.countries;
