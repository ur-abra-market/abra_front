import { LoadingStatus } from '../../../../common/types';
import { ISupplierNotifications } from '../../../../services/supplier/supplier.serviceTypes';
import { RootStateType } from '../../../createStore';

import { ISupplierPersonalInfo } from './slice';

export const supplierPersonalInfoSelector = (
  state: RootStateType,
): ISupplierPersonalInfo => state.supplierProfile.personalInfo;
export const supplierCompanyImageSelector = (state: RootStateType): string =>
  state.supplierProfile.businessInfo.companyLogo;
export const supplierCompanyImageIdSelector = (state: RootStateType): number =>
  state.supplierProfile.businessInfo.companyLogoId;

export const supplierNotificationsSelector = (
  state: RootStateType,
): ISupplierNotifications | null => state.supplierProfile.notifications;

export const supplierLoadingSelector = (state: RootStateType): LoadingStatus =>
  state.supplierProfile.loading;
