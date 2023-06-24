import baseConfigService from '../baseConfig.service';
import { IAccountPersonalInfoRequest } from '../common/common.serviceTypes';

import { IAccountPersonalInfoResponse, IResponse } from './user.serviceTypes';

export enum Action {
  UPLOAD_LOGO_IMAGE = 'suppliers/uploadCompanyImage/',
  UPLOAD_ITEM_IMAGE = 'suppliers/uploadProductImage/',
  UPLOAD_SELLER_AVATAR = 'sellers/avatar/update',
}

export const userService = {
  fetchAccountPersonalInfo: async () => {
    const { data } = await baseConfigService.get<IResponse<IAccountPersonalInfoResponse>>(
      `/users/account/personalInfo/`,
    );

    return data.result;
  },

  updateAccountPersonalInfo: async (personalInfoData: IAccountPersonalInfoRequest) => {
    const { data } = await baseConfigService.patch(
      `/users/account/personalInfo/update/`,
      personalInfoData,
    );

    return data.result;
  },

  uploadLogoImage: async (img: any) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await baseConfigService.post('users/uploadLogoImage/', formData);

    return data;
  },

  deleteImage: async (payload: {
    action: string;
    queries: { company_image_id: number; order?: number };
  }) => {
    const { data } = await baseConfigService.delete(payload.action, {
      params: payload.queries,
    });
  },
  getFavoritesProducts: async () => {
    const { data } = await baseConfigService.get(`/users/showFavorites/`);

    return data;
  },
};
