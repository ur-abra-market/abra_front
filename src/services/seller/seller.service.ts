import { ISellerNotifications, ISellerAddressData } from './seller.serviceTypes';

import { IServerResponse } from 'common/types';
import { baseConfigService } from 'services/baseConfig.service';

export const sellerService = {
  getSellerAvatar: async () => {
    const { data } = await baseConfigService.get('sellers/avatar/');

    return data;
  },

  getSellerAddresses: async () => {
    const { data } = await baseConfigService.get('sellers/addresses/');

    return data.result;
  },

  addAddress: async (params: ISellerAddressData) => {
    const { data } = await baseConfigService.post('sellers/addAddress/', params);

    return data;
  },

  updateAddress: async (params: any) => {
    const { data } = await baseConfigService.patch(`sellers/updateAddress/`, {
      ...params,
    });

    return data;
  },

  deleteAddress: (id: number) => {
    return baseConfigService.delete<IServerResponse<boolean>>(
      `sellers/removeAddress/${id}/`,
    );
  },

  fetchNotifications: async () => {
    const { data } = await baseConfigService.get<IServerResponse<ISellerNotifications>>(
      `sellers/notifications/`,
    );

    return data.result;
  },

  updateNotifications: async (params: Partial<ISellerNotifications>) => {
    await baseConfigService.patch<IServerResponse<boolean>>(
      `sellers/notifications/update/`,
      params,
    );
  },
};
