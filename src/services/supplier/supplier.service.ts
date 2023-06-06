import baseConfigService from '../baseConfig.service';

import {
  ISuppliersNotifications,
  ISuppliersCompanyInfoData,
  SuppliersResponse,
} from './supplier.serviceTypes';

export const supplierService = {
  hasCompanyInfo: async () => {
    const { data } = await baseConfigService.get<SuppliersResponse<boolean>>(
      `/suppliers/hasCompanyInfo/`,
    );

    return data.result;
  },

  hasPersonalInfo: async () => {
    const { data } = await baseConfigService.get<SuppliersResponse<boolean>>(
      `/suppliers/hasPersonalInfo/`,
    );

    return data.result;
  },

  fetchCompanyLogo: async () => {
    const { data } = await baseConfigService.get<SuppliersResponse<string>>(
      `/suppliers/companyLogo`,
    );

    return data.result;
  },

  fetchCompanyInfo: async () => {
    const { data } = await baseConfigService.get<
      SuppliersResponse<ISuppliersCompanyInfoData>
    >(`/suppliers/companyInfo`);

    return data.result;
  },

  fetchNotifications: async () => {
    const { data } = await baseConfigService.get<
      SuppliersResponse<ISuppliersNotifications>
    >(`/suppliers/notifications/`);

    return data.result;
  },

  getProductProperties: async (categoryId: any) => {
    const { data } = await baseConfigService.get(
      `/suppliers/getCategoryProperties/${categoryId}`,
    );

    return data;
  },

  getProductVariations: async (categoryId: any) => {
    const { data } = await baseConfigService.get(
      `suppliers/getCategoryVariations/${categoryId}/`,
    );

    return data;
  },

  getSupplierCompanyInfo: async () => {
    const { data } = await baseConfigService.get(`suppliers/companyInfo/`);

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
};
