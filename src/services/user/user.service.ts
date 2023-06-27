import { baseConfigService } from '../baseConfig.service';
import {
  IAccountPersonalInfoRequest,
  IDeleteImageRequest,
} from '../common/common.serviceTypes';

import { IAccountPersonalInfoResponse } from './user.serviceTypes';

import { IBaseResponse } from 'common/types/interfaces/IBaseResponse';

export enum Action {
  UPLOAD_LOGO_IMAGE = 'suppliers/uploadCompanyImage/',
  UPLOAD_ITEM_IMAGE = 'suppliers/uploadProductImage/',
  UPLOAD_SELLER_AVATAR = 'sellers/avatar/update/',
}

export const userService = {
  fetchAccountPersonalInfo: async () => {
    const { data } = await baseConfigService.get<
      IBaseResponse<IAccountPersonalInfoResponse>
    >(`users/account/personalInfo/`);

    return data.result;
  },

  updateAccountPersonalInfo: async (params: IAccountPersonalInfoRequest) => {
    const { data } = await baseConfigService.patch(
      `users/account/personalInfo/update/`,
      params,
    );

    return data.result;
  },

  uploadLogoImage: async (img: File) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await baseConfigService.post('users/uploadLogoImage/', formData);

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
