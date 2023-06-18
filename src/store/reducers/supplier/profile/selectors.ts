import { LoadingStatus } from '../../../../common/types';
import { ISupplierNotifications } from '../../../../services/supplier/supplier.serviceTypes';
import { RootStateType } from '../../../createStore';

import { ISupplierPersonalInfo, ISupplierBusinessProfileInfo } from './slice';

export const supplierPersonalInfoSelector = (
  state: RootStateType,
): ISupplierPersonalInfo => state.supplierProfile.personalInfo;

export const supplierBusinessProfileInfoSelector = (
  state: RootStateType,
): ISupplierBusinessProfileInfo => state.supplierProfile.businessProfileInfo;

export const supplierNotificationsSelector = (
  state: RootStateType,
): ISupplierNotifications | null => state.supplierProfile.notifications;

export const supplierLoadingSelector = (state: RootStateType): LoadingStatus =>
  state.supplierProfile.loading;
