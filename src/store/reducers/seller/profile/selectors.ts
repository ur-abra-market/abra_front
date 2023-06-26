import { LoadingStatusEnum } from '../../../../common/types';
import { ISellerNotifications } from '../../../../services/seller/seller.serviceTypes';
import { RootStateType } from '../../../createStore';

import { ISellerPersonalInfo } from './slice';

export const sellerPersonalInfoSelector = (state: RootStateType): ISellerPersonalInfo =>
  state.sellerProfile.personalInfo;

export const sellerNotificationSelector = (
  state: RootStateType,
): ISellerNotifications | null => state.sellerProfile.notifications;

export const sellerLoadingSelector = (state: RootStateType): LoadingStatusEnum =>
  state.sellerProfile.loading;
