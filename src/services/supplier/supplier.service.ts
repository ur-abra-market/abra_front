import baseConfigService from '../baseConfig.service';

import { INotification } from './supplier.serviceTypes';

const supplierFetch = {
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

  getAccountData: async () => {
    const { data } = await baseConfigService.get(`suppliers/getSupplierInfo/`);

    return data.result;
  },

  getNotifications: async () => {
    const { data } = await baseConfigService.get(`users/getNotifications/`);

    return data;
  },

  postNotifications: async (notifications: INotification) => {
    const { data } = await baseConfigService.patch(
      `users/updateNotification/`,
      notifications,
    );

    return data.result;
  },
};

export default supplierFetch;
