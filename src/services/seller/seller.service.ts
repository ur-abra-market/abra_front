import {
  ISellerNotifications,
  ISellerAddressData,
  ISellerAddressRequest,
  ISellerAvatarResponse,
} from './seller.serviceTypes';

import { IBaseResponse } from 'common/types';
import { baseConfigService } from 'services/baseConfig.service';
import { ISellerAddress } from 'store/reducers/seller/profile';

export const sellerService = {
  getSellerAvatar: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<ISellerAvatarResponse>>(
      'sellers/avatar',
    );

    return data.result;
  },

  getSellerAddresses: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<ISellerAddressData[]>>(
      'sellers/addresses',
    );

    return data.result;
  },

  createAddress: async (params: ISellerAddressRequest) => {
    const { data } = await baseConfigService.post<IBaseResponse<ISellerAddress>>(
      'sellers/addresses/add',
      params,
    );

    return data;
  },

  updateAddress: async ({ address_id, ...params }: ISellerAddressRequest) => {
    const { data } = await baseConfigService.post<IBaseResponse<ISellerAddress>>(
      `sellers/addresses/${address_id}/update`,
      params,
    );

    return data;
  },

  deleteAddress: (id: number) => {
    return baseConfigService.delete<IBaseResponse<boolean>>(
      `sellers/addresses/${id}/remove`,
    );
  },

  getNotifications: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<ISellerNotifications>>(
      `sellers/notifications`,
    );

    return data.result;
  },

  updateNotifications: async (params: Partial<ISellerNotifications>) => {
    return baseConfigService.post<IBaseResponse<boolean>>(
      `sellers/notifications/update`,
      params,
    );
  },

  updateAvatar: async (image: File) => {
    const formData = new FormData();

    formData.append('file', image);

    return baseConfigService.post<IBaseResponse<boolean>>(
      `sellers/avatar/update`,
      formData,
    );
  },
};
