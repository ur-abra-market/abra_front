import { RootStateType } from '../../../createStore';

import { ISupplierPersonalInfo } from './slice';

export const supplierPersonalInfoSelector = (
  state: RootStateType,
): ISupplierPersonalInfo => state.supplierAccount.personalInfo;
