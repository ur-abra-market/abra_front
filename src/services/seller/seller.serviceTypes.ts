// get seller info interfaces

import { IUserNotificationsData } from '../../store/reducers/userSlice';

export interface IUserInfoFetch {
  result: IUserResultFetch;
}

export interface IUserResultFetch {
  user_profile_info: IUserProfile;
  user_adresses: {};
  notifications: IUserNotificationsData; // notifications: IUserNotificationsData;
  profile_image: {
    null: null;
  };
}
interface IUserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

// send seller info interfaces

interface IErrorDetail {
  loc: [string, number];
  msg: string;
  type: string;
}

// TODO - одинаковые с ISendSellerErrorResponse
export interface IErrorResponse {
  detail: IErrorDetail[];
}

export interface ISellerData {
  first_name: string;
  last_name: string;
}

export interface ISellerAddressData {
  country: string;
  area: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  postal_code: string;
}
export interface PayloadEditAddress {
  id: number;
  params: ISellerAddressData;
}

export interface SellerAddressData {
  phone_country_code: string;
  phone_number: string;
  address_id: number;
  first_name: string;
  last_name: string;
  id: number;
  country: string;
  area: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  postal_code: string;
}

export interface EditAddressData {
  id: number;
  data: SellerAddressData;
}
export interface ResponseAddressData {
  ok: boolean;
  result: SellerAddressData[];
}
export interface ResponseDeleteAddress {
  ok: boolean;
  result: boolean;
}

export interface ISellerProfile {
  seller_data: ISellerData;
  seller_address_data: ISellerAddressData;
  seller_notifications_data: IUserNotificationsData;
  // seller_notifications_data: IUserNotificationsData;
}

export interface ISendSellerResponse {
  detail: IErrorDetail[] | string;
}

// get addresses

export interface IGetAddressesResponse {
  result: IGetAddressesResult;
}

export interface IGetAddressesResult {
  seller_address: ISellerAddressData[];
}
