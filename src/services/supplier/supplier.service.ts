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
      `suppliers/companyLogo`,
    );

    return data;
  },

  fetchCompanyInfo: async () => {
    const { data } = await baseConfigService.get<
      SuppliersResponse<ISuppliersCompanyInfoData>
    >(`/suppliers/companyInfo`);

    return data.result;
  },

  updateCompanyInfo: async () => {
    const { data } = await baseConfigService.patch(`/suppliers/companyInfo/update/`); // todo add type

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

  uploadProductImage: async (img: any, prodId: any, index: any) => {
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
  uploadCompanyImage: async (img: File) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await baseConfigService.post<
      SuppliersResponse<{
        id: number;
        url: string;
      }>
    >('suppliers/uploadCompanyImage/', formData);

    return data;
  },
  deleteCompanyImage: async (company_image_id: number) => {
    const { data } = await baseConfigService.delete<SuppliersResponse<boolean>>(
      `suppliers/deleteCompanyImage/`,
      { params: { company_image_id } },
    );

    return data;
  },
};
