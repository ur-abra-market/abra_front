import { baseConfigService } from '../baseConfig.service';
import { IAccountPersonalInfoRequest } from '../common/common.serviceTypes';

import {
  IAccountPersonalInfoResponse,
  IDeleteImageRequest,
  IResponse,
  IUploadImageRequest,
  IUploadImageResponse,
} from './user.serviceTypes';

export enum Action {
  UPLOAD_LOGO_IMAGE = 'suppliers/uploadCompanyImage/',
  UPLOAD_ITEM_IMAGE = 'suppliers/uploadProductImage/',
  UPLOAD_SELLER_AVATAR = 'sellers/avatar/update/',
}

export const userService = {
  fetchAccountPersonalInfo: async () => {
    const { data } = await baseConfigService.get<IResponse<IAccountPersonalInfoResponse>>(
      `users/account/personalInfo/`,
    );

    return data.result;
  },

  updateAccountPersonalInfo: async (personalInfoData: IAccountPersonalInfoRequest) => {
    const { data } = await baseConfigService.patch(
      `users/account/personalInfo/update/`,
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

  uploadImage: async (payload: IUploadImageRequest) => {
    const { action, file, queries } = payload;
    const formData = new FormData();

    formData.append('file', file);

    const { data } = await baseConfigService.post<IUploadImageResponse>(
      action,
      formData,
      { params: queries },
    );

    return data;
  },

  deleteImage: async ({ queries, action }: IDeleteImageRequest) => {
    const { data } = await baseConfigService.delete(action, {
      params: queries,
    });
  },

  getFavoritesProducts: async () => {
    const { data } = await baseConfigService.get(`users/showFavorites/`);

    return data;
  },
};
