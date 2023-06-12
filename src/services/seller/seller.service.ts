import baseConfigService from '../baseConfig.service';

import {
  IGetAddressesResponse,
  ISellerNotifications,
  ResponseAddressData,
  ResponseDeleteAddress,
  SellerAddressData,
} from './seller.serviceTypes';

export const sellerService = {
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
