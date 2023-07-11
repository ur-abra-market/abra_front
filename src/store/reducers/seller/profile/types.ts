import { LoadingStatusEnum } from 'common/types';
import {
  ISellerAddressData,
  ISellerNotifications,
} from 'services/seller/seller.serviceTypes';

export interface ISellerAddress {
  apartment: string;
  area: string;
  building: string;
  city: string;
  country: number;
  firstName: string;
  isMain: boolean;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  street: string;
}

export interface ILoading {
  avatarLoading: LoadingStatusEnum;
  notificationsLoading: LoadingStatusEnum;
  addressesLoading: LoadingStatusEnum;
}

export interface ISellerProfileSliceInitialState {
  loading: ILoading;
  addresses: ISellerAddressData[] | null;
  notifications: ISellerNotifications | null;
  avatar: string;
}
