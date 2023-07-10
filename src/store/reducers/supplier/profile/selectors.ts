import { ISupplierBusinessInfo, ILoading } from './slice';

import { ISupplierNotifications } from 'services/supplier/supplier.serviceTypes';
import { RootStateType } from 'store/createStore';

export const supplierCompanyLogoSelector = (state: RootStateType): string =>
  state.supplierProfile.businessInfo.companyLogo;
export const supplierCompanyLogoIdSelector = (state: RootStateType): number | null =>
  state.supplierProfile.businessInfo.companyLogoId;

export const supplierBusinessInfoSelector = (
  state: RootStateType,
): ISupplierBusinessInfo => state.supplierProfile.businessInfo;

export const supplierNotificationsSelector = (
  state: RootStateType,
): ISupplierNotifications | null => state.supplierProfile.notifications;

export const supplierLoadingSelector = (state: RootStateType): ILoading =>
  state.supplierProfile.loading;

export const hasPersonalInfoSelector = (state: RootStateType): boolean | null =>
  state.supplierProfile.hasPersonalInfo;

export const hasCompanyInfoSelector = (state: RootStateType): boolean | null =>
  state.supplierProfile.hasCompanyInfo;
