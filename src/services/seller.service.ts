import { AxiosResponse } from 'axios';

import { IUserNotificationsData } from '../store/reducers/userSlice';

import httpService from './http.service';

export const sellerFetch = {
  getSellerInfo: async () => {
    const { data } = await httpService.get<IUserInfoFetch>('sellers/get_seller_info');

    return data;
  },
  sendSellerInfo: async (sellerData: ISellerData) => {
    const { first_name, last_name } = sellerData;

    const { data } = await httpService.post<
      '',
      AxiosResponse<SendSellerResponse>,
      Partial<ISellerProfile>
    >('sellers/send_seller_info', {
      seller_data: {
        first_name,
        last_name,
      },
    });

    return data;
  },
  getSellerAddresses: async () => {
    const { data } = await httpService.get<IGetAddressesResponse>('sellers/addresses/');

    return data;
  },
};

// get seller info interfaces

export interface IUserInfoFetch {
  result: IUserResultFetch;
}

export interface IUserResultFetch {
  user_profile_info: IUserProfile;
  user_adresses: {};
  notifications: IUserNotificationsData;
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
  appartment: string;
  postal_code: string;
}

export interface ISellerProfile {
  seller_data: ISellerData;
  seller_address_data: ISellerAddressData;
  seller_notifications_data: IUserNotificationsData;
}

export type SendSellerResponse = string | IErrorResponse;

// get addresses

export interface IGetAddressesResponse {
  result: IGetAddressesResult;
}

export interface IGetAddressesResult {
  seller_address: ISellerAddressData[];
}
