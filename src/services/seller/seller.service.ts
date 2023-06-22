import { IServerResponse } from '../../common/types';
import { baseConfigService } from '../baseConfig.service';

import { ISellerNotifications, ISellerAddressData } from './seller.serviceTypes';

export const sellerService = {
  getSellerAvatar: async () => {
    const { data } = await baseConfigService.get('sellers/avatar/');

    return data;
  },

  getSellerAddresses: async () => {
    const { data } = await baseConfigService.get('sellers/addresses/');

    return data;
  },

  addAddress: async (sellerAddressData: ISellerAddressData) => {
    const { data } = await baseConfigService.post(
      'sellers/addAddress/',
      sellerAddressData,
    );

    return data;
  },

  editAddress: async (editAddressData: any) => {
    const { data } = await baseConfigService.patch(`sellers/updateAddress/`, {
      ...editAddressData,
    });

    return data;
  },

  deleteAddress: (id: number) => {
    return baseConfigService.delete<IServerResponse<boolean>>(
      `sellers/removeAddress/${id}/`,
    );
  },

  getNotifications: async () => {
    const { data } = await baseConfigService.get<IServerResponse<ISellerNotifications>>(
      `sellers/notifications/`,
    );

    return data.result;
  },

  updateNotifications: async (notificationData: Partial<ISellerNotifications>) => {
    await baseConfigService.patch<IServerResponse<boolean>>(
      `sellers/notifications/update/`,
      notificationData,
    );
  },
};
