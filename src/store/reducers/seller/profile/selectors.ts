import { LoadingStatusEnum } from 'common/types';
import {
  ISellerAddressData,
  ISellerNotifications,
} from 'services/seller/seller.serviceTypes';
import { RootStateType } from 'store/createStore';

export const sellerNotificationSelector = (
  state: RootStateType,
): ISellerNotifications | null => state.sellerProfile.notifications;

export const sellerLoadingSelector = (state: RootStateType): LoadingStatusEnum =>
  state.sellerProfile.loading;

export const sellerAddressesSelector = (
  state: RootStateType,
): ISellerAddressData[] | null => state.sellerProfile.addresses;
