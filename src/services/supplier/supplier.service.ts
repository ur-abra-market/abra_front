import { IServerResponse } from '../../common/types';
import { baseConfigService } from '../baseConfig.service';

import {
  ISuppliersCompanyInfoData,
  ISupplierNotifications,
  ISuppliersUpdateCompanyInfo,
} from './supplier.serviceTypes';

export const supplierService = {
  hasCompanyInfo: async () => {
    const { data } = await baseConfigService.get<IServerResponse<boolean>>(
      `suppliers/hasCompanyInfo/`,
    );

    return data.result;
  },

  hasPersonalInfo: async () => {
    const { data } = await baseConfigService.get<IServerResponse<boolean>>(
      `suppliers/hasPersonalInfo/`,
    );

    return data.result;
  },

  fetchCompanyLogo: async () => {
    const { data } = await baseConfigService.get<IServerResponse<string>>(
      `suppliers/companyLogo/`,
    );

    return data.result;
  },

  fetchBusinessInfo: async () => {
    const { data } = await baseConfigService.get<
      IServerResponse<ISuppliersCompanyInfoData>
    >(`suppliers/businessInfo/`);

    return data.result;
  },

  updateBusinessInfo: async (companyInfoData: Partial<ISuppliersUpdateCompanyInfo>) => {
    const { data } = await baseConfigService.patch<IServerResponse<boolean>>(
      `suppliers/businessInfo/update/`,
      companyInfoData,
    );

    return data.result;
  },

  getNotifications: async () => {
    const { data } = await baseConfigService.get<IServerResponse<ISupplierNotifications>>(
      `suppliers/notifications/`,
    );

    return data.result;
  },

  getProductProperties: async (categoryId: number) => {
    const { data } = await baseConfigService.get(
      `suppliers/getCategoryProperties/${categoryId}/`,
    );

    return data;
  },

  getProductVariations: async (categoryId: any) => {
    const { data } = await baseConfigService.get(
      `suppliers/getCategoryVariations/${categoryId}/`,
    );

    return data;
  },

  addProduct: async (product: any) => {
    const { data } = await baseConfigService.post(`suppliers/addProduct/`, product);

    return data;
  },

  uploadImage: async (img: any, prodId: any, index: any) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await baseConfigService.post(
      `suppliers/uploadProductImage/`,
      formData,
      {
        params: {
          product_id: prodId,
          order: index,
        },
      },
    );

    return data;
  },

  updateNotifications: async (notificationData: Partial<ISupplierNotifications>) => {
    await baseConfigService.patch<IServerResponse<boolean>>(
      `suppliers/notifications/update/`,
      notificationData,
    );
  },
};
