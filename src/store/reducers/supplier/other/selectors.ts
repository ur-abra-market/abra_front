import { IProductProperties } from './types';

import { RootStateType } from 'store/createStore';

export const productProperties = (state: RootStateType): IProductProperties[] =>
  state.supplierOther.productProperties;
