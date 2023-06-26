import { IServerResponse } from '../../common/types';
import baseConfigService from '../baseConfig.service';

import {
  ISellerNotifications,
  ResponseDeleteAddress,
  SellerAddressData,
} from './seller.serviceTypes';

export const sellerService = {
  getSellerAvatar: async () => {
    const { data } = await baseConfigService.get('sellers/avatar/');

    return data;
  },

  getSellerAddresses: async () => {
    const { data } = await baseConfigService.get('sellers/addresses/');

    return data;
  },

  addAddress: async (params: SellerAddressData) => {
    const { data } = await baseConfigService.post('sellers/addAddress/', params);

    return data;
  },

  editAddress: async (params: any) => {
    const { data } = await baseConfigService.patch(`sellers/updateAddress/`, {
      ...params,
    });

    return data;
  },

  deleteAddress: (id: number) => {
    return baseConfigService.delete<ResponseDeleteAddress>(
      `sellers/removeAddress/${id}/`,
    );
  },

  getNotifications: async () => {
    const { data } = await baseConfigService.get<IServerResponse<ISellerNotifications>>(
      `sellers/notifications/`,
    );

    return data.result;
  },

  updateNotifications: async (notification: Partial<ISellerNotifications>) => {
    await baseConfigService.patch<IServerResponse<boolean>>(
      `sellers/notifications/update/`,
      notification,
    );
  },
};
