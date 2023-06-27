import { IServerResponse } from '../../common/types';
import { baseConfigService } from '../baseConfig.service';

import {
  ISupplierBusinessInfo,
  ISupplierNotifications,
  ISupplierUpdateBusinessInfo,
  IBusinessInfoRequest,
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

  createBusinessInfo: async (params: IBusinessInfoRequest) => {
    const { data } = await baseConfigService.post(`register/business/sendInfo/`, params);

    return data;
  },

  fetchCompanyLogo: async () => {
    const { data } = await baseConfigService.get<IServerResponse<string>>(
      `suppliers/companyLogo/`,
    );

    return data.result;
  },

  fetchBusinessInfo: async () => {
    const { data } = await baseConfigService.get<IServerResponse<ISupplierBusinessInfo>>(
      `suppliers/businessInfo/`,
    );

    return data.result;
  },

  updateBusinessInfo: async (params: Partial<ISupplierUpdateBusinessInfo>) => {
    const { data } = await baseConfigService.patch<IServerResponse<boolean>>(
      `suppliers/businessInfo/update/`,
      params,
    );

    return data.result;
  },

  fetchNotifications: async () => {
    const { data } = await baseConfigService.get<IServerResponse<ISupplierNotifications>>(
      `suppliers/notifications/`,
    );

    return data.result;
  },

  getProductProperties: async (categoryId: any) => {
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

  addProduct: async (params: any) => {
    const { data } = await baseConfigService.post(`suppliers/addProduct/`, params);

    return data;
  },

  uploadProductImage: async (img: File, prodId: number, index: number) => {
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

  uploadCompanyLogo: async (image: File) => {
    const formData = new FormData();

    formData.append('file', image);

    const { data } = await baseConfigService.post<
      IServerResponse<{
        id: number;
        url: string;
      }>
    >('suppliers/companyLogo/update/', formData);

    return data;
  },

  deleteCompanyLogo: async (company_image_id: number) => {
    const { data } = await baseConfigService.delete<IServerResponse<boolean>>(
      `suppliers/deleteCompanyImage/`,
      { params: { company_image_id } },
    );

    return data;
  },

  updateNotifications: async (params: Partial<ISupplierNotifications>) => {
    await baseConfigService.patch<IServerResponse<boolean>>(
      `suppliers/notifications/update/`,
      params,
    );
  },
};
