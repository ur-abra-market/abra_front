import {
  ISellerAddressData,
  ISellerAddressRequest,
  ISellerAddToCartRequest,
  ISellerAvatarResponse,
  ISellerNotifications,
  ISellersCartRequest,
  ISellerSetAmountOfProductRequest,
} from './seller.serviceTypes';

import { IBaseResponse } from 'common/types';
import { baseConfigService } from 'services/baseConfig.service';
import {
  ISellersCartResponse,
  ISellerSetAmountOfProduct,
} from 'store/reducers/seller/cart/types';
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

  getSellerCart: async ({ offset, limit }: ISellersCartRequest) => {
    const params = { offset, limit };
    const { data } = await baseConfigService.get<IBaseResponse<ISellersCartResponse[]>>(
      `sellers/cart`,
      {
        params,
      },
    );

    return data.result;
  },

  addToCart: async (params: ISellerAddToCartRequest) => {
    const { data } = await baseConfigService.put<IBaseResponse<ISellersCartResponse[]>>(
      `sellers/cart/addProduct`,
      null,
      {
        params,
      },
    );

    return data.result;
  },

  checkoutOrder: async (orderId: number) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `/sellers/orders/${orderId}/create `,
    );

    return data.result;
  },

  setAmountOfProduct: async (params: ISellerSetAmountOfProductRequest) => {
    const { data } = await baseConfigService.post<
      IBaseResponse<ISellerSetAmountOfProduct>
    >(
      `sellers/cart/orders/${params.orderId}/products/${params.productId}/setAmount`,
      null,
      {
        params: {
          bundle_variation_pod_id: params.bundle_variation_pod_id,
          amount: params.amount,
        },
      },
    );

    return data.result;
  },
};
