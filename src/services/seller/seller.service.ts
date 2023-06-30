import {
  ISellerNotifications,
  ISellerAddressData,
  ISellerAddressRequest,
} from './seller.serviceTypes';

import { IServerResponse } from 'common/types';
import { baseConfigService } from 'services/baseConfig.service';

export const sellerService = {
  getSellerAvatar: async () => {
    const { data } = await baseConfigService.get('sellers/avatar/');

    return data;
  },

  getSellerAddresses: async () => {
    const { data } = await baseConfigService.get<IServerResponse<ISellerAddressData[]>>(
      'sellers/addresses/',
    );

    return data.result;
  },

  addAddress: async (params: ISellerAddressRequest) => {
    const { data } = await baseConfigService.post<Omit<IServerResponse<any>, 'result'>>(
      'sellers/addAddress/',
      params,
    );

    return data;
  },

  updateAddress: async (params: ISellerAddressRequest) => {
    const { data } = await baseConfigService.patch<Omit<IServerResponse<any>, 'result'>>(
      `sellers/updateAddress/${params.address_id}/`,
      params,
    );

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
