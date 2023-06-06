import { RootStateType } from '../../createStore';

import { INumberEmployees } from './slice';

export const numberEmployeesSelector = (state: RootStateType): INumberEmployees[] =>
  state.common.numberEmployees;
