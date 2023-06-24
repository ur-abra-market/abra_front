import { LoadingStatusEnum } from '../../../../common/types';
import { ISupplierNotifications } from '../../../../services/supplier/supplier.serviceTypes';
import { RootStateType } from '../../../createStore';

import { ISupplierPersonalInfo, ISupplierBusinessInfo } from './slice';

export const supplierPersonalInfoSelector = (
  state: RootStateType,
): ISupplierPersonalInfo => state.supplierProfile.personalInfo;
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

export const supplierLoadingSelector = (state: RootStateType): LoadingStatusEnum =>
  state.supplierProfile.loading;
