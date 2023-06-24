import { LoadingStatusEnum } from '../../../../common/types';
import { ISellerNotifications } from '../../../../services/seller/seller.serviceTypes';
import { RootStateType } from '../../../createStore';

export const sellerNotificationSelector = (
  state: RootStateType,
): ISellerNotifications | null => state.sellerProfile.notifications;

export const sellerLoadingSelector = (state: RootStateType): LoadingStatusEnum =>
  state.sellerProfile.loading;
