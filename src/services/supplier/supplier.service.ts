import _ from 'lodash';

import {
  IBusinessInfoRequest,
  ISupplierBusinessInfo,
  ISupplierNotifications,
  ISupplierUpdateBusinessInfo,
} from './supplier.serviceTypes';

import { IBaseResponse } from 'common/types';
import { baseConfigService } from 'services/baseConfig.service';

export const supplierService = {
  hasBusinessInfo: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<boolean>>(
      `suppliers/hasBusinessInfo`,
    );

    return data.result;
  },

  hasPersonalInfo: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<boolean>>(
      `suppliers/hasPersonalInfo`,
    );

    return data.result;
  },

  createBusinessInfo: async (params: IBusinessInfoRequest) => {
    const formData = new FormData();

    formData.append(
      'supplier_data_request',
      JSON.stringify(params.supplier_data_request),
    );

    formData.append('company_data_request', JSON.stringify(params.company_data_request));

    if (!_.isEmpty(params.company_phone_data_request)) {
      formData.append(
        'company_phone_data_request',
        JSON.stringify(params.company_phone_data_request),
      );
    }

    if (params.file) {
      formData.append('file', params.file!);
    }

    return baseConfigService.post<IBaseResponse<boolean>>(
      `auth/sign-up/business/sendInfo`,
      formData,
    );
  },

  getCompanyLogo: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<string>>(
      `suppliers/company/logo`,
    );

    return data.result;
  },

  getBusinessInfo: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<ISupplierBusinessInfo>>(
      `suppliers/businessInfo`,
    );

    return data.result;
  },

  updateBusinessInfo: async (params: Partial<ISupplierUpdateBusinessInfo>) => {
    return baseConfigService.post<IBaseResponse<boolean>>(
      `suppliers/businessInfo/update`,
      params,
    );
  },

  getNotifications: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<ISupplierNotifications>>(
      `suppliers/notifications`,
    );

    return data.result;
  },

  getProductProperties: async (categoryId: any) => {
    const { data } = await baseConfigService.get(`categories/${categoryId}/properties`);

    return data;
  },

  getProductVariations: async (categoryId: any) => {
    const { data } = await baseConfigService.get(`categories/${categoryId}/variations`);

    return data;
  },

  createProduct: async (params: any) => {
    const { data } = await baseConfigService.post(`suppliers/products/add`, params);

    return data;
  },

  uploadProductImage: async (img: File, prodId: number, index: number) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await baseConfigService.post(
      `suppliers/products/${prodId}/images/${index}/upload`,
      formData,
    );

    return data;
  },

  updateCompanyLogo: async (image: File) => {
    const formData = new FormData();

    formData.append('file', image);

    const { data } = await baseConfigService.post<
      IBaseResponse<{
        id: number;
        url: string;
      }>
    >('suppliers/company/logo/update', formData);

    return data;
  },

  deleteCompanyImage: async (company_image_id: number) => {
    const { data } = await baseConfigService.delete<IBaseResponse<boolean>>(
      `suppliers/company/image/delete`,
      { params: { company_image_id } },
    );

    return data;
  },

  updateNotifications: async (params: Partial<ISupplierNotifications>) => {
    await baseConfigService.post<IBaseResponse<boolean>>(
      `suppliers/notifications/update`,
      params,
    );
  },
};
