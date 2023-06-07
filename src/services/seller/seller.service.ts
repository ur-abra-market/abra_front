import { AxiosResponse } from 'axios';

import baseConfigService from '../baseConfig.service';
import { ISupplierNotifications } from '../supplier/supplier.serviceTypes';

import {
  IGetAddressesResponse,
  ISellerData,
  ISellerNotifications,
  ISellerProfile,
  ISendSellerResponse,
  ResponseAddressData,
  ResponseDeleteAddress,
  SellerAddressData,
} from './seller.serviceTypes';

export const sellerService = {
  getSellerInfo: async () => {
    const { data } = await baseConfigService.get('sellers/getSellerInfo');

    return data;
  },
  sendSellerInfo: async (sellerData: ISellerData) => {
    const { first_name, last_name } = sellerData;

    const { data } = await baseConfigService.post<
      ISendSellerResponse,
      AxiosResponse<ISendSellerResponse>,
      Partial<ISellerProfile>
    >('sellers/sendSellerInfo', {
      seller_data: {
        first_name,
        last_name,
      },
    });

    return data;
  },

  getSellerAddresses: async () => {
    const { data } = await baseConfigService.get<IGetAddressesResponse>(
      'sellers/addresses/',
    );

    return data;
  },

  addAddress: (params: SellerAddressData) => {
    return baseConfigService.post<ResponseAddressData>('sellers/addAddress', params);
  },

  getAddress: () => {
    return baseConfigService.get<ResponseAddressData>('sellers/addresses');
  },

  editAddress: (id: number, params: SellerAddressData) => {
    return baseConfigService.patch<ResponseAddressData>(`sellers/updateAddress`, {
      ...params,
      id,
    });
  },

  deleteAddress: (id: number) => {
    return baseConfigService.delete<ResponseDeleteAddress>(`sellers/removeAddress/${id}`);
  },

  getNotifications: async () => {
    const { data } = await baseConfigService.get(`sellers/notifications/`);

    return data.result;
  },

  updateNotifications: async (notifications: ISellerNotifications) => {
    const { data } = await baseConfigService.patch(
      `sellers/notifications/update/`,
      notifications,
    );

    return data.result;
  },
};
